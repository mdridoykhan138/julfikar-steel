import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo/julfikar-logo.png";
import { prefersReducedMotion, getGsap } from "@/lib/reveal";

type NavItem = {
  label: string;
  href?: string;
  to?: string;
  children?: { label: string; to: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Home",
    to: "/",
    children: [
      { label: "Home", to: "/" },
      { label: "Home2", to: "/home2" },
    ],
  },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  // { label: "Manufacturing", href: "#manufacturing" },
  // { label: "Quality", href: "#quality" },
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
    const { gsap } = getGsap();

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

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
      window.removeEventListener("scroll", onScroll);
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const { gsap } = getGsap();
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
      <div className="shell relative z-[70] flex items-center justify-between gap-6">
        <Link to="/" data-header-item className="flex items-center">
          <img
            src={logo}
            alt="Julfikar Steel Re-Rolling Mills Ltd."
            className="h-auto max-w-[160px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="group relative" data-header-item>
                  <Link to={item.to ?? "/"} className="nav-link inline-flex items-center gap-1.5">
                    {item.label}
                    <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                  </Link>
                  <div className="nav-submenu">
                    <div className="nav-submenu-panel">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.to} className="nav-submenu-link">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className="nav-link" data-header-item>
                  {item.label}
                </Link>
              );
            }
            return (
              <a key={item.label} href={item.href} className="nav-link" data-header-item>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block" data-header-item>
            <a href="#contact" className="btn">
              Get in Touch
            </a>
          </div>
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
            {NAV.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} className="border-b border-[color:var(--border)] py-5">
                    <p className="text-[0.6rem] uppercase tracking-[0.4em] text-[color:var(--steel-dim)]">
                      {item.label}
                    </p>
                    <div className="mt-3 flex flex-col">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          data-mobile-link
                          onClick={() => setOpen(false)}
                          className="display py-2 text-[1.5rem]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              if (item.to) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    data-mobile-link
                    onClick={() => setOpen(false)}
                    className="display border-b border-[color:var(--border)] py-5 text-[2rem]"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  data-mobile-link
                  onClick={() => setOpen(false)}
                  className="display border-b border-[color:var(--border)] py-5 text-[2rem]"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <a href="#contact" className="btn" onClick={() => setOpen(false)}>
            Get in Touch
          </a>
        </div>
      )}
    </header>
  );
}
