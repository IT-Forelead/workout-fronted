import { createStore } from 'vuex'
import { auth } from './auth.module'
import { memberModule } from './member.module'
import { messageModule } from './message.module'
import { paymentModule } from './payment.module'
import { arrivalModule } from './arrival.module'
import { settingModule } from './setting.module'
import { userModule } from './user.module'

const store = createStore({
  modules: {
    auth,
    memberModule,
    messageModule,
    paymentModule,
    arrivalModule,
    settingModule,
    userModule
  },
  state() {
    return {
      user: {},
      messages: [],
      payments: [],
      arrivals: [],
      settings: [],
      paymentsByMemberId: [],
      arrivalByMemberId: [],
      currentPage: '',
      isSidebarOpen: false,
      members: [],
      total: 0,
      selectedPayment: {}
    }
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    setMessage(state, data) {
      state.messages = data
    },
    setPayment(state, data) {
      state.payments = data
    },
    setArrival(state, data) {
      state.arrivals = data
    },
    setSetting(state, data) {
      state.settings = data
    },
    setPaymentsByMemberId(state, data) {
      state.paymentsByMemberId = data
    },
    setArrivalByMemberId(state, data) {
      state.arrivalByMemberId = data
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
    },
    setSelectedPayment(state, payment) {
      state.selectedPayment = payment
    }
  },
})

export default store
