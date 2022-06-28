<template>
  <div class="h-full px-5">
    <div class="mb-5 flex items-center">
      <h3 class="ml-2 mb-3 text-2xl font-extrabold">To'lovlar</h3>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2 mb-8 w-full overflow-hidden rounded-lg border border-slate-200 shadow-lg">
        <div class="w-full overflow-x-auto">
          <table class="w-full divide-y divide-gray-300">
            <thead class="bg-slate-50">
              <tr class="text-md text-left font-semibold tracking-wide text-gray-900">
                <th scope="col" class="px-4 py-3">To'lovchi</th>
                <th scope="col" class="px-4 py-3">To'lov vaqti</th>
                <th scope="col" class="px-4 py-3">Qiymati</th>
              </tr>
            </thead>
            <tbody class="custom-height divide-y divide-gray-200 bg-white">
              <tr class="text-md text-gray-700">
                <td class="whitespace-nowrap px-4 py-3">
                  <div class="flex items-center">
                    <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-50">
                      <img class="h-full w-full rounded-full object-cover" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="#" />
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
                    <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-50">
                      <img class="h-full w-full rounded-full object-cover" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="#" />
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
                    <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-50">
                      <img class="h-full w-full rounded-full object-cover" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="#" />
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
      <div class="max-content-h rounded-lg bg-white p-3 px-5">
        <h3 class="mb-3 text-2xl font-extrabold">To'lov qo'shish</h3>
        <hr class="bottom-1 mb-6 border-dotted border-gray-200" />
        <form>
          <div class="mb-6">
            <label id="listbox-label" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">To'lovchi</label>
            <div class="relative mt-1" x-data="{selectOption: false}" x-on:click.outside="selectOption = false">
              <button x-on:click="selectOption = true" type="button" class="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span class="flex items-center">
                  <div class="relative inline-block rounded-full bg-slate-300 p-1 text-slate-500 shadow">
                    <UserBoldIcon class="h-5 w-5" />
                  </div>
                  <span x-show="!selectOption" class="text-md ml-3 block truncate"> To'lovchini tanlang </span>
                  <input x-show="selectOption" type="text" class="ml-3 border-transparent p-0 focus:border-transparent focus:ring-0" placeholder="Ism bo'yicha izlash" />
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
              <ul x-show="selectOption" class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                <li x-on:click="selectOption = false" class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                    <span class="ml-3 block truncate font-normal"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
                <li x-on:click="selectOption = false" class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                    <span class="ml-3 block truncate font-normal"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
                <li x-on:click="selectOption = false" class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                    <span class="ml-3 block truncate font-normal"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
                <li x-on:click="selectOption = false" class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                    <span class="ml-3 block truncate font-normal"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <label for="price" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">To'lov turi</label>
          <div class="mb-6 flex items-center justify-around rounded-lg border border-gray-300 p-0">
            <input id="toggle-on" class="toggle toggle-left" name="toggle" value="false" type="radio" checked />
            <label for="toggle-on" class="flex justify-center items-center relative py-2.5"><span class="mr-2 hidden"><CheckIcon /></span> Oylik to'lov</label>
            <input id="toggle-off" class="toggle toggle-right" name="toggle" value="true" type="radio" />
            <label for="toggle-off" class="flex justify-center items-center relative py-2.5"><span class="mr-2 hidden"><CheckIcon /></span> Kunlik to'lov</label>
          </div>
          <div class="mb-6">
            <label for="price" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">Mablag'</label>
            <div class="relative rounded-md shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-sm text-gray-500"> UZS </span>
              </div>
              <input type="text" name="price" id="price" class="block w-full rounded-lg border border-gray-300 pl-11 pr-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="0.00" />
            </div>
          </div>
          <hr class="bottom-1 mb-6 border-dotted border-gray-200" />
          <div class="flex justify-end">
            <input type="reset" class="mx-1 w-full rounded-lg bg-blue-200 px-5 py-2.5 text-center text-sm font-medium hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto" value="Tozalash" />
            <button type="submit" class="mx-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">Jo'natish</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserBoldIcon from '../../assets/icons/UserBoldIcon.vue'
import CheckIcon from '../../assets/icons/CheckIcon.vue'
</script>

<style scoped>
input[type='radio'].toggle {
  display: none;
}
input[type='radio'].toggle + label {
  cursor: pointer;
  width: 50%;
}
input[type='radio'].toggle.toggle-left + label {
  border-right: 0;
}
input[type='radio'].toggle.toggle-left + label:after {
  left: 100%;
}
input[type='radio'].toggle.toggle-right + label {
  margin-left: -5px;
}
input[type='radio'].toggle.toggle-right + label:after {
  left: -100%;
}
input[type='radio'].toggle:checked + label {
  cursor: default;
  color: #fff;
  background-color: rgb(118, 169, 250);
  border-radius: 6px;
  transition: color 300ms;
}
input[type='radio'].toggle:checked + label > span {
  display: inline-block;
}
input[type='radio'].toggle:checked + label:after {
  left: 0;
}
</style>
