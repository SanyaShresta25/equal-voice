/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        goopy: ['GroovenShine', 'cursive'], // Add your custom font here
      },
    },
  },
  plugins: [],
}
