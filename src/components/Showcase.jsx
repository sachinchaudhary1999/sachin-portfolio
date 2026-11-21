import { useRef, useState } from "react";
import BrowserFrame from "./BrowserFrame";
import Lightbox from "./Lightbox";

// The project's featured images (max 5): one large browser frame plus a thumbnail switcher.
// Full-page screenshots scroll inside the frame.
export default function Showcase({ images, title, url }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const opener = useRef(null);

  if (images.length === 0) return <BrowserFrame src={null} alt="" url={url} priority />;
  const img = images[index];
  const close = () => { setOpen(false); opener.current?.focus(); };

  return (
    <div>
      <div key={img.src} className="fade-in" ref={opener} tabIndex={-1}>
        <BrowserFrame
          src={img.src}
          alt={`${title}: ${img.caption}`}
          url={url}
          priority={index === 0}
          tall={img.tall}
          scroll
          onEnlarge={() => setOpen(true)}
        />
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2 sm:gap-3" aria-label={`${title} featured screenshots`}>
          {images.map((t, i) => (
            <li key={t.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={`Show: ${t.caption}`}
                className={`block w-full overflow-hidden rounded-md border-2 transition-all ${i === index ? "border-accent" : "border-line opacity-70 hover:opacity-100"}`}
              >
                <img src={t.src} alt="" loading={i === 0 ? "eager" : "lazy"} decoding="async" className="aspect-[16/9] w-full object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-sm text-muted">{img.caption}{img.tall ? " (full page)" : ""}</p>

      {open && <Lightbox images={images} index={index} title={title} onClose={close} onIndex={setIndex} />}
    </div>
  );
}
