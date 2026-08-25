import { useEffect, useRef } from "react";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import millLine from "@/assets/mill-line.jpg";
import industrial from "@/assets/product-industrial.jpg";
import structural from "@/assets/product-structural.jpg";
import rebar from "@/assets/product-rebar.jpg";
import heroPoster from "@/assets/hero-poster.jpg";
import { prefersReducedMotion, getGsap } from "@/lib/reveal";

const STEPS = [
  {
    n: "01",
    title: "Raw Material",
    copy: "Billet sourced and verified for chemistry before it enters the furnace.",
    image: millLine,
  },
  {
    n: "02",
    title: "Processing",
    copy: "Reheating under controlled temperature for uniform grain structure.",
    image: industrial,
  },
  {
    n: "03",
    title: "Rolling",
    copy: "Sequential stands reduce section to exact dimensional tolerance.",
    image: structural,
  },
  {
    n: "04",
    title: "Quality Control",
    copy: "Tensile, bend and dimensional testing on sampled production.",
    image: rebar,
  },
  {
    n: "05",
    title: "Finished Steel",
    copy: "Cut, bundled, tagged and dispatched with mill test certification.",
    image: heroPoster,
  },
];

const TOTAL = String(STEPS.length).padStart(2, "0");

export function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railTrackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const handleRailClick = (index: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const ratio = STEPS.length > 1 ? index / (STEPS.length - 1) : 0;
    const start = typeof st.start === "number" ? st.start : 0;
    const end = typeof st.end === "number" ? st.end : start;
    window.scrollTo({ top: start + ratio * (end - start), behavior: "smooth" });
  };

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const railTrack = railTrackRef.current;
    if (!root || !pin || !track || !railTrack) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const railItemHeight = 60;
    const railItems = Array.from(railTrack.querySelectorAll<HTMLElement>(".process-rail-item"));

    railItems.forEach((item, i) => {
      item.style.transform = `translateY(${i * railItemHeight}px)`;
      item.classList.toggle("is-active", i === 0);
    });

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, { x: () => -distance(), ease: "none" });
      triggerRef.current = ScrollTrigger.create({
        trigger: pin,
        animation: tween,
        start: "center center",
        end: () => "+=" + distance(),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const activeFloat = self.progress * (STEPS.length - 1);
          const activeIndex = Math.round(activeFloat);
          railItems.forEach((item, i) => {
            item.style.transform = `translateY(${(i - activeFloat) * railItemHeight}px)`;
            item.classList.toggle("is-active", i === activeIndex);
          });
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="manufacturing"
      ref={rootRef}
      className="relative border-t border-[color:var(--border)] py-[clamp(6rem,16vh,12rem)]"
    >
      <div className="shell">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Section 03 — Manufacturing &amp; Quality</span>
          <span className="rule hidden flex-1 md:block" />
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="display display-lg lg:col-span-7" data-reveal="mask">
            Precision in
            <br />
            every ton.
          </h2>
          <p
            className="text-xl leading-relaxed text-[color:var(--steel)] lg:col-span-5"
            data-reveal
          >
            Advanced rolling equipment, instrumented process control and documented inspection keep
            output consistent — batch to batch, shipment to shipment.
          </p>
        </div>
      </div>

      <div id="quality" ref={pinRef} className="relative mt-[clamp(3rem,8vh,6rem)]">
        <div className="process-cinema">
          <div ref={trackRef} className="flex h-full">
            {STEPS.map((s) => (
              <article key={s.n} className="process-project">
                <div className="process-project-frame">
                  <img
                    src={s.image}
                    alt={`${s.title} — Julfikar Steel manufacturing`}
                    loading="lazy"
                  />
                </div>
                <div className="process-project-meta">
                  <div>
                    <span className="process-project-num">
                      {s.n} / {TOTAL}
                    </span>
                  </div>
                  <h3 className="process-project-title">{s.title}</h3>
                  <p className="process-project-copy">{s.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <nav className="process-rail" aria-label="Process steps">
            <div ref={railTrackRef} className="process-rail-track">
              {STEPS.map((s, i) => (
                <button
                  key={s.n}
                  type="button"
                  className="process-rail-item"
                  onClick={() => handleRailClick(i)}
                  aria-label={`Go to step ${s.n} — ${s.title}`}
                >
                  <span className="process-rail-thumb">
                    <img src={s.image} alt="" />
                  </span>
                  <span className="process-rail-index">{s.n}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
