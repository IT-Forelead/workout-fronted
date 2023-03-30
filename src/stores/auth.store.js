import { defineStore } from 'pinia'

export const useProductStore = defineStore('auth', {
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
