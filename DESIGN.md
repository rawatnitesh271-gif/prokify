# Design Brief

## Direction

Luxury Tech Showcase — premium ecommerce platform inspired by Apple, Samsung, Tesla, Nothing. Ultra-modern, expensive, futuristic aesthetic with deep luxury color palette and sophisticated motion.

## Tone

Refined minimalism with subtle glamour — expensive, clean, and deliberately restrained. Every interaction feels smooth and premium, never flashy or chaotic.

## Differentiation

"Add to Cart" product flight animation with trailing glow effect into floating cart icon with glass expansion, combined with cursor-aware product card reflections and cinematic scroll reveals.

## Color Palette

| Token      | OKLCH       | Role                                           |
|------------|-------------|------------------------------------------------|
| background| 0.12 0.008 280 | Deep matte black for dark mode primary       |
| foreground| 0.92 0.01 280  | Bright silver-white text on dark             |
| card       | 0.165 0.012 280| Graphite elevated surface for glass effects  |
| primary    | 0.70 0.16 55 | Champagne gold accent (warm, luxury highlight)|
| accent     | 0.70 0.16 55 | Champagne gold for call-to-action elements  |
| muted      | 0.22 0.015 280| Smoked silver for secondary UI               |
| border     | 0.28 0.015 280| Subtle titanium-grey dividers               |

## Typography

- Display: Space Grotesk — futuristic, geometric, tech-forward headlines and hero text
- Body: DM Sans — clean, neutral sans-serif for product descriptions and UI labels
- Mono: Geist Mono — code/technical content
- Scale: hero `text-6xl font-bold tracking-tight`, h2 `text-4xl font-bold`, label `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Layered depth through soft glows (0.1–0.2 opacity champagne), frosted glass cards with subtle borders, and minimal shadow hierarchy. No harsh drops — only ambient light and backdrop blur.

## Structural Zones

| Zone    | Background          | Border                  | Notes                                          |
|---------|---------------------|-------------------------|------------------------------------------------|
| Header  | card/80 glass blur  | white/5 subtle divider  | Fixed/sticky navigation, premium spacing       |
| Hero    | matte black + glow  | accent spotlight effect | Product showcase with cinematic lighting       |
| Content | background + card   | alternating card/muted  | Product grid cards with hover lift + reflection|
| Footer  | card/60 glass       | border subtle divider   | Links, legal, newsletter signup               |

## Spacing & Rhythm

Large spacing between sections (3rem–4rem gaps) creates breathing room. Product cards use 1.5rem internal padding. Premium typography scales up aggressively on desktop (text-6xl heroes). Micro-interactions use 0.3s smooth easing.

## Component Patterns

- Buttons: rounded-lg, champagne gold bg, dark text, light-sweep hover, soft glow shadow
- Cards: glass effect, subtle border white/5–10, glow-md shadow, hover-lift (3px up), rounded-2xl
- Product grid: 3-column desktop / 1-column mobile, isotope-style reveal on scroll
- Badges: uppercase text-xs, gold accent with transparent bg, rounded-full

## Motion

- Entrance: fade-in-up 0.5s for sections on scroll reveal, scale-in for cards
- Hover: cards lift 3px with enhanced glow, light sweep on buttons (0.5s), text highlights gold
- Decorative: floating product hero (6–8s ease-in-out), gentle pulse on badge accents, shimmer on limited-time labels

## Constraints

- No harsh shadows or drop effects — only ambient glow
- No animated gradients or rainbow effects — maintain luxury restraint
- Accent color (champagne) used sparingly: CTAs, hover states, small highlights, never backgrounds
- Icons minimal and monochrome; when colored, accent gold only
- No auto-play videos or sound — respect user agency

## Signature Detail

Champagne gold glow radiates behind floating product showcase with subtle depth lighting; when added to cart, product shrinks and trails gold particles into cart icon creating premium "teleport" effect that feels worth the purchase.

