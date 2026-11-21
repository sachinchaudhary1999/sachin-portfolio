import { FiArrowUp, FiGithub, FiLinkedin } from "react-icons/fi";
import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">{site.name}</p>
          <p className="mt-1 text-sm text-muted">
            Built with React, Vite and Tailwind CSS. © {new Date().getFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={site.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="btn btn-ghost !px-3"><FiGithub aria-hidden="true" /></a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="btn btn-ghost !px-3"><FiLinkedin aria-hidden="true" /></a>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="btn btn-ghost">
            <FiArrowUp aria-hidden="true" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
