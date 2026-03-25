<script setup lang="ts">
const props = defineProps<{
  message?: string | undefined
}>()
</script>

<template>
  <p
    v-if="props.message"
    class="text-xs text-rose-600"
    role="alert"
  >
    {{ props.message }}
  </p>
</template>