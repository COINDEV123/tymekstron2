import type { Config } from 'tailwindcss'

export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
                display: ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
                brutal: {
                    black: '#000000',
                    white: '#ffffff',
                    red: '#ff0000',
                    grey: '#1a1a1a',
                    mid: '#888888',
                    light: '#f0f0f0',
                },
            },
            animation: {
                'glitch': 'glitch 0.3s ease-in-out',
                'scan': 'scan 4s linear infinite',
            },
            keyframes: {
                glitch: {
                    '0%, 100%': { transform: 'translate(0)' },
                    '25%': { transform: 'translate(-2px, 1px)' },
                    '50%': { transform: 'translate(2px, -1px)' },
                    '75%': { transform: 'translate(-1px, -1px)' },
                },
                scan: {
                    '0%': { backgroundPosition: '0 0' },
                    '100%': { backgroundPosition: '0 100%' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config
