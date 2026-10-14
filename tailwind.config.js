/**
 * Tailwind CSS Configuration for "Serene" Luxury Beauty & Wellness Landing Page
 *
 * This configuration scans all source files (`.html`, `.tsx`, `.ts`, `.jsx`, `.js`)
 * and works in conjunction with custom CSS utilities defined in `src/index.css`
 * (including `.liquid-glass`, `.text-glow`, and `.button-glow`).
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom fonts and styling extensions can be added here or via index.css
    },
  },
  plugins: [],
}
