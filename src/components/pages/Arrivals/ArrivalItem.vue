<template>
  <tr v-for="(arrival, index) in arrivals" :key="index" class="text-md text-gray-700 dark:text-gray-300">
    <td class="whitespace-nowrap px-4 py-3">
      <div class="flex items-center">
        <div class="flex mr-3 items-center justify-center h-10 w-10 border border-gray-50 dark:border-gray-600 rounded-full">
          <img class="object-cover w-full h-full rounded-full" :src="'http://localhost:9000/member/image/' + arrival.member.image" alt="#" />
        </div>
        <div>
          <p class="font-semibold text-gray-900 dark:text-gray-300">{{ arrival.member.firstname + " " + arrival.member.lastname }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(arrival.member.phone) }}</p>
        </div>
      </div>
    </td>
    <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="inline-block text-lg mr-1" /> {{ arrival.arrival.createdAt }}</td>
    <td class="whitespace-nowrap px-4 py-3">{{ arrivalTypeTranslate(arrival.arrival.arrivalType) }}</td>
  </tr>
  <tr class="text-md text-gray-700 dark:text-gray-300 dark:bg-gray-800 ">
    <td colspan="4">
      <div class="p-2 flex justify-center items-center w-full">
        <InfiniteLoading v-bind="$attrs"/>
      </div>
    </td>
  </tr>
</template>
<script setup>
import {toRefs} from "vue";
import CalendarBlankIcon from '../../../assets/icons/CalendarBlankIcon.vue'
import InfiniteLoading from "v3-infinite-loading";
import {arrivalTypeTranslate} from '../../../utils/arrivalTypeTranslate.js'
const props = defineProps({
  arrivals: {type: Array, required: true},
});

const {arrivals} = toRefs(props);
</script>