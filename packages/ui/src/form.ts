import { useField } from 'vee-validate'
import { type MaybeRefOrGetter, computed, toValue } from 'vue'

export function useFormField(name: MaybeRefOrGetter<string>) {
  const fieldName = computed(() => toValue(name))
  const field = useField<string>(fieldName)

  const isInvalid = computed(() => Boolean(field.errorMessage.value))

  return {
    ...field,
    isInvalid,
  }
}
