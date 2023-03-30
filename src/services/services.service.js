import authHeader from '@/mixins/auth-header.js'
import AxiosService from './axios.service.js'

class ServicesService {
  async getServices() {
    return AxiosService.get('/payment/services', { headers: authHeader() })
  }
  async getTrainerServices() {
    return AxiosService.get('/payment/trainer-services', { headers: authHeader() })
  }
  async getServiceMembers() {
    return AxiosService.get('/payment/service-members', { headers: authHeader() })
  }
  async createServiceMembers(data) {
    return AxiosService.post('/payment/create-service-members', data, { headers: authHeader() })
  }
}

export default new ServicesService()
