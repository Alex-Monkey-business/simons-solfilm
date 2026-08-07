import AVFoundation
import Foundation

let inputPath = CommandLine.arguments[1]
let outputPath = CommandLine.arguments[2]
let preset = CommandLine.arguments.count > 3 ? CommandLine.arguments[3] : AVAssetExportPreset1280x720

let inputURL = URL(fileURLWithPath: inputPath)
let outputURL = URL(fileURLWithPath: outputPath)
try? FileManager.default.removeItem(at: outputURL)

let asset = AVURLAsset(url: inputURL)
let sem = DispatchSemaphore(value: 0)
var failure: String?

Task {
    defer { sem.signal() }
    do {
        let videoTracks = try await asset.loadTracks(withMediaType: .video)
        guard let videoTrack = videoTracks.first else {
            failure = "no video track"; return
        }
        let duration = try await asset.load(.duration)
        let transform = try await videoTrack.load(.preferredTransform)

        // Composition with ONLY the video track — strips audio.
        let composition = AVMutableComposition()
        guard let compTrack = composition.addMutableTrack(
            withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid) else {
            failure = "could not add track"; return
        }
        try compTrack.insertTimeRange(
            CMTimeRange(start: .zero, duration: duration), of: videoTrack, at: .zero)
        compTrack.preferredTransform = transform

        guard let export = AVAssetExportSession(asset: composition, presetName: preset) else {
            failure = "could not create export session"; return
        }
        export.outputURL = outputURL
        export.outputFileType = .mp4
        export.shouldOptimizeForNetworkUse = true

        try await export.export(to: outputURL, as: .mp4)
        print("done")
    } catch {
        failure = "\(error)"
    }
}

sem.wait()
if let failure = failure {
    FileHandle.standardError.write("ERROR: \(failure)\n".data(using: .utf8)!)
    exit(1)
}
