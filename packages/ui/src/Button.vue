<script setup lang="ts">
import { computed } from 'vue'

import Icon from './Icon.vue'
import { motionPresets } from './motion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    disabled?: boolean
    loading?: boolean
    icon?: string
    iconPosition?: 'left' | 'right'
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    iconPosition: 'left',
    type: 'button',
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isDisabled = computed(() => props.disabled || props.loading)

const variantClassMap: Record<ButtonVariant, string> = {
  primary: 'btn-base bg-brand-500 text-white hover:bg-brand-700',
  secondary: 'btn-base border border-slate-300 bg-white text-slate-800 hover:bg-slate-100',
  ghost: 'btn-base bg-transparent text-slate-700 hover:bg-slate-100',
}

const sizeClassMap: Record<ButtonSize, string> = {
  sm: 'min-h-8 px-3 text-xs',
  md: 'min-h-10 px-4 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

const buttonClass = computed(() => [
  variantClassMap[props.variant],
  sizeClassMap[props.size],
  'radix-focus-ring',
  'radix-disabled',
])

const motionDirectiveValue = computed(() => {
  if (typeof window === 'undefined') {
    // Disable motion directive during SSR to avoid hydration mismatch.
    return undefined
  }
  return motionPresets.button
})

function onClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <button
    v-motion="motionDirectiveValue"
    :type="props.type"
    :disabled="isDisabled"
    :aria-busy="props.loading"
    :class="buttonClass"
    @click="onClick"
  >
    <span
      v-if="props.loading"
      class="i-lucide-loader-circle h-4 w-4 animate-spin"
      aria-hidden="true"
    />

    <Icon
      v-if="props.icon && !props.loading && props.iconPosition === 'left'"
      :name="props.icon"
      :size="16"
      class-name="text-current"
    />

    <span><slot /></span>

    <Icon
      v-if="props.icon && !props.loading && props.iconPosition === 'right'"
      :name="props.icon"
      :size="16"
      class-name="text-current"
    />
  </button>
</template>