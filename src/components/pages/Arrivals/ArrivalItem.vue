<template>
  <tr v-for="(arrival, index) in arrivals" :key="index" class="text-gray-700 text-md dark:text-gray-300">
    <td class="px-4 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex items-center justify-center w-10 h-10 mr-3 border rounded-full border-gray-50 dark:border-gray-600">
          <img v-if="arrival.member.image" class="object-cover w-full h-full rounded-full" :src="URL + '/member/image/' + arrival.member.image" alt="#" />
          <img v-else src="images/avatar.jpg" class="object-cover w-full h-full rounded-full" alt="#">
        </div>
        <div>
          <p class="font-semibold text-gray-900 dark:text-gray-300">{{ arrival.member.firstname + " " + arrival.member.lastname }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(arrival.member.phone) }}</p>
        </div>
      </div>
    </td>
    <td class="px-4 py-3 whitespace-nowrap"><CalendarBlankIcon class="inline-block mr-1 text-lg" /> {{ formatDateTime(arrival.arrival.createdAt) }}</td>
    <td class="px-4 py-3 whitespace-nowrap">{{ arrivalTypeTranslate(arrival.arrival.arrivalType) }}</td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800 ">
    <td colspan="4">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs"/>
      </div>
    </td>
  </tr>
</template>
<script setup>
import {toRefs, ref} from "vue";
import CalendarBlankIcon from '../../../assets/icons/CalendarBlankIcon.vue'
import InfiniteLoading from "v3-infinite-loading";
import {phoneStyle, arrivalTypeTranslate, formatDateTime} from '../../../utils/utils.js'

const URL = ref(import.meta.env.VITE_BASE_URL)
const props = defineProps({
  arrivals: {type: Array, required: true},
});

const {arrivals} = toRefs(props);
</script>