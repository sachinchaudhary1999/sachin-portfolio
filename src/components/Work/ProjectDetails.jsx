import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../../constants";
import { projectDetails, projectStats } from "../../projectDetails";
import {
  FiArrowLeft, FiExternalLink, FiGithub, FiLayers, FiCode, FiCalendar,
  FiActivity, FiShield, FiImage, FiMessageCircle, FiHeart, FiSearch,
  FiLayout, FiCheckCircle, FiZap, FiDatabase, FiCloud, FiLock, FiMonitor,
  FiChevronRight, FiChevronLeft
} from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";

const techIcons = {
  React: <FaReact />, "React.js": <FaReact />, "Node.js": <FaNodeJs />,
  MongoDB: <FiDatabase />, Express: <FiCode />, "Express.js": <FiCode />,
  "Tailwind CSS": <FiLayers />, JWT: <FiShield />, Cloudinary: <FiCloud />,
};

const SectionTitle = ({ icon: Icon, children }) => (
  <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
    <Icon className="text-purple-400" /> {children}
  </h3>
);

function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((item) => String(item.id) === id);
  const details = project ? projectDetails[project.id] : null;
  if (!project || !details) {
    return <main className="mx-auto max-w-7xl px-4 py-32 text-center text-white"><h1 className="text-3xl font-bold">Project not found</h1><Link to="/#work" className="mt-6 inline-flex text-purple-300 hover:text-purple-200">Back to Projects</Link></main>;
  }
  const [activeImage, setActiveImage] = useState(0);
  const gallery = details.gallery?.length ? details.gallery : [project.image];
  const stats = projectStats[project.id];

  const changeImage = (direction) => {
    setActiveImage((current) => (current + direction + gallery.length) % gallery.length);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <Link to="/#work" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-purple-300">
        <FiArrowLeft /> Back to Projects
      </Link>

      <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
            <span className="text-amber-300">★</span> Featured Project
          </div>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={project.webapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-500">Live Demo <FiExternalLink /></a>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-purple-400 hover:text-purple-200"><FiGithub /> GitHub Repo</a>
            <span className="inline-flex items-center rounded-lg bg-white/[0.08] px-4 py-3 text-sm text-gray-300">{project.status || "In Development"} 🚀</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-purple-400/20 bg-[#0c0b1b] p-2 shadow-[0_0_55px_rgba(124,58,237,0.12)]">
          <img src={project.image} alt={`${project.title} preview`} className="h-64 w-full rounded-xl object-cover object-top sm:h-80" />
        </div>
      </div>









      <div className="mt-7 grid gap-5 lg:grid-cols-[1.55fr_1fr]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-white/10 bg-[#0d0c1c]/90 p-5 sm:p-6">
            <SectionTitle icon={FiLayers}>Overview</SectionTitle>
            <p className="text-sm leading-7 text-gray-400">{details.overview}</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-[#0d0c1c]/90 p-5 sm:p-6">
            <SectionTitle icon={FiCode}>Key Features</SectionTitle>
            <div className="grid gap-2 sm:grid-cols-2">
              {details.features.map((feature, index) => (
                <div key={feature} className="flex items-center gap-3 rounded-lg bg-[#171629] px-3 py-3 text-xs text-gray-300 sm:text-sm">
                  <span className="text-purple-400">{[<FiShield />, <FiSearch />, <FiCalendar />, <FiHeart />, <FiMessageCircle />, <FiLayout />, <FiImage />, <FiMonitor />][index % 8]}</span>{feature}
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <section className="rounded-2xl border border-white/10 bg-[#0d0c1c]/90 p-5 sm:p-6">
            <SectionTitle icon={FiLayers}>Tech Stack</SectionTitle>
            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              {project.tags.map((tag) => <div key={tag} className="flex items-center gap-2 text-sm text-gray-300"><span className="text-base text-cyan-300">{techIcons[tag] || <FiCode />}</span>{tag}</div>)}
            </div>
          </section>
          <section className="rounded-2xl border border-white/10 bg-[#0d0c1c]/90 p-5 sm:p-6">
            <SectionTitle icon={FiActivity}>Project Info</SectionTitle>
            <div className="space-y-3 text-sm">
              {[[FiLayout, "Category", details.category], [FiCalendar, "Duration", details.duration], [FiActivity, "Status", project.status || "Live"], [FiMonitor, "Deployed On", details.deployed]].map(([Icon, label, value]) => <div key={label} className="flex items-start justify-between gap-4 text-gray-400"><span className="flex shrink-0 items-center gap-2"><Icon className="text-purple-400" />{label}</span><span className="text-right text-gray-200">{value}</span></div>)}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-7 rounded-2xl border border-white/10 bg-[#0d0c1c]/90 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between"><SectionTitle icon={FiImage}>Screenshots & Preview</SectionTitle>{gallery.length > 1 && <div className="flex gap-2"><button onClick={() => changeImage(-1)} aria-label="Previous screenshot" className="rounded-full border border-white/15 p-2 text-gray-300 hover:border-purple-400"><FiChevronLeft /></button><button onClick={() => changeImage(1)} aria-label="Next screenshot" className="rounded-full border border-white/15 p-2 text-gray-300 hover:border-purple-400"><FiChevronRight /></button></div>}</div>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#080817]"><img src={gallery[activeImage]} alt={`${project.title} screenshot ${activeImage + 1}`} className="h-52 w-full object-contain sm:h-[430px]" /></div>
        {gallery.length > 1 && <div className="mt-3 flex justify-center gap-2">{gallery.map((_, index) => <button key={index} onClick={() => setActiveImage(index)} aria-label={`Show screenshot ${index + 1}`} className={`h-2 rounded-full transition-all ${activeImage === index ? "w-6 bg-purple-400" : "w-2 bg-gray-600"}`} />)}</div>}
        {gallery.length === 1 && <p className="mt-3 text-center text-xs text-gray-500">Add more images to this project's gallery in projectDetails.js to create a browsable screenshot carousel.</p>}
      </section>

      <section className="mt-7 rounded-2xl border border-white/10 bg-[#0d0c1c]/90 p-5 sm:p-6">
        <SectionTitle icon={FiCode}>Tech Architecture</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {details.architecture.map((item, index) => <div key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#171629] p-3 text-xs text-gray-200"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-300">{[<FaReact />, <FaNodeJs />, <FiDatabase />, <FiCloud />, <FiLock />][index % 5]}</span><span>{item}</span></div>)}
        </div>
      </section>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-white/10 bg-[#0d0c1c]/90 p-5 sm:p-6">
          <SectionTitle icon={FiCheckCircle}>What I Learned</SectionTitle>
          <ul className="grid gap-3 sm:grid-cols-2">{details.learning.map((item) => <li key={item} className="flex gap-2 text-xs leading-5 text-gray-400"><FiCheckCircle className="mt-0.5 shrink-0 text-purple-400" />{item}</li>)}</ul>
        </section>
        <section className="rounded-2xl border border-white/10 bg-[#0d0c1c]/90 p-5 sm:p-6">
          <SectionTitle icon={FiZap}>Future Improvements</SectionTitle>
          <ul className="space-y-3">{details.improvements.map((item) => <li key={item} className="flex gap-2 text-xs leading-5 text-gray-400"><FiCheckCircle className="mt-0.5 shrink-0 text-purple-400" />{item}</li>)}</ul>
        </section>
      </div>
      {stats && <div className="mt-5 flex flex-wrap gap-3">{[[stats.features, "Features"], [stats.apis, "API Endpoints"], [stats.responsive, "Responsive"]].map(([value, label]) => <div key={label} className="rounded-xl border border-white/10 bg-[#0d0c1c] px-5 py-3"><div className="text-lg font-bold text-purple-300">{value}</div><div className="text-xs text-gray-500">{label}</div></div>)}</div>}
    </div>
  );
}


export default ProjectDetails;
