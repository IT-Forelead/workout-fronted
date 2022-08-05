import axios from 'axios'
import authHeader from './auth-header.js'
import authHeaderForMultiPart from './auth-header-for-multipart.js'
import AxiosService from './axios.service.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE;

class MemberService {
    async getCode(data) {
        const response = await axios.post(API_URL + '/message/sent-code', {phone: data}, {headers: authHeader()})
        return response.data
    }

    async create(data) {
        return AxiosService.put('/member', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': authHeaderForMultiPart()
            }
        })
    }

    async getMembers() {
        return AxiosService.get('/member', {headers: authHeader()})
    }

    async getPaymentsByMemberId(data) {
        return AxiosService.post('/payment/member', {memberId: data}, {headers: authHeader()})
    }

    async getArrivalByMemberId(data) {
        const response = await axios.post(API_URL + '/arrival/member', {memberId: data}, {headers: authHeader()})
        return response.data
    }
}

export default new MemberService()
