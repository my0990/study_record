/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '128': '32rem',
        '160': '40rem'
      }
    },
    screens: {
      'phone': '320px',
      'sm':'640px',
      'md': '768px',
      'lg': '1024px',
    }
  },
  daisyui: {
    themes: false
  },
  plugins: [require('daisyui')],
}
