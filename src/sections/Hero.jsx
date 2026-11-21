import { FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import { site } from "../data/site";
import StatusDot from "../components/StatusDot";
import RequestFlow from "../components/RequestFlow";
import { useNavigate, useLocation } from "react-router-dom";
import { goToSection } from "../lib";

export default function Hero({ replayToken }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <section id="top" className="pb-16 pt-28 md:pb-24 md:pt-36" aria-label="Introduction">
      <div className="container-page grid grid-cols-1 items-center gap-12 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-14">
        <div className="min-w-0">
          <div className="rise flex items-center gap-5">
            <img
              src={site.avatar}
              alt={`Portrait of ${site.name}`}
              width="480"
              height="480"
              fetchPriority="high"
              className="h-28 w-28 shrink-0 rounded-full border border-line bg-surface p-1 shadow-lg sm:h-40 sm:w-40"
            />
            <div className="min-w-0">
              <p className="text-lg font-semibold tracking-tight">{site.name}</p>
              <p className="text-sm text-muted">{site.role}</p>
              {site.availability.open && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
                  <StatusDot /> {site.availability.text}
                </p>
              )}
            </div>
          </div>

          <h1 aria-label={site.headline} className="mt-8 max-w-[22ch] text-[clamp(2rem,3.9vw,3.1rem)] leading-[1.1]">
            {site.headline.split(" ").map((w, i) => (
              <span key={i} aria-hidden="true" className="rise inline-block" style={{ animationDelay: `${120 + i * 55}ms` }}>
                {w}&nbsp;
              </span>
            ))}
          </h1>
          <p style={{ animationDelay: "700ms" }} className="rise mt-5 max-w-[52ch] text-lg text-muted">{site.summary}</p>

          <div style={{ animationDelay: "820ms" }} className="rise mt-8 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => goToSection(navigate, pathname, "projects")} className="btn btn-primary">
              View projects
            </button>
            <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <FiDownload aria-hidden="true" /> Résumé
            </a>
            <a href={site.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="btn btn-ghost !px-3">
              <FiGithub aria-hidden="true" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="btn btn-ghost !px-3">
              <FiLinkedin aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="rise min-w-0" style={{ animationDelay: "400ms" }}>
          <RequestFlow replayToken={replayToken} />
        </div>
      </div>
    </section>
  );
}
