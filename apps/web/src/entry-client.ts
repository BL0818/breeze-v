import '@unocss/reset/tailwind.css'
import 'uno.css'

import { createBreezeApp } from './app'

const { app, router } = createBreezeApp()

router.isReady().then(() => {
  app.mount('#app')
})
