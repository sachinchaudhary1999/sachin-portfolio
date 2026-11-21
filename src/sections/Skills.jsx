import Section from "../components/Section";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <Section id="skills" title="Skills" intro="The tools I use to build, test and ship full-stack apps.">
      <div className="grid gap-10">
        {skillGroups.map((g) => (
          <div key={g.title} className="grid gap-4 sm:grid-cols-[11rem_1fr]">
            <div>
              <h3 className="text-base">{g.title}</h3>
              <p className="mt-1 text-sm text-muted">{g.note}</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {g.skills.map(({ name, icon: Icon }) => (
                <li key={name} className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-sm transition-colors hover:border-accent/60">
                  <Icon aria-hidden="true" className="text-base text-muted" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
