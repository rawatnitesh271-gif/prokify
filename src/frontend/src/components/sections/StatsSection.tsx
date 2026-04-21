import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

const STATS = [
  { value: 150, suffix: "+", label: "Premium Products", decimals: 0 },
  { value: 2, suffix: "M+", label: "Global Customers", decimals: 0 },
  { value: 8, suffix: "", label: "Years Innovation", decimals: 0 },
  { value: 99.8, suffix: "%", label: "Satisfaction", decimals: 1 },
];

function AnimatedNumber({
  value,
  suffix,
  decimals,
  inView,
}: {
  value: number;
  suffix: string;
  decimals: number;
  inView: boolean;
}) {
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString(),
  );
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, motionValue, value]);

  useEffect(() => {
    return displayValue.on("change", (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
  }, [displayValue, suffix]);

  return (
    <span ref={ref} style={{ color: "oklch(0.70 0.16 55)" }}>
      0{suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.10 0.008 280) 0%, oklch(0.13 0.012 280) 50%, oklch(0.10 0.008 280) 100%)",
      }}
      data-ocid="stats.section"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, oklch(0.70 0.16 55 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.p
          className="text-center text-xs font-body font-semibold tracking-[0.3em] uppercase mb-16"
          style={{ color: "oklch(0.70 0.16 55)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          By the Numbers
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative flex flex-col items-center text-center px-8 py-10"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-ocid={`stats.item.${i + 1}`}
            >
              {/* Vertical divider — skip first on each row */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px hidden lg:block"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, oklch(0.28 0.015 280), transparent)",
                  }}
                  aria-hidden="true"
                />
              )}
              {i === 2 && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-16 w-px lg:hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, oklch(0.28 0.015 280), transparent)",
                  }}
                  aria-hidden="true"
                />
              )}

              <div className="text-5xl font-display font-bold leading-none mb-4 tabular-nums">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  inView={inView}
                />
              </div>
              <p
                className="text-xs font-body font-semibold tracking-[0.2em] uppercase"
                style={{ color: "oklch(0.60 0.008 280)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
