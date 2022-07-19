import ArrivalService from '../services/arrival.service';

export const arrivalModule = {
  namespaced: true,
  actions: {
    get({ commit }) {
      return ArrivalService.getArrival().then(
        arrival => {
          return Promise.resolve(arrival);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }

};