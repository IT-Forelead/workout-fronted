import axios from 'axios'
import authHeader from './auth-header.js'
import authHeaderForMultiPart from './auth-header-for-multipart.js'

const API_URL = 'http://localhost:9000'

class MemberService {
    getCode(data) {
        return axios.post(API_URL + '/member/sent-code', {phone: data}, {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    create(data) {
        return axios.put(API_URL + '/member', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': authHeaderForMultiPart()
            }
        }).then((response) => {
            return response.data
        })
    }

    getMembers() {
        return axios.get(API_URL + '/member', {headers: authHeader()}).then((response) => {
            return response.data
        })
    }
}

export default new MemberService()
