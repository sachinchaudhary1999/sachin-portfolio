// Runs after `vite build` and `vite build --ssr`. For every route it writes a static HTML file with:
//   - its own <title>, description, canonical URL, Open Graph / Twitter tags and JSON-LD
//   - the full page content rendered as HTML (for crawlers, link previews and no-JS clients)
// It also generates sitemap.xml and robots.txt from the real list of pages.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssr = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);
const { render, routes, siteConfig } = ssr;

const SITE = (process.env.SITE_URL || siteConfig.url).replace(/\/$/, "");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const person = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: `${SITE}/`,
  image: `${SITE}/og.png`,
  sameAs: [siteConfig.github.url, siteConfig.linkedin],
  knowsAbout: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "JWT authentication", "Tailwind CSS"],
};

function jsonLd(route) {
  if (route.type === "home") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        person,
        { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: `${siteConfig.name} Portfolio`, author: { "@id": `${SITE}/#person` } },
        { "@type": "ProfilePage", url: `${SITE}/`, mainEntity: { "@id": `${SITE}/#person` } },
      ],
    };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/#projects` },
          { "@type": "ListItem", position: 3, name: route.project.title, item: `${SITE}${route.path}` },
        ],
      },
      {
        "@type": "SoftwareSourceCode",
        name: route.project.title,
        description: route.project.summary,
        codeRepository: route.project.github,
        url: `${SITE}${route.path}`,
        keywords: route.project.tags.join(", "),
        author: { "@id": `${SITE}/#person` },
      },
      person,
    ],
  };
}

function headFor(route) {
  const url = `${SITE}${route.path === "/" ? "/" : route.path}`;
  return `<title>${esc(route.title)}</title>
    <meta name="description" content="${esc(route.description)}" />
    <meta name="author" content="${esc(siteConfig.name)}" />
    <meta name="theme-color" content="#09142b" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta property="og:type" content="${route.type === "home" ? "website" : "article"}" />
    <meta property="og:site_name" content="${esc(siteConfig.name)}" />
    <meta property="og:title" content="${esc(route.title)}" />
    <meta property="og:description" content="${esc(route.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE}/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(route.title)}" />
    <meta name="twitter:description" content="${esc(route.description)}" />
    <meta name="twitter:image" content="${SITE}/og.png" />
    <script type="application/ld+json">${JSON.stringify(jsonLd(route))}</script>`;
}

for (const route of routes) {
  const html = await render(route.path);
  let page = template.replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, `<!--seo-start-->\n    ${headFor(route)}\n    <!--seo-end-->`);
  page = page.replace('<div id="root"></div>', `<div id="root" data-prerendered>${html}</div>`);
  const out = route.path === "/" ? path.join(dist, "index.html") : path.join(dist, route.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  console.log("prerendered", route.path);
}

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${SITE}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><priority>${r.path === "/" ? "1.0" : "0.7"}</priority></url>`)
    .join("\n")}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`sitemap.xml and robots.txt written for ${SITE}`);
