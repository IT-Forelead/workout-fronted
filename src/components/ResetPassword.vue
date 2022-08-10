<template>
  <div
    class="fixed inset-0 top-0 left-0 right-0 w-full h-screen overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-gray-900">
    <div
      class="w-full p-1 mx-auto mb-20 lg:mx-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:relative md:w-2/4 lg:top-1/2 lg:left-1/2 lg:p-4">
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
          <h3 class="mt-5 text-xl font-semibold text-center text-gray-900 uppercase dark:text-gray-300 md:mt-0">Parolni
            qayta tiklash</h3>
        </div>
        <div class="p-3">
          <form>
            <div class="p-3">
              <label for="password" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Yangi
                parol</label>
              <div class="relative">
                <input id="password" :type="currentType"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Yangi parolni kiriting" required />
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
                <input id="reply-password" :type="currentReplyPasswordType"
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
            <div
              class="flex items-center justify-end p-5 mt-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                class="px-4 py-2 font-medium text-white transition-colors duration-200 bg-indigo-500 rounded shadow-lg outline-none hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Saqlash</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SunIcon from "../assets/icons/SunIcon.vue";
import MoonIcon from "../assets/icons/MoonIcon.vue";
import EyeIcon from '../assets/icons/EyeIcon.vue'
import EyeSlashIcon from '../assets/icons/EyeSlashIcon.vue'
import { onMounted, ref } from 'vue'
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

// show/hide password
const currentType = ref('password')
const currentReplyPasswordType = ref('password')
const showPassword = (t) => (currentType.value = t)
const showReplyPassword = (t) => (currentReplyPasswordType.value = t)


const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE

onMounted(() => {
  console.log(router.currentRoute.value.path.split('/')[2]);
  axios
    .get(API_URL + '/auth/link-validation/' + router.currentRoute.value.path.split('/')[2])
    .then((data) => {
      console.log('Data ' + data)
      localStorage.setItem('current-user', JSON.stringify(data))
    })
    .catch((err) => {
      console.log('Error ' + err)
      router.push('/not-found')
    })
})

</script>

<style scoped>
</style>
