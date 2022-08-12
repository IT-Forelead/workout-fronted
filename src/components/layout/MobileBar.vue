<template>
  <div>
    <div
      class="z-40 grid w-screen h-16 grid-cols-5 text-gray-900 bg-white border-t fixed-bottom dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600">
      <!-- Admin access -->
      <router-link to="/admin-dashboard" v-if="isAdmin"
        class="flex items-center justify-center cursor-pointer hover:bg-blue-500" @click="changePage('admin-home')"
        :class="{ 'bg-blue-500 text-white': page === 'admin-home' || $router.currentRoute.value.path === '/admin-dashboard' && !(page === 'leads') && !(page === 'clients') }">
        <HouseBoldIcon class="w-7 h-7" />
      </router-link>
      <router-link to="/clients" v-if="isAdmin"
        class="flex items-center justify-center cursor-pointer hover:bg-blue-500" @click="changePage('clients')"
        :class="{ 'bg-blue-500 text-white': page === 'clients' || $router.currentRoute.value.path === '/clients' && !(page === 'admin-home') && !(page === 'leads') }">
        <UsersBoldIcon class="w-7 h-7" />
      </router-link>
      <router-link to="/admin-messages" v-if="isAdmin" @click="changePage('messages')" class="flex items-center justify-center cursor-pointer hover:bg-blue-500"
      :class="{ 'bg-blue-500 text-white': page === 'messages' || $router.currentRoute.value.path === '/admin-messages' && !(page === 'admin-home') && !(page === 'leads') && !(page === 'clients') && !(page === 'profile')}">
        <EnvelopeIcon class="w-7 h-7" />
      </router-link>
      <router-link to="/unverified-clients" v-if="isAdmin"
        class="flex items-center justify-center cursor-pointer hover:bg-blue-500" @click="changePage('leads')"
        :class="{ 'bg-blue-500 text-white': page === 'leads' || $router.currentRoute.value.path === '/unverified-clients' && !(page === 'clients') && !(page === 'admin-home') }">
        <UserPlusBoldIcon class="w-7 h-7" />
      </router-link>
      <!-- Client access -->
      <router-link to="/dashboard" v-if="!isAdmin"
        class="flex items-center justify-center cursor-pointer hover:bg-blue-500" @click="changePage('home')"
        :class="{ 'bg-blue-500 text-white': page === 'home' || $router.currentRoute.value.path === '/dashboard' && !(page === 'reports') && !(page === 'profile') }">
        <HouseBoldIcon class="w-7 h-7" />
      </router-link>
      <router-link to="/members" v-if="!isAdmin"
        class="flex items-center justify-center cursor-pointer hover:bg-blue-500" @click="changePage('members')"
        :class="{ 'bg-blue-500 text-white': page === 'members' || $router.currentRoute.value.path === '/members' && !(page === 'reports') && !(page === 'profile') }">
        <UsersBoldIcon class="w-7 h-7" />
      </router-link>
      <router-link to="/payments" v-if="!isAdmin"
        class="flex items-center justify-center cursor-pointer hover:bg-blue-500" @click="changePage('payments')"
        :class="{ 'bg-blue-500 text-white': page === 'payments' || $router.currentRoute.value.path === '/payments' && !(page === 'reports') && !(page === 'profile') }">
        <WalletBoldIcon class="w-7 h-7" />
      </router-link>
      <div v-if="!isAdmin" class="flex items-center justify-center cursor-pointer hover:bg-blue-500"
        @click="changePage('reports'); toggleReportDropMenu()"
        :class="{ 'bg-blue-500 text-white': page === 'reports' || ($router.currentRoute.value.path === '/arrival' || $router.currentRoute.value.path === '/messages') && !(page === 'profile') && !(page === 'settings') }">
        <RepeatBoldIcon class="w-7 h-7" />
      </div>
      <div v-if="!isAdmin" class="flex items-center justify-center cursor-pointer hover:bg-blue-500"
        @click="changePage('profile'); toggleProfileDropMenu()"
        :class="{ 'bg-blue-500 text-white': page === 'profile' || ($router.currentRoute.value.path === '/settings' || $router.currentRoute.value.path === '/profile') && !(page === 'arrival') && !(page === 'messages') }">
        <UserBoldIcon class="w-7 h-7" />
      </div>
      <div v-else class="flex items-center justify-center cursor-pointer hover:bg-blue-500"
        @click="changePage('admin-profile'); toggleProfileDropMenu()"
        :class="{ 'bg-blue-500 text-white': page === 'admin-profile' || ($router.currentRoute.value.path === '/admin-profile') && !(page === 'leads') && !(page === 'clients') }">
        <UserBoldIcon class="w-7 h-7" />
      </div>
    </div>
    <!--  DROP MENU Reports-->
    <div v-if="!isAdmin" ref="reportDropdown"
      class="z-30 px-4 py-2 text-gray-900 transition-all duration-300 bg-white border-t fixed-bottom dark:text-gray-300 dark:bg-gray-800 bottom-16 rounded-t-xl dark:border-gray-600 translate-y-52"
      :class="{ 'translate-y-0': showReportDropMenu }">
      <div class="flex items-start justify-center">
        <div class="h-1.5 w-10 bg-slate-200 dark:bg-gray-700 rounded-full" @click="toggleReportDropMenu()"></div>
      </div>
      <div class="flex flex-col mt-2">
        <router-link to="/arrival" @click="toggleReportDropMenu()"
          class="flex items-center py-3 border-b dark:hover:bg-gray-700 dark:border-gray-600">
          <RepeatIcon class="mr-2 w-7 h-7" />
          Kelib-ketishlar
        </router-link>
        <router-link to="/messages" @click="toggleReportDropMenu()"
          class="flex items-center py-3 dark:hover:bg-gray-700">
          <EnvelopeIcon class="mr-2 w-7 h-7" />
          SMS xabarlar
        </router-link>
      </div>
    </div>
    <!--  DROP MENU Profile-->
    <div ref="profileDropdown"
      class="z-30 px-4 py-2 text-gray-900 transition-all duration-300 bg-white border-t opacity-0 fixed-bottom dark:text-gray-300 dark:bg-gray-800 bottom-16 rounded-t-xl dark:border-gray-600 translate-y-60"
      :class="{ 'translate-y-1 opacity-100': showProfileDropMenu }">
      <div class="flex items-start justify-center">
        <div class="h-1.5 w-10 bg-slate-200 dark:bg-gray-700 rounded-full" @click="toggleProfileDropMenu()"></div>
      </div>
      <div class="flex flex-col mt-2">
        <router-link to="/profile" v-if="!isAdmin" @click="toggleProfileDropMenu()"
          class="flex items-center py-3 dark:hover:bg-gray-700">
          <UserIcon class="mr-2 w-7 h-7" />
          Profil
        </router-link>
        <router-link to="/admin-profile" v-else @click="toggleProfileDropMenu()"
          class="flex items-center py-3 dark:hover:bg-gray-700">
          <UserIcon class="mr-2 w-7 h-7" />
          Profil
        </router-link>
        <router-link to="/settings" v-if="!isAdmin" @click="toggleProfileDropMenu()"
          class="flex items-center py-3 dark:hover:bg-gray-700 border-y dark:border-gray-600">
          <GearIcon class="mr-2 w-7 h-7" />
          Sozlamalar
        </router-link>
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center">
            <BulbOffIcon v-if="isDark" class="mr-2 w-7 h-7" />
            <BulbOnIcon v-else class="mr-2 w-7 h-7" />
            Tungi rejim
          </div>
          <label v-if="isLight" for="dark-mode-off" class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" id="dark-mode-off" class="sr-only peer">
            <span @click="toggleDark()"
              class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
            </span>
          </label>
          <label v-else for="dark-mode-on" class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" id="dark-mode-on" class="sr-only peer" checked>
            <span @click="toggleDark()"
              class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
            </span>
          </label>
        </div>
        <a href="/login" @click="onLogout()"
          class="flex items-center py-3 dark:hover:bg-gray-700 border-y dark:border-gray-600">
          <LogoutIcon class="mr-2 w-7 h-7" />
          Chiqish
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import UserBoldIcon from "../../assets/icons/UserBoldIcon.vue";
import UserPlusBoldIcon from "../../assets/icons/UserPlusBoldIcon.vue";
import HouseBoldIcon from "../../assets/icons/HouseBoldIcon.vue";
import UsersBoldIcon from "../../assets/icons/UsersBoldIcon.vue";
import WalletBoldIcon from "../../assets/icons/WalletBoldIcon.vue";
import RepeatIcon from "../../assets/icons/RepeatIcon.vue";
import RepeatBoldIcon from "../../assets/icons/RepeatBoldIcon.vue";
import EnvelopeIcon from "../../assets/icons/EnvelopeIcon.vue";
import UserIcon from "../../assets/icons/UserIcon.vue";
import GearIcon from "../../assets/icons/GearIcon.vue";
import BulbOffIcon from "../../assets/icons/BulbOffIcon.vue";
import BulbOnIcon from "../../assets/icons/BulbOnIcon.vue";
import LogoutIcon from "../../assets/icons/LogoutIcon.vue";
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { onClickOutside, useDark, useToggle } from "@vueuse/core";

const store = useStore()

// Admin access
const isAdmin = computed(() => store.state.user.role === 'admin')

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
  store.dispatch('auth/logout').then(() => { })
}

</script>