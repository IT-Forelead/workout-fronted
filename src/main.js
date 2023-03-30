import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './index.css'
import './script.js'
import 'flowbite'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { VueMaskDirective } from 'v-mask'
import VOtpInput from 'vue3-otp-input'
import money from "v-money3";
import DashboardLayout from './components/layout/DashboardLayout.vue'
import LoginLayout from './components/layout/LoginLayout.vue'
import RegisterLayout from './components/layout/RegisterLayout.vue'
import { createPinia } from 'pinia'

const vMaskV2 = VueMaskDirective
const vMaskV3 = {
  beforeMount: vMaskV2.bind,
  updated: vMaskV2.componentUpdated,
  unmounted: vMaskV2.unbind,
}

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(store)
app.use(money)
app.directive('mask', vMaskV3)
app.component('dashboard-layout', DashboardLayout)
app.component('login-layout', LoginLayout)
app.component('register-layout', RegisterLayout)
app.component('infinite-loading', InfiniteLoading)
app.component('v-otp-input', VOtpInput)
app.mount('#web-app')
