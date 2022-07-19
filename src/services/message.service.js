import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:9000/'

class MessageService {
  async getMessages() {
    const response = await axios.get(API_URL + 'message', { headers: authHeader() })
    return response.data
  }
}

export default new MessageService()
