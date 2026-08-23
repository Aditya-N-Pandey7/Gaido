/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B3B9E',
        accent: '#FF9500',
        background: '#F8F9FA',
        textDark: '#1A1A1A',
        textGray: '#666666',
        success: '#4CAF50',
        warning: '#FF6B6B',
        neutralLight: '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
