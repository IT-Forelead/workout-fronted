<template>
  <div>
    <div class="h-full px-5">
      <div class="flex items-center mb-5">
        <h3 class="text-2xl font-extrabold ml-2 mb-3 dark:text-gray-300">Kelib-ketishlar</h3>
      </div>
      <div v-show="arrivals.length > 0" class="mb-32 overflow-x-auto grid grid-cols-1 border border-slate-200 rounded-lg shadow-lg dark:border-gray-600">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="bg-slate-50">
              <tr class="text-md font-semibold tracking-wide text-left text-gray-900 dark:text-gray-300 dark:bg-gray-800">
                <th class="px-4 py-3">Foydalanuvchi</th>
                <th class="px-4 py-3">Vaqti</th>
                <th class="px-4 py-3">Turi</th>
              </tr>
            </thead>
          <tbody class="h-full divide-y divide-gray-200 bg-white dark:text-gray-300 dark:bg-gray-800 dark:divide-gray-600">
            <ArrivalItem :arrivals="arrivals" @infinite="loadArrivals"/>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-center items-start h-10 w-full">
      <SpinIcon v-show="arrivals.length === 0" class="w-7 h-7" />
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