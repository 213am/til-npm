/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 우리 서비스만의 색상 추가
      colors: {
        brand: {
          light: "#3B82F6",
          DEFAULT: "#1E40AF",
          dark: "#1E3A8A",
        },
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [],
};
