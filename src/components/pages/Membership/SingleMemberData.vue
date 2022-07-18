<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 2xl:gap-x-14 h-1/2 overflow-y-auto">
      <div v-for="(member, idx) in members" :key="idx"
           class="overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800">
        <img :src="'http://localhost:9000/member/image/' + member.image" alt="#"
             class="h-40 w-full cursor-zoom-out object-cover duration-500 hover:object-scale-down"/>
        <div class="flex flex-col justify-center p-5 text-center" x-data="{open: false}">
          <h3 class="text-md mb-2 h-14 overflow-hidden font-extrabold dark:text-gray-300 text-xl">{{
              member.firstname + ' ' + member.lastname
            }}</h3>
          <p class="text-medium my-2 mb-4 text-gray-600 dark:text-gray-300 text-xl">{{ phoneStyle(member.phone) }}</p>
          <button x-on:mouseenter="open = true" x-on:mouseleave="open = false" @click="openModal(member); getPaymentsByMemberId(member.id); getArrivalByMemberId(member.id)"
                  class="flex items-center justify-center rounded-md border border-slate-300 bg-white py-2 px-5 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 transition-all duration-200 ease-in hover:bg-slate-100">
            Batafsil
            <ArrowCircleRightIcon x-show="open" class="ml-3 animate-pulse text-xl transition-all duration-500 ease-in"/>
          </button>
        </div>
      </div>
    </div>
    <div class="p-2 flex justify-center items-center w-full">
      <InfiniteLoading v-bind="$attrs"/>
    </div>
    <!-- Member Info Modal -->
    <div v-if="isModalOpen" class="fixed top-0 right-0 left-0 z-50 w-full overflow-y-auto overflow-x-hidden backdrop-brightness-50 inset-0 h-full">
      <div class="relative top-1/2 left-1/2 h-full w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 p-4 md:h-auto">
        <div class="relative rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:text-gray-300">
          <div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
            <div class="text-xl font-semibold text-gray-900 dark:text-white">
              <div v-if="Object.keys(selectedMember).length !== 0" class="flex items-center">
                <img :src="'http://localhost:9000/member/image/' + selectedMember.image" alt="Avatar" class="ml-2 h-20 w-20 rounded-full"/>
                <div class="ml-4 pr-2">
                  <h3>{{ selectedMember.firstname + ' ' + selectedMember.lastname }}</h3>
                  <h5 class="text-sm">{{ phoneStyle(selectedMember.phone) }}</h5>
                  <h6 class="text-sm text-gray-500">{{ selectedMember.birthday }}</h6>
                </div>
              </div>
              <div v-else>
                <p>Member Not Selected!</p>
              </div>
            </div>
            <button type="button" @click="closeModal()"
                    class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal">
              <ModalCloseIcon/>
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <SinglePersonPayment :payments="payments"/>
            <SinglePersonArrival :arrivals="arrivals"/>
          </div>
          <div
              class="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
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
import {toRefs, ref, computed} from "vue";
import ArrowCircleRightIcon from '../../../assets/icons/ArrowCircleRightIcon.vue'
import ModalCloseIcon from "../../../assets/icons/ModalCloseIcon.vue";
import SinglePersonArrival from '../Membership/SinglePersonArrival.vue'
import SinglePersonPayment from '../Membership/SinglePersonPayment.vue'
import InfiniteLoading from "v3-infinite-loading";
import {useStore} from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import {phoneStyle} from "../../../utils/utils.js";

const store = useStore()

const props = defineProps({
  members: {type: Array, required: true},
});

const {members} = toRefs(props);
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
    }, () => {})
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