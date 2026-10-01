/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '2200px',
    },
    extend: {
      colors: {
        canvas: '#0B0B0D',
        basalt: '#121215',
        elevation: '#1A1A1F',
        chalk: '#F5F5F0',
        concrete: '#8A8A93',
        signal: '#E25822',
        bronze: '#C5A880',
        rule: 'rgba(245, 245, 240, 0.08)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        technical: '0.2em',
      },
      maxWidth: {
        monograph: '1800px',
      },
      boxShadow: {
        'line-inset': 'inset 0 0 0 1px rgba(245, 245, 240, 0.08)',
      },
    },
  },
  plugins: [],
};
