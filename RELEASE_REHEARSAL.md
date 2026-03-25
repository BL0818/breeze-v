# BreezeV 发布演练手册（Changesets + 安全门禁）

## 目标

在不影响主分支稳定性的前提下，验证 BreezeV 的发布流程、质量门禁与版本产物是否完整可用。

## 前置条件

- Node.js `22.x`
- pnpm `10.x`
- 已在仓库根目录
- 已完成依赖安装

## 演练步骤

### 1) 创建变更并补充 changeset

当改动命中可发布包：
- `packages/ui/**`
- `packages/utils/**`
- `packages/types/**`

必须包含 `.changeset/*.md`，可直接参考：
- `.changeset/first-release-example.md`

### 2) 本地质量门禁全链路

按顺序执行：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm run audit
pnpm license:check
```

### 3) 生成版本变更

```bash
pnpm changeset version
```

预期结果：
- 可发布包版本号更新
- 生成或更新 `CHANGELOG.md`

### 4) 检查 Turbo 缓存模式

- 未设置 `TURBO_TOKEN`：自动使用本地缓存
- 设置 `TURBO_TOKEN` + `TURBO_TEAM`：启用远程缓存

示例：

```bash
# PowerShell
$env:TURBO_TOKEN="<your-token>"
$env:TURBO_TEAM="<your-team>"
pnpm build
```

### 5) 预发布（可选）

```bash
pnpm changeset publish --tag next
```

### 6) 正式发布

```bash
pnpm changeset publish
```

## 常见失败与定位

1. `changeset-check` 失败
- 说明：改了可发布包但没加 `.changeset/*.md`
- 处理：补一个 changeset 文件并提交

2. `audit` 失败
- 说明：存在 High/Critical 漏洞
- 处理：升级依赖或替换风险包

3. `license:check` 失败
- 说明：命中 GPL/AGPL 或非白名单许可证
- 处理：替换依赖，或在策略讨论后再调整白名单

4. `e2e` 触发异常
- 说明：PR 未命中关键路径通常会被跳过；`main` 分支会全量执行
- 处理：确认改动路径与 CI 触发规则一致
