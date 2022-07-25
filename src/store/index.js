import { createStore } from 'vuex'
import { auth } from '../modules/auth.module'
import { memberModule } from '../modules/member.module'
import { clientModule } from '../modules/client.module'
import { messageModule } from '../modules/message.module'
import { paymentModule } from '../modules/payment.module'
import { arrivalModule } from '../modules/arrival.module'
import { settingModule } from '../modules/setting.module'
import { userModule } from '../modules/user.module'

const store = createStore({
  modules: {
    auth,
    memberModule,
    clientModule,
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
      selectedPayment: {},
      clients: []
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
    setClients(state, data) {
      if (data === 'clear'){
        state.clients = []
      } else {
        state.clients.push(...data)
      }
    },
    setSelectedPayment(state, payment) {
      state.selectedPayment = payment
    }
  },
})

export default store
