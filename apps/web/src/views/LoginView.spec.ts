import { describe, expect, it } from 'vitest'

import { loginFormSchema } from '@breezev/types'

describe('loginFormSchema', () => {
  it('应通过合法输入', () => {
    const result = loginFormSchema.safeParse({
      email: 'hello@breezev.dev',
      password: 'breezev-2026',
      remember: true,
    })

    expect(result.success).toBe(true)
  })
})
