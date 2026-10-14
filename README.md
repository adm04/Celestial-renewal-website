# Serene — Gentle Touch. Radiant Presence.

> Expert beauty and holistic wellness, delivered with warmth and intention.

A luxury beauty and wellness landing page built with **React**, **Vite**, **Tailwind CSS**, and **TypeScript**. Designed with rich aesthetics, liquid-glass surfaces, soft glows, and 60fps GPU-accelerated parallax animations.

---

## ✨ Features

- **Atmospheric Hero Section**:
  - Full-viewport ambient video background with a subtle dark overlay.
  - Heading in *Instrument Serif* with radiant text glow effects.
  - Interactive sound indicator at bottom-left enabling audio engagement.
  - Pill CTA button *"Begin your renewal"* with custom button glow.

- **Fixed Navigation & Mobile Menu**:
  - Desktop navigation with cursive brand logo in *Dancing Script*.
  - Smooth backdrop-blurred header that reacts to scroll position.
  - Custom mobile hamburger icon with `cubic-bezier(0.22, 1, 0.36, 1)` easing morphing into an "X".
  - Slide-in glassmorphic navigation drawer with staggered link reveals and consultation button.

- **Parallax Scroll Quote Section**:
  - Deep-sky gradient (`#010A17` -> `#0A4267` -> `#20658E` -> `#6BADC4`).
  - Smooth requestAnimationFrame-driven parallax using lerp smoothing:
    - **Rainbow Arc**: Vertically shifts dynamically across the viewport.
    - **Drifting Clouds**: Left and right ethereal clouds sliding into view and drifting smoothly with scroll progress.
  - Quote in *Instrument Serif* featuring founder Dr. Mia Callahan's philosophy.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + Custom Vanilla CSS Utilities
- **Typography**:
  - *Dancing Script* (Weights: 400, 500, 600, 700)
  - *Instrument Serif* (Italic & Regular)
  - *Inter* (Weights: 300 to 900)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adm04/Celestial-renewal-website.git

# Navigate to project directory
cd Celestial-renewal-website

# Install dependencies
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Open your browser at `http://localhost:5173/`.

### Production Build

Create an optimized production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
