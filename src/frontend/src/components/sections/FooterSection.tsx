import { ArrowRight, Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const PRODUCT_LINKS = [
  "NEXUS Foldable",
  "ORBITA Watch",
  "APEX Earbuds",
  "AURORA Tablet",
  "VERTEX Laptop",
  "New Arrivals",
];

const COMPANY_LINKS = ["About", "Press", "Careers", "Sustainability"];

const SUPPORT_LINKS = [
  "FAQ",
  "Contact Us",
  "Returns",
  "Warranty",
  "Track Order",
];

const SOCIAL = [
  { Icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

function FooterColumn({
  title,
  links,
  delay,
}: {
  title: string;
  links: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <h4
        className="font-display font-semibold text-xs tracking-[0.25em] uppercase mb-5"
        style={{ color: "oklch(0.70 0.16 55)" }}
      >
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="/#"
              className="font-body text-sm transition-all duration-200 hover:translate-x-0.5 inline-block"
              style={{ color: "oklch(0.55 0.008 280)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.78 0.008 280)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.55 0.008 280)";
              }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "oklch(0.09 0.008 280)",
        borderTop: "1px solid oklch(0.22 0.015 280)",
      }}
      data-ocid="footer.section"
    >
      {/* Subtle top ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, oklch(0.70 0.16 55 / 0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 lg:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-display"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.70 0.16 55), oklch(0.60 0.14 55))",
                  color: "oklch(0.12 0.008 280)",
                }}
              >
                P
              </div>
              <span
                className="font-display font-bold text-lg tracking-[0.18em] uppercase"
                style={{ color: "oklch(0.88 0.008 280)" }}
              >
                Prokify
              </span>
            </div>

            <p
              className="font-body text-sm leading-relaxed mb-7"
              style={{ color: "oklch(0.52 0.008 280)" }}
            >
              Crafting technology that transcends the ordinary. Premium
              materials, extraordinary performance, timeless design.
            </p>

            {/* Newsletter */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-2"
              data-ocid="footer.newsletter_form"
            >
              <label
                htmlFor="footer-email"
                className="text-xs font-body font-semibold tracking-[0.15em] uppercase"
                style={{ color: "oklch(0.55 0.008 280)" }}
              >
                Stay ahead
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 h-10 px-4 rounded-lg text-sm font-body outline-none transition-all duration-300"
                  style={{
                    background: "oklch(0.14 0.010 280)",
                    color: "oklch(0.85 0.008 280)",
                    border: "1px solid oklch(0.26 0.015 280)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border =
                      "1px solid oklch(0.70 0.16 55 / 0.55)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px oklch(0.70 0.16 55 / 0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border =
                      "1px solid oklch(0.26 0.015 280)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  data-ocid="footer.newsletter_input"
                />
                <button
                  type="submit"
                  className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300 hover-light-sweep"
                  style={{
                    background: subscribed
                      ? "oklch(0.55 0.14 145)"
                      : "oklch(0.70 0.16 55)",
                    color: "oklch(0.12 0.008 280)",
                  }}
                  aria-label="Subscribe to newsletter"
                  data-ocid="footer.newsletter_submit_button"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-body"
                  style={{ color: "oklch(0.65 0.14 145)" }}
                  data-ocid="footer.newsletter_success_state"
                >
                  Welcome to the future. ✓
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Link columns */}
          <FooterColumn title="Products" links={PRODUCT_LINKS} delay={0.1} />
          <FooterColumn title="Company" links={COMPANY_LINKS} delay={0.15} />
          <FooterColumn title="Support" links={SUPPORT_LINKS} delay={0.2} />
        </div>

        {/* Divider */}
        <div
          className="my-10 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.24 0.015 280), transparent)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p
            className="text-xs font-body text-center"
            style={{ color: "oklch(0.42 0.008 280)" }}
          >
            © {year} Prokify.{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-smooth hover:underline"
              style={{ color: "oklch(0.48 0.008 280)" }}
            >
              Built with love using caffeine.ai
            </a>
          </p>

          {/* Social icons */}
          <div
            className="flex items-center gap-3"
            data-ocid="footer.social_links"
          >
            {SOCIAL.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 hover-light-sweep"
                style={{
                  border: "1px solid oklch(0.24 0.015 280)",
                  color: "oklch(0.50 0.008 280)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.border = "1px solid oklch(0.70 0.16 55 / 0.40)";
                  el.style.color = "oklch(0.70 0.16 55)";
                  el.style.boxShadow = "0 0 12px oklch(0.70 0.16 55 / 0.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.border = "1px solid oklch(0.24 0.015 280)";
                  el.style.color = "oklch(0.50 0.008 280)";
                  el.style.boxShadow = "none";
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((label) => (
              <a
                key={label}
                href="/#"
                className="text-xs font-body transition-smooth"
                style={{ color: "oklch(0.42 0.008 280)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.60 0.008 280)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "oklch(0.42 0.008 280)";
                }}
                data-ocid={`footer.${label.toLowerCase()}_link`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
