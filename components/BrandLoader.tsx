"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Exact paths from public/brand/logo-full-transparent.svg, kept inline so the
// mark can be stroke-drawn and the wordmark faded in within one coordinate system.
const MARK_PATHS = [
  "M175.052 0C180.025 1.49443 189.536 3.15272 194.918 4.2991C206.182 6.68192 217.387 9.33085 228.525 12.2439C264.006 21.6181 296.213 33.0358 330.511 45.9027C332.183 75.5305 329.804 97.1418 324.09 126.581C314.037 128.645 300.227 132.923 290.028 135.545C263.218 142.436 236.353 150.369 209.483 156.988L209.506 235.285C237.221 215.737 257.599 188.959 273.224 159.265L317.553 147.478C304.777 179.945 292.332 202.844 268.438 229.051C240.872 259.339 210.508 278.181 175.549 298.002L175.529 130.688C185.025 129.239 207.386 122.533 217.383 119.837L293.991 99.2259C294.553 89.2471 296.682 79.4707 296.639 69.0503C269.072 59.7662 238.478 49.9512 210.066 43.6282L210.065 102.96C198.358 106.079 186.682 109.311 175.037 112.654L175.052 0Z",
  "M154.253 0.636016C154.489 0.63263 155.038 0.923115 155.3 1.03823C156.02 12.0301 155.515 28.0808 155.511 39.3821L155.468 112.497L120.577 102.845L120.585 43.5545C103.393 47.8381 86.3086 52.5394 69.3456 57.6544C57.7823 61.1843 46.0293 65.4739 34.5439 68.7668C34.5466 79.502 35.8463 88.4347 36.9502 99.063C62.4356 107.308 89.8925 112.938 115.725 120.532C128.492 124.285 142.173 127.823 155.068 130.996L155.014 297.834C120.623 278.226 91.5416 260.42 64.0461 230.636C41.0414 207.679 25.0056 177.415 13.3367 147.425L57.1836 159.326C78.3198 196.331 87.9746 207.78 120.902 235.201C121.652 210.042 121.048 182.051 121.036 156.677C112.876 155.539 97.5745 150.494 88.8239 148.403C62.3083 142.069 33.6838 132.508 7.31256 126.707C0.489303 105.457 -1.09682 68.5203 0.663339 45.8412C56.4515 25.0188 95.5123 12.0064 154.253 0.636016Z",
];

// Wordmark glyphs. `evenOdd` flag preserves the counters in the two "O" glyphs.
const WORDMARK_PATHS: { d: string; evenOdd?: boolean }[] = [
  { d: "M550.305 57.896L589.971 57.9109C593.581 60.9038 599.717 67.3521 603.259 70.8583C607.444 66.5294 611.921 62.1741 616.187 57.898L655.793 57.9068C660.134 62.1409 664.387 66.461 668.552 70.8644V163.376L651.032 163.356L651.038 79.6786L646.785 75.3849L621.023 75.3795L611.589 84.8065L611.582 106.356L611.568 163.376L594.082 163.359L594.075 83.7712L585.508 75.3903L558.736 75.3768L554.551 79.5513L554.517 163.375L537.112 163.362L537.092 71.1637C541.121 66.8334 546.072 62.1206 550.305 57.896Z" },
  { d: "M406.037 57.9062L489.278 57.911C486.393 63.6835 483.63 69.5143 480.975 75.3986L414.69 75.3782L410.549 79.5121L410.542 98.1115C411.656 99.3127 413.304 100.757 414.535 101.906H475.587C480.149 106.286 484.619 110.763 488.987 115.336C489.319 126.565 489.048 139.165 489.061 150.502C484.93 154.9 480.684 159.19 476.329 163.365L392.838 163.333L401.132 146.352L467.033 146.312L471.542 141.972L471.544 123.735L467.163 119.413L405.816 119.369L392.498 106.009L392.494 71.436C397.026 66.7076 401.202 62.3218 406.037 57.9062Z" },
  { d: "M920.359 57.915L1004.09 57.9252C1001.19 63.7783 998.249 69.6016 995.242 75.3945L929.238 75.3701L925.059 79.5602L925.025 98.0147C926.271 99.4455 927.761 100.654 929.197 101.908L990.298 101.911C994.971 106.468 999.461 110.86 1003.94 115.605L1003.97 150.654L991.239 163.371L907.423 163.317C910.329 157.698 913.173 152.047 915.957 146.366L981.602 146.398C982.984 145.212 984.819 143.179 986.126 141.819V123.792L981.765 119.384L920.291 119.376L907.031 105.982L907.024 71.2829C910.938 67.0089 916.173 62.0692 920.359 57.915Z" },
  { d: "M808.593 57.9319C831.491 57.4931 855.783 57.9069 878.789 57.9075L892.565 71.6174L892.551 163.379L874.008 163.364L874.022 80.1174C873.615 78.2208 871.8 76.8353 870.331 75.3727L817.729 75.3781L812.982 80.1336L812.968 163.395L795.502 163.355L795.495 71.2592L808.593 57.9319Z" },
  { d: "M964.272 194.818L993.237 194.825C996.156 197.699 999.062 200.711 1001.95 203.631L1001.97 266.787L989.567 266.818C989.601 258.932 991.226 211.263 987.684 207.655C984.921 204.839 971.504 206.211 967.583 206.286L961.082 212.655L961.061 225.074L961.068 266.789L948.485 266.814L948.492 212.764C946.433 210.543 943.988 208.364 941.753 206.291L923.081 206.286C921.72 207.238 920.278 208.742 919.065 209.92L919.072 266.787L906.482 266.82L906.489 204.127L916.058 194.81L945.302 194.815L954.567 203.48L964.272 194.818Z" },
  { d: "M403.964 194.789L464.76 194.856C462.643 198.411 460.505 202.611 458.52 206.291L411.089 206.285C408.438 208.123 407.321 208.931 407.055 212.277C405.963 226.037 409.621 225.096 422.171 224.994C432.752 224.908 444.318 224.874 455.268 224.909C458.333 227.826 461.434 230.709 464.567 233.556L464.601 257.735C461.85 260.566 458.576 263.573 455.701 266.338C453.684 267.268 401.23 266.787 394.686 266.77L400.571 254.885C416.385 254.915 432.683 255.537 448.38 254.444C452.903 254.129 451.932 241.41 450.623 238.669C445.868 235.416 411.929 236.731 403.701 236.775L394.491 227.189L394.502 204.147C397.807 200.536 400.396 198.073 403.964 194.789Z" },
  { d: "M504.591 57.8879L522.03 57.8988L522.023 163.355L504.591 163.356V57.8879Z" },
  { d: "M689.601 194.807C706.308 194.793 732.924 194.047 749.049 195.06C746.611 198.585 744.146 202.639 741.823 206.281L701.967 206.293V224.899L718.736 224.846C720.348 224.81 720.666 224.712 722.163 225.416C723.761 228.426 723.084 233.164 722.962 236.774L701.954 236.787L701.967 266.787L689.56 266.814L689.601 194.807Z" },
  { d: "M831.105 194.804L844.02 194.819L844.013 254.917L873.216 254.912C875.593 258.585 878.024 262.898 880.279 266.697C864.52 267.161 846.993 266.809 831.091 266.837L831.105 194.804Z" },
  { d: "M612.022 194.806L625.073 194.821L625.08 255.363L654.398 255.361L660.994 266.737C644.997 267.055 628.141 266.81 612.07 266.838L612.022 194.806Z" },
  { d: "M777.026 194.804L789.962 194.819V266.789L777.026 266.834V194.804Z" },
  { d: "M564.161 194.825C567.134 197.733 570.114 200.825 573.047 203.789L573.067 258.625L564.297 266.769L512.778 266.768L503.094 257.686L503.033 203.788C505.431 201.098 509.691 197.369 512.433 194.816L564.161 194.825ZM557.808 207.188C552.193 205.262 526.947 206.33 519.233 206.285C516.179 209.122 515.833 211.344 516.043 215.45C516.348 221.219 514.323 250.446 518.19 253.284C521.083 255.404 552.933 254.321 558.053 254.321C558.261 254.072 559.846 252.125 559.874 252.092C560.395 244.591 562.705 211.63 557.808 207.188Z", evenOdd: true },
  { d: "M769.083 57.8557C773.463 62.1392 777.853 66.695 782.173 71.0613L782.203 151.846L769.283 163.843L693.385 163.841L679.118 150.462L679.029 71.0599C682.561 67.0966 688.837 61.6035 692.878 57.8428L769.083 57.8557ZM759.724 76.0693C751.452 73.2316 714.26 74.8043 702.895 74.7386C698.395 78.9183 697.886 82.1914 698.195 88.2405C698.644 96.7397 695.662 139.796 701.359 143.978C705.62 147.101 752.541 145.505 760.084 145.505C760.39 145.138 762.726 142.271 762.767 142.221C763.535 131.171 766.938 82.6132 759.724 76.0693Z", evenOdd: true },
];

const ACCENT = "#FE7818";
const WORDMARK = "#F1F2F2";
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Timeline: the mark draws on, then each letter traces its own outline and fills.
const MARK_DRAW = 1.15; // seconds per mark half
const MARK_STAGGER = 0.18;
const WORDMARK_DELAY = 1.3; // seconds before the first letter starts drawing
const GLYPH_DRAW = 0.5; // seconds to trace one glyph's outline
const GLYPH_STAGGER = 0.085; // seconds between each letter starting
const MIN_DISPLAY = 3200; // hold long enough for the last letter to finish
const REDUCED_DISPLAY = 500;

// The glyphs are stored in arbitrary order; sort into reading order (top row
// "SIMONS" left→right, then bottom row "SOLFILM") so the signature draws naturally.
const ORDERED_WORDMARK = [...WORDMARK_PATHS]
  .map((p) => {
    const m = p.d.match(/^M([\d.]+)\s+([\d.]+)/);
    return { ...p, x: m ? parseFloat(m[1]) : 0, row: m && parseFloat(m[2]) < 180 ? 0 : 1 };
  })
  .sort((a, b) => a.row - b.row || a.x - b.x);

export function BrandLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  // Dismiss once both the animation has had time to play and the page is ready,
  // capped so a stalled load event can never leave the splash up forever.
  useEffect(() => {
    const minDisplay = reduce ? REDUCED_DISPLAY : MIN_DISPLAY;
    const start = performance.now();
    let timer: number;

    const finish = () => {
      const elapsed = performance.now() - start;
      timer = window.setTimeout(() => setVisible(false), Math.max(0, minDisplay - elapsed));
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      timer = window.setTimeout(() => setVisible(false), minDisplay + 3000);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, [reduce]);

  // Lock scroll while the splash covers the page.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="brand-loader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          aria-hidden
        >
          <motion.div
            className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8"
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {/* Mark — stroke-drawn, then filled. */}
            <svg
              viewBox="0 0 332 298"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto w-[min(34vw,132px)] sm:w-[min(20vw,150px)]"
            >
              {MARK_PATHS.map((d, i) => (
                <motion.path
                  key={`mark-${i}`}
                  d={d}
                  fill={ACCENT}
                  stroke={ACCENT}
                  strokeWidth={2}
                  strokeLinejoin="round"
                  initial={reduce ? { pathLength: 1, fillOpacity: 1 } : { pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          pathLength: { duration: MARK_DRAW, ease: EASE_OUT, delay: i * MARK_STAGGER },
                          fillOpacity: { duration: 0.6, delay: MARK_DRAW * 0.75 + i * MARK_STAGGER },
                        }
                  }
                />
              ))}
            </svg>

            {/* Wordmark — each letter traces its outline, then fills, like a signature. */}
            <svg
              viewBox="388 52 620 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-auto w-[min(72vw,300px)] sm:w-[min(40vw,360px)]"
            >
              {ORDERED_WORDMARK.map((p, i) => (
                <motion.path
                  key={`word-${i}`}
                  d={p.d}
                  fill={WORDMARK}
                  stroke={WORDMARK}
                  strokeWidth={1.4}
                  strokeLinejoin="round"
                  strokeLinecap="butt"
                  fillRule={p.evenOdd ? "evenodd" : undefined}
                  clipRule={p.evenOdd ? "evenodd" : undefined}
                  initial={reduce ? { pathLength: 1, fillOpacity: 1 } : { pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          pathLength: {
                            duration: GLYPH_DRAW,
                            ease: EASE_OUT,
                            delay: WORDMARK_DELAY + i * GLYPH_STAGGER,
                          },
                          fillOpacity: {
                            duration: 0.35,
                            delay: WORDMARK_DELAY + i * GLYPH_STAGGER + GLYPH_DRAW * 0.55,
                          },
                        }
                  }
                />
              ))}
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
