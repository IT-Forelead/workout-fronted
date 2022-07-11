<template>
  <div class="px-5">
    <div class="flex items-center mb-5">
      <h3 class="text-2xl font-extrabold ml-2 mb-3 dark:text-gray-300">SMS xabarlar</h3>
    </div>
    <div v-show="messages.length > 0" class="w-full mb-8 overflow-hidden border border-slate-200 rounded-lg shadow-lg dark:border-gray-600">
      <div class="w-full overflow-x-auto">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="bg-slate-50">
            <tr class="text-md font-semibold tracking-wide text-left text-gray-900 dark:text-gray-300 dark:bg-gray-800">
              <th scope="col" class="px-4 py-3">Foydalanuvchi</th>
              <th scope="col" class="px-4 py-3">Yuborilgan vaqti</th>
              <th scope="col" class="px-4 py-3">SMS matni</th>
              <th scope="col" class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="custom-height divide-y divide-gray-200 bg-white dark:text-gray-300 dark:bg-gray-800 dark:divide-gray-600">
            <tr v-for="(msg, index) in messages" :key="index" class="text-md text-gray-700 dark:text-gray-300 dark:bg-gray-800">
              <td class="whitespace-nowrap px-4 py-3">
                <div v-if="msg.member" class="flex items-center">
                  <div class="flex mr-3 items-center justify-center h-10 w-10 border border-gray-50 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" :src="'http://localhost:9000/member/image/' + msg?.member?.image" alt="#" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-300">{{ msg?.member?.firstname + " " + msg?.member?.lastname }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(msg?.member?.phone) }}</p>
                  </div>
                </div>
                <div v-else class="flex items-center">
                  <div class="relative inline-block rounded-full mr-3 h-10 w-10 border border-gray-50 dark:border-gray-600 bg-slate-300 dark:bg-gray-800 p-1 text-slate-500 dark:text-gray-500 shadow">
                    <UserBoldIcon class="h-full w-full" />
                  </div>
                  <div class="font-semibold text-gray-900 dark:text-gray-300">Noma'lum foydalanuvchi</div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="inline-block text-lg mr-1" /> {{ msg.message.sentDate }}</td>
              <td class="whitespace-nowrap px-4 py-3">{{ msg.message.text }}</td>
              <td class="whitespace-nowrap px-4 py-3"><span class="px-5 py-1 font-semibold leading-tight text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-700 rounded-lg">{{ deliveryStatusTranslate(msg.message.deliveryStatus) }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h1 v-show="messages.length === 0" class="text-red-500 text-xl text-center">Ma'lumotlar bazasidan smslar hisoboti topilmadi!</h1>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import UserBoldIcon from '../../assets/icons/UserBoldIcon.vue'
import CalendarBlankIcon from '../../assets/icons/CalendarBlankIcon.vue'

const store = useStore()

const messages = computed(() => {
  return store.state.messages
})

const getMessages = () => {
  store.dispatch('messageModule/get').then(
    (data) => {
      store.commit('setMessage', data)
    },
    (error) => {
      notify.warning({
        message: "Ma'lumotlarni bazadan olishda xatolik yuz berdi!",
        position: 'bottomLeft',
      })
    }
  )
}

const deliveryStatusTranslate = (status) => {
  switch (status) {
    case 'sent':
      return 'Yuborildi'
    case 'delivered':
      return 'Yetkazildi'
    case 'failed':
      return 'Yetkazilmadi'
    case 'unknown':
      return "Noma'lum"
    default:
      return ''
  }
}

const phoneStyle = (phone) => {
  return `${phone.slice(0, 4)} (${phone.slice(4, 6)}) ${phone.slice(6, 9)}-${phone.slice(9, 11)}-${phone.slice(11, 13)}`
}

onMounted(() => getMessages())
</script>