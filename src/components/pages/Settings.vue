<template>
  <div class="h-full px-5">
    <div class="flex items-center mb-5">
      <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">Sozlamalar</h3>
    </div>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div class="p-3 px-5 bg-white rounded-lg max-content-h dark:bg-gray-800">
        <h3 class="mb-3 text-2xl font-extrabold dark:text-gray-300">Sozlamalarni boshqarish</h3>
        <hr class="mb-6 border border-gray-200 bottom-1 dark:border-gray-600" />
        <form @submit.prevent="updateSettings()">
          <div class="mb-6">
            <label for="gym-name" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Klub nomi</label>
            <input v-model="gymName" type="text" name="name" id="gym-name" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Klub nomini kiriting..." />
          </div>
          <div class="mb-6">
            <label for="daily-price" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Kunlik to'lov</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="text-sm text-gray-500 dark:text-gray-300"> UZS </span>
              </div>
              <input v-model="dailyPrice" type="number" name="daily-price" id="daily-price" class="block w-full pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg pl-11 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="0.00" />
            </div>
          </div>
          <div class="mb-6">
            <label for="monthly-price" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Oylik to'lov</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="text-sm text-gray-500 dark:text-gray-300"> UZS </span>
              </div>
              <input v-model="monthlyPrice" type="number" name="monthly-price" id="monthly-price" class="block w-full pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg pl-11 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="0.00" />
            </div>
          </div>
          <hr class="mb-6 border border-gray-200 bottom-1 dark:border-gray-600" />
          <div class="flex justify-end">
            <button type="submit" class="mx-1 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Jo'natish</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const store = useStore()

const gymName = ref('')
const dailyPrice = ref(0)
const monthlyPrice = ref(0)

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(() => {
      store.commit('setSelectedPage', '')
    }, () => {})
  } else {
    notify.warning({
      message: msg,
      position: 'bottomLeft',
    })
  }
}

const getSettings = () => {
  store.dispatch('settingModule/get').then(
    (data) => {
      store.commit('setSetting', data)
      gymName.value = store.state.settings.gymName
      dailyPrice.value = store.state.settings.dailyPrice
      monthlyPrice.value = store.state.settings.monthlyPrice
    },
    (error) => {
      forbiddenChecker(error, "Ma'lumotlarni bazadan olishda xatolik yuz berdi!")
    }
  )
}

const updateSettings = () => {
  if (gymName.value === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, klub nomini kiriting!',
      position: 'bottomLeft',
    })
  } else if (dailyPrice.value === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, kunlik narxni kiriting!',
      position: 'bottomLeft',
    })
  } else  if (dailyPrice.value < 1000) {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, kunlik narxni to\'g\'ri kiriting!',
      position: 'bottomLeft',
    })
  } else if (monthlyPrice.value === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, oylik narxni to\'g\'ri kiriting!',
      position: 'bottomLeft',
    })
  } else if (monthlyPrice.value < 1000) {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, oylik narxni kiriting!',
      position: 'bottomLeft',
    })
  } else {
    const settingData = {
      gymName: gymName.value,
      dailyPrice: dailyPrice.value,
      monthlyPrice: monthlyPrice.value,
    }
    store.dispatch('settingModule/update', settingData).then(
      () => {
        notify.success({
          message: 'Sozlamalar muvaffaqiyatli taxrirlandi!',
          position: 'bottomLeft',
        })
      },
      () => {
        notify.warning({
          message: 'Sozlamalarni taxrirlashda xatolik yuz berdi!',
          position: 'bottomLeft',
        })
      }
    )
  }
}

onMounted(() => getSettings())
</script>