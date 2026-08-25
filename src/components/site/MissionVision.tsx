import rebar from "@/assets/product-rebar.jpg";
import structural from "@/assets/product-structural.jpg";

export function MissionVision() {
  return (
    <section className="relative border-t border-[color:var(--border)] py-[clamp(6rem,16vh,12rem)]">
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Section 04 — Purpose</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        {/* Mission — left content, right image */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6" data-reveal>
            <span className="text-[12px] tracking-[0.4em] text-[color:var(--brand)]">
              Our Mission
            </span>
            <h3 className="display mt-5 text-[clamp(1.6rem,3vw,2.4rem)]">
              Deliver steel that performs — every single bar.
            </h3>
            <p className="mt-5 text-xl leading-relaxed text-[color:var(--steel-dim)]">
              Our mission is to deliver high-quality steel products through innovative technology
              and sustainable practices. We are committed to empowering our workforce, supporting
              local communities, and driving economic growth while providing exceptional value to
              our customers.
            </p>
          </div>
          <div className="lg:col-span-6" data-reveal="image">
            <div className="aspect-[4/3] overflow-hidden border border-[color:var(--border)]">
              <img
                src={rebar}
                alt="High tensile TMT rebar production"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Vision — left image, right content */}
        <div className="mt-[clamp(4rem,10vh,7rem)] grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="order-2 lg:order-1 lg:col-span-6" data-reveal="image">
            <div className="aspect-[4/3] overflow-hidden border border-[color:var(--border)]">
              <img
                src={structural}
                alt="Structural steel sections"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6" data-reveal>
            <span className="text-[12px] tracking-[0.4em] text-[color:var(--brand)]">
              Our Vision
            </span>
            <h3 className="display mt-5 text-[clamp(1.6rem,3vw,2.4rem)]">
              Lead Bangladesh&apos;s steel industry forward.
            </h3>
            <p className="mt-5 text-xl leading-relaxed text-[color:var(--steel-dim)]">
              To lead the steel industry with innovative solutions, sustainable practices and a
              commitment to excellence — shaping a stronger future for communities and economies,
              locally and globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
