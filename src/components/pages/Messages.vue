<template>
  <div>
    <div class="h-full px-5">
      <div class="flex items-center justify-between mb-5">
        <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">SMS xabarlar</h3>
        <button class="hidden w-full px-5 py-2 text-center text-gray-900 bg-white border rounded-lg border-slate-300 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-0 dark:bg-blue-600 dark:text-gray-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto lg:inline-block">
          <FunnelIcon class="inline-block mr-1 text-lg" />
          Saralash
        </button>
      </div>
      <div v-show="messages.length > 0" :class="{ 'overflow-hidden': total / 10 <= 1 }" class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg messages-wrapper messages-table-h border-slate-200 dark:border-gray-600">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="z-0 sticky-top bg-slate-50">
            <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:bg-gray-800 dark:text-gray-300">
              <th scope="col" class="px-4 py-3">Foydalanuvchi</th>
              <th scope="col" class="px-4 py-3">Yuborilgan vaqti</th>
              <th scope="col" class="px-4 py-3">SMS matni</th>
              <th scope="col" class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <MessagesInfo :messages="messages" :distance="distance" :target="target" @infinite="loadMessages" />
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="!isMessagesEmpty && messages.length === 0" class="flex items-start justify-center w-full h-10">
      <SpinIcon class="h-7 w-7" />
    </div>
    <h1 v-show="isMessagesEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan smslar hisoboti topilmadi!</h1>
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
