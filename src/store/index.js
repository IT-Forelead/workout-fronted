import { createStore } from 'vuex'
import { auth } from './auth.module'
import { memberModule } from './member.module'
import { userModule } from './user.module'

const store = createStore({
  modules: {
    auth,
    memberModule,
    userModule
  },
  state() {
    return {
      isLogin: false,
      user: {},
      currentPage: '',
      isSidebarOpen: false,
      membersWithTotal: {},
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
    },
    setMembersWithTotal(state, data) {
      state.membersWithTotal = data
    }
  },
})

export default store
