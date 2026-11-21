import Section from "../components/Section";
import { education } from "../data/experience";

export default function Education() {
  return (
    <Section id="education" title="Education" intro="Computer applications from BCA to MCA.">
      <ul className="divide-y divide-line">
        {education.map((e) => (
          <li key={e.degree} className="grid gap-1 py-5 first:pt-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:gap-6">
            <div>
              <h3 className="text-base">{e.degree}</h3>
              <p className="text-sm text-ink/90">{e.school}</p>
              {e.points && (
                <ul className="mt-2 max-w-[65ch] list-disc space-y-1 pl-5 text-sm text-muted marker:text-line">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              )}
            </div>
            <div className="text-sm text-muted sm:text-right">
              <p>{e.date}</p>
              {e.grade && <p className="font-medium text-ink">{e.grade}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
