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
