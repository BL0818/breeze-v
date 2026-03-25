<script setup lang="ts">
import { Label } from 'radix-vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    message?: string
    required?: boolean
  }>(),
  {
    message: '',
    required: false,
  },
)

const invalid = computed(() => props.message.length > 0)
</script>

<template>
  <div class="grid gap-2">
    <Label
      :for="props.id"
      class="text-sm font-medium text-slate-700"
    >
      {{ props.label }}
      <span
        v-if="props.required"
        class="ml-1 text-rose-500"
        aria-hidden="true"
      >
        *
      </span>
    </Label>

    <slot :invalid="invalid" />

    <p
      v-if="invalid"
      class="text-xs text-rose-600"
      role="alert"
    >
      {{ props.message }}
    </p>
  </div>
</template>