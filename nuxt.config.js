export default {
  ssr: false,
  target: "server",
  head: {
    title: "Ad Board",
    htmlAttrs: {
      lang: "ru"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  css: ["ant-design-vue/dist/antd.css", "~assets/css/main.css"],
  plugins: ["@/plugins/antd-ui"],
  components: true,
  buildModules: ["@nuxtjs/eslint-module"],
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next", "@nuxtjs/proxy"],
  axios: {
    baseURL: "/api"
  },
  proxy: {
    "/api": "http://127.0.0.1:8000"
  },
  router: {
    middleware: ["auth"]
  },
  auth: {
    strategies: {
      local: {
        user: {
          property: ""
        },
        token: {
          property: "token",
          type: "Bearer"
        },
        endpoints: {
          login: { url: "/login", method: "post" },
          logout: { url: "/logout", method: "post" },
          user: { url: "/user", method: "get" }
        }
      }
    },
    redirect: {
      login: "/login",
      logout: "/login",
      home: "/"
    }
  },
  build: {}
}
