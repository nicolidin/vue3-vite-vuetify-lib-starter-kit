import { ref, computed } from 'vue';
import { z, type ZodSchema } from 'zod';

/**
 * Composable de validation avec Zod
 * 
 * @param schema - Schéma Zod pour valider les données
 * @returns Objet avec errors, isTouched, validate, isValid
 * 
 * @example
 * ```typescript
 * const { errors, validate, isValid } = useValidation(NoteCreateSchema)
 * 
 * if (validate(formData.value)) {
 *   // Données valides
 * }
 * ```
 */
export function useValidation<T extends ZodSchema>(schema: T) {
  const errors = ref<Record<string, string[]>>({});
  const isTouched = ref(false);

  function validate(data: unknown): data is z.infer<T> {
    isTouched.value = true;
    const result = schema.safeParse(data);

    if (!result.success) {
      errors.value = result.error.flatten().fieldErrors;
      return false;
    }

    errors.value = {};
    return true;
  }

  const isValid = computed(() => Object.keys(errors.value).length === 0);

  return {
    errors,
    isTouched,
    validate,
    isValid,
  };
}
