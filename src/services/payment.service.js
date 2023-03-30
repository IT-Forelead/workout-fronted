import authHeader from '@/mixins/auth-header.js'
import AxiosService from './axios.service.js'

class PaymentService {
  async getPayments() {
    return AxiosService.get('/payment', { headers: authHeader() })
  }
  async createPayment(data) {
    return AxiosService.post('/payment', data, { headers: authHeader() })
  }
}

export default new PaymentService()
