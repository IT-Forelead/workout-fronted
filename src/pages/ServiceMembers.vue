<template>
  <div class="h-full px-5">
    <div v-if="isAddModal" class="fixed top-0 bottom-0 left-0 right-0 z-10 backdrop-brightness-50 backdrop-blur-sm"></div>
    <div v-if="isAddModal"
      class="p-3 px-5 mb-3 bg-white rounded-lg w-96 md:w-[450px] dark:bg-gray-800 dark:text-gray-300 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 fixed z-20">
      <div class="flex justify-between">
        <h3 class="mb-3 text-2xl font-extrabold">To'lov qo'shish</h3>
        <div @click="isAddModal = false"
          class="flex items-center justify-center w-8 h-8 duration-300 rounded-full cursor-pointer hover:bg-red-500 hover:text-white">
          <ModalCloseIcon />
        </div>
      </div>
      <hr class="mb-6 border border-gray-200 bottom-1 dark:border-gray-600" />
      <form @submit.prevent="createPayment()">
        <div class="mb-6">
          <label id="listbox-label"
            class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">To'lovchi</label>
          <div class="relative mt-1" x-data="{selectOption: false}" x-on:click.outside="selectOption = false">
            <button x-on:click="selectOption = true" type="button"
              class="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 sm:text-sm"
              aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
              <span class="flex items-center" v-if="!selectedMember">
                <span
                  class="relative inline-block p-1 rounded-full shadow bg-slate-300 text-slate-500 dark:bg-gray-800 dark:text-gray-500">
                  <UserBoldIcon class="w-5 h-5" />
                </span>
                <span x-show="!selectOption" class="block ml-3 truncate text-md"> To'lovchini tanlang</span>
                <input x-show="selectOption" type="text" v-model="search"
                  class="p-0 ml-3 border-transparent focus:border-transparent focus:ring-0 dark:bg-gray-700 dark:placeholder-gray-400"
                  placeholder="Ism bo'yicha izlash" />
              </span>
              <span class="flex items-center" v-if="Object.keys(selectedMember).length !== 0">
                <span
                  class="relative inline-block p-1 rounded-full shadow bg-slate-300 text-slate-500 dark:bg-gray-800 dark:text-gray-500">
                  <img v-if="selectedMember.image" class="w-5 h-5" :src="URL + '/member/image/' + selectedMember.image"
                    alt="#" />
                  <img v-else src="/images/avatar.jpg" class="w-5 h-5" alt="#">
                </span>
                <span x-show="!selectOption" class="block ml-3 truncate text-md"> {{ selectedMember.firstname +
                  ' ' +
                  selectedMember.lastname
                }}</span>
                <input x-show="selectOption" type="text" v-model="search"
                  class="p-0 ml-3 border-transparent focus:border-transparent focus:ring-0 dark:bg-gray-700 dark:placeholder-gray-400"
                  placeholder="Ism bo'yicha izlash" />
              </span>
              <span class="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                <SelectIcon />
              </span>
            </button>
            <TimesIcon v-if="selectedMember" @click="clearFields()"
              class="absolute w-6 h-6 text-gray-500 cursor-pointer top-3 right-8 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400" />
            <ul x-show="selectOption"
              class="absolute z-10 w-full mt-1 overflow-auto text-base bg-white border rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-600 dark:bg-gray-700 sm:text-sm"
              tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
              <li x-on:click="selectOption = false" v-for="(member, idx) in members" :key="idx"
                @click="saveMemberId(member)"
                class="relative py-2 pl-3 text-gray-900 cursor-pointer select-none pr-9 hover:bg-blue-500 hover:text-white"
                id="listbox-option-0" role="option">
                <div class="flex items-center dark:text-gray-300">
                  <img v-if="member.image" :src="URL + '/member/image/' + member.image" alt="#"
                    class="flex-shrink-0 w-6 h-6 rounded-full" />
                  <img v-else src="/images/avatar.jpg" class="flex-shrink-0 w-6 h-6 rounded-full" alt="#">
                  <span class="block ml-3 font-normal truncate"> {{ member.firstname + ' ' + member.lastname }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-4">
          <label for="createdAt" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">
            Ro'yxatlangan vaqti
          </label>
          <input v-model.lazy="serviceMembersData.createdAt" name="end" type="datetime-local"
            class="w-full text-sm text-left text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
        </div>
        <div class="mb-4">
          <label for="service" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Tarif</label>
          <select v-model="serviceMembersData.serviceId" id="service"
            class="w-full text-sm text-left text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
            <option value="" selected>Tarif tanlash</option>
            <option v-for="(service, idx) in services" :key="idx" :value="service.id">{{ service.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="trainerService" class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Murabbiy
            tarifi</label>
          <select v-model="serviceMembersData.trainerServiceId" id="trainerService"
            class="w-full text-sm text-left text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
            <option value="" selected>Murabbiy tarifi tanlash</option>
            <option v-for="(ts, idx) in trainerServices" :key="idx" :value="ts.id">{{ ts.trainerName + ' - ' +
              ts.name }}</option>
          </select>
        </div>
        <hr class="mb-6 border border-gray-200 bottom-1 dark:border-gray-600" />
        <div class="flex justify-end">
          <button type="submit"
            class="mx-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">Jo'natish</button>
        </div>
      </form>
    </div>
    <div class="relative z-0">
      <div>
        <div class="flex items-center justify-between p-1 mb-5">
          <h3 class="mb-3 ml-2 text-2xl font-extrabold dark:text-gray-300">Tariflangan a'zolar</h3>
          <div class="relative hidden lg:flex lg:items-center lg:justify-between">
            <div class="flex items-center">
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
                class="absolute mt-2 z-50 bg-white border rounded-lg top-16 right-[7rem] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <div class="p-3">
                  <select v-model="filterData.memberId"
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required>
                    <option value="" selected disabled>Foydalanuvchini tanlang</option>
                    <option v-for="i in 5" :value="i">Known</option>
                  </select>
                </div>
                <div class="p-3">
                  <select v-model="filterData.serviceId"
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required>
                    <option value="" selected disabled>Xizmat turini tanlang</option>
                    <option v-for="i in 5" :value="i">Service</option>
                  </select>
                </div>
                <div class="p-3">
                  <select v-model="filterData.trainerServicesId"
                    class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required>
                    <option value="" selected disabled>Murabbiyni tanlang</option>
                    <option v-for="i in 5" :value="i">Trener</option>
                  </select>
                </div>
                <div class="p-3">
                  <select v-model="filterData.paymentStatus"
                    class="border-1 w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                    <option value="" disabled selected>Holatni tanlang</option>
                    <option value="not_paid">To'lanmagan</option>
                    <option value="partially_paid">Qisman to'langan</option>
                    <option value="fully_paid">To'liq to'langan</option>
                    <option value="canceled">Bekor qilingan</option>
                  </select>
                </div>
                
                <div class="px-3 w-96">
                  <button @click="submitFilterData()"
                    class="w-full p-2 mt-4 font-bold text-white bg-blue-700 rounded">Filtr</button>
                </div>
              </div>
              <button class="block px-4 py-2 ml-5 font-bold text-white bg-blue-500 rounded" @click="isAddModal = true">
                Qo'shish
              </button>
            </div>
          </div>
        </div>
        <div v-show="payments.length > 0"
          :class="{ 'overflow-hidden': total / 10 <= 1 || Object.keys(selectedPayment).length !== 0 }"
          class="grid grid-cols-1 overflow-x-auto border rounded-lg shadow-lg payments-wrapper payment-table-h border-slate-200 dark:border-gray-600">
          <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
            <thead class="z-0 shadow sticky-top bg-slate-50 dark:shadow-gray-600">
              <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:bg-gray-800 dark:text-gray-300">
                <th scope="col" class="px-4 py-3">Mijoz</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">Vaqtlar</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">Xizmat</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">Murabbiy xizmati</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">HIsob kitob</th>
                <th scope="col" class="hidden px-4 py-3 md:table-cell">To'lov holati</th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y divide-gray-200 custom-height dark:divide-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <ServiceMembersItem :payments="payments" :distance="distance" :target="target" @infinite="loadPayments" />
            </tbody>
          </table>
        </div>
        <div v-if="isLoading" class="flex items-start justify-center w-full h-10">
          <SpinIcon class="h-7 w-7" />
        </div>
        <h1 v-if="isPaymentEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan to'sssslovlar hisoboti
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
            <img :src="URL + '/member/image/' + selectedPayment.member.image" class="mx-auto h-36 w-36" alt="#" />
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
import SelectIcon from '@/components/icons/SelectIcon.vue'
import FunnelIcon from '@/components/icons/FunnelIcon.vue'
import TimesIcon from '@/components/icons/TimesIcon.vue'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import UserBoldIcon from '@/components/icons/UserBoldIcon.vue'
import SpinIcon from '@/components/icons/SpinIcon.vue'
import ModalCloseIcon from '@/components/icons/ModalCloseIcon.vue'
import { computed, onMounted, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { onClickOutside } from '@vueuse/core'
import { phoneStyle } from '../../utils/utils.js'
import authHeader from '../../services/auth-header.js'
import { formatDateTime } from '../../utils/utils.js'
import { cleanObjectEmptyFields } from '../../utils/utils.js'
import ServiceMembersItem from './Payments/ServiceMembersItem.vue'
import { Field, Form } from 'vee-validate'

const store = useStore()

const target = ref('.payments-wrapper')
const distance = ref(200)
const URL = ref(import.meta.env.VITE_BASE_URL)

const search = ref('')
const isAddModal = ref(false)
const selectedMember = ref('')

// Filter By
const openFilter = ref(false)
const currentFilter = ref('')
const filterDropdown = ref(null)

const filterData = reactive({
  memberId: '',
  serviceId: '',
  filterDateTo: '',
  paymentStatus: '',
  filterDateFrom: '',
  trainerServicesId: '',
})

const submitFilterData = () => {
  page = 0
  total.value = 0
  payments.value = []
  isLoading.value = true
  loadFilteredPayments()
  setTimeout(() => {
    isPaymentEmpty.value = payments.value.length === 0
  }, 700)
}

// const submitFilterData = () => {
//   isLoading.value = true
//   SmsMessageService.getSmsMessages(
//     cleanObjectEmptyFields({
//       phone: filterData.phone?.value?.id,
//       gender: filterData.gender?.value?.id,
//       lastname: filterData.lastname?.value?.id,
//       firstname: filterData.firstname?.value?.id,
//     })
//   ).then((res) => {
//     useSmsMessagesStore().clearStore()
//     useSmsMessagesStore().setSmsMessages(res?.data)
//     isLoading.value = false
//     if (useModalStore().isOpenFilterBy) {
//       useModalStore().toggleFilterBy()
//     }
//   })
// }

onClickOutside(filterDropdown, () => {
  if (openFilter.value) openFilter.value = false
})

const filterDropdownClick = (payType) => {
  openFilter.value = false
  filterData.paymentStatus = payType
}

const defaultView = () => {
  currentFilter.value = ''
  filterData.paymentStatus = null
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
  selectedMember.value = ''
  serviceMembersData.createdAt = ''
  serviceMembersData.memberId = ''
  serviceMembersData.serviceId = ''
  serviceMembersData.trainerServiceId = ''
}

const members = computed(() => {
  return store.state.members.filter((member) => member.firstname.toLowerCase().includes(search.value.toLowerCase()))
})

const services = computed(() => {
  return store.state.services
})

const trainerServices = computed(() => {
  return store.state.trainerServices
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
// const filterData = reactive({
//   paymentStatus: null,
//   filterDateTo: null,
//   filterDateFrom: null,
// })

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
      const response = await fetch(API_URL + '/payment/service-members/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      setTimeout(() => {
        payments.value.push(...json.serviceMembers)
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
      const response = await fetch(API_URL + '/payment/service-members/' + page, {
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
  () => filterData.paymentStatus,
  () => refresher(),
  { deep: true }
)

watch(
  () => selectedMember.value,
  () => serviceMembersData.memberId = selectedMember.value.id,
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
    const response = await fetch(API_URL + '/payment/service-members/' + page, {
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

// Get Services
const getServices = () => {
  store.dispatch('servicesModule/getServices').then(
    (data) => {
      store.commit('setServices', data)
    },
    (error) => {
      forbiddenChecker(error, "Ma'lumotlarni bazadan olishda xatolik yuz berdi!")
    }
  )
}

// Trainers Data
const getTrainerServices = () => {
  store.dispatch('servicesModule/getTrainerServices').then(
    (data) => {
      store.commit('setTrainerServices', data)
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

const serviceMembersData = reactive({
  createdAt: '',
  memberId: '',
  serviceId: '',
  trainerServiceId: '',
  cost: 0,
})

const createPayment = () => {
  if (!serviceMembersData.memberId) {
    notify.warning({
      message: "Iltimos, mijozni tanlang!",
      position: 'bottomLeft',
    })
  } else if (!serviceMembersData.serviceId) {
    notify.warning({
      message: "Iltimos, xizmatni tanlang!",
      position: 'bottomLeft',
    })
  } else {
    store.dispatch('servicesModule/createServiceMembers', cleanObjectEmptyFields(serviceMembersData)).then(
      () => {
        notify.success({
          message: "Mijoz muvaffaqiyatli ro'yhatga olindi",
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

onMounted(() => getMembers(), addSettingInStore(), getServices(), getTrainerServices())
</script>
  
<style scoped>
.payment-table-h {
  max-height: 75vh;
}
</style>
  