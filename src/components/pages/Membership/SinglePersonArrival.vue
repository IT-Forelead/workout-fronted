<template>
  <div v-show="arrivals.length > 0">
    <h2 class="mb-3 text-xl font-bold">Kelib-ketishlar</h2>
    <div class="mb-8 w-full overflow-hidden rounded-lg border border-slate-200 shadow-lg dark:border-gray-600">
      <div class="w-full overflow-x-auto">
        <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead class="bg-slate-50">
            <tr class="text-md text-left font-semibold tracking-wide text-gray-900 dark:bg-gray-600 dark:text-gray-300">
              <th scope="col" class="px-4 py-3">Kelishlar vaqti</th>
              <th scope="col" class="px-4 py-3">Turi</th>
            </tr>
          </thead>
          <tbody class="custom-height divide-y divide-gray-200 bg-white dark:divide-gray-600 dark:bg-gray-700">
            <tr v-for="(arrival, index) in arrivals" :key="index">
              <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="mr-1 inline-block text-lg" /> {{ arrival.createdAt }}</td>
              <td class="whitespace-nowrap px-4 py-3">{{ arrivalTypeTranslate(arrival.arrivalType) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import CalendarBlankIcon from '../../../assets/icons/CalendarBlankIcon.vue'
import {arrivalTypeTranslate} from '../../../utils/arrivalTypeTranslate.js'
import {toRefs} from "vue";

const props = defineProps({
  arrivals: {type: Array, required: true},
});

const {arrivals} = toRefs(props);

</script>
