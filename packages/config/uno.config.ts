import logos from '@iconify-json/logos/icons.json'
import lucide from '@iconify-json/lucide/icons.json'
import type { IconsOptions } from '@unocss/preset-icons'
import { defineConfig, presetIcons, presetWind3, transformerVariantGroup } from 'unocss'

const iconCollections = {
  lucide: async () => lucide,
  logos: async () => logos,
} as unknown as NonNullable<IconsOptions['collections']>

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      autoInstall: false,
      collections: iconCollections,
      iconifyCollectionsNames: ['lucide', 'logos'],
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      warn: true,
      scale: 1.1,
    }),
  ],
  theme: {
    colors: {
      brand: {
        50: '#edf8ff',
        100: '#d7efff',
        300: '#8ad4ff',
        500: '#2ca8ff',
        700: '#0e6bc2',
      },
    },
  },
  shortcuts: {
    'radix-focus-ring': 'outline-none ring-2 ring-brand-300 ring-offset-2 ring-offset-white',
    'radix-disabled': 'data-[disabled]:opacity-55 data-[disabled]:pointer-events-none',
    'radix-open-surface': 'data-[state=open]:bg-brand-50 data-[state=open]:text-brand-700',
    'field-shell':
      'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-400 focus-visible:radix-focus-ring',
    'btn-base':
      'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-transform transition-colors disabled:cursor-not-allowed disabled:opacity-60',
  },
  transformers: [transformerVariantGroup()],
})
