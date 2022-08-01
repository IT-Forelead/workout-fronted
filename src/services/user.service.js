import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = process.env.BASE_API_URL

class UserService {
  async getUser() {
    const response = await axios.get(API_URL + '/user', { headers: authHeader() })
    return response.data
  }
}

export default new UserService()
