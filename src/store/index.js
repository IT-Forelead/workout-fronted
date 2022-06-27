import { createStore } from 'vuex'
import { auth } from './auth.module'
import { singleUser } from './user.module'

const store = createStore({
  modules: {
    auth,
    singleUser,
  },
  state() {
    return {
      isLogin: false,
      user: {},
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
    setSelectedPage(state, page) {
      state.currentPage = page
    },
    setSidebarStatus(state, status) {
      state.isSidebarOpen = status
    }
  },
})

export default store
