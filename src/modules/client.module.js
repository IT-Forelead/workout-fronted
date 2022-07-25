import ClientService from '../services/client.service'

export const clientModule = {
  namespaced: true,
  actions: {
    sendSMS({ commit }, contact) {
      return ClientService.getCode(contact).then(
        (client) => {
          return Promise.resolve(client)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    create({ commit }, ClientData) {
      return ClientService.create(ClientData).then(
        (client) => {
          return Promise.resolve(client)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
  },
}
