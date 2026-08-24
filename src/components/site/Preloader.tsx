import { useEffect, useRef } from "react";
import { prefersReducedMotion, useGsap } from "@/lib/reveal";

type Props = {
  /** 0 – 1 download progress. */
  progress: number;
  /** Flip to true once the hero footage is ready to scrub. */
  complete: boolean;
  /** Called after the exit animation finishes. */
  onExit: () => void;
};

/**
 * Full-bleed industrial loading screen. The wordmark fills with molten heat
 * from the bottom up as the hero footage downloads, then the panel wipes away.
 */
export function Preloader({ progress, complete, onExit }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const shownRef = useRef(0);
  const exitedRef = useRef(false);

  // Smoothly chase the reported progress so the counter never jumps.
  useEffect(() => {
    const { gsap } = useGsap();
    const target = Math.max(0, Math.min(1, progress));
    const state = { value: shownRef.current };

    const tween = gsap.to(state, {
      value: target,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        shownRef.current = state.value;
        const pct = Math.round(state.value * 100);
        if (countRef.current) countRef.current.textContent = String(pct).padStart(2, "0");
        if (markRef.current) markRef.current.style.setProperty("--fill", `${pct}%`);
        if (barRef.current) barRef.current.style.transform = `scaleX(${state.value})`;
        if (rootRef.current) {
          rootRef.current.style.setProperty("--heat", String(Math.pow(state.value, 2)));
        }
      },
    });

    return () => {
      tween.kill();
    };
  }, [progress]);

  // Exit once loading is done (and after a minimum on-screen time).
  useEffect(() => {
    if (!complete || exitedRef.current) return;
    exitedRef.current = true;

    const { gsap } = useGsap();
    const reduced = prefersReducedMotion();
    const root = rootRef.current;
    if (!root) {
      onExit();
      return;
    }

    const tl = gsap.timeline({ delay: 0.35, onComplete: onExit });

    if (reduced) {
      tl.to(root, { opacity: 0, duration: 0.5, ease: "power2.out" });
    } else {
      tl.to("[data-loader-inner]", {
        y: -28,
        opacity: 0,
        duration: 0.7,
        ease: "power3.inOut",
      }).to(
        root,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          ease: "expo.inOut",
        },
        "-=0.35",
      );
    }

    return () => {
      tl.kill();
    };
  }, [complete, onExit]);

  return (
    <div ref={rootRef} className="loader" role="status" aria-live="polite">
      <div className="grid-lines opacity-40" />
      <div className="loader-heat" aria-hidden="true" />

      <div className="shell relative z-10 w-full" data-loader-inner>
        <div ref={markRef} className="loader-mark">
          <span className="loader-mark-title display">Julfikar Steel</span>
          <span className="loader-mark-sub">Re-Rolling Mills Ltd.</span>
        </div>

        <div className="loader-meter">
          <span className="loader-meter-track">
            <span ref={barRef} className="loader-meter-fill" />
          </span>
          <span className="loader-meter-count">
            <span ref={countRef}>00</span>
            <span className="text-[color:var(--steel-dim)]">%</span>
          </span>
        </div>

        <p className="loader-note">Heating the mill — preparing the forge sequence</p>
      </div>
    </div>
  );
}
