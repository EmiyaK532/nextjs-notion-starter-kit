/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'Segoe UI',
    				'Microsoft YaHei',
    				'PingFang SC',
    				'Hiragino Sans GB',
    				'Source Han Sans SC',
    				'Noto Sans CJK SC',
    				'WenQuanYi Micro Hei',
                    ...defaultTheme.fontFamily.sans
                ],
    			serif: [
    				'Georgia',
    				'Cambria',
    				'Times New Roman',
    				'SimSun',
    				'Songti SC',
    				'Source Han Serif SC',
    				'Noto Serif CJK SC',
                    ...defaultTheme.fontFamily.serif
                ],
    			mono: [
    				'SFMono-Regular',
    				'Menlo',
    				'Monaco',
    				'Consolas',
    				'Liberation Mono',
    				'Courier New',
                    ...defaultTheme.fontFamily.mono
                ]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'var(--color-background)',
    			foreground: 'var(--color-foreground)',
    			primary: 'var(--color-primary)',
    			secondary: 'var(--color-secondary)',
    			accent: 'var(--color-accent)',
    			muted: 'var(--color-muted)',
    			'muted-foreground': 'var(--color-mutedForeground)',
    			border: 'var(--color-border)',
    			card: 'var(--color-card)',
    			'card-foreground': 'var(--color-cardForeground)',
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		animation: {
    			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
    			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
    			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
    		},
    		keyframes: {
    			'shimmer-slide': {
    				to: {
    					transform: 'translate(calc(100cqw - 100%), 0)'
    				}
    			},
    			'spin-around': {
    				'0%': {
    					transform: 'translateZ(0) rotate(0)'
    				},
    				'15%, 35%': {
    					transform: 'translateZ(0) rotate(90deg)'
    				},
    				'65%, 85%': {
    					transform: 'translateZ(0) rotate(270deg)'
    				},
    				'100%': {
    					transform: 'translateZ(0) rotate(360deg)'
    				}
    			},
    			ripple: {
    				'0%, 100%': {
    					transform: 'translate(-50%, -50%) scale(1)'
    				},
    				'50%': {
    					transform: 'translate(-50%, -50%) scale(0.9)'
    				}
    			}
    		},
    		typography: {
    			DEFAULT: {
    				css: {
    					'h1, h2, h3, h4, h5, h6': {
    						fontFamily: 'var(--font-sans)',
    						fontWeight: '700'
    					},
    					'p, ul, ol': {
    						fontFamily: 'var(--font-serif)'
    					},
    					blockquote: {
    						fontFamily: 'var(--font-serif)',
    						fontStyle: 'italic'
    					},
    					'code, pre': {
    						fontFamily: 'var(--font-mono)'
    					}
    				}
    			}
    		}
    	}
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/typography'),
    ],
};
