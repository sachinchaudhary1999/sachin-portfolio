import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(cleanup);

window.matchMedia =
  window.matchMedia ||
  ((query) => ({
    matches: query.includes("min-width"), // behave like a desktop viewport
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn();
window.IntersectionObserver = class {
  observe() {}
  disconnect() {}
  unobserve() {}
};
// GitHub API is stubbed so tests never hit the network.
globalThis.fetch = vi.fn(async (url) => ({
  ok: true,
  json: async () =>
    String(url).includes("/repos")
      ? [{ name: "BiteRush", html_url: "https://github.com/x/BiteRush", description: "demo", language: "JavaScript", pushed_at: new Date().toISOString(), stargazers_count: 0, fork: false }]
      : { public_repos: 7, followers: 3, created_at: "2022-01-01T00:00:00Z" },
}));
// SVG path geometry isn't implemented in jsdom.
window.SVGElement.prototype.getTotalLength = () => 100;
window.SVGElement.prototype.getPointAtLength = () => ({ x: 0, y: 0 });
