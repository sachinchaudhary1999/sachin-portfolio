// TEMPLATE. Copy this file to src/data/projects/<your-slug>.js (files starting with "_" are ignored).
// Then add images: src/assets/screens/<your-slug>/main/ (up to 5 featured, 01- is the cover) and src/assets/screens/<your-slug>/gallery/ (10-15 extra shots).
export default {
  slug: "my-new-project", // used in the URL: /projects/my-new-project (must match the image folder name)
  order: 10, // lower numbers appear first
  featured: false, // true = large row on the home page; false = compact card under "More projects"
  title: "My New Project",
  tagline: "One line that says what it is and who it is for",
  summary: "Two sentences for the home page card.",
  overview: "A paragraph for the case-study page: what it does, the problem it solves, how it is built.",
  tags: ["React", "Node.js", "MongoDB"],
  github: "https://github.com/sachinchaudhary1999/your-repo",
  webapp: "https://your-live-demo.vercel.app",
  status: "Live",
  category: "Full stack", // also used for the filter buttons on the home page
  duration: "2 months",
  deployed: "Vercel",
  stats: [], // e.g. [{ value: "30+", label: "API endpoints" }]  (only add numbers you can back up)
  features: ["Feature one", "Feature two"],
  architecture: [
    { layer: "Client", tech: "React + Tailwind CSS" },
    { layer: "API", tech: "Node.js + Express" },
    { layer: "Database", tech: "MongoDB" },
  ],
  learned: ["What you learned"],
  next: ["What you plan next"],
};
