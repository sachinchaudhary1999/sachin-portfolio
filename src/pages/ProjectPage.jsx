import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiCheck, FiExternalLink, FiGithub } from "react-icons/fi";
import { getProject, projects } from "../data/projects";
import Showcase from "../components/Showcase";
import Gallery from "../components/Gallery";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function Block({ title, children }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

const Checklist = ({ items }) => (
  <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
    {items.map((f) => (
      <li key={f} className="flex gap-3 text-sm">
        <FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
        <span>{f}</span>
      </li>
    ))}
  </ul>
);

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  useDocumentTitle(project ? project.title : "Project not found");

  if (!project) {
    return (
      <main className="container-page pb-24 pt-36">
        <h1 className="text-3xl">Project not found</h1>
        <p className="mt-3 text-muted">That case study doesn’t exist. It may have been renamed.</p>
        <Link to="/#projects" className="btn btn-primary mt-6">View all projects</Link>
      </main>
    );
  }
  // Old numeric links (/projects/1) redirect to the readable slug.
  if (slug === project.legacyId) return <Navigate to={`/projects/${project.slug}`} replace />;

  const i = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];

  const facts = [
    ["Type", project.category],
    ["Duration", project.duration],
    ["Status", project.status],
    ["Hosting", project.deployed],
  ];

  return (
    <main className="fade-in container-page pb-20 pt-28 md:pt-32">
      <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <FiArrowLeft aria-hidden="true" /> All projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <h1 className="text-[clamp(2rem,4vw,3rem)] leading-tight">{project.title}</h1>
        <p className="mt-3 text-lg text-muted">{project.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={project.webapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Live demo <FiExternalLink aria-hidden="true" />
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <FiGithub aria-hidden="true" /> Source code
          </a>
        </div>
      </header>

      <div className="mt-10"><Showcase images={project.main} title={project.title} url={project.webapp} /></div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-10">
          <Block title="Overview">
            <p className="max-w-[68ch] text-muted">{project.overview}</p>
          </Block>
          <Block title="What it does"><Checklist items={project.features} /></Block>
          <Block title="Architecture">
            <dl className="divide-y divide-line rounded-lg border border-line bg-surface">
              {project.architecture.map((a) => (
                <div key={a.layer} className="grid grid-cols-[7rem_1fr] gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted">{a.layer}</dt>
                  <dd>{a.tech}</dd>
                </div>
              ))}
            </dl>
          </Block>
          <div className="grid gap-10 md:grid-cols-2">
            <Block title="What I learned"><ul className="space-y-2 text-sm text-muted">{project.learned.map((x) => <li key={x} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />{x}</li>)}</ul></Block>
            <Block title="Planned next"><ul className="space-y-2 text-sm text-muted">{project.next.map((x) => <li key={x} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />{x}</li>)}</ul></Block>
          </div>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start" aria-label="Project facts">
          <dl className="divide-y divide-line rounded-lg border border-line bg-surface">
            {facts.map(([k, v]) => (
              <div key={k} className="px-4 py-3 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="mt-0.5">{v}</dd>
              </div>
            ))}
          </dl>
          {project.stats.length > 0 && (
            <dl className="flex gap-8">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <dd className="text-2xl font-semibold tracking-tight">{s.value}</dd>
                  <dt className="text-sm text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}
          <div>
            <h2 className="text-base">Tech stack</h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">{project.tags.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
          </div>
        </aside>
      </div>

      <Gallery images={project.gallery} title={project.title} />

      <nav aria-label="More case studies" className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="bg-surface p-5 transition-colors hover:bg-bg">
          <span className="flex items-center gap-2 text-sm text-muted"><FiArrowLeft aria-hidden="true" /> Previous</span>
          <span className="mt-1 block font-medium">{prev.title}</span>
        </Link>
        <Link to={`/projects/${next.slug}`} className="bg-surface p-5 text-left transition-colors hover:bg-bg sm:text-right">
          <span className="flex items-center gap-2 text-sm text-muted sm:justify-end">Next <FiArrowRight aria-hidden="true" /></span>
          <span className="mt-1 block font-medium">{next.title}</span>
        </Link>
      </nav>
    </main>
  );
}
