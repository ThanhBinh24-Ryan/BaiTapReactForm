const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  flowbite.content(),// Chỉ định các file trong thư mục src để Tailwind quét
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

