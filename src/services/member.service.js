import authHeader from '@/mixins/auth-header.js'
import authHeaderForMultiPart from '@/mixins/auth-header-for-multipart.js'
import AxiosService from './axios.service.js'

class MemberService {
  async getCode(data) {
    return AxiosService.post('/message/sent-code', { phone: data }, { headers: authHeader() })
  }

  async create(data) {
    return AxiosService.put('/member', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: authHeaderForMultiPart(),
      },
    })
  }

  async getMembers() {
    return AxiosService.get('/member', { headers: authHeader() })
  }

  async getPaymentsByMemberId(data) {
    return AxiosService.post('/payment/member', { memberId: data }, { headers: authHeader() })
  }

  async getArrivalByMemberId(data) {
    return AxiosService.post('/arrival/member', { memberId: data }, { headers: authHeader() })
  }
}

export default new MemberService()
