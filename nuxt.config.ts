export default defineNuxtConfig({
  app: {
    baseURL: '/madison-reed-challenge/',
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },

  ssr: false,
  
  nitro: {
    compressPublicAssets: true,
    minify: true,
    prerender: {
      routes: ['/']
    }
  },
  
  css: [
    '~/assets/css/theme.css'
  ],
  
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-svgo'
  ],
  
  svgo: {
    svgoConfig: {
      plugins: [
        'preset-default',
        {
          name: 'removeDimensions',
        }
      ]
   }
  },

  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Poppins', provider: 'google' },
      { name: 'system-ui', provider: 'none' }
    ]
  },
  
  colorMode: {
    preference: 'light',
    fallback: 'light', 
    classSuffix: '', 
    storageKey: 'mr-theme' 
  },
  
  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      { 
        code: 'en', 
        name: 'English',
        language: 'en-US',
        file: 'en.json'
      },
      { 
        code: 'pt-br', 
        name: 'Português (Brasil)',
        language: 'pt-BR',
        file: 'pt-br.json'
      }
    ],
    langDir: 'locales',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    },
    vueI18n: './i18n.config.ts'
  }
})