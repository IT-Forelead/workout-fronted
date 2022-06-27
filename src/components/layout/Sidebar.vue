<template>
  <div class="fixed h-screen w-80 bg-white transition-all duration-500" :class="{ 'w-20': sidebarStatus }" id="sidenavSecExample">
    <div class="mt-3 ml-3 p-2 pl-10" :class="{ 'ml-0 pl-5': sidebarStatus }">
      <router-link class="cursor-pointer" to="/">
        <div class="flex items-center">
          <img src="../../assets/images/logo.png" class="w-14 shrink-0" alt="#" />
          <h2 v-show="!sidebarStatus" class="ml-3 grow text-2xl font-semibold whitespace-nowrap text-zinc-900 transition-all duration-500">IT-Forelead</h2>
        </div>
      </router-link>
    </div>
    <ul class="relative mt-5" :class="{ 'mt-2': sidebarStatus }">
      <li class="relative flex items-center" v-for="menu of menus" :key="menu">
        <div class="-ml-1.5 h-14 w-3 rounded-xl" :class="{ 'bg-blue-500': page === menu.name || $router.currentRoute.value.path === menu.url }"></div>
        <MenuItem :menu="menu" :class="{ 'mx-3 pl-3.5': sidebarStatus }" />
      </li>
    </ul>
    <div v-show="!sidebarStatus" class="custom-top relative text-center text-sm text-gray-400 dark:text-gray-400">
      Copyright &copy; 2022 <a href="https://it-forelead.uz" class="hover:underline">IT-Forelead</a>. <br />
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
  let refreshConf = localStorage.getItem('sidebar') === '1' ? true : false
  return store.state.isSidebarOpen || refreshConf
})

const menus = [
  { id: 1, url: '/', icon: 'home-outline', name: 'Asosiy sahifa' },
  { id: 2, url: '/members', icon: 'people-outline', name: "A'zolarimiz" },
  { id: 2, url: '/payments', icon: 'wallet-outline', name: "To'lovlar" },
]
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
