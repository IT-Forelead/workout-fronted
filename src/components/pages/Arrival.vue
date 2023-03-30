<template>
  <div>
    <div class="h-full px-5">
      <div class="flex items-center justify-between mb-5">
        <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">Kelib-ketishlar</h3>
        <div class="relative hidden lg:flex lg:justify-between lg:items-center">
          <button @click="openFilter = !openFilter"
            class="ml-5 flex flex-nowrap justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center text-gray-900 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-0 dark:bg-blue-600 dark:text-gray-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto lg:inline-block">
            <div class="flex items-center">
              <FunnelIcon class="inline-block mr-1 text-lg" />
              <span class="flex items-center">{{ !currentFilter ? 'Saralash' : currentFilter }}
                <TimesIcon v-if="currentFilter !== ''" @click="defaultView()"
                  class="w-5 h-5 ml-2 text-gray-700 cursor-pointer hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400" />
              </span>
            </div>
          </button>
          <div v-if="openFilter" ref="filterDropdown"
            class="absolute right-0 z-50 mt-2 bg-white border rounded-lg top-16 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <div class="p-3">
              <label for="first_name" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Ism</label>
              <input type="text" id="first_name" name="firstname"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Ismingizni kiriting" required />
            </div>
            <div class="p-3">
              <label for="last_name"
                class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Familiya</label>
              <input type="text" id="last_name" name="lastname"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Familiya kiriting" required />
            </div>
            <div class="p-3">
              <label for="region" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Viloyat</label>
              <select id="region"
                class="w-full text-sm text-left text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                <option value="" disabled selected>Viloyatni tanlang</option>
                <option value="0">Toshkent</option>
                <option :value="i" v-for="i in 5" :key="i">Xorazm</option>
              </select>
              <div class="flex items-center mt-4">
                <div class="relative">
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span class="text-sm text-gray-600 dark:text-gray-300"> dan </span>
                  </div>
                  <input v-model.lazy="filterData.filterDateFrom" name="start" type="datetime-local"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-11 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="Select date start" />
                </div>
                <ArrowRightIcon class="mx-2 text-gray-500" />
                <div class="relative">
                  <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span class="text-sm text-gray-600 dark:text-gray-300"> gacha </span>
                  </div>
                  <input v-model.lazy="filterData.filterDateTo" name="end" type="datetime-local"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-14 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="Select date start" />
                </div>
              </div>
              <button class="w-full p-2 mt-4 font-bold text-white bg-blue-700 rounded">Filtr</button>
            </div>
          </div>
        </div>
      </div>
      <div v-show="arrivals.length > 0" :class="{ 'overflow-hidden': total / 10 <= 1 }"
        class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg arrival-wrapper border-slate-200 dark:border-gray-600 arrival-table-h">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="z-0 shadow sticky-top bg-slate-50 dark:shadow-gray-600">
            <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:text-gray-300 dark:bg-gray-800">
              <th class="px-4 py-3">Foydalanuvchi</th>
              <th class="px-4 py-3">Vaqti</th>
              <th class="px-4 py-3">Turi</th>
            </tr>
          </thead>
          <tbody
            class="h-full bg-white divide-y divide-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:divide-gray-600">
            <ArrivalItem :arrivals="arrivals" :distance="distance" :target="target" @infinite="loadArrivals" />
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="!isArrivalEmpty && arrivals.length === 0" class="flex items-start justify-center w-full h-10">
      <SpinIcon class="w-7 h-7" />
    </div>
    <h1 v-show="isArrivalEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan kelib-ketishlar hisoboti
      topilmadi!</h1>
  </div>
</template>

<script setup>
import ArrivalItem from './Arrivals/ArrivalItem.vue'
import { reactive, ref, watch } from 'vue'
import authHeader from '../../services/auth-header'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { onClickOutside } from '@vueuse/core'
import SpinIcon from '@/components/icons/SpinIcon.vue'
import FunnelIcon from '@/components/icons/FunnelIcon.vue'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import TimesIcon from '@/components/icons/TimesIcon.vue'

const target = ref('.arrival-wrapper')
const distance = ref(200)
const arrivals = ref([])
const total = ref(0)
const isArrivalEmpty = ref(false)

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
  loadDefaultArrivals()
}

// load default
const filterData = reactive({
  typeBy: null,
  filterDateFrom: null,
  filterDateTo: null,
})
const API_URL = import.meta.env.VITE_BASE_URL;

let page = 0
const loadArrivals = async ($state) => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/arrival/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        arrivals.value.push(...json.arrival)
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

const loadDefaultArrivals = async () => {
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/arrival/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        arrivals.value.push(...json.arrival)
      }, 500)
    } catch (error) {
      console.log("Get Arrivals Error!");
    }
  } else $state.loaded()
}

setTimeout(() => {
  isArrivalEmpty.value = arrivals.value.length === 0
}, 1000)

// load filtered
const loadFiltered = async () => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/arrival/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        arrivals.value.push(...json.arrival)
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
  arrivals.value = []
  loadFiltered()
  setTimeout(() => {
    isArrivalEmpty.value = arrivals.value.length === 0
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
.arrival-table-h {
  max-height: 75vh;
}
</style>