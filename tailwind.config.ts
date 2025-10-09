import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		spacing: {
    			'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
    			'safe-area-inset-top': 'env(safe-area-inset-top)',
    			'safe-area-inset-left': 'env(safe-area-inset-left)',
    			'safe-area-inset-right': 'env(safe-area-inset-right)'
    		},
    		fontFamily: {
    			sans: [
    				'SF Pro Display',
    				'Inter',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'sans-serif'
    			],
    			mono: [
    				'SF Mono',
    				'JetBrains Mono',
    				'Monaco',
    				'monospace'
    			],
    			display: [
    				'SF Pro Display',
    				'Inter',
    				'-apple-system',
    				'BlinkMacSystemFont',
    				'sans-serif'
    			]
    		},
    		fontSize: {
    			xs: [
    				'0.75rem',
    				{
    					lineHeight: '1rem'
    				}
    			],
    			sm: [
    				'0.875rem',
    				{
    					lineHeight: '1.25rem'
    				}
    			],
    			base: [
    				'1rem',
    				{
    					lineHeight: '1.5rem'
    				}
    			],
    			lg: [
    				'1.125rem',
    				{
    					lineHeight: '1.75rem'
    				}
    			],
    			xl: [
    				'1.25rem',
    				{
    					lineHeight: '1.75rem'
    				}
    			],
    			'2xl': [
    				'1.5rem',
    				{
    					lineHeight: '2rem'
    				}
    			],
    			'3xl': [
    				'1.875rem',
    				{
    					lineHeight: '2.25rem'
    				}
    			],
    			'4xl': [
    				'2.25rem',
    				{
    					lineHeight: '2.5rem'
    				}
    			],
    			'5xl': [
    				'3rem',
    				{
    					lineHeight: '1'
    				}
    			],
    			'6xl': [
    				'3.75rem',
    				{
    					lineHeight: '1'
    				}
    			],
    			'7xl': [
    				'4.5rem',
    				{
    					lineHeight: '1'
    				}
    			],
    			'8xl': [
    				'6rem',
    				{
    					lineHeight: '1'
    				}
    			],
    			'9xl': [
    				'8rem',
    				{
    					lineHeight: '1'
    				}
    			]
    		},
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))',
    				light: 'hsl(var(--primary-light))',
    				glow: 'hsl(var(--primary-glow))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))',
    				light: 'hsl(var(--accent-light))'
    			},
    			success: {
    				DEFAULT: 'hsl(var(--success))',
    				foreground: 'hsl(var(--success-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    			'hero-pattern': 'linear-gradient(135deg, hsl(220 85% 15% / 0.95), hsl(220 85% 25% / 0.9))',
    			glass: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
    		},
    		backdropBlur: {
    			xs: '2px'
    		},
    		boxShadow: {
    			soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    			glow: '0 0 30px hsl(220 85% 45% / 0.4)',
    			'glow-accent': '0 0 30px hsl(190 85% 45% / 0.4)',
    			'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
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
    			'fade-in': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(10px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'slide-up': {
    				'0%': {
    					opacity: '0',
    					transform: 'translateY(20px)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			'scale-in': {
    				'0%': {
    					opacity: '0',
    					transform: 'scale(0.95)'
    				},
    				'100%': {
    					opacity: '1',
    					transform: 'scale(1)'
    				}
    			},
    			float: {
    				'0%, 100%': {
    					transform: 'translateY(0px)'
    				},
    				'50%': {
    					transform: 'translateY(-10px)'
    				}
    			},
    			'pulse-glow': {
    				'0%, 100%': {
    					boxShadow: '0 0 20px hsl(220 85% 45% / 0.3)'
    				},
    				'50%': {
    					boxShadow: '0 0 30px hsl(220 85% 45% / 0.5)'
    				}
    			},
    			shimmer: {
    				'0%': {
    					transform: 'translateX(-100%)'
    				},
    				'100%': {
    					transform: 'translateX(100%)'
    				}
    			},
    			gradient: {
    				'0%': { backgroundPosition: '0% 50%' },
    				'50%': { backgroundPosition: '100% 50%' },
    				'100%': { backgroundPosition: '0% 50%' },
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'fade-in': 'fade-in 0.5s ease-out',
    			'slide-up': 'slide-up 0.4s ease-out',
    			'scale-in': 'scale-in 0.3s ease-out',
    			float: 'float 6s ease-in-out infinite',
    			'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
    			shimmer: 'shimmer 2s linear infinite',
    			gradient: 'gradient 8s linear infinite'
    		}
    	}
    },
	plugins: [
		require("tailwindcss-animate"),
		// Добавим custom утилиты для safe area
		function({ addUtilities }: any) {
			addUtilities({
				'.safe-area-pb': {
					'padding-bottom': 'env(safe-area-inset-bottom)'
				},
				'.safe-area-pt': {
					'padding-top': 'env(safe-area-inset-top)'
				},
				'.safe-area-pl': {
					'padding-left': 'env(safe-area-inset-left)'
				},
				'.safe-area-pr': {
					'padding-right': 'env(safe-area-inset-right)'
				},
				'.h-safe-area-inset-bottom': {
					height: 'env(safe-area-inset-bottom)'
				}
			});
		}
	],
} satisfies Config;
