import { env } from 'node:process';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    databaseFilePath: env.DATABASE_PATH
  }
})
