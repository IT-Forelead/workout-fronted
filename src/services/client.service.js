import authHeader from './auth-header.js'
import AxiosService from './axios.service.js'

class ClientService {
  async getCode(data) {
    return AxiosService.post('/message/public/sent-code', {phone: data})
  }

  async create(data) {
    return AxiosService.post('/auth/user', data, {headers: authHeader()})
  }

  async activateClient(data) {
    return AxiosService.post('/user/activate', {userId: data}, {headers: authHeader()})
  }
}

export default new ClientService()
