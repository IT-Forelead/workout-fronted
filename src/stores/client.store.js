import { defineStore } from 'pinia'

export const useProductStore = defineStore('client', {
  state: () => ({
    total: 0,
    isClientsEmpty: null,
    isActiveClientsEmpty: null,
    clients: []
  }),
  actions: {
    setTotal(data) {
      this.total = data
    },    
    setClientsEmpty(data) {
      this.isClientsEmpty = data
    },
    setActiveClientsEmpty(data) {
      this.isActiveClientsEmpty = data
    },
    setClients(data) {
      if (data === 'clear'){
        this.clients = []
      } else {
        this.clients.push(...data)
      }
    },
  },
})
