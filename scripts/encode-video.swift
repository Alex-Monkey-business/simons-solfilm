// Koder en video om til H.264 uten lyd, i en gitt størrelse og bitrate.
// transcode.swift bruker Apples ferdige forhåndsvalg, og de lar en fil som alt
// er liten nok gå urørt gjennom. Her styres størrelsen direkte, så en video fra
// Instagram (720x1280, 11 MB) kan krympes til noe en tjenesteside tåler.
//
// Bruk: swift scripts/encode-video.swift <inn> <ut> <bredde> <høyde> <kbps>
// Eks.: swift scripts/encode-video.swift _video-source/klipp.mp4 public/brand/videoes/klipp.mp4 540 960 650
import AVFoundation
import Foundation

let args = CommandLine.arguments
guard args.count >= 6, let width = Int(args[3]), let height = Int(args[4]), let kbps = Int(args[5]) else {
    FileHandle.standardError.write("Bruk: encode-video.swift <inn> <ut> <bredde> <høyde> <kbps>\n".data(using: .utf8)!)
    exit(2)
}

let inputURL = URL(fileURLWithPath: args[1])
let outputURL = URL(fileURLWithPath: args[2])
try? FileManager.default.removeItem(at: outputURL)

let asset = AVURLAsset(url: inputURL)
let sem = DispatchSemaphore(value: 0)
var failure: String?

Task {
    defer { sem.signal() }
    do {
        guard let track = try await asset.loadTracks(withMediaType: .video).first else {
            failure = "ingen videospor"; return
        }

        let reader = try AVAssetReader(asset: asset)
        let readerOutput = AVAssetReaderTrackOutput(track: track, outputSettings: [
            kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_420YpCbCr8BiPlanarVideoRange,
        ])
        readerOutput.alwaysCopiesSampleData = false
        reader.add(readerOutput)

        // Bare ett videospor legges i utfila. Lyden blir aldri med.
        let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
        writer.shouldOptimizeForNetworkUse = true
        let writerInput = AVAssetWriterInput(mediaType: .video, outputSettings: [
            AVVideoCodecKey: AVVideoCodecType.h264,
            AVVideoWidthKey: width,
            AVVideoHeightKey: height,
            AVVideoScalingModeKey: AVVideoScalingModeResizeAspectFill,
            AVVideoCompressionPropertiesKey: [
                AVVideoAverageBitRateKey: kbps * 1000,
                AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel,
                AVVideoMaxKeyFrameIntervalKey: 60,
            ],
        ])
        writerInput.expectsMediaDataInRealTime = false
        writerInput.transform = try await track.load(.preferredTransform)
        writer.add(writerInput)

        guard reader.startReading() else {
            failure = "kunne ikke lese: \(String(describing: reader.error))"; return
        }
        guard writer.startWriting() else {
            failure = "kunne ikke skrive: \(String(describing: writer.error))"; return
        }
        writer.startSession(atSourceTime: .zero)

        let queue = DispatchQueue(label: "encode-video")
        await withCheckedContinuation { (done: CheckedContinuation<Void, Never>) in
            writerInput.requestMediaDataWhenReady(on: queue) {
                while writerInput.isReadyForMoreMediaData {
                    if let sample = readerOutput.copyNextSampleBuffer() {
                        writerInput.append(sample)
                    } else {
                        writerInput.markAsFinished()
                        done.resume()
                        return
                    }
                }
            }
        }

        await writer.finishWriting()
        if writer.status != .completed {
            failure = "skriving feilet: \(String(describing: writer.error))"
        } else {
            print("ferdig")
        }
    } catch {
        failure = "\(error)"
    }
}

sem.wait()
if let failure = failure {
    FileHandle.standardError.write("FEIL: \(failure)\n".data(using: .utf8)!)
    exit(1)
}
