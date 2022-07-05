import { createStore } from 'vuex'
import { auth } from './auth.module'
import { memberModule } from './member.module'
import { messageModule } from './message.module'
import { paymentModule } from './payment.module'

const store = createStore({
  modules: {
    auth,
    memberModule,
    messageModule,
    paymentModule
  },
  state() {
    return {
      isLogin: false,
      user: {},
      messages: [],
      payments: [],
      currentPage: '',
      isSidebarOpen: false
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
    }
  },
})

export default store
