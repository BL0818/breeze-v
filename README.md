# BreezeV 🌬️

[![CI](https://github.com/BL0818/breeze-v/actions/workflows/ci.yml/badge.svg)](https://github.com/BL0818/breeze-v/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Turbo](https://img.shields.io/badge/Turbo-2.x-000000?logo=turborepo&logoColor=white)](https://turbo.build/repo)

一个面向企业后台与中台场景的 **Vue 3 Monorepo 工程模板**，强调「可复用组件」、「类型安全表单」、「一致化工程规范」与「可持续迭代」。

> 适合用作管理后台、B 端系统、内部工具平台的起步仓库。

## ✨ 项目亮点

- 🧱 **Monorepo 架构**：`apps` + `packages` 清晰分层，业务与基础能力解耦
- 🧩 **可复用 UI 组件**：`@breezev/ui` 提供通用组件与动效预设
- ✅ **端到端表单链路**：`VeeValidate + Zod`，从 Schema 到页面校验一致
- ⚡ **现代化构建与任务编排**：`Vite + Turbo + pnpm workspace`
- 🔍 **质量与门禁**：`ESLint + Biome + TypeScript + Vitest + Playwright + Audit + License Check`
- 🚀 **发布流程可追踪**：`Changesets` 驱动版本变更与发包管理

## 🧰 技术栈

- 前端框架：`Vue 3.5`
- 构建工具：`Vite 6`
- 样式方案：`UnoCSS`
- 状态与路由：`Pinia`、`Vue Router`
- 表单与校验：`VeeValidate`、`Zod`
- 组件基础：`Radix Vue`
- 动效：`@vueuse/motion`
- 组件演示：`Histoire`
- 测试：`Vitest`（单测）、`Playwright`（E2E）
- 工程化：`Turbo`、`pnpm@10`、`Changesets`

## 🗂️ 仓库结构

```text
breezev/
├─ apps/
│  ├─ web/              # 业务应用（登录页、路由、SSR 入口、E2E）
│  └─ playground/       # 组件演示站（Histoire）
├─ packages/
│  ├─ ui/               # 共享 UI 组件与动效预设
│  ├─ types/            # 共享类型与 Zod Schema
│  ├─ utils/            # 共享工具函数（含表单校验辅助）
│  └─ config/           # 共享配置（UnoCSS / TS 基础配置）
├─ scripts/             # 仓库脚本（changeset/license 检查等）
└─ .github/workflows/   # CI 工作流
```

## 🚀 快速开始

### 1. 环境要求

- `Node.js >= 22`
- `pnpm = 10.x`

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发

```bash
pnpm run dev
```

> 根目录 `dev` 会并行启动工作区中可运行的开发任务。

## 📜 常用命令

### 根目录命令

```bash
pnpm run dev          # 并行开发
pnpm run lint         # 代码规范检查
pnpm run typecheck    # 类型检查
pnpm run test         # 单元测试
pnpm run build        # 构建
pnpm run e2e          # 端到端测试
pnpm run audit        # 依赖安全审计（high+）
pnpm run license:check
pnpm run changeset
```

### 常用子项目命令

```bash
pnpm -C apps/web run dev
pnpm -C apps/web run e2e
pnpm -C apps/playground run dev
```

## 🧩 模块说明

- 🌐 `@breezev/web`：业务应用入口，当前内置登录页示例与路由
- 🎨 `@breezev/ui`：按钮、表单提示、图标等共享组件导出
- 🧾 `@breezev/types`：统一定义业务 Schema 与类型约束
- 🛠️ `@breezev/utils`：封装与表单/校验相关的通用能力
- ⚙️ `@breezev/config`：统一 UnoCSS 与 TypeScript 基础配置
- 🧪 `@breezev/playground`：组件开发与展示环境

## 🧪 质量保障与 CI

CI 默认覆盖以下环节：

- `lint`
- `typecheck`
- `test`
- `build`
- `audit`（安全审计）
- `license:check`（许可证策略）
- `e2e`（按路径变化条件触发）

## 📚 文档导航

- [BREEZEV_INIT_GUIDE.md](./BREEZEV_INIT_GUIDE.md) - 项目初始化与结构说明
- [BREEZEV_DEVELOPER_GUIDE.md](./BREEZEV_DEVELOPER_GUIDE.md) - 开发上手与文件职责
- [BREEZEV_ADMIN_DASHBOARD_TUTORIAL.md](./BREEZEV_ADMIN_DASHBOARD_TUTORIAL.md) - 管理后台模块实战教程
- [RELEASE_SOP.md](./RELEASE_SOP.md) - 发布流程 SOP
- [RELEASE_REHEARSAL.md](./RELEASE_REHEARSAL.md) - 发布演练清单

## 🛣️ 迭代建议（Roadmap）

- 📌 按业务域拆分更多 `views` 与路由模块
- 📌 逐步扩充 `@breezev/ui` 的组件覆盖与可访问性能力
- 📌 完善组件 Story 与可视化回归链路
- 📌 增加更多业务示例（列表、筛选、权限、仪表盘）
- 📌 持续补齐模块文档和后续迭代清单

## 🤝 协作建议

- 提交前建议执行：`lint -> typecheck -> test -> build -> e2e`
- 修改可发布包时，补充 `changeset` 保持版本信息可追踪
- 新增通用能力优先沉淀到 `packages/*`，避免业务代码重复

---

如果你准备把它作为团队基线模板，可以先从 `apps/web` 新增一个业务页面，再把通用逻辑沉淀到 `packages`，逐步形成稳定的工程资产。
