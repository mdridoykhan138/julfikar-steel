import { ArrowRight, Download, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo/julfikar-logo.png";

const USEFUL_LINKS = [
  [
    { label: "About Us", href: "/about" },
    { label: "Products", href: "#products" },
    { label: "Case Studies", href: "#manufacturing" },
  ],
  [
    { label: "Blog", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Contact Us", href: "#contact" },
  ],
  [
    { label: "Services", href: "#manufacturing" },
    { label: "Industries", href: "#products" },
    { label: "Pricing & Plans", href: "#" },
  ],
];

const SOCIAL = [
  { label: "Facebook", href: "#contact", Icon: Facebook },
  { label: "Twitter", href: "#contact", Icon: Twitter },
  { label: "Instagram", href: "#contact", Icon: Instagram },
  { label: "LinkedIn", href: "#contact", Icon: Linkedin },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="footer-style-two">
      <div className="footer-widget-section">
        <div className="footer-outer">
          <span className="footer-big-text" aria-hidden="true">
            Julfikar
          </span>
          <div className="shell relative z-10">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="footer-logo-widget">
                <div className="footer-logo">
                  <img
                    src={logo}
                    alt="Julfikar Steel Re-Rolling Mills Ltd."
                    className="h-auto max-w-[180px]"
                  />
                </div>
                <div className="footer-phone">
                  <a href="tel:+8801325070143">+880 1325 070 143</a>
                </div>
                <p>B-342, Enayetnagar, Godnail, Siddhirganj, Narayanganj, Bangladesh.</p>
                <h4>Let us know your thoughts.</h4>
                <div className="footer-line-link">
                  <a href="#contact">
                    <ArrowRight aria-hidden="true" />
                    <span>Drop a Line</span>
                  </a>
                </div>
              </div>

              <div className="footer-links-widget">
                <div className="footer-title">
                  <h3>Social Connect</h3>
                </div>
                <div className="footer-social-box">
                  <ul className="footer-social-links">
                    {SOCIAL.map(({ label, href, Icon }) => (
                      <li key={label}>
                        <a href={href} aria-label={label}>
                          <Icon aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="footer-download-box">
                    <div className="footer-download-icon">
                      <Download aria-hidden="true" />
                    </div>
                    <div>
                      <h4>Product Catalogue</h4>
                      <button type="button">Download</button>
                    </div>
                  </div>
                </div>

                <div className="footer-title">
                  <h3>Useful Links</h3>
                </div>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                  {USEFUL_LINKS.map((column) => (
                    <ul key={column[0]?.label} className="footer-links-list">
                      {column.map((link) => (
                        <li key={link.label}>
                          <a href={link.href}>{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="shell">
          <div className="footer-bottom-inner">
            <div className="footer-copyright">
              <p>
                <a
                  href="https://cubixbd.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  &copy; {new Date().getFullYear()}
                  <img src="/favicon.ico" alt="Cubix Technology" className="inline h-4 w-4" />
                  Cubix Technology Ltd.
                </a>
              </p>
            </div>
            <ul className="footer-nav">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>.</li>
              <li>
                <a href="#">Legal Notice</a>
              </li>
              <li>.</li>
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>.</li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
