<template>
  <div class="fixed inset-0 top-0 left-0 right-0 w-full h-screen overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-gray-900">
    <div
      class="w-full p-1 mx-auto mb-20 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:relative md:w-3/4 lg:top-1/2 lg:left-1/2 lg:p-4">
      <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="p-5 border-b rounded-t dark:border-gray-600">
          <div class="flex justify-between">
            <router-link to="/login" class="flex items-center">
              <img src="../assets/images/logo.png" class="w-8 ml-2 shrink-0" alt="#" />
              <div class="ml-2 text-lg font-semibold text-gray-900 grow dark:text-gray-300">IT-Forelead</div>
            </router-link>
            <button @click="toggleDark()"
              class="relative inline-block p-2 rounded-full shadow bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-700">
              <MoonIcon v-if="!isDark" class="w-5 h-5 text-black dark:text-gray-500" />
              <SunIcon v-else class="w-5 h-5 text-black dark:text-gray-500" />
            </button>
          </div>
          <h3 class="mt-5 text-xl font-semibold text-center text-gray-900 uppercase dark:text-gray-300 md:mt-0">
            Ro'yhatdan o'tish</h3>
        </div>
        <div class="p-5">
          <div
            class="flex p-3 mb-3 border border-gray-300 rounded-lg justify-evenly dark:border-gray-600 md:grid md:grid-cols-3">
            <div class="flex items-center justify-between">
              <!-- in progress -->
              <div v-if="registerStatus.inProgress" class="flex items-center justify-between">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md dark:bg-gray-700">
                  01</div>
                <div class="hidden ml-3 font-semibold text-blue-500 text-md md:block">Ma'lumotlar</div>
              </div>
              <!-- completed -->
              <div v-if="registerStatus.done" class="flex items-center justify-between">
                <div class="flex items-center justify-center w-10 h-10 text-2xl text-white bg-blue-500 rounded-full">
                  <CheckIcon />
                </div>
                <div class="hidden ml-3 font-semibold text-gray-700 text-md md:block">Ma'lumotlar</div>
              </div>
              <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-25 h-9 dark:border-gray-600">
                </div>
                <div class="absolute border-r border-gray-300 rounded-lg rotate-25 -top-1 h-9 dark:border-gray-600">
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <!-- default -->
              <div v-if="checkingStatus.default" class="flex items-center">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-full text-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  02</div>
                <div class="hidden ml-3 font-semibold text-gray-500 text-md md:block">Tasdiqlash</div>
              </div>
              <!-- in progress -->
              <div v-if="checkingStatus.inProgress" class="flex items-center justify-between">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md dark:bg-gray-700">
                  02</div>
                <div class="hidden ml-3 font-semibold text-blue-500 text-md md:block">Tasdiqlash</div>
              </div>
              <!-- completed -->
              <div v-if="checkingStatus.done" class="flex items-center justify-between">
                <div class="flex items-center justify-center w-10 h-10 text-2xl text-white bg-blue-500 rounded-full">
                  <CheckIcon />
                </div>
                <div class="hidden ml-3 font-semibold text-gray-700 text-md md:block">Tasdiqlash</div>
              </div>
              <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-25 h-9 dark:border-gray-600">
                </div>
                <div class="absolute border-r border-gray-300 rounded-lg rotate-25 -top-1 h-9 dark:border-gray-600">
                </div>
              </div>
            </div>
            <!-- default -->
            <div v-if="congratulationStatus.default" class="flex items-center">
              <div
                class="flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-full text-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                03</div>
              <div class="hidden ml-3 font-semibold text-gray-500 text-md md:block">Yakunlash</div>
            </div>
            <!-- in progress -->
            <div v-if="congratulationStatus.inProgress" class="flex items-center">
              <div
                class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md dark:bg-gray-700">
                03</div>
              <div class="hidden ml-3 font-semibold text-blue-500 text-md md:block">Yakunlash</div>
            </div>
            <!-- completed-->
            <div v-if="congratulationStatus.done" class="flex items-center">
              <div class="flex items-center justify-center w-10 h-10 text-2xl text-white bg-blue-500 rounded-full">
                <CheckIcon />
              </div>
              <div class="hidden ml-3 font-semibold text-gray-700 text-md md:block">Yakunlash</div>
            </div>
          </div>
        </div>
        <form @submit.prevent="createClient()">
          <!-- Step 1 -->
          <div class="grid p-2 md:p-5 md:mb-6 md:gap-6 lg:grid-cols-2" v-if="registerClientProcess.registerMode">
            <div class="p-3">
              <label for="firstname" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Ism</label>
              <input type="text" v-model="client.firstname" id="firstname" name="firstname"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Ism kiriting" required />
            </div>
            <div class="p-3">
              <label for="last_name"
                class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Familiya</label>
              <input type="text" v-model="client.lastname" id="last_name" name="lastname"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Familiya kiriting" required />
            </div>
            <div class="p-3">
              <label for="gymname" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Fitnes klub
                nomi</label>
              <input type="text" v-model="client.gymName" id="gymname" name="gymname"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Fitnes klub nomini kiriting" required />
            </div>
            <div class="p-3">
              <label for="phone" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Telefon
                raqam</label>
              <Field type="text" v-model="client.phone" v-mask="'+###(##) ###-##-##'" id="phone" name="phone"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="+998(90) 123-45-67" required />
            </div>
            <div class="p-3">
              <label for="daily-price" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Kunlik
                to'lov</label>
              <div class="relative rounded-md">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span class="text-sm text-gray-500"> UZS </span>
                </div>
                <input type="number" v-model="client.dailyPrice" id="daily-price"
                  class="block w-full bg-gray-50 p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg pl-11 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="0.00" required />
              </div>
            </div>
            <div class="p-3">
              <label for="monthly-price" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Oylik
                to'lov</label>
              <div class="relative rounded-md">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span class="text-sm text-gray-500"> UZS </span>
                </div>
                <input type="number" v-model="client.monthlyPrice" name="monthlyPrice" id="monthly-price"
                  class="block w-full bg-gray-50 p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg pl-11 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="0.00" required />
              </div>
            </div>
            <div class="p-3">
              <label for="password"
                class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Parol</label>
              <div class="relative">
                <input v-model="client.password" id="password" :type="currentType"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Parolni kiriting" required />
                <div class="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-sm leading-5">
                  <EyeIcon @click="showPassword('password')" v-if="currentType === 'text'"
                    class="w-5 h-5 text-gray-400 cursor-pointer" />
                  <EyeSlashIcon @click="showPassword('text')" v-if="currentType === 'password'"
                    class="w-5 h-5 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
            <div class="p-3">
              <label for="reply-password"
                class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Parolni takrorlang</label>
              <div class="relative">
                <input v-model="client.confirmPassword" id="reply-password" :type="currentReplyPasswordType"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Parolni takrorlang" required />
                <div class="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-sm leading-5">
                  <EyeIcon @click="showReplyPassword('password')" v-if="currentReplyPasswordType === 'text'"
                    class="w-5 h-5 text-gray-400 cursor-pointer" />
                  <EyeSlashIcon @click="showReplyPassword('text')" v-if="currentReplyPasswordType === 'password'"
                    class="w-5 h-5 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          <!-- Step 2 -->
          <div class="flex justify-center" v-if="registerClientProcess.checkingMode">
            <div class="flex flex-col">
              <ConfirmCode class="mx-auto text-blue-500 text-9xl" />
              <p class="px-3 text-xl text-center text-gray-600 dark:text-gray-300">
                <strong class="text-black dark:text-gray-300">{{ client.phone }}</strong> telefon raqamiga tasdiqlash
                kodi SMS tarzida jo'natildi!
              </p>
              <div class="flex justify-center my-5">
                <input type="text" class="code dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300" maxlength="1"
                  v-model="confirm.first" @input="onlyNumber('first')" required />
                <input type="text" class="code dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300" maxlength="1"
                  v-model="confirm.second" @input="onlyNumber('second')" required />
                <input type="text" class="code dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300" maxlength="1"
                  v-model="confirm.third" @input="onlyNumber('third')" required />
                <input type="text" class="code dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300" maxlength="1"
                  v-model="confirm.fourth" @input="onlyNumber('fourth')" required />
              </div>
              <div v-if="showResendSMS" class="flex justify-center my-3 text-lg text-red-500 hover:underline"><a
                  href="#" @click="getClientData()">SMS xabarnoma kelmadimi?</a></div>
              <div v-else class="flex items-center justify-center my-3 text-xl text-red-600">
                <TimerIcon class="mr-2" />
                <span>{{ timer }}</span>
              </div>
            </div>
          </div>
          <div v-if="registerClientProcess.checkingMode"
            class="flex items-center justify-end p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <div>
              <button v-if="registerClientProcess.checkingMode && !showCheckBtn && !lastProgressBtn"
                class="px-4 py-2 font-medium text-white bg-green-500 rounded shadow-lg outline-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none"
                disabled>Tasdiqlash</button>
              <button v-if="showCheckBtn" type="submit"
                class="px-4 py-2 font-medium text-white transition-colors duration-200 bg-green-500 rounded shadow-lg outline-none hover:bg-green-600 focus:bg-green-500 focus:ring-green-500 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Tasdiqlash</button>
              <button v-if="lastProgressBtn"
                class="flex items-center px-4 py-2 font-medium text-white transition-colors duration-200 bg-green-400 rounded shadow-lg outline-none hover:bg-green-600 focus:bg-green-500 focus:ring-green-500 focus:ring-offset-2 active:shadow-none disabled:cursor-not-allowed disabled:bg-green-400/80 disabled:shadow-none"
                disabled>
                <SpinIcon />
                Tasdiqlash
              </button>
            </div>
          </div>
        </form>
        <!-- Step 3 -->
        <div class="flex justify-center" v-if="registerClientProcess.congratulationMode">
          <div class="flex flex-col">
            <SuccessfulIcon class="mx-auto text-green-500 text-9xl" />
            <p class="w-3/4 mx-auto my-5 text-xl text-center text-green-500">
              {{ lastMessage }}
            </p>
          </div>
        </div>
        <div v-if="!registerClientProcess.checkingMode"
          class="flex items-center justify-end p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <div>
            <button v-if="registerClientProcess.registerMode" @click="clearFields()"
              class="px-4 py-2 mr-2 font-medium text-white transition-colors duration-200 bg-teal-500 border border-teal-500 rounded outline-none hover:bg-teal-400 hover:text-white focus:ring-teal-600 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Tozalash</button>
            <button v-if="registerClientProcess.registerMode" @click="getClientData()"
              class="px-4 py-2 font-medium text-white transition-colors duration-200 bg-indigo-500 rounded shadow-lg outline-none hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Keyingi
              qadam</button>
            <button v-if="registerClientProcess.congratulationMode" @click="clearAndLogout()"
              class="px-4 py-2 font-medium text-white transition-colors duration-200 bg-indigo-500 rounded shadow-lg outline-none hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Yakunlash</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckIcon from '../assets/icons/CheckIcon.vue'
import SuccessfulIcon from '../assets/icons/SuccessfulIcon.vue'
import SpinIcon from '../assets/icons/SpinIcon.vue'
import ConfirmCode from '../assets/icons/ConfirmCode.vue'
import TimerIcon from '../assets/icons/TimerIcon.vue'
import BellIcon from "../assets/icons/BellIcon.vue";
import SunIcon from "../assets/icons/SunIcon.vue";
import MoonIcon from "../assets/icons/MoonIcon.vue";
import EyeIcon from '../assets/icons/EyeIcon.vue'
import EyeSlashIcon from '../assets/icons/EyeSlashIcon.vue'
import { ref, reactive } from 'vue'
import { Field } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const router = useRouter()

const store = useStore()

const registerClientProcess = reactive({
  registerMode: false,
  checkingMode: false,
  congratulationMode: false,
})

const registerStatus = reactive({
  inProgress: true,
  done: false,
})

const checkingStatus = reactive({
  default: true,
  inProgress: false,
  done: false,
})

const congratulationStatus = reactive({
  default: true,
  inProgress: false,
  done: false,
})

const client = reactive({
  firstname: '',
  lastname: '',
  gymName: '',
  phone: '',
  dailyPrice: '',
  monthlyPrice: '',
  password: '',
  confirmPassword: ''
})

const confirm = reactive({
  first: '',
  second: '',
  third: '',
  fourth: '',
})

// show/hide password
const currentType = ref('password')
const currentReplyPasswordType = ref('password')
const showPassword = (t) => (currentType.value = t)
const showReplyPassword = (t) => (currentReplyPasswordType.value = t)

function clearFields() {
  client.firstname = ''
  client.lastname = ''
  client.gymName = ''
  client.phone = ''
  client.dailyPrice = ''
  client.monthlyPrice = ''
  client.password = ''
  client.confirmPassword = ''
  confirm.first = ''
  confirm.second = ''
  confirm.third = ''
  confirm.fourth = ''
  confirmCode.value = ''
}

const confirmCode = ref('')
const showCheckBtn = ref(false)
const lastProgressBtn = ref(false)

registerClientProcess.registerMode = true

const clearAndLogout = () => {
  registerStatus.inProgress = true
  registerStatus.done = false
  checkingStatus.default = true
  checkingStatus.inProgress = false
  checkingStatus.done = false
  congratulationStatus.default = true
  congratulationStatus.done = false
  congratulationStatus.inProgress = false
  registerClientProcess.registerMode = true
  registerClientProcess.checkingMode = false
  registerClientProcess.congratulationMode = false
  showCheckBtn.value = false
  lastProgressBtn.value = false
  localStorage.setItem('time', '02:00')
  timer.value = '02:00'
  clearInterval(interval)
  clearFields()
  router.push('/login')
}


function onlyNumber(order) {
  confirm[order] = confirm[order].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  const codes = document.querySelectorAll('.code')
  codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
      if (idx >= 0 && idx < 3) {
        if (e.key >= 0 && e.key <= 9) {
          codes[idx].value = ''
          setTimeout(() => codes[idx + 1].focus(), 10)
        }
      }
      if (e.key === 'Backspace' && idx > 0 && idx <= 3) {
        codes[idx - 1].value = ''
        setTimeout(() => codes[idx - 1].focus(), 10)
      }
    })
  })
  if (confirm.first !== '' && confirm.second !== '' && confirm.third !== '' && confirm.fourth !== '') {
    confirmCode.value = confirm.first + confirm.second + confirm.third + confirm.fourth
    if (confirmCode.value.length === 4) {
      showCheckBtn.value = true
    }
  } else {
    showCheckBtn.value = false
  }
}

const timer = ref('02:00')
const showResendSMS = ref(false)

var interval

function startTimer() {
  clearInterval(interval)
  interval = setInterval(function () {
    let time = localStorage.getItem('time')
    time = time.split(':')
    let minutes = time[0]
    let seconds = time[1]
    seconds -= 1
    if (minutes < 0) return
    else if (seconds < 0 && minutes !== 0) {
      minutes -= 1
      seconds = 59
    } else if (seconds < 10 && length.seconds !== 2) seconds = '0' + seconds

    timer.value = minutes + ':' + seconds
    localStorage.setItem('time', timer.value)

    if (minutes === 0 && seconds === 0) clearInterval(interval)
    if (localStorage.getItem('time') === '-1:59') {
      clearInterval(interval)
      showResendSMS.value = true
    }
  }, 1000)
}

const getClientData = () => {
  if (client.firstname === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, ismni kiriting!',
      position: 'bottomLeft',
    })
  } else if (client.lastname === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, familiyani kiriting!',
      position: 'bottomLeft',
    })
  } else if (client.gymName === '') {
    notify.warning({
      title: 'Diqqat!',
      message: "Iltimos, fitnes klub nomini kiriting!",
      position: 'bottomLeft',
    })
  } else if (client.phone === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, telefon raqamni kiriting!',
      position: 'bottomLeft',
    })
  } else if (client.dailyPrice === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, kunlik narxni kiriting!',
      position: 'bottomLeft',
    })
  } else if (client.monthlyPrice === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, oylik narxni kiriting!',
      position: 'bottomLeft',
    })
  } else if (client.password === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, parolni kiriting!',
      position: 'bottomLeft',
    })
  } else if (client.confirmPassword === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, parolni takror kiriting!',
      position: 'bottomLeft',
    })
  } else if (client.confirmPassword !== client.password) {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, parollar mos kelmadi tekshirib qaytadan kiriting!',
      position: 'bottomLeft',
    })
  } else {
    client.phone = client.phone.replace(')', '').replace('(', '').replace(' ', '').replace(' ', '').replace('-', '').replace('-', '')
    store.dispatch('clientModule/sendSMS', client.phone).then(
      () => {
        notify.success({
          message: `${client.phone} raqamiga tasdiqlash kodi muvaffaqiyatli yaratildi!`,
          position: 'bottomLeft',
        })
      },
      () => {
        notify.error({
          message: `${client.phone} raqamiga tasdiqlash kodi yuborishda xatolik yuz berdi!`,
          position: 'bottomLeft',
        })
        showResendSMS.value = true
      }
    )
    localStorage.setItem('time', '02:00')
    startTimer()
    registerClientProcess.registerMode = false
    registerClientProcess.checkingMode = true
    registerStatus.inProgress = false
    registerStatus.done = true
    checkingStatus.default = false
    checkingStatus.inProgress = true
    showResendSMS.value = false
  }
}

const lastMessage = ref('')

const createClient = () => {
  const clientData = {
    firstname: client.firstname,
    lastname: client.lastname,
    gymName: client.gymName,
    dailyPrice: client.dailyPrice,
    monthlyPrice: client.monthlyPrice,
    phone: client.phone,
    code: confirmCode.value,
    password: client.password
  }
  store.dispatch('clientModule/create', clientData).then(
    () => {
      lastMessage.value = "Siz muvaffaqiyatli ro'yhatdan o'tdingiz! Ma'muriyatimiz profilingizni aktivlagandan so'ng, tizimdan foydalanishingiz mumkin. Aktivlash 5 daqiqadan 24 soatgacha vaqt ichida amalga oshiriladi."
      registerClientProcess.congratulationMode = true
      checkingStatus.inProgress = false
      checkingStatus.done = true
      congratulationStatus.default = false
      congratulationStatus.done = true
      registerClientProcess.checkingMode = false
      congratulationStatus.done = true
      localStorage.setItem('time', '02:00')
      clearInterval(interval)
    },
    (error) => {
      notify.warning({
        message: error.response.data,
        position: 'bottomLeft',
      })
      showCheckBtn.value = true
      lastProgressBtn.value = false
    }
  )
}
</script>

<style scoped>
.-rotate-25 {
  transform: rotate(-25deg);
}

.rotate-25 {
  transform: rotate(25deg);
}

.code {
  border-radius: 5px;
  font-size: 25px;
  height: 60px;
  width: 50px;
  margin: 1%;
  text-align: center;
  font-weight: 300;
}

.code:valid {
  border-color: #3498db;
}
</style>
