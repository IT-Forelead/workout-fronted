import axios from 'axios'
import authHeader from './auth-header.js'
import authHeaderForMultiPart from './auth-header-for-multipart.js'

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE;
class MemberService {
    async getCode(data) {
        const response = await axios.post(API_URL + '/message/sent-code', { phone: data }, { headers: authHeader() })
        return response.data
    }

    async create(data) {
        const response = await axios.put(API_URL + '/member', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': authHeaderForMultiPart()
            }
        })
        return response.data
    }

    async getMembers() {
        const response = await axios.get(API_URL + '/member', { headers: authHeader() })
        return response.data
    }

    async getPaymentsByMemberId(data) {
        const response = await axios.post(API_URL + '/payment/member', { memberId: data }, { headers: authHeader() })
        return response.data
    } 

    async getArrivalByMemberId(data) {
        const response = await axios.post(API_URL + '/arrival/member', { memberId: data }, { headers: authHeader() })
        return response.data
    }
}

export default new MemberService()
