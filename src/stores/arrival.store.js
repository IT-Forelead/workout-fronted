import { defineStore } from 'pinia'

export const useArrivalStore = defineStore('arrival', {
  state: () => ({
    arrivals: [],
    arrivalByMemberId: ''
  }),
  actions: {
    setArrival(data) {
      this.arrivals = data
    },
    setArrivalByMemberId(data) {
      this.arrivalByMemberId = data
    },
  },
})
