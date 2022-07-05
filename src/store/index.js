import { createStore } from 'vuex'
import { auth } from './auth.module'
import { memberModule } from './member.module'
import { messageModule } from './message.module'
import { paymentModule } from './payment.module'
import { userModule } from './user.module'

const store = createStore({
  modules: {
    auth,
    memberModule,
    messageModule,
    paymentModule,
    userModule
  },
  state() {
    return {
      isLogin: false,
      user: {},
      messages: [],
      payments: [],
      currentPage: '',
      isSidebarOpen: false,
      members: [],
      total: 0,
    }
  },
  mutations: {
    setLogin(state, payload) {
      state.isLogin = payload
    },
    setUser(state, data) {
      state.user = data
    },
    setMessage(state, data) {
      state.messages = data
    },
    setPayment(state, data) {
      state.payments = data
    },
    setSelectedPage(state, page) {
      state.currentPage = page
    },
    setSidebarStatus(state, status) {
      state.isSidebarOpen = status
    },
    setMembers(state, data) {
      state.members = data
    },
    setTotal(state, data) {
      state.total = data
    }
  },
})

export default store
