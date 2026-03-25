import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import { type Directive, createApp as createClientApp, createSSRApp } from 'vue'
import type { Router } from 'vue-router'

import App from './App.vue'
import { createAppRouter } from './router'

export interface BreezeAppContext {
  app: ReturnType<typeof createClientApp>
  router: Router
  pinia: ReturnType<typeof createPinia>
}

interface CreateBreezeAppOptions {
  ssr?: boolean
}

const ssrSafeMotionDirective: Directive = {
  getSSRProps() {
    // Do not inject motion props during SSR to avoid hydration mismatch.
    return {}
  },
}

export function createBreezeApp(options: CreateBreezeAppOptions = {}): BreezeAppContext {
  const isSsr = options.ssr ?? false
  const app = isSsr ? createSSRApp(App) : createClientApp(App)
  const pinia = createPinia()
  const router = createAppRouter({ ssr: isSsr })

  app.use(pinia)
  app.use(router)

  if (isSsr) {
    app.directive('motion', ssrSafeMotionDirective)
  } else {
    app.use(MotionPlugin)
  }

  return {
    app,
    router,
    pinia,
  }
}
