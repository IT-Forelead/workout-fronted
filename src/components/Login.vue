<template>
  <div class="h-screen w-screen bg-emerald-100">
    <div class="flex h-full flex-1 flex-col items-center justify-center px-4 sm:px-0">
      <div class="flex h-3/4 w-full rounded-3xl bg-white shadow-lg sm:mx-0 sm:w-4/5 lg:w-2/3">
        <div class="flex w-full flex-col p-4 xl:w-1/2">
          <div class="flex items-center">
            <img src="../assets/images/logo.png" class="ml-2 w-8 shrink-0" alt="#" />
            <div class="ml-2 grow text-lg font-semibold text-gray-900">IT-Forelead</div>
          </div>
          <div class="mb-0 md:mb-5 flex flex-1 flex-col justify-center">
            <h3 class="text-center text-4xl font-semibold">KIRISH</h3>
            <p class="my-5 px-10 text-center text-sm text-gray-500">Tizimga kirish uchun telefon raqamingiz va parolingizni kiritishgingiz lozim!</p>
            <div class="mt-3 md:mt-8 w-full">
              <Form @submit="onSubmit" :validation-schema="schema" class="form-horizontal md:mx-auto md:w-3/4" method="POST" action="#">
                <div class="mt-4 flex flex-col">
                  <Field v-model="phone" v-mask="'+###(##) ###-##-##'" name="phone" type="phone" class="text-md w-full rounded-xl border-0 bg-gray-100 p-4 text-gray-500 outline-none focus:bg-gray-200 focus:outline-none" placeholder="+998(99) 876-54-32" />
                  <ErrorMessage name="phone" class="error-feedback font-medium text-rose-600" />
                </div>
                <div class="mt-4 flex flex-col">
                  <Field v-model="password" name="password" type="password" class="text-md w-full rounded-xl border-0 bg-gray-100 p-4 text-gray-500 outline-none focus:bg-gray-200 focus:outline-none" placeholder="Parolni kiriting..." />
                  <ErrorMessage name="password" class="error-feedback font-medium text-rose-600" />
                </div>
                <div class="mt-8 flex items-center">
                  <button type="submit" class="text-md w-full rounded-xl flex justify-center bg-gray-900 py-5 text-white hover:bg-gray-800"><LoginIcon class="text-2xl mr-3"/>Tizimga kirish</button>
                </div>
              </Form>
              <div class="mt-8 text-center">
                <a class="cursor-pointer text-sm text-rose-600 no-underline hover:underline">Parolni unitdingizmi?</a>
              </div>
            </div>
          </div>
          <div class="text-center text-xs text-gray-400 dark:text-gray-400">All rights reserved. &copy; <a href="https://it-forelead.uz" class="hover:underline">IT-Forelead</a> 2022</div>
        </div>
        <div class="hidden xl:block bg-image rounded-r-3xl md:w-2/3">
          <div class="flex h-full items-center justify-center">
            <div class="xl:mx-16 2xl:mx-32 w-full rounded-xl px-10 py-16 text-white backdrop-blur-sm backdrop-contrast-50">
              <h3 class="mb-5 text-3xl font-semibold">Workout platformasi</h3>
              <p class="text-md">Trinirovka klubingiz boshqaruvini qulaylashtiruvchi, harajatlarni kamaytirgan holda ish samaradoligini oshiruvchi qulay hamda sodda tizim.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import LoginIcon from '../assets/icons/LoginIcon.vue'

const router = useRouter()

const store = useStore()

const phone = ref('')
const password = ref('')

const schema = yup.object().shape({
  phone: yup.string().required('Iltimos. Telefon raqamini kitiring!'),
  password: yup.string().required('Iltimos. Parolni kitiring!'),
})

function checkLogin(data) {
  store.commit('setLogin', data)
}

const onSubmit = (user) => {
  user.phone = user.phone.replace(')', '').replace('(', '').replace(' ', '').replace('-', '').replace('-', '')
  store.dispatch('auth/login', user).then(
    () => {
      router.push('/')
      checkLogin(true)
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
.bg-image {
  background: url('../assets/images/bg-login.jpg') -290px center;
  background-size: cover;
}
</style>
