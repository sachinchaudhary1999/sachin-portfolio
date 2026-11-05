
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Work from "./components/Work/Work";
import ProjectDetails from "./components/Work/ProjectDetails";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import BlurBlob from "./components/BlurBlob";

const HomePage = () => (
  <>
    <About />
    <Work />
    <Skills />
    <Experience />
    <Education />
    <Contact />
  </>
);

const App = () => {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith("/projects/");

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);

      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050414]">
      <BlurBlob
        position={{ top: "35%", left: "20%" }}
        size={{ width: "30%", height: "40%" }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 pt-20">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />

          <Route path="*" element={<HomePage />} />
        </Routes>

        {!isProjectPage && <Footer />}
        {isProjectPage && <Footer />}
      </div>
    </div>
  );
};

export default App;
