import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
    meta: { layout: 'login' },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'),
    meta: { layout: 'register' },
  },
  {
    path: '/dashboard',
    name: 'Asosiy sahifa',
    component: () => import('../components/pages/Main.vue'),
  },
  {
    path: '/members',
    name: "A'zolar",
    component: () => import('../components/pages/Membership.vue'),
  },
  {
    path: '/payments',
    name: "To'lovlar",
    component: () => import('../components/pages/Payments.vue'),
  },
  {
    path: '/arrival',
    name: 'Kelib-ketishlar',
    component: () => import('../components/pages/Arrival.vue'),
  },
  {
    path: '/messages',
    name: 'SMS xabarlar',
    component: () => import('../components/pages/Messages.vue'),
  },
  {
    path: '/settings',
    name: 'Sozlamalar',
    component: () => import('../components/pages/Settings.vue'),
  },
  {
    path: '/profile',
    name: 'Profil',
    component: () => import('../components/pages/Profile.vue'),
  },
  {
    path: '/:pathMach(.*)*',
    name: 'NotFound',
    component: () => import('../components/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('token')
  if ((authRequired && !loggedIn) || (to.path === '/' && !loggedIn)) {
    next('/login')
  } else if (to.path === '/' && loggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
