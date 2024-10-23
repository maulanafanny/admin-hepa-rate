<p align="center">
  <img alt="Hepatitis-A Rate Admin" src="public/favicon.ico" width=100px/>
</p>
<h1 align="center">Admin Hepatitis-A Rate</h1>

<p align='center'>
  Admin dashboard for Hepatitis-A Rate Visualization, made with <b>Vuetify 3</b> + <b>Nuxt 3</b><br><br>
</p>

<p align='center'>
  <a href="https://admin-hepa-rate.vercel.app/">Proceed to App<br><br></a>
</p>

## Features

- 💚 [Nuxt 3](https://nuxt.com/) - SPA, ESR, File-based routing, components auto importing, modules, etc
- 💥 SSR out of the box - powered by [Vuetify Nuxt module](https://github.com/userquin/vuetify-nuxt-module)
- ⚡️ [Vite 4](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild) - born with fastness
- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)
- 📥 APIs auto importing - for Composition API, VueUse and custom composables
- 🦾 TypeScript 100%
- 🧪 Unit, Component and E2E Testing with [@nuxt/test-utils](https://github.com/nuxt/test-utils)

### Admin Starter Template

- 🪟 Default layout with drawer, header and footer
- 🧭 Auto-generated navigation drawer and breadcrumbs based on routes
- 🔔 Notification store
- 📉 Data visualization with [vue-echarts](https://github.com/ecomfe/vue-echarts)
- 🎨 Theme color customization and dark mode
- 📱 Responsive layout
- 🛡️ Authentication backed-in using [nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils)

## Pre-packed

### Nuxt Modules

- [Vuetify Nuxt Module](https://github.com/userquin/vuetify-nuxt-module) - Zero-config Nuxt Module for Vuetify
- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs
- [Pinia](https://github.com/vuejs/pinia) - intuitive, type-safe, light and flexible Store for Vue
- [DevTools](https://github.com/nuxt/devtools) - unleash Nuxt Developer Experience
- [Nuxt Auth Utils](https://github.com/Atinux/nuxt-auth-utils) - Minimalist Authentication module for Nuxt

### Plugins

- [`rollup-plugin-regexp`](https://github.com/kingyue737/rollup-plugin-regexp) - auto replace [`@mdi/font`](https://github.com/Templarian/MaterialDesign-Webfont) with [`@mdi/js`](https://github.com/Templarian/MaterialDesign-JS) in `<VIcon>`, reduce bundle size

### Coding Style

- [Prettier](https://prettier.io/), single quotes, no semi
- [ESLint](https://eslint.org/) with adapted [@nuxt/eslint-config](https://github.com/nuxt/eslint-config)

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.js.org/) - Fast, disk space efficient package manager
- [VS Code Extensions](./.vscode/extensions.json)
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - TypeScript support inside Vue SFCs
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Find and fix problems in your code
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatter
  - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - [Material Design Icons Intellisense](https://marketplace.visualstudio.com/items?itemName=lukas-tr.materialdesignicons-intellisense)

### Development

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

## License

[MIT License](./LICENSE)
