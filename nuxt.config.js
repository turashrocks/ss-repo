require('dotenv').config();
export default {
  mode: 'universal',
  svg: {
    vueSvgLoader: {
        // vue-svg-loader options
    },
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'MovieHouse',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.bundle.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js'
      }
    ]
  },
  components: true,
  loading: { color: '#fff' },
  css: [
    '@/assets/css/style.css',
    '@/assets/scss/main.scss'
  ],

  plugins: [
    '~plugins/vform',
    '~components/_global'
  ],
  buildModules: [
    '@nuxtjs/router',
    '@nuxtjs/color-mode'
  ],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    "@nuxtjs/svg"
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/me', method: 'get', propertyName: 'data' }
        }
        // tokenRequired: true,
        // tokenType: 'bearer'
      }
    }
  },

  axios: {
    baseURL: process.env.API_URL
  },

  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },

    html: {
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }
  }
};
