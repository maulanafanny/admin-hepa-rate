<script setup lang="ts">
import type { ECOption } from '~/plugins/echarts'

const { dataValues } = defineProps({
  dataValues: {
    type: Array<{ label: string; value: number; dataset: number }>,
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
  console.log(value)

  if (value === 3) return 'Tinggi'
  if (value === 2) return 'Sedang'
  if (value === 1) return 'Rendah'

  return ''
}

const datasets = computed(() => {
  const dataset = new Set<string>()
  dataValues.forEach((data) => dataset.add(String(data.dataset)))

  return Array.from(dataset)
})

const labels = computed(() => {
  const label = new Set<string>()
  dataValues.forEach((data) => label.add(data.label))

  return Array.from(label)
})

const option: ECOption = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
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
      axisTick: { show: false },
      data: labels.value,
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => getTooltipText(value),
      },
    },
  ],
  series: datasets.value.map((dataset) => ({
    name: dataset,
    type: 'bar',
    barGap: 0,
    label: {
      show: true,
      position: 'insideBottom',
      distance: 15,
      align: 'left',
      verticalAlign: 'middle',
      rotate: 90,
      formatter: (params: any) =>
        `{name|${params.seriesName}} - {value|${getTooltipText(params.value)}}`,
      fontSize: 16,
      rich: {
        name: {},
        value: {},
      },
    },
    emphasis: {
      focus: 'series',
    },
    data: dataValues
      .filter((data) => data.dataset === Number(dataset))
      .map((data) => ({ value: data.value, itemStyle: { color: getColor(data.value) } })),
  })),
}
</script>

<template>
  <v-chart
    :option="option"
    autoresize
  />
</template>
