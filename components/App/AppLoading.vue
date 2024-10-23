<script setup lang="ts">
import catloading from '@/assets/cat_loading.json'
import { Vue3Lottie } from 'vue3-lottie'
</script>

<template>
  <div
    class="d-flex align-center justify-content-center"
    style="height: 100vh"
  >
    <client-only>
      <Vue3Lottie
        :animation-data="catloading"
        :width="800"
        :height="200"
      />
    </client-only>
  </div>
</template>
