const STATS = [
  {
    value: "01",
    label: "Strength",
    copy: "High tensile grades tested for yield, ductility and load.",
  },
  {
    value: "02",
    label: "Precision",
    copy: "Controlled rolling tolerances held across every batch.",
  },
  { value: "03", label: "Quality", copy: "Documented inspection from billet to finished bundle." },
];

export function About() {
  return (
    <section
      id="about"
      className="relative border-t border-[color:var(--border)] py-[clamp(6rem,16vh,12rem)]"
    >
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Section 01 — About</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="display display-lg" data-reveal="mask">
              Built from
              <br />
              strength.
            </h2>
          </div>
          <div className="space-y-7 lg:col-span-5">
            <p className="text-xl leading-relaxed text-[color:var(--steel)]" data-reveal>
              Julfikar Steel Re-Rolling Mills Ltd. is a modern steel manufacturer producing
              reinforcement, structural and industrial steel for construction and heavy industry.
            </p>
            <p
              className="text-xl leading-relaxed text-[color:var(--steel-dim)]"
              data-reveal
              data-reveal-delay="0.1"
            >
              Our mills are built around a single discipline: consistency. Raw material is selected,
              heated, rolled and verified under controlled conditions so that every bar leaving the
              line performs exactly as specified — in the lab, on site, and for decades after.
            </p>
            <a href="#manufacturing" className="btn-ghost" data-reveal data-reveal-delay="0.15">
              Inside the Mill
            </a>
          </div>
        </div>

        <div
          className="mt-[clamp(4rem,10vh,7rem)] grid border-t border-[color:var(--border)] md:grid-cols-3"
          data-stagger
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="border-b border-[color:var(--border)] px-0 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <span className="text-[12px] tracking-[0.4em] text-[color:var(--brand)]">
                {s.value}
              </span>
              <h3 className="display mt-5 text-[clamp(1.6rem,3vw,2.4rem)]">{s.label}</h3>
              <p className="mt-4 max-w-xs text-xl leading-relaxed text-[color:var(--steel-dim)]">
                {s.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
