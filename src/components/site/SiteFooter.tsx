const NAV = ["Home", "About", "Products", "Quality", "Contact"];
const SOCIAL = ["LinkedIn", "Facebook", "YouTube"];

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="relative border-t border-[color:var(--border)] bg-[#040405] pt-[clamp(4rem,12vh,8rem)]"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(1.8rem,3.4vw,3rem)]" data-reveal="mask">
              Julfikar Steel
              <br />
              Re-Rolling Mills Ltd.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[color:var(--steel-dim)]">
              Reinforcement, structural and industrial steel — engineered to endure.
            </p>
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-6 space-y-3">
              {NAV.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-[color:var(--steel)] transition-colors hover:text-foreground"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow">Contact</p>
            <ul className="mt-6 space-y-3 text-sm text-[color:var(--steel)]">
              <li>Mill Office, Dhaka, Bangladesh</li>
              <li>+880 0000 000000</li>
              <li>info@julfikarsteel.com</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="eyebrow">Follow</p>
            <ul className="mt-6 space-y-3">
              {SOCIAL.map((s) => (
                <li key={s}>
                  <a
                    href="#contact"
                    className="text-sm text-[color:var(--steel)] transition-colors hover:text-foreground"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(3rem,8vh,6rem)] flex flex-col gap-4 border-t border-[color:var(--border)] py-8 text-[0.68rem] uppercase tracking-[0.22em] text-[color:var(--steel-dim)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Julfikar Steel Re-Rolling Mills Ltd.</p>
          <div className="flex gap-8">
            <a href="#contact" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
