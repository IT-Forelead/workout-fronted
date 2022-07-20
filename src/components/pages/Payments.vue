<template>
  <div class="h-full px-5">
    <div class="relative z-0 grid grid-cols-1 md:gap-4 lg:grid-cols-3">
      <div class="order-last w-full col-span-2 overflow-x-auto lg:order-first">
        <div class="flex items-center justify-between p-1 mb-5">
          <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">To'lovlar</h3>
          <div class="relative hidden lg:flex lg:items-center lg:justify-between">
            <div class="flex items-center mr-3">
              <div class="relative">
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span class="text-sm text-gray-600 dark:text-gray-300"> dan </span>
                </div>
                <input v-model.lazy="filterData.filterDateFrom" name="start" type="datetime-local" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-11 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm" placeholder="Select date start" />
              </div>
              <ArrowRightIcon class="mx-2 text-gray-500" />
              <div class="relative">
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span class="text-sm text-gray-600 dark:text-gray-300"> gacha </span>
                </div>
                <input v-model.lazy="filterData.filterDateTo" name="end" type="datetime-local" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-14 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm" placeholder="Select date start" />
              </div>
            </div>
            <button @click="openFilter = !openFilter" class="w-full px-5 py-2 text-center text-gray-900 bg-white border rounded-lg border-slate-300 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-0 dark:bg-blue-600 dark:text-gray-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
              <div class="flex items-center">
                <FunnelIcon class="inline-block mr-1 text-lg" />
                <span class="flex items-center">{{ currentFilter === '' ? 'Saralash' : currentFilter }} <TimesIcon v-if="currentFilter !== ''" @click="defaultView()" class="w-5 h-5 ml-2 text-gray-700 cursor-pointer hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"/></span>
              </div>
            </button>
            <div v-if="openFilter" ref="filterDropdown" class="absolute right-0 z-30 w-1/4 mt-2 bg-white border rounded-lg top-11 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <div @click="filterDropdownClick('monthly'); currentFilter = 'Oylik to\'lovlar'" class="px-3 py-2 border-b cursor-pointer dark:border-gray-600 dark:hover:bg-gray-700">Oylik to'lovlar</div>
              <div @click="filterDropdownClick('daily'); currentFilter = 'Kunlik to\'lovlar'" class="px-3 py-2 cursor-pointer dark:hover:bg-gray-700">Kunlik To'lovlar</div>
            </div>
          </div>
        </div>
        <div v-show="payments.length > 0" :class="{ 'overflow-hidden': total / 10 <= 1 || Object.keys(selectedPayment).length !== 0 }" class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg payments-wrapper payment-table-h border-slate-200 dark:border-gray-600">
          <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
            <thead class="z-0 shadow sticky-top bg-slate-50 shadow-gray-600">
              <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:bg-gray-800 dark:text-gray-300">
                <th scope="col" class="px-4 py-3">To'lovchi</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">To'lov vaqti</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">To'lov turi</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">Qiymati</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 custom-height dark:divide-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <PaymentItem :payments="payments" :distance="distance" :target="target" @infinite="loadPayments" />
            </tbody>
          </table>
        </div>
        <div v-show="!isPaymentEmpty && payments.length === 0" class="flex items-start justify-center w-full h-10">
          <SpinIcon class="h-7 w-7" />
        </div>
        <h1 v-show="isPaymentEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan to'lovlar hisoboti topilmadi!</h1>
      </div>
      <div class="order-first p-3 px-5 mb-3 bg-white rounded-lg max-content-h dark:bg-gray-800 dark:text-gray-300 lg:order-last">
        <h3 class="mb-3 text-2xl font-extrabold">To'lov qo'shish</h3>
        <hr class="mb-6 border border-gray-200 bottom-1 dark:border-gray-600" />
        <form @submit.prevent="createPayment()">
          <div class="mb-6">
            <label id="listbox-label" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">To'lovchi</label>
            <div class="relative mt-1" x-data="{selectOption: false}" x-on:click.outside="selectOption = false">
              <button x-on:click="selectOption = true" type="button" class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 sm:text-sm" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span class="flex items-center" v-if="!selectedMember">
                  <span class="relative inline-block p-1 rounded-full shadow bg-slate-300 text-slate-500 dark:bg-gray-800 dark:text-gray-500">
                    <UserBoldIcon class="w-5 h-5" />
                  </span>
                  <span x-show="!selectOption" class="block ml-3 truncate text-md"> To'lovchini tanlang</span>
                  <input x-show="selectOption" type="text" v-model="search" class="p-0 ml-3 border-transparent focus:border-transparent focus:ring-0 dark:bg-gray-700 dark:placeholder-gray-400" placeholder="Ism bo'yicha izlash" />
                </span>
                <span class="flex items-center" v-if="Object.keys(selectedMember).length !== 0">
                  <span class="relative inline-block p-1 rounded-full shadow bg-slate-300 text-slate-500 dark:bg-gray-800 dark:text-gray-500">
                    <img class="w-5 h-5" :src="'http://localhost:9000/member/image/' + selectedMember.image" alt="#" />
                  </span>
                  <span x-show="!selectOption" class="block ml-3 truncate text-md"> {{ selectedMember.firstname + ' ' + selectedMember.lastname }}</span>
                  <input x-show="selectOption" type="text" v-model="search" class="p-0 ml-3 border-transparent focus:border-transparent focus:ring-0 dark:bg-gray-700 dark:placeholder-gray-400" placeholder="Ism bo'yicha izlash" />
                </span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <SelectIcon />
                </span>
              </button>
              <TimesIcon v-if="selectedMember" @click="clearFields()" class="absolute w-6 h-6 text-gray-500 cursor-pointer top-3 right-8 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400" />
              <ul x-show="selectOption" class="absolute z-10 w-full mt-1 overflow-auto text-base bg-white border rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-600 dark:bg-gray-700 sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                <li x-on:click="selectOption = false" v-for="(member, idx) in members" :key="idx" @click="saveMemberId(member)" class="relative py-2 pl-3 text-gray-900 cursor-pointer select-none pr-9 hover:bg-blue-500 hover:text-white" id="listbox-option-0" role="option">
                  <div class="flex items-center dark:text-gray-300">
                    <img :src="'http://localhost:9000/member/image/' + member.image" alt="#" class="flex-shrink-0 w-6 h-6 rounded-full" />
                    <span class="block ml-3 font-normal truncate"> {{ member.firstname + ' ' + member.lastname }} </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <label for="price" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">To'lov turi</label>
          <div class="flex items-center justify-around p-0 mb-6 border border-gray-300 rounded-lg dark:border-gray-600">
            <input id="toggle-on" class="toggle toggle-left" name="toggle" value="false" type="radio" checked />
            <label for="toggle-on" @click="savePaymentType('monthly')" class="relative flex items-center justify-center py-2.5">
              <span class="hidden mr-2"><CheckIcon /></span> Oylik to'lov</label
            >
            <input id="toggle-off" class="toggle toggle-right" name="toggle" value="true" type="radio" />
            <label for="toggle-off" @click="savePaymentType('daily')" class="relative flex items-center justify-center py-2.5">
              <span class="hidden mr-2"><CheckIcon /></span> Kunlik to'lov</label
            >
          </div>
          <div class="mb-6">
            <label for="price" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Mablag'</label>
            <div class="relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="text-sm text-gray-500"> UZS </span>
              </div>
              <input type="text" v-model="sum" name="price" id="price" class="block w-full pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg pl-11 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="0.00" disabled />
            </div>
          </div>
          <hr class="mb-6 border border-gray-200 bottom-1 dark:border-gray-600" />
          <div class="flex justify-end">
            <button type="submit" class="mx-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">Jo'natish</button>
          </div>
        </form>
      </div>
    </div>
    <!-- Payment Info Modal -->
    <div v-if="Object.keys(selectedPayment).length !== 0" class="fixed inset-0 top-0 left-0 right-0 z-50 w-full h-screen overflow-x-hidden overflow-y-auto backdrop-brightness-50">
      <div class="relative w-full p-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-7xl">
        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-300">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <div class="text-xl font-semibold text-gray-900 dark:text-white">To'lov ma'lumoti</div>
            <button type="button" @click="closePaymentInfoModal()" class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
              <ModalCloseIcon />
            </button>
          </div>
          <div class="p-3">
            <img :src="'http://localhost:9000/member/image/' + selectedPayment.member.image" class="mx-auto h-36 w-36" alt="#" />
            <p class="my-3 font-bold text-center capitalize">
              {{ selectedPayment.member.firstname + ' ' + selectedPayment.member.lastname }}
            </p>
            <table class="w-full mt-2 dark:border-gray-600">
              <tr>
                <td class="text-left"><strong>To'lovchi raqami: </strong></td>
                <td class="text-right">{{ phoneStyle(selectedPayment.member.phone) }}</td>
              </tr>
              <tr>
                <td class="text-left"><strong>To'lov qilingan sana: </strong></td>
                <td class="text-right">{{ selectedPayment.payment.createdAt.split('T')[0] }}</td>
              </tr>
              <tr>
                <td class="text-left"><strong>To'lov turi: </strong></td>
                <td class="text-right">{{ paymentTypeTranslate(selectedPayment.payment.paymentType) }}</td>
              </tr>
              <tr>
                <td class="text-left"><strong>Qiymati: </strong></td>
                <td class="text-right">{{ selectedPayment.payment.cost + ' UZS' }}</td>
              </tr>
            </table>
          </div>
          <div class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button type="button" @click="closePaymentInfoModal()" class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yopish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SelectIcon from '../../assets/icons/SelectIcon.vue'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import UserBoldIcon from '../../assets/icons/UserBoldIcon.vue'
import CheckIcon from '../../assets/icons/CheckIcon.vue'
import SpinIcon from '../../assets/icons/SpinIcon.vue'
import ModalCloseIcon from '../../assets/icons/ModalCloseIcon.vue'
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.vue'
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import PaymentItem from './Payments/PaymentItem.vue'
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { onClickOutside } from '@vueuse/core'
import { paymentTypeTranslate, phoneStyle } from '../../utils/utils.js'
import authHeader from '../../services/auth-header.js'

const store = useStore()

const target = ref('.payments-wrapper')
const distance = ref(200)

const selectedMember = ref('')
const paymentType = ref('monthly')
const search = ref('')

// Filter By
const openFilter = ref(false)
const filterDropdown = ref(null)
const currentFilter = ref('')

onClickOutside(filterDropdown, () => {
  if (openFilter.value) openFilter.value = false
})

const filterDropdownClick = (payType) => {
  openFilter.value = false
  filterData.typeBy = payType
}

const defaultView = () => {
  currentFilter.value = ''
  filterData.typeBy = null
  page = 1
  loadLastAddedPayment()
}
// get sum
const sum = ref(0)
const getSum = () => {
  if (paymentType.value === 'monthly') {
    sum.value = store.state.settings.monthlyPrice
  } else {
    sum.value = store.state.settings.dailyPrice
  }
}

const saveMemberId = (member) => (selectedMember.value = member)
const savePaymentType = (type) => {
  paymentType.value = type
  getSum()
}

const selectedPayment = computed(() => {
  return store.state.selectedPayment
})

const closePaymentInfoModal = () => {
  store.commit('setSelectedPayment', {})
}

const clearFields = () => {
  selectedMember.value = ''
}

const members = computed(() => {
  return store.state.members.filter((member) => member.firstname.toLowerCase().includes(search.value.toLowerCase()))
})

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(
      () => {
        store.commit('setSelectedPage', '')
      },
      () => {}
    )
  } else {
    notify.warning({
      message: msg,
      position: 'bottomLeft',
    })
  }
}

// load default
const filterData = reactive({
  typeBy: null,
  filterDateFrom: null,
  filterDateTo: null,
})

const payments = ref([])
const total = ref(0)
const isPaymentEmpty = ref(false)

let page = 0
const loadPayments = async ($state) => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch('http://localhost:9000/payment/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        payments.value.push(...json.payment)
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

setTimeout(() => {
  isPaymentEmpty.value = total.value === 0
}, 700)

// load filtered
const loadFilteredPayments = async () => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch('http://localhost:9000/payment/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        payments.value.push(...json.payment)
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
  payments.value = []
  loadFilteredPayments()
  setTimeout(() => {
    isPaymentEmpty.value = payments.value.length === 0
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

const loadLastAddedPayment = async () => {
  try {
    const response = await fetch('http://localhost:9000/payment/' + page, {
      method: 'POST',
      body: JSON.stringify(filterData),
      headers: authHeader(),
    })
    const json = await response.json()
    total.value = json.total
    setTimeout(() => {
      payments.value = []
      payments.value.push(...json.payment)
    }, 500)
  } catch (error) {
    console.log('Get Payment Error!')
  }
}

// Members Data
const getMembers = () => {
  store.dispatch('memberModule/get').then(
    (data) => {
      store.commit('setMembers', data)
    },
    (error) => {
      forbiddenChecker(error, "Ma'lumotlarni bazadan olishda xatolik yuz berdi!")
    }
  )
}

// Setting Data
const addSettingInStore = () => {
  store.dispatch('settingModule/get').then(
    (data) => {
      store.commit('setSetting', data)
      getSum()
    },
    (error) => {
      forbiddenChecker(error, 'Sozlamalarni olishda xatolik yuz berdi!')
    }
  )
}

const createPayment = () => {
  if (selectedMember.value === '') {
    notify.warning({
      message: "Iltimos, to'lovchini tanlang!",
      position: 'bottomLeft',
    })
  } else {
    const paymentData = {
      memberId: selectedMember.value.id,
      paymentType: paymentType.value,
    }
    store.dispatch('paymentModule/create', paymentData).then(
      () => {
        notify.success({
          message: "To'lov muvaffaqiyatli qayd etildi!",
          position: 'bottomLeft',
        })
        clearFields()
        page = 1
        loadLastAddedPayment()
      },
      (error) => {
        if (error.message.split(' ').includes('405')) {
          notify.warning({
            message: "To'lovchi allaqachon kunlik to'lov qilgan!",
            position: 'bottomLeft',
          })
        } else {
          notify.warning({
            message: "To'lovni qayd etishda xatolik yuz berdi!",
            position: 'bottomLeft',
          })
        }
      }
    )
  }
}

onMounted(() => getMembers(), addSettingInStore())
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
  background-color: #3b82f6;
  border-radius: 6px;
  transition: color 300ms;
}

input[type='radio'].toggle:checked + label > span {
  display: inline-block;
}

input[type='radio'].toggle:checked + label:after {
  left: 0;
}

.payment-table-h {
  max-height: 75vh;
}
</style>
