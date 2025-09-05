<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<style>
/* Global styles will be added here */
</style>
