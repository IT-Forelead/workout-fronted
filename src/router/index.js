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
    beforeEnter: navidagtionGuard('client'),
  },
  {
    path: '/members',
    name: "A'zolar",
    component: () => import('../components/pages/Membership.vue'),
    beforeEnter: navidagtionGuard('client'),
  },
  {
    path: '/payments',
    name: "To'lovlar",
    component: () => import('../components/pages/Payments.vue'),
    beforeEnter: navidagtionGuard('client'),
  },
  {
    path: '/arrival',
    name: 'Kelib-ketishlar',
    component: () => import('../components/pages/Arrival.vue'),
    beforeEnter: navidagtionGuard('client'),
  },
  {
    path: '/messages',
    name: 'SMS xabarlar',
    component: () => import('../components/pages/Messages.vue'),
    beforeEnter: navidagtionGuard('client'),
  },
  {
    path: '/settings',
    name: 'Sozlamalar',
    component: () => import('../components/pages/Settings.vue'),
    beforeEnter: navidagtionGuard('client'),
  },
  {
    path: '/profile',
    name: 'Profil',
    component: () => import('../components/pages/Profile.vue'),
    beforeEnter: navidagtionGuard('client'),
  },
  // Admin routes
  {
    path: '/admin-dashboard',
    name: 'Admin Dashboard',
    component: () => import('../components/pages/admin/AdminHome.vue'),
    beforeEnter: navidagtionGuard('admin'),
  },
  {
    path: '/unverified-clients',
    name: 'UnverifiedClients',
    component: () => import('../components/pages/admin/UnverifiedClients.vue'),
    beforeEnter: navidagtionGuard('admin'),
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('../components/pages/admin/Clients.vue'),
    beforeEnter: navidagtionGuard('admin'),
  },
  {
    path: '/admin-profile',
    name: 'Admin Profil',
    component: () => import('../components/pages/Profile.vue'),
    beforeEnter: navidagtionGuard('admin'),
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
  } else {
    next()
  }
})

function navidagtionGuard(role) {
  return () => {
    return localStorage.getItem('role') === role
  }
}

export default router
