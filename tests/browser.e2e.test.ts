// import { fileURLToPath } from 'node:url'
// import { createPage, setup } from '@nuxt/test-utils/e2e'
// import { describe, it } from 'vitest'

// await setup({
//   rootDir: fileURLToPath(new URL('../', import.meta.url)),
//   browser: true,
// })

// describe('page /homepage', () => {
//   it('should render', { timeout: 20000 }, async () => {
//     const page = await createPage('/')
//     await page.getByText('Opinionated Starter Template').isVisible()
//     await page.close()
//   })

//   it('should show notification', async () => {
//     const page = await createPage('/')
//     await page.getByLabel("What's your name?").fill('kingyue')
//     await page.getByRole('button', { name: 'Confirm', exact: true }).click()
//     const locator = page.getByText('Hi, kingyue!')
//     await locator.isVisible()
//     await locator.isHidden({ timeout: 6000 })
//     await page.close()
//   })
// })

// describe('page /mapping', () => {
//   it('should render', async () => {
//     const page = await createPage('/mapping/2017')
//     await page.getByText('empty page').isVisible()
//     await page.close()
//   })
// })
// describe('page /stats', () => {
//   it('should render', async () => {
//     const page = await createPage('/stats/2017')
//     await page.getByText('empty page').isVisible()
//     await page.close()
//   })
// })
// describe('page /cluster', () => {
//   it('should render', async () => {
//     const page = await createPage('/cluster/2017')
//     await page.getByText('empty page').isVisible()
//     await page.close()
//   })
// })

// describe('page /criteria', () => {
//   it('should render', async () => {
//     const page = await createPage('/criteria/2017')
//     await page.getByText('Dessert').isVisible()
//     await page.close()
//   })

//   it('should remove a row', async () => {
//     const page = await createPage('/criteria/2017')
//     const row = page.getByRole('row', { name: 'Yogurt' })
//     await row.getByRole('button').click()
//     const dialog = page.getByRole('dialog')
//     await dialog.getByRole('button', { name: 'Confirm' }).click()
//     await row.isHidden()
//     await page.close()
//   })
// })
