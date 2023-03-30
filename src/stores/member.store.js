import { defineStore } from 'pinia'

export const useProductStore = defineStore('member', {
  state: () => ({
    members: [],
  }),
  actions: {
    setMembers(data) {
      this.members = data
    },
  },
})
