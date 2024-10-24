import { fileURLToPath } from 'node:url'
import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, it } from 'vitest'

await setup({
  rootDir: fileURLToPath(new URL('../', import.meta.url)),
  browser: true,
})

describe('page /mapping', () => {
  it('should render', async () => {
    const page = await createPage('/mapping/2017')
    await page.getByText('Pemetaan Tingkat Kerawanan Tahunan Hepatitis-A').isVisible()
    await page.close()
  })
})
describe('page /stats', () => {
  it('should render', async () => {
    const page = await createPage('/stats/2017')
    await page.getByText('Grafik Tingkat Kerawanan Hepatitis-A Pacitan').isVisible()
    await page.close()
  })
})
describe('page /cluster', () => {
  it('should render', async () => {
    const page = await createPage('/cluster/2017')
    await page.getByText('Hasil Clustering Hepatitis-A Pacitan').isVisible()
    await page.close()
  })
})

describe('page /criteria', () => {
  it('should render', async () => {
    const page = await createPage('/criteria/2017')
    await page.getByText('Data Kriteria Hepatitis-A Pacitan').isVisible()
    await page.close()
  })
})
