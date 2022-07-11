import SettingService from '../services/setting.service';

export const settingModule = {
  namespaced: true,
  actions: {
    get({ commit }) {
      return SettingService.getSettings().then(
        message => {
          return Promise.resolve(message);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    
    update({ commit },settingData) {
      return SettingService.updateSettings(settingData).then(
        setting => {
          return Promise.resolve(setting);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  }

};