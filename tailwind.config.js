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
        "bg-purple-200",
        "bg-purple-500",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
