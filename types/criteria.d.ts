export type Criteria = {
  criteria: {
    id: number
    total_case: number
    total_population: number
    sanitation_rate: number
    clean_water_rate: number
    safe_house_rate: number
    cluster_id: number | null
    district_id: number
    year_id: number
    createdAt: Date
    updatedAt: Date
  }
  district: {
    id: number
    name: string
  }
  year: {
    id: number
    year: string
  }
}
