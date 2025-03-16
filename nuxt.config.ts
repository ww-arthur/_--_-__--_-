import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify', 'pdfjs-dist'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@vueuse/nuxt',
    // https://pinia.vuejs.org/ssr/nuxt.html
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt',

  ],

  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins?.push(
        vuetify({
          styles: {
            configFile: './assets/settings.scss',
          },
        }),
      )
    },
  },
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    'vuetify/styles',
    '~/assets/styles/_global.scss'
  ],

  ssr: false,

  vite: {
    optimizeDeps: {
      include: ['pdfjs-dist'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'pdf.worker': ['pdfjs-dist/build/pdf.worker.js'],
          },
        },
      },
    },
    resolve: {
      alias: {
        'pdfjs-dist/build/pdf.worker.entry': 'pdfjs-dist/build/pdf.worker.js',
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },

  },
  runtimeConfig: {
    public: {
      backEndUrl: process.env.NUXT_BACKEND_URL,
      buildMode: process.env.NUXT_BUILD_MODE,
    },
  },
});
