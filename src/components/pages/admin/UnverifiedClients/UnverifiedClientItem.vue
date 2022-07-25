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
    <td class="px-4 py-3 whitespace-nowrap">
      <button @click="clientActivate(client.user)"
        class="w-full px-5 py-2 text-center text-gray-900 bg-white border rounded-lg border-slate-300 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto dark:border-0 dark:text-gray-300">
        Aktivlash
      </button>
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
import { useStore } from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const props = defineProps({
  clients: { type: Array, required: true },
});

const { clients } = toRefs(props);

const store = useStore()

function clientActivate(client) {
  store.dispatch('clientModule/activate', client.id).then(
    () => {
      notify.success({
        message: "Mijozni aktivlash muvaffaqiyatli yakunlandi!",
        position: 'bottomLeft',
      })
      let oldState = store.state.clients.filter(c => c.user.id !== client.id)
      store.commit('setClients', 'clear')
      store.commit('setClients', oldState)
      store.commit('setClientsEmpty', store.state.clients.length === 0)
    },
    (error) => {
      notify.error({
        message: "Mijozni aktivlashda xatolik yuz berdi!",
        position: 'bottomLeft',
      })
    }
  )
}
</script>