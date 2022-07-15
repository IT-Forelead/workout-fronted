<template>
  <div>
    <div
        class="fixed-bottom z-40 grid grid-cols-5 h-16 bg-white text-gray-900 dark:text-gray-300 dark:bg-gray-800 w-screen border-t dark:border-gray-600">
      <router-link to="/" class="flex items-center justify-center cursor-pointer hover:bg-blue-500"
                   @click="changePage('home')"
                   :class="{'bg-blue-500 text-white': page === 'home' || $router.currentRoute.value.path === '/' && !(page === 'reports') && !(page === 'profile')}">
        <HouseBoldIcon class="w-7 h-7"/>
      </router-link>
      <router-link to="/members" class="flex items-center justify-center cursor-pointer hover:bg-blue-500"
                   @click="changePage('members')"
                   :class="{'bg-blue-500 text-white': page === 'members' || $router.currentRoute.value.path === '/members' && !(page === 'reports') && !(page === 'profile')}">
        <UsersBoldIcon class="w-7 h-7"/>
      </router-link>
      <router-link to="/payments" class="flex items-center justify-center cursor-pointer hover:bg-blue-500"
                   @click="changePage('payments')"
                   :class="{'bg-blue-500 text-white': page === 'payments' || $router.currentRoute.value.path === '/payments' && !(page === 'reports') && !(page === 'profile')}">
        <WalletBoldIcon class="w-7 h-7"/>
      </router-link>
      <div class="flex items-center justify-center cursor-pointer hover:bg-blue-500"
           @click="changePage('reports'); toggleReportDropMenu()"
           :class="{'bg-blue-500 text-white': page === 'reports' || ($router.currentRoute.value.path === '/arrival' || $router.currentRoute.value.path === '/Messages') && !(page === 'profile') && !(page === 'settings')}">
        <RepeatBoldIcon class="w-7 h-7"/>
      </div>
      <div class="flex items-center justify-center cursor-pointer hover:bg-blue-500"
           @click="changePage('profile'); toggleProfileDropMenu()"
           :class="{'bg-blue-500 text-white': page === 'profile' || ($router.currentRoute.value.path === '/settings' || $router.currentRoute.value.path === '/profile') && !(page === 'arrival') && !(page === 'messages')}">
        <UserBoldIcon class="w-7 h-7"/>
      </div>
    </div>
    <!--  DROP MENU Reports-->
    <div ref="reportDropdown"
         class="fixed-bottom z-30 bg-white text-gray-900 dark:text-gray-300 dark:bg-gray-800 bottom-16 rounded-t-xl border-t dark:border-gray-600 px-4 py-2 transition-all duration-300 translate-y-52"
         :class="{'translate-y-0': showReportDropMenu}">
      <div class="flex justify-center items-start">
        <div class="h-1.5 w-10 bg-slate-200 dark:bg-gray-700 rounded-full" @click="toggleReportDropMenu()"></div>
      </div>
      <div class="flex flex-col mt-2">
        <router-link to="/arrival" @click="toggleReportDropMenu()"
                     class="flex items-center py-3 dark:hover:bg-gray-700 border-b dark:border-gray-600">
          <RepeatIcon class="w-7 h-7 mr-2"/>
          Kelib-ketishlar
        </router-link>
        <router-link to="/messages" @click="toggleReportDropMenu()"
                     class="flex items-center py-3 dark:hover:bg-gray-700">
          <EnvelopeIcon class="w-7 h-7 mr-2"/>
          SMS xabarlar
        </router-link>
      </div>
    </div>
    <!--  DROP MENU Profile-->
    <div ref="profileDropdown"
         class="fixed-bottom z-30 bg-white text-gray-900 dark:text-gray-300 dark:bg-gray-800 bottom-16 rounded-t-xl border-t dark:border-gray-600 px-4 py-2 transition-all duration-300 translate-y-52 opacity-0"
         :class="{'translate-y-0 opacity-100': showProfileDropMenu}">
      <div class="flex justify-center items-start">
        <div class="h-1.5 w-10 bg-slate-200 dark:bg-gray-700 rounded-full" @click="toggleProfileDropMenu()"></div>
      </div>
      <div class="flex flex-col mt-2">
        <router-link to="/profile" @click="toggleProfileDropMenu()"
                     class="flex items-center py-3 dark:hover:bg-gray-700">
          <UserIcon class="w-7 h-7 mr-2"/>
          Profil
        </router-link>
        <router-link to="/settings" @click="toggleProfileDropMenu()"
                     class="flex items-center py-3 dark:hover:bg-gray-700 border-y dark:border-gray-600">
          <GearIcon class="w-7 h-7 mr-2"/>
          Sozlamalar
        </router-link>
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center">
            <MoonIcon v-if="isDark" class="w-7 h-7 mr-2"/>
            <SunIcon v-else class="w-7 h-7 mr-2"/>
            Tungi rejim
          </div>
          <label v-if="isLight" for="dark-mode-off" class="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="dark-mode-off" class="sr-only peer">
            <span @click="toggleDark()"
                 class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
            </span>
          </label>
          <label v-else for="dark-mode-on" class="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value="" id="dark-mode-on" class="sr-only peer" checked>
            <span @click="toggleDark()"
                 class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
            </span>
          </label>
        </div>
        <a href="/" @click="onLogout()"
           class="flex items-center py-3 dark:hover:bg-gray-700 border-y dark:border-gray-600">
          <LogoutIcon class="w-7 h-7 mr-2"/>
          Chiqish
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import UserBoldIcon from "../../assets/icons/UserBoldIcon.vue";
import HouseBoldIcon from "../../assets/icons/HouseBoldIcon.vue";
import UsersBoldIcon from "../../assets/icons/UsersBoldIcon.vue";
import WalletBoldIcon from "../../assets/icons/WalletBoldIcon.vue";
import RepeatIcon from "../../assets/icons/RepeatIcon.vue";
import RepeatBoldIcon from "../../assets/icons/RepeatBoldIcon.vue";
import EnvelopeIcon from "../../assets/icons/EnvelopeIcon.vue";
import UserIcon from "../../assets/icons/UserIcon.vue";
import GearIcon from "../../assets/icons/GearIcon.vue";
import MoonIcon from "../../assets/icons/MoonIcon.vue";
import SunIcon from "../../assets/icons/SunIcon.vue";
import LogoutIcon from "../../assets/icons/LogoutIcon.vue";
import {useStore} from 'vuex'
import {computed, ref} from 'vue'
import {onClickOutside, useDark, useToggle} from "@vueuse/core";

const store = useStore()

// Dark & Light Mode
const isDark = useDark()
const toggleDark = useToggle(isDark)

const isLight = computed(() => {
  return localStorage.getItem('vueuse-color-scheme') === 'light'
})

// Active Class
const changePage = (page) => {
  store.commit('setSelectedPage', page)
}

const page = computed(() => {
  return store.state.currentPage
})

// Report Dropdown Function
const showReportDropMenu = ref(false)
const reportDropdown = ref(null)

const toggleReportDropMenu = () => showReportDropMenu.value = !showReportDropMenu.value

onClickOutside(reportDropdown, () => {
  if (showReportDropMenu.value) {
    showReportDropMenu.value = !showReportDropMenu.value
  }
})

// Profile Dropdown Function
const showProfileDropMenu = ref(false)
const profileDropdown = ref(null)

const toggleProfileDropMenu = () => showProfileDropMenu.value = !showProfileDropMenu.value

onClickOutside(profileDropdown, () => {
  if (showProfileDropMenu.value) {
    showProfileDropMenu.value = !showProfileDropMenu.value
  }
})

function onLogout() {
  store.dispatch('auth/logout').then(() => {})
}

</script>