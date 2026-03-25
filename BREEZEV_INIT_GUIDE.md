# BreezeV 项目初始化指南（Vue 3 Monorepo, 2026）

## 1. 项目文件结构树

```text
breezev/
├─ .changeset/
│  ├─ config.json
│  └─ README.md
├─ .github/
│  └─ workflows/
│     └─ ci.yml
├─ apps/
│  ├─ playground/
│  │  ├─ src/
│  │  │  ├─ setup.ts
│  │  │  └─ stories/
│  │  │     └─ Button.story.vue
│  │  ├─ histoire.config.ts
│  │  ├─ package.json
│  │  └─ tsconfig.json
│  └─ web/
│     ├─ e2e/
│     │  └─ login.spec.ts
│     ├─ src/
│     │  ├─ router/
│     │  │  └─ index.ts
│     │  ├─ views/
│     │  │  ├─ LoginView.spec.ts
│     │  │  └─ LoginView.vue
│     │  ├─ App.vue
│     │  └─ main.ts
│     ├─ index.html
│     ├─ package.json
│     ├─ playwright.config.ts
│     ├─ tsconfig.json
│     ├─ vite.config.ts
│     └─ vitest.config.ts
├─ packages/
│  ├─ config/
│  │  ├─ package.json
│  │  ├─ tsconfig.base.json
│  │  └─ uno.config.ts
│  ├─ types/
│  │  ├─ src/
│  │  │  ├─ form.ts
│  │  │  └─ index.ts
│  │  └─ package.json
│  ├─ ui/
│  │  ├─ src/
│  │  │  ├─ Button.vue
│  │  │  ├─ form.ts
│  │  │  ├─ FormField.vue
│  │  │  ├─ FormMessage.vue
│  │  │  ├─ Icon.vue
│  │  │  ├─ index.ts
│  │  │  ├─ motion.ts
│  │  │  └─ SubmitButton.vue
│  │  └─ package.json
│  └─ utils/
│     ├─ src/
│     │  ├─ index.ts
│     │  └─ validation.ts
│     └─ package.json
├─ scripts/
│  ├─ check-changeset.mjs
│  └─ check-license.mjs
├─ .gitignore
├─ .npmrc
├─ .oxlintrc.json
├─ biome.json
├─ eslint.config.mjs
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.json
└─ turbo.json
```

## 2. 核心配置文件代码（完整内容）

### `pnpm-workspace.yaml`

```yaml
packages:
  - apps/*
  - packages/*
```

### `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [
    "pnpm-workspace.yaml",
    "pnpm-lock.yaml",
    "turbo.json",
    "packages/config/**",
    ".github/workflows/ci.yml"
  ],
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": [
        "^lint"
      ],
      "outputs": []
    },
    "typecheck": {
      "dependsOn": [
        "^typecheck"
      ],
      "outputs": []
    },
    "test": {
      "dependsOn": [
        "^test"
      ],
      "outputs": [
        "coverage/**"
      ]
    },
    "build": {
      "dependsOn": [
        "^build"
      ],
      "outputs": [
        "dist/**",
        ".histoire/dist/**"
      ]
    },
    "e2e": {
      "dependsOn": [
        "build"
      ],
      "outputs": [
        "playwright-report/**",
        "test-results/**"
      ]
    }
  }
}
```

### 根目录 `package.json`

```json
{
  "name": "breezev",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@10.0.0",
  "engines": {
    "node": ">=22.0.0"
  },
  "scripts": {
    "dev": "turbo run dev --parallel",
    "lint": "pnpm lint:ox && pnpm lint:biome && turbo run lint",
    "lint:ox": "oxlint .",
    "lint:biome": "biome check .",
    "format": "biome format --write .",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "build": "turbo run build",
    "e2e": "turbo run e2e",
    "audit": "pnpm audit --audit-level=high --registry=https://registry.npmjs.org",
    "license:check": "node scripts/check-license.mjs",
    "changeset:check": "node scripts/check-changeset.mjs",
    "changeset": "changeset",
    "changeset:version": "changeset version",
    "changeset:publish": "changeset publish"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.4",
    "@changesets/cli": "^2.28.1",
    "@types/node": "^22.12.0",
    "@typescript-eslint/eslint-plugin": "^8.23.0",
    "@typescript-eslint/parser": "^8.23.0",
    "eslint": "^9.19.0",
    "eslint-plugin-vue": "^9.32.0",
    "license-checker": "^25.0.1",
    "oxlint": "^0.15.15",
    "turbo": "2.4.2",
    "typescript": "5.4.5",
    "vue-eslint-parser": "^9.4.3",
    "vue-tsc": "^2.2.0"
  },
  "pnpm": {
    "overrides": {
      "vue": "3.5.13",
      "@vue/compiler-sfc": "3.5.13",
      "@vue/server-renderer": "3.5.13",
      "vite": "6.0.7",
      "typescript": "5.4.5"
    }
  }
}
```

### `packages/config/uno.config.ts`

```ts
import logos from '@iconify-json/logos/icons.json'
import lucide from '@iconify-json/lucide/icons.json'
import { defineConfig, presetIcons, presetUno, transformerVariantGroup } from 'unocss'

export default defineConfig({
  // 统一 BreezeV 原子化能力
  presets: [
    presetUno(),
    presetIcons({
      autoInstall: false,
      collections: {
        lucide,
        logos,
      },
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
    // Radix 常见状态写法
    'radix-focus-ring': 'outline-none ring-2 ring-brand-300 ring-offset-2 ring-offset-white',
    'radix-disabled': 'data-[disabled]:opacity-55 data-[disabled]:pointer-events-none',
    'radix-open-surface': 'data-[state=open]:bg-brand-50 data-[state=open]:text-brand-700',
    // 表单与按钮基础快捷方式
    'field-shell': 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-400 focus-visible:radix-focus-ring',
    'btn-base': 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-transform transition-colors disabled:cursor-not-allowed disabled:opacity-60',
  },
  transformers: [transformerVariantGroup()],
})
```

### `packages/config/tsconfig.base.json`

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": [
      "ES2023",
      "DOM",
      "DOM.Iterable"
    ],
    "strict": true,
    "noImplicitOverride": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "useDefineForClassFields": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "."
  }
}
```

### `apps/playground/histoire.config.ts`

```ts
import { fileURLToPath, URL } from 'node:url'

import { HstVue } from '@histoire/plugin-vue'
import { defineConfig } from 'histoire'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: fileURLToPath(new URL('./src/setup.ts', import.meta.url)),
  storyMatch: ['./src/**/*.story.vue'],
  vite: {
    plugins: [
      vue(),
      UnoCSS({
        // 复用 monorepo 统一 UnoCSS 配置
        configFile: fileURLToPath(new URL('../../packages/config/uno.config.ts', import.meta.url)),
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@breezev/ui': fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url)),
      },
    },
  },
})
```

### `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main
      - release/**

permissions:
  contents: read

jobs:
  changes:
    runs-on: ubuntu-latest
    outputs:
      run_e2e: ${{ steps.filter.outputs.e2e }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Detect path changes
        id: filter
        uses: dorny/paths-filter@v3
        with:
          filters: |
            e2e:
              - 'apps/web/**'
              - 'packages/ui/**'
              - 'packages/config/**'
              - 'turbo.json'
              - 'pnpm-lock.yaml'

  quality:
    runs-on: ubuntu-latest
    needs: changes
    env:
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN || '' }}
      TURBO_TEAM: ${{ secrets.TURBO_TEAM || '' }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install --no-frozen-lockfile

      - name: Turbo cache mode
        run: |
          if [ -n "$TURBO_TOKEN" ]; then
            echo "检测到 TURBO_TOKEN，启用 Vercel Turbo 远程缓存。"
          else
            echo "未检测到 TURBO_TOKEN，自动降级为本地缓存。"
          fi

      - name: Changeset gate (releasable packages only)
        if: github.event_name == 'pull_request'
        env:
          BASE_SHA: ${{ github.event.pull_request.base.sha }}
          HEAD_SHA: ${{ github.event.pull_request.head.sha }}
        run: node scripts/check-changeset.mjs

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm typecheck

      - name: Unit tests
        run: pnpm test

      - name: Build
        run: pnpm build

      - name: Security audit (High/Critical)
        run: pnpm run audit

      - name: License policy gate
        run: pnpm license:check

  e2e:
    runs-on: ubuntu-latest
    needs:
      - quality
      - changes
    if: github.ref == 'refs/heads/main' || needs.changes.outputs.run_e2e == 'true'
    env:
      TURBO_TOKEN: ${{ secrets.TURBO_TOKEN || '' }}
      TURBO_TEAM: ${{ secrets.TURBO_TEAM || '' }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install --no-frozen-lockfile

      - name: Install Playwright browsers
        run: pnpm --filter @breezev/web exec playwright install --with-deps

      - name: E2E
        run: pnpm --filter @breezev/web run e2e
```

## 3. 核心代码示例

### `packages/types/src/form.ts`

```ts
import { z } from 'zod'

// 登录表单 Schema：统一输入规范、错误文案与类型推导
export const loginFormSchema = z.object({
  email: z
    .string({
      required_error: '请输入邮箱地址',
    })
    .trim()
    .email('邮箱格式不正确')
    .max(120, '邮箱长度不能超过 120 个字符'),
  password: z
    .string({
      required_error: '请输入密码',
    })
    .min(8, '密码长度至少 8 位')
    .max(64, '密码长度不能超过 64 位'),
  remember: z.boolean().default(false),
})

export type LoginFormInput = z.input<typeof loginFormSchema>
export type LoginFormOutput = z.output<typeof loginFormSchema>
```

### `packages/utils/src/validation.ts`

```ts
import { toTypedSchema } from '@vee-validate/zod'
import { useForm as useVeeValidateForm, type FormOptions } from 'vee-validate'
import type { ZodIssue, ZodTypeAny, input as ZodInput, output as ZodOutput } from 'zod'

export type UseZodFormOptions<TSchema extends ZodTypeAny> = Omit<
  FormOptions<ZodInput<TSchema>>,
  'validationSchema'
>

// 桥接 VeeValidate 与 Zod，统一获得输入/输出类型推导
export function useZodForm<TSchema extends ZodTypeAny>(
  schema: TSchema,
  options?: UseZodFormOptions<TSchema>,
) {
  return useVeeValidateForm<ZodInput<TSchema>, ZodOutput<TSchema>>({
    ...options,
    validationSchema: toTypedSchema(schema),
  })
}

// 将 Zod issue 列表转换为键值形式，便于 UI 层快速映射
export function mapZodIssues(issues: readonly ZodIssue[]): Record<string, string> {
  return issues.reduce<Record<string, string>>((acc, issue) => {
    const key = issue.path.length > 0 ? issue.path.join('.') : 'root'
    if (!acc[key]) {
      acc[key] = issue.message
    }
    return acc
  }, {})
}
```

### `packages/ui/src/Button.vue`

```vue
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
    icon: undefined,
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
    // SSR 下禁用运动指令，避免 hydration mismatch
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
    :aria-busy="props.loading ? 'true' : undefined"
    :class="buttonClass"
    @click="onClick"
  >
    <span v-if="props.loading" class="i-lucide-loader-circle h-4 w-4 animate-spin" aria-hidden="true" />

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
```

### `apps/web/src/views/LoginView.vue`

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { Label } from 'radix-vue'

import { loginFormSchema, type LoginFormOutput } from '@breezev/types'
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
    'aria-invalid': state.errors.length > 0 ? 'true' : 'false',
  }),
})

const [password, passwordAttrs] = defineField('password', {
  props: (state) => ({
    id: 'password',
    autocomplete: 'current-password',
    'aria-invalid': state.errors.length > 0 ? 'true' : 'false',
  }),
})

const [remember] = defineField('remember')

const hasError = computed(() => Object.keys(errors.value).length > 0)
const cardMotion = typeof window === 'undefined' ? undefined : motionPresets.slideUp

const onSubmit = handleSubmit(async (values: LoginFormOutput) => {
  submitMessage.value = ''
  await new Promise((resolve) => setTimeout(resolve, 700))
  submitMessage.value = `已提交：${values.email}`
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
          <span class="i-lucide-shield-check h-4 w-4" aria-hidden="true" />
          BreezeV 企业级模板
        </div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900">欢迎使用 BreezeV</h1>
        <p class="text-sm text-slate-500">VeeValidate + Zod + Radix Vue + UnoCSS 全链路示例</p>
      </header>

      <form class="grid gap-4" novalidate @submit.prevent="onSubmit">
        <div class="grid gap-2">
          <Label class="text-sm font-medium text-slate-700" for="email">邮箱</Label>
          <input v-model="email" v-bind="emailAttrs" class="field-shell" name="email" type="email" />
          <FormMessage :message="errors.email" />
        </div>

        <div class="grid gap-2">
          <Label class="text-sm font-medium text-slate-700" for="password">密码</Label>
          <input
            v-model="password"
            v-bind="passwordAttrs"
            class="field-shell"
            name="password"
            type="password"
          />
          <FormMessage :message="errors.password" />
        </div>

        <label class="inline-flex items-center gap-2 text-sm text-slate-600">
          <input v-model="remember" class="h-4 w-4 rounded border-slate-300 text-brand-500" type="checkbox" />
          记住我（7 天内免登录）
        </label>

        <Button :disabled="hasError" :loading="isSubmitting" icon="lucide:log-in" type="submit" variant="primary">
          登录
        </Button>
      </form>

      <p v-if="submitMessage" class="text-sm text-emerald-700">{{ submitMessage }}</p>
    </section>
  </main>
</template>
```

### `apps/playground/src/stories/Button.story.vue`

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@breezev/ui'

const dynamicIconName = ref('lucide:rocket')
</script>

<template>
  <Story title="UI/Button" :layout="{ type: 'single', iframe: false }">
    <Variant title="Primary / 原子图标优先">
      <div class="flex items-center gap-4">
        <Button variant="primary" type="button">
          <span class="i-lucide-home h-4 w-4" aria-hidden="true" />
          原子图标按钮
        </Button>
      </div>
    </Variant>

    <Variant title="Secondary / 运行时 Icon（动态名称）">
      <div class="flex items-center gap-4">
        <Button :icon="dynamicIconName" type="button" variant="secondary">动态图标按钮</Button>
      </div>
    </Variant>

    <Variant title="Loading 状态">
      <div class="flex items-center gap-4">
        <Button :loading="true" type="button" variant="ghost">正在提交</Button>
      </div>
    </Variant>
  </Story>
</template>
```

## 4. 迁移指南（React -> Vue）

1. 状态管理思维：`Context/Reducer` -> `Pinia + Composables`
- BreezeX 中跨树状态依赖 Context Provider；BreezeV 中以 Pinia Store 作为全局状态容器，业务逻辑尽量下沉到 composable，组件层只保留声明式绑定。

2. 样式范式：`CSS Modules/Tailwind` -> `UnoCSS 原子化`
- BreezeV 默认首选原子类（包括图标 `i-lucide-*`），通过 `shortcuts` 沉淀设计语义；动态图标场景才使用运行时 `<Icon />`，避免大面积运行时图标解析。

3. 无头组件迁移：`Radix React` -> `Radix Vue`
- 核心无障碍语义保持一致，但交互封装从 React hooks 迁移为 Vue composables + 指令；状态属性（`data-[state=*]`）在 UnoCSS 中统一建模，避免在组件内部硬编码样式逻辑。
