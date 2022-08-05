import authHeader from './auth-header.js'
import AxiosService from './axios.service.js'

class UserService {
  async getUser() {
    return AxiosService.get('/user', {headers: authHeader()})
  }
}

export default new UserService()
