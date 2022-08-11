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
              <input name="start" type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-11 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <ArrowRightIcon class="mx-2 text-gray-500" />
            <div class="relative">
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span class="text-sm text-gray-600 dark:text-gray-300"> gacha </span>
              </div>
              <input name="end" type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
          </div>
          <button class="w-full px-5 py-2 text-center text-gray-900 bg-white border rounded-lg border-slate-300 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto dark:border-0 dark:text-gray-300">
            <div class="flex items-center">
              <FunnelIcon class="inline-block mr-1 text-lg" />
              <span class="flex items-center">Saralash</span>
            </div>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg messages-wrapper messages-table-h border-slate-200 dark:border-gray-600">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="z-0 shadow sticky-top bg-slate-50 dark:shadow-gray-600">
            <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:bg-gray-800 dark:text-gray-300">
              <th scope="col" class="px-4 py-5">Jo'natuvchi</th>
              <th scope="col" class="px-4 py-5">Qabul qiluvchi</th>
              <th scope="col" class="px-4 py-5">Yuborilgan vaqti</th>
              <th scope="col" class="px-4 py-5">SMS matni</th>
              <th scope="col" class="px-4 py-5">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="inline-block w-10 h-10 p-1 mr-3 border rounded-full shadow border-gray-50 dark:border-gray-600 bg-slate-300 dark:bg-gray-800 text-slate-500 dark:text-gray-500">
                    <UserBoldIcon class="w-full h-full" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-300">Jumaniyozov Surojiddin</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">+998937475995</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="inline-block w-10 h-10 p-1 mr-3 border rounded-full shadow border-gray-50 dark:border-gray-600 bg-slate-300 dark:bg-gray-800 text-slate-500 dark:text-gray-500">
                    <UserBoldIcon class="w-full h-full" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-300">Jumaniyozov Surojiddin</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">+998937475995</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <CalendarBlankIcon class="inline-block mr-1 text-lg" /> 08.08.2202 12:12
              </td>
              <td class="px-4 py-3 whitespace-nowrap">Parolni qayta tiklash uchun quydagi havolaga o'ting https://trim.uz/reset-password/unB9G</td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-5 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-lg dark:text-green-100 dark:bg-green-700">Yetkazildi</span>
              </td>
            </tr>
            <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="inline-block w-10 h-10 p-1 mr-3 border rounded-full shadow border-gray-50 dark:border-gray-600 bg-slate-300 dark:bg-gray-800 text-slate-500 dark:text-gray-500">
                    <UserBoldIcon class="w-full h-full" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-300">Jumaniyozov Surojiddin</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">+998937475995</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="inline-block w-10 h-10 p-1 mr-3 border rounded-full shadow border-gray-50 dark:border-gray-600 bg-slate-300 dark:bg-gray-800 text-slate-500 dark:text-gray-500">
                    <UserBoldIcon class="w-full h-full" />
                  </div>
                  <div class="font-semibold text-gray-900 dark:text-gray-300">+998937475995</div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <CalendarBlankIcon class="inline-block mr-1 text-lg" /> 08.08.2022 12:12
              </td>
              <td class="px-4 py-3 whitespace-nowrap">Parolni qayta tiklash uchun quydagi havolaga o'ting https://trim.uz/reset-password/unB9G</td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-5 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-lg dark:text-green-100 dark:bg-green-700">Yetkazildi</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex items-start justify-center w-full h-10">
      <SpinIcon class="h-7 w-7" />
    </div>
    <h1 class="text-xl text-center text-red-500">Ma'lumotlar bazasidan smslar hisoboti topilmadi!</h1>
  </div>
</template>

<script setup>
import SpinIcon from '../../../assets/icons/SpinIcon.vue'
import FunnelIcon from '../../../assets/icons/FunnelIcon.vue'
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon.vue'
import UserBoldIcon from '../../../assets/icons/UserBoldIcon.vue'
import CalendarBlankIcon from '../../../assets/icons/CalendarBlankIcon.vue'
</script>

<style scoped>
.messages-table-h {
  max-height: 75vh;
}
</style>
