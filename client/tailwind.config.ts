import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gothic-glow': 'gothic-glow 2s ease-in-out infinite',
        'gothic-float': 'gothic-float 3s ease-in-out infinite',
        'gothic-lightning': 'gothic-lightning 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gothic-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'gothic-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gothic-lightning': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.8)' },
        },
        'glow': {
          from: { boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)' },
          to: { boxShadow: '0 0 40px rgba(147, 51, 234, 0.8)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
