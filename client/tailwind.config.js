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
                    light: '#34d399',
                    DEFAULT: '#059669',
                    dark: '#047857',
                },
                secondary: '#ffffff',
                accent: {
                    neon: '#10b981',
                    glow: '#059669',
                },
                dark: {
                    bg: '#022c22',
                    card: '#064e3b',
                }
            },
            animation: {
                'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)' },
                    '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(16, 185, 129, 0.8)' },
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

