<template>
  <div>
    <div
      class="grid grid-cols-1 gap-5 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-14 h-1/2">
      <div v-for="(member, idx) in members" :key="idx"
        class="overflow-hidden bg-white shadow-md rounded-xl dark:bg-gray-800">
        <img :src="URL + '/member/image/' + member.image" alt="#"
          class="object-cover w-full h-40 duration-500 cursor-zoom-out hover:object-scale-down" />
        <div class="flex flex-col justify-center p-5 text-center" x-data="{open: false}">
          <h3 class="mb-2 overflow-hidden text-xl font-extrabold capitalize text-md h-14 dark:text-gray-300">
            {{ member.firstname + ' ' + member.lastname }}</h3>
          <p class="my-2 mb-4 text-xl text-gray-600 text-medium dark:text-gray-300">{{ phoneStyle(member.phone) }}</p>
          <button x-on:mouseenter="open = true" x-on:mouseleave="open = false"
            @click="openModal(member); getPaymentsByMemberId(member.id); getArrivalByMemberId(member.id)"
            class="flex items-center justify-center px-5 py-2 text-gray-500 transition-all duration-200 ease-in bg-white border rounded-md border-slate-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-slate-100">
            Batafsil
            <ArrowCircleRightIcon x-show="open"
              class="ml-3 text-xl transition-all duration-500 ease-in animate-pulse" />
          </button>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center w-full p-2">
      <InfiniteLoading v-bind="$attrs" />
    </div>
    <!-- Member Info Modal -->
    <div v-if="isModalOpen"
      class="fixed inset-0 top-0 left-0 right-0 z-50 w-full h-full overflow-x-hidden overflow-y-auto backdrop-brightness-50">
      <div class="relative w-full h-full p-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-7xl md:h-auto">
        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-300">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">A'zo haqida ma'lumot</h3>
            <button type="button" @click="closeModal()"
              class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal">
              <ModalCloseIcon />
            </button>
          </div>
          <div class="p-5">
            <div v-if="Object.keys(selectedMember).length !== 0"
              class="flex flex-col items-center text-center md:flex-row md:justify-start">
              <img :src="URL + '/member/image/' + selectedMember.image" alt="Avatar"
                class="w-48 h-48 mx-auto rounded md:mx-2" />
              <div class="flex flex-col ml-2">
                <div class="flex flex-col p-2 md:flex-row md:justify-between">
                  <span class="mr-3 text-lg">To'liq ismi:</span>
                  <span class="text-lg font-semibold text-gray-900 capitalize dark:text-white">
                    {{ selectedMember.firstname + ' ' + selectedMember.lastname }}</span>
                </div>
                <div class="flex flex-col p-2 md:flex-row md:justify-between">
                  <span class="mr-3 text-lg">Telefon raqami:</span>
                  <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ phoneStyle(selectedMember.phone) }}</span>
                </div>
                <div class="flex flex-col p-2 md:flex-row md:justify-between">
                  <span class="mr-3 text-lg">Tug'ilgan kuni: </span>
                  <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ formatDate(selectedMember.birthday) }}</span>
                </div>
                <div class="flex flex-col p-2 md:flex-row md:justify-between">
                  <span class="mr-3 text-lg">Foydalanish vaqti: </span>
                  <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ formatDateTime(selectedMember.activeTime) }}</span>
                </div>
              </div>
            </div>
            <div v-else>
              <p>A'zo tanlanmagan!</p>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
            <SinglePersonPayment :payments="payments" />
            <SinglePersonArrival :arrivals="arrivals" />
          </div>
          <div
            class="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button type="button" @click="closeModal()"
              class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Yopish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toRefs, ref, computed } from "vue";
import ArrowCircleRightIcon from '../../../assets/icons/ArrowCircleRightIcon.vue'
import ModalCloseIcon from "../../../assets/icons/ModalCloseIcon.vue";
import SinglePersonArrival from '../Membership/SinglePersonArrival.vue'
import SinglePersonPayment from '../Membership/SinglePersonPayment.vue'
import InfiniteLoading from "v3-infinite-loading";
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { phoneStyle, formatDateTime, formatDate } from "../../../utils/utils.js";

const store = useStore()

const props = defineProps({
  members: { type: Array, required: true },
});

const URL = ref(import.meta.env.VITE_MY_ENV_VARIABLE)
const { members } = toRefs(props);
const isModalOpen = ref(false)
const selectedMember = ref({})

const openModal = (member) => {
  isModalOpen.value = true
  selectedMember.value = member
}

const closeModal = () => {
  isModalOpen.value = false
}

const arrivals = computed(() => {
  return store.state.arrivalByMemberId
})

const payments = computed(() => {
  return store.state.paymentsByMemberId
})

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(() => {
      store.commit('setSelectedPage', '')
    }, () => { })
  } else {
    notify.warning({
      message: msg,
      position: 'bottomLeft',
    })
  }
}

// Get member info by id Function
const getPaymentsByMemberId = (id) => {
  store.dispatch('memberModule/getPaymentsByMemberId', id).then(
    (data) => {
      store.commit('setPaymentsByMemberId', data)
    },
    (error) => {
      forbiddenChecker(error, "Ma'lumotlarni bazadan olishda xatolik yuz berdi!")
    }
  )
}

const getArrivalByMemberId = (id) => {
  store.dispatch('memberModule/getArrivalByMemberId', id).then(
    (data) => {
      store.commit('setArrivalByMemberId', data)
    },
    (error) => {
      forbiddenChecker(error, "Ma'lumotlarni bazadan olishda xatolik yuz berdi!")
    }
  )
}
</script>