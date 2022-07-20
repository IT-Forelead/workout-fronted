<template>
  <div class="z-10 flex items-center justify-between h-16 py-4 bg-white sticky-top dark:bg-gray-800 dark:text-gray-300 md:h-20">
    <div class="items-center justify-between ml-5 md:flex">
      <div v-if="showSearchAndBtn">
        <ListIcon v-if="!sidebarStatus" @click="toggleSidebar()" class="p-1 mr-5 text-4xl rounded-full cursor-pointer menu-btn hover:text-blue-600 hover:shadow" />
        <MenuIcon v-else @click="toggleSidebar()" class="p-1 mr-5 text-4xl rounded-full cursor-pointer menu-btn hover:text-blue-600 hover:shadow" />
      </div>
      <div class="p-1 mr-5 lg:hidden">
        <img src="../../assets/images/logo.png" class="w-12 shrink-0" alt="#" />
      </div>
      <div class="relative" v-if="showSearchAndBtn">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" class="p-4 focus:shadow-outline focus:outline-none">
            <SearchIcon class="w-5 h-5" />
          </button>
        </span>
        <input type="search" name="search" class="py-2 pl-16 text-lg border rounded-full outline-none w-96 border-slate-300 bg-slate-100 text-slate-500 focus:bg-slate-200 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-300" placeholder="Izlash..." autocomplete="off" />
      </div>
    </div>
    <div class="flex items-center mr-5">
      <button id="dropdownNotificationBtn" @click="toggleDropDownNotification()" class="relative inline-block p-1 mr-3 rounded-full shadow bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 md:p-2">
        <BellIcon class="w-6 h-6 dark:text-gray-300 md:h-7 md:w-7" />
        <div v-if="showNotificationAlert">
          <span class="absolute top-0.5 right-0 animate-ping rounded-full bg-rose-500 p-1 md:p-1.5"></span>
          <span class="absolute top-0.5 right-0 rounded-full bg-rose-500 p-1 md:p-1.5"></span>
        </div>
      </button>
      <div id="dropdownNotification" class="hidden bg-white border rounded shadow w-96 dark:border-gray-600 dark:bg-gray-800">
        <div v-if="showNotificationAlert" class="flex items-center justify-between px-5 py-3 text-md">
          <div class="flex items-center px-1 mr-3">
            <div class="relative bottom-1.5 mr-3">
              <div class="absolute top-0 right-0 animate-ping rounded-full bg-blue-500 p-1.5"></div>
              <div class="absolute top-0 right-0 rounded-full bg-blue-500 p-1.5"></div>
            </div>
            <div class="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-700">
              <div class="pt-1 text-lg font-bold text-center text-gray-600 dark:text-gray-300">
                <BookmarkIcon class="h-7 w-7" />
              </div>
            </div>
          </div>
          <div>
            <p class="font-semibold text-gray-900 dark:text-gray-300">Bildirishnoma</p>
            <p class="text-gray-600 text-md dark:text-gray-400">Fitnes klubingizning nomini va to'lov summalarini sozlamalar bo'limi orqali kiriting!</p>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center px-5 py-20 text-md">
          <BellIcon class="mb-5 h-7 w-7" />
          <p>Bildirishnomalar mavjud emas!</p>
        </div>
      </div>
      <div class="flex items-center md:mx-3" v-if="showSearchAndBtn">
        <button id="dropdownBtn" @click="toggleDropDown()" class="flex items-center" type="button">
          <span class="relative inline-block p-1 rounded-full shadow bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 md:p-2">
            <UserIcon class="w-6 h-6 dark:text-gray-300 md:h-7 md:w-7" />
          </span>
          <span class="flex items-center">
            <span class="text-left">
              <span class="block px-2 ml-2 text-lg font-semibold text-gray-900 capitalize cursor-pointer dark:text-gray-300">
                {{ fullname }}
              </span>
              <span class="block px-2 ml-2 text-gray-400 capitalize cursor-pointer text-md">
                {{ gymName }}
              </span>
            </span>
            <span class="p-1 ml-2 border rounded-full shadow border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </span>
          </span>
        </button>
        <div id="dropdownInformation" class="hidden bg-white border rounded shadow w-60 dark:border-gray-600 dark:bg-gray-800">
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
            <li class="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
              <router-link to="/profile" class="flex items-center px-4 py-2 text-md dark:text-gray-300"> <UserIcon class="mr-2 text-xl dark:text-gray-300" /> Profil </router-link>
            </li>
            <li class="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
              <router-link to="/settings" class="flex items-center px-4 py-2 text-md dark:text-gray-300"> <GearIcon class="mr-2 text-xl dark:text-gray-300" /> Sozlamalar </router-link>
            </li>
            <li class="flex items-center justify-between px-3 py-2 border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
              <div class="flex items-center">
                <MoonIcon v-if="isDark" class="w-6 h-6 mr-2" />
                <SunIcon v-else class="w-6 h-6 mr-2" />
                Tungi rejim
              </div>
              <label v-if="isLight" for="checked-toggle-off" class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" id="checked-toggle-off" class="sr-only peer" />
                <div @click="toggleDark()" class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
              </label>
              <label v-else for="checked-toggle-on" class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" id="checked-toggle-on" class="sr-only peer" checked />
                <div @click="toggleDark()" class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
              </label>
            </li>
            <li class="hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600">
              <router-link to="/" @click="onLogout()" class="flex items-center px-4 py-2 text-gray-700 text-md dark:text-gray-300">
                <LogoutIcon class="mr-2 text-xl dark:text-gray-300" />
                Chiqish
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <MobileBar v-if="!showSearchAndBtn" />
</template>

<script setup>
import LogoutIcon from '../../assets/icons/LogoutIcon.vue'
import GearIcon from '../../assets/icons/GearIcon.vue'
import MenuIcon from '../../assets/icons/MenuIcon.vue'
import ListIcon from '../../assets/icons/ListIcon.vue'
import BellIcon from '../../assets/icons/BellIcon.vue'
import SunIcon from '../../assets/icons/SunIcon.vue'
import MoonIcon from '../../assets/icons/MoonIcon.vue'
import UserIcon from '../../assets/icons/UserIcon.vue'
import SearchIcon from '../../assets/icons/SearchIcon.vue'
import BookmarkIcon from '../../assets/icons/BookmarkIcon.vue'
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import $ from 'jquery'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useDark, useToggle } from '@vueuse/core'
import MobileBar from './MobileBar.vue'

const store = useStore()
const router = useRouter()

// Dark & Light mode
const isDark = useDark()
const toggleDark = useToggle(isDark)

const isLight = computed(() => {
  return localStorage.getItem('vueuse-color-scheme') === 'light'
})

// Sidebar Function
function toggleSidebar() {
  store.commit('setSidebarStatus', !store.state.isSidebarOpen)
  if (localStorage.getItem('sidebar') === '1') {
    localStorage.setItem('sidebar', 0)
    store.commit('setSidebarStatus', !store.state.isSidebarOpen)
  } else {
    localStorage.setItem('sidebar', 1)
    store.commit('setSidebarStatus', !store.state.isSidebarOpen)
  }
}

const sidebarStatus = computed(() => {
  let refreshConf = localStorage.getItem('sidebar') === '1'
  return store.state.isSidebarOpen || refreshConf
})

// Logout Functions
function onLogout() {
  store.dispatch('auth/logout').then(
    () => {
      store.commit('setSelectedPage', '')
    },
    (error) => {}
  )
}

// Token expire checker function
function forbiddenChecker(error, msg) {
  if (error.message.split(' ').includes('403')) {
    store.dispatch('auth/logout').then(
      () => {
        store.commit('setSelectedPage', '')
      },
      (error) => {}
    )
  } else {
    notify.warning({
      message: msg,
      position: 'bottomLeft',
    })
  }
}

// User Data
const addUserInStore = () => {
  store.dispatch('userModule/get').then(
    (data) => {
      store.commit('setUser', data)
    },
    (error) => {
      forbiddenChecker(error, "Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi!")
    }
  )
}

// Settings Data
const addSettingInStore = () => {
  store.dispatch('settingModule/get').then(
    (data) => {
      store.commit('setSetting', data)
    },
    (error) => {
      forbiddenChecker(error, 'Sozlamalarni olishda xatolik yuz berdi!')
    }
  )
}

// Show notification badge
const showNotificationAlert = computed(() => {
  return store.state.settings.dailyPrice < 1000 || store.state.settings.monthlyPrice < 1000
})

// Check User Undefined
const checkUserUndefined = () => {
  setTimeout(() => {
    if (store.state.user.firstname === undefined) {
      store.dispatch('auth/logout').then(
        () => {
          store.commit('setSelectedPage', '')
        },
        (error) => {
          console.log('Get error while logout! ')
        }
      )
    }
  }, 1000)
}

onMounted(() => {
  addUserInStore()
  addSettingInStore()
  checkUserUndefined()
})

const fullname = computed(() => {
  return store.state.user.firstname + ' ' + store.state.user.lastname
})

const gymName = computed(() => {
  return store.state.settings.gymName
})

// User Info Dropdown
function toggleDropDown() {
  $('#dropdownInformation').toggleClass('hidden')
}

$(document).click(function (event) {
  if (!$(event.target).closest('#dropdownBtn').length && !$(event.target).is('#dropdownBtn')) {
    $('#dropdownInformation').addClass('hidden')
  }
})

// Notification
function toggleDropDownNotification() {
  $('#dropdownNotification').toggleClass('hidden')
}

$(document).click(function (event) {
  if (!$(event.target).closest('#dropdownNotificationBtn').length && !$(event.target).is('#dropdownNotificationBtn')) {
    $('#dropdownNotification').addClass('hidden')
  }
})

// Mobile Responsibility
const showSearchAndBtn = ref(false)

$(document).ready(() => {
  showSearchAndBtn.value = $(window).width() > 1024
})

$(window).resize(() => {
  showSearchAndBtn.value = $(window).width() > 1024
})
</script>

<style scoped>
.hidden {
  display: none;
  transition: all 0.5s ease-in-out;
}

#dropdownInformation {
  position: absolute;
  top: 100%;
  right: 10px;
  z-index: 50;
}

#dropdownNotification {
  position: absolute;
  top: 100%;
  right: 280px;
  z-index: 50;
}

@media all and (max-width: 1024px) {
  #dropdownNotification {
    right: 10px;
  }
}

@media all and (max-width: 768px) {
  #dropdownNotification {
    width: 100%;
    right: 0;
  }
}
</style>
