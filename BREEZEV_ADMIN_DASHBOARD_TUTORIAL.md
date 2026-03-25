# BreezeV：从 0 到 1 搭建中大型管理后台（实战教程）

本文基于当前 `BreezeV` 脚手架，给你一条可落地的中大型后台建设路径。  
目标不是“写一个 demo”，而是快速搭出可持续迭代的工程骨架。

---

## 1. 最终目标（你要得到什么）

在 1~2 周内搭出具备以下能力的后台基础盘：

1. 登录认证、权限控制（RBAC）。
2. 统一布局（导航、面包屑、标签页、主题）。
3. 多业务模块（用户、角色、订单、内容等）独立演进。
4. 统一请求层、错误处理、表单校验、状态管理。
5. 单测 + E2E + CI 门禁 + 可发布包规范。

---

## 2. 开始前：先跑通脚手架

```bash
pnpm install
pnpm run dev
```

建议同时打开组件演示站：

```bash
pnpm -C apps/playground run dev
```

---

## 3. 推荐目录规划（在现有结构上扩展）

以 `apps/web/src` 为核心，建议增加：

```text
apps/web/src/
  api/
    client.ts          # fetch/axios 封装、拦截、错误归一化
    modules/
      auth.ts
      users.ts
      roles.ts
  stores/
    auth.ts
    permission.ts
    app.ts
  layouts/
    AdminLayout.vue
  router/
    index.ts
    guards.ts
    modules/
      system.ts
      order.ts
  views/
    auth/LoginView.vue
    dashboard/HomeView.vue
    system/users/UserListView.vue
    system/roles/RoleListView.vue
  components/
    business/
      PageHeader.vue
      SearchPanel.vue
      DataTable.vue
      PermissionGate.vue
```

---

## 4. 分阶段实施（0-1 最快路径）

## 阶段 A（Day 1）：基础壳与路由

目标：先有可访问的后台主框架，而不是先做复杂业务。

1. 新建 `layouts/AdminLayout.vue`，放侧边栏 + 顶栏 + 主内容区。
2. 在 `router/index.ts` 增加 `/admin` 路由，子路由挂到布局下。
3. 把首页改成 `/admin/dashboard`，保留 `/login`。

验收标准：

- 未登录访问 `/admin/*` 会被重定向到 `/login`。
- 登录后可进入后台壳页面。

## 阶段 B（Day 2）：认证与权限骨架

目标：把“能登录”升级为“可控访问”。

1. `stores/auth.ts`：保存 token、用户信息、登录态。
2. `stores/permission.ts`：保存角色、菜单、按钮权限点。
3. `router/guards.ts`：实现登录拦截 + 权限拦截。
4. 路由 `meta` 增加：
   - `requiresAuth`
   - `roles`
   - `permissionCodes`

验收标准：

- 普通用户无法访问管理员页面。
- 按钮可基于权限点显示/隐藏。

## 阶段 C（Day 3~4）：统一请求层 + 错误模型

目标：所有页面共用同一套 API 调用模式。

1. 新建 `api/client.ts`：
   - 统一 `baseURL`、超时、headers。
   - 请求自动带 token。
   - 401 自动清理登录态并跳转登录页。
2. 定义响应结构：
   - 成功：`{ code, data, message }`
   - 失败：统一抛业务异常。
3. 业务 API 分模块：
   - `api/modules/users.ts`
   - `api/modules/roles.ts`
   - `api/modules/orders.ts`

验收标准：

- 任一页面调用 API 都不再手写重复错误处理。
- 接口报错有统一 toast/消息提示风格。

## 阶段 D（Day 5~6）：搭两个完整业务模块

目标：证明架构能支撑“中大型后台”的模块化迭代。

建议先做：

1. 用户管理：列表、筛选、新增、编辑、启停。
2. 角色管理：角色列表、权限点分配、成员绑定。

落地建议：

- 表单 schema 放 `packages/types`（例如 `userFormSchema`）。
- 表单逻辑复用 `@breezev/utils` 的 `useZodForm`。
- 页面可复用 `@breezev/ui` 的按钮/表单组件。

验收标准：

- 两个模块均具备“查+增+改+状态变更”。
- 页面风格、交互、错误提示一致。

## 阶段 E（Day 7）：测试与质量门禁

目标：把项目变成“可持续维护”的工程。

1. 单测：先覆盖 schema、工具函数、关键 store。
2. E2E：覆盖登录、列表筛选、新增流程。
3. CI：确保 `lint/typecheck/test/build/e2e` 全部可在 PR 自动执行。

验收标准：

- 新功能无测试不能合并（至少关键路径有覆盖）。
- CI 失败可快速定位到模块。

---

## 5. 中大型后台的“工程约束”建议

## 5.1 模块边界约束

1. 页面只关心“展示与交互”，不直接处理底层请求细节。  
2. 请求逻辑必须走 `api/modules/*`，禁止散落在页面里。  
3. 校验规则集中在 `packages/types`，避免重复规则。  

## 5.2 组件分层约束

1. `packages/ui` 放可复用、无业务语义组件。  
2. `apps/web/src/components/business` 放业务语义组件（例如用户筛选面板）。  
3. 页面不要直接拼复杂原子组件，先抽业务组件再复用。  

## 5.3 状态管理约束

1. Pinia store 只放“可共享状态”。  
2. 页面瞬时 UI 状态（弹窗开关、局部 loading）优先组件内处理。  
3. 避免一个 store 管所有业务，按域拆分（auth/user/role/order）。  

---

## 6. 一套可执行的开发节奏（每个需求都按这个走）

1. 先补/改 `packages/types` 里的 schema 与类型。  
2. 再写 `apps/web/src/api/modules/*.ts` 的接口函数。  
3. 再实现 Pinia store（如需要跨页面共享）。  
4. 最后写页面与组件。  
5. 同步补单测与 E2E。  
6. 提交前跑：`pnpm run lint && pnpm run typecheck && pnpm run test && pnpm run build`。  

---

## 7. 示例：新增“部门管理”模块（最小闭环）

## 7.1 需要新增的文件

1. `packages/types/src/department.ts`：部门表单 schema。  
2. `packages/types/src/index.ts`：导出 department 类型。  
3. `apps/web/src/api/modules/departments.ts`：部门接口。  
4. `apps/web/src/views/system/departments/DepartmentListView.vue`：列表页。  
5. `apps/web/src/router/modules/system.ts`：挂载路由。  

## 7.2 完成定义

1. 能查看部门列表。  
2. 能新增/编辑部门。  
3. 错误提示走统一机制。  
4. 至少有 1 个单测 + 1 条 E2E 路径。  

---

## 8. 性能与可维护性（中大型项目必做）

1. 路由级懒加载，降低首屏体积。  
2. 表格与筛选组件抽象，减少重复代码。  
3. 大列表接入分页/虚拟滚动。  
4. 将高频常量（枚举、字典）集中维护。  
5. 每个模块保留 `README.md` 记录接口、字段、权限点。  

---

## 9. 发布与协作建议

1. 改动 `packages/ui|utils|types` 时，必须补 `.changeset`。  
2. PR 模板中强制填写：
   - 改动范围
   - 风险点
   - 回滚方案
   - 测试证据（截图/录屏/日志）
3. 每周做一次“依赖安全 + 许可证”巡检。  

---

## 10. 你可以直接照抄的“第一周任务清单”

## 第 1 天

1. 跑通开发环境。  
2. 完成后台布局 + 登录页串联。  

## 第 2 天

1. 完成 auth store + 路由守卫。  
2. 打通权限元信息（roles/permissionCodes）。  

## 第 3 天

1. 完成 `api/client.ts` 与错误归一化。  
2. 接入统一消息提示。  

## 第 4~5 天

1. 完成用户管理模块。  
2. 完成角色管理模块。  

## 第 6 天

1. 补齐单测与 E2E。  
2. CI 全绿。  

## 第 7 天

1. 代码清理与组件抽象。  
2. 输出模块文档和后续迭代清单。  

---

按这个节奏推进，你会在非常短时间内拿到一个“能持续迭代”的中大型管理后台基础工程，而不是一次性 demo。

