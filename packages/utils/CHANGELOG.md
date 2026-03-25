# @breezev/utils

## 0.1.1

### Patch Changes

- feat: 发布首个 BreezeV 组件与表单工具能力

  - `@breezev/ui`：新增 Button、FormField、FormMessage、SubmitButton、Icon 与 motion 预设
  - `@breezev/utils`：新增 `useZodForm` 与 Zod issue 映射工具
  - `@breezev/types`：新增登录表单 Schema 与输入/输出类型契约

  影响说明：

  - UI 包新增可复用基础组件，建议应用侧升级后替换重复按钮与表单样板代码。
  - utils/types 仅新增 API，无破坏性变更。
