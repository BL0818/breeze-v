# BreezeV 发包流程（SOP）

> 适用仓库：`E:\SomeUsefulTools\BreezeV`  
> 包管理：`pnpm`  
> 发布工具：`changesets`  
> npm scope：`@breezev`

## 1. 发布对象说明

当前仓库内包：

- 发布：`@breezev/types`
- 发布：`@breezev/utils`
- 发布：`@breezev/ui`
- 不发布：`@breezev/config`（`private: true`）

## 2. 一次性环境配置（首次发布前）

### 2.1 npm 登录与组织权限

```bash
npm logout --registry=https://registry.npmjs.org
npm login --auth-type=web --registry=https://registry.npmjs.org --scope=@breezev
npm whoami --registry=https://registry.npmjs.org
npm org ls breezev
```

通过标准：

- `npm whoami` 能返回你的账号
- `npm org ls breezev` 能看到你是 `owner/member`

### 2.2 仓库 `.npmrc`

确保根目录 `.npmrc` 包含：

```ini
registry=https://registry.npmjs.org/
@breezev:registry=https://registry.npmjs.org/
```

## 3. 每次发版标准流程

以下命令均在仓库根目录执行：

```bash
cd E:\SomeUsefulTools\BreezeV
```

### 3.1 安装依赖

```bash
pnpm install
```

### 3.2 质量检查

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

### 3.3 发布内容预览（强烈建议）

确保不会把 `.turbo`、临时日志等文件打包进 npm。

```powershell
$pkgs = @("types", "utils", "ui")
foreach ($p in $pkgs) {
  Write-Host "==== $p ===="
  cd "packages/$p"
  npm pack --dry-run
  cd ../..
}
```

### 3.4 生成 changeset（选择受影响包和版本等级）

```bash
pnpm changeset
```

### 3.5 写入版本号与 changelog

```bash
pnpm changeset:version
pnpm install
```

### 3.6 提交版本变更

```bash
git add .
git commit -m "chore: release packages"
```

### 3.7 预发布到 `next`

```bash
pnpm changeset publish --tag next
```

### 3.8 验证 dist-tags

```bash
npm view @breezev/types dist-tags --registry=https://registry.npmjs.org
npm view @breezev/utils dist-tags --registry=https://registry.npmjs.org
npm view @breezev/ui dist-tags --registry=https://registry.npmjs.org
```

## 4. 灰度验证（推荐）

在空目录验证安装：

```bash
mkdir E:\tmp\breezev-smoke
cd E:\tmp\breezev-smoke
npm init -y
npm i @breezev/types@next @breezev/utils@next @breezev/ui@next
```

## 5. 从 `next` 提升到 `latest`（可选）

验证通过后再执行：

```bash
npm dist-tag add @breezev/types@<version> latest --registry=https://registry.npmjs.org
npm dist-tag add @breezev/utils@<version> latest --registry=https://registry.npmjs.org
npm dist-tag add @breezev/ui@<version> latest --registry=https://registry.npmjs.org
```

示例（按你当前已发布版本）：

```bash
npm dist-tag add @breezev/types@0.1.1 latest --registry=https://registry.npmjs.org
npm dist-tag add @breezev/utils@0.1.1 latest --registry=https://registry.npmjs.org
npm dist-tag add @breezev/ui@0.2.0 latest --registry=https://registry.npmjs.org
```

## 6. 常见问题排查

### 6.1 `E401 Unable to authenticate`

原因：npm token/登录态无效。

修复：

```bash
npm logout --registry=https://registry.npmjs.org
npm login --auth-type=web --registry=https://registry.npmjs.org --scope=@breezev
```

### 6.2 发布时误走 `registry.npmmirror.com`

现象：报 `ENEEDAUTH`，提示登录 `npmmirror`。

修复：

```bash
npm config set registry https://registry.npmjs.org/ --location=user
npm config set @breezev:registry https://registry.npmjs.org/ --location=user
```

必要时临时强制：

```bash
npm publish --registry=https://registry.npmjs.org --tag next --access public
```

### 6.3 `npm view` 短时间 404

刚发布后 npm 索引存在传播延迟，等待 1-5 分钟重试：

```bash
npm view @breezev/ui dist-tags --registry=https://registry.npmjs.org
```

## 7. 回滚策略（仅标签层）

如果 `latest` 指错版本，移除并重打：

```bash
npm dist-tag rm @breezev/ui latest --registry=https://registry.npmjs.org
npm dist-tag add @breezev/ui@<correct_version> latest --registry=https://registry.npmjs.org
```

> 注意：npm 包版本一旦发布不能覆盖，只能发布新版本或调整 dist-tag。

## 8. 发版完成检查清单

- [ ] `pnpm changeset publish --tag next` 成功
- [ ] 三个包 `dist-tags` 正确
- [ ] 烟测安装通过
- [ ] （可选）`latest` 标签已切换
- [ ] 发版提交与说明已同步到仓库
