import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface FlyingItem {
  id: string;
  emoji: string;
  startX: number;
  startY: number;
}

export interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const cardRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);
  const [reflection, setReflection] = useState({ x: 0.5, y: 0.5 });
  const [isAdding, setIsAdding] = useState(false);
  const [flyingItem, setFlyingItem] = useState<FlyingItem | null>(null);
  const [ripple, setRipple] = useState(false);
  const [cartGlow, setCartGlow] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setReflection({ x, y });
  }, []);

  const handleAddToCart = useCallback(() => {
    if (isAdding || !emojiRef.current) return;
    setIsAdding(true);

    const emojiRect = emojiRef.current.getBoundingClientRect();
    const centerX = emojiRect.left + emojiRect.width / 2;
    const centerY = emojiRect.top + emojiRect.height / 2;

    setFlyingItem({
      id: product.id,
      emoji: product.imageEmoji,
      startX: centerX,
      startY: centerY,
    });

    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageEmoji: product.imageEmoji,
      });
      setFlyingItem(null);
      setRipple(true);
      setCartGlow(true);
      setTimeout(() => setRipple(false), 700);
      setTimeout(() => {
        setCartGlow(false);
        setIsAdding(false);
      }, 900);
    }, 650);
  }, [isAdding, product, addItem]);

  return (
    <>
      <motion.div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden group cursor-pointer"
        style={{
          background: "oklch(var(--card) / 0.45)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid oklch(1 0 0 / 0.08)",
        }}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.55,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        onMouseMove={handleMouseMove}
        data-ocid={`products.item.${index + 1}`}
      >
        {/* Background glow intensifies on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, oklch(0.7 0.16 55 / 0.08), transparent 70%)",
          }}
          whileHover={{ opacity: 1.6 }}
          transition={{ duration: 0.4 }}
        />

        {/* Cursor-responsive shine overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${reflection.x * 100}% ${reflection.y * 100}%, oklch(1 0 0 / 0.06) 0%, transparent 60%)`,
            transition: "background 0.12s ease",
          }}
        />

        {/* Hover glow border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: "1px solid transparent" }}
          whileHover={{
            boxShadow:
              "0 0 0 1px oklch(0.7 0.16 55 / 0.35), 0 12px 48px -8px oklch(0.7 0.16 55 / 0.25)",
          }}
          transition={{ duration: 0.35 }}
        />

        <div className="p-6 flex flex-col gap-4">
          {/* Emoji product image */}
          <div className="relative flex items-center justify-center h-28 select-none">
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 60%, oklch(0.7 0.16 55 / 0.12), transparent 65%)",
                filter: "blur(8px)",
              }}
              whileHover={{ opacity: 1.5 }}
            />
            <span
              ref={emojiRef}
              className="text-7xl leading-none select-none"
              style={{
                filter:
                  "drop-shadow(0 6px 18px oklch(0.7 0.16 55 / 0.22)) drop-shadow(0 2px 6px rgba(0,0,0,0.45))",
              }}
            >
              {product.imageEmoji}
            </span>
          </div>

          {/* Category badge */}
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "oklch(0.7 0.16 55)" }}
          >
            {product.category}
          </span>

          {/* Product name */}
          <h3
            className="font-display font-bold text-lg leading-snug"
            style={{ color: "oklch(var(--foreground))" }}
          >
            {product.name}
          </h3>

          {/* Description snippet */}
          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            {product.description}
          </p>

          {/* Price + CTA row */}
          <div className="flex items-center justify-between mt-1 gap-3">
            <span
              className="font-display font-bold text-xl tabular-nums"
              style={{ color: "oklch(0.7 0.16 55)" }}
            >
              ${product.price.toLocaleString()}
            </span>

            {/* Add to Cart button */}
            <motion.button
              type="button"
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl font-display font-medium text-sm overflow-hidden hover-light-sweep transition-smooth"
              style={{
                background: "oklch(0.7 0.16 55 / 0.15)",
                border: "1px solid oklch(0.7 0.16 55 / 0.35)",
                color: "oklch(0.85 0.1 55)",
                boxShadow: cartGlow
                  ? "0 0 16px oklch(0.7 0.16 55 / 0.55), 0 0 32px oklch(0.7 0.16 55 / 0.25)"
                  : "none",
                transition: "box-shadow 0.4s ease",
              }}
              whileHover={{
                background: "oklch(0.7 0.16 55 / 0.25)",
                scale: 1.04,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              data-ocid={`products.add_to_cart.${index + 1}`}
            >
              <motion.span
                animate={cartGlow ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <ShoppingCart size={14} />
              </motion.span>
              <span>{isAdding ? "Adding…" : "Add to Cart"}</span>

              {/* Ripple effect */}
              <AnimatePresence>
                {ripple && (
                  <motion.span
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    initial={{ opacity: 0.6, scale: 0 }}
                    animate={{ opacity: 0, scale: 2.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    style={{ background: "oklch(0.7 0.16 55 / 0.3)" }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Flying emoji portal */}
      {flyingItem &&
        createPortal(
          <FlyingEmoji
            emoji={flyingItem.emoji}
            startX={flyingItem.startX}
            startY={flyingItem.startY}
          />,
          document.body,
        )}
    </>
  );
}

interface FlyingEmojiProps {
  emoji: string;
  startX: number;
  startY: number;
}

function FlyingEmoji({ emoji, startX, startY }: FlyingEmojiProps) {
  // Target: top-right corner near where cart icon typically lives
  const targetX = window.innerWidth - 72;
  const targetY = 32;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] text-4xl leading-none select-none"
      style={{ left: startX, top: startY, x: "-50%", y: "-50%" }}
      initial={{ scale: 1, rotate: 0, opacity: 1 }}
      animate={{
        left: targetX,
        top: targetY,
        scale: 0.25,
        rotate: 12,
        opacity: [1, 0.9, 0.6, 0],
      }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
    >
      <span
        style={{
          filter:
            "drop-shadow(0 0 8px oklch(0.7 0.16 55 / 0.8)) drop-shadow(0 0 16px oklch(0.7 0.16 55 / 0.5))",
        }}
      >
        {emoji}
      </span>
    </motion.div>
  );
}
