import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m);

const routes = [
  // { path: '/', name: 'index', component: page('index.vue') },
  {
    path: '/',
    name: 'movies.search',
    component: page('movies/search.vue')
  },
  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/register', name: 'register', component: page('auth/register.vue') },
  {
    path: '/verification/verify/:id',
    name: 'verify',
    component: page('auth/verification/verify.vue')
  },
  {
    path: '/verification/resend',
    name: 'verification.resend',
    component: page('auth/verification/resend.vue')
  },
  {
    path: '/password/email',
    name: 'password.email',
    component: page('auth/password/reset-email.vue')
  },
  {
    path: '/password/reset/:token',
    name: 'password.reset',
    component: page('auth/password/password-reset.vue')
  },

  {
    path: '/upload',
    name: 'movies.upload',
    component: page('user/movies/create.vue')
  },
  {
    path: '/movies/:id/edit',
    name: 'movies.edit',
    component: page('user/movies/edit.vue')
  },

  {
    path: '/settings',
    component: page('user/settings/index.vue'),
    children: [
      { path: '', redirect: { name: 'settings.dashboard' } },
      {
        path: 'movies',
        name: 'settings.movies',
        component: page('user/settings/movies.vue')
      }
    ]
  },

  {
    path: '/movies',
    name: 'movies.search',
    component: page('movies/search.vue')
  },
  {
    path: '/movie/:slug',
    name: 'movies.show',
    component: page('movies/show.vue')
  },
  {
    path: '/remote-movies',
    name: 'remote-movies',
    component: page('remote-movies/index.vue')
  },
  {
    path: '/remote-movies/:id/',
    name: 'remotemovieid',
    component: page('remote-movies/sub/_remotemovieid.vue')
  }
];

export function createRouter() {
  return new Router({
    routes,
    mode: 'history'
  });
}
