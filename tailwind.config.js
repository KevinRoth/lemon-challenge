/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a259e6',
          50: '#f5f0fa',
          100: '#e6d6f5',
          200: '#c9aee6',
          300: '#b184db',
          400: '#9b5fd1',
          500: '#a259e6',
          600: '#7e3fc1',
          700: '#6a34a3',
          800: '#52277d',
          900: '#3d1c5c',
        },
        secondary: {
          DEFAULT: '#2c2c31',
          50: '#eaeaea',
          100: '#bebebf',
          200: '#9e9ea0',
          300: '#727275',
          400: '#56565a',
          500: '#2c2c31',
          600: '#28282d',
          700: '#1f1f23',
          800: '#18181b',
          900: '#121215',
        },

        transparent: 'transparent',
      },
      spacing: {
        '2xs': '4px',
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '40px',
        '2xl': '48px',
        '3xl': '56px',
        '4xl': '64px',
        '5xl': '80px',
      },
    },
  },
  plugins: [],
};
