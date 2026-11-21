import { useRef, useState } from "react";
import { FiMaximize2 } from "react-icons/fi";
import Lightbox from "./Lightbox";

const STEP = 6; // tiles revealed at a time

// One uncropped image tile. Very tall (full-page) captures are capped in height with a fade
// and open in the viewer, which scrolls them.
function Tile({ g, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const [detected, setDetected] = useState(false);
  const tall = g.tall || detected;

  const onLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    if (w && h / w > 1.5) setDetected(true);
    setLoaded(true);
  };

  return (
    <li className="mb-5 break-inside-avoid">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Enlarge: ${g.caption}`}
        className="group/tile block w-full overflow-hidden rounded-xl border border-line bg-surface text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-xl"
      >
        <span className={`relative block overflow-hidden bg-line/30 ${!loaded ? "aspect-[16/10]" : ""} ${tall ? "max-h-[34rem]" : ""}`}>
          {!loaded && <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-line/40" />}
          <img
            ref={(el) => { if (el?.complete && el.naturalWidth) onLoad({ currentTarget: el }); }}
            src={g.src}
            alt={g.caption}
            loading="lazy"
            decoding="async"
            onLoad={onLoad}
            className={`block h-auto w-full transition-all duration-700 ease-out group-hover/tile:scale-[1.02] ${tall ? "object-top" : ""} ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
          />
          {tall && (
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
          )}
        </span>
        <span className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 text-sm">
          <span className="min-w-0 truncate text-ink">{g.caption}</span>
          <span className="flex shrink-0 items-center gap-2 text-muted">
            {tall && <span className="rounded border border-line px-1.5 py-0.5 text-xs">Full page</span>}
            <FiMaximize2 aria-hidden="true" className="transition-colors group-hover/tile:text-accent" />
          </span>
        </span>
      </button>
    </li>
  );
}

export default function Gallery({ images, title }) {
  const [shown, setShown] = useState(STEP);
  const [current, setCurrent] = useState(null);
  const opener = useRef(null);
  if (images.length === 0) return null;
  const visible = images.slice(0, shown);

  return (
    <section className="mt-16 border-t border-line pt-10" aria-labelledby="gallery-title">
      <div className="flex items-end justify-between gap-4">
        <h2 id="gallery-title" className="text-2xl">Gallery</h2>
        <p className="text-sm text-muted">{images.length} more {images.length === 1 ? "screen" : "screens"}</p>
      </div>

      <ul className="mt-6 columns-1 gap-5 md:columns-2">
        {visible.map((g, i) => (
          <Tile key={g.src} g={g} onOpen={(e) => { opener.current = e.currentTarget; setCurrent(i); }} />
        ))}
      </ul>

      {shown < images.length && (
        <div className="mt-2 flex justify-center">
          <button type="button" onClick={() => setShown((n) => n + STEP)} className="btn btn-ghost">
            Show more ({images.length - shown} left)
          </button>
        </div>
      )}

      {current !== null && (
        <Lightbox
          images={images}
          index={current}
          title={title}
          onClose={() => { setCurrent(null); opener.current?.focus(); }}
          onIndex={setCurrent}
        />
      )}
    </section>
  );
}
