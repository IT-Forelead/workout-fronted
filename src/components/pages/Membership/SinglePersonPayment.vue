<template>
  <div v-if="payments.length > 0" class="col-span-1 md:col-span-2">
    <h2 class="mb-3 text-xl font-bold">To'lovlar hisoboti</h2>
    <div class="mb-8 w-full overflow-x-auto rounded-lg border border-slate-200 shadow-lg dark:border-gray-600">
      <div class="w-full overflow-y-auto max-h-96">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="bg-slate-50 sticky-top">
            <tr class="text-md text-left font-semibold tracking-wide text-gray-900 dark:bg-gray-600 dark:text-gray-300">
              <th scope="col" class="px-4 py-3">To'lov vaqti</th>
              <th scope="col" class="px-4 py-3">To'lov turi</th>
              <th scope="col" class="px-4 py-3">Qiymati</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white dark:bg-gray-700 dark:text-gray-300 dark:divide-gray-600">
            <tr v-for="(payment, index) in payments" :key="index">
              <td class="whitespace-nowrap px-4 py-3">
                <CalendarBlankIcon class="mr-1 inline-block text-lg" /> {{ payment.createdAt }}
              </td>
              <td class="whitespace-nowrap px-4 py-3">{{ paymentTypeTranslate(payment.paymentType) }}</td>
              <td class="whitespace-nowrap px-4 py-3">
                {{ payment.cost }}
                <span class="text-xs">UZS</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import CalendarBlankIcon from '../../../assets/icons/CalendarBlankIcon.vue'
import {paymentTypeTranslate} from '../../../utils/utils.js'
import {toRefs} from "vue";

const props = defineProps({
  payments: {type: Array, required: true},
});

const {payments} = toRefs(props);
</script>
