<script setup lang="ts">
import { ref, computed } from 'vue'
import { GoogleMap, Polygon, InfoWindow } from 'vue3-google-map'
import pacitanGeoJSON from '~/assets/pacitan.json'

definePageMeta({
  title: 'Peta',
  breadcrumb: 'disabled',
})

const route = useRoute()
const currentRouteYear = computed(() => route.path.split('/')[2])

const { data: criterias, pending: loadingCriterias } = useLazyFetch('/api/criteria/findByYear', {
  params: { year: currentRouteYear.value },
})

const getColor = (value: number) => {
  if (value === 3) return '#ff7070'
  if (value === 2) return '#fac858'
  if (value === 1) return '#91cc75'

  return 'grey'
}
const getTooltipText = (color: string) => {
  if (color === '#ff7070') return 'Tinggi'
  if (color === '#fac858') return 'Sedang'
  if (color === '#91cc75') return 'Rendah'

  return 'Unknown'
}

const infoWindowPosition = ref<{ lat: number; lng: number } | null>(null)
const infoWindowContent = ref<{ name: string; color: string; risk: string } | null>(null)

const pacitanPolygon = computed(() => {
  return pacitanGeoJSON.features.map((feature) => {
    const multiPolygonCoords = feature.geometry.coordinates
    const paths = multiPolygonCoords.map((polygon) =>
      polygon[0].map(([lng, lat]) => ({ lat, lng })),
    )

    const clusterId = criterias.value?.find((c) => c.district.id === feature.properties.State_Code)
      ?.criteria.cluster_id
    const color = getColor(clusterId! + 1)

    return {
      paths,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
      properties: feature.properties,
    }
  })
})

const handleMouseOver = (event: any, polygon: any) => {
  infoWindowPosition.value = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  }
  infoWindowContent.value = {
    name: polygon.properties.Kecamatan,
    risk: getTooltipText(polygon.fillColor),
    color: polygon.strokeColor,
  }
}

const handleMouseOut = () => {
  infoWindowPosition.value = null
  infoWindowContent.value = null
}

const center = { lat: -8.1, lng: 111.2 }
</script>

<template>
  <v-container fluid>
    <h1 class="mb-3">Pemetaan Tingkat Kerawanan Tahunan Hepatitis-A</h1>

    <v-card
      class="pa-2"
      height="75vh"
      :loading="loadingCriterias"
    >
      <GoogleMap
        :api-key="useRuntimeConfig().public.maps_api_key"
        style="width: 100%; height: 100%"
        :center="center"
        :zoom="11"
      >
        <Polygon
          v-for="(polygon, index) in pacitanPolygon"
          :key="index"
          :options="polygon"
          @mouseover="(event) => handleMouseOver(event, polygon)"
          @mouseout="handleMouseOut"
        />

        <InfoWindow
          v-if="infoWindowPosition"
          :options="{ position: infoWindowPosition }"
        >
          <div
            v-if="infoWindowContent"
            style="color: black"
          >
            <h3>{{ infoWindowContent.name }}</h3>
            <p class="pt-1">
              Kerawanan:
              <span :style="`color: ${infoWindowContent.color}`">
                {{ infoWindowContent.risk }}
              </span>
            </p>
          </div>
        </InfoWindow>
      </GoogleMap>

      <div class="legend">
        <h4 class="mb-2">Legend</h4>
        <div class="legend-item">
          <span
            class="color-box"
            style="background-color: #ff7070"
          />
          <span>Tinggi</span>
        </div>
        <div class="legend-item">
          <span
            class="color-box"
            style="background-color: #fac858"
          />
          <span>Sedang</span>
        </div>
        <div class="legend-item">
          <span
            class="color-box"
            style="background-color: #91cc75"
          />
          <span>Rendah</span>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<style>
.legend {
  position: absolute;
  bottom: 40px;
  left: 20px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.87);
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.color-box {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
}
</style>
