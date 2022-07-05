<template>
  <div class="px-5">
    <div class="flex items-center mb-5">
      <h3 class="text-2xl font-extrabold ml-2 mb-3">SMS xabarlar</h3>
    </div>
    <div class="w-full mb-8 overflow-hidden border border-slate-200 rounded-lg shadow-lg">
      <div class="w-full overflow-x-auto">
        <table class="w-full divide-y divide-gray-300">
          <thead class="bg-slate-50">
            <tr class="text-md font-semibold tracking-wide text-left text-gray-900">
              <th scope="col" class="px-4 py-3">Foydalanuvchi</th>
              <th scope="col" class="px-4 py-3">Yuborilgan vaqti</th>
              <th scope="col" class="px-4 py-3">SMS matni</th>
              <th scope="col" class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="custom-height divide-y divide-gray-200 bg-white">
            <tr v-for="(msg, index) in messages" :key="index" class="text-md text-gray-700">
              <td class="whitespace-nowrap px-4 py-3">
                <div class="flex items-center">
                  <div class="flex mr-3 items-center justify-center h-10 w-10 border border-gray-50 rounded-full">
                    <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="#" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ msg.member.firstname + " " + msg.member.lastname }}</p>
                    <p class="text-sm text-gray-600">{{ phoneStyle(msg.member.phone) }}</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-3"><CalendarBlankIcon class="inline-block text-lg mr-1" /> {{ msg.message.sentDate }}</td>
              <td class="whitespace-nowrap px-4 py-3">{{ msg.message.text }}</td>
              <td class="whitespace-nowrap px-4 py-3"><span class="px-5 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-lg">{{ deliveryStatusTranslate(msg.message.deliveryStatus) }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import CalendarBlankIcon from '../../assets/icons/CalendarBlankIcon.vue'

const store = useStore()

const messages = computed(() => {
  return store.state.messages
})

const getMessages = () => {
  store.dispatch('messageModule/get').then(
    (data) => {
      store.commit('setMessage', data)
    },
    (error) => {
      notify.warning({
        message: "SMS xabarlarni olishda xatolik yuz berdi!",
        position: 'bottomLeft',
      })
    }
  )
}

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

const phoneStyle = (phone) => {
  return `${phone.slice(0, 4)} (${phone.slice(4, 6)}) ${phone.slice(6, 9)}-${phone.slice(9, 11)}-${phone.slice(11, 13)}`
}

onMounted(() => getMessages())
</script>