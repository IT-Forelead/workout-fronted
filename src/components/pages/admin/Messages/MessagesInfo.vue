<template>
  <tr v-for="(msg, index) in messages" :key="index" class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td class="px-4 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <div class="inline-block w-10 h-10 p-1 mr-3 border rounded-full shadow border-gray-50 dark:border-gray-600 bg-slate-300 dark:bg-gray-800 text-slate-500 dark:text-gray-500">
          <UserBoldIcon class="w-full h-full" />
        </div>
        <div>
          <p class="font-semibold text-gray-900 dark:text-gray-300">{{ msg?.user.firstname + " " + msg?.user.lastname }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(msg?.user.phone) }}</p>
        </div>
      </div>
    </td>
    <td class="px-4 py-3 whitespace-nowrap">
      <div v-if="msg.member" class="flex items-center">
        <div class="flex items-center justify-center w-10 h-10 mr-3 border rounded-full border-gray-50 dark:border-gray-600">
          <img class="object-cover w-full h-full rounded-full" :src="URL + '/member/image/' + msg?.member?.image" alt="#"/>
        </div>
        <div>
          <p class="font-semibold text-gray-900 dark:text-gray-300">{{ msg?.member?.firstname + " " + msg?.member?.lastname }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(msg?.member?.phone) }}</p>
        </div>
      </div>
      <div v-else class="flex items-center">
        <div class="inline-block w-10 h-10 p-1 mr-3 border rounded-full shadow border-gray-50 dark:border-gray-600 bg-slate-300 dark:bg-gray-800 text-slate-500 dark:text-gray-500">
          <UserBoldIcon class="w-full h-full"/>
        </div>
        <div class="font-semibold text-gray-900 dark:text-gray-300">{{ phoneStyle(msg?.message.phone) }}</div>
      </div>
    </td>
    <td class="px-4 py-3 whitespace-nowrap">
      <CalendarBlankIcon class="inline-block mr-1 text-lg"/>
      {{ formatDate(msg.message.sentDate) }}
    </td>
    <td class="px-4 py-3 text-xs lg:text-sm">{{ msg.message.text }}</td>
    <td class="px-4 py-3 whitespace-nowrap"><span
        class="px-5 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-lg dark:text-green-100 dark:bg-green-700">{{
        deliveryStatusTranslate(msg.message.deliveryStatus)
      }}</span></td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800 ">
    <td colspan="5">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs"/>
      </div>
    </td>
  </tr>
</template>
<script setup>
import UserBoldIcon from '../../../../assets/icons/UserBoldIcon.vue'
import CalendarBlankIcon from '../../../../assets/icons/CalendarBlankIcon.vue'
import {toRefs, ref} from "vue";
import InfiniteLoading from "v3-infinite-loading";
import {phoneStyle, formatDate} from "../../../../utils/utils.js";

const props = defineProps({
  messages: {type: Array, required: true},
});

const {messages} = toRefs(props);
const URL = ref(import.meta.env.VITE_MY_ENV_VARIABLE)
const deliveryStatusTranslate = (status) => {
  switch (status) {
    case 'sent':
      return 'Yuborildi'
    case 'delivered':
      return 'Yetkazildi'
    case 'failed':
      return 'Yetkazilmadi'
    case 'unknown':
      return "Noma'lum"
    default:
      return ''
  }
}
</script>