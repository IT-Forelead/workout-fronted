import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE;

class PaymentService {
  async getPayments() {
    const response = await axios.get(API_URL + 'payment', { headers: authHeader() })
    return response.data
  }
  async createPayment(data) {
    const response = await axios.post(API_URL + 'payment', data, { headers: authHeader() })
    return response.data
  }
}

export default new PaymentService()
