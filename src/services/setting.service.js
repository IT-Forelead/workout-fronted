import authHeader from './auth-header.js'
import AxiosService from './axios.service'

class SettingService {

    async updateSettings(data) {
        return AxiosService.put('/user/settings', {...data}, {headers: authHeader()})
    }

    async getSettings() {
        return AxiosService.get('/user/settings', {headers: authHeader()})
    }
}

export default new SettingService()
