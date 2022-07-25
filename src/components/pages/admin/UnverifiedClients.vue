<template>
  <div>
    <div class="h-full px-5">
      <div class="flex items-center justify-between mb-5">
        <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">Kutishdagi mijozlar</h3>
        <div class="relative hidden lg:flex lg:justify-between lg:items-center">
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
            class="absolute right-0 z-30 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 top-11 dark:text-gray-300">
            <div @click="openFilter = false; filterData.typeBy = 'firstname-az'; currentFilter = 'Ism bo\'yicha (A-Z)'"
              class="px-3 py-2 border-b cursor-pointer whitespace-nowrap dark:border-gray-600 dark:hover:bg-gray-700">
              Ism bo'yicha (A-Z)</div>
            <div @click="openFilter = false; filterData.typeBy = 'firstname-za'; currentFilter = 'Ism bo\'yicha (Z-A)'"
              class="px-3 py-2 border-b cursor-pointer whitespace-nowrap dark:border-gray-600 dark:hover:bg-gray-700">
              Ism bo'yicha (Z-A)</div>
            <div
              @click="openFilter = false; filterData.typeBy = 'lastname-az'; currentFilter = 'Familiya bo\'yicha (A-Z)'"
              class="px-3 py-2 border-b cursor-pointer whitespace-nowrap dark:border-gray-600 dark:hover:bg-gray-700">
              Familiya bo'yicha (A-Z)</div>
            <div
              @click="openFilter = false; filterData.typeBy = 'lastname-za'; currentFilter = 'Familiya bo\'yicha (Z-A)'"
              class="px-3 py-2 border-b cursor-pointer whitespace-nowrap dark:border-gray-600 dark:hover:bg-gray-700">
              Familiya bo'yicha (Z-A)</div>
          </div>
        </div>
      </div>
      <div v-show="clients.length > 0" :class="{ 'overflow-hidden': total / 10 <= 1 }"
        class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg clients-wrapper border-slate-200 dark:border-gray-600 clients-table-h">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="z-0 shadow sticky-top bg-slate-50 dark:shadow-gray-600">
            <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:text-gray-300 dark:bg-gray-800">
              <th class="px-4 py-3">Mijoz</th>
              <th class="px-4 py-3">Fitnes klub</th>
              <th class="px-4 py-3 text-">Amallar</th>
            </tr>
          </thead>
          <tbody
            class="h-full bg-white divide-y divide-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:divide-gray-600">
            <UnverifiedClientItem :clients="clients" :distance="distance" :target="target" @infinite="loadClients" />
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="isLoading" class="flex items-start justify-center w-full h-10">
      <SpinIcon class="w-7 h-7" />
    </div>
    <h1 v-show="isClientsEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan aktivlashmagan mijozlar
      topilmadi!</h1>
  </div>
</template>
<script setup>
import UnverifiedClientItem from "./UnverifiedClients/UnverifiedClientItem.vue";
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import authHeader from '../../../services/auth-header'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { onClickOutside } from '@vueuse/core'
import TimesIcon from "../../../assets/icons/TimesIcon.vue";
import SpinIcon from '../../../assets/icons/SpinIcon.vue'
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue'
import store from "../../../store";

const target = ref('.clients-wrapper')
const distance = ref(200)
const total = ref(0)
const isClientsEmpty = computed(() => {
  return store.state.isClientsEmpty
})

store.commit('setClients', 'clear')

const clients = computed(() => {
  return store.state.clients
})

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
  loadDefaultClients()
}

// load default
const filterData = reactive({
  typeBy: null,
  sortBy: false
})

let page = 0
const loadClients = async ($state) => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch('http://localhost:9000/user/clients/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        store.commit('setClients', json.user)
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

const loadDefaultClients = async () => {
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch('http://localhost:9000/user/clients/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        store.commit('setClients', 'clear')
        store.commit('setClients', json.user)
      }, 500)
    } catch (error) {
      console.log("Get Clients Error!");
    }
  } else $state.loaded()
}

const isLoading = ref(true)
store.commit('setClientsEmpty', false)
setTimeout(() => {
  isLoading.value = false
  store.commit('setClientsEmpty', store.state.clients.length === 0)
}, 1000)


// load filtered
const loadFiltered = async () => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch('http://localhost:9000/user/clients/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        store.commit('setClients', 'clear')
        isLoading.value = false
        store.commit('setClients', json.user)
        store.commit('setClientsEmpty', store.state.clients.length === 0)
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
  store.commit('setClients', 'clear')
  isLoading.value = true
  store.commit('setClientsEmpty', false)
  loadFiltered()
  setTimeout(() => {
    isClientsEmpty.value = store.state.clients.length === 0
  }, 700)
}

watch(
  () => filterData.typeBy,
  () => refresher(),
  { deep: true }
)
</script>
<style scoped>
.clients-table-h {
  max-height: 75vh;
}
</style>