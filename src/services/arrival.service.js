import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:9000/'

class ArrivalService {
  getArrival() {
    return axios.get(API_URL + 'arrival', { headers: authHeader() }).then((response) => {
      return response.data
    })
  }
}

export default new ArrivalService()
