import { useState } from "react";
import { FiMaximize2 } from "react-icons/fi";

// A screenshot inside a minimal browser window.
//  - normal images: fixed-ratio crop (cards) with a gentle hover zoom
//  - full-page (tall) images: on cards they slowly pan down on hover; with `scroll` (case-study page)
//    the whole page is shown in a scrollable window so visitors can read it top to bottom.
export default function BrowserFrame({ src, alt, url, className = "", priority = false, tall: tallHint = false, scroll = false, onEnlarge }) {
  const [detected, setDetected] = useState(false);
  const tall = tallHint || detected;
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";

  const onLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    if (w && h / w > 1.5) setDetected(true);
  };

  const imgProps = { src, alt, loading: priority ? "eager" : "lazy", decoding: "async", onLoad };

  return (
    <figure className={`group/frame relative overflow-hidden rounded-xl border border-line bg-surface ${className}`}>
      <div className={`flex items-center gap-3 border-b border-line px-3 py-2 ${onEnlarge ? "pr-12" : ""}`}>
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-line" />
          <i className="h-2.5 w-2.5 rounded-full bg-line" />
          <i className="h-2.5 w-2.5 rounded-full bg-line" />
        </span>
        {host && <span className="min-w-0 flex-1 truncate rounded bg-bg px-2.5 py-0.5 text-xs text-muted">{host}</span>}
      </div>

      {onEnlarge && (
        <button type="button" onClick={onEnlarge} aria-label="Enlarge image" className="absolute right-2 top-1 z-10 flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg hover:text-ink">
          <FiMaximize2 aria-hidden="true" />
        </button>
      )}

      {!src ? (
        <div className="flex aspect-[1600/760] w-full items-center justify-center bg-bg text-sm text-muted">Screenshot coming soon</div>
      ) : scroll && tall ? (
        <div
          tabIndex={0}
          role="region"
          aria-label={`${alt} (full-page screenshot, scroll to read)`}
          className="max-h-[75vh] overflow-y-auto overscroll-contain"
        >
          <img {...imgProps} className="block h-auto w-full" />
          <p className="sticky bottom-0 bg-gradient-to-t from-surface to-transparent px-3 pb-2 pt-6 text-center text-xs text-muted">Scroll inside the window to see the whole page</p>
        </div>
      ) : (
        <img
          {...imgProps}
          onClick={onEnlarge && !tall ? onEnlarge : undefined}
          className={`aspect-[1600/760] w-full object-cover object-top ${onEnlarge && !tall ? "cursor-zoom-in" : ""} ${
            tall
              ? "transition-[object-position] duration-[9000ms] ease-linear group-hover/frame:object-bottom"
              : "transition-transform duration-700 ease-out group-hover/frame:scale-[1.04]"
          }`}
        />
      )}
    </figure>
  );
}
