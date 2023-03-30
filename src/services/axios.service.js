import axios from 'axios'
import refreshToken from '../mixins/refresh-token'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
class AxiosService {
  async post(url, data, config) {
    const response = await axios.post(url, data, config)
    refreshToken(response)
    return response.data
  }

  async put(url, data, config) {
    const response = await axios.put(url, data, config)
    refreshToken(response)
    return response.data
  }

  async get(url, config) {
    const response = await axios.get(url, config)
    refreshToken(response)
    return response.data
  }
}

export default new AxiosService()
