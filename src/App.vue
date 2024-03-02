<script setup>
import { RouterLink, RouterView } from 'vue-router'

import HeaderView from './views/HeaderView.vue';
</script>

<template>
  <HeaderView></HeaderView>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  border: 1px solid #ccc;
}
</style>
