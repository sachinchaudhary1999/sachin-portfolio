// Two-column section: a sticky heading rail on the left, content on the right.
export default function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line py-16 md:py-24" aria-labelledby={`${id}-title`}>
      <div className="container-page grid grid-cols-1 gap-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <header className="md:sticky md:top-24 md:self-start">
          <h2 id={`${id}-title`} className="text-2xl md:text-[1.75rem]">{title}</h2>
          {intro && <p className="mt-2 max-w-xs text-sm text-muted">{intro}</p>}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
