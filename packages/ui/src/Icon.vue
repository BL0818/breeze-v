<script setup lang="ts">
import logosRaw from '@iconify-json/logos/icons.json'
import lucideRaw from '@iconify-json/lucide/icons.json'
import { computed } from 'vue'

interface IconNode {
  body: string
  width?: number
  height?: number
  left?: number
  top?: number
}

interface IconSet {
  width?: number
  height?: number
  icons: Record<string, IconNode>
}

const logos = logosRaw as unknown as IconSet
const lucide = lucideRaw as unknown as IconSet

const collections: Record<string, IconSet> = {
  logos,
  lucide,
}

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    className?: string
  }>(),
  {
    size: 16,
    className: '',
  },
)

const iconSizeStyle = computed<Record<string, string>>(() => {
  const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    width: sizeValue,
    height: sizeValue,
    display: 'inline-block',
    verticalAlign: 'middle',
  }
})

const iconSvg = computed(() => {
  const [collectionName, iconName] = props.name.split(':')
  if (!collectionName || !iconName) {
    return null
  }

  const collection = collections[collectionName]
  if (!collection) {
    return null
  }

  const icon = collection.icons[iconName]
  if (!icon) {
    return null
  }

  const width = icon.width ?? collection.width ?? 24
  const height = icon.height ?? collection.height ?? 24
  const left = icon.left ?? 0
  const top = icon.top ?? 0

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${left} ${top} ${width} ${height}" width="100%" height="100%">${icon.body}</svg>`
})
</script>

<template>
  <span
    v-if="iconSvg"
    :class="props.className"
    :style="iconSizeStyle"
    aria-hidden="true"
    v-html="iconSvg"
  />
  <span
    v-else
    :class="props.className"
    :style="iconSizeStyle"
    aria-hidden="true"
  />
</template>