<template>
  <div class="px-5">
    <div class="flex justify-between items-center mb-5">
      <h3 class="text-2xl font-extrabold ml-2 mb-3">A'zolar</h3>
      <div>
        <div class="relative inline-block mr-3">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" class="focus:shadow-outline p-4 focus:outline-none">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="h-5 w-5 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input type="search" name="search" class="w-96 rounded-lg border border-slate-300 bg-white py-1.5 pl-16 text-lg text-slate-500 outline-none focus:bg-slate-200 focus:outline-none" placeholder="Izlash..." autocomplete="off" />
        </div>
        <button type="submit" class="mr-3 text-gray-900 bg-white border bordeer-slare-300 hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Saralash</button>
        <button type="submit" class="mx-1 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">A'zo qo'shish</button>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <div class="max-w-sm overflow-hidden rounded-xl bg-white shadow-md">
        <img src="../../assets/images/bg-login.jpg" alt="#" class="h-auto w-full" />
        <div class="flex flex-col justify-center p-5 text-center">
          <h3 class="text-md font-extrabold mb-2">Jumaniyozov Surojiddin</h3>
          <p class="text-medium mb-3 text-gray-600">+998 (93) 747-59-95</p>
          <button class="rounded-md mx-14 bg-white py-2 px-5 border border-slate-300 text-gray-500 hover:bg-slate-100 flex justify-center items-center">Batafsil <ArrowRightIcon class="text-xl ml-3"/></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.vue';



</script>