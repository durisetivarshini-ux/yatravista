/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          card: 'var(--color-card)',
          border: 'var(--color-border)',
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          'primary-light': 'var(--color-primary-light)',
          accent: 'var(--color-accent)',
          'accent-light': 'var(--color-accent-light)',
          text: 'var(--color-text)',
          'text-muted': 'var(--color-text-muted)',
          'text-subtle': 'var(--color-text-subtle)',
          tag: 'var(--color-tag)',
          nav: 'var(--color-nav)',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px var(--shadow-color)',
        'elevated': '0 10px 30px -4px var(--shadow-color-lg)',
        'card': '0 2px 12px 0 var(--shadow-color)',
      }
    },
  },
  plugins: [],
};
