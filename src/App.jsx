import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import HomePage from "./pages/HomePage";

const ProjectPage = lazy(() => import("./pages/ProjectPage"));

function NotFound() {
  return (
    <main id="main" className="container-page pb-24 pt-36">
      <h1 className="text-3xl">Page not found</h1>
      <p className="mt-3 text-muted">That address doesn’t match any page on this site.</p>
      <Link to="/" className="btn btn-primary mt-6">Go to the home page</Link>
    </main>
  );
}

export default function App() {
  const { pathname, hash } = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const replayFlow = useCallback(() => setReplayToken((t) => t + 1), []);

  // Scroll to #hash targets, otherwise to the top on route changes.
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  // Ctrl/Cmd + K toggles the command palette from anywhere.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<HomePage replayToken={replayToken} />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onReplayFlow={replayFlow} />
    </>
  );
}
