/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Путь к вашему HTML-файлу
    './src/**/*.{js,jsx,ts,tsx}', // Путь к вашим JavaScript/TypeScript файлам
    './pages/**/*.{html,js}', // Путь к вашим страницам
    './components/**/*.{html,js}', // Путь к вашим компонентам
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}