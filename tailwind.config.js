// import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          playfair: ['"Playfair Display"', 'serif'],
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
          'fade-in': 'fadeIn 1.5s ease-in forwards',
          'wave': 'wave 2s ease-in-out infinite'
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' }
          },
          fadeIn: {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' }
          },
          wave: {
            '0%, 100%': { 
              transform: 'translateY(0) rotate(0deg)' 
            },
            '25%': { 
              transform: 'translateY(-10px) rotate(2deg)' 
            },
            '50%': { 
              transform: 'translateY(0) rotate(0deg)' 
            },
            '75%': { 
              transform: 'translateY(5px) rotate(-2deg)' 
            }
          }
        }
      },
    },
    plugins: [
      require('tailwindcss-animate'),
    ],
}  