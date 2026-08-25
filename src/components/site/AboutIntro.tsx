import millLine from "@/assets/mill-line.jpg";
import rebar from "@/assets/product-rebar.jpg";
import structural from "@/assets/product-structural.jpg";
import industrial from "@/assets/product-industrial.jpg";
import heroPoster from "@/assets/hero-poster.jpg";

const GALLERY = [
  { src: millLine, alt: "Julfikar Steel rolling mill line in operation" },
  { src: rebar, alt: "High tensile TMT rebar bundles" },
  { src: structural, alt: "Structural steel sections" },
  { src: industrial, alt: "Industrial steel products" },
  { src: heroPoster, alt: "Julfikar Steel production facility" },
  { src: millLine, alt: "Hot rolling process at Julfikar Steel" },
];

export function AboutIntro() {
  return (
    <section className="relative border-t border-[color:var(--border)] py-[clamp(6rem,16vh,12rem)]">
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Section 01 — About Us</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <h2 className="display display-lg" data-reveal="mask">
              Julfikar Steel
              <br />
              Re-Rolling Mills Ltd.
            </h2>
            <p className="mt-7 text-xl leading-relaxed text-[color:var(--steel)]" data-reveal>
              Julfikar Steel Re-Rolling Mills Ltd. — One of the leaders of Bangladesh in
              manufacturing steel, promising a super strong future and economy with its world-class
              products. Not only structural bar, Julfikar Steel is also one of the producers of low
              &amp; medium carbon and low alloy steel billets in Bangladesh, the main ingredient of
              manufacturing graded steel bar.
            </p>
          </div>
          <div className="lg:col-span-5" data-reveal="image">
            <div className="aspect-[4/3] overflow-hidden border border-[color:var(--border)]">
              <img
                src={millLine}
                alt="Julfikar Steel rolling mill in operation"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Image gallery */}
        <div
          className="mt-[clamp(3rem,8vh,6rem)] grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          data-stagger
        >
          {GALLERY.map((img) => (
            <div
              key={img.alt}
              className="aspect-[4/3] overflow-hidden border border-[color:var(--border)]"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>

        {/* Company history */}
        <div className="mt-[clamp(4rem,10vh,7rem)] grid gap-14 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-7">
            <p className="text-xl leading-relaxed text-[color:var(--steel)]" data-reveal>
              Julfikar Steel Re-Rolling Mills Ltd. began operations as a rolling mill, sourcing and
              re-rolling billets into graded MS rod. Through a comprehensive Balancing,
              Modernisation, Rehabilitation and Expansion (BMRE) programme, production capacity and
              product range grew steadily — from non-graded rod to certified TMT 500W reinforcement
              bars and quality billets.
            </p>
            <p
              className="text-xl leading-relaxed text-[color:var(--steel-dim)]"
              data-reveal
              data-reveal-delay="0.1"
            >
              After completion of the BMRE project, overall production efficiency has increased
              dramatically and the product portfolio has been expanded to include TMT 500W MS Rod,
              MS Billet, and structural steel — allowing the company to grip market share, create
              market demand, and play an important role in the steel and economic sector of
              Bangladesh.
            </p>
          </div>
          <div className="lg:col-span-5" data-reveal="image">
            <div className="aspect-[4/3] overflow-hidden border border-[color:var(--border)]">
              <img
                src={structural}
                alt="Structural steel production at Julfikar Steel"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
