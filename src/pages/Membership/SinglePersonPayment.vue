<template>
  <div v-if="payments.length > 0" class="col-span-1 md:col-span-2">
    <h2 class="mb-3 text-xl font-bold">To'lovlar hisoboti</h2>
    <div class="w-full mb-8 overflow-x-auto border rounded-lg shadow-lg border-slate-200 dark:border-gray-600">
      <div class="w-full overflow-y-auto max-h-96">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="bg-slate-50 sticky-top">
            <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:bg-gray-600 dark:text-gray-300">
              <th scope="col" class="px-4 py-3">To'lov vaqti</th>
              <th scope="col" class="px-4 py-3">Tarif</th>
              <th scope="col" class="px-4 py-3">Murabbiy tarifi</th>
              <th scope="col" class="px-4 py-3">Qiymati</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:divide-gray-600">
            <tr v-for="(payment, index) in payments" :key="index">
              <td class="px-4 py-3 whitespace-nowrap">
                <CalendarBlankIcon class="inline-block mr-1 text-lg" /> {{ formatDateTime(payment.payment.createdAt) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div>{{ payment.serviceMembers.service.name }}</div>
                <div>
                  {{ payment.serviceMembers.service.price.toLocaleString('en-US') }}
                  <span class="text-xs">UZS</span>
                </div>
              </td>
              <td v-if="payment.serviceMembers.trainerService" class="px-4 py-3 whitespace-nowrap">
                <div>{{ payment.serviceMembers.trainerService.trainerName }}</div>
                <div>{{ payment.serviceMembers.trainerService.name }}</div>
              </td>
              <td v-else class="px-4 py-3 whitespace-nowrap">-</td>
              <td class="px-4 py-3 whitespace-nowrap">
                {{ payment.payment.cost.toLocaleString('en-US') }}
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
import CalendarBlankIcon from '@/components/icons/CalendarBlankIcon.vue'
import {toRefs} from "vue";
import { formatDateTime } from "../../../utils/utils.js";

const props = defineProps({
  payments: {type: Array, required: true},
});

const {payments} = toRefs(props);
</script>
