/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Theme: "Day Trip" ☀️
        'day-bg': '#e0f7fa',
        'day-text': '#01579b',
        'day-accent': '#ff6d00',
        'day-card': '#ffffff',
        'day-secondary': '#7c4dff',
        'gold-accent': '#FFD700',

        // --- Main "Night Sky" & "Aurora" Theme --- 🌌
        'night-bg': '#0c0a1a',      // Deep space background
        'night-card': '#1a1829',    // Card and panel backgrounds
        'night-text': '#e0e0e0',    // Main text color
        'night-secondary': '#4a00e0', // Secondary night color (aurora-blue)
        'night-accent': '#8e2de2',   // Accent night color (aurora-purple)

        'aurora-blue': '#4a00e0',    // Deep vibrant blue
        'aurora-purple': '#8e2de2',  // Vibrant purple
        'aurora-pink': '#EE0979',    // Bright pink
        'aurora-orange': '#FF6A00',   // Fiery orange
        'aurora-yellow': '#FDC830',  // Golden yellow
        'aurora-dark': '#010101',    // Near black for deep space contrast
        'space-cadet': '#1D2951',   // Dark blue-purple for space theme
        'deep-teal': '#008080',     // Deep teal for ocean/space themes
      },
      fontFamily: {
        // Clean and modern sans-serif for body text
        sans: ['Poppins', 'sans-serif'], 
        
        // Bold, futuristic font for main titles
        hero: ['Audiowide', 'sans-serif'],

        // Fun, comic-style font for buttons and calls-to-action
        action: ['Bangers', 'cursive'],

        // Another fun display font option
        display: ['Luckiest Guy', 'cursive'], 
      },
      boxShadow: {
        'glow-pink': '0 0 20px 0px rgba(238, 9, 121, 0.6)',
        'glow-purple': '0 0 20px 0px rgba(142, 45, 226, 0.6)',
      },
      // Note: These gradients may not be used in the current design,
      // but are kept here for potential future use.
      backgroundImage: {
        'day-sky': 'linear-gradient(180deg, #e0f7fa 0%, #80d8ff 100%)',
        'night-sky': 'linear-gradient(180deg, #0c0a1a 0%, #1a1829 50%, #3c2a4d 100%)',
      }
    },
  },
  plugins: [],
}