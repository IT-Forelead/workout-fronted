import { defineStore } from 'pinia'

export const useProductStore = defineStore('payment', {
  state: () => ({
    payments: [],
    paymentsByMemberId: '',
    selectedPayment: null
  }),
  actions: {
    setPayment(data) {
      this.payments = data
    },
    setPaymentsByMemberId(data) {
      this.paymentsByMemberId = data
    },
    setSelectedPayment(payment) {
      this.selectedPayment = payment
    }
  },
})
