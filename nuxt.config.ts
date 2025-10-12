// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '/fonts.css' }
      ]
    }
  },
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],

  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Poppins', provider: 'google' },
      { name: 'system-ui', provider: 'none' }
    ]
  },
  
  colorMode: {
    preference: 'light', // default value
    fallback: 'light', // fallback value if not system preference found
    classSuffix: '', // no suffix, so we get 'light' and 'dark' classes
    storageKey: 'mr-theme' // use same key as our custom implementation
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
    vueI18n: './i18n.config.ts'
  }
})