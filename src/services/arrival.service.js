import authHeader from '../mixins/auth-header.js'
import AxiosService from './axios.service.js'

class ArrivalService {
  async getArrivals() {
    return AxiosService.get('/arrival', { headers: authHeader() })
  }
}

export default new ArrivalService()
