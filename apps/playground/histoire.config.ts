import { fileURLToPath, URL } from 'node:url'

import { HstVue } from '@histoire/plugin-vue'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'histoire'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [HstVue()],
  // Ensure Histoire emits a non-empty generated global setup module so Rollup
  // can resolve setupVue3/setupVanilla probes without missing-export warnings.
  setupCode: [],
  setupFile: fileURLToPath(new URL('./src/setup.ts', import.meta.url)),
  storyMatch: ['./src/**/*.story.vue'],
  vite: {
    plugins: [
      vue(),
      UnoCSS({
        configFile: fileURLToPath(new URL('../../packages/config/uno.config.ts', import.meta.url)),
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@breezev/ui': fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url)),
      },
      dedupe: ['vue'],
    },
    optimizeDeps: {
      // Avoid Vite/Histoire generating a broken optimized "vue" entry in SSR collection.
      exclude: ['vue'],
    },
    ssr: {
      noExternal: [
        'vue',
        '@breezev/ui',
        '@breezev/types',
        '@breezev/utils',
        'radix-vue',
        '@vueuse/motion',
      ],
    },
  },
})
