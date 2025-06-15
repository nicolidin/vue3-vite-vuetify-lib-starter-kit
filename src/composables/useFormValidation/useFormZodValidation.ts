import { ref, computed, ComputedRef, Ref } from "vue";
import { ZodObject, ZodRawShape, ZodError } from "zod";

// Type pour les fonctions de génération de message d'erreur personnalisées
type ErrorMessageGenerators = Record<string, (value: any) => string>;

// Structure retournée pour chaque champ du formulaire
type FieldErrorState = {
  hasError: boolean;
  message?: string;
};

// Fonction pure qui retourne les messages d'erreur Zod pour chaque champ
function extractZodFieldErrors(
  schema: ZodObject<ZodRawShape>,
  data: Record<string, any>,
): Record<string, string> {
  try {
    schema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof ZodError) {
      return error.errors.reduce(
        (acc, err) => {
          if (err.path[0]) acc[err.path[0] as string] = err.message;
          return acc;
        },
        {} as Record<string, string>,
      );
    }
    return {};
  }
}

/**
 * Composable de validation de formulaire avec Zod et messages d'erreur personnalisés.
 *
 * @param options.formData - Référence à l'objet de données du formulaire
 * @param options.zodSchema - Schéma Zod pour la validation
 * @param options.customValidations - Validations personnalisées (optionnel)
 * @param options.errorMessages - Générateurs de messages d'erreur personnalisés (optionnel)
 */
export function useFormZodValidation<
  T extends Record<string, any>,
  Z extends ZodObject<ZodRawShape> | undefined = undefined,
>(options: {
  formData: Ref<T>;
  zodSchema?: Z;
  customValidations?: Partial<Record<keyof T, ComputedRef<boolean>>>;
  errorMessages?: ErrorMessageGenerators;
}) {
  // Décomposition des options
  const {
    formData,
    zodSchema,
    customValidations = {},
    errorMessages = {},
  } = options;

  // Indique si une tentative de validation a eu lieu (pour afficher les erreurs)
  const isFormTouched = ref(false);

  // Stocke les messages d'erreur Zod pour chaque champ
  const zodFieldErrors = ref<Record<string, string>>({});

  // Génère les validations Zod pour chaque champ
  let zodFieldHasError: Partial<Record<keyof T, ComputedRef<boolean>>> = {};
  if (zodSchema) {
    zodFieldHasError = Object.fromEntries(
      Object.keys(zodSchema.shape).map((field) => [
        field,
        computed(() => {
          const errors = extractZodFieldErrors(zodSchema, formData.value);
          zodFieldErrors.value = errors;
          return !!errors[field];
        }),
      ]),
    ) as Partial<Record<keyof T, ComputedRef<boolean>>>;
  }

  // Fusionne les validations Zod et custom (custom prioritaire)
  const fieldHasError: Record<keyof T, ComputedRef<boolean>> = {
    ...zodFieldHasError,
    ...customValidations,
  } as Record<keyof T, ComputedRef<boolean>>;

  // Génère pour chaque champ un état d'erreur et un message à afficher
  const fieldErrorStates = ref(
    {} as Record<keyof T, ComputedRef<FieldErrorState>>,
  );

  Object.entries(fieldHasError).forEach(([field, hasError]) => {
    fieldErrorStates.value[field as keyof T] = computed(() => {
      const value = formData.value[field as keyof T];
      const showError = isFormTouched.value && hasError.value;
      let message: string | undefined = undefined;

      if (showError) {
        // 1. Message custom si défini
        if (errorMessages[field]) {
          message = errorMessages[field](value);
        }
        // 2. Sinon, message Zod si présent
        else if (zodSchema && zodFieldErrors.value[field]) {
          message = zodFieldErrors.value[field];
        }
      }

      return {
        hasError: showError,
        message,
      };
    });
  });

  // Vérifie si tout le formulaire est valide
  const isFormValid = computed(() =>
    Object.values(fieldHasError).every((el) => !el.value),
  );

  // Déclenche la validation (affiche les erreurs)
  function validateForm() {
    isFormTouched.value = true;
    return isFormValid.value;
  }

  // API retournée par le composable
  return {
    fieldErrorStates, // Pour chaque champ : { hasError, message }
    validateForm, // Pour déclencher la validation
  };
}
