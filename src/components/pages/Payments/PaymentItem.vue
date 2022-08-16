<template>
  <tr v-for="(payment, index) in payments" :key="index" @click="showPaymentInfo(payment)"
    class="text-gray-900 cursor-pointer text-m dark:text-gray-300 dark:bg-gray-800 md:cursor-auto">
    <td class="px-4 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <div
          class="flex items-center justify-center w-10 h-10 mr-3 border rounded-full border-gray-50 dark:border-gray-600">
          <img class="object-cover w-full h-full rounded-full" :src="URL + '/member/image/' + payment.member.image"
            alt="#" />
        </div>
        <div>
          <p class="font-semibold text-gray-900 capitalize dark:text-gray-300">
            {{ payment.member.firstname + " " + payment.member.lastname }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(payment.member.phone) }}</p>
        </div>
      </div>
    </td>
    <td class="hidden px-4 py-3 whitespace-nowrap md:table-cell">
      <p>{{ formatDateTime(payment.payment.createdAt) }}</p>
      <p>{{ payment.payment.expiredAt ? formatDateTime(payment.payment.expiredAt) : '' }}</p>
    </td>
    <td class="hidden px-4 py-3 whitespace-nowrap md:table-cell">{{ paymentTypeTranslate(payment.payment.paymentType) }}
    </td>
    <td class="hidden px-4 py-3 whitespace-nowrap md:table-cell">
      {{ payment.payment.cost.toLocaleString('en-US') }}
      <span class="text-xs">UZS</span>
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800 ">
    <td colspan="4">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
  <tr>

  </tr>
</template>
<script setup>
import { toRefs, ref } from "vue";
import { phoneStyle, paymentTypeTranslate, formatDateTime } from "../../../utils/utils.js";
import InfiniteLoading from "v3-infinite-loading";
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  payments: { type: Array, required: true },
});

const { payments } = toRefs(props);

const URL = ref(import.meta.env.VITE_MY_ENV_VARIABLE)
const showPaymentInfo = (payment) => {
  if (window.innerWidth < 768) {
    store.commit('setSelectedPayment', payment)
  }
}
</script>