<template>
  <tr v-for="(msg, index) in messages" :key="index"
      class="text-md text-gray-700 dark:text-gray-300 dark:bg-gray-800">
    <td class="whitespace-nowrap px-4 py-3">
      <div v-if="msg.member" class="flex items-center">
        <div class="flex mr-3 items-center justify-center h-10 w-10 border border-gray-50 rounded-full">
          <img class="object-cover w-full h-full rounded-full"
               :src="'http://localhost:9000/member/image/' + msg?.member?.image" alt="#"/>
        </div>
        <div>
          <p class="font-semibold text-gray-900 dark:text-gray-300">
            {{ msg?.member?.firstname + " " + msg?.member?.lastname }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(msg?.member?.phone) }}</p>
        </div>
      </div>
      <div v-else class="flex items-center">
        <div
            class="relative inline-block rounded-full mr-3 h-10 w-10 border border-gray-50 dark:border-gray-600 bg-slate-300 dark:bg-gray-800 p-1 text-slate-500 dark:text-gray-500 shadow">
          <UserBoldIcon class="h-full w-full"/>
        </div>
        <div class="font-semibold text-gray-900 dark:text-gray-300">Noma'lum foydalanuvchi</div>
      </div>
    </td>
    <td class="whitespace-nowrap px-4 py-3">
      <CalendarBlankIcon class="inline-block text-lg mr-1"/>
      {{ msg.message.sentDate }}
    </td>
    <td class="whitespace-nowrap px-4 py-3">{{ msg.message.text }}</td>
    <td class="whitespace-nowrap px-4 py-3"><span
        class="px-5 py-1 font-semibold leading-tight text-green-700 bg-green-100 dark:text-green-100 dark:bg-green-700 rounded-lg">{{
        deliveryStatusTranslate(msg.message.deliveryStatus)
      }}</span></td>
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
import UserBoldIcon from '../../../assets/icons/UserBoldIcon.vue'
import CalendarBlankIcon from '../../../assets/icons/CalendarBlankIcon.vue'
import {toRefs} from "vue";
import InfiniteLoading from "v3-infinite-loading";
import {phoneStyle} from "../../../utils/utils.js";

const props = defineProps({
  messages: {type: Array, required: true},
});

const {messages} = toRefs(props);

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