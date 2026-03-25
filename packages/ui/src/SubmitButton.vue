<script setup lang="ts">
import Button from './Button.vue'

const props = withDefaults(
  defineProps<{
    loading?: boolean
    disabled?: boolean
    icon?: string
    label?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    loading: false,
    disabled: false,
    icon: 'lucide:send-horizontal',
    label: 'Submit',
    type: 'submit',
  },
)
</script>

<template>
  <Button
    :type="props.type"
    :loading="props.loading"
    :disabled="props.disabled"
    :icon="props.icon"
  >
    {{ props.label }}
  </Button>
</template>