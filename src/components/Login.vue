<template>
  <div class="w-full h-screen bg-emerald-100 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center flex-1 h-full px-4 sm:px-0">
      <div
        class="flex w-full bg-white shadow-lg max-h-fit md:h-3/4 rounded-3xl sm:mx-0 sm:w-4/5 lg:w-2/3 dark:bg-gray-800">
        <div class="flex flex-col w-full p-4 xl:w-1/2">
          <div class="flex justify-between">
            <div class="flex items-center">
              <img src="/images/logo.png" class="w-8 ml-2 shrink-0" alt="#" />
              <div class="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-300 grow">IT-Forelead</div>
            </div>
            <button @click="toggleDark()"
              class="relative inline-block p-2 rounded-full shadow bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-700">
              <MoonIcon v-if="!isDark" class="w-5 h-5 text-black dark:text-gray-500" />
              <SunIcon v-else class="w-5 h-5 text-black dark:text-gray-500" />
            </button>
          </div>
          <div class="flex flex-col justify-center flex-1 mb-0 md:mb-5">
            <h3 class="text-4xl font-semibold text-center dark:text-gray-300">KIRISH</h3>
            <p class="px-10 my-5 text-sm text-center text-gray-500 dark:text-gray-400">Tizimga kirish uchun telefon
              raqamingiz va
              parolingizni kiritishgingiz lozim!</p>
            <div class="w-full mt-3 md:mt-4">
              <Form @submit="onSubmit" class="form-horizontal md:mx-auto md:w-3/4" method="POST" action="#">
                <div class="flex flex-col mt-4">
                  <Field v-model="phone" v-mask="'+998(##) ###-##-##'" name="phone" type="phone"
                    class="w-full p-3 text-gray-500 bg-gray-100 border border-gray-200 outline-none text-md rounded-xl focus:bg-gray-700 focus:outline-none dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600"
                    placeholder="+998(99) 876-54-32" />
                </div>
                <div class="flex flex-col mt-4">
                  <div class="relative">
                    <Field v-model="password" name="password" :type="currentType"
                      class="w-full p-3 text-gray-500 bg-gray-100 border border-gray-200 outline-none text-md rounded-xl focus:bg-gray-700 focus:outline-none dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600"
                      placeholder="Parolni kiriting..." />
                    <div class="absolute inset-y-0 right-0 z-20 flex items-center pr-3 text-sm leading-5">
                      <EyeIcon @click="showPassword('password')" v-if="currentType === 'text'"
                        class="w-5 h-5 text-gray-400 cursor-pointer" />
                      <EyeSlashIcon @click="showPassword('text')" v-if="currentType === 'password'"
                        class="w-5 h-5 text-gray-400 cursor-pointer" />
                    </div>
                  </div>
                  <div class="mt-1 ml-2">
                    <a @click="openResetPasswordModal()"
                      class="text-sm text-blue-600 no-underline cursor-pointer dark:text-blue-500 hover:underline">Parolni
                      unitdingizmi?</a>
                  </div>
                </div>
                <div class="flex items-center mt-4">
                  <button type="submit"
                    class="flex justify-center w-full py-4 text-white bg-gray-900 text-md rounded-xl dark:text-gray-300 hover:bg-gray-900/60"
                    :disabled="isLoading">
                    <span v-if="!isLoading" class="flex items-center cursor-pointer">Tizimga kirish</span>
                    <span v-else class="flex items-center">
                      <SpinIcon class="w-6 h-6" /> Tekshirilmoqda...
                    </span>
                  </button>
                </div>
              </Form>
              <div class="relative w-1/2 mx-auto my-4 text-center">
                <hr class="border-gray-300 dark:border-gray-600">
                <span
                  class="absolute px-3 text-xs text-gray-500 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 top-1/2 left-1/2">YOKI</span>
              </div>
              <div class="flex items-center md:mx-auto md:w-3/4">
                <router-link to="/register"
                  class="flex justify-center w-full py-4 text-white bg-gray-900 text-md rounded-xl dark:text-gray-300 hover:bg-gray-900/60">
                  <span class="flex items-center cursor-pointer">Ro'yhatdan o'tish</span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="text-xs text-center text-gray-400 dark:text-gray-400">All rights reserved. &copy; <a
              href="https://t.me/trimuzsupport" class="hover:underline">IT-Forelead</a> {{ new Date().getFullYear() }}</div>
        </div>
        <div class="hidden xl:block bg-[url('/images/bg-login.jpg')] bg-cover bg-right rounded-r-3xl md:w-2/3">
          <div class="flex items-center justify-center h-full">
            <div
              class="w-full px-10 py-16 text-white xl:mx-16 2xl:mx-32 rounded-xl backdrop-blur-sm backdrop-contrast-50">
              <h3 class="mb-5 text-3xl font-semibold">Workout platformasi</h3>
              <p class="text-md">Trinirovka klubingiz boshqaruvini qulaylashtiruvchi, harajatlarni kamaytirgan holda ish
                samaradoligini oshiruvchi qulay hamda sodda tizim.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Reset Password Modal -->
  <div v-if="isResetPasswordModal"
    class="fixed inset-0 top-0 left-0 right-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto backdrop-brightness-50">
    <div class="relative w-full max-w-xl p-1 mt-16 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:mt-0 md:p-4">
      <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Parolni qayta tiklash</h3>
          <button type="button" @click="closeResetPasswordModal()"
            class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal">
            <ModalCloseIcon />
          </button>
        </div>
        <div class="p-5">
          <div class="px-3">
            <label for="phone" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Telefon
              raqam</label>
            <input v-model="clientPhone" name="phone" v-mask="'+998(##) ###-##-##'" id="phone"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="+998(90) 123-45-67" required />
          </div>
          <div class="p-3 text-sm text-gray-700 dark:text-gray-400">
            Parolni qayta tiklash uchun profilingizga biriktirilgan telefon raqamingizni kiriting. Biz telefon
            raqamingizga parolni tiklash linkini jo'natamiz. Linkning amal qilish muddati 10 daqiqa.
          </div>
        </div>
        <div
          class="flex items-center justify-between p-5 space-x-2 border-t border-gray-200 rounded-b px-7 dark:border-gray-600">
          <button @click="closeResetPasswordModal()"
            class="px-4 py-2 mr-2 font-medium text-white transition-colors duration-200 bg-teal-500 border border-teal-500 rounded outline-none hover:bg-teal-400 hover:text-white focus:ring-teal-600 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Yopish</button>
          <button @click="sendSMSLink()"
            class="px-4 py-2 font-medium text-white transition-colors duration-200 bg-indigo-500 rounded shadow-lg outline-none hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Jo'natish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Field, Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useDark, useToggle } from '@vueuse/core'
import SpinIcon from '@/components/icons/SpinIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'
import ModalCloseIcon from '@/components/icons/ModalCloseIcon.vue'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'

const router = useRouter()

const store = useStore()

const phone = ref('')
const password = ref('')
const clientPhone = ref('')

const isLoading = ref(false)
const isResetPasswordModal = ref(false)
const currentType = ref('password')
const showPassword = (u) => (currentType.value = u)

const isDark = useDark()
const toggleDark = useToggle(isDark)

const openResetPasswordModal = () => {
  isResetPasswordModal.value = true
}

const closeResetPasswordModal = () => {
  isResetPasswordModal.value = false
  clientPhone.value = ''
}

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(
      () => {
        store.commit('setSelectedPage', '')
      },
      () => { }
    )
  } else {
    notify.warning({
      message: msg,
      position: 'bottomLeft',
    })
  }
}

// User Data
const addUserInStore = () => {
  store.dispatch('userModule/get').then(
    (data) => {
      store.commit('setUser', data)
    },
    (error) => {
      forbiddenChecker(error, "Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi!")
    }
  )
}

const onSubmit = (user) => {
  isLoading.value = true
  user.phone = user.phone.replaceAll(/[^\w\s+]/ig, '').replaceAll(' ', '')
  if (!user.phone) {
    notify.warning({
      message: 'Iltimos telefon raqamni kiriting!',
      position: 'topRight',
    })
    isLoading.value = false
  } else if (!user.password) {
    notify.warning({
      message: 'Iltimos parolni kiriting!',
      position: 'topRight',
    })
    isLoading.value = false
  } else {
    store.dispatch('auth/login', user).then(
      (data) => {
        addUserInStore()
        setTimeout(() => {
          if (store.state.user.role === 'admin') {
            router.push('/admin-dashboard')
          } else {
            router.push('/dashboard')
          }
          isLoading.value = false
          localStorage.setItem('role', store.state.user.role)
        }, 700)
      },
      (error) => {
        notify.error({
          message: error.response.data || "Login yoki parol noto'g'ri",
          position: 'topRight',
        })
        isLoading.value = false
      }
    )
  }
}

const sendSMSLink = () => {
  if (!clientPhone.value) {
    notify.warning({
      message: "Iltimos, telefon raqamni kiriting!",
      position: 'bottomLeft',
    })
  } else if (clientPhone.value.length <= 17) {
    notify.warning({
      message: "Iltimos, telefon raqamni to'g'ri kiriting!",
      position: 'bottomLeft',
    })
  } else {
    let clearedPhone = clientPhone.value.replace(')', '').replace('(', '').replace(' ', '').replace(' ', '').replace('-', '').replace('-', '')
    store.dispatch('clientModule/sendSMSLink', clearedPhone).then(
      () => {
        notify.success({
          message: "Xabarnoma telefoningizga jo'natildi!",
          position: 'bottomLeft',
        }),
          closeResetPasswordModal()
      },
      (error) => {
        notify.warning({
          message: error.response.data || "SMS yuborishda xatolik yuz berdi",
          position: 'bottomLeft',
        })
      }
    )
  }
}

onMounted(() => {
  if (document.getElementById('loader')) {
    document.getElementById('loader').remove()
  }
})
</script>

<style scoped>
</style>
