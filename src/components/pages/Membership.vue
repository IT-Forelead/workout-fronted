<template>
  <div class="px-5">
    <div class="mb-5 flex items-center justify-between">
      <h3 class="ml-2 mb-3 text-2xl font-extrabold">A'zolar</h3>
      <div>
        <div class="relative mr-3 inline-block">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" class="focus:shadow-outline p-4 focus:outline-none">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="h-5 w-5 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input type="search" name="search" class="w-96 rounded-lg border border-slate-300 bg-white py-1.5 pl-16 text-lg text-slate-500 outline-none focus:bg-slate-200 focus:outline-none" placeholder="Izlash..." autocomplete="off" />
        </div>
        <button class="bordeer-slare-300 mr-3 w-full rounded-lg border bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"><FunnelIcon class="inline-block text-lg mr-1" /> Saralash</button>
        <button x-on:mouseenter="open = true" x-on:mouseleave="open = false" @click="openAddMemberModal()" class="mx-1 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">A'zo qo'shish</button>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4">
      <div class="max-w-sm overflow-hidden rounded-xl bg-white shadow-md">
        <img src="../../assets/images/bg-login.jpg" alt="#" class="h-auto w-full" />
        <div class="flex flex-col justify-center p-5 text-center" x-data="{open: false}">
          <h3 class="text-md mb-2 font-extrabold">Jumaniyozov Surojiddin</h3>
          <p class="text-medium mb-3 text-gray-600">+998 (93) 747-59-95</p>
          <button x-on:mouseenter="open = true" x-on:mouseleave="open = false" @click="openModal()" class="mx-14 flex items-center justify-center rounded-md border border-slate-300 bg-white py-2 px-5 text-gray-500 transition-all duration-200 ease-in hover:bg-slate-100">Batafsil <ArrowRightIcon x-show="open" class="ml-3 animate-pulse text-xl transition-all duration-500 ease-in" /></button>
        </div>
      </div>
    </div>
  </div>

  <!-- Member Info Modal -->
  <div v-show="isModalOpen" class="fixed top-0 right-0 left-0 z-50 h-modal w-full overflow-y-auto overflow-x-hidden backdrop-brightness-50 md:inset-0 md:h-full">
    <div class="relative top-1/2 left-1/2 h-full w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 p-4 md:h-auto">
      <div class="relative rounded-lg bg-white shadow-lg dark:bg-gray-700">
        <div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
          <div class="text-xl font-semibold text-gray-900 dark:text-white">
            <div class="flex items-center">
              <img src="../../assets/images/bg-login.jpg" alt="Avatar" class="ml-2 h-20 w-20 rounded-full" />
              <div class="ml-4 pr-2">
                <h3>Admin Adminjonov</h3>
                <h5 class="text-sm">+998(99) 123-45-67</h5>
                <h6 class="text-sm text-gray-500">12.02.2022</h6>
              </div>
            </div>
          </div>
          <button type="button" @click="closeModal()" class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div class="grid grid-cols-3 gap-4 p-6">
          <div class="col-span-2">
            <h2 class="font-bold text-xl mb-3">To'lovlar hisoboti</h2>
            <div class="w-full mb-8 overflow-hidden border border-slate-200 rounded-lg shadow-lg">
              <div class="w-full overflow-x-auto">
                <table class="w-full divide-y divide-gray-300">
                  <thead class="bg-slate-50">
                    <tr class="text-md font-semibold tracking-wide text-left text-gray-900">
                      <th scope="col" class="px-4 py-3">To'lov vaqti</th>
                      <th scope="col" class="px-4 py-3">To'lov turi</th>
                      <th scope="col" class="px-4 py-3">Qiymati</th>
                    </tr>
                  </thead>
                  <tbody class="custom-height divide-y divide-gray-200 bg-white">
                    <tr class="text-md text-gray-700">
                      <td class="whitespace-nowrap px-4 py-3">
                        <p><CalendarCheckIcon class="inline-block text-lg mr-1" /> 17.06.2022 12:30</p>
                        <p><CalendarXIcon class="inline-block text-lg mr-1" /> 17.06.2022 12:30</p>
                      </td>
                      <td class="whitespace-nowrap px-4 py-3">Oylik</td>
                      <td class="whitespace-nowrap px-4 py-3">
                        85 000.00
                        <span class="text-xs">UZS</span>
                      </td>
                    </tr>
                    <tr class="text-md text-gray-700">
                      <td class="whitespace-nowrap px-4 py-3">
                        <p><CalendarCheckIcon class="inline-block text-lg mr-1" /> 17.06.2022 12:30</p>
                        <p><CalendarXIcon class="inline-block text-lg mr-1" /> 17.06.2022 12:30</p>
                      </td>
                      <td class="whitespace-nowrap px-4 py-3">Oylik</td>
                      <td class="whitespace-nowrap px-4 py-3">
                        85 000.00
                        <span class="text-xs">UZS</span>
                      </td>
                    </tr>
                    <tr class="text-md text-gray-700">
                      <td class="whitespace-nowrap px-4 py-3">
                        <p><CalendarCheckIcon class="inline-block text-lg mr-1" /> 17.06.2022 12:30</p>
                        <p><CalendarXIcon class="inline-block text-lg mr-1" /> 17.06.2022 12:30</p>
                      </td>
                      <td class="whitespace-nowrap px-4 py-3">Oylik</td>
                      <td class="whitespace-nowrap px-4 py-3">
                        85 000.00
                        <span class="text-xs">UZS</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <h2 class="font-bold text-xl mb-3">Kelib-ketishlar</h2>
            <div class="w-full mb-8 overflow-hidden border border-slate-200 rounded-lg shadow-lg">
              <div class="w-full overflow-x-auto">
                <table class="w-full divide-y divide-gray-300">
                  <thead class="bg-slate-50">
                    <tr class="text-md font-semibold tracking-wide text-left text-gray-900">
                      <th scope="col" class="px-4 py-3">Kelishlar vaqti</th>
                    </tr>
                  </thead>
                  <tbody class="custom-height divide-y divide-gray-200 bg-white">
                    <tr class="text-md text-gray-700">
                      <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="inline-block text-lg mr-1" /> 17.06.2022 12:30</td>
                    </tr>
                    <tr class="text-md text-gray-700">
                      <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="inline-block text-lg mr-1" /> 17.06.2022 12:30</td>
                    </tr>
                    <tr class="text-md text-gray-700">
                      <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="inline-block text-lg mr-1" /> 17.06.2022 12:30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
          <button type="button" @click="closeModal()" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yopish</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Member Info Modal -->
  <div v-show="isAddMemberModalOpen" class="fixed top-0 right-0 left-0 z-50 h-modal w-full overflow-y-auto overflow-x-hidden backdrop-brightness-50 md:inset-0 md:h-full">
    <div class="relative top-1/2 left-1/2 h-full w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 p-4 md:h-auto">
      <div class="relative rounded-lg bg-white shadow-lg dark:bg-gray-700">
        <div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Yangi a'zo qo'shish</h3>
          <button type="button" @click="closeAddMemberModal()" class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-3 border border-gray-300 rounded-lg p-3 mb-3">
            <div class="flex justify-between items-center">
              <div class="flex justify-between items-center">
                <div class="flex justify-center items-center rounded-full bg-blue-500 text-2xl text-white h-10 w-10">
                  <CheckIcon />
                </div>
                <div class="text-md font-semibold text-gray-700 ml-3">A'zo qo'shish</div>
              </div>
              <div class="relative -left-8 mt-1">
                <div class="absolute bottom-0 h-9 border-r border-gray-300 -rotate-25 rounded-lg"></div>
                <div class="absolute -top-1 h-9 border-r border-gray-300 rotate-25 rounded-lg"></div>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex justify-between items-center">
                <div class="flex justify-center items-center rounded-full bg-white border-2 border-blue-500 text-md font-semibold text-blue-500 h-10 w-10">02</div>
                <div class="text-md font-semibold text-blue-500 ml-3">Tasdiqlash</div>
              </div>
              <div class="relative -left-8 mt-1">
                <div class="absolute bottom-0 h-9 border-r border-gray-300 -rotate-25 rounded-lg"></div>
                <div class="absolute -top-1 h-9 border-r border-gray-300 rotate-25 rounded-lg"></div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="flex justify-center items-center rounded-full bg-white border-2 border-gray-300 text-md font-semibold text-gray-500 h-10 w-10">03</div>
              <div class="text-md font-semibold text-gray-500 ml-3">Yakunlash</div>
            </div>
          </div>
        </div>
        <div class="flex flex-col p-5 mb-5">
          <label for="dropzone-file" class="relative mx-auto cursor-pointer flex justify-center w-24 h-24 max-w-lg items-center rounded-full border-2 border-dashed border-blue-400 bg-slate-100 p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="h-10 w-10 text-blue-500 iconify iconify--ph" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
              <path fill="currentColor" d="M236 184V56a20.1 20.1 0 0 0-20-20H40a20.1 20.1 0 0 0-20 20v144a20.1 20.1 0 0 0 20 20h176a20.1 20.1 0 0 0 20-20v-16ZM212 60v95l-21.9-21.8a19.8 19.8 0 0 0-28.2 0L144 151l-41.9-41.8a19.9 19.9 0 0 0-28.2 0L44 139V60ZM44 196v-23l44-44l41.9 41.8a19.8 19.8 0 0 0 28.2 0L176 153l36 36v7Zm100.7-84.7A15.9 15.9 0 0 1 140 100a16 16 0 0 1 32 0a16 16 0 0 1-16 16a15.9 15.9 0 0 1-11.3-4.7Z"></path>
            </svg>
            <input id="dropzone-file" type="file" class="hidden" />
            <h3 class="absolute -bottom-10 mx-auto whitespace-nowrap text-lg font-semibold text-blue-500 tracking-wide mt-3">Fotosuratni yuklash</h3>
          </label>
        </div>
        <div class="grid gap-6 mb-6 lg:grid-cols-2 p-5">
          <div class="p-3">
            <label for="first_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">First name</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
          <div class="p-3">
            <label for="last_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Last name</label>
            <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
          </div>
          <div class="p-3">
            <label for="company" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Company</label>
            <input type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
          </div>
          <div class="p-3">
            <label for="phone" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Phone number</label>
            <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
          </div>
        </div>
        <div class="flex items-center justify-between space-x-2 rounded-b border-t border-gray-200 p-5 dark:border-gray-600">
          <button type="button" @click="closeAddMemberModal()" class="px-4 py-2 bg-gray-200 border border-gray-300 outline-none rounded text-gray-700 shadow-gray-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-gray-300 focus:bg-gray-300 focus:ring-gray-400 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">Yopish</button>
          <div>
            <button class="px-4 py-2 border border-teal-500 bg-teal-500 text-white outline-none rounded font-medium mr-2 active:scale-95 hover:bg-teal-400 hover:text-white focus:ring-teal-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">Tozalash</button>
            <button class="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200">Jo'natish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.vue'
import CalendarBlankIcon from '../../assets/icons/CalendarBlankIcon.vue'
import CalendarCheckIcon from '../../assets/icons/CalendarCheckIcon.vue'
import CalendarXIcon from '../../assets/icons/CalendarXIcon.vue'
import { ref } from 'vue'
import CheckIcon from '../../assets/icons/CheckIcon.vue'

const isModalOpen = ref(false)
const isAddMemberModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const openAddMemberModal = () => {
  isAddMemberModalOpen.value = true
}

const closeAddMemberModal = () => {
  isAddMemberModalOpen.value = false
}
</script>

<style scoped>
.-rotate-25 {
  transform: rotate(-25deg);
}
.rotate-25 {
  transform: rotate(25deg);
}
</style>