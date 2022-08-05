import axios from 'axios'
import authHeader from './auth-header.js'
import AxiosService from './axios.service'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE;

class SettingService {

    async updateSettings(data) {
        const response = await axios.put(API_URL + '/user/settings', {...data}, {headers: authHeader()})
        return response.data
    }

    async getSettings() {
        return AxiosService.get('/user/settings', {headers: authHeader()})
    }
}

export default new SettingService()
