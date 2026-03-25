import { rmSync } from 'node:fs'
import { resolve } from 'node:path'

const cacheDir = resolve(process.cwd(), 'node_modules/.hst-vite-server')
rmSync(cacheDir, { recursive: true, force: true })
