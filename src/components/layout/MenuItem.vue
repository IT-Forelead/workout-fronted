<template>
  <router-link :to="menu.url" @click="changePage(menu.name)"
    :class="{ 'active': page === menu.name || $router.currentRoute.value.path === menu.url }"
    class="flex items-center flex-1 px-6 py-6 pl-10 mx-5 my-2 overflow-hidden text-lg font-bold transition duration-200 ease-in rounded-lg h-14 text-ellipsis whitespace-nowrap hover:text-white hover:bg-blue-400 dark:text-gray-300">
    <span class="flex items-center text-base font-bold">
      <ion-icon class="mr-5 text-2xl" :name="menu.icon"></ion-icon>{{ menu.name }}
    </span>
  </router-link>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useStore()

    const changePage = (page) => {
      store.commit('setSelectedPage', page)
    }

    const page = computed(() => {
      return store.state.currentPage
    })

    return {
      changePage,
      page,
    }
  },
}
</script>

<style scoped>
</style>