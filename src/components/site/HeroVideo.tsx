import { useEffect, useRef, useState } from "react";
import posterAsset from "@/assets/hero-poster.jpg";
import { whenSeekable } from "@/lib/preload-video";
import { prefersReducedMotion, getGsap } from "@/lib/reveal";

type Props = {
  /** Fully downloaded object URL; null while the loader is still working. */
  videoSrc: string | null;
  /** True once the loading screen has left — starts the intro timeline. */
  active: boolean;
  /** Preload failed: skip the video and show the poster. */
  preloadFailed?: boolean;
  /** Called when the footage can be played reliably. */
  onReady: () => void;
};

export function HeroVideo({ videoSrc, active, preloadFailed = false, onReady }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const readyRef = useRef(false);

  const showPoster = failed || preloadFailed;

  // Report readiness (or failure) so the loader can leave, then start playback.
  useEffect(() => {
    if (readyRef.current) return;
    if (preloadFailed) {
      readyRef.current = true;
      onReady();
      return;
    }
    const video = videoRef.current;
    if (!videoSrc || !video) return;
    let cancelled = false;
    whenSeekable(video).then((ok) => {
      if (cancelled || readyRef.current) return;
      readyRef.current = true;
      if (!ok) {
        setFailed(true);
      } else {
        video.play().catch(() => {});
      }
      onReady();
    });
    return () => {
      cancelled = true;
    };
  }, [videoSrc, preloadFailed, onReady]);

  // Scroll-driven scale-down: full-screen video → container-width frame.
  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const border = borderRef.current;
    if (!section || !frame) return;
    if (!videoSrc || preloadFailed) return;

    const { gsap, ScrollTrigger } = getGsap();
    const reduced = prefersReducedMotion();

    const targetScale = () => {
      const shell = section.querySelector<HTMLElement>(".shell");
      const shellWidth = shell?.getBoundingClientRect().width ?? window.innerWidth;
      return Math.min(1, shellWidth / window.innerWidth);
    };

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.fromTo(
          frame,
          { scale: 1 },
          {
            scale: () => targetScale(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        if (border) {
          gsap.fromTo(
            border,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "20% top",
                end: "55% top",
                scrub: true,
              },
            },
          );
        }
      }
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [videoSrc, preloadFailed]);

  // Intro reveal — only after the loading screen is gone.
  useEffect(() => {
    if (!active) return;
    const section = sectionRef.current;
    if (!section) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from("[data-hero-eyebrow]", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(
          "[data-hero-line]",
          { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12 },
          "-=0.4",
        )
        .from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.55")
        .from("[data-hero-cta]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
        .from("[data-hero-scroll]", { opacity: 0, duration: 0.8 }, "-=0.4");
    }, section);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [active]);

  return (
    <section id="home" ref={sectionRef} className="relative h-[260vh] w-full">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[#040405]">
        <div ref={frameRef} className="hero-video-frame">
          {showPoster ? (
            <div
              className="hero-fallback"
              style={{ backgroundImage: `url(${posterAsset})` }}
              aria-hidden="true"
            />
          ) : (
            <video
              ref={videoRef}
              src={videoSrc ?? undefined}
              poster={posterAsset}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="hero-video-media"
              aria-hidden="true"
              tabIndex={-1}
            />
          )}
          <div ref={borderRef} className="hero-video-border" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,4,5,0.92),rgba(4,4,5,0.15)_45%,rgba(4,4,5,0.6))]" />
        </div>

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
              <span className="block overflow-hidden text-[clamp(1.25rem,3vw,2rem)] text-[color:var(--steel)]">
                <span className="block" data-hero-line>
                  Engineered to endure.
                </span>
              </span>
            </h1>

            <div className="mt-10 flex flex-col gap-8 border-t border-[color:var(--border)] pt-7 pb-4 md:flex-row md:items-end md:justify-between">
              <p
                className="max-w-md text-xl leading-relaxed text-[color:var(--steel)]"
                data-hero-sub
              >
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
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-[color:var(--brand)]">
                Scroll to explore
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
