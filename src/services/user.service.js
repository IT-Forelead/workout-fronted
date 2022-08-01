import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE;

class UserService {
  async getUser() {
    const response = await axios.get(API_URL + '/user', { headers: authHeader() })
    return response.data
  }
}

export default new UserService()
