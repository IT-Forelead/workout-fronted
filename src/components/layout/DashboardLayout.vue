<template>
  <div class="flex">
    <Sidebar/>
    <div class="ml-0 lg:ml-80 flex-1 transition-all duration-500" :class="{'lg:ml-20': sidebarStatus}">
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

let login = computed(() => {
  return store.state.isLogin || localStorage.getItem('user') !== null
})

const sidebarStatus = computed(() => {
  let refreshConf = localStorage.getItem('sidebar') === '1'
  return store.state.isSidebarOpen || refreshConf
})

</script>
<style>
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

@media all and (max-width: 1024px) {
  .fade-enter-from {
    transform: translateX(100px);
  }

  .fade-leave-to {
    transform: translateX(-100px);
  }
}
</style>
