/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        canvas: '#040914',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glass: '0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)',
        'glass-hover': '0 0 0 1px rgba(255,255,255,0.14), 0 12px 40px rgba(0,0,0,0.5)',
        'glow-indigo': '0 0 24px 4px rgba(99,102,241,0.3)',
        'glow-violet': '0 0 24px 4px rgba(139,92,246,0.3)',
      },
    },
  },
  plugins: [],
};
