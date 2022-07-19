<template>
  <div>
    <div class="h-full px-5">
      <div class="flex items-center justify-between mb-5">
        <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">Kelib-ketishlar</h3>
        <div class="relative hidden lg:flex lg:justify-between lg:items-center">
          <div class="flex items-center mr-3">
            <div class="relative">
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span class="text-sm text-gray-600 dark:text-gray-300"> dan </span>
              </div>
              <input v-model.lazy="filterData.filterDateFrom" name="start" type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-11 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <ArrowRightIcon class="mx-2 text-gray-500" />
            <div class="relative">
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span class="text-sm text-gray-600 dark:text-gray-300"> gacha </span>
              </div>
              <input v-model.lazy="filterData.filterDateTo" name="end" type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
          <button @click="openFilter = !openFilter" class="w-full px-5 py-2 text-center text-gray-900 bg-white border rounded-lg border-slate-300 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto dark:border-0 dark:text-gray-300"><FunnelIcon class="inline-block mr-1 text-lg" /> Saralash</button>
          <div v-if="openFilter" ref="filterDropdown" class="absolute right-0 z-30 w-1/4 mt-2 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 top-11 dark:text-gray-300">
            <div @click="openFilter = false; filterData.typeBy = 'come_in'" class="px-3 py-2 border-b cursor-pointer dark:border-gray-600 dark:hover:bg-gray-700">Kelishlar</div>
            <div @click="openFilter = false; filterData.typeBy = 'go_out'" class="px-3 py-2 cursor-pointer dark:hover:bg-gray-700">Ketishlar</div>
          </div>
        </div>
      </div>
      <div v-show="arrivals.length > 0" :class="{ 'overflow-hidden': total / 10 <= 1 }" class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg arrival-wrapper border-slate-200 dark:border-gray-600 arrival-table-h">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="z-0 bg-slate-50 sticky-top">
            <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:text-gray-300 dark:bg-gray-800">
              <th class="px-4 py-3">Foydalanuvchi</th>
              <th class="px-4 py-3">Vaqti</th>
              <th class="px-4 py-3">Turi</th>
            </tr>
          </thead>
          <tbody class="h-full bg-white divide-y divide-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:divide-gray-600">
            <ArrivalItem :arrivals="arrivals" :distance="distance" :target="target" @infinite="loadArrivals" />
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="!isArrivalEmpty && arrivals.length === 0" class="flex items-start justify-center w-full h-10">
      <SpinIcon class="w-7 h-7" />
    </div>
    <h1 v-show="isArrivalEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan kelib-ketishlar hisoboti topilmadi!</h1>
  </div>
</template>

<script setup>
import 'izitoast/dist/css/iziToast.min.css'
import ArrivalItem from './Arrivals/ArrivalItem.vue'
import { reactive, ref, watch } from 'vue'
import authHeader from '../../services/auth-header'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { onClickOutside } from '@vueuse/core'
import SpinIcon from '../../assets/icons/SpinIcon.vue'
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.vue'

const target = ref('.arrival-wrapper')
const distance = ref(200)
const arrivals = ref([])
const total = ref(0)
const isArrivalEmpty = ref(false)

// Filter By
const openFilter = ref(false)
const filterDropdown = ref(null)

onClickOutside(filterDropdown, () => {
  if (openFilter.value) openFilter.value = false
})

// load default
const filterData = reactive({
  typeBy: null,
  filterDateFrom: null,
  filterDateTo: null,
})

let page = 0
const loadArrivals = async ($state) => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch('http://localhost:9000/arrival/' + page, {
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

setTimeout(() => {
  isArrivalEmpty.value = arrivals.value.length === 0
}, 700)

// load filtered
const loadFiltered = async () => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch('http://localhost:9000/arrival/' + page, {
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