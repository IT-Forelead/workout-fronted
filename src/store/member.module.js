import MemberService from '../services/member.service';

export const memberModule = {
  namespaced: true,
  actions: {
    sendSMS({ commit }, contact) {
      return MemberService.getCode(contact).then(
        member => {
          return Promise.resolve(member);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    create({ commit }, memberData) {
      return MemberService.create(memberData).then(
        member => {
          return Promise.resolve(member);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  },

};