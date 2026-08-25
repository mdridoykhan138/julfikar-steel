const FACTS = [
  { label: "Capacity", value: "500 MT", sub: "MS rebar per day · 400 MT billet" },
  { label: "Land", value: "300", sub: "Decimal of mill & yard area" },
  { label: "Electricity", value: "15 MW", sub: "Connected load" },
  { label: "Gas", value: "40,000", sub: "Cubic feet of natural gas" },
  { label: "Manpower", value: "800+", sub: "Permanent & contractual staff" },
  { label: "Certified", value: "ISO · BSTI", sub: "BUET tested · PWD enlisted" },
];

export function AboutFacts() {
  return (
    <section className="relative border-t border-[color:var(--border)] py-[clamp(6rem,16vh,12rem)]">
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Section 02 — Overview of the Company</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-start">
          <h2 className="display display-lg lg:col-span-7" data-reveal="mask">
            Overview of the
            <br />
            Company.
          </h2>
          <p
            className="text-xl leading-relaxed text-[color:var(--steel)] lg:col-span-5"
            data-reveal
          >
            Every figure below reflects one discipline — consistency across capacity, energy, people
            and certification.
          </p>
        </div>

        <div
          className="mt-[clamp(3rem,8vh,6rem)] grid gap-px bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3"
          data-stagger
        >
          {FACTS.map((f) => (
            <div key={f.label} className="bg-[#130f15] p-8">
              <span className="text-[12px] tracking-[0.4em] text-[color:var(--brand)]">
                {f.label}
              </span>
              <p className="display mt-5 text-[clamp(2rem,4vw,3rem)]">{f.value}</p>
              <p className="mt-3 text-xl leading-relaxed text-[color:var(--steel-dim)]">{f.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
