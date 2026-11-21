import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiBriefcase, FiCode, FiCopy, FiDownload, FiExternalLink, FiFolder, FiGithub, FiLinkedin,
  FiMail, FiMoon, FiPlay, FiSearch, FiSun, FiUser, FiBookOpen, FiCpu,
} from "react-icons/fi";
import { nav, site } from "../data/site";
import { projects } from "../data/projects";
import { useTheme } from "../hooks/useTheme";
import { goToSection } from "../lib";

const sectionIcons = {
  projects: FiFolder, experience: FiBriefcase, skills: FiCpu, github: FiGithub, education: FiBookOpen, contact: FiMail,
};

export default function CommandPalette({ open, onClose, onReplayFlow }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const returnFocus = useRef(null);

  const items = useMemo(() => {
    const out = [];
    nav.forEach((n) =>
      out.push({ group: "Go to", label: n.label, icon: sectionIcons[n.id] || FiUser, run: () => goToSection(navigate, pathname, n.id) })
    );
    projects.forEach((p) =>
      out.push({ group: "Projects", label: p.title, hint: p.category, icon: FiCode, keywords: p.tags.join(" "), run: () => navigate(`/projects/${p.slug}`) })
    );
    out.push({ group: "Actions", label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme", icon: theme === "dark" ? FiSun : FiMoon, keywords: "theme dark light mode", run: toggle });
    out.push({ group: "Actions", label: "Replay the request flow", icon: FiPlay, keywords: "diagram animation hero", run: () => { navigate("/"); setTimeout(onReplayFlow, 50); window.scrollTo({ top: 0, behavior: "smooth" }); } });
    out.push({ group: "Actions", label: "Open résumé", icon: FiDownload, keywords: "cv resume download", run: () => window.open(site.resumeUrl, "_blank", "noopener,noreferrer") });
    if (site.email)
      out.push({ group: "Actions", label: "Copy email address", icon: FiCopy, keywords: "mail contact", run: () => navigator.clipboard?.writeText(site.email) });
    out.push({ group: "Links", label: "GitHub", icon: FiGithub, hint: site.github.user, run: () => window.open(site.github.url, "_blank", "noopener,noreferrer") });
    out.push({ group: "Links", label: "LinkedIn", icon: FiLinkedin, run: () => window.open(site.linkedin, "_blank", "noopener,noreferrer") });
    return out;
  }, [navigate, pathname, theme, toggle, onReplayFlow]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.keywords || ""} ${i.group} ${i.hint || ""}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement;
      setQuery("");
      setIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (returnFocus.current instanceof HTMLElement) {
      returnFocus.current.focus();
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [index, open]);

  if (!open) return null;

  const choose = (item) => {
    if (!item) return;
    onClose();
    // run after close so focus restoration doesn't fight with scrolling/navigation
    setTimeout(item.run, 0);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); choose(results[index]); }
    else if (e.key === "Escape") { e.preventDefault(); onClose(); }
    else if (e.key === "Tab") e.preventDefault();
  };

  let lastGroup = null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
      <div className="fade-in absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label="Command palette" className="pop-in relative w-full max-w-xl overflow-hidden rounded-xl border border-line bg-surface shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <FiSearch className="text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `palette-opt-${index}` : undefined}
            aria-label="Search sections, projects and actions"
            placeholder="Search sections, projects and actions"
            className="h-12 w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="rounded border border-line px-1.5 font-mono text-[0.6875rem] text-muted">Esc</kbd>
        </div>

        <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">No matches for “{query}”. Try “projects” or “theme”.</li>}
          {results.map((item, i) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            const Icon = item.icon;
            return (
              <li key={`${item.group}-${item.label}`} role="presentation">
                {showGroup && <p className="px-3 pb-1 pt-3 text-xs font-medium text-muted">{item.group}</p>}
                <div
                  id={`palette-opt-${i}`}
                  role="option"
                  aria-selected={i === index}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => choose(item)}
                  className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm ${i === index ? "bg-accent text-accent-ink" : "text-ink"}`}
                >
                  <Icon aria-hidden="true" className={i === index ? "" : "text-muted"} />
                  <span className="flex-1">{item.label}</span>
                  {item.hint && <span className={`text-xs ${i === index ? "opacity-80" : "text-muted"}`}>{item.hint}</span>}
                  {item.group === "Links" && <FiExternalLink aria-hidden="true" className="opacity-70" />}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-xs text-muted">
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">Enter</kbd> select</span>
        </div>
      </div>
    </div>
  );
}
