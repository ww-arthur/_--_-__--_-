// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    theme: {
      defaultTheme: 'dark',
      variations: {
        colors: ['primary', 'card'],
        lighten: 10,
        darken: 6,
      },
      themes: {
        dark: {
          colors: {
            primary: '#5C03FA',
            complementary: '#A1FC03',
            card: '#212121',
            text: '#ffffff',
            highlight: '#555',
          },
        },
        light: {
          colors: {
            primary: '#5C03FA',
            complementary: '#A1FC03',
            card: '#fcfcfb',
            text: '#000000',
            highlight: '#ccc',
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
