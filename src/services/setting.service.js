import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:9000'

class SettingService {

  updateSettings(data) {
    return axios.put(API_URL + '/user/settings', { ...data }, { headers: authHeader() }).then((response) => {
      return response.data
    })
  }

  getSettings() {
    return axios.get(API_URL + '/user/settings', { headers: authHeader() }).then((response) => {
      return response.data
    })
  }
}

export default new SettingService()
