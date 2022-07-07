<template>
  <div class="h-full px-5">
    <div class="mb-5 flex items-center">
      <h3 class="ml-2 mb-3 text-2xl font-extrabold dark:text-gray-300">To'lovlar</h3>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <div v-show="payments.length > 0" class="w-full overflow-x-auto mb-8 rounded-lg border border-slate-200 shadow-lg dark:border-gray-600">
          <table class="w-full divide-y divide-gray-300">
            <thead class="bg-slate-50">
              <tr class="text-md text-left font-semibold tracking-wide text-gray-900 dark:text-gray-300 dark:bg-gray-800">
                <th scope="col" class="px-4 py-3">To'lovchi</th>
                <th scope="col" class="px-4 py-3">To'lov vaqti</th>
                <th scope="col" class="px-4 py-3">To'lov turi</th>
                <th scope="col" class="px-4 py-3">Qiymati</th>
              </tr>
            </thead>
            <tbody class="custom-height divide-y divide-gray-200 bg-white dark:text-gray-300 dark:bg-gray-800">
              <tr v-for="(payment, index) in payments" :key="index" class="text-md text-gray-700">
                <td class="whitespace-nowrap px-4 py-3">
                  <div class="flex items-center">
                    <div class="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-50">
                      <img class="h-full w-full rounded-full object-cover" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="#" />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900">{{ payment.member.firstname + " " + payment.member.lastname }}</p>
                      <p class="text-sm text-gray-600">{{ phoneStyle(payment.member.phone) }}</p>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-4 py-3">
                  <p>{{ payment.payment.createdAt }}</p>
                  <p>{{ payment.payment.expiredAt }}</p>
                </td>
                <td class="whitespace-nowrap px-4 py-3">{{ paymentTypeTranslate(payment.payment.paymentType) }}</td>
                <td class="whitespace-nowrap px-4 py-3">
                  {{ payment.payment.cost }}
                  <span class="text-xs">UZS</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 v-show="payments.length === 0" class="text-red-500 text-xl text-center">Ma'lumotlar bazasida to'lovlar hisoboti topilmadi!</h1>
      </div>
      <div class="max-content-h rounded-lg bg-white p-3 px-5 dark:text-gray-300 dark:bg-gray-800">
        <h3 class="mb-3 text-2xl font-extrabold">To'lov qo'shish</h3>
        <hr class="bottom-1 mb-6 border border-gray-200 dark:border-gray-600" />
        <form>
          <div class="mb-6">
            <label id="listbox-label" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">To'lovchi</label>
            <div class="relative mt-1" x-data="{selectOption: false}" x-on:click.outside="selectOption = false">
              <button x-on:click="selectOption = true" type="button" class="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span class="flex items-center">
                  <div class="relative inline-block rounded-full bg-slate-300 p-1 text-slate-500 shadow">
                    <UserBoldIcon class="h-5 w-5" />
                  </div>
                  <span x-show="!selectOption" class="text-md ml-3 block truncate"> To'lovchini tanlang </span>
                  <input x-show="selectOption" type="text" class="ml-3 border-transparent p-0 focus:border-transparent focus:ring-0 dark:bg-gray-700 dark:placeholder-gray-400" placeholder="Ism bo'yicha izlash" />
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </span>
              </button>
              <ul x-show="selectOption" class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 border dark:border-gray-600 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                <li x-on:click="selectOption = false" class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center dark:text-gray-300">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                    <span class="ml-3 block truncate font-normal"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
                <li x-on:click="selectOption = false" class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center dark:text-gray-300">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                    <span class="ml-3 block truncate font-normal"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
                <li x-on:click="selectOption = false" class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center dark:text-gray-300">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                    <span class="ml-3 block truncate font-normal"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
                <li x-on:click="selectOption = false" class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center dark:text-gray-300">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                    <span class="ml-3 block truncate font-normal"> Jumaniyozov Surojiddin </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <label for="price" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">To'lov turi</label>
          <div class="mb-6 flex items-center justify-around rounded-lg border border-gray-300 p-0 dark:border-gray-600">
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
          <hr class="bottom-1 mb-6 border border-gray-200 dark:border-gray-600" />
          <div class="flex justify-end">
            <input type="reset" class="mx-1 w-full rounded-lg bg-blue-200 px-5 py-2.5 text-center cursor-pointer text-sm font-medium hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto dark:text-white" value="Tozalash" />
            <button type="submit" class="mx-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">Jo'natish</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import UserBoldIcon from '../../assets/icons/UserBoldIcon.vue'
import CheckIcon from '../../assets/icons/CheckIcon.vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const store = useStore()

const payments = computed(() => {
  return store.state.payments
})

const paymentTypeTranslate = (type) => {
  switch (type) {
    case 'daily':
      return 'Kunlik to\'lov'
    case 'monthly':
      return 'Oylik to\'lov'
    default:
      return ''
  }
}

const phoneStyle = (phone) => {
  return `${phone.slice(0, 4)} (${phone.slice(4, 6)}) ${phone.slice(6, 9)}-${phone.slice(9, 11)}-${phone.slice(11, 13)}`
}

const getPayments = () => {
  store.dispatch('paymentModule/get').then(
    (data) => {
      store.commit('setPayment', data)
    },
    (error) => {
      notify.warning({
        message: "Ma\'lumotlarni bazadan olishda xatolik yuz berdi!",
        position: 'bottomLeft',
      })
    }
  )
}

onMounted(() => getPayments())
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
  background-color: #3B82F6;
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
