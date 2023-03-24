import authHeader from './auth-header.js'
import AxiosService from './axios.service.js'

class ServicesService {
  async getServices() {
    return AxiosService.get('/payment/services', {headers: authHeader()})
  }
  async getTrainerServices() {
    return AxiosService.get('/payment/trainer-services', {headers: authHeader()})
  }
  async getServiceMembers(data) {
    return AxiosService.post('/payment/service-members', data, {headers: authHeader()})
  }
}

export default new ServicesService()
