import regexpPlugin from 'rollup-plugin-regexp'
import * as mdicons from '@mdi/js'

const mdi: Record<string, string> = {}
Object.keys(mdicons).forEach((key) => {
  const value = (mdicons as Record<string, string>)[key]
  mdi[key.replace(/[A-Z]+(?![a-z])|[A-Z0-9]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())] =
    value
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 5000,
  },
  build: {
    transpile: ['vue-echarts', 'resize-detector'],
  },
  // you can turn on SSR but Vuetify has a layout bug
  // https://github.com/vuetifyjs/vuetify/issues/15202
  ssr: true,
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'vuetify-nuxt-module',
    'nuxt-auth-utils',
    '@nuxt/test-utils/module',
    '@nuxtjs/google-fonts',
  ],
  css: ['~/assets/styles/index.css'],
  experimental: { typedPages: true },
  typescript: { shim: false, strict: true },
  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        viewportSize: true,
        prefersColorScheme: true,
        prefersColorSchemeOptions: {},
        reloadOnFirstRequest: true,
      },
    },
  },
  googleFonts: {
    families: {
      Overpass: [500, 600, 700], // Specify the weights you want to load
    },
    display: 'swap', // Ensures text is still visible during font loading
  },
  vite: {
    plugins: [
      regexpPlugin({
        exclude: ['node_modules/**'],
        find: /\b(?<![/\w])(mdi-[\w-]+)\b(?!\.)/,
        replace: (match: string) => {
          if (mdi[match]) {
            return mdi[match]
          } else {
            // eslint-disable-next-line no-console
            console.warn('[plugin-regexp] No matched svg icon for ' + match)

            return match
          }
        },
        sourcemap: false,
      }),
    ],
  },
  runtimeConfig: {
    api_url: `${process.env.NUXT_API_BASE_URL}/api`,
    session: {
      name: 'nuxt-session',
      password: '',
    },
    public: {
      maps_api_key: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
})
