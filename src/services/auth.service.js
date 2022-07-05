import axios from 'axios'
const API_URL = 'http://localhost:9000'
class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/auth/login', {
        phone: user.phone,
        password: user.password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }
  logout() {
    localStorage.removeItem('_id')
    localStorage.removeItem('time')
    localStorage.removeItem('user')
  }
}

export default new AuthService()