<script setup lang="ts">
import { Label } from 'radix-vue'
import { computed, ref } from 'vue'

import { type LoginFormOutput, loginFormSchema } from '@breezev/types'
import { Button, FormMessage, motionPresets } from '@breezev/ui'
import { useZodForm } from '@breezev/utils'

const submitMessage = ref('')

const { defineField, errors, handleSubmit, isSubmitting } = useZodForm(loginFormSchema, {
  initialValues: {
    email: '',
    password: '',
    remember: false,
  },
})

const [email, emailAttrs] = defineField('email', {
  props: (state) => ({
    id: 'email',
    autocomplete: 'email',
    'aria-invalid': state.errors.length > 0,
  }),
})

const [password, passwordAttrs] = defineField('password', {
  props: (state) => ({
    id: 'password',
    autocomplete: 'current-password',
    'aria-invalid': state.errors.length > 0,
  }),
})

const [remember] = defineField('remember')

const hasError = computed(() => Object.keys(errors.value).length > 0)
const cardMotion = typeof window === 'undefined' ? undefined : motionPresets.slideUp

const onSubmit = handleSubmit(async (values: LoginFormOutput) => {
  submitMessage.value = ''
  await new Promise((resolve) => setTimeout(resolve, 700))
  submitMessage.value = `Submitted: ${values.email}`
})
</script>

<template>
  <main class="mx-auto grid min-h-[calc(100dvh-3rem)] w-full max-w-6xl place-items-center">
    <section
      v-motion="cardMotion"
      class="grid w-full max-w-md gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
    >
      <header class="grid gap-2">
        <div class="inline-flex items-center gap-2 text-sm text-brand-700">
          <span
            class="i-lucide-shield-check h-4 w-4"
            aria-hidden="true"
          />
          BreezeV enterprise template
        </div>
        <h1
          class="text-2xl font-semibold tracking-tight text-slate-900"
          data-testid="login-title"
        >
          Welcome to BreezeV
        </h1>
        <p class="text-sm text-slate-500">VeeValidate + Zod + Radix Vue + UnoCSS end-to-end demo</p>
      </header>

      <form
        class="grid gap-4"
        novalidate
        @submit.prevent="onSubmit"
      >
        <div class="grid gap-2">
          <Label
            class="text-sm font-medium text-slate-700"
            for="email"
          >Email</Label>
          <input
            v-model="email"
            v-bind="emailAttrs"
            class="field-shell"
            data-testid="login-email"
            name="email"
            type="email"
          >
          <FormMessage :message="errors.email" />
        </div>

        <div class="grid gap-2">
          <Label
            class="text-sm font-medium text-slate-700"
            for="password"
          >Password</Label>
          <input
            v-model="password"
            v-bind="passwordAttrs"
            class="field-shell"
            data-testid="login-password"
            name="password"
            type="password"
          >
          <FormMessage :message="errors.password" />
        </div>

        <label class="inline-flex items-center gap-2 text-sm text-slate-600">
          <input
            v-model="remember"
            class="h-4 w-4 rounded border-slate-300 text-brand-500"
            type="checkbox"
          >
          Remember me (keep login for 7 days)
        </label>

        <Button
          :disabled="hasError"
          :loading="isSubmitting"
          data-testid="login-submit"
          icon="lucide:log-in"
          type="submit"
          variant="primary"
        >
          Sign in
        </Button>
      </form>

      <p
        v-if="submitMessage"
        class="text-sm text-emerald-700"
        data-testid="login-submit-message"
      >
        {{ submitMessage }}
      </p>
    </section>
  </main>
</template>
