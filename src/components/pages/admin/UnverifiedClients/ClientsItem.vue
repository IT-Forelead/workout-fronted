<template>
  <tr v-for="(client, index) in clients" :key="index" class="text-gray-700 text-md dark:text-gray-300">
    <td class="px-4 py-3 whitespace-nowrap">
      <div class="flex items-center">
        <div
          class="flex items-center justify-center w-10 h-10 mr-3 text-white uppercase bg-gray-500 border rounded-full border-gray-50 dark:border-gray-600">
          {{ client.user.firstname[0] }}</div>
        <div>
          <p class="font-semibold text-gray-900 capitalize dark:text-gray-300">{{ client.user.firstname + " " +
              client.user.lastname
          }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(client.user.phone) }}</p>
        </div>
      </div>
    </td>
    <td class="px-4 py-3 whitespace-nowrap">
      <p>Klub nomi: {{ client.setting.gymName }}</p>
      <p>Oylik to'lovi: {{ client.setting.dailyPrice }} UZS</p>
      <p>Kunlik to'lovi: {{ client.setting.monthlyPrice }} UZS</p>
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800 ">
    <td colspan="4">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
<script setup>
import { toRefs } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import { phoneStyle } from '../../../../utils/utils.js'

const props = defineProps({
  clients: { type: Array, required: true },
});

const { clients } = toRefs(props);
</script>