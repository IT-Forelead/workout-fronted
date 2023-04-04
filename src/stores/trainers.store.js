import { defineStore } from 'pinia'

export const useTrainersStore = defineStore('trainers', {
  state: () => ({
    trainers: [],
    trainerServices: []
  }),
  actions: {
    setTrainers(data) {
      this.trainers = data
    },
    setTrainerServices(data) {
      this.trainerServices = data
    },
  },
})
