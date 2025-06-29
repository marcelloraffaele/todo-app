/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#18181b',
        foreground: '#f4f4f5',
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#a21caf',
        card: '#27272a',
        border: '#3f3f46',
        input: '#27272a',
      },
    },
  },
  plugins: [],
};
