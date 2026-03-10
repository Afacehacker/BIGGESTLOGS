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
                primary: {
                    light: '#a855f7',
                    DEFAULT: '#7e22ce',
                    dark: '#581c87',
                },
                secondary: '#ffffff',
                accent: {
                    neon: '#d8b4fe',
                    glow: '#9333ea',
                },
                dark: {
                    bg: '#0f172a',
                    card: '#1e293b',
                }
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' },
                    '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
        },
    },
    plugins: [],
}
