import { useEffect, useRef, useState } from "react";
import videoAsset from "@/assets/zulfiqar-steel.mp4.asset.json";
import posterAsset from "@/assets/hero-poster.jpg.asset.json";
import { createHeroCanvas, type HeroCanvasHandle } from "@/lib/hero-canvas";
import { prefersReducedMotion, useGsap } from "@/lib/reveal";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!section || !canvas || !video || !stage) return;

    const { gsap, ScrollTrigger } = useGsap();
    const reduced = prefersReducedMotion();
    let engine: HeroCanvasHandle | null = null;

    // Upgrade preload once the page is interactive, then decode the first frame.
    const startLoad = () => {
      video.preload = "auto";
      video.load();
    };
    const loadTimer = window.setTimeout(startLoad, 300);

    engine = createHeroCanvas({
      canvas,
      video,
      reducedMotion: reduced,
      onFailure: () => setFailed(true),
    });

    const ctx = gsap.context(() => {
      const scrub = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => engine?.setProgress(self.progress),
      });

      if (!reduced) {
        // Cinematic push-in tied to the same progress — reverses on scroll up.
        gsap.fromTo(
          stage,
          { scale: 1.14 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );

        gsap.to(contentRef.current, {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "35% top",
            end: "72% top",
            scrub: true,
          },
        });

        const tl = gsap.timeline({ delay: 0.25 });
        tl.from("[data-hero-eyebrow]", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(
            "[data-hero-line]",
            {
              yPercent: 110,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.12,
            },
            "-=0.4",
          )
          .from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.55")
          .from("[data-hero-cta]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
          .from("[data-hero-scroll]", { opacity: 0, duration: 0.8 }, "-=0.4");
      }

      return () => scrub.kill();
    }, section);

    return () => {
      window.clearTimeout(loadTimer);
      ctx.revert();
      engine?.destroy();
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative h-[360vh] w-full">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[#040405]">
        <div ref={stageRef} className="absolute inset-0 will-change-transform">
          {failed ? (
            <div
              className="hero-fallback"
              style={{ backgroundImage: `url(${posterAsset.url})` }}
              aria-hidden="true"
            />
          ) : (
            <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
          )}
        </div>

        <video
          ref={videoRef}
          src={videoAsset.url}
          poster={posterAsset.url}
          preload="metadata"
          muted
          playsInline
          crossOrigin="anonymous"
          className="pointer-events-none absolute h-px w-px opacity-0"
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* legibility scrims — no extra visual effects on the footage itself */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,4,5,0.92),rgba(4,4,5,0.15)_45%,rgba(4,4,5,0.6))]" />
        <div className="grid-lines opacity-60" />

        <div className="relative z-10 flex h-full items-end pb-[clamp(3rem,10vh,7rem)]">
          <div ref={contentRef} className="shell w-full">
            <p className="eyebrow" data-hero-eyebrow>
              Est. Steel Manufacturing — Bangladesh
            </p>

            <h1 className="display display-xl mt-6 max-w-[16ch]">
              <span className="block overflow-hidden">
                <span className="block" data-hero-line>
                  Forged for
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block" data-hero-line>
                  Strength.
                </span>
              </span>
              <span className="block overflow-hidden text-[clamp(1.5rem,4.4vw,4rem)] text-[color:var(--steel)]">
                <span className="block" data-hero-line>
                  Engineered to endure.
                </span>
              </span>
            </h1>

            <div className="mt-10 flex flex-col gap-8 border-t border-[color:var(--border)] pt-7 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-[color:var(--steel)]" data-hero-sub>
                <span className="text-foreground">Julfikar Steel Re-Rolling Mills Ltd.</span> — high
                tensile reinforcement, structural and industrial steel, rolled to specification and
                proven ton after ton.
              </p>
              <div className="flex items-center gap-4" data-hero-cta>
                <a href="#products" className="btn-solid">
                  Explore Steel
                </a>
                <a href="#contact" className="btn-ghost">
                  Get in Touch
                </a>
              </div>
            </div>

            <div
              className="scroll-indicator mt-10 flex items-center gap-4 md:mt-14"
              data-hero-scroll
            >
              <span aria-hidden="true" />
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-[color:var(--steel-dim)]">
                Scroll to forge
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
