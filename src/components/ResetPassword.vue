<template>
  <div class="fixed inset-0 top-0 left-0 right-0 w-full h-screen overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-gray-900">
    <div class="mb-20 lg:mx-0 -translate-x-1/2 -translate-y-1/2 relative md:w-1/3 top-1/2 left-1/2 lg:p-4">
      <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="p-5 border-b rounded-t dark:border-gray-600">
          <div class="flex justify-between">
            <router-link to="/login" class="flex items-center">
              <img src="../assets/images/logo.png" class="w-8 ml-2 shrink-0" alt="#" />
              <div class="ml-2 text-lg font-semibold text-gray-900 grow dark:text-gray-300">IT-Forelead</div>
            </router-link>
            <button @click="toggleDark()" class="relative inline-block p-2 rounded-full shadow bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-700">
              <MoonIcon v-if="!isDark" class="w-5 h-5 text-black dark:text-gray-500" />
              <SunIcon v-else class="w-5 h-5 text-black dark:text-gray-500" />
            </button>
          </div>
          <h3 class="mt-5 text-xl font-semibold text-center text-gray-900 uppercase dark:text-gray-300 md:mt-0">Parolni qayta tiklash</h3>
        </div>
        <div class="p-3">
          <div class="flex flex-col justify-center pb-3 items-center border-b border-gray-200 dark:border-gray-600">
            <div class="flex items-center justify-center my-2 w-28 h-28 mr-3 border rounded-md bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-700 dark:border-gray-600">
              <UserBoldIcon class="w-20 h-20" />
            </div>
            <p class="my-1 font-semibold text-gray-900 dark:text-gray-300">
              {{ user.firstname + ' ' + user.lastname }}
            </p>
            <p class="my-1 text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(user.phone) }}</p>
          </div>

          <form @submit.prevent="resetPassword()">
            <div class="p-3">
              <label for="password" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Yangi parol</label>
              <div class="relative">
                <input v-model="client.password" id="password" :type="currentType" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Yangi parolni kiriting" />
                <div class="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-sm leading-5">
                  <EyeIcon @click="showPassword('password')" v-if="currentType === 'text'" class="w-5 h-5 text-gray-400 cursor-pointer" />
                  <EyeSlashIcon @click="showPassword('text')" v-if="currentType === 'password'" class="w-5 h-5 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
            <div class="p-3">
              <label for="reply-password" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Parolni takrorlang</label>
              <div class="relative">
                <input v-model="client.confirmPassword" id="reply-password" :type="currentReplyPasswordType" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Parolni takrorlang" />
                <div class="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-sm leading-5">
                  <EyeIcon @click="showReplyPassword('password')" v-if="currentReplyPasswordType === 'text'" class="w-5 h-5 text-gray-400 cursor-pointer" />
                  <EyeSlashIcon @click="showReplyPassword('text')" v-if="currentReplyPasswordType === 'password'" class="w-5 h-5 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
            <div class="flex items-center justify-end p-5 mt-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="submit" class="px-4 py-2 font-medium text-white transition-colors duration-200 bg-indigo-500 rounded shadow-lg outline-none hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Saqlash</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SunIcon from '../assets/icons/SunIcon.vue'
import MoonIcon from '../assets/icons/MoonIcon.vue'
import EyeIcon from '../assets/icons/EyeIcon.vue'
import EyeSlashIcon from '../assets/icons/EyeSlashIcon.vue'
import UserBoldIcon from '../assets/icons/UserBoldIcon.vue'
import { phoneStyle } from "../utils/utils.js";
import { onMounted, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useDark, useToggle } from '@vueuse/core'
import axios from 'axios'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const router = useRouter()

const store = useStore()

const client = reactive({
  password: '',
  confirmPassword: '',
})

const user = computed(() => {
  return JSON.parse(localStorage.getItem('current-user')).data
})

// show/hide password
const currentType = ref('password')
const currentReplyPasswordType = ref('password')
const showPassword = (t) => (currentType.value = t)
const showReplyPassword = (t) => (currentReplyPasswordType.value = t)

const resetPassword = () => {
  if (client.password === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, yangi parolni kiriting!',
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
    const formData = {
      link: router.currentRoute.value.path.split('/')[2],
      password: client.password,
    }
    store.dispatch('clientModule/resetPassword', formData).then(
      () => {
        notify.success({
          message: `Parol muvaffaqiyatli o'zgartirildi!`,
          position: 'bottomLeft',
        }),
          (client.password = ''),
          (client.confirmPassword = '')
      },
      () => {
        notify.error({
          message: `Parol o'zgartirishda xatolik yuz berdi!`,
          position: 'bottomLeft',
        })
      }
    )
  }
}

const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

onMounted(() => {
  axios
    .get(API_URL + '/auth/link-validation-and-return-user/' + router.currentRoute.value.path.split('/')[2])
    .then((data) => {
      localStorage.setItem('current-user', JSON.stringify(data))
    })
    .catch((err) => {
      router.push('/not-found')
    })
})
</script>

<style scoped>
</style>
