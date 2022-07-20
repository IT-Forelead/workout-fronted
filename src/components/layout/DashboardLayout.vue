<template>
  <div class="flex">
    <Sidebar/>
    <div class="flex-1 ml-0 transition-all duration-500 lg:ml-80" :class="{'lg:ml-20': sidebarStatus}">
      <Navbar/>
      <div class="pt-5 mb-24 md:mb-0">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import {useStore} from 'vuex'
import {computed} from 'vue'

const store = useStore()

const sidebarStatus = computed(() => {
  let refreshConf = localStorage.getItem('sidebar') === '1'
  return store.state.isSidebarOpen || refreshConf
})

</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.fade-leave-active {
  transition: all 0.3s ease-in;
}
</style>
