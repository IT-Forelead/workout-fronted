import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    setLoginStatus(jwt) {
      if (jwt) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    },
  },
})
