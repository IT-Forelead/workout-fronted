import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = process.env.BASE_API_URL

class SettingService {

  async updateSettings(data) {
    const response = await axios.put(API_URL + '/user/settings', { ...data }, { headers: authHeader() })
    return response.data
  }

  async getSettings() {
    const response = await axios.get(API_URL + '/user/settings', { headers: authHeader() })
    return response.data
  }
}

export default new SettingService()
