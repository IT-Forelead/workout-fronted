<template>
  <div>
    <div class="h-full px-5">
      <div class="mb-5">
        <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">Kutishdagi mijozlar</h3>
      </div>
      <div class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg arrival-wrapper border-slate-200 dark:border-gray-600 arrival-table-h">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="z-0 shadow sticky-top bg-slate-50 dark:shadow-gray-600">
            <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:text-gray-300 dark:bg-gray-800">
              <th class="px-4 py-3">Mijoz</th>
              <th class="px-4 py-3">Fitnes klub</th>
              <th class="px-4 py-3 text-">Amallar</th>
            </tr>
          </thead>
          <tbody class="h-full bg-white divide-y divide-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:divide-gray-600">
            <tr class="text-md text-gray-700 dark:text-gray-300">
              <td class="whitespace-nowrap px-4 py-3">
                <div class="flex items-center">
                  <div class="bg-gray-500 text-white flex mr-3 items-center justify-center h-10 w-10 border border-gray-50 dark:border-gray-600 rounded-full">J</div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-300">Jumaniyozov Suroj</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">+998937475995</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-3">
                <p>Klub nomi: GYM-Forelead</p>
                <p>Oylik to'lovi: 80 000 uzs</p>
                <p>Kunlik to'lovi: 10 000 uzs</p>
              </td>
              <td class="whitespace-nowrap px-4 py-3">
                <button class="w-full px-5 py-2 text-center text-gray-900 bg-white border rounded-lg border-slate-300 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto dark:border-0 dark:text-gray-300">Aktivlash</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 
    <div v-show="!isArrivalEmpty && arrivals.length === 0" class="flex items-start justify-center w-full h-10">
      <SpinIcon class="w-7 h-7" />
    </div>
    <h1 v-show="isArrivalEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan kelib-ketishlar hisoboti topilmadi!</h1> -->
  </div>
</template>