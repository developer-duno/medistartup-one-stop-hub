
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
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2C6ECB',
					foreground: '#FFFFFF',
					100: '#EBF2FC',
					200: '#C5D9F5',
					300: '#9EBFEE',
					400: '#77A6E7',
					500: '#508CDF',
					600: '#2C6ECB',
					700: '#2358A3',
					800: '#1A427A',
					900: '#122D52',
				},
				secondary: {
					DEFAULT: '#34B899',
					foreground: '#FFFFFF',
					100: '#EAFAF6',
					200: '#C5F0E7',
					300: '#9FE6D8',
					400: '#7ADCC8',
					500: '#54D2B9',
					600: '#34B899',
					700: '#29927A',
					800: '#1F6D5B',
					900: '#14483D',
				},
				accent: {
					DEFAULT: '#FF6B35',
					foreground: '#FFFFFF',
					100: '#FFF0EB',
					200: '#FFD6C6',
					300: '#FFBBA2',
					400: '#FFA17D',
					500: '#FF8659',
					600: '#FF6B35',
					700: '#CC562A',
					800: '#994020',
					900: '#662B15',
				},
				neutral: {
					50: '#F8FAFC',
					100: '#F1F5F9',
					200: '#E2E8F0',
					300: '#CBD5E1',
					400: '#94A3B8',
					500: '#64748B',
					600: '#475569',
					700: '#334155',
					800: '#1E293B',
					900: '#0F172A',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'count-up': {
					'0%': { content: "'0'" },
					'100%': { content: "'attr(data-value)'" }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-light': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.85' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
				'pulse-light': 'pulse-light 3s ease-in-out infinite'
			},
			fontFamily: {
				pretendard: ['"Pretendard"', 'sans-serif'],
				noto: ['"Noto Sans KR"', 'sans-serif'],
				mono: ['"IBM Plex Mono"', 'monospace'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
