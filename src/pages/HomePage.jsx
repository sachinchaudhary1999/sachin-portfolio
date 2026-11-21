import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";
import Skills from "../sections/Skills";
import GitHubActivity from "../sections/GitHubActivity";
import Education from "../sections/Education";
import Contact from "../sections/Contact";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function HomePage({ replayToken }) {
  useDocumentTitle(null);
  return (
    <main id="main">
      <Hero replayToken={replayToken} />
      <Projects />
      <Experience />
      <Skills />
      <GitHubActivity />
      <Education />
      <Contact />
    </main>
  );
}
