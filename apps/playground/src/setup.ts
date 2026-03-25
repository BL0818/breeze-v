import { defineSetupVue3 } from '@histoire/plugin-vue'
import { MotionPlugin } from '@vueuse/motion'
import { defineComponent } from 'vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

// Keep this reference so Vite dep scan includes defineComponent for Vue SFC SSR collection.
const ensureVueDefineComponentExport = defineComponent
void ensureVueDefineComponentExport

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(MotionPlugin)
})

// Histoire core may probe vanilla setup exports even in Vue projects.
// Provide a no-op export to avoid missing-export warnings during build.
export function setupVanilla() {}
