import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { Link, useRouter } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "About", href: "/#about" },
];

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            data-ocid="cart.backdrop"
          />
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-sm z-50 flex flex-col"
            style={{
              background: "oklch(0.14 0.01 280 / 0.97)",
              backdropFilter: "blur(24px)",
              borderLeft: "1px solid oklch(0.28 0.015 280)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            data-ocid="cart.dialog"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div>
                <h2 className="font-display font-semibold text-lg text-foreground tracking-tight">
                  Your Cart
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-accent/60 transition-smooth"
                data-ocid="cart.close_button"
                aria-label="Close cart"
              >
                <X size={14} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-48 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-ocid="cart.empty_state"
                  >
                    <span className="text-4xl mb-4">🛒</span>
                    <p className="text-muted-foreground text-sm">
                      Your cart is empty
                    </p>
                    <p className="text-muted-foreground/60 text-xs mt-1">
                      Discover premium tech below
                    </p>
                  </motion.div>
                ) : (
                  items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-4 p-3 rounded-xl border border-border/60 bg-card/40"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      transition={{ delay: i * 0.04 }}
                      data-ocid={`cart.item.${i + 1}`}
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-muted/60 text-2xl flex-shrink-0">
                        {item.imageEmoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-accent font-medium mt-0.5">
                          ${item.price.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center rounded-md border border-border hover:border-accent/60 transition-smooth text-muted-foreground hover:text-foreground"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-xs font-medium w-4 text-center text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center rounded-md border border-border hover:border-accent/60 transition-smooth text-muted-foreground hover:text-foreground"
                            aria-label="Increase quantity"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="self-start p-1.5 text-muted-foreground hover:text-destructive transition-smooth"
                        aria-label="Remove item"
                        data-ocid={`cart.delete_button.${i + 1}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display font-semibold text-lg text-foreground">
                    ${totalPrice().toLocaleString()}
                  </span>
                </div>
                <Button
                  className="w-full hover-light-sweep font-display font-semibold tracking-wide"
                  data-ocid="cart.submit_button"
                >
                  Checkout
                </Button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full text-xs text-muted-foreground/60 hover:text-muted-foreground transition-smooth py-1"
                  data-ocid="cart.cancel_button"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const prevTotalRef = useRef(0);

  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 600);
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Header */}
      <header
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-500"
        style={{
          background: scrolled
            ? "oklch(0.12 0.008 280 / 0.90)"
            : "oklch(0.12 0.008 280 / 0.70)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid oklch(0.70 0.16 55 / 0.12)",
          boxShadow: scrolled ? "0 4px 32px -4px oklch(0 0 0 / 0.5)" : "none",
        }}
        data-ocid="header"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            data-ocid="nav.logo_link"
          >
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
              className="font-display font-bold text-lg tracking-[0.15em] uppercase"
              style={{ color: "oklch(0.92 0.01 280)", letterSpacing: "0.18em" }}
            >
              Prokify
            </span>
          </Link>

          {/* Nav Links */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-smooth relative group"
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Cart Button */}
          <motion.button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full border border-border/60 text-muted-foreground hover:text-foreground hover:border-accent/50 transition-smooth"
            style={
              cartBounce
                ? { boxShadow: "0 0 20px oklch(0.70 0.16 55 / 0.4)" }
                : {}
            }
            animate={
              cartBounce ? { scale: [1, 1.2, 0.95, 1.05, 1] } : { scale: 1 }
            }
            transition={{ duration: 0.5 }}
            aria-label={`Open cart, ${totalItems} items`}
            data-ocid="cart.open_modal_button"
          >
            <ShoppingCart size={18} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-1 -right-1 w-4.5 h-4.5 flex items-center justify-center rounded-full text-[9px] font-bold font-display"
                  style={{
                    background: "oklch(0.70 0.16 55)",
                    color: "oklch(0.12 0.008 280)",
                    width: "18px",
                    height: "18px",
                  }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
