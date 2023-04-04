import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isOpenResetPasswordModal: false,
  }),
  actions: {
    openResetPasswordModal() {
      this.isOpenResetPasswordModal = true
    },
    closeResetPasswordModal() {
      this.isOpenResetPasswordModal = true
    },
  },
})
