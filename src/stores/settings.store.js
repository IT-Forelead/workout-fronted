import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settings: null,
    currentPage: null,
    isSidebarOpen: true
  }),
  actions: {
    setSetting(data) {
      this.settings = data
    },
    setSelectedPage(page) {
      this.currentPage = page
    },
    setSidebarStatus(status) {
      this.isSidebarOpen = status
    },
  },
})
