/* global Buffer */
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";
import ThemeProvider from "./hooks/ThemeProvider";
import { site } from "./data/site";
import { projects } from "./data/projects";

// Used only at build time by scripts/prerender.mjs.
export const siteConfig = site;

const trim = (t, n = 158) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);

export const routes = [
  {
    path: "/",
    title: `${site.name} | MERN Stack Developer`,
    description: trim(
      `${site.name} is a full-stack developer building MERN applications with React, Node.js, Express and MongoDB. ${site.summary}`
    ),
    type: "home",
  },
  ...projects.map((p) => ({
    path: `/projects/${p.slug}`,
    title: `${p.title} case study | ${site.name}`,
    description: trim(`${p.title} case study by ${site.name}. ${p.summary}`),
    type: "project",
    project: { title: p.title, summary: p.summary, github: p.github, tags: p.tags, webapp: p.webapp },
  })),
];

export function render(url) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const sink = new PassThrough();
    sink.on("data", (c) => chunks.push(c));
    sink.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StaticRouter>,
      { onAllReady: () => pipe(sink), onError: reject }
    );
  });
}
