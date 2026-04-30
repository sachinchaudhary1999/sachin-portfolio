import React, { useState } from "react";
import { projects } from "../../constants";

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="work"
      className="py-24 px-[5vw] md:px-[6vw] lg:px-[10vw] font-sans relative"
    >
      {/* Title */}
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold text-white">PROJECTS</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
          A showcase of my real-world projects, highlighting problem-solving,
          design, and development skills.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/40 to-pink-500/30 hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
          >
            {/* CARD */}
            <div className="bg-[#0f0f1a] rounded-2xl h-full flex flex-col overflow-hidden backdrop-blur-md border border-white/10 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300">

              {/* ✅ IMAGE FIX (aligned left, no side padding feel) */}
              <div className="h-52 bg-[#0f0f1a] overflow-hidden">
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
  />
</div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#1e1b2e] text-purple-400 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* STATUS */}
                {project.status && (
                  <span className="text-yellow-400 text-xs mb-2">
                    {project.status}
                  </span>
                )}

                {/* BUTTONS */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 text-center bg-[#1e1b2e] hover:bg-purple-600 text-gray-300 hover:text-white text-sm py-2 rounded-lg transition"
                  >
                    Code
                  </a>

                  <a
                    href={project.webapp}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg transition"
                  >
                    Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL (unchanged) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="bg-[#0f0f1a] rounded-xl max-w-3xl w-[90%] p-6 relative border border-white/10">

            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-purple-400"
            >
              ×
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full rounded-xl mb-6"
            />

            <h3 className="text-2xl font-bold text-white mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-gray-400 mb-4">
              {selectedProject.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#1e1b2e] text-purple-400 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={selectedProject.github}
                target="_blank"
                className="flex-1 text-center bg-[#1e1b2e] hover:bg-purple-600 text-gray-300 hover:text-white py-2 rounded-lg"
              >
                View Code
              </a>

              <a
                href={selectedProject.webapp}
                target="_blank"
                className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;