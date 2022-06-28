import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
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
    name: 'Kelishlar hisoboti',
    component: () => import('../components/pages/Arrival.vue'),
  },
  {
    path: '/settings',
    name: 'Sozlamalar',
    component: () => import('../components/pages/Settings.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/:pathMach(.*)*',
    name: 'NotFound',
    component: () => import('../components/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  if (authRequired && !loggedIn) {
    next('/login')
  } else if (to.path === '/login' && loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
