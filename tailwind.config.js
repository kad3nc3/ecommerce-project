/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./products.ts"],
  theme: { extend: { fontFamily: { sans: ["DM Sans", "Arial", "sans-serif"], serif: ["Fraunces", "Georgia", "serif"] } } },
  plugins: [],
};
