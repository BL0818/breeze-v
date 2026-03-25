# BreezeV 脚手架开发指南（逐步上手 + 文件说明）

本文面向第一次接触 `BreezeV` 的开发者，目标是让你在最短时间内：

1. 跑通本地开发环境。
2. 理解仓库中每个关键文件/目录的职责。
3. 能独立完成“新增页面 + 新增组件 + 新增表单校验 + 提交发布变更”。

---

## 1. 环境准备

### 1.1 必备版本

- `Node.js >= 22`
- `pnpm = 10.x`（项目约束：`pnpm@10.0.0`）

### 1.2 推荐命令（Windows / macOS / Linux 通用）

```bash
corepack enable
corepack prepare pnpm@10.0.0 --activate
pnpm -v
node -v
```

---

## 2. 第一次启动（一步步）

### 2.1 安装依赖

```bash
pnpm install
```

### 2.2 启动全部开发任务（Monorepo）

```bash
pnpm run dev
```

说明：根目录 `dev` 实际执行 `turbo run dev --parallel`，会并行启动各子包的 `dev` 脚本。

### 2.3 仅启动业务站点（web）

```bash
pnpm -C apps/web run dev
```

### 2.4 仅启动组件演示站（playground / Histoire）

```bash
pnpm -C apps/playground run dev
```

---

## 3. 常用命令速查

### 3.1 根目录命令（聚合执行）

- `pnpm run dev`：并行开发模式
- `pnpm run lint`：`oxlint + biome + 各包 lint`
- `pnpm run typecheck`：全仓类型检查
- `pnpm run test`：全仓单测
- `pnpm run build`：全仓构建
- `pnpm run e2e`：全仓 e2e（依赖 build）
- `pnpm run audit`：依赖安全扫描（high+）
- `pnpm run license:check`：许可证白名单检查

### 3.2 包级命令（示例）

- `pnpm -C apps/web run test`
- `pnpm -C apps/web run e2e`
- `pnpm -C apps/playground run build`

---

## 4. 仓库结构与文件职责（按目录）

## 4.1 根目录

- `package.json`：Monorepo 根脚本、统一依赖版本覆盖（`pnpm.overrides`）。
- `pnpm-workspace.yaml`：声明工作区包范围（`apps/*`、`packages/*`）。
- `turbo.json`：任务编排、依赖关系、缓存策略。
- `tsconfig.json`：全局 TS 入口配置与路径别名。
- `eslint.config.mjs`：全仓 ESLint（Vue + TS）规则。
- `biome.json`：格式化与基础静态检查配置。
- `.npmrc`：pnpm/npm 行为配置（registry、peer 策略等）。
- `.editorconfig`：基础编辑器规范（缩进、换行等）。
- `.gitattributes`：Git 文本属性（行尾等）。
- `.gitignore`：忽略规则。
- `pnpm-lock.yaml`：锁定依赖版本。
- `vue-shim.d.ts`：Vue 模块类型声明补充。
- `scripts/check-license.mjs`：许可证白名单校验脚本。
- `scripts/check-changeset.mjs`：PR 变更是否需要 `.changeset` 的门禁脚本。
- `.github/workflows/ci.yml`：CI 流程（lint/typecheck/test/build/audit/license/e2e）。
- `.changeset/`：版本变更说明（发布包时必需）。

## 4.2 `apps/web`（业务应用）

- `apps/web/package.json`：web 应用脚本与依赖。
- `apps/web/index.html`：Vite 应用入口 HTML。
- `apps/web/vite.config.ts`：Vite + UnoCSS + 别名 + SSR 相关配置。
- `apps/web/vitest.config.ts`：单元测试配置。
- `apps/web/playwright.config.ts`：E2E 配置（预览服务 + 浏览器项目）。
- `apps/web/src/main.ts`：前端启动入口（转发到 `entry-client.ts`）。
- `apps/web/src/entry-client.ts`：客户端入口（注册样式、挂载应用）。
- `apps/web/src/entry-server.ts`：SSR 渲染入口（`render(url)`）。
- `apps/web/src/app.ts`：应用工厂（创建 app、router、pinia、motion）。
- `apps/web/src/App.vue`：根组件壳层（页面背景/布局、`RouterView`）。
- `apps/web/src/router/index.ts`：路由定义、SSR/CSR history 分支。
- `apps/web/src/views/LoginView.vue`：登录示例页（VeeValidate + Zod）。
- `apps/web/src/views/LoginView.spec.ts`：登录 schema 单测示例。
- `apps/web/e2e/login.spec.ts`：登录流程端到端测试示例。

## 4.3 `apps/playground`（组件演示应用）

- `apps/playground/package.json`：Histoire 脚本与依赖。
- `apps/playground/histoire.config.ts`：Histoire + Vite + UnoCSS + 别名配置。
- `apps/playground/src/setup.ts`：演示站全局 setup（样式、插件）。
- `apps/playground/src/stories/Button.story.vue`：按钮组件示例故事文件。
- `apps/playground/scripts/clean-histoire-cache.mjs`：构建前清理 Histoire 缓存。
- `apps/playground/tsconfig.json`：playground 类型配置。

## 4.4 `packages/config`（共享配置）

- `packages/config/package.json`：配置包导出定义。
- `packages/config/tsconfig.base.json`：全仓 TS 基础规范（strict、target 等）。
- `packages/config/uno.config.ts`：UnoCSS 主题、快捷类、图标集合、transformer。

## 4.5 `packages/types`（共享类型与 Schema）

- `packages/types/package.json`：类型包导出与发布配置。
- `packages/types/src/form.ts`：`loginFormSchema` 及其输入输出类型。
- `packages/types/src/index.ts`：统一导出入口。

## 4.6 `packages/utils`（共享工具）

- `packages/utils/package.json`：工具包导出与发布配置。
- `packages/utils/src/validation.ts`：`useZodForm`、`mapZodIssues` 等校验工具。
- `packages/utils/src/index.ts`：统一导出入口。

## 4.7 `packages/ui`（共享 UI 组件）

- `packages/ui/package.json`：UI 包依赖、导出、脚本。
- `packages/ui/src/index.ts`：组件与工具统一导出。
- `packages/ui/src/Button.vue`：通用按钮（variant/size/loading/icon）。
- `packages/ui/src/SubmitButton.vue`：提交按钮封装。
- `packages/ui/src/FormField.vue`：表单域容器（标签/必填/错误提示）。
- `packages/ui/src/FormMessage.vue`：错误提示组件。
- `packages/ui/src/Icon.vue`：本地图标渲染组件（lucide/logos）。
- `packages/ui/src/form.ts`：`useFormField` 字段组合式函数。
- `packages/ui/src/motion.ts`：动画预设（fade/slide/scale/button）。

---

## 5. 标准开发流程（推荐）

## 5.1 新增一个业务页面

1. 在 `apps/web/src/views` 新建页面组件，例如 `UserListView.vue`。  
2. 在 `apps/web/src/router/index.ts` 添加路由记录。  
3. 若需新表单：先在 `packages/types` 定义 schema，再在页面中通过 `@breezev/utils` 复用。  
4. 启动 `pnpm -C apps/web run dev` 实时验证。  

## 5.2 新增一个共享 UI 组件

1. 在 `packages/ui/src` 新建组件，例如 `DataTable.vue`。  
2. 在 `packages/ui/src/index.ts` 导出组件。  
3. 在 `apps/playground/src/stories` 新增 story，演示典型状态（空态/加载/错误）。  
4. 在 `apps/web` 中实际接入验证。  

## 5.3 代码质量与测试

提交前建议按顺序执行：

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
pnpm -C apps/web run e2e
```

## 5.4 发布变更（针对可发布包）

如果改动触及 `packages/ui`、`packages/utils`、`packages/types`，需要新增 changeset：

```bash
pnpm run changeset
```

然后按团队流程执行版本与发布：

```bash
pnpm run changeset:version
pnpm run changeset:publish
```

---

## 6. 常见问题

## 6.1 `pnpm dev` 报 `Command "dev" not found`

优先使用：

```bash
pnpm run dev
```

如果你用的是递归模式，正确写法是：

```bash
pnpm -r run dev
```

## 6.2 某包依赖未同步

```bash
pnpm install
pnpm -r list --depth 0
```

## 6.3 E2E 跑不起来

```bash
pnpm -C apps/web run e2e:install
pnpm -C apps/web run e2e
```

---

## 7. 新成员上手建议（第一天）

1. 跑通 `pnpm run dev` 和 `pnpm -C apps/playground run dev`。  
2. 在 `apps/web/src/views` 新建一个最小页面并加路由。  
3. 在 `packages/ui` 新增一个小组件并写 story。  
4. 本地完整跑一次 `lint + typecheck + test + build`。  
5. 如果改了可发布包，补 `.changeset`。  

这样你就能完整走完本仓库的“开发-验证-发布”闭环。

