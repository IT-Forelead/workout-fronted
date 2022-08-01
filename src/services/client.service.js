import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = process.env.BASE_API_URL

class ClientService {
  async getCode(data) {
    const response = await axios.post(API_URL + '/message/public/sent-code', { phone: data })
    return response.data
  }

  async create(data) {
    const response = await axios.post(API_URL + '/auth/user', data, { headers: authHeader() })
    return response.data
  }

  async activateClient(data) {
    console.log(data)
    const response = await axios.post(API_URL + '/user/activate', { userId: data }, { headers: authHeader() })
    return response.data
  }
}

export default new ClientService()
