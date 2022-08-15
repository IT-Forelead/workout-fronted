<template>
  <div class="fixed hidden h-screen transition-all duration-500 bg-white lg:block w-80 dark:bg-gray-800"
    :class="{ 'w-20': sidebarStatus }" id="sidenavSecExample">
    <div class="p-2 pl-10 mt-3 ml-3" :class="{ 'ml-0 pl-5': sidebarStatus }">
      <div class="flex items-center">
        <img src="../../assets/images/logo.png" class="w-14 shrink-0" alt="#" />
        <h2 v-if="!sidebarStatus"
          class="ml-3 text-2xl font-semibold transition-all duration-500 grow whitespace-nowrap text-zinc-900 dark:text-gray-300">
          IT-Forelead</h2>
      </div>
    </div>
    <ul class="relative mt-5" :class="{ 'mt-2': sidebarStatus }">
      <li class="relative flex items-center" v-for="(menu, idx) of menus" :key="idx">
        <div class="-ml-1.5 h-14 w-3 rounded-xl"
          :class="{ 'bg-blue-500': page === menu.name || $router.currentRoute.value.path === menu.url }"></div>
        <MenuItem :menu="menu" :class="{ 'mx-3 pl-3.5': sidebarStatus }" />
      </li>
    </ul>
    <div v-if="!sidebarStatus" class="absolute bottom-0 w-full mb-3 text-sm text-center text-gray-400 dark:text-gray-400">
      Copyright &copy; 2022 <a href="https://t.me/trimuzsupport" class="hover:underline">IT-Forelead</a>. <br />
      All Rights Reserved.
    </div>
  </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'

const store = useStore()

const page = computed(() => {
  return store.state.currentPage
})

const sidebarStatus = computed(() => {
  let refreshConf = localStorage.getItem('sidebar') === '1'
  return store.state.isSidebarOpen || refreshConf
})

let menus = accessRoutes()
function accessRoutes() {
  if (store.state.user.role === 'admin' || localStorage.getItem('role') === 'admin') {
    return [
      { id: 1, url: '/admin-dashboard', icon: 'home-outline', name: 'Bosh sahifa' },
      { id: 2, url: '/clients', icon: 'people-outline', name: 'Mijozlar' },
      { id: 3, url: '/unverified-clients', icon: 'person-add-outline', name: 'Kutishdagi mijozlar' },
      { id: 4, url: '/admin-messages', icon: 'mail-outline', name: "SMS xabarlar" },
      { id: 4, url: '/messages-report', icon: 'mail-outline', name: "SMS xabarlar hisoboti" },
    ]
  } else if(store.state.user.role === 'client' || localStorage.getItem('role') === 'client'){
    return [
      { id: 1, url: '/dashboard', icon: 'home-outline', name: 'Asosiy sahifa' },
      { id: 2, url: '/members', icon: 'people-outline', name: "A'zolarimiz" },
      { id: 3, url: '/payments', icon: 'wallet-outline', name: "To'lovlar" },
      { id: 4, url: '/arrival', icon: 'repeat-outline', name: "Kelib-Ketishlar" },
      { id: 5, url: '/messages', icon: 'mail-outline', name: "SMS xabarlar" },
      { id: 6, url: '/settings', icon: 'settings-outline', name: "Sozlamalar" },
    ]
  }
}
</script>

<style scoped>
.active {
  background-color: rgb(59 130 246);
  color: #fff;
}

.custom-top {
  top: 49vh;
}
</style>
