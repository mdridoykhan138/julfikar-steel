import { useEffect, useRef } from "react";
import millLine from "@/assets/mill-line.jpg";
import { prefersReducedMotion, useGsap } from "@/lib/reveal";

const STEPS = [
  { n: "01", title: "Raw Material", copy: "Billet sourced and verified for chemistry before it enters the furnace." },
  { n: "02", title: "Processing", copy: "Reheating under controlled temperature for uniform grain structure." },
  { n: "03", title: "Rolling", copy: "Sequential stands reduce section to exact dimensional tolerance." },
  { n: "04", title: "Quality Control", copy: "Tensile, bend and dimensional testing on sampled production." },
  { n: "05", title: "Finished Steel", copy: "Cut, bundled, tagged and dispatched with mill test certification." },
];

export function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line || prefersReducedMotion()) return;
    const { gsap } = useGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: line, start: "top 85%", end: "bottom 40%", scrub: true },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manufacturing"
      ref={rootRef}
      className="relative border-t border-[color:var(--border)] py-[clamp(6rem,16vh,12rem)]"
    >
      <div className="shell">
        <div className="flex items-baseline gap-6">
          <span className="eyebrow">Section 03 — Manufacturing &amp; Quality</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="display display-lg lg:col-span-6" data-reveal="mask">
            Precision in
            <br />
            every ton.
          </h2>
          <p className="text-sm leading-relaxed text-[color:var(--steel)] lg:col-span-4" data-reveal>
            Advanced rolling equipment, instrumented process control and documented inspection keep
            output consistent — batch to batch, shipment to shipment.
          </p>
          <p
            className="text-sm leading-relaxed text-[color:var(--steel-dim)] lg:col-span-2"
            data-reveal
            data-reveal-delay="0.1"
          >
            Strength, ductility and dimension are engineered, not assumed.
          </p>
        </div>

        <div
          className="relative mt-[clamp(3rem,8vh,5rem)] aspect-21/9 overflow-hidden border border-[color:var(--border)]"
          data-reveal="image"
        >
          <img
            src={millLine}
            alt="Hot billet passing through the rolling line at Julfikar Steel"
            loading="lazy"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
            data-parallax="30"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,4,5,0.75),transparent_60%)]" />
        </div>

        <div id="quality" className="mt-[clamp(4rem,10vh,7rem)]">
          <div className="relative h-px w-full bg-[color:var(--border)]">
            <div
              ref={lineRef}
              className="process-line absolute inset-0 bg-[color:var(--steel)]"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          <div className="grid gap-px md:grid-cols-5" data-stagger>
            {STEPS.map((s) => (
              <div key={s.n} className="pt-8 md:pr-6">
                <span className="text-[0.65rem] tracking-[0.4em] text-[color:var(--steel-dim)]">
                  {s.n}
                </span>
                <h3 className="display mt-4 text-[clamp(1.15rem,1.6vw,1.5rem)]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--steel-dim)]">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
