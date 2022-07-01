import axios from 'axios'
import authHeader from './auth-header.js'

const API_URL = 'http://localhost:9000'

class MemberService {
  getCode(data) {
    return axios.post(API_URL + '/validation/sent-code',{ "phone": data }, { headers: authHeader() }).then((response) => {
      return response.data
    })
  }
  create(data) {
    console.log(data);
    return axios.post(API_URL + '/validation/code',{ ...data }, { headers: authHeader() }).then((response) => {
      return response.data
    })
  }
}

export default new MemberService()
