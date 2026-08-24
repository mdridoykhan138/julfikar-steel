import { useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const rootRef = useRef<HTMLButtonElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return;

    const length = path.getTotalLength();
    path.style.transition = "none";
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = String(length);
    path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset 10ms linear";

    const update = () => {
      const top = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, top / max);
      path.style.strokeDashoffset = String(length - progress * length);
      root.classList.toggle("scroll-top-active", top > 50);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      ref={rootRef}
      type="button"
      className="scroll-to-top"
      aria-label="Scroll to top"
      onClick={handleClick}
    >
      <svg className="scroll-top-inner" viewBox="-1 -1 102 102" aria-hidden="true">
        <path ref={pathRef} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
      </svg>
      <ArrowUp className="scroll-top-arrow" aria-hidden="true" />
    </button>
  );
}
