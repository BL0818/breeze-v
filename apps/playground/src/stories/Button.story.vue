<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@breezev/ui'

const dynamicIconName = ref('lucide:rocket')
</script>

<template>
  <Story
    title="UI/Button"
    :layout="{ type: 'single', iframe: false }"
  >
    <Variant title="Primary / atomic icon first">
      <div class="flex items-center gap-4">
        <Button
          variant="primary"
          type="button"
        >
          <span
            class="i-lucide-home h-4 w-4"
            aria-hidden="true"
          />
          Atomic icon button
        </Button>
      </div>
    </Variant>

    <Variant title="Secondary / runtime Icon dynamic name">
      <div class="flex items-center gap-4">
        <Button
          :icon="dynamicIconName"
          type="button"
          variant="secondary"
        >
          Dynamic icon button
        </Button>
      </div>
    </Variant>

    <Variant title="Loading state">
      <div class="flex items-center gap-4">
        <Button
          :loading="true"
          type="button"
          variant="ghost"
        >
          Submitting
        </Button>
      </div>
    </Variant>
  </Story>
</template>