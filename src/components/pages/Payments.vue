<template>
  <div class="px-5">
    <div class="flex items-center mb-5">
      <h3 class="text-2xl font-extrabold ml-2 mb-3">To'lovlar</h3>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2 w-full mb-8 overflow-hidden border border-slate-200 rounded-lg shadow-lg">
        <div class="w-full overflow-x-auto">
          <table class="w-full divide-y divide-gray-300">
            <thead class="bg-slate-50">
              <tr class="text-md font-semibold tracking-wide text-left text-gray-900">
                <th scope="col" class="px-4 py-3">To'lovchi</th>
                <th scope="col" class="px-4 py-3">To'lov vaqti</th>
                <th scope="col" class="px-4 py-3">Qiymati</th>
              </tr>
            </thead>
            <tbody class="custom-height divide-y divide-gray-200 bg-white">
              <tr class="text-md text-gray-700">
                <td class="whitespace-nowrap px-4 py-3">
                  <div class="flex items-center">
                    <div class="flex mr-3 items-center justify-center h-10 w-10 border border-gray-50 rounded-full">
                      <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="#" />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">Jumaniyozov Surojiddin</p>
                      <p class="text-sm text-gray-600">+998 (93) 747-59-95</p>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-4 py-3">
                  <p>17.06.2022 12:30</p>
                  <p>17.06.2022 12:30</p>
                </td>
                <td class="whitespace-nowrap px-4 py-3">
                  85 000.00
                  <span class="text-xs">UZS</span>
                </td>
              </tr>
              <tr class="text-md text-gray-700">
                <td class="whitespace-nowrap px-4 py-3">
                  <div class="flex items-center">
                    <div class="flex mr-3 items-center justify-center h-10 w-10 border border-gray-50 rounded-full">
                      <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="#" />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">Jumaniyozov Surojiddin</p>
                      <p class="text-sm text-gray-600">+998 (93) 747-59-95</p>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-4 py-3">
                  <p>17.06.2022 12:30</p>
                  <p>17.06.2022 12:30</p>
                </td>
                <td class="whitespace-nowrap px-4 py-3">
                  85 000.00
                  <span class="text-xs">UZS</span>
                </td>
              </tr>
              <tr class="text-md text-gray-700">
                <td class="whitespace-nowrap px-4 py-3">
                  <div class="flex items-center">
                    <div class="flex mr-3 items-center justify-center h-10 w-10 border border-gray-50 rounded-full">
                      <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="#" />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">Jumaniyozov Surojiddin</p>
                      <p class="text-sm text-gray-600">+998 (93) 747-59-95</p>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-4 py-3">
                  <p>17.06.2022 12:30</p>
                  <p>17.06.2022 12:30</p>
                </td>
                <td class="whitespace-nowrap px-4 py-3">
                  85 000.00
                  <span class="text-xs">UZS</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bg-white rounded-lg p-3 px-5 max-content-h">
        <h3 class="text-2xl font-extrabold mb-3">To'lov qo'shish</h3>
        <hr class="border-gray-200 border-dotted bottom-1 mb-6" />
        <form>
          <div class="mb-6">
            <label id="listbox-label" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">To'lovchi</label>
            <div class="mt-1 relative">
              <button type="button" class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span class="flex items-center">
                  <div class="relative inline-block rounded-full bg-slate-300 p-1 text-slate-500 shadow">
                    <UserBoldIcon class="w-5 h-5" />
                  </div>
                  <span class="ml-3 block truncate"> To'lovchini tanlang </span>
                </span>
                <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
              <!---->
              <ul class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                <li class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="flex-shrink-0 h-6 w-6 rounded-full" />
                    <span class="font-normal ml-3 block truncate"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
                <li class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="flex-shrink-0 h-6 w-6 rounded-full" />
                    <span class="font-normal ml-3 block truncate"> Jumaniyozov Surojiddin </span>
                  </div>
                  <span class="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </li>
                <li class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="flex-shrink-0 h-6 w-6 rounded-full" />
                    <span class="font-normal ml-3 block truncate"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
                <li class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="flex-shrink-0 h-6 w-6 rounded-full" />
                    <span class="font-normal ml-3 block truncate"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="mb-6">
            <label for="gender-input" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">To'lovchi</label>
            <select id="gender-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>To'lovchini tanlang</option>
              <option value="">Jumaniyozov Surojiddin / +998 (93) 747-59-95</option>
              <option value="">Jumaniyozov Surojiddin / +998 (93) 747-59-95</option>
              <option value="">Jumaniyozov Surojiddin / +998 (93) 747-59-95</option>
              <option value="">Jumaniyozov Surojiddin / +998 (93) 747-59-95</option>
              <option value="">Jumaniyozov Surojiddin / +998 (93) 747-59-95</option>
            </select>
          </div>
          <div class="mb-6">
            <label for="gender-input" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">To'lov turini </label>
            <select id="gender-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>To'lov turini tanlang</option>
              <option value="day">Kunlik</option>
              <option value="month">Oylik</option>
            </select>
          </div>
          <div class="mb-6">
            <label for="price" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Mablag'</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 text-sm"> UZS </span>
              </div>
              <input type="text" name="price" id="price" class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-11 pr-12 text-sm border border-gray-300 text-gray-900 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" />
              <div class="absolute inset-y-0 right-0 flex items-center">
                <select id="currency" name="currency" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                  <option>UZB</option>
                </select>
              </div>
            </div>
          </div>
          <hr class="border-gray-200 border-dotted bottom-1 mb-6" />
          <div class="flex justify-end">
            <input type="reset" class="mx-1 bg-blue-200 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" value="Tozalash" />
            <button type="submit" class="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Jo'natish</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserBoldIcon from '../../assets/icons/UserBoldIcon.vue'
</script>