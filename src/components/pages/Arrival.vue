<template>
  <div class="px-5">
    <div class="flex items-center mb-5">
      <h3 class="text-2xl font-extrabold ml-2 mb-3 dark:text-gray-300">Kelib-ketishlar</h3>
    </div>
    <div v-show="arrivals.length > 0" class="w-full mb-8 overflow-hidden border border-slate-200 rounded-lg shadow-lg dark:border-gray-600">
      <div class="w-full overflow-x-auto">
        <table class="w-full divide-y divide-gray-300">
          <thead class="bg-slate-50">
            <tr class="text-md font-semibold tracking-wide text-left text-gray-900 dark:text-gray-300 dark:bg-gray-800">
              <th scope="col" class="px-4 py-3">Foydalanuvchi</th>
              <th scope="col" class="px-4 py-3">Vaqti</th>
              <th scope="col" class="px-4 py-3">Turi</th>
            </tr>
          </thead>
          <tbody class="custom-height divide-y divide-gray-200 bg-white dark:text-gray-300 dark:bg-gray-800">
            <tr v-for="(arrival, index) in arrivals" :key="index" class="text-md text-gray-700 dark:text-gray-300">
              <td class="whitespace-nowrap px-4 py-3">
                <div class="flex items-center">
                  <div class="flex mr-3 items-center justify-center h-10 w-10 border border-gray-50 dark:border-gray-600 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="#" />
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
          </tbody>
        </table>
      </div>
    </div>
    <h1 v-show="arrivals.length === 0" class="text-red-500 text-xl text-center">Ma'lumotlar bazasidan kelib-ketishlar hisoboti topilmadi!</h1>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import CalendarBlankIcon from '../../assets/icons/CalendarBlankIcon.vue'

const store = useStore()

const arrivals = computed(() => {
  return store.state.arrivals
})

const arrivalTypeTranslate = (type) => {
  switch (type) {
    case 'come_in':
      return 'Keldi'
    case 'go_out':
      return 'Ketti'
    default:
      return ''
  }
}

const phoneStyle = (phone) => {
  return `${phone.slice(0, 4)} (${phone.slice(4, 6)}) ${phone.slice(6, 9)}-${phone.slice(9, 11)}-${phone.slice(11, 13)}`
}

const getArrival = () => {
  store.dispatch('arrivalModule/get').then(
    (data) => {
      store.commit('setArrival', data)
    },
    (error) => {
      notify.warning({
        message: "Ma\'lumotlarni bazadan olishda xatolik yuz berdi!",
        position: 'bottomLeft',
      })
    }
  )
}

onMounted(() => getArrival())
</script>