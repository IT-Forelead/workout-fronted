import { defineStore } from 'pinia'

export const useProductStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(data) {
      this.user = data
    },
  },
})
