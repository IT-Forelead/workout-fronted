<template>
  <transition>
    <div class="w-full h-screen bg-emerald-100">
      <div class="flex flex-col items-center justify-center flex-1 h-full px-4 sm:px-0">
        <div class="flex w-full bg-white shadow-lg max-h-fit md:h-3/4 rounded-3xl sm:mx-0 sm:w-4/5 lg:w-2/3">
          <div class="flex flex-col w-full p-4 xl:w-1/2">
            <div class="flex items-center">
              <img src="../assets/images/logo.png" class="w-8 ml-2 shrink-0" alt="#" />
              <div class="ml-2 text-lg font-semibold text-gray-900 grow">IT-Forelead</div>
            </div>
            <div class="flex flex-col justify-center flex-1 mb-0 md:mb-5">
              <h3 class="text-4xl font-semibold text-center">KIRISH</h3>
              <p class="px-10 my-5 text-sm text-center text-gray-500">Tizimga kirish uchun telefon raqamingiz va
                parolingizni kiritishgingiz lozim!</p>
              <div class="w-full mt-3 md:mt-8">
                <Form @submit="onSubmit" :validation-schema="schema" class="form-horizontal md:mx-auto md:w-3/4"
                  method="POST" action="#">
                  <div class="flex flex-col mt-4">
                    <Field v-model="phone" v-mask="'+###(##) ###-##-##'" name="phone" type="phone"
                      class="w-full p-4 text-gray-500 bg-gray-100 border-0 outline-none text-md rounded-xl focus:bg-gray-200 focus:outline-none"
                      placeholder="+998(99) 876-54-32" />
                    <ErrorMessage name="phone" class="font-medium error-feedback text-rose-600" />
                  </div>
                  <div class="flex flex-col mt-4">
                    <Field v-model="password" name="password" type="password"
                      class="w-full p-4 text-gray-500 bg-gray-100 border-0 outline-none text-md rounded-xl focus:bg-gray-200 focus:outline-none"
                      placeholder="Parolni kiriting..." />
                    <ErrorMessage name="password" class="font-medium error-feedback text-rose-600" />
                  </div>
                  <div class="flex items-center mt-8">
                    <button type="submit"
                      class="flex justify-center w-full py-5 text-white bg-gray-900 text-md rounded-xl hover:bg-gray-800"
                      :disabled="isLoading">
                      <span v-if="!isLoading" class="flex items-center">
                        <LoginIcon class="mr-3 text-2xl" />Tizimga kirish
                      </span>
                      <span v-else class="flex items-center">
                        <SpinIcon class="w-6 h-6" /> Tekshirilmoqda...
                      </span>
                    </button>
                  </div>
                </Form>
                <div class="mt-8 text-center">
                  <a class="text-sm no-underline cursor-pointer text-rose-600 hover:underline">Parolni unitdingizmi?</a>
                </div>
                <div class="my-3 text-center">
                  <router-link to="/register" class="text-blue-600 cursor-pointer text-md hover:underline">Ro'yhatdan
                    o'tish</router-link>
                </div>
              </div>
            </div>
            <div class="text-xs text-center text-gray-400 dark:text-gray-400">All rights reserved. &copy; <a
                href="https://it-forelead.uz" class="hover:underline">IT-Forelead</a> 2022</div>
          </div>
          <div class="hidden xl:block bg-image rounded-r-3xl md:w-2/3">
            <div class="flex items-center justify-center h-full">
              <div
                class="w-full px-10 py-16 text-white xl:mx-16 2xl:mx-32 rounded-xl backdrop-blur-sm backdrop-contrast-50">
                <h3 class="mb-5 text-3xl font-semibold">Workout platformasi</h3>
                <p class="text-md">Trinirovka klubingiz boshqaruvini qulaylashtiruvchi, harajatlarni kamaytirgan holda
                  ish
                  samaradoligini oshiruvchi qulay hamda sodda tizim.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import LoginIcon from '../assets/icons/LoginIcon.vue'
import SpinIcon from '../assets/icons/SpinIcon.vue'

const router = useRouter()

const store = useStore()

const phone = ref('')
const password = ref('')

const schema = yup.object().shape({
  phone: yup.string().required('Iltimos. Telefon raqamini kitiring!'),
  password: yup.string().required('Iltimos. Parolni kitiring!'),
})

const isLoading = ref(false)

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(() => {
      store.commit('setSelectedPage', '')
    }, () => { })
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
  user.phone = user.phone.replace(')', '').replace('(', '').replace(' ', '').replace('-', '').replace('-', '')
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
      if (error.message.split(' ').includes('406')) {
        notify.warning({
          message: "Sizning profilingiz aktivlanmagan holatda!",
          position: 'topRight',
        })
      } else {
        notify.error({
          message: "Telefon raqami yoki parol noto'g'ri!",
          position: 'topRight',
        })
      }
      isLoading.value = false
    }
  )
}

onMounted(() => document.getElementById('loader').remove())
</script>

<style scoped>
.bg-image {
  background: url('../assets/images/bg-login.jpg') -290px center;
  background-size: cover;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.fade-leave-active {
  transition: all 0.3s ease-in;
}
</style>
