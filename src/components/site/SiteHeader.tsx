import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useGsap } from "@/lib/reveal";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Manufacturing", href: "#manufacturing" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = useGsap();

    const st = ScrollTrigger.create({
      start: 40,
      onUpdate: (self) => setScrolled(self.scroll() > 40),
      onToggle: (self) => setScrolled(self.isActive),
    });
    setScrolled(window.scrollY > 40);

    let ctx: gsap.Context | undefined;
    if (!prefersReducedMotion()) {
      ctx = gsap.context(() => {
        gsap.from(el.querySelectorAll("[data-header-item]"), {
          y: -18,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        });
      }, el);
    }

    return () => {
      st.kill();
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const { gsap } = useGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-mobile-link]", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.06,
      });
    }, panelRef.current);
    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header ref={headerRef} className="site-header" data-scrolled={scrolled}>
      <div className="shell flex items-center justify-between gap-6">
        <a href="#home" data-header-item className="flex flex-col leading-none">
          <span className="display text-[clamp(0.95rem,1.5vw,1.25rem)] tracking-[0.06em]">
            Julfikar Steel
          </span>
          <span className="mt-1 text-[0.55rem] uppercase tracking-[0.36em] text-[color:var(--steel-dim)]">
            Re-Rolling Mills Ltd.
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.label} href={item.href} className="nav-link" data-header-item>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-solid hidden md:inline-flex" data-header-item>
            Get in Touch
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-[color:var(--input)] lg:hidden"
            data-header-item
          >
            <span
              className="block h-px w-5 bg-foreground transition-transform duration-300"
              style={open ? { transform: "translateY(3.5px) rotate(45deg)" } : undefined}
            />
            <span
              className="block h-px w-5 bg-foreground transition-transform duration-300"
              style={open ? { transform: "translateY(-3.5px) rotate(-45deg)" } : undefined}
            />
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={panelRef}
          className="fixed inset-0 top-0 z-50 flex h-dvh flex-col justify-between bg-[#040405] px-6 pb-10 pt-28 lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-mobile-link
                onClick={() => setOpen(false)}
                className="display border-b border-[color:var(--border)] py-5 text-[2rem]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-solid justify-center" onClick={() => setOpen(false)}>
            Get in Touch
          </a>
        </div>
      )}
    </header>
  );
}
