<template>
  <div>
    <div class="px-2 md:px-5">
    <div class="mb-5 flex items-center justify-between top-16 md:top-20 sticky-top z-0 bg-slate-100 dark:bg-gray-900 p-3">
      <h3 class="block sm:hidden ml-2 text-2xl font-extrabold dark:text-gray-300"></h3>
      <h3 class="hidden sm:block ml-2 text-2xl font-extrabold dark:text-gray-300">A'zolar</h3>
      <div class="hidden md:block flex items-center">
        <div class="relative mr-3 inline-block">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" class="focus:shadow-outline p-2 focus:outline-none dark:text-gray-300">
              <SearchIcon/>
            </button>
          </span>
            <input type="search" name="search" v-model="search" @keydown="searchMemberFunction()"
                   class="w-full rounded-lg border border-slate-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 bg-white py-1.5 pl-10 text-lg text-slate-500 outline-none focus:bg-slate-200 focus:outline-none"
                   placeholder="Izlash..." autocomplete="off"/>
          </div>
          <button
              class="hidden lg:inline-block border-slate-300 mr-3 w-full rounded-lg border bg-white px-5 py-2.5 text-center text-gray-900 hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto dark:border-0 dark:text-gray-300">
            <FunnelIcon class="mr-1 inline-block text-lg"/>
            Saralash
          </button>
          <button x-on:mouseenter="open = true" x-on:mouseleave="open = false" @click="openAddMemberModal()"
                  class="mx-1 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
            A'zo qo'shish
          </button>
        </div>
        <div class="block md:hidden flex items-center">
          <div class="relative mr-3 inline-block">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" class="focus:shadow-outline p-2 focus:outline-none dark:text-gray-300">
              <SearchIcon/>
            </button>
          </span>
            <input type="search" name="search" v-model="search" @keydown="searchMemberFunction()"
                   class="w-full rounded-lg border border-slate-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 bg-white py-1.5 pl-10 text-lg text-slate-500 outline-none focus:bg-slate-200 focus:outline-none"
                   placeholder="Izlash..." autocomplete="off"/>
          </div>
          <button x-on:mouseenter="open = true" x-on:mouseleave="open = false" @click="openAddMemberModal()"
                  class="mx-1 rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
            <UserPlusBoldIcon class="w-5 h-5"/>
          </button>
        </div>
      </div>
      <div v-show="!showContent" class="flex w-full justify-center pt-5">
        <h1 class="text-xl font-bold text-red-500 text-center">Ma'lumotlar bazasida a'zolar mavjud emas!</h1>
      </div>
      <SingleMemberData
          v-show="showContent"
          :members="members"
          @infinite="loadMember"
      />
    </div>

    <!-- Member Info Modal -->
    <div v-show="isAddMemberModalOpen"
         class="fixed top-0 right-0 left-0 z-50 w-full overflow-y-auto overflow-x-hidden backdrop-brightness-50 inset-0 h-full">
      <div class="relative top-1/2 left-1/2 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 mt-16 md:mt-0 p-1 md:p-4"
           :class="{'mt-0': registerMemberProcess.checkingMode || registerMemberProcess.congratulationMode}">
        <div class="relative rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <div class="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Yangi a'zo qo'shish</h3>
            <button type="button" @click="closeAddMemberModal()"
                    class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="defaultModal">
              <ModalCloseIcon />
            </button>
          </div>
          <div class="p-5">
            <div
                class="mb-3 flex justify-evenly md:grid md:grid-cols-3 rounded-lg border border-gray-300 p-3 dark:border-gray-600">
              <div class="flex items-center justify-between">
                <!-- in progress -->
                <div v-show="registerStatus.inProgress" class="flex items-center justify-between">
                  <div
                      class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-white font-semibold text-blue-500 dark:bg-gray-700">
                    01
                  </div>
                  <div class="hidden md:block text-md ml-3 font-semibold text-blue-500">A'zo ma'lumotlari</div>
                </div>
                <!-- completed -->
                <div v-show="registerStatus.done" class="flex items-center justify-between">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-2xl text-white">
                    <CheckIcon/>
                  </div>
                  <div class="hidden md:block text-md ml-3 font-semibold text-gray-700">A'zo ma'lumotlari</div>
                </div>
                <div class="relative ml-7 md:-left-8 mt-1 md:ml-0">
                  <div
                      class="-rotate-25 absolute bottom-0 h-9 rounded-lg border-r border-gray-300 dark:border-gray-600"></div>
                  <div
                      class="rotate-25 absolute -top-1 h-9 rounded-lg border-r border-gray-300 dark:border-gray-600"></div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <!-- default -->
                <div v-show="checkingStatus.default" class="flex items-center">
                  <div
                      class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 dark:text-gray-300 bg-white font-semibold text-gray-500 dark:bg-gray-700">
                    02
                  </div>
                  <div class="hidden md:block text-md ml-3 font-semibold text-gray-500">Tasdiqlash</div>
                </div>
                <!-- in progress -->
                <div v-show="checkingStatus.inProgress" class="flex items-center justify-between">
                  <div
                      class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-white font-semibold text-blue-500 dark:bg-gray-700">
                    02
                  </div>
                  <div class="hidden md:block text-md ml-3 font-semibold text-blue-500">Tasdiqlash</div>
                </div>
                <!-- completed -->
                <div v-show="checkingStatus.done" class="flex items-center justify-between">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-2xl text-white">
                    <CheckIcon/>
                  </div>
                  <div class="hidden md:block text-md ml-3 font-semibold text-gray-700">Tasdiqlash</div>
                </div>
                <div class="relative ml-7 md:-left-8 mt-1 md:ml-0">
                  <div
                      class="-rotate-25 absolute bottom-0 h-9 rounded-lg border-r border-gray-300 dark:border-gray-600"></div>
                  <div
                      class="rotate-25 absolute -top-1 h-9 rounded-lg border-r border-gray-300 dark:border-gray-600"></div>
                </div>
              </div>
              <!-- default -->
              <div v-show="congratulationStatus.default" class="flex items-center">
                <div
                    class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 dark:text-gray-300 bg-white font-semibold text-gray-500 dark:bg-gray-700">
                  03
                </div>
                <div class="hidden md:block text-md ml-3 font-semibold text-gray-500">Yakunlash</div>
              </div>
              <!-- in progress -->
              <div v-show="congratulationStatus.inProgress" class="flex items-center">
                <div
                    class="text-md flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-white font-semibold text-blue-500 dark:bg-gray-700">
                  03
                </div>
                <div class="hidden md:block text-md ml-3 font-semibold text-blue-500">Yakunlash</div>
              </div>
              <!-- completed-->
              <div v-show="congratulationStatus.done" class="flex items-center">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-2xl text-white">
                  <CheckIcon/>
                </div>
                <div class="hidden md:block text-md ml-3 font-semibold text-gray-700">Yakunlash</div>
              </div>
            </div>
          </div>
          <form @submit.prevent="createMember()" method="post" enctype="multipart/form-data">
            <div v-show="registerMemberProcess.registerMode" class="md:mb-5 flex flex-col p-5">
              <label v-show="!member.image" for="dropzone-file"
                     class="relative mx-auto flex h-24 w-24 max-w-lg cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-blue-400 bg-slate-100 p-6 text-center dark:bg-gray-700">
                <PictureIcon/>
                <input id="dropzone-file" type="file" class="hidden" name="image" @change="getImage"/>
                <span
                    class="absolute -bottom-10 mx-auto mt-3 whitespace-nowrap text-lg font-semibold tracking-wide text-blue-500">
                Fotosuratni yuklash</span>
              </label>
              <label v-show="member.image" for="dropzone-file"
                     class="relative mx-auto flex h-24 w-24 max-w-lg cursor-pointer items-center justify-center rounded-full border-2 text-center">
                <img src="" class="h-24 w-24 rounded-full object-cover" id="memberImage" alt="#"/>
                <input id="dropzone-file" type="file" class="hidden" name="image" @change="getImage"/>
                <span
                    class="absolute -bottom-10 mx-auto mt-3 whitespace-nowrap text-lg font-semibold tracking-wide text-blue-500">
                Boshqa fotosuratni yuklash</span>
              </label>
            </div>
            <!-- Step 1 -->
            <div v-show="registerMemberProcess.registerMode" class="md:mb-6 grid md:gap-6 p-5 lg:grid-cols-2">
              <div class="p-3">
                <label for="first_name"
                       class="text-md mb-2 block font-medium text-gray-900 dark:text-gray-300">Ism</label>
                <input type="text" v-model="member.firstname" id="first_name" name="firstname"
                       class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                       placeholder="Ism kiriting" required/>
              </div>
              <div class="p-3">
                <label for="last_name"
                       class="text-md mb-2 block font-medium text-gray-900 dark:text-gray-300">Familiya</label>
                <input type="text" v-model="member.lastname" id="last_name" name="lastname"
                       class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                       placeholder="Familiya kiriting" required/>
              </div>
              <div class="p-3">
                <label for="birthday" class="text-md mb-2 block font-medium text-gray-900 dark:text-gray-300">Tug'ilgan
                  kun</label>
                <input type="date" v-model="member.birthday" id="birthday" name="birthday"
                       class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                       placeholder="Flowbite" required/>
              </div>
              <div class="p-3">
                <label for="phone" class="text-md mb-2 block font-medium text-gray-900 dark:text-gray-300">Telefon
                  raqami</label>
                <Field name="phone" v-model="member.phone" type="phone" v-mask="'+###(##) ###-##-##'" id="phone"
                       class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                       placeholder="+998(90) 123-45-67" required/>
              </div>
              <Field name="code" v-model="confirmCode" type="hidden"
                     class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                     required/>
            </div>
            <!-- Step 2 -->
            <div class="flex justify-center" v-show="registerMemberProcess.checkingMode">
              <div class="flex flex-col">
                <ConfirmCode class="mx-auto text-9xl text-blue-500"/>
                <p class="text-xl text-gray-600 dark:text-gray-300 px-3 text-center">
                  <strong class="text-black dark:text-gray-300">{{ member.phone }}</strong> telefon raqamiga tasdiqlash
                  kodi SMS tarzida jo'natildi!
                </p>
                <div class="my-5 flex justify-center">
                  <input type="text" class="code dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" maxlength="1"
                         v-model="confirm.first" @input="onlyNumber('first')"
                         required/>
                  <input type="text" class="code dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" maxlength="1"
                         v-model="confirm.second" @input="onlyNumber('second')"
                         required/>
                  <input type="text" class="code dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" maxlength="1"
                         v-model="confirm.third" @input="onlyNumber('third')"
                         required/>
                  <input type="text" class="code dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" maxlength="1"
                         v-model="confirm.fourth" @input="onlyNumber('fourth')"
                         required/>
                </div>
                <div v-show="showResendSMS" class="my-3 flex justify-center text-lg text-red-500 hover:underline"><a
                    href="#" @click="getMemberData()">SMS xabarnoma kelmadimi?</a></div>
                <div v-show="!showResendSMS" class="my-3 flex items-center justify-center text-xl text-red-600">
                  <TimerIcon class="mr-2"/>
                  <span>{{ timer }}</span>
                </div>
              </div>
            </div>
            <div v-show="registerMemberProcess.checkingMode"
                 class="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-5 dark:border-gray-600">
              <div>
                <button v-show="registerMemberProcess.checkingMode && !showCheckBtn && !lastProgressBtn"
                        class="rounded bg-green-500 px-4 py-2 font-medium text-white shadow-lg outline-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none"
                        disabled>Tasdiqlash
                </button>
                <button v-show="showCheckBtn" type="submit"
                        class="rounded bg-green-500 px-4 py-2 font-medium text-white shadow-lg outline-none transition-colors duration-200 hover:bg-green-600 focus:bg-green-500 focus:ring-green-500 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">
                  Tasdiqlash
                </button>
                <button v-show="lastProgressBtn"
                        class="flex items-center rounded bg-green-400 px-4 py-2 font-medium text-white shadow-lg outline-none transition-colors duration-200 hover:bg-green-600 focus:bg-green-500 focus:ring-green-500 focus:ring-offset-2 active:shadow-none disabled:cursor-not-allowed disabled:bg-green-400/80 disabled:shadow-none"
                        disabled>
                  <SpinIcon/>
                  Tasdiqlash
                </button>
              </div>
            </div>
          </form>
          <!-- Step 3 -->
          <div class="flex justify-center" v-show="registerMemberProcess.congratulationMode">
            <div class="flex flex-col">
              <SuccessfulIcon class="mx-auto text-9xl text-green-500"/>
              <p class="my-5 text-center text-xl text-green-500">
                {{ lastMessage }}
              </p>
            </div>
          </div>
          <div v-show="!registerMemberProcess.checkingMode"
               class="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 p-5 dark:border-gray-600">
            <div>
              <button v-show="registerMemberProcess.registerMode" @click="clearFields()"
                      class="mr-2 rounded border border-teal-500 bg-teal-500 px-4 py-2 font-medium text-white outline-none transition-colors duration-200 hover:bg-teal-400 hover:text-white focus:ring-teal-600 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">
                Tozalash
              </button>
              <button v-show="registerMemberProcess.registerMode" @click="getMemberData()"
                      class="rounded bg-indigo-500 px-4 py-2 font-medium text-white shadow-lg outline-none transition-colors duration-200 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">
                Keyingi qadam
              </button>
              <button v-show="registerMemberProcess.congratulationMode" @click="closeAddMemberModal()"
                      class="rounded bg-indigo-500 px-4 py-2 font-medium text-white shadow-lg outline-none transition-colors duration-200 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-indigo-600 focus:ring-offset-2 active:scale-95 active:shadow-none disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:shadow-none">
                Yakunlash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import PictureIcon from "../../assets/icons/PictureIcon.vue";
import UserPlusBoldIcon from "../../assets/icons/UserPlusBoldIcon.vue";
import {Field, Form} from 'vee-validate'
import {ref, reactive, onMounted} from 'vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import {useStore} from 'vuex'
import $ from 'jquery'
import "v3-infinite-loading/lib/style.css";
import SingleMemberData from "./Membership/SingleMemberData.vue";
import authHeader from '../../services/auth-header.js'
import ModalCloseIcon from "../../assets/icons/ModalCloseIcon.vue";

const store = useStore()

const isAddMemberModalOpen = ref(false)
const showContent = ref(false)

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
})

const confirm = reactive({
  first: '',
  second: '',
  third: '',
  fourth: ''
})

function clearFields() {
  member.image = null
  member.firstname = ''
  member.lastname = ''
  member.birthday = ''
  member.phone = ''
  confirm.first = ''
  confirm.second = ''
  confirm.third = ''
  confirm.fourth = ''
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
  clearInterval(interval);
  clearFields()
}

function onlyNumber(order) {
  confirm[order] = confirm[order].replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  const codes = document.querySelectorAll('.code')
  codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
      if (idx >= 0 && idx < 3) {
        if (e.key >= 0 && e.key <= 9) {
          codes[idx].value = ''
          setTimeout(() => codes[idx + 1].focus(), 10)
        }
      }
      if (e.key === 'Backspace' && idx > 0 && idx <= 3) {
        codes[idx - 1].value = ''
        setTimeout(() => codes[idx - 1].focus(), 10)
      }
    })
  })
  if (confirm.first !== '' && confirm.second !== '' && confirm.third !== '' && confirm.fourth !== '') {
    confirmCode.value = confirm.first + confirm.second + confirm.third + confirm.fourth
    if (confirmCode.value.length === 4) {
      showCheckBtn.value = true
    }
  } else {
    showCheckBtn.value = false
  }
}

const timer = ref('02:00')
const showResendSMS = ref(false)

var interval;

function startTimer() {
  clearInterval(interval);
  interval = setInterval(function () {
    let time = localStorage.getItem('time');
    time = time.split(':');
    let minutes = time[0];
    let seconds = time[1];
    seconds -= 1;
    if (minutes < 0) return;
    else if (seconds < 0 && minutes !== 0) {
      minutes -= 1;
      seconds = 59;
    } else if (seconds < 10 && length.seconds !== 2) seconds = '0' + seconds;

    timer.value = minutes + ':' + seconds
    localStorage.setItem('time', timer.value)

    if (minutes === 0 && seconds === 0) clearInterval(interval)
    if (localStorage.getItem('time') === '-1:59') {
      clearInterval(interval)
      showResendSMS.value = true
    }
  }, 1000);
}

function getImage(e) {
  if (e.target.files[0].type.includes('image')) {
    member.image = e.target.files[0]
    $('#memberImage').attr('src', URL.createObjectURL(member.image))
  } else {
    notify.warning({
      title: 'Diqqat!',
      message: 'Siz faqat rasm fayl joylashtira olasiz!',
      position: 'bottomLeft',
    })
  }
}

const getMemberData = () => {
  if (!member.image) {
    notify.warning({
      title: 'Diqqat!',
      message: "Iltimos, a'zoning rasmini kiriting!",
      position: 'bottomLeft',
    })
  } else if (member.firstname === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, ismni kiriting!',
      position: 'bottomLeft',
    })
  } else if (member.lastname === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, familiyani kiriting!',
      position: 'bottomLeft',
    })
  } else if (member.birthday === '') {
    notify.warning({
      title: 'Diqqat!',
      message: "Iltimos, tug'ilgan kunni kiriting!",
      position: 'bottomLeft',
    })
  } else if (member.phone === '') {
    notify.warning({
      title: 'Diqqat!',
      message: 'Iltimos, telefon raqamni kiriting!',
      position: 'bottomLeft',
    })
  } else {
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
  }
}

const createMember = () => {
  showCheckBtn.value = false
  lastProgressBtn.value = true
  const form = $('form')[0]
  const formData = new FormData(form)
  formData.append('userId', store.state.user.id)
  store.dispatch('memberModule/create', formData).then(
      () => {
        lastMessage.value = "A'zo muvaffaqiyatli yaratildi!"
        registerMemberProcess.congratulationMode = true
        checkingStatus.inProgress = false
        checkingStatus.done = true
        congratulationStatus.default = false
        congratulationStatus.done = true
        registerMemberProcess.checkingMode = false
        congratulationStatus.done = true
        localStorage.setItem('time', '02:00')
        clearInterval(interval);
        loadLastAddedMember()
      },
      (error) => {
        if (error.message.slice(-3) === '400') {
          notify.warning({
            message: "Tasdiqlash kodi noto'g'ri!, Iltimos tekshirib qaytadan kiriting!",
            position: 'bottomLeft',
          })
        }
        showCheckBtn.value = true
        lastProgressBtn.value = false
      }
  )
}

// Load members when scrolling
const members = ref([])
const total = ref(0)

let page = 0
const loadMember = async $state => {
  page++;
  if (!(total.value / 10 + 1 < page && total.value !== 0)) {
    try {
      const response = await fetch(
          "http://localhost:9000/member/" + page, {
            headers: authHeader()
          }
      )
      const json = await response.json();
      total.value = json.total
      showContent.value = total.value > 0
      setTimeout(() => {
        members.value.push(...json.member);
        $state.loaded();
      }, 500);
    } catch (error) {
      $state.error();
    }
  } else $state.loaded();
}

const loadLastAddedMember = async () => {
  try {
    const response = await fetch(
        "http://localhost:9000/member/" + page, {
          headers: authHeader()
        }
    )
    const json = await response.json();
    setTimeout(() => {
      members.value = []
      members.value.push(...json.member);
    }, 500);
  } catch (error) {
    console.log("Get members error!")
  }
}

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(() => {
      store.commit('setSelectedPage', '')
    }, (error) => {})
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
        forbiddenChecker(error, "Ma\'lumotlarni bazadan olishda xatolik yuz berdi!")
      }
  )
}

const search = ref('')
const searchMemberFunction = () => {
  if (search.value === '') {
    page = 1
    loadLastAddedMember()
  } else {
    members.value = store.state.members.filter((member) => member.firstname.toLowerCase().includes(search.value.toLowerCase()))
  }
}

onMounted(() => getMembers())
</script>

<style scoped>
.-rotate-25 {
  transform: rotate(-25deg);
}

.rotate-25 {
  transform: rotate(25deg);
}

.code {
  border-radius: 5px;
  font-size: 25px;
  height: 60px;
  width: 50px;
  margin: 1%;
  text-align: center;
  font-weight: 300;
}

.code:valid {
  border-color: #3498db;
}
</style>
