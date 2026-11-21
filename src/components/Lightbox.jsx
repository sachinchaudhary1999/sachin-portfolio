import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

function Slide({ img, title }) {
  const [detected, setDetected] = useState(false);
  const tall = img.tall || detected;
  const onLoad = (e) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    if (w && h / w > 1.5) setDetected(true);
  };
  if (tall) {
    // Full-page screenshot: show at a readable width and let the viewer scroll it.
    return (
      <div className="pop-in h-full w-full max-w-5xl overflow-y-auto overscroll-contain rounded-lg border border-line bg-surface" onClick={(e) => e.stopPropagation()} tabIndex={0} role="region" aria-label={`${img.caption} (full page, scroll to read)`}>
        <img src={img.src} alt={`${title}: ${img.caption}`} draggable="false" onLoad={onLoad} className="block h-auto w-full" />
      </div>
    );
  }
  return (
    <img src={img.src} alt={`${title}: ${img.caption}`} draggable="false" onLoad={onLoad} onClick={(e) => e.stopPropagation()} className="pop-in max-h-full max-w-full rounded-lg border border-line object-contain shadow-2xl" />
  );
}

// Full-screen viewer: arrows / swipe / thumbnails, Esc to close, focus restored on close.
export default function Lightbox({ images, index, title, onClose, onIndex }) {
  const closeRef = useRef(null);
  const stripRef = useRef(null);
  const touchX = useRef(null);
  const count = images.length;
  const go = (d) => onIndex((index + d + count) % count);
  const img = images[index];

  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") { e.preventDefault(); closeRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    stripRef.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  return (
    <div role="dialog" aria-modal="true" aria-label={`${title} image viewer`} className="fixed inset-0 z-50 flex flex-col">
      <div className="fade-in absolute inset-0 bg-bg/95 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative flex items-center justify-between gap-4 px-4 py-3 text-sm text-muted">
        <span aria-live="polite" className="min-w-0 truncate">
          <span className="text-ink">{index + 1} / {count}</span>. {img.caption}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close viewer" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-ink">
          <FiX aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4"
        onClick={onClose}
        onPointerDown={(e) => { touchX.current = e.clientX; }}
        onPointerUp={(e) => {
          if (touchX.current === null) return;
          const dx = e.clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        }}
      >
        {count > 1 && (
          <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image" className="absolute left-3 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink sm:flex">
            <FiChevronLeft aria-hidden="true" />
          </button>
        )}
        <Slide key={img.src} img={img} title={title} />
        {count > 1 && (
          <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image" className="absolute right-3 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink sm:flex">
            <FiChevronRight aria-hidden="true" />
          </button>
        )}
      </div>

      {count > 1 && (
        <ul ref={stripRef} className="relative flex gap-2 overflow-x-auto px-4 py-3" aria-label="Thumbnails">
          {images.map((t, i) => (
            <li key={t.src} className="shrink-0">
              <button
                type="button"
                onClick={() => onIndex(i)}
                aria-current={i === index ? "true" : undefined}
                aria-label={`Show image ${i + 1}: ${t.caption}`}
                className={`block overflow-hidden rounded-md border-2 transition-opacity ${i === index ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={t.src} alt="" loading="lazy" decoding="async" className="h-14 w-24 object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
