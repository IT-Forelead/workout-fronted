<template>
  <div v-if="login" class="dark:bg-gray-800">
    <div class="flex">
      <Sidebar />
      <div class="ml-80 flex-1 transition-all duration-500" :class="{'ml-20': sidebarStatus}">
        <Navbar />
        <div class="bg-slate-100 dark:bg-gray-900 rounded-tl-xl pt-5 custom-height">
          <router-view />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>
<script setup>
import Navbar from './components/layout/Navbar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

let login = computed(() => {
  return store.state.isLogin || localStorage.getItem('user') !== null
})

const sidebarStatus = computed(() => {
  let refreshConf = localStorage.getItem('sidebar') === '1'
  return store.state.isSidebarOpen || refreshConf
})
</script>

<style scoped>
.custom-height {
  height: calc(100vh - 5rem);
}
</style>
