export default defineNuxtConfig({
  ssr: true,

  nitro: {
    compressPublicAssets: true,
    prerender: { ignore: ["/200.html"] },
  },

  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: { output: { inlineDynamicImports: true } },
    },
  },

  app: {
    head: {
      title: "Tina Blog",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "Tina Blog" },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],

  css: ["@/assets/css/base.postcss"],

  content: {
    experimental: { sqliteConnector: "native" },
  },
})
