<template>
  <div>
    <div class="px-2 md:px-5">
      <div
        class="z-0 flex items-center justify-between p-3 mb-5 sticky-top top-16 bg-slate-100 dark:bg-gray-900 md:top-20">
        <h3 class="block ml-2 text-2xl font-extrabold dark:text-gray-300 sm:hidden"></h3>
        <h3 class="hidden ml-2 text-2xl font-extrabold dark:text-gray-300 sm:block">A'zolar</h3>
        <div class="items-center hidden md:flex">
          <div class="relative inline-block mr-3">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" class="p-2 focus:shadow-outline focus:outline-none dark:text-gray-300">
                <SearchIcon />
              </button>
            </span>
            <input type="search" name="search" v-model="search"
              class="w-full rounded-lg border border-slate-300 bg-white py-1.5 pl-10 text-lg text-slate-500 outline-none focus:bg-slate-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-300"
              placeholder="Izlash..." autocomplete="off" />
          </div>
          <button @click="openFilter = !openFilter"
            class="mr-3 flex flex-nowrap justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-center text-gray-900 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-0 dark:bg-blue-600 dark:text-gray-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto lg:inline-block">
            <div class="flex items-center">
              <FunnelIcon class="inline-block mr-1 text-lg" />
              <span class="flex items-center">{{ !currentFilter ? 'Saralash' : currentFilter }}
                <TimesIcon v-if="currentFilter !== ''" @click="defaultView()"
                  class="w-5 h-5 ml-2 text-gray-700 cursor-pointer hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400" />
              </span>
            </div>
          </button>
          <div v-if="openFilter" ref="filterDropdown"
            class="absolute mt-2 z-50 bg-white border rounded-lg top-16 right-[7rem] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <div class="p-3">
              <label for="first_name" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Ism</label>
              <input type="text" id="first_name" name="firstname" v-model="filterData.firstname"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Ismingizni kiriting" required />
            </div>
            <div class="p-3">
              <label for="last_name" class="mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Familiya</label>
              <input type="text" id="last_name" name="lastname" v-model="filterData.lastname"
                class="w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Familiya kiriting" required />
            </div>
            <div class="px-3 mt-3">
              <label for="last_name" class="font-medium text-gray-900 text-md dark:text-gray-300">Telefon
                raqam</label>
              <Field v-model="filterData.phone" v-mask="'+998(##) ###-##-##'" name="phone" type="phone"
                class="w-full p-2.5 text-gray-500 bg-gray-100 border border-gray-200 outline-none text-md rounded-xl focus:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:border-gray-600"
                placeholder="+998(99) 777-77-77" />
            </div>
            <div class="p-3">
              <label for="" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Jins</label>
              <select v-model="filterData.gender"
                class="border-1 w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                <option value="null" selected>Jinsni tanlang</option>
                <option value="male">Erkak</option>
                <option value="female">Ayol</option>
              </select>
            </div>
            <div class="px-3 mb-3 w-96">
              <button @click="submitFilterData()"
                class="w-full p-2 mt-4 font-bold text-white bg-blue-700 rounded">Filtr</button>
            </div>
          </div>
          <button @click="openAddMemberModal()"
            class="mx-1 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">A'zo
            qo'shish</button>
        </div>
      </div>
      <div v-if="!showContent" class="flex justify-center w-full pt-5">
        <h1 class="text-xl font-bold text-center text-red-500">Ma'lumotlar bazasida a'zolar mavjud emas!</h1>
      </div>
      <SingleMemberData v-show="showContent" :members="members" @infinite="loadMember" />
    </div>

    <!-- Member Add Modal -->
    <div v-if="isAddMemberModalOpen" class="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto backdrop-brightness-50">
      <div class="relative w-full max-w-5xl mt-16 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:mt-0"
        :class="{ 'mt-0': registerMemberProcess.checkingMode || registerMemberProcess.congratulationMode }">
        <div class="relative bg-white shadow-lg dark:bg-gray-800">
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Yangi a'zo qo'shish</h3>
            <button type="button" @click="closeAddMemberModal()"
              class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal">
              <ModalCloseIcon />
            </button>
          </div>
          <div class="p-5">
            <div
              class="flex p-3 mb-3 border border-gray-300 rounded-lg justify-evenly dark:border-gray-600 md:grid md:grid-cols-3">
              <div class="flex items-center justify-between">
                <!-- in progress -->
                <div v-if="registerStatus.inProgress" class="flex items-center justify-between">
                  <div
                    class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md dark:bg-gray-700">
                    01</div>
                  <div class="hidden ml-3 font-semibold text-blue-500 text-md md:block">A'zo ma'lumotlari</div>
                </div>
                <!-- completed -->
                <div v-if="registerStatus.done" class="flex items-center justify-between">
                  <div class="flex items-center justify-center w-10 h-10 text-2xl text-white bg-blue-500 rounded-full">
                    <CheckIcon />
                  </div>
                  <div class="hidden ml-3 font-semibold text-gray-700 text-md md:block">A'zo ma'lumotlari</div>
                </div>
                <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                  <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-25 h-9 dark:border-gray-600">
                  </div>
                  <div class="absolute border-r border-gray-300 rounded-lg rotate-25 -top-1 h-9 dark:border-gray-600">
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <!-- default -->
                <div v-if="checkingStatus.default" class="flex items-center">
                  <div
                    class="flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-full text-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    02</div>
                  <div class="hidden ml-3 font-semibold text-gray-500 text-md md:block">Tasdiqlash</div>
                </div>
                <!-- in progress -->
                <div v-if="checkingStatus.inProgress" class="flex items-center justify-between">
                  <div
                    class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md dark:bg-gray-700">
                    02</div>
                  <div class="hidden ml-3 font-semibold text-blue-500 text-md md:block">Tasdiqlash</div>
                </div>
                <!-- completed -->
                <div v-if="checkingStatus.done" class="flex items-center justify-between">
                  <div class="flex items-center justify-center w-10 h-10 text-2xl text-white bg-blue-500 rounded-full">
                    <CheckIcon />
                  </div>
                  <div class="hidden ml-3 font-semibold text-gray-700 text-md md:block">Tasdiqlash</div>
                </div>
                <div class="relative mt-1 ml-7 md:-left-8 md:ml-0">
                  <div class="absolute bottom-0 border-r border-gray-300 rounded-lg -rotate-25 h-9 dark:border-gray-600">
                  </div>
                  <div class="absolute border-r border-gray-300 rounded-lg rotate-25 -top-1 h-9 dark:border-gray-600">
                  </div>
                </div>
              </div>
              <!-- default -->
              <div v-if="congratulationStatus.default" class="flex items-center">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-gray-500 bg-white border-2 border-gray-300 rounded-full text-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  03</div>
                <div class="hidden ml-3 font-semibold text-gray-500 text-md md:block">Yakunlash</div>
              </div>
              <!-- in progress -->
              <div v-if="congratulationStatus.inProgress" class="flex items-center">
                <div
                  class="flex items-center justify-center w-10 h-10 font-semibold text-blue-500 bg-white border-2 border-blue-500 rounded-full text-md dark:bg-gray-700">
                  03</div>
                <div class="hidden ml-3 font-semibold text-blue-500 text-md md:block">Yakunlash</div>
              </div>
              <!-- completed-->
              <div v-if="congratulationStatus.done" class="flex items-center">
                <div class="flex items-center justify-center w-10 h-10 text-2xl text-white bg-blue-500 rounded-full">
                  <CheckIcon />
                </div>
                <div class="hidden ml-3 font-semibold text-gray-700 text-md md:block">Yakunlash</div>
              </div>
            </div>
          </div>
          <form @submit.prevent="createMember()" method="post" enctype="multipart/form-data">
            <div v-if="registerMemberProcess.registerMode" class="flex flex-col p-5 md:mb-5">
              <label v-if="!member.image" for="dropzone-file"
                class="relative flex items-center justify-center w-24 h-24 max-w-lg p-6 mx-auto text-center border-2 border-blue-400 border-dashed rounded-full cursor-pointer bg-slate-100 dark:bg-gray-700">
                <PictureIcon />
                <input id="dropzone-file" type="file" class="hidden" name="image" @change="getImage" />
                <span
                  class="absolute mx-auto mt-3 text-lg font-semibold tracking-wide text-blue-500 -bottom-10 whitespace-nowrap">
                  Fotosuratni yuklash</span>
              </label>
              <label v-else for="dropzone-file"
                class="relative flex items-center justify-center w-24 h-24 max-w-lg mx-auto text-center border-2 rounded-full cursor-pointer">
                <img :src="selectedImage" class="object-cover w-24 h-24 rounded-full" alt="#" />
                <input id="dropzone-file" type="file" class="hidden" name="image" @change="getImage" />
                <span
                  class="absolute mx-auto mt-3 text-lg font-semibold tracking-wide text-blue-500 -bottom-10 whitespace-nowrap">
                  Boshqa fotosuratni yuklash</span>
              </label>
            </div>
            <!-- Step 1 -->
            <div v-if="registerMemberProcess.registerMode" class="grid p-5 md:mb-6 md:gap-6 lg:grid-cols-2">
              <div class="p-3">
                <label for="firstname" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Ism</label>
                <input type="text" v-model="member.firstname" id="firstname" name="firstname"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Ism kiriting" required />
              </div>
              <div class="p-3">
                <label for="last_name"
                  class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Familiya</label>
                <input type="text" v-model="member.lastname" id="last_name" name="lastname"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Familiya kiriting" required />
              </div>
              <div class="p-3">
                <label for="birthday" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Tug'ilgan
                  kun</label>
                <input type="date" v-model="member.birthday" id="birthday" name="birthday"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Flowbite" required />
              </div>
              <div class="p-3">
                <label for="phone" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Telefon
                  raqami</label>
                <input name="phone" v-model="member.phone" v-mask="'+998(##) ###-##-##'" id="phone"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="+998(90) 123-45-67" required />
              </div>
              <div class="p-3">
                <label for="sex" class="block mb-2 font-medium text-gray-900 text-md dark:text-gray-300">Jinsi</label>
                <select id="sex" v-model="member.gender"
                  class="w-full text-sm text-left text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                  <option value="" selected>Jinsni tanlash</option>
                  <option value="male">Erkak</option>
                  <option value="female">Ayol</option>
                </select>
              </div>
              <input name="code" v-model="confirmCode" type="hidden"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required />
            </div>
            <!-- Step 2 -->
            <div class="flex justify-center" v-if="registerMemberProcess.checkingMode && member.smsConfirmation">
              <div class="flex flex-col">
                <ConfirmCode class="mx-auto text-blue-500 text-9xl" />
                <p class="px-3 text-xl text-center text-gray-600 dark:text-gray-300">
                  <strong class="text-black dark:text-gray-300">{{ member.phone }}</strong> telefon raqamiga tasdiqlash
                  kodi SMS tarzida jo'natildi!
                </p>
                <div class="flex justify-center my-5">
                  <v-otp-input ref="otpInput"
                    input-classes="otp-input dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 mx-2 w-9 border-gray-300 rounded text-center p-0 py-1.5 text-xl"
                    separator=" " :num-inputs="4" :should-auto-focus="true" :is-input-num="true"
                    :conditionalClass="['one', 'two', 'three', 'four']" :placeholder="['', '', '', '']"
                    @on-complete="handleOnComplete" />
                </div>
                <div v-if="showResendSMS" class="flex justify-center my-3 text-lg text-red-500 hover:underline"><a
                    href="#" @click="getMemberData()">SMS xabarnoma kelmadimi?</a></div>
                <div v-else class="flex items-center justify-center my-3 text-xl text-red-600">
                  <TimerIcon class="mr-2" />
                  <span>{{ timer }}</span>
                </div>
              </div>
            </div>
            <div v-if="registerMemberProcess.checkingMode && member.smsConfirmation"
              class="flex items-center justify-end p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <div>
                <button v-if="registerMemberProcess.checkingMode && !showCheckBtn && !lastProgressBtn"
                  class="px-4 py-2 font-medium text-white bg-green-500 rounded shadow-lg outline-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none"
                  disabled>Tasdiqlash</button>
                <button v-if="showCheckBtn" type="submit"
                  class="px-4 py-2 font-medium text-white transition-colors duration-200 bg-green-500 rounded shadow-lg outline-none hover:bg-green-600 focus:bg-green-500 focus:ring-green-500 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Tasdiqlash</button>
                <button v-if="lastProgressBtn"
                  class="flex items-center px-4 py-2 font-medium text-white transition-colors duration-200 bg-green-400 rounded shadow-lg outline-none hover:bg-green-600 focus:bg-green-500 focus:ring-green-500 focus:ring-offset-2 active:shadow-none disabled:cursor-not-allowed disabled:bg-green-400/80 disabled:shadow-none"
                  disabled>
                  <SpinIcon />
                  Tasdiqlash
                </button>
              </div>
            </div>
          </form>
          <!-- Step 3 -->
          <div class="flex justify-center" v-if="registerMemberProcess.congratulationMode">
            <div class="flex flex-col">
              <SuccessfulIcon class="mx-auto text-green-500 text-9xl" />
              <p class="my-5 text-xl text-center text-green-500">
                {{ lastMessage }}
              </p>
            </div>
          </div>
          <div v-if="isClear" class="fixed top-0 bottom-0 left-0 right-0 backdrop-brightness-50 backdrop-blur-sm"></div>
          <div v-if="!registerMemberProcess.checkingMode"
            class="flex items-center justify-between p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <div v-if="registerMemberProcess.registerMode" class="flex items-start">
              <div class="flex items-center h-6">
                <input v-model="member.smsConfirmation" id="comments" name="comments" type="checkbox"
                  class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600">
              </div>
              <div class="ml-3 text-sm leading-6">
                <label for="comments" class="font-medium text-gray-900 dark:text-gray-300">SMS tasdiqlash</label>
              </div>
            </div>
            <div v-else></div>
            <div v-if="isClear" class="fixed z-50 left-[30%] top-[40%] h-screen">
              <div class="flex p-5 pt-8 bg-white rounded-lg">
                <div>
                  <h3 class="mb-4 mr-10 text-xl font-bold">Siz rostdan ham tozalashni xohlaysizmi?</h3>
                  <div class="text-center">
                    <button class="px-4 py-2 mr-5 text-white duration-300 bg-blue-500 rounded hover:bg-blue-600"
                      @click="clearFields(), isClear = false">Ha</button>
                    <button class="px-4 py-2 text-white duration-300 bg-blue-500 rounded hover:bg-blue-600"
                      @click="isClear = false">Yo'q</button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button v-if="registerMemberProcess.registerMode" @click="isClear = true"
                class="px-4 py-2 mr-2 font-medium text-white transition-colors duration-200 bg-gray-400 border border-gray-500 rounded outline-none hover:bg-gray-500 hover:text-white focus:ring-gray-600 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Tozalash</button>
              <button v-if="registerMemberProcess.registerMode" @click="getMemberData()"
                class="px-4 py-2 font-medium text-white transition-colors duration-200 bg-green-500 rounded shadow-lg outline-none hover:bg-green-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">
                Keyingi qadam
              </button>
              <button v-if="registerMemberProcess.congratulationMode" @click="closeAddMemberModal()"
                class="px-4 py-2 font-medium text-white transition-colors duration-200 bg-indigo-500 rounded shadow-lg outline-none hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">Yakunlash</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isLoading" class="flex items-start justify-center w-full h-10">
      <SpinIcon class="w-7 h-7" />
    </div>
    <h1 v-show="isMemberEmpty" class="text-xl text-center text-red-500">Ma'lumotlar bazasidan a'zolar topilmadi!</h1>
  </div>
</template>

<script setup>
import FunnelIcon from '../../assets/icons/FunnelIcon.vue'
import CheckIcon from '../../assets/icons/CheckIcon.vue'
import ConfirmCode from '../../assets/icons/ConfirmCode.vue'
import TimerIcon from '../../assets/icons/TimerIcon.vue'
import SuccessfulIcon from '../../assets/icons/SuccessfulIcon.vue'
import SearchIcon from '../../assets/icons/SearchIcon.vue'
import SpinIcon from '../../assets/icons/SpinIcon.vue'
import PictureIcon from '../../assets/icons/PictureIcon.vue'
import ModalCloseIcon from '../../assets/icons/ModalCloseIcon.vue'
import { ref, reactive, onMounted, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { Field } from 'vee-validate'
import { useStore } from 'vuex'
import 'v3-infinite-loading/lib/style.css'
import SingleMemberData from './Membership/SingleMemberData.vue'
import authHeader from '../../services/auth-header.js'
import TimesIcon from '../../assets/icons/TimesIcon.vue'

const store = useStore()

const isAddMemberModalOpen = ref(false)
const showContent = ref(false)
const isClear = ref(false)

const registerMemberProcess = reactive({
  registerMode: false,
  checkingMode: false,
  congratulationMode: false,
})

const lastMessage = ref('')

const registerStatus = reactive({
  inProgress: true,
  done: false,
})

const checkingStatus = reactive({
  default: true,
  inProgress: false,
  done: false,
})

const congratulationStatus = reactive({
  default: true,
  inProgress: false,
  done: false,
})

const member = reactive({
  image: null,
  firstname: '',
  lastname: '',
  birthday: '',
  phone: '',
  gender: '',
  smsConfirmation: true,
})

function clearFields() {
  member.image = null
  member.firstname = ''
  member.lastname = ''
  member.birthday = ''
  member.phone = ''
  member.gender = ''
  member.smsConfirmation = true
  confirmCode.value = ''
}

const confirmCode = ref('')
const showCheckBtn = ref(false)
const lastProgressBtn = ref(false)

const openAddMemberModal = () => {
  isAddMemberModalOpen.value = true
  registerMemberProcess.registerMode = true
}

const closeAddMemberModal = () => {
  isAddMemberModalOpen.value = false
  registerStatus.inProgress = true
  registerStatus.done = false
  checkingStatus.default = true
  checkingStatus.inProgress = false
  checkingStatus.done = false
  congratulationStatus.default = true
  congratulationStatus.done = false
  congratulationStatus.inProgress = false
  registerMemberProcess.registerMode = true
  registerMemberProcess.checkingMode = false
  registerMemberProcess.congratulationMode = false
  showCheckBtn.value = false
  lastProgressBtn.value = false
  localStorage.setItem('time', '02:00')
  timer.value = '02:00'
  clearInterval(interval)
  clearFields()
}

const handleOnComplete = (code) => {
  confirmCode.value = code
  showCheckBtn.value = true
};

const timer = ref('02:00')
const showResendSMS = ref(false)

var interval

function startTimer() {
  clearInterval(interval)
  interval = setInterval(function () {
    let time = localStorage.getItem('time')
    time = time.split(':')
    let minutes = time[0]
    let seconds = time[1]
    seconds -= 1
    if (minutes < 0) return
    else if (seconds < 0 && minutes !== 0) {
      minutes -= 1
      seconds = 59
    } else if (seconds < 10 && length.seconds !== 2) seconds = '0' + seconds

    timer.value = minutes + ':' + seconds
    localStorage.setItem('time', timer.value)

    if (minutes === 0 && seconds === 0) clearInterval(interval)
    if (localStorage.getItem('time') === '-1:59') {
      clearInterval(interval)
      showResendSMS.value = true
    }
  }, 1000)
}

const selectedImage = ref('')

function getImage(e) {
  if (e.target.files[0].type.includes('image')) {
    member.image = e.target.files[0]
    selectedImage.value = URL.createObjectURL(member.image)
  } else {
    notify.warning({
      title: 'Diqqat!',
      message: 'Siz faqat rasm fayl joylashtira olasiz!',
      position: 'bottomLeft',
    })
  }
}

const getMemberData = () => {
  if (!member.firstname) {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, ismni kiriting!',
      position: 'bottomLeft',
    })
  } else if (!member.lastname) {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, familiyani kiriting!',
      position: 'bottomLeft',
    })
  } else if (!member.gender) {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, jinsni tanlang!',
      position: 'bottomLeft',
    })
  } else if (!member.phone) {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, telefon raqamni kiriting!',
      position: 'bottomLeft',
    })
  } else if (member.phone.length <= 17) {
    notify.warning({
      message: "Iltimos, telefon raqamni to'g'ri kiriting!",
      position: 'bottomLeft',
    })
  } else if (member.smsConfirmation) {
    member.phone = member.phone.replace(')', '').replace('(', '').replace(' ', '').replace(' ', '').replace('-', '').replace('-', '')
    store.dispatch('memberModule/sendSMS', member.phone).then(
      () => {
        notify.success({
          message: `${member.phone} raqamiga tasdiqlash kodi muvaffaqiyatli yaratildi!`,
          position: 'bottomLeft',
        })
      },
      () => {
        notify.error({
          message: `${member.phone} raqamiga tasdiqlash kodi yuborishda xatolik yuz berdi!`,
          position: 'bottomLeft',
        })
        showResendSMS.value = true
      }
    )
    localStorage.setItem('time', '02:00')
    startTimer()
    registerMemberProcess.registerMode = false
    registerMemberProcess.checkingMode = true
    registerStatus.inProgress = false
    registerStatus.done = true
    checkingStatus.default = false
    checkingStatus.inProgress = true
    showResendSMS.value = false
  } else createMember()
}

const createMember = () => {
  member.phone = member.phone.replace(')', '').replace('(', '').replace(' ', '').replace(' ', '').replace('-', '').replace('-', '')
  showCheckBtn.value = false
  lastProgressBtn.value = true
  const formData = new FormData()
  formData.append('userId', store.state.user.id)
  formData.append('firstname', member.firstname)
  formData.append('lastname', member.lastname)
  if (member.birthday) formData.append('birthday', member.birthday)
  if (member.image) formData.append('image', member.image)
  formData.append('phone', member.phone)
  formData.append('gender', member.gender)
  formData.append('smsConfirmation', member.smsConfirmation)
  formData.append('code', member.smsConfirmation ? confirmCode.value : '7777')

  store.dispatch('memberModule/create', formData).then(
    () => {
      lastMessage.value = "A'zo muvaffaqiyatli yaratildi!"
      registerMemberProcess.registerMode = false
      registerMemberProcess.congratulationMode = true
      registerStatus.inProgress = false
      registerStatus.done = true
      checkingStatus.inProgress = false
      checkingStatus.done = true
      checkingStatus.default = false
      congratulationStatus.default = false
      congratulationStatus.done = true
      registerMemberProcess.checkingMode = false
      congratulationStatus.done = true
      localStorage.setItem('time', '02:00')
      clearInterval(interval)
      showContent.value = true
      page = 1
      loadLastAddedMember()
    },
    (error) => {
      notify.warning({
        message: error.response.data,
        position: 'bottomLeft',
      })
      showCheckBtn.value = true
      lastProgressBtn.value = false
    }
  )
}

// Filter By
const openFilter = ref(false)
const filterDropdown = ref(null)
const currentFilter = ref('')
const isLoading = ref(false)

onClickOutside(filterDropdown, () => {
  if (openFilter.value) openFilter.value = false
})

const defaultView = () => {
  currentFilter.value = ''
  filterData.typeBy = null
  page = 1
  loadLastAddedMember()
}
// Load members when scrolling
const members = ref([])
const total = ref(0)

const filterData = reactive({
  phone: null,
  lastname: null,
  firstname: null,
  gender: null,
})

const submitFilterData = () => {
  refresher()
  openFilter.value = false
}

const API_URL = import.meta.env.VITE_BASE_URL;
let page = 0
const loadMember = async ($state) => {
  page++
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/member/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json.total
      showContent.value = total.value > 0
      setTimeout(() => {
        members.value.push(...json.member)
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

const loadLastAddedMember = async () => {
  try {
    const response = await fetch(API_URL + '/member/' + page, {
      method: 'POST',
      body: JSON.stringify(filterData),
      headers: authHeader(),
    })
    const json = await response.json()
    setTimeout(() => {
      members.value = []
      members.value.push(...json.member)
    }, 500)
  } catch (error) {
    console.log('Get members error!')
  }
}

// load filtered
const loadFiltered = async () => {
  page++
  isLoading.value = true
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(API_URL + '/member/' + page, {
        method: 'POST',
        body: JSON.stringify(filterData),
        headers: authHeader(),
      })
      const json = await response.json()
      setTimeout(() => {
        members.value = []
        members.value.push(...json.member)
        isLoading.value = false
      }, 500)
    } catch (error) {
      notify.warning({
        message: error,
        position: 'bottomLeft',
      })
    }
  }
}

const isMemberEmpty = ref(false)

const refresher = () => {
  page = 0
  total.value = 0
  members.value = []
  loadFiltered()
  setTimeout(() => {
    isMemberEmpty.value = members.value.length === 0
  }, 2000)
}

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(
      () => {
        store.commit('setSelectedPage', '')
      },
      () => { }
    )
  } else {
    notify.warning({
      message: msg,
      position: 'bottomLeft',
    })
  }
}

// Search Function
const getMembers = () => {
  store.dispatch('memberModule/get').then(
    (data) => {
      store.commit('setMembers', data)
    },
    (error) => {
      forbiddenChecker(error, "Ma'lumotlarni bazadan olishda xatolik yuz berdi!")
    }
  )
}

const search = ref('')
watch(search, () => {
  if (!search.value) {
    page = 1
    loadLastAddedMember()
  } else {
    members.value = store.state.members.filter((member) => member.firstname.toLowerCase().includes(search.value.toLowerCase()))
  }
})

onMounted(() => getMembers())
</script>

<style scoped>
.-rotate-25 {
  transform: rotate(-25deg);
}

.rotate-25 {
  transform: rotate(25deg);
}
</style>
