import { defineStore } from 'pinia'

export const useProductStore = defineStore('message', {
  state: () => ({
    messages: [],
  }),
  actions: {
    setMessages(data) {
      this.messages = data
    },
  },
})
