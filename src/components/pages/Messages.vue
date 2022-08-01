<template>
  <div>
    <div class="h-full px-5">
      <div class="flex items-center justify-between mb-5">
        <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">SMS xabarlar</h3>
        <div class="relative hidden lg:flex lg:justify-between lg:items-center">
          <div class="flex items-center mr-3">
            <div class="relative">
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span class="text-sm text-gray-600 dark:text-gray-300"> dan </span>
              </div>
              <input v-model.lazy="filterData.filterDateFrom" name="start" type="datetime-local"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-11 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <ArrowRightIcon class="mx-2 text-gray-500" />
            <div class="relative">
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span class="text-sm text-gray-600 dark:text-gray-300"> gacha </span>
              </div>
              <input v-model.lazy="filterData.filterDateTo" name="end" type="datetime-local"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
          <button @click="openFilter = !openFilter"
            class="w-full px-5 py-2 text-center text-gray-900 bg-white border rounded-lg border-slate-300 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto dark:border-0 dark:text-gray-300">
            <div class="flex items-center">
              <FunnelIcon class="inline-block mr-1 text-lg" />
              <span class="flex items-center">{{ currentFilter === '' ? 'Saralash' : currentFilter }}
                <TimesIcon v-if="currentFilter !== ''" @click="defaultView()"
                  class="w-5 h-5 ml-2 text-gray-700 cursor-pointer hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400" />
              </span>
            </div>
          </button>
          <div v-if="openFilter" ref="filterDropdown"
            class="absolute right-0 z-30 w-1/4 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 top-11 dark:text-gray-300">
            <div @click="openFilter = false; filterData.typeBy = 'send-code'; currentFilter = 'Aktivlash kodlari'"
              class="px-3 py-2 border-b cursor-pointer dark:border-gray-600 dark:hover:bg-gray-700">Aktivlash kodlari
            </div>
            <div @click="openFilter = false; filterData.typeBy = 'reminder'; currentFilter = 'Eslatma xabarlari'"
              class="px-3 py-2 cursor-pointer dark:hover:bg-gray-700">Eslatma xabarlari</div>
          </div>
        </div>
      </div>
      <div v-show="messages.length > 0" :class="{ 'overflow-hidden': total / 10 <= 1 }"
        class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg messages-wrapper messages-table-h border-slate-200 dark:border-gray-600">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="z-0 shadow sticky-top bg-slate-50 dark:shadow-gray-600">
            <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:bg-gray-800 dark:text-gray-300">
              <th scope="col" class="px-4 py-5">Foydalanuvchi</th>
              <th scope="col" class="px-4 py-5">Yuborilgan vaqti</th>
              <th scope="col" class="px-4 py-5">SMS matni</th>
              <th scope="col" class="px-4 py-5">Status</th>
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
    <h1 v-show="isMessagesEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan smslar hisoboti
      topilmadi!</h1>
  </div>
</template>

<script setup>
import SpinIcon from '../../assets/icons/SpinIcon.vue'
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.vue'
import MessagesInfo from './Messages/MessagesInfo.vue'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import { reactive, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import authHeader from '../../services/auth-header.js'

const target = ref('.messages-wrapper')
const distance = ref(200)
const messages = ref([])
const total = ref(0)

// Filter By
const openFilter = ref(false)
const filterDropdown = ref(null)
const currentFilter = ref('')

onClickOutside(filterDropdown, () => {
  if (openFilter.value) openFilter.value = false
})

const defaultView = () => {
  currentFilter.value = ''
  filterData.typeBy = null
  page = 1
  loadFirstTenMessages()
}

// load default
const filterData = reactive({
  typeBy: null,
  filterDateFrom: null,
  filterDateTo: null,
})
const isMessagesEmpty = ref(false)
const API_URL = import.meta.env.VITE_MY_ENV_VARIABLE;

let page = 0
const loadMessages = async ($state) => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/message/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        messages.value.push(...json.messages)
        $state.loaded()

        setTimeout(() => {
          isMessagesEmpty.value = messages.value.length === 0
        }, 700)
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

const loadFirstTenMessages = async () => {
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/message/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        messages.value = []
        messages.value.push(...json.messages)
      }, 500)
    } catch (error) {
      console.log("Get First Ten Messages!");
    }
  }
}

// load filtered
const loadFiltered = async () => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/message/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        messages.value = []
        messages.value.push(...json.messages)
      }, 500)
    } catch (error) {
      notify.warning({
        message: error,
        position: 'bottomLeft',
      })
    }
  }
}

const refresher = () => {
  page = 0
  total.value = 0
  messages.value = []
  loadFiltered()
  setTimeout(() => {
    isMessagesEmpty.value = messages.value.length === 0
  }, 700)
}

watch(
  () => filterData.typeBy,
  () => refresher(),
  { deep: true }
)

watch(
  () => filterData.filterDateFrom,
  () => refresher(),
  { deep: true }
)

watch(
  () => filterData.filterDateTo,
  () => refresher(),
  { deep: true }
)
</script>

<style scoped>
.messages-table-h {
  max-height: 75vh;
}
</style>
