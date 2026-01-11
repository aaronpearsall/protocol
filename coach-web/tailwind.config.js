/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme palette inspired by modern dashboards
        dark: {
          bg: '#0F172A', // Slate 900
          surface: '#1E293B', // Slate 800
          card: '#334155', // Slate 700
          border: '#475569', // Slate 600
        },
        primary: {
          DEFAULT: '#6366F1', // Indigo 500
          light: '#818CF8', // Indigo 400
          dark: '#4F46E5', // Indigo 600
        },
        accent: {
          purple: '#A855F7', // Purple 500
          blue: '#3B82F6', // Blue 500
          green: '#10B981', // Green 500
        },
      },
      backgroundImage: {
        'gradient-card': 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
        'gradient-card-blue': 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
      },
    },
  },
  plugins: [],
}

