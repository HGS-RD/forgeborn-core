/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'background': '#ffffff',
      },
      textColor: {
        'foreground': '#333333',
      },
    },
  },
  plugins: [],
}
