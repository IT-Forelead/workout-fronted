<template>
  <div class="h-full px-5">
    <div class="mb-5 flex items-center">
      <h3 class="ml-2 mb-3 text-2xl font-extrabold dark:text-gray-300">To'lovlar</h3>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 md:gap-4">
      <div class="col-span-2 order-last lg:order-first w-full overflow-x-auto">
        <div v-show="payments.length > 0"
             class="rounded-lg border border-slate-200 shadow-lg dark:border-gray-600">
          <table class="w-full divide-y divide-gray-300 dark:divide-gray-600">
            <thead class="bg-slate-50">
            <tr class="text-md text-left font-semibold tracking-wide text-gray-900 dark:text-gray-300 dark:bg-gray-800">
              <th scope="col" class="px-4 py-3">To'lovchi</th>
              <th scope="col" class="px-4 py-3">To'lov vaqti</th>
              <th scope="col" class="px-4 py-3">To'lov turi</th>
              <th scope="col" class="px-4 py-3">Qiymati</th>
            </tr>
            </thead>
            <tbody
                class="custom-height divide-y divide-gray-200 bg-white dark:text-gray-300 dark:bg-gray-800 dark:divide-gray-600">
            <tr v-for="(payment, index) in payments" :key="index"
                class="text-m text-gray-900 dark:text-gray-300 dark:bg-gray-800">
              <td class="whitespace-nowrap px-4 py-3">
                <div class="flex items-center">
                  <div
                      class="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-gray-50 dark:border-gray-600">
                    <img class="h-full w-full rounded-full object-cover"
                         :src="'http://localhost:9000/member/image/' + payment.member.image" alt="#"/>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 dark:text-gray-300">
                      {{ payment.member.firstname + " " + payment.member.lastname }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ phoneStyle(payment.member.phone) }}</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-3">
                <p>{{ payment.payment.createdAt }}</p>
                <p>{{ payment.payment.expiredAt }}</p>
              </td>
              <td class="whitespace-nowrap px-4 py-3">{{ paymentTypeTranslate(payment.payment.paymentType) }}</td>
              <td class="whitespace-nowrap px-4 py-3">
                {{ payment.payment.cost }}
                <span class="text-xs">UZS</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <h1 v-show="payments.length === 0" class="text-red-500 text-xl text-center">Ma'lumotlar bazasida to'lovlar
          hisoboti topilmadi!</h1>
      </div>
      <div
          class="max-content-h rounded-lg bg-white p-3 px-5 dark:text-gray-300 dark:bg-gray-800 order-first lg:order-last mb-3">
        <h3 class="mb-3 text-2xl font-extrabold">To'lov qo'shish</h3>
        <hr class="bottom-1 mb-6 border border-gray-200 dark:border-gray-600"/>
        <form @submit.prevent="createPayment()">
          <div class="mb-6">
            <label id="listbox-label"
                   class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">To'lovchi</label>
            <div class="relative mt-1" x-data="{selectOption: false}" x-on:click.outside="selectOption = false">
              <button x-on:click="selectOption = true" type="button"
                      class="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span class="flex items-center" v-if="!selectedMember">
                  <span
                      class="relative inline-block rounded-full bg-slate-300 dark:bg-gray-800 p-1 text-slate-500 dark:text-gray-500 shadow">
                    <UserBoldIcon class="h-5 w-5"/>
                  </span>
                  <span x-show="!selectOption" class="text-md ml-3 block truncate"> To'lovchini tanlang</span>
                  <input x-show="selectOption" type="text" v-model="search"
                         class="ml-3 border-transparent p-0 focus:border-transparent focus:ring-0 dark:bg-gray-700 dark:placeholder-gray-400"
                         placeholder="Ism bo'yicha izlash"/>
                </span>
                <span class="flex items-center" v-if="Object.keys(selectedMember).length !== 0">
                  <span
                      class="relative inline-block rounded-full bg-slate-300 dark:bg-gray-800 p-1 text-slate-500 dark:text-gray-500 shadow">
                    <img class="h-5 w-5" :src="'http://localhost:9000/member/image/' + selectedMember.image" alt="#">
                  </span>
                  <span x-show="!selectOption" class="text-md ml-3 block truncate"> {{
                      selectedMember.firstname + ' ' + selectedMember.lastname
                    }}</span>
                  <input x-show="selectOption" type="text" v-model="search"
                         class="ml-3 border-transparent p-0 focus:border-transparent focus:ring-0 dark:bg-gray-700 dark:placeholder-gray-400"
                         placeholder="Ism bo'yicha izlash"/>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <SelectIcon/>
                </span>
              </button>
              <TimesIcon v-if="selectedMember" @click="clearFields()" class="w-6 h-6 absolute top-3 right-8 cursor-pointer text-gray-500 dark:text-gray-300 dark:hover:text-gray-400 hover:text-gray-700"/>
              <ul x-show="selectOption"
                  class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 border dark:border-gray-600 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                <li x-on:click="selectOption = false" v-for="(member, idx) in members" :key="idx"
                    @click="saveMemberId(member)"
                    class="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-500 hover:text-white"
                    id="listbox-option-0" role="option">
                  <div class="flex items-center dark:text-gray-300">
                    <img :src="'http://localhost:9000/member/image/' + member.image"
                         alt="#" class="h-6 w-6 flex-shrink-0 rounded-full"/>
                    <span
                        class="ml-3 block truncate font-normal"> {{ member.firstname + ' ' + member.lastname }} </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <label for="price" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">To'lov turi</label>
          <div class="mb-6 flex items-center justify-around rounded-lg border border-gray-300 p-0 dark:border-gray-600">
            <input id="toggle-on" class="toggle toggle-left" name="toggle" value="false" type="radio" checked/>
            <label for="toggle-on" @click="savePaymentType('monthly')"
                   class="flex justify-center items-center relative py-2.5"><span class="mr-2 hidden"><CheckIcon/></span>
              Oylik to'lov</label>
            <input id="toggle-off" class="toggle toggle-right" name="toggle" value="true" type="radio"/>
            <label for="toggle-off" @click="savePaymentType('daily')"
                   class="flex justify-center items-center relative py-2.5"><span class="mr-2 hidden"><CheckIcon/></span>
              Kunlik to'lov</label>
          </div>
          <div class="mb-6">
            <label for="price" class="mb-2 block text-lg font-medium text-gray-900 dark:text-gray-300">Mablag'</label>
            <div class="relative rounded-md shadow-sm">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-sm text-gray-500"> UZS </span>
              </div>
              <input type="text" name="price" id="price"
                     class="block w-full rounded-lg border border-gray-300 pl-11 pr-12 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                     placeholder="0.00"/>
            </div>
          </div>
          <hr class="bottom-1 mb-6 border border-gray-200 dark:border-gray-600"/>
          <div class="flex justify-end">
            <button type="submit"
                    class="mx-1 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
              Jo'natish
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import SelectIcon from "../../assets/icons/SelectIcon.vue";
import TimesIcon from "../../assets/icons/TimesIcon.vue";
import UserBoldIcon from '../../assets/icons/UserBoldIcon.vue'
import CheckIcon from '../../assets/icons/CheckIcon.vue'
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import {paymentTypeTranslate, phoneStyle} from "../../utils/utils.js";

const store = useStore()

const selectedMember = ref('')
const paymentType = ref('monthly')
const search = ref('')

const saveMemberId = (member) => selectedMember.value = member
const savePaymentType = (type) => paymentType.value = type

const clearFields = () => {
  selectedMember.value = ''
}

const payments = computed(() => {
  return store.state.payments
})

const members = computed(() => {
  return store.state.members.filter((member) => member.firstname.toLowerCase().includes(search.value.toLowerCase()))
})

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(() => {
      store.commit('setSelectedPage', '')
    }, () => {
    })
  } else {
    notify.warning({
      message: msg,
      position: 'bottomLeft',
    })
  }
}

const getPayments = () => {
  store.dispatch('paymentModule/get').then(
      (data) => {
        store.commit('setPayment', data)
      },
      (error) => {
        forbiddenChecker(error, "Ma\'lumotlarni bazadan olishda xatolik yuz berdi!")
      }
  )
}

const getMembers = () => {
  store.dispatch('memberModule/get').then(
      (data) => {
        store.commit('setMembers', data)
      },
      (error) => {
        forbiddenChecker(error, "Ma\'lumotlarni bazadan olishda xatolik yuz berdi!")
      }
  )
}
const createPayment = () => {
  const paymentData = {
    memberId: selectedMember.value.id,
    paymentType: paymentType.value
  }
  store.dispatch('paymentModule/create', paymentData).then(
      () => {
        notify.success({
          message: "To'lov muvaffaqiyatli qayd etildi!",
          position: 'bottomLeft'
        })
        clearFields()
        getPayments()
      },
      (error) => {
        notify.warning({
          message: "To'lovni qayd etishda xatolik yuz berdi!",
          position: 'bottomLeft',
        })
      }
  )
}

onMounted(() => {
      getPayments()
      getMembers()
    }
)
</script>

<style scoped>
input[type='radio'].toggle {
  display: none;
}

input[type='radio'].toggle + label {
  cursor: pointer;
  width: 50%;
}

input[type='radio'].toggle.toggle-left + label {
  border-right: 0;
}

input[type='radio'].toggle.toggle-left + label:after {
  left: 100%;
}

input[type='radio'].toggle.toggle-right + label {
  margin-left: -5px;
}

input[type='radio'].toggle.toggle-right + label:after {
  left: -100%;
}

input[type='radio'].toggle:checked + label {
  cursor: default;
  color: #fff;
  background-color: #3B82F6;
  border-radius: 6px;
  transition: color 300ms;
}

input[type='radio'].toggle:checked + label > span {
  display: inline-block;
}

input[type='radio'].toggle:checked + label:after {
  left: 0;
}
</style>
