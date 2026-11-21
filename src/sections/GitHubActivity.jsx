import { useEffect, useState } from "react";
import { FiExternalLink, FiStar } from "react-icons/fi";
import Section from "../components/Section";
import { useCountUp } from "../hooks/useCountUp";
import { site } from "../data/site";

const CACHE_KEY = "gh-activity-v1";
const TTL = 30 * 60 * 1000; // public API allows 60 unauthenticated requests/hour per IP

async function load(user) {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
    if (cached && Date.now() - cached.t < TTL) return cached.data;
  } catch { /* ignore */ }

  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${user}`),
    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
  ]);
  if (!profileRes.ok || !reposRes.ok) throw new Error("GitHub API unavailable");
  const [profile, allRepos] = await Promise.all([profileRes.json(), reposRes.json()]);

  const repos = allRepos.filter((r) => !r.fork);
  const counts = {};
  repos.forEach((r) => r.language && (counts[r.language] = (counts[r.language] || 0) + 1));
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  const languages = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, n]) => ({ name, n, pct: Math.round((n / total) * 100) }));

  const data = {
    publicRepos: profile.public_repos,
    followers: profile.followers,
    since: new Date(profile.created_at).getFullYear(),
    stars: repos.reduce((s, r) => s + r.stargazers_count, 0),
    languages,
    recent: repos.slice(0, 4).map((r) => ({
      name: r.name, url: r.html_url, description: r.description, language: r.language, pushed: r.pushed_at,
    })),
  };
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data })); } catch { /* ignore */ }
  return data;
}

const rtf = typeof Intl !== "undefined" ? new Intl.RelativeTimeFormat("en", { numeric: "auto" }) : null;
function ago(iso) {
  const days = Math.round((new Date(iso) - Date.now()) / 86400000);
  if (!rtf) return "";
  if (Math.abs(days) < 1) return "today";
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}

function Stat({ value, label, count }) {
  const n = useCountUp(value);
  return (
    <div>
      <dd className="text-2xl font-semibold tabular-nums tracking-tight">{count ? n : value}</dd>
      <dt className="text-sm text-muted">{label}</dt>
    </div>
  );
}

const opacities = [1, 0.75, 0.55, 0.4, 0.28];

export default function GitHubActivity() {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let alive = true;
    load(site.github.user)
      .then((data) => alive && setState({ status: "ready", data }))
      .catch(() => alive && setState({ status: "error", data: null }));
    return () => { alive = false; };
  }, []);

  const { status, data } = state;

  return (
    <Section id="github" title="GitHub" intro="Live from the public GitHub API, not a screenshot.">
      {status === "loading" && (
        <div className="space-y-4" aria-busy="true" aria-label="Loading GitHub activity">
          <div className="h-5 w-2/3 animate-pulse rounded bg-line/60" />
          <div className="h-3 w-full animate-pulse rounded bg-line/60" />
          <div className="h-24 w-full animate-pulse rounded bg-line/40" />
        </div>
      )}

      {status === "error" && (
        <p className="max-w-[55ch] text-muted">
          Live GitHub data isn’t available right now (the public API may be rate-limited). Browse the repositories directly on{" "}
          <a href={site.github.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
            github.com/{site.github.user}
          </a>.
        </p>
      )}

      {status === "ready" && (
        <div className="space-y-10">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              [data.publicRepos, "public repositories"],
              [data.followers, "followers"],
              [data.stars, "stars earned"],
              [data.since, "on GitHub since"],
            ]
              .filter(([v]) => v > 0) // hide empty counters rather than advertise zeros
              .map(([v, l]) => <Stat key={l} value={v} label={l} count={l !== "on GitHub since"} />)}
          </dl>

          {data.languages.length > 0 && (
            <div>
              <h3 className="text-base">Languages across public repositories</h3>
              <div
                className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-line"
                role="img"
                aria-label={data.languages.map((l) => `${l.name} ${l.pct}%`).join(", ")}
              >
                {data.languages.map((l, i) => (
                  <span key={l.name} style={{ width: `${l.pct}%`, opacity: opacities[i] }} className="bg-accent" />
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
                {data.languages.map((l, i) => (
                  <li key={l.name} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" style={{ opacity: opacities[i] }} aria-hidden="true" />
                    {l.name} {l.pct}%
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-base">Recently pushed</h3>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {data.recent.map((r) => (
                <li key={r.name}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="group grid gap-1 py-3.5 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-medium group-hover:text-accent">
                        {r.name} <FiExternalLink aria-hidden="true" className="text-muted" />
                      </span>
                      {r.description && <span className="mt-0.5 block truncate text-sm text-muted">{r.description}</span>}
                    </span>
                    <span className="flex items-center gap-3 text-sm text-muted sm:justify-end">
                      {r.language && <span>{r.language}</span>}
                      <span>{ago(r.pushed)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <FiStar aria-hidden="true" /> Forks are excluded. Data is cached for 30 minutes.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
}
