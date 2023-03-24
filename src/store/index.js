import { createStore } from 'vuex'
import { auth } from '../modules/auth.module'
import { memberModule } from '../modules/member.module'
import { clientModule } from '../modules/client.module'
import { messageModule } from '../modules/message.module'
import { paymentModule } from '../modules/payment.module'
import { servicesModule } from '../modules/services.module'
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
    servicesModule,
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
      trainers: [],
      services: [],
      serviceMembers: [],
      trainerServices: [],
      paymentsByMemberId: [],
      arrivalByMemberId: [],
      currentPage: '',
      isSidebarOpen: false,
      members: [],
      total: 0,
      selectedPayment: {},
      clients: [],
      isClientsEmpty: false,
      isActiveClientsEmpty: false
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
    setTrainers(state, data) {
      state.trainers = data
    },
    setServices(state, data) {
      state.services = data
    },
    setServiceMembers(state, data) {
      state.serviceMembers = data
    },
    setTrainerServices(state, data) {
      state.trainerServices = data
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
    setClientsEmpty(state, data) {
      state.isClientsEmpty = data
    },
    setActiveClientsEmpty(state, data) {
      state.isActiveClientsEmpty = data
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
