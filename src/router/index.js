import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: { name: 'users' },
    meta: {
      requiresAuth: true,
      requiresVisitor: false
    },
    children: [
      {
        path: '/users',
        name: 'users',
        component: UsersView,
        meta: {
          requiresAuth: true,
          requiresVisitor: false,
        },
      }
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      requiresAuth: false,
      requiresVisitor: true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  }
  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (localStorage.getItem('access_token') == 'OK') {
      next({
        name: "home"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router
