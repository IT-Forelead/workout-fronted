<template>
  <div>
    <div class="h-full px-5">
      <div class="flex justify-between items-center mb-5">
        <h3 class="text-2xl font-extrabold ml-2 mb-3 dark:text-gray-300">Kelib-ketishlar</h3>
        <div class="hidden lg:flex lg:justify-between lg:items-center">
          <div class="flex items-center mr-3">
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span class="text-sm text-gray-600 dark:text-gray-300"> dan </span>
              </div>
              <input name="start" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-11 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
            </div>
            <ArrowRightIcon  class="mx-2 text-gray-500"/>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span class="text-sm text-gray-600 dark:text-gray-300"> gacha </span>
              </div>
              <input name="end" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
            </div>
          </div>
          <button class="border-slate-300 w-full rounded-lg border bg-white px-5 py-2 text-center text-gray-900 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto dark:border-0 dark:text-gray-300"><FunnelIcon class="mr-1 inline-block text-lg" /> Saralash</button>
        </div>
      </div>
      <div v-show="arrivals.length > 0" :class="{'overflow-hidden': total / 10 <= 1}" class="arrival-wrapper overflow-x-auto grid grid-cols-1 border border-slate-200 rounded-lg shadow-lg dark:border-gray-600 arrival-table-h">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="bg-slate-50 sticky-top z-0">
              <tr class="text-md font-semibold tracking-wide text-left text-gray-900 dark:text-gray-300 dark:bg-gray-800">
                <th class="px-4 py-3">Foydalanuvchi</th>
                <th class="px-4 py-3">Vaqti</th>
                <th class="px-4 py-3">Turi</th>
              </tr>
            </thead>
          <tbody class="h-full divide-y divide-gray-200 bg-white dark:text-gray-300 dark:bg-gray-800 dark:divide-gray-600">
            <ArrivalItem :arrivals="arrivals" :distance="distance" :target="target" @infinite="loadArrivals"/>
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="!isArrivalEmpty && arrivals.length === 0" class="flex justify-center items-start h-10 w-full">
      <SpinIcon class="w-7 h-7" />
    </div>
    <h1 v-show="isArrivalEmpty" class="text-red-500 text-xl text-center">Ma'lumotlar bazasidan kelib-ketishlar hisoboti topilmadi!</h1>
  </div>
</template>

<script setup>
import 'izitoast/dist/css/iziToast.min.css'
import ArrivalItem from './Arrivals/ArrivalItem.vue'
import { ref } from 'vue'
import authHeader from '../../services/auth-header'
import SpinIcon from "../../assets/icons/SpinIcon.vue";
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.vue'


const target = ref('.arrival-wrapper')
const distance = ref(200)
const arrivals = ref([])
const total = ref(0)

let page = 0
const loadArrivals = async ($state) => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch('http://localhost:9000/arrival/' + page, {
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

const isArrivalEmpty = ref(false)

setTimeout(() => {
  isArrivalEmpty.value = arrivals.value.length === 0
}, 700)
</script>

<style scoped>
.arrival-table-h {
  max-height: 75vh;
}
</style>