<template>
  <div class="h-full px-5">
    <Overview v-if="isModal" />
    <div v-if="isModal"
      class="fixed z-10 p-3 px-5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-96 top-1/2 left-1/2 dark:bg-gray-800 dark:text-gray-300">
      <div class="flex justify-between">
        <h3 class="mb-3 text-2xl font-extrabold">To'lov qo'shish</h3>
        <div @click="isModal = false"
          class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 my-2 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
          <ModalCloseIcon />
        </div>
      </div>
      <hr class="mb-6 border border-gray-200 bottom-1 dark:border-gray-600" />
      <form @submit.prevent="createPayment()">
        <div class="mb-4">
          <label for="service" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">To'lovchi</label>
          <select v-model="paymentData.serviceMembersId" id="service"
            class="w-full text-sm text-left text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
            <option value="" selected disabled>To'lovchini tanlang</option>
            <option :value="serviceMember.serviceMembers.id" v-for="serviceMember in serviceMembers">{{
              `${serviceMember.member.firstname}
                          ${serviceMember.member.lastname} ${serviceMember.service.name}` }}</option>
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
      <div class="col-span-2">
        <div class="flex items-center justify-between p-1 mb-5">
          <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">To'lovlar</h3>
          <div class="relative hidden lg:flex lg:items-center lg:justify-between">
            <div class="relative flex items-center mr-3">
              <button @click="openFilter = !openFilter"
                class="ml-5 flex flex-nowrap justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center text-gray-900 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-0 dark:bg-blue-600 dark:text-gray-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto lg:inline-block">
                <div class="flex items-center">
                  <FunnelIcon class="inline-block mr-1 text-lg" />
                  <span class="flex items-center">{{ !currentFilter ? 'Saralash' : currentFilter }}
                    <TimesIcon v-if="currentFilter !== ''" @click="defaultView()"
                      class="w-5 h-5 ml-2 text-gray-700 cursor-pointer hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400" />
                  </span>
                </div>
              </button>
              <div v-if="openFilter" ref="filterDropdown"
                class="absolute z-50 bg-white border rounded-lg top-16 right-[8rem] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <div class="p-3 space-y-2">
                  <label for="serviceType" class="block">Xizmat turini tanlang</label>
                  <select v-model="filterData.serviceMembersId" id="serviceType"
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required>
                    <option value="null" selected disabled>Xizmat turini tanlang</option>
                    <option v-for="payment in payments" :value="payment.serviceMembers.serviceMembers.id">{{
                      payment.serviceMembers.service.name }}
                    </option>
                  </select>
                </div>
                <div class="flex items-center p-3">
                  <div class="relative">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span class="text-sm text-gray-600 dark:text-gray-300"> dan </span>
                    </div>
                    <input v-model.lazy="filterData.filterDateFrom" name="start" type="datetime-local"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
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
                </div>
                <div class="flex px-3 my-3 gap-x-3">
                  <button @click="submitFilterData()"
                    class="w-1/2 p-2 font-bold text-white bg-blue-700 rounded">Filtr</button>
                  <button @click="clearFilterDate()"
                    class="w-1/2 p-2 font-bold text-white bg-blue-700 rounded">Tozalash</button>
                </div>
              </div>
              <button
                class="block px-6 py-2.5 ml-5 text-white dark:text-gray-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                @click="isModal = true">
                Qo'shish
              </button>
            </div>
          </div>
        </div>
        <div v-show="payments.length > 0"
          class="grid grid-cols-1 overflow-auto border rounded-lg shadow-lg payments-wrapper max-h-[75vh] border-slate-200 dark:border-gray-600">
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
import Overview from '../Overview.vue'
import PaymentItem from './Payments/PaymentItem.vue'
import SpinIcon from '../../assets/icons/SpinIcon.vue'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import ModalCloseIcon from '../../assets/icons/ModalCloseIcon.vue'
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon.vue'
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

const distance = ref(200)
const isModal = ref(false)
const selectedMember = ref('')
const target = ref('.payments-wrapper')
const URL = ref(import.meta.env.VITE_BASE_URL)

const moneyConf = {
  precision: 0,
  thousands: ' ',
  suffix: ' UZS',
}

// Filter By
const openFilter = ref(false)
const currentFilter = ref('')
const filterDropdown = ref(null)

onClickOutside(filterDropdown, () => {
  if (openFilter.value) openFilter.value = false
})

const defaultView = () => {
  currentFilter.value = ''
  filterData.typeBy = null
  page = 1
  loadLastAddedPayment()
}

const selectedPayment = computed(() => {
  return store.state.selectedPayment
})

const closePaymentInfoModal = () => {
  store.commit('setSelectedPayment', {})
}

const clearFields = () => {
  paymentData.cost = 0
  selectedMember.value = ''
  paymentData.serviceMembersId = ''
}

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
  filterDateTo: null,
  filterDateFrom: null,
  serviceMembersId: null
})

const submitFilterData = () => {
  if (filterData.serviceMembersId || filterData.filterDateFrom || filterData.filterDateTo) {
    refresher()
  }
  openFilter.value = false
}

const clearFilterDate = () => {
  if (filterData.serviceMembersId || filterData.filterDateFrom || filterData.filterDateTo) {
    filterData.filterDateTo = null
    filterData.filterDateFrom = null
    filterData.serviceMembersId = null
    refresher()
  }
}

const total = ref(0)
const payments = ref([])
const isLoading = ref(true)
const isPaymentEmpty = ref(false)
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
  () => selectedMember.value,
  () => paymentData.serviceMembersId = selectedMember.value.id,
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
  cost: 0,
  serviceMembersId: '',
})

const createPayment = () => {
  if (!paymentData.serviceMembersId) {
    notify.warning({
      message: "Iltimos, to'lovchini tanlang!",
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
        isModal.value = false
        refresher
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
</style>
