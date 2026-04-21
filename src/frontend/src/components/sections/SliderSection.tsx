import { ProductCard } from "@/components/ProductCard";
import { FEATURED_PRODUCTS } from "@/data/products";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function SliderSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Manual autoplay
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (!emblaApi) return;
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 3800);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "oklch(var(--card) / 0.3)" }}
      data-ocid="slider.section"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.7 0.16 55 / 0.05), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, oklch(var(--background) / 0.6) 0%, transparent 15%, transparent 85%, oklch(var(--background) / 0.6) 100%)",
        }}
      />

      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 space-y-3 px-4"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs font-display font-semibold tracking-[0.3em] uppercase"
            style={{ color: "oklch(0.7 0.16 55)" }}
            data-ocid="slider.overline"
          >
            Featured Picks
          </p>
          <h2
            className="font-display font-bold text-4xl md:text-5xl leading-tight tracking-tight"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Handpicked for{" "}
            <span className="text-gradient-gold">Excellence</span>
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Our curated selection of flagship technology, chosen for those who
            accept nothing but the best.
          </p>
        </motion.div>

        {/* Carousel + nav row */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Prev button */}
          <button
            type="button"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-smooth hover-glow-border"
            style={{
              background: "oklch(var(--card) / 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid oklch(1 0 0 / 0.1)",
              color: "oklch(var(--foreground))",
            }}
            onClick={scrollPrev}
            data-ocid="slider.pagination_prev"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next button */}
          <button
            type="button"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full transition-smooth hover-glow-border"
            style={{
              background: "oklch(var(--card) / 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid oklch(1 0 0 / 0.1)",
              color: "oklch(var(--foreground))",
            }}
            onClick={scrollNext}
            data-ocid="slider.pagination_next"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>

          {/* Embla viewport */}
          <div
            ref={emblaRef}
            className="overflow-hidden"
            data-ocid="slider.list"
          >
            <div className="flex gap-4 px-12 md:px-20">
              {FEATURED_PRODUCTS.map((product, i) => (
                <div
                  key={product.id}
                  className="shrink-0 w-72 sm:w-80"
                  data-ocid={`slider.item.${i + 1}`}
                >
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Navigation dots */}
        <div
          className="flex items-center justify-center gap-2 mt-8"
          data-ocid="slider.dots"
        >
          {scrollSnaps.map((snap, dotIndex) => (
            <motion.button
              key={`dot-${snap}`}
              type="button"
              className="rounded-full transition-smooth"
              style={{
                width: selectedIndex === dotIndex ? 24 : 8,
                height: 8,
                background:
                  selectedIndex === dotIndex
                    ? "oklch(0.7 0.16 55)"
                    : "oklch(var(--muted-foreground) / 0.4)",
                boxShadow:
                  selectedIndex === dotIndex
                    ? "0 0 8px oklch(0.7 0.16 55 / 0.7), 0 0 16px oklch(0.7 0.16 55 / 0.35)"
                    : "none",
              }}
              animate={{ width: selectedIndex === dotIndex ? 24 : 8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => scrollTo(dotIndex)}
              data-ocid={`slider.dot.${dotIndex + 1}`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
