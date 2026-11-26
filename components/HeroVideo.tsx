import Image from "next/image";
import { VideoTile } from "./VideoTile";
import type { HeroVideo as HeroVideoData } from "./serviceDetails";

/**
 * Toppen av en tjenesteside med video: videoruta, og et lite stillbilde som
 * ligger halvveis foran den på brede skjermer. Selve videoen, med lasting og
 * pauseknapp, er VideoTile.
 */
export function HeroVideo({ video }: { video: HeroVideoData }) {
  return (
    <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[470px] lg:pl-[110px]">
      <VideoTile video={video} />

      {video.aside ? (
        // bottom-36, ikke lavere: tekstplata nederst i videoen er rundt 115 px
        // høy, og stillbildet skal ligge over den, ikke foran teksten.
        <div className="absolute bottom-36 left-0 hidden w-[230px] overflow-hidden rounded-[var(--r-xl)] border border-line-strong bg-bg-card shadow-[0_24px_48px_-16px_rgba(0,0,0,0.8)] lg:block">
          <div className="relative aspect-[4/3]">
            <Image
              src={video.aside.src}
              alt={video.aside.alt}
              fill
              sizes="230px"
              className="object-cover"
            />
          </div>
          <div className="px-3.5 py-2.5 font-mono text-[12px] uppercase tracking-[0.16em] text-text-muted">
            {video.aside.label}
          </div>
        </div>
      ) : null}
    </div>
  );
}
