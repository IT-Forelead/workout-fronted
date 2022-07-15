<template>
  <tr v-for="(payment, index) in payments" :key="index" @click="showPaymentInfo(payment)"
      class="text-m text-gray-900 dark:text-gray-300 dark:bg-gray-800 cursor-pointer md:cursor-auto">
    <td class="whitespace-nowrap px-4 py-3">
      <div class="flex items-center">
        <div
            class="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-50 dark:border-gray-600">
          <img class="h-full w-full rounded-full object-cover"
               :src="'http://localhost:9000/member/image/' + payment.member.image" alt="#"/>
        </div>
        <div>
          <p class="font-semibold text-gray-900 dark:text-gray-300">
            {{ payment.member.firstname + " " + payment.member.lastname }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(payment.member.phone) }}</p>
        </div>
      </div>
    </td>
    <td class="whitespace-nowrap px-4 py-3 hidden md:table-cell">
      <p>{{ payment.payment.createdAt }}</p>
      <p>{{ payment.payment.expiredAt }}</p>
    </td>
    <td class="whitespace-nowrap px-4 py-3 hidden md:table-cell">{{ paymentTypeTranslate(payment.payment.paymentType) }}</td>
    <td class="whitespace-nowrap px-4 py-3 hidden md:table-cell">
      {{ payment.payment.cost }}
      <span class="text-xs">UZS</span>
    </td>
  </tr>
  <tr class="text-md text-gray-700 dark:text-gray-300 dark:bg-gray-800 ">
    <td colspan="4">
      <div class="p-2 flex justify-center items-center w-full">
        <InfiniteLoading v-bind="$attrs"/>
      </div>
    </td>
  </tr>
  <tr>

  </tr>
</template>
<script setup>
import {toRefs} from "vue";
import {phoneStyle, paymentTypeTranslate} from "../../../utils/utils.js";
import InfiniteLoading from "v3-infinite-loading";
import {useStore} from 'vuex'

const store = useStore()

const props = defineProps({
  payments: {type: Array, required: true},
});

const {payments} = toRefs(props);

const showPaymentInfo = (payment) => {
  if(window.innerWidth < 768) {
    store.commit('setSelectedPayment', payment)
  }
}
</script>