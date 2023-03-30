import AxiosService from './axios.service'

class AuthService {
  async login(user) {
    const response = await AxiosService.post('/auth/login', {
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
