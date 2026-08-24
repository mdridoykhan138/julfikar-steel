import { useEffect, useRef } from "react";
import { prefersReducedMotion, getGsap } from "@/lib/reveal";

type Props = {
  /** 0 – 1 download progress (kept for API compatibility). */
  progress: number;
  /** Flip to true once the hero footage is ready to scrub. */
  complete: boolean;
  /** Called after the exit animation finishes. */
  onExit: () => void;
};

const LETTERS = ["J", "U", "L", "F", "I", "K", "A", "R"];

/**
 * Full-bleed orange loading screen: a spinning ring above a letter-flip
 * "JULFIKAR" wordmark, matching the Metallic template preloader.
 */
export function Preloader({ complete, onExit }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const exitedRef = useRef(false);

  // Exit once loading is done (and after a minimum on-screen time).
  useEffect(() => {
    if (!complete || exitedRef.current) return;
    exitedRef.current = true;

    const { gsap } = getGsap();
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
      <div className="loader-inner" data-loader-inner>
        <div className="loader-spinner" aria-hidden="true" />
        <div className="loader-text">
          {LETTERS.map((letter) => (
            <span key={letter} className="loader-letter" data-text-preloader={letter}>
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
