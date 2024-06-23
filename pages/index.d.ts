declare module '#app' {
  interface PageMeta {
    icon?: string
    title?: string
    drawerIndex?: number
    breadcrumb?: 'hidden' | 'disabled'
    widget?: string
  }
}

export {}
