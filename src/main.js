import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './index.css'
import './script.js'
import 'flowbite'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import {VueMaskDirective} from 'v-mask';
import DashboardLayout from './components/layout/DashboardLayout.vue';
import LoginLayout from './components/layout/LoginLayout.vue';
import RegisterLayout from './components/layout/RegisterLayout.vue';

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
};

const app = createApp(App)
app.use(router)
app.use(store)
app.directive('mask', vMaskV3)
app.component('default-layout', DashboardLayout);
app.component('login-layout', LoginLayout);
app.component('register-layout', RegisterLayout);
app.component("infinite-loading", InfiniteLoading);
app.mount('#app')
