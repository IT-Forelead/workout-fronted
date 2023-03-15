import UserService from '../services/user.service';

export const userModule = {
  namespaced: true,
  actions: {
    get({ commit }) {
      return UserService.getUser().then(
        user => {
          return Promise.resolve(user);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getTrainers({ commit }) {
      return UserService.getTrainers().then(
        trainer => {
          return Promise.resolve(trainer);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },

};