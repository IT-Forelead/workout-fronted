import ServicesService from '../services/services.service'

export const servicesModule = {
  namespaced: true,
  actions: {
    getServices({ commit }) {
      return ServicesService.getServices().then(
        (service) => {
          return Promise.resolve(service)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getTrainerServices({ commit }) {
      return ServicesService.getTrainerServices().then(
        (service) => {
          return Promise.resolve(service)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    getServiceMembers({ commit }) {
      return ServicesService.getServiceMembers().then(
        (payment) => {
          return Promise.resolve(payment)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
  },
}
