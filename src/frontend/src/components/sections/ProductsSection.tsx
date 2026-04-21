import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function ProductsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "oklch(var(--background))" }}
      data-ocid="products.section"
    >
      {/* Ambient background blobs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.7 0.16 55 / 0.04), transparent 70%)",
          filter: "blur(60px)",
          transform: "translateY(-30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, oklch(0.55 0.12 280 / 0.06), transparent 70%)",
          filter: "blur(50px)",
          transform: "translateY(30%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 space-y-3"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs font-display font-semibold tracking-[0.3em] uppercase"
            style={{ color: "oklch(0.7 0.16 55)" }}
            data-ocid="products.overline"
          >
            Our Collection
          </p>
          <h2
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Precision
            <br />
            <span className="text-gradient-gold">Engineered</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Every product crafted to the finest standard. Built for those who
            demand more from their technology.
          </p>
        </motion.div>

        {/* Product grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
          data-ocid="products.list"
        >
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
