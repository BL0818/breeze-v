import { execSync } from 'node:child_process'

const releasablePattern = /^packages\/(ui|utils|types)\//
const changesetPattern = /^\.changeset\/.+\.md$/

const baseSha = process.env.BASE_SHA
const headSha = process.env.HEAD_SHA ?? 'HEAD'

if (!baseSha) {
  console.log('[changeset-check] 未提供 BASE_SHA，跳过检查。')
  process.exit(0)
}

const diffOutput = execSync(`git diff --name-only ${baseSha} ${headSha}`, {
  encoding: 'utf8',
})

const changedFiles = diffOutput
  .split('\n')
  .map((file) => file.trim())
  .filter((file) => file.length > 0)

const touchesReleasablePackage = changedFiles.some((file) => releasablePattern.test(file))
if (!touchesReleasablePackage) {
  console.log('[changeset-check] 未命中可发布包改动，跳过 changeset 强制检查。')
  process.exit(0)
}

const hasChangeset = changedFiles.some((file) => changesetPattern.test(file))
if (!hasChangeset) {
  console.error('[changeset-check] 检测到可发布包改动，但未提交 .changeset/*.md。')
  process.exit(1)
}

console.log('[changeset-check] 校验通过。')
