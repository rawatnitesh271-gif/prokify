import { ChevronDown } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useMemo, useRef } from "react";

/* ─── Floating particles ─── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: "gold" | "silver";
}

function generateParticles(count: number): Particle[] {
  const seed = [
    { x: 8, y: 14 },
    { x: 23, y: 78 },
    { x: 37, y: 31 },
    { x: 52, y: 62 },
    { x: 67, y: 19 },
    { x: 81, y: 88 },
    { x: 14, y: 51 },
    { x: 44, y: 94 },
    { x: 73, y: 44 },
    { x: 91, y: 27 },
    { x: 5, y: 67 },
    { x: 29, y: 11 },
    { x: 57, y: 83 },
    { x: 78, y: 57 },
    { x: 19, y: 39 },
    { x: 63, y: 72 },
    { x: 86, y: 13 },
    { x: 41, y: 22 },
    { x: 95, y: 75 },
    { x: 33, y: 59 },
    { x: 11, y: 88 },
    { x: 48, y: 6 },
    { x: 76, y: 36 },
    { x: 22, y: 97 },
    { x: 59, y: 48 },
    { x: 88, y: 63 },
    { x: 4, y: 28 },
    { x: 70, y: 91 },
  ];
  return seed.slice(0, count).map((pos, i) => ({
    id: i,
    x: pos.x,
    y: pos.y,
    size: [2, 3, 2.5, 1.5, 3, 2][i % 6],
    duration: 3 + (i % 6),
    delay: (i * 0.4) % 4,
    color: i % 3 === 0 ? "gold" : "silver",
  }));
}

const PARTICLES = generateParticles(28);

/* ─── Cursor-reactive product tilt ─── */
function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), {
    stiffness: 80,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 80,
    damping: 20,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-col items-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Radial spotlight behind product */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 48%, oklch(0.7 0.16 55 / 0.13) 0%, oklch(0.65 0.12 55 / 0.06) 40%, transparent 70%)",
        }}
      />

      {/* Ambient gold glow blobs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "340px",
          height: "340px",
          background:
            "radial-gradient(circle, oklch(0.7 0.16 55 / 0.08) 0%, transparent 65%)",
          filter: "blur(32px)",
        }}
      />

      {/* 3D product wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
        animate={{ y: [0, -18, 0] }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="relative z-10"
      >
        {/* Drop-shadow glow ring */}
        <div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.7 0.16 55 / 0.15) 0%, transparent 65%)",
            filter: "blur(20px)",
          }}
        />

        {/* Main product emoji */}
        <div
          className="text-[180px] leading-none relative z-10"
          style={{
            filter:
              "drop-shadow(0 0 40px oklch(0.7 0.16 55 / 0.4)) drop-shadow(0 24px 60px oklch(0 0 0 / 0.6))",
            textShadow: "none",
          }}
        >
          🎧
        </div>
      </motion.div>

      {/* Product label */}
      <motion.div
        className="mt-4 text-center z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase font-display font-medium"
          style={{ color: "oklch(0.7 0.16 55)" }}
        >
          AURA X1
        </p>
        <p className="text-xs tracking-widest text-muted-foreground uppercase mt-0.5">
          Premium Earbuds
        </p>
      </motion.div>

      {/* Reflection */}
      <div
        className="mt-2 pointer-events-none"
        style={{
          fontSize: "180px",
          lineHeight: 1,
          filter: "blur(2px)",
          opacity: 0.18,
          transform: "scaleY(-0.45) scaleX(0.85)",
          maskImage:
            "linear-gradient(to bottom, oklch(0 0 0 / 0.6) 0%, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, oklch(0 0 0 / 0.6) 0%, transparent 80%)",
        }}
      >
        🎧
      </div>
    </motion.div>
  );
}

/* ─── Main HeroSection ─── */
export function HeroSection() {
  const particles = useMemo(() => PARTICLES, []);

  return (
    <section
      data-ocid="hero.section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.22 0.015 280) 0%, oklch(0.13 0.01 280) 40%, oklch(0.08 0.006 280) 100%)",
      }}
    >
      {/* Deep background gradients — layered */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 60%, oklch(0.18 0.012 280 / 0.7) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 75% 35%, oklch(0.16 0.01 280 / 0.5) 0%, transparent 55%)",
        }}
      />

      {/* Subtle warm accent light center-top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, oklch(0.7 0.16 55 / 0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.color === "gold"
                ? "oklch(0.7 0.16 55 / 0.25)"
                : "oklch(0.75 0.005 280 / 0.2)",
            filter: "blur(0.5px)",
            opacity: p.color === "gold" ? 0.25 : 0.18,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [
              p.color === "gold" ? 0.25 : 0.18,
              p.color === "gold" ? 0.15 : 0.1,
              p.color === "gold" ? 0.25 : 0.18,
            ],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      ))}

      {/* Main hero content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-24">
        {/* Left — text content */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          {/* Overline */}
          <motion.p
            className="text-xs tracking-[0.4em] uppercase font-display font-medium mb-6"
            style={{ color: "oklch(0.7 0.16 55)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            data-ocid="hero.overline"
          >
            Introducing The Future
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-display font-bold leading-[0.92] tracking-tight mb-6"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 6rem)",
              background:
                "linear-gradient(135deg, oklch(0.96 0.005 280) 0%, oklch(0.78 0.008 280) 50%, oklch(0.88 0.006 280) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            data-ocid="hero.headline"
          >
            REDEFINE
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.14 55), oklch(0.65 0.18 50), oklch(0.75 0.12 60))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              YOUR WORLD
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="font-body text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
            style={{ color: "oklch(0.62 0.008 280)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-ocid="hero.subheadline"
          >
            Engineered for the extraordinary. Where precision acoustics meet
            uncompromising design — the future wears your ears.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Primary CTA */}
            <a
              href="#products"
              data-ocid="hero.primary_button"
              className="hover-light-sweep inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-display font-semibold text-sm tracking-wider uppercase transition-smooth"
              style={{
                border: "1px solid oklch(0.7 0.16 55 / 0.6)",
                color: "oklch(0.7 0.16 55)",
                background: "oklch(0.7 0.16 55 / 0.05)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "oklch(0.7 0.16 55 / 0.12)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 24px oklch(0.7 0.16 55 / 0.25), 0 0 8px oklch(0.7 0.16 55 / 0.15)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.7 0.16 55 / 0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "oklch(0.7 0.16 55 / 0.05)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.7 0.16 55 / 0.6)";
              }}
            >
              Shop Collection
            </a>

            {/* Secondary ghost CTA */}
            <a
              href="#products"
              data-ocid="hero.secondary_button"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-display font-medium text-sm tracking-wider uppercase transition-smooth"
              style={{
                border: "1px solid oklch(0.55 0.008 280 / 0.5)",
                color: "oklch(0.72 0.008 280)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.72 0.008 280 / 0.8)";
                (e.currentTarget as HTMLElement).style.background =
                  "oklch(0.72 0.008 280 / 0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.55 0.008 280 / 0.5)";
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
              }}
            >
              Learn More
            </a>
          </motion.div>

          {/* Specs strip */}
          <motion.div
            className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { label: "Battery", value: "36H" },
              { label: "Drivers", value: "11mm" },
              { label: "ANC", value: "−42dB" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center lg:items-start"
              >
                <span
                  className="font-display font-bold text-xl leading-none"
                  style={{ color: "oklch(0.7 0.16 55)" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[10px] tracking-widest uppercase mt-1"
                  style={{ color: "oklch(0.5 0.008 280)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Product showcase */}
        <div className="flex-1 flex justify-center items-center">
          <ProductShowcase />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#products"
        aria-label="Scroll to products"
        data-ocid="hero.scroll_indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase font-display"
          style={{ color: "oklch(0.45 0.008 280)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <ChevronDown
            size={16}
            style={{ color: "oklch(0.7 0.16 55 / 0.7)" }}
          />
        </motion.div>
      </motion.a>

      {/* Bottom fade-out */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.08 0.006 280))",
        }}
      />
    </section>
  );
}

export default HeroSection;
