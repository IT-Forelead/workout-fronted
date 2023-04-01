<template>
  <div v-if="arrivals.length > 0">
    <h2 class="mb-3 text-xl font-bold">Kelib-ketishlar</h2>
    <div class="w-full mb-8 overflow-hidden border rounded-lg shadow-lg border-slate-200 dark:border-gray-600">
      <div class="w-full overflow-x-auto overflow-y-auto max-h-96">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="bg-slate-50 sticky-top">
            <tr class="font-semibold tracking-wide text-left text-gray-900 text-md dark:bg-gray-600 dark:text-gray-300">
              <th scope="col" class="px-4 py-3">Kelishlar vaqti</th>
              <th scope="col" class="px-4 py-3">Turi</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-700">
            <tr v-for="(arrival, index) in arrivals" :key="index">
              <td class="px-4 py-3 whitespace-nowrap">
                <CalendarBlankIcon class="inline-block mr-1 text-lg" /> {{ formatDateTime(arrival.createdAt) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">{{ arrivalTypeTranslate(arrival.arrivalType) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import CalendarBlankIcon from '@/components/icons/CalendarBlankIcon.vue'
import { arrivalTypeTranslate } from '../../../utils/utils.js'
import { toRefs } from "vue";
import { formatDateTime } from "../../../utils/utils.js";

const props = defineProps({
  arrivals: { type: Array, required: true },
});

const { arrivals } = toRefs(props);

</script>
