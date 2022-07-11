<template>
  <div class="sticky-top z-10 flex h-20 items-center justify-between bg-white py-4 dark:bg-gray-800 dark:text-gray-300">
    <div class="ml-5 flex items-center justify-between">
      <ListIcon v-show="!sidebarStatus" @click="toggleSidebar()"
                class="menu-btn mr-5 cursor-pointer rounded-full p-1 text-4xl hover:text-blue-600 hover:shadow"/>
      <MenuIcon v-show="sidebarStatus" @click="toggleSidebar()"
                class="menu-btn mr-5 cursor-pointer rounded-full p-1 text-4xl hover:text-blue-600 hover:shadow"/>
      <div class="relative">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button type="submit" class="focus:shadow-outline p-4 focus:outline-none">
            <SearchIcon class="w-5 h-5"/>
          </button>
        </span>
        <input type="search" name="search"
               class="w-96 rounded-full border border-slate-300 bg-slate-100 py-2 pl-16 text-lg text-slate-500 outline-none focus:bg-slate-200 focus:outline-none dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300"
               placeholder="Izlash..." autocomplete="off"/>
      </div>
    </div>
    <div class="mr-5 flex items-center">
      <button @click="toggleDark()"
              class="relative mr-6 inline-block rounded-full bg-slate-100 p-2 text-slate-500 shadow hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600">
        <MoonIcon v-show="!isDark" class="w-7 h-7 dark:text-gray-300"/>
        <SunIcon v-show="isDark" class="w-7 h-7 dark:text-gray-300"/>
      </button>
      <button id="dropdownNotificationBtn" @click="toggleDropDownNotification()"
              class="relative mr-3 inline-block rounded-full bg-slate-100 p-2 text-slate-500 shadow hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600">
        <BellIcon class="w-7 h-7 dark:text-gray-300"/>
        <div class="absolute top-0.5 right-0 animate-ping rounded-full bg-rose-500 p-1.5"></div>
        <div class="absolute top-0.5 right-0 rounded-full bg-rose-500 p-1.5"></div>
      </button>
      <div id="dropdownNotification"
           class="hidden w-96 rounded border bg-white shadow dark:bg-gray-800 dark:border-gray-600">
        <div class="text-md flex items-center justify-between px-5 py-3">
          <div class="mr-3 flex items-center px-1">
            <div class="relative bottom-1.5 mr-3">
              <div class="absolute top-0 right-0 animate-ping rounded-full bg-blue-500 p-1.5"></div>
              <div class="absolute top-0 right-0 rounded-full bg-blue-500 p-1.5"></div>
            </div>
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <div class="pt-1 text-center text-lg font-bold text-gray-600 dark:text-gray-300">
                <BookmarkIcon class="w-7 h-7"/>
              </div>
            </div>
          </div>
          <div>
            <p class="font-semibold text-gray-900 dark:text-gray-300">Bildirishnoma</p>
            <p class="text-md text-gray-600 dark:text-gray-400">Tug'ilgan kun tabrigi uchun SMS shablon biriktiring!</p>
          </div>
        </div>
      </div>
      <div class="mx-3 flex items-center">
        <button id="dropdownBtn" @click="toggleDropDown()" class="flex items-center" type="button">
          <div
              class="relative inline-block rounded-full bg-slate-100 p-2 text-slate-500 shadow hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600">
            <UserIcon class="w-7 h-7 dark:text-gray-300"/>
          </div>
          <div class="flex items-center">
            <div class="text-left">
              <div class="ml-2 cursor-pointer px-2 text-lg font-semibold capitalize text-gray-900 dark:text-gray-300">
                {{ fullname }}
              </div>
              <div class="text-md ml-2 cursor-pointer px-2 capitalize text-gray-400">Admin</div>
            </div>
            <div
                class="border-slare-200 ml-2 rounded-full border bg-slate-50 p-1 text-slate-500 shadow hover:bg-slate-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:text-gray-300">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </button>
        <div id="dropdownInformation"
             class="hidden w-60 border rounded bg-white shadow dark:bg-gray-800 dark:border-gray-600">
          <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
            <li class="border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
              <router-link to="/profile" class="text-md flex items-center px-4 py-2 dark:text-gray-300">
                <ProfileIcon class="mr-2 text-xl dark:text-gray-300"/>
                Profil
              </router-link>
            </li>
            <li class="hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
              <a href="/login" @click="onLogout()"
                 class="text-md flex items-center px-4 py-2 text-gray-700 dark:text-gray-300">
                <LogoutIcon class="mr-2 text-xl dark:text-gray-300"/>
                Chiqish</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import $ from 'jquery'
import LogoutIcon from '../../assets/icons/LogoutIcon.vue'
import ProfileIcon from '../../assets/icons/ProfileIcon.vue'
import MenuIcon from '../../assets/icons/MenuIcon.vue'
import ListIcon from '../../assets/icons/ListIcon.vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import {useDark, useToggle} from '@vueuse/core'
import BellIcon from "../../assets/icons/BellIcon.vue";
import SunIcon from "../../assets/icons/SunIcon.vue";
import MoonIcon from "../../assets/icons/MoonIcon.vue";
import UserIcon from "../../assets/icons/UserIcon.vue";
import SearchIcon from "../../assets/icons/SearchIcon.vue";
import BookmarkIcon from "../../assets/icons/BookmarkIcon.vue";
import authService from "../../services/auth.service";

const isDark = useDark()
const toggleDark = useToggle(isDark)

const store = useStore()
const router = useRouter()

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

function checkLogin(data) {
  store.commit('setLogin', data)
}

function onLogout() {
  store.dispatch('auth/logout').then(() => {
    checkLogin(false)
  })
}

const addUserInStore = () => {
  store.dispatch('userModule/get').then(
      (data) => {
        store.commit('setUser', data)
        localStorage.setItem('_id', data.id)
      },
      (error) => {
        notify.error({
          message: "Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi!",
          position: 'bottomLeft',
        })
        autoLogout()
      }
  )
}

const fullname = computed(() => {
  return store.state.user.firstname + " " + store.state.user.lastname
})

function toggleDropDown() {
  $('#dropdownInformation').toggleClass('hidden')
}

$(document).click(function (event) {
  if (!$(event.target).closest('#dropdownBtn').length && !$(event.target).is('#dropdownBtn')) {
    $('#dropdownInformation').addClass('hidden')
  }
})

function toggleDropDownNotification() {
  $('#dropdownNotification').toggleClass('hidden')
}

$(document).click(function (event) {
  if (!$(event.target).closest('#dropdownNotificationBtn').length && !$(event.target).is('#dropdownNotificationBtn')) {
    $('#dropdownNotification').addClass('hidden')
  }
})

function autoLogout() {
  setTimeout(() => {
    if (!store.state.user.firstname) {
      onLogout()
      router.go('/login')
    }
  }, 1000)
}

$(window).click(() => {
  autoLogout()
})

onMounted(() => {
  addUserInStore()
  autoLogout()
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
  right: 180px;
  z-index: 50;
}
</style>
