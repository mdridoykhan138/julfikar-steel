import rebar from "@/assets/product-rebar.jpg";
import structural from "@/assets/product-structural.jpg";
import industrial from "@/assets/product-industrial.jpg";

const PRODUCTS = [
  {
    index: "01",
    name: "Reinforcement Steel",
    image: rebar,
    copy: "Deformed bars in graded diameters for concrete structures demanding high yield strength and reliable bond.",
    specs: ["Grade 60 / 500W", "8mm – 32mm", "Bundled & tagged"],
  },
  {
    index: "02",
    name: "Structural Steel",
    image: structural,
    copy: "Angles, channels and beam sections rolled to dimensional tolerance for frames, bridges and industrial buildings.",
    specs: ["Hot rolled sections", "Mill test certified", "Custom lengths"],
  },
  {
    index: "03",
    name: "Industrial Steel",
    image: industrial,
    copy: "Flats, plates and coil stock supplied to fabricators and heavy engineering with consistent surface and chemistry.",
    specs: ["Flat & plate", "Controlled chemistry", "Bulk supply"],
  },
];

export function Products() {
  return (
    <section
      id="products"
      className="relative border-t border-[color:var(--border)] bg-[#130f15] py-[clamp(6rem,16vh,12rem)]"
    >
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Section 02 — Products</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="display display-lg lg:col-span-7" data-reveal="mask">
            Steel that
            <br />
            performs.
          </h2>
          <p
            className="text-xl leading-relaxed text-[color:var(--steel)] lg:col-span-5"
            data-reveal
          >
            Three core product families, one standard. Each is rolled, cooled and verified on the
            same line discipline so specification never depends on which batch arrives.
          </p>
        </div>

        <div className="mt-[clamp(3rem,8vh,6rem)] grid gap-px md:grid-cols-3" data-stagger>
          {PRODUCTS.map((p) => (
            <article key={p.name} className="product-card flex flex-col bg-[#130f15]">
              <div className="relative overflow-hidden" data-reveal="image">
                <img
                  src={p.image}
                  alt={`${p.name} produced by Julfikar Steel Re-Rolling Mills Ltd.`}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover grayscale"
                />
                <span className="absolute left-5 top-5 text-[12px] tracking-[0.4em] text-[color:var(--brand)]">
                  {p.index}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="display text-[clamp(1.4rem,2.2vw,2rem)]">{p.name}</h3>
                <p className="mt-4 text-xl leading-relaxed text-[color:var(--steel-dim)]">
                  {p.copy}
                </p>
                {/* <ul className="mt-7 space-y-2 border-t border-[color:var(--border)] pt-5">
                  {p.specs.map((s) => (
                    <li
                      key={s}
                      className="text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--steel)]"
                    >
                      {s}
                    </li>
                  ))}
                </ul> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
