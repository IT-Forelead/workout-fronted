import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../components/Login.vue'),
    meta: { layout: "empty" },
  },
  {
    path: '/dashboard',
    name: 'Asosiy sahifa',
    component: () => import('../components/pages/Main.vue'),
  },
  {
    path: '/members',
    name: 'A\'zolar',
    component: () => import('../components/pages/Membership.vue'),
  },
  {
    path: '/payments',
    name: 'To\'lovlar',
    component: () => import('../components/pages/Payments.vue'),
  },
  {
    path: '/arrival',
    name: 'Kelib-ketishlar',
    component: () => import('../components/pages/Arrival.vue'),
  },
  {
    path: '/Messages',
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
  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    next('/')
  } else if (to.path === '/' && loggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
