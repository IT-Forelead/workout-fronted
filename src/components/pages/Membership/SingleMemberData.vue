<template>
  <div>
    <div class="grid grid-cols-5 gap-5 gap-x-14 h-1/2 overflow-y-auto">
      <div v-for="(member, idx) in members" :key="idx"
           class="max-w-sm overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800">
        <img :src="'http://localhost:9000/member/image/' + member.image" alt="#"
             class="h-40 w-full cursor-zoom-out object-cover duration-500 hover:object-scale-down"/>
        <div class="flex flex-col justify-center p-5 text-center" x-data="{open: false}">
          <h3 class="text-md mb-2 h-14 overflow-hidden font-extrabold dark:text-gray-300 text-xl">{{
              member.firstname + ' ' + member.lastname
            }}</h3>
          <p class="text-medium my-2 mb-4 text-gray-600 dark:text-gray-300 text-xl">{{ member.phone }}</p>
          <button x-on:mouseenter="open = true" x-on:mouseleave="open = false" @click="openModal()"
                  class="flex items-center justify-center rounded-md border border-slate-300 bg-white py-2 px-5 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 transition-all duration-200 ease-in hover:bg-slate-100">
            Batafsil
            <ArrowRightIcon x-show="open" class="ml-3 animate-pulse text-xl transition-all duration-500 ease-in"/>
          </button>
        </div>
      </div>
    </div>
    <div class="p-2 flex justify-center items-center w-full">
      <InfiniteLoading v-bind="$attrs"/>
    </div>
    <!-- Member Info Modal -->
    <div v-show="isModalOpen"
         class="fixed top-0 right-0 left-0 z-50 h-modal w-full overflow-y-auto overflow-x-hidden backdrop-brightness-50 md:inset-0 md:h-full">
      <div class="relative top-1/2 left-1/2 h-full w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 p-4 md:h-auto">
        <div class="relative rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:text-gray-300">
          <div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
            <div class="text-xl font-semibold text-gray-900 dark:text-white">
              <div class="flex items-center">
                <img src="../../../assets/images/bg-login.jpg" alt="Avatar" class="ml-2 h-20 w-20 rounded-full"/>
                <div class="ml-4 pr-2">
                  <h3>Admin Adminjonov</h3>
                  <h5 class="text-sm">+998(99) 123-45-67</h5>
                  <h6 class="text-sm text-gray-500">12.02.2022</h6>
                </div>
              </div>
            </div>
            <button type="button" @click="closeModal()"
                    class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div class="grid grid-cols-3 gap-4 p-6">
            <SinglePersonPayment/>
            <SinglePersonArrival/>
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
import {toRefs, ref} from "vue";
import ArrowRightIcon from '../../../assets/icons/ArrowRightIcon.vue'
import SinglePersonArrival from '../Membership/SinglePersonArrival.vue'
import SinglePersonPayment from '../Membership/SinglePersonPayment.vue'
import InfiniteLoading from "v3-infinite-loading";

const props = defineProps({
  members: {type: Array, required: true},
});

const {members} = toRefs(props);
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>