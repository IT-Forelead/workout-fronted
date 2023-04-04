import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [],
    serviceMembers: []
  }),
  actions: {
    setServices(data) {
      this.services = data
    },
    setServiceMembers(data) {
      this.serviceMembers = data
    },
  },
})
