<script setup lang="ts">
import { THEME_KEY } from 'vue-echarts'

const theme = useTheme()
provide(
  THEME_KEY,
  computed(() => (theme.current.value.dark ? 'dark' : undefined)),
)
const route = useRoute()
const title = computed(() => {
  return route.meta?.title || route.matched[0].meta?.title || ''
})
useHead({
  title,
  titleTemplate: (t) => (t ? `${t} | Hepatitis-A Rate` : 'Hepatitis-A Rate'),
  htmlAttrs: { lang: 'id' },
  link: [{ rel: 'icon', href: '/favicon.ico' }],
})
useSeoMeta({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  description: 'Admin dashboard for Hepatitis-A Rate Visualization',
  ogImage: '/social-image.png',
  twitterImage: '/social-image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <v-app>
    <template v-if="route.name !== 'login'">
      <app-drawer />
      <app-bar />
      <v-main style="--v-layout-top: 64px; --v-layout-bottom: 32px">
        <nuxt-page />
      </v-main>
      <app-footer />
    </template>
    <template v-else>
      <v-main>
        <nuxt-page />
      </v-main>
    </template>
  </v-app>
</template>

<style scoped>
.v-main {
  padding-top: 0;
  margin-top: var(--v-layout-top);
  padding-bottom: 0;
  margin-bottom: var(--v-layout-bottom);
  height: calc(100vh - var(--v-layout-top) - var(--v-layout-bottom));
  overflow-y: auto;
  transition-property: padding;
}
</style>
