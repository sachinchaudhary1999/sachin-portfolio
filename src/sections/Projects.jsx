import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import Section from "../components/Section";
import BrowserFrame from "../components/BrowserFrame";
import { categories, projects } from "../data/projects";

const FILTER_FROM = 5; // show category filters once there are this many projects

function Featured({ p }) {
  return (
    <li className="grid grid-cols-1 gap-6 py-10 first:pt-0 last:pb-0 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
      <Link to={`/projects/${p.slug}`} aria-label={`${p.title} case study`} className="block min-w-0 transition-opacity hover:opacity-90">
        <BrowserFrame src={p.image} alt={`${p.title} screenshot`} url={p.webapp} tall={p.imageTall} />
      </Link>
      <div className="flex min-w-0 flex-col">
        <p className="flex items-center gap-2 text-sm text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" /> {p.status}
        </p>
        <h3 className="mt-2 text-xl"><Link to={`/projects/${p.slug}`} className="hover:text-accent">{p.title}</Link></h3>
        <p className="mt-1 text-ink/90">{p.tagline}</p>
        <p className="mt-3 text-sm text-muted">{p.summary}</p>
        {p.stats.length > 0 && (
          <dl className="mt-4 flex gap-6">
            {p.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-sm text-muted"><span className="text-base font-semibold text-ink">{s.value}</span> {s.label}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tags.slice(0, 7).map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <Link to={`/projects/${p.slug}`} className="btn btn-primary">Case study <FiArrowRight aria-hidden="true" /></Link>
          <a href={p.webapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Live demo <FiExternalLink aria-hidden="true" /></a>
          <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} source code on GitHub`} className="btn btn-ghost !px-3"><FiGithub aria-hidden="true" /></a>
        </div>
      </div>
    </li>
  );
}

function Compact({ p }) {
  return (
    <li className="min-w-0">
      <Link to={`/projects/${p.slug}`} className="group/card block h-full rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/60">
        <BrowserFrame src={p.image} alt={`${p.title} screenshot`} url={p.webapp} tall={p.imageTall} className="!rounded-lg" />
        <h3 className="mt-4 text-base group-hover/card:text-accent">{p.title}</h3>
        <p className="mt-1 text-sm text-muted">{p.tagline}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tags.slice(0, 4).map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
      </Link>
    </li>
  );
}

export default function Projects() {
  const [cat, setCat] = useState("All");
  const showFilter = projects.length >= FILTER_FROM && categories.length > 1;
  const visible = projects.filter((p) => cat === "All" || p.category === cat);
  const featured = visible.filter((p) => p.featured);
  const more = visible.filter((p) => !p.featured);

  return (
    <Section id="projects" title="Projects" intro="Full-stack apps with real auth, payments and admin tooling. Each has a case study.">
      {showFilter && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${cat === c ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-muted hover:text-ink"}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {featured.length > 0 && <ol className="divide-y divide-line">{featured.map((p) => <Featured key={p.slug} p={p} />)}</ol>}

      {more.length > 0 && (
        <div className={featured.length ? "mt-14 border-t border-line pt-10" : ""}>
          {featured.length > 0 && <h3 className="mb-5 text-lg">More projects</h3>}
          <ul className="grid gap-5 sm:grid-cols-2">{more.map((p) => <Compact key={p.slug} p={p} />)}</ul>
        </div>
      )}

      {visible.length === 0 && <p className="text-muted">No projects in this category yet.</p>}
    </Section>
  );
}
