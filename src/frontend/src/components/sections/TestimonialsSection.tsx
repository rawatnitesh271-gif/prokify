import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Prokify redefined what I expect from technology. Every product feels like holding the future — the craftsmanship is simply unmatched.",
    name: "Alexandra Chen",
    role: "Creative Director, Apex Studio",
    initials: "AC",
    gradientFrom: "oklch(0.55 0.18 55)",
    gradientTo: "oklch(0.40 0.14 50)",
  },
  {
    quote:
      "From unboxing to daily use, everything about Prokify is a statement of excellence. The audio quality on the Apex earbuds is extraordinary.",
    name: "Marcus Reyes",
    role: "Lead Engineer, Horizon Labs",
    initials: "MR",
    gradientFrom: "oklch(0.38 0.08 220)",
    gradientTo: "oklch(0.28 0.12 250)",
  },
  {
    quote:
      "I've never experienced a brand that gets both design and performance so perfectly right. Prokify products are my daily companions.",
    name: "Sophia Laurent",
    role: "Architect & Entrepreneur",
    initials: "SL",
    gradientFrom: "oklch(0.42 0.12 310)",
    gradientTo: "oklch(0.32 0.10 290)",
  },
  {
    quote:
      "The NEXUS phone isn't just a device — it's an extension of who I am. The titanium finish speaks volumes without saying a word.",
    name: "James Okafor",
    role: "Principal, Vantage Ventures",
    initials: "JO",
    gradientFrom: "oklch(0.45 0.10 170)",
    gradientTo: "oklch(0.30 0.08 190)",
  },
];

const PARTICLE_CONFIG = [
  { id: 0, size: 2.5, x: 6, y: 12, duration: 8, delay: 0.0, opacity: 0.2 },
  { id: 1, size: 1.5, x: 18, y: 75, duration: 11, delay: 1.2, opacity: 0.14 },
  { id: 2, size: 3.0, x: 31, y: 38, duration: 9, delay: 2.5, opacity: 0.28 },
  { id: 3, size: 2.0, x: 47, y: 60, duration: 14, delay: 0.8, opacity: 0.18 },
  { id: 4, size: 2.5, x: 62, y: 22, duration: 10, delay: 3.1, opacity: 0.22 },
  { id: 5, size: 1.5, x: 78, y: 85, duration: 13, delay: 1.6, opacity: 0.13 },
  { id: 6, size: 3.5, x: 11, y: 50, duration: 7, delay: 2.0, opacity: 0.3 },
  { id: 7, size: 2.0, x: 43, y: 90, duration: 12, delay: 0.4, opacity: 0.17 },
  { id: 8, size: 2.5, x: 72, y: 43, duration: 8, delay: 3.8, opacity: 0.24 },
  { id: 9, size: 1.5, x: 90, y: 27, duration: 11, delay: 1.0, opacity: 0.15 },
  { id: 10, size: 2.0, x: 5, y: 68, duration: 9, delay: 2.3, opacity: 0.19 },
  { id: 11, size: 3.0, x: 27, y: 14, duration: 14, delay: 0.6, opacity: 0.26 },
  { id: 12, size: 2.5, x: 55, y: 80, duration: 10, delay: 3.4, opacity: 0.21 },
  { id: 13, size: 1.5, x: 83, y: 55, duration: 7, delay: 1.8, opacity: 0.12 },
  { id: 14, size: 2.0, x: 21, y: 36, duration: 13, delay: 2.7, opacity: 0.18 },
  { id: 15, size: 3.0, x: 67, y: 70, duration: 8, delay: 0.2, opacity: 0.27 },
  { id: 16, size: 2.5, x: 89, y: 10, duration: 12, delay: 3.0, opacity: 0.23 },
  { id: 17, size: 1.5, x: 38, y: 24, duration: 9, delay: 1.4, opacity: 0.16 },
];

function ParticleField() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {PARTICLE_CONFIG.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: `oklch(0.70 0.16 55 / ${p.opacity})`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [p.opacity, p.opacity * 1.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  inView,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-80 md:w-auto rounded-2xl p-7 flex flex-col gap-5 cursor-default"
      style={{
        background: "oklch(0.165 0.012 280 / 0.7)",
        backdropFilter: "blur(20px)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        boxShadow: hovered
          ? "0 0 0 1px oklch(0.70 0.16 55 / 0.25), 0 20px 60px -10px oklch(0.70 0.16 55 / 0.12), 0 8px 32px -4px oklch(0 0 0 / 0.4)"
          : "0 8px 32px -8px oklch(0 0 0 / 0.4)",
        transition: "box-shadow 0.4s ease",
      }}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.13,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-ocid={`testimonials.item.${index + 1}`}
    >
      {/* Quote mark */}
      <div
        className="text-5xl font-serif leading-none -mb-2 select-none"
        style={{ color: "oklch(0.70 0.16 55 / 0.4)" }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote text */}
      <p
        className="text-sm font-body italic leading-relaxed flex-1"
        style={{ color: "oklch(0.80 0.008 280)" }}
      >
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-2">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-display font-bold flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`,
            color: "oklch(0.96 0.005 280)",
          }}
        >
          {testimonial.initials}
        </div>
        <div className="min-w-0">
          <p className="font-display font-semibold text-sm text-foreground truncate">
            {testimonial.name}
          </p>
          <p
            className="text-xs font-body truncate"
            style={{ color: "oklch(0.58 0.008 280)" }}
          >
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Glow overlay on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.70 0.16 55 / 0.06) 0%, transparent 70%)",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "oklch(0.11 0.010 280)" }}
      data-ocid="testimonials.section"
    >
      <ParticleField />

      {/* Ambient radial glows */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.70 0.16 55 / 0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.45 0.10 240 / 0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "oklch(0.70 0.16 55)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What They Say
          </motion.p>
          <motion.h2
            className="font-display font-bold text-4xl md:text-5xl tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.005 280), oklch(0.70 0.010 280))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Trusted by Visionaries
          </motion.h2>
        </div>

        {/* Cards grid — horizontal scroll on mobile */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible pb-4 md:pb-0 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
          data-ocid="testimonials.list"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={t.name}
              testimonial={t}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
