/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        "bg-orange-200",
        "bg-orange-500",
        "bg-blue-200",
        "bg-blue-500",
        "bg-red-200",
        "bg-red-500",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
