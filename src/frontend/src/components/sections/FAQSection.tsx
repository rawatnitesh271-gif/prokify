import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

const FAQS = [
  {
    id: "q1",
    question: "What makes Prokify different from other tech brands?",
    answer:
      "Prokify is engineered at the intersection of aerospace-grade materials and precision software. We obsess over every millimeter, every gram, every millisecond — resulting in products that feel genuinely extraordinary. Our titanium alloys are sourced from the same suppliers as leading aerospace companies, and our acoustic chambers are tuned by Grammy-winning engineers.",
  },
  {
    id: "q2",
    question: "What warranty coverage comes with Prokify products?",
    answer:
      "Every Prokify product is covered by our 2-year Premium Warranty — far exceeding industry standards. We cover manufacturing defects, hardware failures, and even accidental damage for the first 6 months. For total peace of mind, our Prokify Shield program extends full coverage to 4 years.",
  },
  {
    id: "q3",
    question: "Do you ship globally?",
    answer:
      "Prokify ships to over 140 countries with white-glove delivery in 47 major cities. International orders receive our signature matte-black packaging, padded with custom-cut foam and sealed with our gold foil emblem. Shipping is complimentary for all orders over $500.",
  },
  {
    id: "q4",
    question: "How is the sound quality on Prokify audio products?",
    answer:
      "Our Apex audio series features proprietary 11mm beryllium-coated dynamic drivers paired with a balanced armature tweeter for ultra-precise highs. Active Noise Cancellation reaches -42dB — the deepest in the industry. Spatial audio processing is handled on-device via our custom DSP chip for imperceptible latency.",
  },
  {
    id: "q5",
    question: "What is your return policy?",
    answer:
      "We offer a no-questions-asked 30-day return window. Products must be in original condition with all accessories. Simply initiate a return from your account portal and we'll arrange a free courier pickup. Refunds are processed within 3 business days to your original payment method.",
  },
  {
    id: "q6",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover), Apple Pay, Google Pay, and PayPal. For orders over $2,000 we also offer 0% financing through our partner Affirm, allowing you to split your purchase into 12, 24, or 36 monthly installments.",
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  inView,
}: {
  item: (typeof FAQS)[0];
  index: number;
  isOpen: boolean;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Accordion.Item value={item.id} data-ocid={`faq.item.${index + 1}`}>
        <Accordion.Header>
          <Accordion.Trigger
            className="w-full text-left flex items-center justify-between gap-4 px-7 py-5 rounded-xl transition-all duration-300 group"
            style={{
              background: isOpen
                ? "oklch(0.18 0.016 280 / 0.9)"
                : "oklch(0.165 0.012 280 / 0.6)",
              backdropFilter: "blur(16px)",
              border: isOpen
                ? "1px solid oklch(0.70 0.16 55 / 0.22)"
                : "1px solid oklch(1 0 0 / 0.06)",
              boxShadow: isOpen
                ? "0 0 0 1px oklch(0.70 0.16 55 / 0.08), 0 8px 32px -8px oklch(0.70 0.16 55 / 0.1), inset 0 1px 0 oklch(1 0 0 / 0.04)"
                : "none",
            }}
            data-ocid={`faq.toggle.${index + 1}`}
          >
            <span
              className="font-display font-medium text-base leading-snug"
              style={{
                color: isOpen
                  ? "oklch(0.92 0.01 280)"
                  : "oklch(0.78 0.008 280)",
              }}
            >
              {item.question}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="flex-shrink-0"
              style={{
                color: isOpen ? "oklch(0.70 0.16 55)" : "oklch(0.55 0.008 280)",
              }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div
            className="px-7 pb-5 pt-3 text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.60 0.008 280)" }}
          >
            {item.answer}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </motion.div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [openItem, setOpenItem] = useState<string>("");

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.10 0.008 280) 0%, oklch(0.12 0.010 280) 100%)",
      }}
      data-ocid="faq.section"
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, oklch(0.70 0.16 55 / 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-xs font-body font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: "oklch(0.70 0.16 55)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Have Questions?
          </motion.p>
          <motion.h2
            className="font-display font-bold text-4xl md:text-5xl tracking-tight"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.005 280), oklch(0.68 0.010 280))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frequently Asked
          </motion.h2>
        </div>

        {/* Accordion */}
        <Accordion.Root
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="flex flex-col gap-3"
          data-ocid="faq.list"
        >
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.id}
              item={item}
              index={i}
              isOpen={openItem === item.id}
              inView={inView}
            />
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
