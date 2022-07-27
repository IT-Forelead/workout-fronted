<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>
<script setup>
import {computed} from "vue";
import {useRouter} from "vue-router";

const defaultLayout = "login";

const {currentRoute} = useRouter();

const layout = computed(
    () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);
</script>

<style>

</style>
