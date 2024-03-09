/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '1px 1px 2px rgba(0,0,0,.55)',
        'neon': '0px 0px 3px rgba(231,90,124,0.5)',
        'pop': '1px 1px 0px rgba(252,250,249,0.1)'
      },
      borderWidth: {
        '1': '1px'
      },
      textColor: {
        'primary': '#E75A7C',
        'primary-70': 'rgba(231,90,124,0.7)',
        'primary-50': 'rgba(231,90,124,0.5)',
        'primary-30': 'rgba(231,90,124,0.3)',
        'primary-light': '#EB708D',
        'primary-dark': '#E64C70',
        'secondary': '#FDD246',
        'light': '#FCFAF9',
        'dark': '#121317',
        'terciary': '#028090'
      },
      backgroundColor: {
        'primary': '#E75A7C',
        'primary-70': 'rgba(231,90,124,0.7)',
        'primary-50': 'rgba(231,90,124,0.5)',
        'primary-30': 'rgba(231,90,124,0.3)',
        'primary-light': '#EB708D',
        'primary-dark': '#E64C70',
        'secondary': '#FDD246',
        'light': '#FCFAF9',
        'dark': '#121317'
      },
      colors: {
        'primary': '#E75A7C',
        'primary-light': '#EB708D',
        'primary-dark': '#E64C70',
        'secondary': '#FDD246',
        'light': '#FCFAF9',
        'dark': '#121317',
        'terciary': '#028090'
      },
      borderColor: {
        'primary': '#E75A7C',
        'primary-light': '#EB708D',
        'primary-dark': '#E64C70',
        'secondary': '#FDD246',
        'light': '#FCFAF9',
        'dark': '#121317',
        'terciary': '#028090'
      },
      boxShadowColor: {
        'primary': '#E75A7C',
        'primary-light': '#EB708D',
        'primary-dark': '#E64C70',
        'secondary': '#FDD246',
        'light': '#FCFAF9',
        'dark': '#121317'
      },
      boxShadow: {
        'divider': '0px 1px 0px 0px rgba(0,0,0,0.3)',
        'depth': 'inset 0px 0px 7px 2px rgba(0,0,0,0.25)',
        'depth-md': 'inset 0px 0px 5px 1px rgba(0,0,0,0.1)',
        'large': '0px 0px 10px 5px rgba(0,0,0,0.25)',
        'top': '0px -0px 8px 1px rgba(0,0,0,0.10)'
      },
      height: {
        '1px': '1px',
      },
      backgroundImage: {
        'img-festival': "url('/img/festival.png')",
        'img-alegria': "url('/img/alegria.png')",
        'img-alegria-gris': "url('/img/alegria_gris.jpg')",
        'img-gente': "url('/img/gente.png')",
        'img-gradient': "url('/img/gradient.png')",
        'img-usando-celular': "url('/img/usando_celular.png')"
      },
      gridRow: {
        'layout': '2fr 1fr',
        'span-11': 'span 11 / span 11',
        'span-15': 'span 15 / span 15',
        'span-14': 'span 14 / span 14',
        'span-16': 'span 16 / span 16'
      },
      gridTemplateRows: {
        '12': 'repeat(12, 1fr)',
        '16': 'repeat(16, 1fr)',
        'mini': 'reapeat(2, 100px)'
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '100' },
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)'}
        }
      },
      animation: {
        'one-pulse': 'pulse .3s ease-in 1'
      }
    }
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ]
}
