/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		// Path to Tremor module
		'./node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				gothicRegular: ['GothicRegular'],
				gothicBold: ['GothicBold'],
			},
			colors: {
				blueBase: '#0B2851',
				textBlank: '#d5f1ff',
				textGrey: '#b4e8ff',
				buttonBase: '#0485ff',
				buttonHover: '#006df7',
				black2: '#0E0E11',
				gris: '#F6F5FA',
				'blue-zodiac': {
					50: '#e9f8ff',
					100: '#cef0ff',
					200: '#a7e6ff',
					300: '#6bdaff',
					400: '#26c1ff',
					500: '#0099ff',
					600: '#006fff',
					700: '#0054ff',
					800: '#0047e6',
					900: '#0042b3',
					950: '#002053',
				},
			},
		},
	},
	plugins: [daisyui],
};
