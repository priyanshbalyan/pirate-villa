const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx,md,mdx}'],
	theme: {
    	extend: {
    		colors: {
    			primary: '#d4aa7d',
    			secondary: '#1e201b',
    			background: '#e7e0d7',
    			site: '#323334',
    			line: '#10100f'
    		},
    		fontFamily: {
    			sans: ['var(--font-custom)', ...defaultTheme.fontFamily.sans]
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			marquee: {
    				'0%': {
    					transform: 'translateX(0%)'
    				},
    				'100%': {
    					transform: 'translateX(-100%)'
    				}
    			},
    			marquee2: {
    				'0%': {
    					transform: 'translateX(100%)'
    				},
    				'100%': {
    					transform: 'translateX(0%)'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			marquee: 'marquee 25s linear infinite',
    			marquee2: 'marquee2 25s linear infinite'
    		}
    	}
    },
	plugins: [require('@tailwindcss/typography')],
	darkMode: ['class', 'class'],
};
