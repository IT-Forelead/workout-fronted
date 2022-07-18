<template>
  <div>
    <div class="h-full px-5">
      <div class="flex justify-between items-center mb-5">
        <h3 class="text-2xl font-extrabold ml-2 mb-3 dark:text-gray-300">SMS xabarlar</h3>
        <button class="hidden lg:inline-block border-slate-300 w-full rounded-lg border bg-white px-5 py-2 text-center text-gray-900 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto dark:border-0 dark:text-gray-300"><FunnelIcon class="mr-1 inline-block text-lg" /> Saralash</button>
      </div>
      <div v-show="messages.length > 0" class="messages-wrapper overflow-x-auto grid grid-cols-1 border border-slate-200 rounded-lg shadow-lg dark:border-gray-600 messages-table-h">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="bg-slate-50 sticky-top z-0">
            <tr class="text-md font-semibold tracking-wide text-left text-gray-900 dark:text-gray-300 dark:bg-gray-800">
              <th scope="col" class="px-4 py-3">Foydalanuvchi</th>
              <th scope="col" class="px-4 py-3">Yuborilgan vaqti</th>
              <th scope="col" class="px-4 py-3">SMS matni</th>
              <th scope="col" class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white dark:text-gray-300 dark:bg-gray-800 dark:divide-gray-600">
            <MessagesInfo :messages="messages" :distance="distance" :target="target" @infinite="loadMessages" />
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="!isMessagesEmpty && messages.length === 0" class="flex justify-center items-start h-10 w-full">
      <SpinIcon class="w-7 h-7" />
    </div>
    <h1 v-show="isMessagesEmpty" class="text-red-500 text-xl text-center">Ma'lumotlar bazasidan smslar hisoboti topilmadi!</h1>
  </div>
</template>

<script setup>
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import MessagesInfo from './Messages/MessagesInfo.vue'
import { ref } from 'vue'
import authHeader from '../../services/auth-header.js'
import SpinIcon from '../../assets/icons/SpinIcon.vue'

const target = ref('.messages-wrapper')
const distance = ref(200)
const messages = ref([])
const total = ref(0)

let page = 0
const loadMessages = async ($state) => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch('http://localhost:9000/message/' + page, {
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        messages.value.push(...json.messages)
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

const isMessagesEmpty = ref(false)

setTimeout(() => {
  isMessagesEmpty.value = messages.value.length === 0
}, 700)
</script>

<style scoped>
.messages-table-h {
  max-height: 75vh;
}
</style>