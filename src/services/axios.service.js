import axios from 'axios'
import refreshToken from "./refresh-token";

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE;

class AxiosService {

    async post(url, data, config) {
        const response = await axios.post(API_URL + url, data, config)
        refreshToken(response)
        return response.data
    }

    async put(url, data, config) {
        const response = await axios.put(API_URL + url, data, config)
        refreshToken(response)
        return response.data
    }

    async get(url, config) {
        const response = await axios.get(API_URL + url, config)
        refreshToken(response)
        return response.data
    }
}

export default new AxiosService()