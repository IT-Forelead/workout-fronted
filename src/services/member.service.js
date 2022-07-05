import axios from 'axios'
import authHeader from './auth-header.js'
import authHeaderForMultiPart from './auth-header-for-multipart.js'

const API_URL = 'http://localhost:9000'

class MemberService {
  getCode(data) {
    return axios.post(API_URL + '/validation/sent-code', { phone: data }, { headers: authHeader() }).then((response) => {
      return response.data
    })
  }
  create(data) {
    return axios.post(API_URL + '/validation/code', data, { headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': authHeaderForMultiPart()
    }
  }).then((response) => {
      return response.data
    })
  }
  getMembers(id, page) {
    if (page) {
      return axios.get(API_URL + '/member/' + `${id}` + `/${page}`, { headers: authHeader() }).then((response) => {
        return response.data
      })  
    } else {
      return axios.get(API_URL + '/member/' + `${id}` + '/1', { headers: authHeader() }).then((response) => {
        return response.data
      })
    }
  }
}

export default new MemberService()
