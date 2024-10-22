<script setup lang="ts">
import type { ECOption } from '~/plugins/echarts'

const { data } = defineProps<{
  data: [string, number][]
}>()

const option: ECOption = {
  backgroundColor: 'transparent',
  dataset: { source: data },
  title: {
    text: 'Total Kasus per Tahun',
    left: 'center',
    top: 16,
    textStyle: {
      color: '#fff',
    },
  },
  visualMap: {
    show: false,
    type: 'continuous',
    min: 0,
    max: 400,
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: 20,
    left: '2%',
    right: '2%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Total Kasus',
      type: 'line',
      showSymbol: false,
      lineStyle: {
        width: 4,
      },
    },
  ],
}
</script>

<template>
  <v-chart
    :option="option"
    autoresize
  />
</template>
