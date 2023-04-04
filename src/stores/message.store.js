import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [],
  }),
  actions: {
    setMessages(data) {
      this.messages = data
    },
  },
})
