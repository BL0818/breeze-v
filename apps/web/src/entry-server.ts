import { renderToString } from '@vue/server-renderer'

import { createBreezeApp } from './app'

export interface SsrRenderResult {
  appHtml: string
  headTags: string
  initialState: Record<string, unknown>
}

export async function render(url: string): Promise<SsrRenderResult> {
  const { app, router, pinia } = createBreezeApp({ ssr: true })

  await router.push(url)
  await router.isReady()

  const appHtml = await renderToString(app)

  return {
    appHtml,
    headTags: '',
    initialState: pinia.state.value as Record<string, unknown>,
  }
}
