import React, { useState } from "react";
import { projects } from "../../constants";

const categoryMap = {
  "All": [],
  "Full Stack": ["Full Stack", "MERN", "Node.js", "Express", "MongoDB"],
  "Web Apps": ["React", "React.js", "Tailwind CSS"],
  "Backend": ["Node.js", "Express", "Express.js", "MongoDB", "REST API", "JWT"],
  "Frontend": ["React", "React.js", "Tailwind CSS", "Responsive Design"],
};

const projectStats = {
  1: { features: "20+", apis: "15+", responsive: "100%" },
  2: { features: "50+", apis: "25+", responsive: "100%" },
};

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) =>
          p.tags.some((tag) =>
            categoryMap[activeFilter]?.some(
              (kw) => tag.toLowerCase().includes(kw.toLowerCase())
            )
          )
        );

  return (
    <section
      id="work"
      className="py-20 px-4 sm:px-6 md:px-8 lg:px-12 font-sans relative"
    >
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          My <span className="text-purple-400">Projects</span>
        </h2>
        <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto px-4">
          A showcase of real-world projects I've built with modern technologies.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 flex-wrap mb-10 px-2">
        {Object.keys(categoryMap).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeFilter === cat
                ? "bg-purple-600 text-white"
                : "bg-[#1a1a2e] text-gray-400 hover:text-white hover:bg-[#23233a]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards — Horizontal Layout */}
      <div className="flex flex-col gap-6 sm:gap-8 w-full">
        {filteredProjects.map((project) => {
          const stats = projectStats[project.id];
          return (
            <div
              key={project.id}
              className="relative rounded-2xl bg-[#0f0f1a] border border-white/10 overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              {/* Featured Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1.5 bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Featured
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Image — full width on mobile, 42% on desktop */}
                <div className="w-full md:w-[42%] flex-shrink-0 h-52 sm:h-64 md:h-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    width="100%"
                    className="w-full h-full object-cover object-left-top"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between px-5 py-7 sm:px-7 sm:py-8 md:px-8 md:py-10 flex-grow">
                  {/* Title + Description */}
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                      {project.tags.slice(0, 6).map((tag, i) => (
                        <span
                          key={i}
                          className="bg-[#1e1b2e] text-purple-400 text-xs px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Row */}
                  {stats && (
                    <div className="flex flex-wrap gap-4 sm:gap-6 mb-5 sm:mb-6">
                      <div className="flex items-center gap-1.5">
                        <span className="text-purple-400">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                        </span>
                        <span className="text-white text-sm font-semibold">{stats.features}</span>
                        <span className="text-gray-500 text-xs">Features</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-purple-400">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
                        </span>
                        <span className="text-white text-sm font-semibold">{stats.apis}</span>
                        <span className="text-gray-500 text-xs">API Endpoints</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-purple-400">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </span>
                        <span className="text-white text-sm font-semibold">{stats.responsive}</span>
                        <span className="text-gray-500 text-xs">Responsive</span>
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => window.open(project.webapp, "_blank")}
                      className="px-4 sm:px-5 py-2 rounded-lg bg-[#1a1a2e] border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-medium transition hover:bg-[#23233a]"
                    >
                      View Details →
                    </button>
                    <a
                      href={project.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 sm:px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-medium transition"
                    >
                      Live Demo ↗
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-[#1a1a2e] border border-white/10 text-gray-400 hover:text-white transition hover:bg-[#23233a]"
                      aria-label="GitHub"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="w-full mt-8 sm:mt-10">
        <div className="rounded-2xl bg-[#0f0f1a] border border-white/10 px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="text-3xl">🚀</div>
            <div>
              <h4 className="text-white font-semibold text-base sm:text-lg">Have an Idea?</h4>
              <p className="text-gray-400 text-xs sm:text-sm">Let's build something amazing together.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="w-full sm:w-auto text-center px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition whitespace-nowrap"
          >
            Contact Me ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;