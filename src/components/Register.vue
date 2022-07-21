<template>
  <div class="fixed inset-0 top-0 left-0 right-0 w-full h-screen overflow-x-hidden overflow-y-auto">
    <div class="w-full p-1 mb-20 md:-translate-x-1/2 md:-translate-y-1/2 md:relative md:w-3/4 md:top-1/2 md:left-1/2 md:mt-0 md:p-4">
      <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="p-5 border-b rounded-t dark:border-gray-600">
          <div class="flex justify-between">
            <router-link to="/login" class="flex items-center">
              <img src="../assets/images/logo.png" class="w-8 ml-2 shrink-0" alt="#" />
              <div class="ml-2 text-lg font-semibold text-gray-900 grow dark:text-gray-300">IT-Forelead</div>
            </router-link>
            <button @click="toggleDark()"
              class="relative inline-block p-2 rounded-full shadow bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-700">
              <MoonIcon v-show="!isDark" class="w-5 h-5 text-black dark:text-gray-500" />
              <SunIcon v-show="isDark" class="w-5 h-5 text-black dark:text-gray-500" />
            </button>
          </div>
          <h3 class="mt-5 text-xl font-semibold text-center text-gray-900 uppercase dark:text-gray-300 md:mt-0">
            Ro'yhatdan o'tish</h3>
        </div>
        <div class="p-2 md:p-5">
          <div
            class="flex p-3 mb-3 border border-gray-300 rounded-lg justify-evenly dark:border-gray-600 md:grid md:grid-cols-3">
            <div class="flex items-center justify-between">
              <!-- completed -->
              <div class="flex items-center justify-between">
                <div class="flex items-center justify-center w-10 h-10 text-2xl text-white bg-blue-500 rounded-full">
                  <CheckIcon />
                </div>
                <div class="hidden ml-3 font-semibold text-gray-500 text-md md:block">Ma'lumotlar</div>
              </div>
              <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-25 h-9 dark:border-gray-600">
                </div>
                <div class="absolute border-r border-gray-300 rounded-lg rotate-25 -top-1 h-9 dark:border-gray-600">
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <!-- in progress -->
              <div class="flex items-center justify-between">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md dark:bg-gray-700">
                  02</div>
                <div class="hidden ml-3 font-semibold text-gray-500 text-md md:block">Tasdiqlash</div>
              </div>
              <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-25 h-9 dark:border-gray-600">
                </div>
                <div class="absolute border-r border-gray-300 rounded-lg rotate-25 -top-1 h-9 dark:border-gray-600">
                </div>
              </div>
            </div>
            <!-- default -->
            <div class="flex items-center">
              <div
                class="flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-full text-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                03</div>
              <div class="hidden ml-3 font-semibold text-gray-500 text-md md:block">Yakunlash</div>
            </div>
          </div>
        </div>
        <form method="post" enctype="multipart/form-data">
          <!-- Step 1 -->
          <div class="grid p-2 md:p-5 md:mb-6 md:gap-6 lg:grid-cols-2">
            <div class="p-3">
              <label for="firstname" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Ism</label>
              <input type="text" id="firstname" name="firstname"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Ism kiriting" required />
            </div>
            <div class="p-3">
              <label for="last_name"
                class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Familiya</label>
              <input type="text" id="last_name" name="lastname"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Familiya kiriting" required />
            </div>
            <div class="p-3">
              <label for="birthday" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Fitnes klub
                nomi</label>
              <input type="text" id="birthday" name="birthday"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Fitnes klub nomini kiriting" required />
            </div>
            <div class="p-3">
              <label for="phone" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Telefon
                raqam</label>
              <input type="text" v-mask="'+###(##) ###-##-##'" id="phone"
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
                <input type="text" id="daily-price"
                  class="block w-full pr-12 bg-gray-50 p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg pl-11 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                <input type="text" id="monthly-price"
                  class="block w-full pr-12 bg-gray-50 p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg pl-11 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="0.00" required />
              </div>
            </div>
            <div class="p-3">
              <label for="password"
                class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Parol</label>
              <input type="password" id="password"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Parolni kiriting" required />
            </div>
            <div class="p-3">
              <label for="reply-password"
                class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Parolni takrorlang</label>
              <input type="password" id="reply-password"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Parolni takrorlang" required />
            </div>
          </div>
        </form>
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
import LoginIcon from '../assets/icons/LoginIcon.vue'
import BellIcon from "../assets/icons/BellIcon.vue";
import SunIcon from "../assets/icons/SunIcon.vue";
import MoonIcon from "../assets/icons/MoonIcon.vue";
import { ref } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const router = useRouter()

const store = useStore()

const phone = ref('')
const password = ref('')

const schema = yup.object().shape({
  phone: yup.string().required('Iltimos. Telefon raqamini kitiring!'),
  password: yup.string().required('Iltimos. Parolni kitiring!'),
})

const onSubmit = (user) => {
  user.phone = user.phone.replace(')', '').replace('(', '').replace(' ', '').replace('-', '').replace('-', '')
  store.dispatch('auth/register', user).then(
    () => {
      router.push('/login')
    },
    (error) => {
      notify.error({
        message: "Telefon raqami yoki parol noto'g'ri!",
        position: 'topRight',
      })
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
