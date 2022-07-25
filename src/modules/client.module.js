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
    create({ commit }, clientData) {
      return ClientService.create(clientData).then(
        (client) => {
          return Promise.resolve(client)
        },
        (error) => {
          return Promise.reject(error)
        }
      )
    },
    activate({ commit }, id) {
      return ClientService.activateClient(id).then(
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
