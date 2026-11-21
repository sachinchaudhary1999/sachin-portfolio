# Sachin Chaudhary: developer portfolio

A React portfolio built to look like an engineering showcase: interactive request-flow diagram, command palette, light/dark themes, live GitHub data, per-project case studies with galleries, and pre-rendered pages for search engines.

> Looking for how to get found on Google? Read **[SEO-GUIDE.md](./SEO-GUIDE.md)**. It explains how search works and gives a step-by-step checklist for this site.

## Contents

1. [Tech stack](#1-tech-stack)
2. [Quick start](#2-quick-start)
3. [Project structure](#3-project-structure)
4. [Editing your content](#4-editing-your-content)
5. [Adding a project and its gallery](#5-adding-a-project-and-its-gallery)
6. [Design system](#6-design-system)
7. [Features and how they work](#7-features-and-how-they-work)
8. [How the build and pre-rendering work](#8-how-the-build-and-pre-rendering-work)
9. [Configuration and environment variables](#9-configuration-and-environment-variables)
10. [Deploying to Vercel (and a custom domain)](#10-deploying-to-vercel-and-a-custom-domain)
11. [Testing](#11-testing)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Tech stack

| Area | Choice |
| --- | --- |
| UI | React 18, React Router 7 |
| Styling | Tailwind CSS with CSS-variable design tokens |
| Build | Vite 6 (client build + SSR build for pre-rendering) |
| Icons | react-icons (Feather and Simple Icons) |
| Contact form | EmailJS |
| Tests | Vitest, Testing Library, jsdom |
| Hosting | Vercel (any static host works) |

## 2. Quick start

```bash
npm install
npm run dev          # http://localhost:5173  (hot reload)
npm run build        # production build + pre-rendering into dist/
npm run preview      # serve dist/ locally to check the real output
npm run images       # convert PNG/JPG screenshots to optimized WebP
npm test             # smoke tests
npm run lint
```

Requires Node 18 or newer.

## 3. Project structure

```
public/                 Static files copied as-is (favicon.png, og.png)
scripts/prerender.mjs   Post-build step: per-page HTML, sitemap.xml, robots.txt
src/
  data/
    site.js             Name, headline, summary, email, résumé, social links, SITE URL
    projects.js         Loads every file in projects/ and every image in assets/screens/
    projects/           ONE FILE PER PROJECT (+ _template.js)
    experience.js       Experience and education
    skills.js           Skill groups and icons
  assets/screens/<slug>/main/     Up to 5 featured images per project
  assets/screens/<slug>/gallery/  10-15 extra images per project (lazy loaded)
  components/           Navbar, CommandPalette, RequestFlow (hero diagram), Gallery, ...
  sections/             Home page sections (Hero, Projects, Experience, Skills, GitHub, Education, Contact)
  pages/                HomePage, ProjectPage
  hooks/                Theme, media queries, scroll tracking, count-up, document title
  entry-server.jsx      Used only at build time to render pages to HTML
  index.css             Design tokens and motion utilities
index.html              HTML shell (contains the SEO markers the prerender script fills)
vercel.json             Route rewrites so refreshing /projects/... works
```

## 4. Editing your content

You rarely need to touch components. Content lives in `src/data/`.

| To change | Edit |
| --- | --- |
| Name, headline, summary, availability pill, email, résumé link, GitHub and LinkedIn, **site URL** | `src/data/site.js` |
| A project's text, links, stats, tags | `src/data/projects/<slug>.js` |
| Jobs and education | `src/data/experience.js` |
| Skills and icons | `src/data/skills.js` |
| Colors | CSS variables at the top of `src/index.css` |
| Profile photo | replace `src/assets/profile.webp` |
| Social preview image | replace `public/og.png` (1200x630) |

Things worth setting in `site.js`:

- `email`: leave `""` to hide the "Copy email" button, or add your public address to show it.
- `availability`: set `open: false` to hide the "Open to new opportunities" pill.
- `url`: your real site address. This feeds canonical links, the sitemap and social tags (see the SEO guide).

Only publish numbers you can back up (for example the "70+ features" stats). Recruiters do open the repositories.

## 5. Adding a project and its gallery

Each project is its own file and its own image folder, so galleries never mix and the list scales to any number of projects.

1. Copy `src/data/projects/_template.js` to `src/data/projects/<slug>.js` and fill it in. The `slug` becomes the URL: `/projects/<slug>`.
2. Create two image folders for it (same slug):
   - `src/assets/screens/<slug>/main/`: the **5 featured images** (maximum 5; extras are ignored with a console warning in dev). `01-...` is the cover on the home page. They appear at the top of the case study as a large viewer with a thumbnail switcher.
   - `src/assets/screens/<slug>/gallery/`: **as many extra images as you like (10 to 15 works well)**. They appear in a full-width Gallery section below the case-study text.
3. Run `npm run build` or `npm run dev`. The project gets a home-page card, a case-study page, a command-palette entry, the showcase and gallery, a sitemap entry and its own SEO tags automatically.

Details:

- **Order and layout**: `order` (lower first). `featured: true` gives a large row; `featured: false` puts it in the compact "More projects" grid. With 5 or more projects in two or more categories, filter buttons appear.
- **Captions**: the file name becomes the caption: `02-order-tracking.webp` shows "Order tracking". Order within a folder follows the number prefix.
- **Gallery behaviour**: the Gallery is a full-width, two-column masonry below the case-study text. Images are shown **uncropped** at their natural shape, the first 6 appear and "Show more" reveals 6 at a time, every image loads lazily with a blur-up fade, and clicking a tile opens a full-screen viewer with thumbnails, arrow keys and swipe. Very tall full-page captures are capped in height with a fade and a "Full page" badge, and scroll in the viewer.
- **Image format**: `.webp`, `.png` or `.jpg`, around 1600px wide, to keep pages fast. Crop out private data such as emails and phone numbers before adding screenshots.
- **No images yet**: the card shows "Screenshot coming soon" and the Gallery section stays hidden.

### Full-page (scrolling) screenshots

You can put a full-length screenshot (for example Chrome DevTools "Capture full size screenshot") in `main/` or `gallery/`.

**How to capture:** open your site, press `F12`, then `Ctrl/Cmd + Shift + P`, type `screenshot` and choose **Capture full size screenshot**. Chrome saves a tall PNG.

**How to add it:**
1. Name it with a hint word: `01-home-full.png`, `02-dashboard-scroll.png` (any of `full`, `scroll`, `tall`, `long` as a separate word). Very tall images are also detected automatically once they load, but the hint avoids a small layout jump.
2. Drop it in `src/assets/screens/<slug>/main/` (or `gallery/`).
3. Run `npm run images`. This converts every PNG/JPG in `src/assets/screens/` to WebP (max 1440px wide, quality 82) and moves the originals to `screens-originals/` (outside `src/`, ignored by git) so nothing is lost. Or convert manually with squoosh.app.
4. Run `npm run dev` or `npm run build`.

**How it appears:**
- **Case-study page:** the whole page shows inside a scrollable browser window (up to 75% of the screen height) so visitors scroll it like the real site. Clicking the enlarge icon opens a full-screen scrollable viewer.
- **Home page card:** only the top is shown, and on hover it slowly pans down the full page.
- **Gallery:** tiles show the top of the page with a "Full page" badge; the viewer scrolls the full image.

**Limits and tips:**
- WebP supports at most 16383px in height. `npm run images` automatically splits taller captures into `-part1`, `-part2`, ... which you can show as consecutive images.
- A long page at 1440px wide is typically 300 KB to 1 MB as WebP. If it is larger, lower the quality or split it.
- Hide private data (emails, phone numbers, tokens) before capturing.

## 6. Design system

- **Concept**: blueprint. A navy dark theme, a cool paper light theme, one cobalt accent, IBM Plex Sans for text and IBM Plex Mono only for real code or logs.
- **Tokens**: `--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`, `--ok` in `src/index.css`, mapped to Tailwind colors (`bg-bg`, `text-muted`, `border-line`, `bg-accent`). Change a token and both the site and the hero diagram follow.
- **Themes**: the `dark` class on `<html>` switches the token set. A tiny inline script in `index.html` applies the saved or system theme before first paint, so there is no flash.
- **Layout**: sections use a sticky left heading and a content column (`components/Section.jsx`) rather than repeated card grids.

## 7. Features and how they work

**Hero request-flow diagram** (`components/RequestFlow.jsx`): an SVG of client, API, database, payments and media. A scripted request animates along the lines and writes to a log. Clicking a node shows what you built there. It has a wide and a tall layout for phones. The route names are illustrative and labelled that way in the UI.

**Command palette** (`Ctrl/Cmd + K`): sections, projects, theme toggle, replay diagram, résumé, social links. Fully keyboard operable (arrows, Enter, Esc).

**Live GitHub panel** (`sections/GitHubActivity.jsx`): calls the public GitHub API from the browser (repos, followers, languages, recent pushes). Responses are cached for 30 minutes in `sessionStorage` because unauthenticated requests are limited (60 per hour per IP). If the API fails, a friendly fallback with a link is shown. Set `github.user` in `site.js`.

**Case studies** (`pages/ProjectPage.jsx`): overview, features, architecture, learnings, next steps, facts sidebar, gallery and previous/next navigation. Old `/projects/1` style links redirect to the slug URL.

**Contact form** (`sections/Contact.jsx`): client-side validation, a hidden honeypot field, a 30 second cooldown, accessible error and status messages. Sends through EmailJS.

**Motion**: a one-time staggered hero entrance, a glowing active diagram node, a scroll-filled experience timeline, count-up GitHub numbers, hover zoom on screenshots and palette transitions. Everything is disabled for people who enable "reduce motion" in their OS.

**Accessibility**: skip link, visible focus states, keyboard support for the diagram, palette, menu and gallery viewer, labelled form fields, ARIA live regions for status messages.

## 8. How the build and pre-rendering work

`npm run build` runs three steps:

1. `vite build` creates the normal browser bundle in `dist/`.
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr` builds a Node version of the same app.
3. `node scripts/prerender.mjs` renders every route to HTML and writes:
   - `dist/index.html` and `dist/projects/<slug>/index.html`, each with its **own title, description, canonical URL, Open Graph and Twitter tags, and JSON-LD structured data**, plus the full page content as HTML
   - `dist/sitemap.xml` listing every real page
   - `dist/robots.txt` pointing at the sitemap

Why: Google can run JavaScript, but pre-rendered HTML is read immediately, link previews (WhatsApp, LinkedIn, X, Slack) only read raw HTML, and every page gets its own correct metadata. When the browser loads, React replaces the pre-rendered markup with the interactive app (the static copy is hidden with CSS so users never see a duplicate).

Rules for contributors: code that runs during render must not touch `window`, `document`, `localStorage` and similar directly. Put those inside `useEffect` (all existing components already follow this). If the build fails in step 3, this is the usual cause.

## 9. Configuration and environment variables

| Variable | Used for | Default |
| --- | --- | --- |
| `SITE_URL` | Overrides `site.url` at build time (canonical, sitemap, social tags) | `site.url` from `site.js` |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service | built-in value |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template | built-in value |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key | built-in value |

Copy `.env.example` to `.env` for local overrides. On Vercel set them under Project Settings, then Environment Variables. EmailJS public keys are designed to be public, but environment variables make rotating them easy. The EmailJS template should accept the fields `user_name`, `user_email`, `subject` and `message`.

## 10. Deploying to Vercel (and a custom domain)

1. Push the repository to GitHub and import it in Vercel. Framework: Vite. Build command: `npm run build`. Output directory: `dist`.
2. `vercel.json` already rewrites unknown routes to `index.html`. Pre-rendered pages are served directly.
3. **Custom domain**: Vercel project, Settings, Domains, add your domain and follow the DNS instructions. Then:
   - set `url` in `src/data/site.js` (or the `SITE_URL` env var) to the new address, with no trailing slash
   - redeploy
   - in Vercel Domains, set the old `*.vercel.app` address to redirect to the custom domain
4. Follow [SEO-GUIDE.md](./SEO-GUIDE.md) to register the site with Google.

## 11. Testing

`npm test` runs smoke tests (`src/App.test.jsx`) that check: every section renders, Ctrl+K opens the palette and navigates, the theme toggles, contact validation works, legacy project URLs redirect, unknown projects show a helpful message and diagram nodes update their detail panel. The GitHub API is mocked so tests never use the network.

Before deploying, run: `npm run lint && npm test && npm run build`.

## 12. Troubleshooting

| Symptom | Likely cause and fix |
| --- | --- |
| Refreshing `/projects/x` shows 404 | Make sure `vercel.json` is deployed; on other hosts add an SPA rewrite to `index.html` |
| Build fails at "prerender" | Something touches `window`/`document` during render; move it into `useEffect` |
| New project not showing | File must be in `src/data/projects/`, must not start with `_`, and must `export default {...}` |
| Gallery empty | Image folder name must exactly match the project `slug` |
| GitHub panel shows the fallback message | Public API rate limit or network issue; it recovers automatically after the cache window |
| Contact form says "Message not sent" | Check EmailJS service/template IDs, the allowed domains in EmailJS, and your monthly quota |
| Social preview shows an old image | Platforms cache previews; re-scrape with the Facebook Sharing Debugger or LinkedIn Post Inspector |
| Fonts look different offline | Fonts load from Google Fonts; they fall back to system fonts without a connection |
