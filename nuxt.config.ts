// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' },
      ],
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
    'nuxt-svgo',
    '@formkit/auto-animate',
    '@nuxtjs/device',
    'shadcn-nuxt',
    'nuxt-swiper',
  ],

  css: ['~/assets/styles/tailwind.css', '~/assets/styles/main.scss'],
  
  vite: {
    plugins: [tailwindcss()],
  },
  
  ssr: false,
  
  devServer: {
    host: '*.*.*.*',
  },
  
  imports: {
    dirs: [
      'composables/auth/',
    ]
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
    }
  },
  
  components: {
    dirs: [
      {
        path: '~/components/common',
        pathPrefix: true,
      },
      {
        path: '~/components/ui',
        pathPrefix: true,
      },
      {
        path: '~/components',
        pathPrefix: true,
      },
    ],
  },
  
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  
  svgo: {
    componentPrefix: 'icon',
    autoImportPath: './assets/icons/',
    defaultImport: 'component',
    svgoConfig: {
      multipass: false, // Отключаем многоходовую оптимизацию
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              // Отключаем ВСЕ плагины оптимизации
              removeDoctype: false,
              removeXMLProcInst: false,
              removeComments: false,
              removeMetadata: false,
              removeEditorsNSData: false,
              cleanupIds: false,
              convertColors: false,
              convertPathData: false,
              convertTransform: false,
              removeUnknownsAndDefaults: false,
              removeNonInheritableGroupAttrs: false,
              removeUselessStrokeAndFill: false,
              removeUnusedNS: false,
              cleanupNumericValues: false,
              moveElemsAttrsToGroup: false,
              moveGroupAttrsToElems: false,
              collapseGroups: false,
              mergePaths: false,
              convertShapeToPath: false,
              sortAttrs: false,
              removeTitle: false,
              removeDesc: false,
              removeEmptyContainers: false,
              removeViewBox: false,
              cleanupEnableBackground: false,
              removeHiddenElems: false,
              removeEmptyText: false,
              inlineStyles: false,
              minifyStyles: false,
            },
          },
        },
      ],
    },
  },
  
  pinia: {
    storesDirs: ['./app/store/**'],
  },
})