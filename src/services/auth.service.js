import axios from 'axios'
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE;
class AuthService {
  async login(user) {
    const response = await axios
      .post(API_URL + '/auth/login', {
        phone: user.phone,
        password: user.password,
      })
    if (response.data) {
      localStorage.setItem('token', JSON.stringify(response.data))
    }
    return response.data
  }
  logout() {
    localStorage.removeItem('time')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }
}

export default new AuthService()