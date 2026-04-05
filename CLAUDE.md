# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check + production build (tsc -b && vite build)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

There are no tests configured in this project.

## Architecture

This is a single-page personal portfolio built with React 19 + TypeScript + Vite. There is no routing — the entire site is a vertically scrolling page rendered from [src/App.tsx](src/App.tsx).

**Section order** (top to bottom):
`Hero` → `About` → `Skills` → `Projects` → `AppleScrollSection` → `Security` → `Footer`

**`TesseractBackground`** is a fixed, full-viewport Three.js canvas (`@react-three/fiber`) rendered behind all content at `z-0`. It renders a 4D hypercube wireframe that rotates continuously and responds to scroll position via `window.scrollY`. All page sections sit at `z-10` above it.

**Scroll animations** use Framer Motion throughout:
- `Hero` uses `useScroll` + `useTransform` for parallax fade-out on scroll.
- `AppleScrollSection` is a `300vh` sticky section that sequences three full-screen text panels using `scrollYProgress` — similar to Apple product page animations.

**Styling** uses Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Custom design tokens are defined in [src/index.css](src/index.css) under `@theme`:
- `bg-obsidian` (`#0a0a0a`) — primary background
- `font-space` — Space Grotesk from Google Fonts
- Custom utility classes: `.glass`, `.glass-card`, `.text-glow`

The color palette is dark with purple (`#a855f7`), emerald (`#10b981`), and gold (`#d4af37`) accents — matching the Three.js tesseract wireframe colors.
