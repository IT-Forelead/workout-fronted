import authHeader from '../mixins/auth-header.js'
import AxiosService from './axios.service.js'

class ClientService {
  async getCode(data) {
    return AxiosService.post('/message/public/sent-code', { phone: data })
  }

  async getLink(data) {
    return AxiosService.post('/message/reset-password', { phone: data })
  }

  async resetPasswordClient(data) {
    return AxiosService.post('/auth/reset-password/' + data.link, { password: data.password }, { headers: authHeader() })
  }

  async create(data) {
    return AxiosService.post('/auth/user', data, { headers: authHeader() })
  }

  async activateClient(data) {
    return AxiosService.post('/user/activate', { userId: data }, { headers: authHeader() })
  }
}

export default new ClientService()
