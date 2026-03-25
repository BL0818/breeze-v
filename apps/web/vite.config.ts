import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      configFile: fileURLToPath(new URL('../../packages/config/uno.config.ts', import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@breezev/types': fileURLToPath(
        new URL('../../packages/types/src/index.ts', import.meta.url),
      ),
      '@breezev/utils': fileURLToPath(
        new URL('../../packages/utils/src/index.ts', import.meta.url),
      ),
      '@breezev/ui': fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    ssrManifest: true,
  },
  ssr: {
    noExternal: ['@breezev/ui', '@breezev/utils', '@breezev/types'],
  },
})
