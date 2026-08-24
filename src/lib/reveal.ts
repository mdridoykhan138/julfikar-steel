import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function useGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Applies the standard editorial scroll reveal to every [data-reveal] element
 * inside `root`. Elements may set data-reveal="mask" for a clip reveal.
 */
export function initReveals(root: HTMLElement) {
  const { gsap, ScrollTrigger } = useGsap();
  const reduced = prefersReducedMotion();
  const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

  const ctx = gsap.context(() => {
    items.forEach((el) => {
      const kind = el.dataset["reveal"];
      const delay = Number(el.dataset["revealDelay"] ?? 0);

      if (reduced) {
        gsap.set(el, { opacity: 1, y: 0, clipPath: "none" });
        return;
      }

      if (kind === "mask") {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", y: 24, opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
        return;
      }

      if (kind === "image") {
        const inner = el.querySelector("img");
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.3,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
        if (inner) {
          gsap.fromTo(
            inner,
            { scale: 1.16 },
            {
              scale: 1,
              duration: 1.5,
              delay,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        }
        return;
      }



      gsap.fromTo(
        el,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        },
      );
    });

    // staggered groups
    root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
      const children = Array.from(group.children) as HTMLElement[];
      if (reduced) {
        gsap.set(children, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        children,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: group, start: "top 82%" },
        },
      );
    });

    // subtle parallax
    if (!reduced) {
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset["parallax"] || 40);
        gsap.fromTo(
          el,
          { yPercent: -amount / 10 },
          {
            yPercent: amount / 10,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }
  }, root);

  ScrollTrigger.refresh();

  return () => ctx.revert();
}
