/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "ssm": "500px",
        "mmd": "880px"
      }
    },
 
  },
  plugins: [],
}

