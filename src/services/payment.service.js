import authHeader from './auth-header.js'
import AxiosService from './axios.service.js'

class PaymentService {
  async getPayments() {
    return AxiosService.get('/payment', {headers: authHeader()})
  }
  async createPayment(data) {
    return AxiosService.post('/payment', data, {headers: authHeader()})
  }
  async getServiceMembers(data) {
    return AxiosService.post('/payment/service-members', data, {headers: authHeader()})
  }
}

export default new PaymentService()
