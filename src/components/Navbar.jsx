import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";
import { nav, site } from "../data/site";
import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";
import { goToSection, isMac } from "../lib";

export default function Navbar({ onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = useActiveSection(pathname === "/" ? nav.map((n) => n.id) : []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const go = (id) => {
    setOpen(false);
    goToSection(navigate, pathname, id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label={`${site.name}, home`}>
          <img src={site.avatar} alt="" width="36" height="36" className="h-9 w-9 rounded-full border border-line object-cover" />
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    active === item.id ? "bg-surface text-ink ring-1 ring-line" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-2.5 text-sm text-muted transition-colors hover:border-accent/60 hover:text-ink sm:px-3"
            aria-label="Open command palette"
          >
            <FiSearch aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-line px-1.5 font-mono text-[0.6875rem] sm:inline">
              {isMac() ? "⌘" : "Ctrl"} K
            </kbd>
          </button>
          <button
            type="button"
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-muted transition-colors hover:border-accent/60 hover:text-ink"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-bg lg:hidden">
          <ul className="container-page grid py-2">
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item.id)}
                  className="w-full border-b border-line/60 py-3 text-left text-base text-ink last:border-b-0"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
