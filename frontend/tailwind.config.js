/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./cosmic-companion-ai/src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, rgb(3, 7, 18), rgb(17, 24, 39), rgb(3, 7, 18))',
        'quantum-gradient': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
      },
      colors: {
        gray: {
          950: 'rgb(3, 7, 18)',
        },
        quantum: {
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        }
      },
      boxShadow: {
        'quantum': '0 0 15px rgba(14, 165, 233, 0.3)',
        'quantum-hover': '0 0 25px rgba(14, 165, 233, 0.5)',
      }
    },
  },
  plugins: [],
}
