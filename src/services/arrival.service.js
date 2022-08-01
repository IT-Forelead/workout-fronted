import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = process.env.BASE_API_URL

class ArrivalService {
  async getArrival() {
    const response = await axios.get(API_URL + 'arrival', { headers: authHeader() })
    return response.data
  }
}

export default new ArrivalService()
