import type { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "aura-x1",
    name: "AURA X1 Earbuds",
    description:
      "Adaptive noise cancellation with spatial audio. 48-hour battery life in the ultra-slim charging case. Titanium drivers engineered for studio-grade clarity.",
    price: 299,
    imageEmoji: "🎧",
    category: "Audio",
    featured: true,
  },
  {
    id: "nexus-pro-watch",
    name: "NEXUS Pro Watch",
    description:
      "Sapphire crystal display, health-grade ECG & SpO2 sensors. Titanium chassis with interchangeable precision-milled bands. 18-day battery.",
    price: 699,
    imageEmoji: "⌚",
    category: "Wearables",
    featured: true,
  },
  {
    id: "volt-s-ultra",
    name: "VOLT S Ultra",
    description:
      "Flagship smartphone with periscope camera system. 1-inch sensor, 8K ProRes recording. Graphite ceramic frame with Corning Victus 4 glass.",
    price: 1299,
    imageEmoji: "📱",
    category: "Phones",
    featured: true,
  },
  {
    id: "chrome-pad-elite",
    name: "CHROME Pad Elite",
    description:
      '12.9" micro-LED display at 2800 nits. M3-class neural processor, 5G + Wi-Fi 7, Thunderbolt 5. Ultra-thin 5.2mm profile in anodised titanium.',
    price: 1099,
    imageEmoji: "📲",
    category: "Tablets",
    featured: false,
  },
  {
    id: "prism-speaker-orb",
    name: "PRISM Speaker Orb",
    description:
      "360° immersive soundstage with Dolby Atmos processing. Anodised aluminium sphere, ambient light ring, voice-tuned array of 9 drivers.",
    price: 499,
    imageEmoji: "🔊",
    category: "Audio",
    featured: true,
  },
  {
    id: "halo-vision-pro",
    name: "HALO Vision Pro",
    description:
      "Spatial computing headset with micro-OLED panels at 4K per eye. Eye-tracking, hand gestures, 3-hour active / 8-hour light use battery.",
    price: 1499,
    imageEmoji: "🥽",
    category: "XR",
    featured: true,
  },
  {
    id: "arc-laptop-x",
    name: "ARC Laptop X",
    description:
      'Ultra-light 13.6" laptop at 990g. 2.8K OLED display, 32GB LPDDR5X, 1TB NVMe SSD. 28-hour battery in smoked titanium chassis.',
    price: 1399,
    imageEmoji: "💻",
    category: "Computers",
    featured: false,
  },
  {
    id: "nova-cam-360",
    name: "NOVA Cam 360",
    description:
      "Professional 8K action camera with 360° horizon lock. 4-axis stabilisation, night mode neural processing, titanium body, 90fps at 4K.",
    price: 399,
    imageEmoji: "📷",
    category: "Cameras",
    featured: false,
  },
  {
    id: "echo-buds-lite",
    name: "ECHO Buds Lite",
    description:
      "Open-ear spatial audio earbuds with bone conduction. 36-hour combined battery, IPX7, Bluetooth 5.4 multipoint for 4 devices.",
    price: 199,
    imageEmoji: "🎵",
    category: "Audio",
    featured: false,
  },
  {
    id: "zenith-charger-100",
    name: "ZENITH Charger 100",
    description:
      "100W GaN3 Pro USB-C charger with intelligent load balancing. Charges laptop, phone and earbuds simultaneously. Graphite finish, café-card size.",
    price: 129,
    imageEmoji: "🔋",
    category: "Accessories",
    featured: false,
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);
export const PRODUCT_CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
