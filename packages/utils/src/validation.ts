import { toTypedSchema } from '@vee-validate/zod'
import { type FormOptions, useForm as useVeeValidateForm } from 'vee-validate'
import type { input as ZodInput, ZodIssue, output as ZodOutput, ZodTypeAny } from 'zod'

export type UseZodFormOptions<TSchema extends ZodTypeAny> = Omit<
  FormOptions<ZodInput<TSchema>>,
  'validationSchema'
>

// 桥接 VeeValidate 与 Zod，统一获得输入/输出类型推导
export function useZodForm<TSchema extends ZodTypeAny>(
  schema: TSchema,
  options?: UseZodFormOptions<TSchema>,
) {
  return useVeeValidateForm<ZodInput<TSchema>, ZodOutput<TSchema>>({
    ...options,
    validationSchema: toTypedSchema(schema),
  })
}

// 将 Zod issue 列表转换为键值形式，便于 UI 层快速映射
export function mapZodIssues(issues: readonly ZodIssue[]): Record<string, string> {
  return issues.reduce<Record<string, string>>((acc, issue) => {
    const key = issue.path.length > 0 ? issue.path.join('.') : 'root'
    if (!acc[key]) {
      acc[key] = issue.message
    }
    return acc
  }, {})
}
