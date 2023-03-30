import authHeader from '@/mixins/auth-header.js'
import AxiosService from './axios.service.js'

class MessageService {
  async getMessages() {
    return AxiosService.get('/message', {headers: authHeader()})
  }
}

export default new MessageService()
