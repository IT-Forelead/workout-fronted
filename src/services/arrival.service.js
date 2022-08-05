import authHeader from './auth-header.js'
import AxiosService from './axios.service.js'

class ArrivalService {
  async getArrival() {
    return AxiosService.get('/arrival', {headers: authHeader()})
  }
}

export default new ArrivalService()
