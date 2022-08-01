import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = process.env.BASE_API_URL

class MessageService {
  async getMessages() {
    const response = await axios.get(API_URL + 'message', { headers: authHeader() })
    return response.data
  }
}

export default new MessageService()
