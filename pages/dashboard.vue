<script setup lang="ts">
definePageMeta({
  icon: 'mdi-monitor-dashboard',
  title: 'Dashboard',
  drawerIndex: 1,
})
const stats = ref([
  {
    icon: 'mdi-web',
    title: 'Sudimoro',
    value: 699,
    unit: 'Kasus',
    color: 'error',
    caption: 'Populasi: 34rb, 2019',
  },
  {
    icon: 'mdi-web',
    title: 'Ngadirojo',
    value: 255,
    unit: 'Kasus',
    color: 'error',
    caption: 'Populasi: 48rb, 2019',
  },
  {
    icon: 'mdi-web',
    title: 'Tulakan',
    value: 102,
    unit: 'Kasus',
    color: 'warning',
    caption: 'Populasi: 86rb, 2019',
  },
  {
    icon: 'mdi-web',
    title: 'Arjosari',
    value: 34,
    unit: 'Kasus',
    color: 'success',
    caption: 'Populasi: 42rb, 2019',
  },
  {
    icon: 'mdi-home-group',
    title: 'Total Populasi',
    value: 596,
    unit: 'rb',
    color: 'grey',
    caption: 'Tulakan: 86rb',
  },
  {
    icon: 'mdi-currency-cny',
    title: 'Total Kasus',
    value: 1170,
    color: 'error',
    caption: 'Sudimoro: 699',
  },
])
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="stat in stats"
        :key="stat.title"
        cols="12"
        sm="6"
        md="4"
        lg="2"
      >
        <StatsCard
          :title="stat.title"
          :unit="stat.unit"
          :color="stat.color"
          :icon="stat.icon"
          :value="stat.value"
        >
          <template #footer>
            {{ stat.caption }}
          </template>
        </StatsCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="12"
      >
        <v-card class="pa-2">
          <ChartLine />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="pa-2">
          <ChartRadar />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="pa-2">
          <ChartPie />
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="pa-2">
          <ChartBar :data-values="[1, 3, 3, 2, 2, 2, 1, 2, 2, 2, 2, 1]" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card:not(.stats-card) {
  height: 340px;
}
</style>
