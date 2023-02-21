/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        "bg-orange-500",
        "bg-blue-500",
        "bg-red-500",
        "bg-purple-500",
        "border-orange-300",
        "border-orange-500",
        "border-blue-300",
        "border-blue-500",
        "border-red-300",
        "border-red-500",
        "border-purple-300",
        "border-purple-500",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
