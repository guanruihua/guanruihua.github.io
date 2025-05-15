export const files_vue = {
  'src/App.vue':`<script setup>
import { ref } from 'vue';
const msg = ref('world');
</script>

<template>
  <h1>Hello {{ msg }}</h1>
</template>`,
  'src/styles.css': `body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  color: #fff;
  background: #151515;
}

h1 {
  font-size: 1.5rem;
}`,
}