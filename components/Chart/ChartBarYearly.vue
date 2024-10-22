<script setup lang="ts">
import type { ECOption } from '~/plugins/echarts'

const { dataValues } = defineProps({
  dataValues: {
    type: Array<{ label: string; value: number }>,
    required: true,
  },
})

const getColor = (value: number) => {
  if (value === 3) return '#ff7070'
  if (value === 2) return '#fac858'
  if (value === 1) return '#91cc75'

  return 'grey'
}

const getTooltipText = (value: number) => {
  if (value === 3) return 'Tinggi'
  if (value === 2) return 'Sedang'
  if (value === 1) return 'Rendah'

  return 'Unknown'
}

const dataWithColors = dataValues.map((data) => ({
  value: data.value,
  itemStyle: { color: getColor(data.value) },
}))

const option: ECOption = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: (params: any) => {
      let tooltipText = `${params[0].name}<br/>`

      params.forEach((item: any) => {
        tooltipText += `${item.seriesName}: <b>${getTooltipText(item.value)}</b>`
      })

      return tooltipText
    },
  },
  grid: {
    top: 20,
    left: '2%',
    right: '2%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: dataValues.map((value) => value.label),
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: 'Tingkat Kerawanan',
      type: 'bar',
      stack: 'vistors',
      barWidth: '60%',
      data: dataWithColors,
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
