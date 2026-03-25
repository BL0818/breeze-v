import { execSync } from 'node:child_process'

const ALLOW_LICENSES = new Set([
  'MIT',
  'ISC',
  'Apache-2.0',
  'BSD',
  'BSD-2-Clause',
  'BSD-3-Clause',
  '0BSD',
])

const BLOCK_LICENSE_PATTERN = /(^|\W)(AGPL|GPL)(\W|$)/i

function normalizeTokens(expression) {
  return expression
    .replace(/[()]/g, ' ')
    .replace(/\+/g, ' OR ')
    .split(/\s+OR\s+|\s+AND\s+|\s*\/\s*/i)
    .map((token) =>
      token
        .replace(/\*$/, '')
        .replace(/\s+WITH\s+.*/i, '')
        .trim(),
    )
    .filter((token) => token.length > 0)
}

function validateLicense(name, licenseExpression) {
  if (!licenseExpression) {
    return `依赖 ${name} 缺失许可证信息`
  }

  if (BLOCK_LICENSE_PATTERN.test(licenseExpression)) {
    return `依赖 ${name} 命中黑名单许可证: ${licenseExpression}`
  }

  const tokens = normalizeTokens(licenseExpression)
  const hasAllowedToken = tokens.some((token) => ALLOW_LICENSES.has(token))

  if (!hasAllowedToken) {
    return `依赖 ${name} 不在白名单中: ${licenseExpression}`
  }

  return null
}

const raw = execSync('pnpm dlx license-checker --json --production --excludePrivatePackages', {
  encoding: 'utf8',
})

const results = JSON.parse(raw)
const violations = []

for (const [name, info] of Object.entries(results)) {
  const license = typeof info.licenses === 'string' ? info.licenses : ''
  const error = validateLicense(name, license)
  if (error) {
    violations.push(error)
  }
}

if (violations.length > 0) {
  console.error('[license-check] 发现许可证违规项:')
  for (const item of violations) {
    console.error(`- ${item}`)
  }
  process.exit(1)
}

console.log('[license-check] 校验通过。')
