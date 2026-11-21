// Every file in src/data/projects/ (except those starting with "_") becomes a project automatically.
// Images come from two folders per project:
//   src/assets/screens/<slug>/main/     up to 5 featured images (first = cover, shown in the showcase)
//   src/assets/screens/<slug>/gallery/  as many extra images as you like (10-15 works well), lazy loaded
const files = import.meta.glob("./projects/[!_]*.js", { eager: true, import: "default" });
const shots = import.meta.glob("../assets/screens/*/{main,gallery}/*.{png,jpg,jpeg,webp,avif}", { eager: true, import: "default" });

export const MAIN_MAX = 5;

// A file name containing "full", "scroll", "tall" or "long" marks a full-page screenshot (e.g. 01-home-full.webp).
// Very tall images are also detected automatically once they load.
const TALL_HINT = /(^|[-_ ])(full|scroll|tall|long)([-_. ]|$)/i;

const toCaption = (file) => {
  const t = file.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

const imagesFor = (slug, folder) =>
  Object.entries(shots)
    .filter(([path]) => {
      const parts = path.split("/");
      return parts.at(-3) === slug && parts.at(-2) === folder;
    })
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => {
      const file = path.split("/").pop();
      return { src, caption: toCaption(file), tall: TALL_HINT.test(file) };
    });

export const projects = Object.values(files)
  .map((p) => {
    const allMain = imagesFor(p.slug, "main");
    if (import.meta.env.DEV && allMain.length > MAIN_MAX) {
      console.warn(`[${p.slug}] main/ has ${allMain.length} images; only the first ${MAIN_MAX} are shown. Move the rest to gallery/.`);
    }
    const main = allMain.slice(0, MAIN_MAX);
    return {
      stats: [], tags: [], features: [], learned: [], next: [], architecture: [], featured: false,
      ...p, main, gallery: imagesFor(p.slug, "gallery"), image: main[0]?.src, imageTall: main[0]?.tall ?? false,
    };
  })
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];

export const getProject = (param) => projects.find((p) => p.slug === param || p.legacyId === param);
