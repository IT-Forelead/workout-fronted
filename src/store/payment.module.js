import PaymentService from '../services/payment.service';

export const paymentModule = {
  namespaced: true,
  actions: {
    get({ commit }) {
      return PaymentService.getPayments().then(
        payment => {
          return Promise.resolve(payment);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }

};