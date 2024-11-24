/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'tillana': ['Tillana', 'sans-serif'],
      },
      keyframes: {
        spinBack: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        }
      },
      animation: {
        'spin-back': 'spinBack 1s linear infinite',
      }
    },
  },
  plugins: [],
}

