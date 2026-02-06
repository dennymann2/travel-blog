# Fernweh & Fußspuren — Travel Blog

> **Portfolio demo project by Denny Rezvanov.**  
> This website is a showcase piece built to demonstrate my frontend development capabilities to potential clients. It is not a real travel blog — the content is fictional and exists purely for demonstration purposes.

---

## Overview

A fully responsive, single-page travel blog application featuring immersive scroll animations, an interactive world map, and a polished dark-mode design. The site showcases five fictional travel destinations with rich editorial content, image galleries, and embedded video support.

**Live preview:** [fernweh-fussspuren.vercel.app](https://fernweh-fussspuren.vercel.app/)

---

## Features

| Feature | Description |
|---|---|
| **Animated Hero** | Full-viewport landing section with layered gradient orbs, staggered entrance animations, and a floating scroll indicator |
| **Scroll Reveal** | Content sections animate into view on scroll using Framer Motion's `useInView` with staggered timing |
| **Page Transitions** | `AnimatePresence` handles smooth crossfade transitions between the home feed and individual blog posts |
| **Interactive Map** | Leaflet map with dark CARTO tiles, custom amber markers, dashed route lines, and clickable legend |
| **Blog Post Detail** | Long-form reading view with serif display typography, blockquote styling, image galleries, and video embeds |
| **Glassmorphism UI** | Frosted-glass cards and header bar using `backdrop-blur` with subtle border highlights |
| **Responsive Design** | Fully optimized for mobile, tablet, and desktop — touch targets, adaptive font sizing, and fluid grid layouts |
| **Easter Egg** | Hidden dinosaur game accessible via the footer 🦖 |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 |
| **Animations** | Framer Motion |
| **Maps** | Leaflet + CARTO dark tiles |
| **Icons** | Lucide React |
| **Build Tool** | Vite 7 |
| **Minification** | Terser |
| **Deployment** | Netlify / Vercel |

---

## Project Structure

```
├── App.tsx                  # Root layout, routing, footer
├── main.tsx                 # React entry point
├── index.html               # HTML shell + meta / OG tags
│
├── components/
│   ├── Hero.tsx             # Full-screen animated landing
│   ├── IntroSection.tsx     # About section with scroll reveals
│   ├── BlogSection.tsx      # Blog grid with staggered card reveals
│   ├── BlogCard.tsx         # Individual post card component
│   ├── BlogPost.tsx         # Full blog post detail view
│   ├── MapSection.tsx       # Map section wrapper
│   ├── TravelMap.tsx        # Leaflet map with markers + legend
│   ├── DinosaurGame.tsx     # Easter egg modal (iframe game)
│   ├── ImageWithFallback.tsx# Image component with error state
│   └── ui/                  # Reusable UI primitives (shadcn/ui)
│
├── data/
│   └── blog-posts.ts        # All blog post content (5 destinations)
│
├── types/
│   └── blog.ts              # TypeScript interfaces
│
├── styles/
│   └── globals.css          # Design tokens, animations, utilities
│
├── public/
│   ├── images/              # Cover photos + galleries per destination
│   └── videos/              # Video content per destination
│
├── tailwind.config.js       # Extended theme (fonts, colors, keyframes)
├── vite.config.ts           # Vite config with code-splitting
├── tsconfig.json            # TypeScript config
└── netlify.toml             # Deployment config
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Performance

- **Code splitting** — Vendor chunks for React, Three.js, and Leaflet via Rollup manual chunks
- **Lazy loading** — All gallery and below-fold images use `loading="lazy"`
- **Hardware acceleration** — Animations use `transform` and `opacity` for GPU compositing
- **Reduced motion** — Respects `prefers-reduced-motion` media query
- **Optimized fonts** — Google Fonts loaded with `display=swap` to prevent render blocking

---

## Deployment

The project includes configs for both **Netlify** (`netlify.toml`) and **Vercel** (zero-config). Push to `main` and either platform will auto-build and deploy.

---

## Contact

**Denny Rezvanov**  
This is a portfolio demo — if you're interested in working together, feel free to reach out.
