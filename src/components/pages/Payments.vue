<template>
  <div class="h-full px-5">

    <div v-if="isModal" class="fixed top-0 bottom-0 left-0 right-0 z-10 backdrop-brightness-50 backdrop-blur-sm"></div>
    <div v-if="isModal"
      class="p-3 z-10 px-5 fixed w-96 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white rounded-lg dark:bg-gray-800 dark:text-gray-300">
      <div class="flex justify-between">
        <h3 class="mb-3 text-2xl font-extrabold">To'lov qo'shish</h3>
        <div
          class="flex items-center justify-center w-8 h-8 duration-300 rounded-full cursor-pointer hover:bg-red-500 hover:text-white">
          <ModalCloseIcon @click="isModal = false" />
        </div>
      </div>
      <hr class="mb-6 border border-gray-200 bottom-1 dark:border-gray-600" />
      <form @submit.prevent="createPayment()">
        <div class="mb-4">
          <label for="service" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Tarif</label>
          <select v-model="paymentData.serviceId" id="service"
            class="w-full text-sm text-left text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
            <option value="" selected>Tarif tanlash</option>
            <option value="" selected>Tarif tanlash</option>
            <option value="" selected>Tarif tanlash</option>
            <!-- <option v-for="(service, idx) in services" :key="idx" :value="service.id">{{ service.name }}</option> -->
          </select>
        </div>
        <div class="mb-4">
          <label for="price" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Mablag'</label>
          <money3 v-model="paymentData.cost" v-bind="moneyConf" id="servicePrice"
            class="w-full text-sm text-right text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
          </money3>
        </div>
        <hr class="mb-6 border border-gray-200 bottom-1 dark:border-gray-600" />
        <div class="flex justify-end">
          <button type="submit"
            class="mx-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">Jo'natish</button>
        </div>
      </form>
    </div>
    <div class="relative z-0">
      <div class="col-span-2 overflow-x-auto">
        <div class="flex items-center justify-between p-1 mb-5">
          <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">To'lovlar</h3>
          <div class="relative hidden lg:flex lg:items-center lg:justify-between">
            <div class="flex items-center mr-3">
              <div class="relative">
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span class="text-sm text-gray-600 dark:text-gray-300"> dan </span>
                </div>
                <input v-model.lazy="filterData.filterDateFrom" name="start" type="datetime-local"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-11 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Select date start" />
              </div>
              <ArrowRightIcon class="mx-2 text-gray-500" />
              <div class="relative">
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span class="text-sm text-gray-600 dark:text-gray-300"> gacha </span>
                </div>
                <input v-model.lazy="filterData.filterDateTo" name="end" type="datetime-local"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-14 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Select date start" />
              </div>
              <button class="block px-4 py-2 ml-5 font-bold text-white bg-blue-500 rounded" @click="isModal = true">
                Qo'shish
              </button>
            </div>
            <div v-if="openFilter" ref="filterDropdown"
              class="absolute right-0 z-30 w-1/4 mt-2 bg-white border rounded-lg top-11 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <div @click="filterDropdownClick('monthly'); currentFilter = 'Oylik to\'lovlar'"
                class="px-3 py-2 border-b cursor-pointer dark:border-gray-600 dark:hover:bg-gray-700">Oylik to'lovlar
              </div>
              <div @click="filterDropdownClick('daily'); currentFilter = 'Kunlik to\'lovlar'"
                class="px-3 py-2 cursor-pointer dark:hover:bg-gray-700">Kunlik To'lovlar</div>
            </div>
          </div>
        </div>
        <div v-show="payments.length > 0"
          :class="{ 'overflow-hidden': total / 10 <= 1 || Object.keys(selectedPayment).length !== 0 }"
          class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg payments-wrapper payment-table-h border-slate-200 dark:border-gray-600">
          <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
            <thead class="z-0 shadow sticky-top bg-slate-50 dark:shadow-gray-600">
              <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:bg-gray-800 dark:text-gray-300">
                <th scope="col" class="px-4 py-3">To'lovchi</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">To'lov vaqti</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">Tarif</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">Murabbiy tarifi</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">Qiymati</th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200 custom-height dark:divide-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <PaymentItem :payments="payments" :distance="distance" :target="target" @infinite="loadPayments" />
            </tbody>
          </table>
        </div>
        <div v-if="isLoading" class="flex items-start justify-center w-full h-10">
          <SpinIcon class="h-7 w-7" />
        </div>
        <h1 v-if="isPaymentEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan to'lovlar hisoboti
          topilmadi!</h1>
      </div>
    </div>
    <!-- Payment Info Modal -->
    <div v-if="Object.keys(selectedPayment).length !== 0"
      class="fixed inset-0 top-0 left-0 right-0 z-50 w-full h-screen overflow-x-hidden overflow-y-auto backdrop-brightness-50">
      <div class="relative w-full p-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-7xl">
        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-300">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <div class="text-xl font-semibold text-gray-900 dark:text-white">To'lov ma'lumoti</div>
            <button type="button" @click="closePaymentInfoModal()"
              class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal">
              <ModalCloseIcon />
            </button>
          </div>
          <div class="p-3">
            <img v-if="selectedPayment.member.image" :src="URL + '/member/image/' + selectedPayment.member.image"
              class="mx-auto h-36 w-36" alt="#" />
            <img v-else src="/images/avatar.jpg" class="mx-auto h-36 w-36" alt="#">
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
                <td class="text-right">{{ formatDateTime(selectedPayment.payment.createdAt) }}</td>
              </tr>
              <tr>
                <td class="text-left"><strong>Murabbiy: </strong></td>
                <td class="text-right">{{ selectedPayment.payment.trainerId }}</td>
              </tr>
              <tr>
                <td class="text-left"><strong>Qiymati: </strong></td>
                <td class="text-right">{{ selectedPayment.payment.cost.toLocaleString('en-US') + ' UZS' }}</td>
              </tr>
            </table>
          </div>
          <div
            class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button type="button" @click="closePaymentInfoModal()"
              class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Yopish</button>
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
import SpinIcon from '../../assets/icons/SpinIcon.vue'
import ModalCloseIcon from '../../assets/icons/ModalCloseIcon.vue'
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.vue'
import PaymentItem from './Payments/PaymentItem.vue'
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { onClickOutside } from '@vueuse/core'
import { phoneStyle } from '../../utils/utils.js'
import authHeader from '../../services/auth-header.js'
import { formatDateTime } from '../../utils/utils.js'
import { cleanObjectEmptyFields } from '../../utils/utils.js'

const store = useStore()

const target = ref('.payments-wrapper')
const distance = ref(200)
const URL = ref(import.meta.env.VITE_BASE_URL)

const search = ref('')
const isModal = ref(false)
const selectedMember = ref('')

const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

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

const saveMemberId = (member) => (selectedMember.value = member)

const selectedPayment = computed(() => {
  return store.state.selectedPayment
})

const closePaymentInfoModal = () => {
  store.commit('setSelectedPayment', {})
}

const clearFields = () => {
  paymentData.memberId = ''
  paymentData.paymentType = 'monthly'
  paymentData.serviceId = ''
  paymentData.trainerServiceId = ''
  paymentData.cost = 0
  selectedMember.value = ''
}

const members = computed(() => {
  return store.state.members.filter((member) => member.firstname.toLowerCase().includes(search.value.toLowerCase()))
})

const trainers = computed(() => {
  return store.state.trainers
})

const services = computed(() => {
  return store.state.services
})

const trainerServices = computed(() => {
  return store.state.trainerServices
})

const serviceMembers = computed(() => {
  return store.state.serviceMembers
})

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(
      () => {
        store.commit('setSelectedPage', '')
      },
      () => { }
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
const isLoading = ref(true)
const API_URL = import.meta.env.VITE_BASE_URL;

let page = 0
const loadPayments = async ($state) => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/payment/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        payments.value.push(...json.payment)
        isPaymentEmpty.value = total.value === 0
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

setTimeout(() => {
  isPaymentEmpty.value = total.value === 0
  isLoading.value = false
}, 700)

// load filtered
const loadFilteredPayments = async () => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/payment/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        payments.value = []
        payments.value.push(...json.payment)
        isLoading.value = false
        isPaymentEmpty.value = total.value === 0
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
  isLoading.value = true
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
  () => selectedMember.value,
  () => paymentData.memberId = selectedMember.value.id,
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
  isLoading.value = true
  try {
    const response = await fetch(API_URL + '/payment/' + page, {
      method: 'POST',
      body: JSON.stringify(filterData),
      headers: authHeader(),
    })
    const json = await response.json()
    total.value = json.total
    setTimeout(() => {
      payments.value = []
      payments.value.push(...json.payment)
      isLoading.value = false
      isPaymentEmpty.value = total.value === 0
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

// Trainers Data
const getServiceMembers = () => {
  store.dispatch('servicesModule/getServiceMembers').then(
    (data) => {
      store.commit('setServiceMembers', data)
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
    },
    (error) => {
      forbiddenChecker(error, 'Sozlamalarni olishda xatolik yuz berdi!')
    }
  )
}

const paymentData = reactive({
  memberId: '',
  paymentType: 'monthly',
  cost: 0,
  serviceId: '',
  trainerServiceId: '',
})

const createPayment = () => {
  if (!paymentData.memberId) {
    notify.warning({
      message: "Iltimos, to'lovchini tanlang!",
      position: 'bottomLeft',
    })
  } else if (!paymentData.serviceId) {
    notify.warning({
      message: "Iltimos, tarifni tanlang!",
      position: 'bottomLeft',
    })
  } else if (paymentData.cost == 0) {
    notify.warning({
      message: "Iltimos, mablag'ni kiriting!",
      position: 'bottomLeft',
    })
  } else {
    store.dispatch('paymentModule/create', cleanObjectEmptyFields(paymentData)).then(
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
        notify.warning({
          message: error.response.data,
          position: 'bottomLeft',
        })
      }
    )
  }
}

onMounted(() =>
  addSettingInStore(),
  getServiceMembers()
)
</script>

<style scoped>
input[type='radio'].toggle {
  display: none;
}

input[type='radio'].toggle+label {
  cursor: pointer;
  width: 50%;
}

input[type='radio'].toggle.toggle-left+label {
  border-right: 0;
}

input[type='radio'].toggle.toggle-left+label:after {
  left: 100%;
}

input[type='radio'].toggle.toggle-right+label {
  margin-left: -5px;
}

input[type='radio'].toggle.toggle-right+label:after {
  left: -100%;
}

input[type='radio'].toggle:checked+label {
  cursor: default;
  color: #fff;
  background-color: #3b82f6;
  border-radius: 6px;
  transition: color 300ms;
}

input[type='radio'].toggle:checked+label>span {
  display: inline-block;
}

input[type='radio'].toggle:checked+label:after {
  left: 0;
}

.payment-table-h {
  max-height: 75vh;
}</style>
