import { useEffect, useRef, useState } from "react";
import Section from "../components/Section";
import { experience } from "../data/experience";

export default function Experience() {
  const listRef = useRef(null);
  const [fill, setFill] = useState(0); // 0..1 progress of the reading line down the timeline
  const [reached, setReached] = useState(0); // how many entries the line has passed

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current;
      if (!list) return;
      const line = window.innerHeight * 0.6;
      const box = list.getBoundingClientRect();
      setFill(Math.min(1, Math.max(0, (line - box.top) / box.height)));
      setReached([...list.children].filter((li) => li.getBoundingClientRect().top < line).length);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Section id="experience" title="Experience" intro="Internship, junior role and project-based work, all on the MERN stack.">
      <ol ref={listRef} className="relative space-y-10 pl-6 sm:pl-8">
        <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-line" />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent transition-transform duration-150 ease-out"
          style={{ transform: `scaleY(${fill})` }}
        />
        {experience.map((job, i) => (
          <li key={job.role} className="relative">
            <span
              aria-hidden="true"
              className={`absolute -left-[1.85rem] top-2 h-3 w-3 rounded-full border-2 transition-colors duration-300 sm:-left-[2.35rem] ${
                i < reached ? "border-accent bg-accent" : "border-line bg-bg"
              }`}
            />
            <p className="text-sm text-muted">{job.date}</p>
            <h3 className="mt-1 text-lg">{job.role}</h3>
            <p className="text-ink/90">{job.company}</p>
            <ul className="mt-3 max-w-[65ch] list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-line">
              {job.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
              {job.stack.map((s) => <li key={s} className="chip">{s}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
