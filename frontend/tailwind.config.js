/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom-editor': ['Roboto', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
      },
      colors: {
        theme: {
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          'primary-light': 'var(--color-primary-light)',
          secondary: 'var(--color-secondary)',
          'secondary-hover': 'var(--color-secondary-hover)',
          'secondary-light': 'var(--color-secondary-light)',
          success: 'var(--color-success)',
          'success-hover': 'var(--color-success-hover)',
          'success-light': 'var(--color-success-light)',
          warning: 'var(--color-warning)',
          'warning-hover': 'var(--color-warning-hover)',
          'warning-light': 'var(--color-warning-light)',
          error: 'var(--color-error)',
          'error-hover': 'var(--color-error-hover)',
          'error-light': 'var(--color-error-light)',
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          accent: 'var(--color-bg-accent)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          focus: 'var(--color-border-focus)',
        }
      },
      boxShadow: {
        'theme-sm': 'var(--color-shadow-sm)',
        'theme-md': 'var(--color-shadow-md)',
        'theme-lg': 'var(--color-shadow-lg)',
        'theme-xl': 'var(--color-shadow-xl)',
      },
      spacing: {
        'theme-xs': 'var(--spacing-xs)',
        'theme-sm': 'var(--spacing-sm)',
        'theme-md': 'var(--spacing-md)',
        'theme-lg': 'var(--spacing-lg)',
        'theme-xl': 'var(--spacing-xl)',
        'theme-2xl': 'var(--spacing-2xl)',
        'theme-3xl': 'var(--spacing-3xl)',
      },
      borderRadius: {
        'theme-sm': 'var(--radius-sm)',
        'theme-md': 'var(--radius-md)',
        'theme-lg': 'var(--radius-lg)',
        'theme-xl': 'var(--radius-xl)',
        'theme-2xl': 'var(--radius-2xl)',
        'theme-full': 'var(--radius-full)',
      },
      transitionDuration: {
        'theme-fast': 'var(--transition-fast)',
        'theme-normal': 'var(--transition-normal)',
        'theme-slow': 'var(--transition-slow)',
      }
    },
  },
  plugins: [],
}