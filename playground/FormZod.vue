<template>
  <form @submit.prevent="handleSubmit" class="form-zod" novalidate>
    <div class="form-zod__group">
      <label for="email" class="form-zod__label">Email</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        :class="[
          'form-zod__input',
          { 'form-zod__input--error': fieldErrorStates?.email?.hasError },
        ]"
      />
      <span
        v-if="fieldErrorStates?.email?.hasError"
        class="form-zod__error-message"
      >
        {{ fieldErrorStates?.email?.message }}
      </span>
    </div>

    <div class="form-zod__group">
      <label for="password" class="form-zod__label">Mot de passe</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        :class="[
          'form-zod__input',
          { 'form-zod__input--error': fieldErrorStates?.password?.hasError },
        ]"
      />
      <span
        v-if="fieldErrorStates?.password?.hasError"
        class="form-zod__error-message"
      >
        {{ fieldErrorStates?.password?.message }}
      </span>
    </div>

    <div class="form-zod__group">
      <label for="passwordConfirm" class="form-zod__label"
        >Confirmer le mot de passe</label
      >
      <input
        id="passwordConfirm"
        v-model="formData.passwordConfirm"
        type="password"
        :class="[
          'form-zod__input',
          {
            'form-zod__input--error':
              fieldErrorStates?.passwordConfirm?.hasError,
          },
        ]"
      />
      <span
        v-if="fieldErrorStates?.passwordConfirm?.hasError"
        class="form-zod__error-message"
      >
        {{ fieldErrorStates?.passwordConfirm?.message }}
      </span>
    </div>

    <div class="form-zod__group">
      <label for="accountType" class="form-zod__label">Type de compte</label>
      <select
        id="accountType"
        v-model="formData.accountType"
        :class="[
          'form-zod__input',
          { 'form-zod__input--error': fieldErrorStates?.accountType?.hasError },
        ]"
      >
        <option value="">Sélectionnez un type</option>
        <option value="personal">Personnel</option>
        <option value="business">Professionnel</option>
      </select>
      <span
        v-if="fieldErrorStates?.accountType?.hasError"
        class="form-zod__error-message"
      >
        {{ fieldErrorStates?.accountType?.message }}
      </span>
    </div>

    <div class="form-zod__group form-zod__group--checkbox">
      <label class="form-zod__label form-zod__label--checkbox">
        <input
          type="checkbox"
          v-model="formData.acceptTerms"
          :class="[
            'form-zod__input',
            'form-zod__input--checkbox',
            {
              'form-zod__input--error': fieldErrorStates?.acceptTerms?.hasError,
            },
          ]"
        />
        J'accepte les conditions d'utilisation
      </label>
      <span
        v-if="fieldErrorStates?.acceptTerms?.hasError"
        class="form-zod__error-message"
      >
        {{ fieldErrorStates?.acceptTerms?.message }}
      </span>
    </div>

    <button type="submit" class="form-zod__submit">S'inscrire</button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { z } from "zod";
import { useFormZodValidation } from "../src/composables/useFormValidation/useFormZodValidation";

const formData = ref({
  email: "",
  password: "",
  passwordConfirm: "",
  accountType: "",
  acceptTerms: false,
});

const zodSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
  accountType: z.string().min(1),
  acceptTerms: z.boolean().refine((val) => val === true),
});

const errorMessages = {
  accountType: (value: string) =>
    value.length === 0
      ? "Veuillez sélectionner un type de compte"
      : "Type de compte invalide",
  acceptTerms: (value: boolean) =>
    value === false ? "Vous devez accepter les conditions d'utilisation" : "",
};

const { fieldErrorStates, validateForm } = useFormZodValidation({
  formData,
  zodSchema,
  errorMessages,
  customValidations: {
    passwordConfirm: computed(() => {
      if (!formData.value.password || !formData.value.passwordConfirm) {
        return false;
      }
      return formData.value.password !== formData.value.passwordConfirm;
    }),
  },
});

function handleSubmit() {
  if (validateForm()) {
    console.log("Form submitted:", formData.value);
  }
}
</script>

<style lang="scss" scoped>
.form-zod {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;

  &__group {
    margin-bottom: 20px;
    &--checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  &__label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    &--checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 0;
    }
  }

  &__input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &--checkbox {
      width: auto;
      margin-right: 8px;
    }
    &--error {
      border-color: #ff4d4f;
    }
  }

  &__error-message {
    color: #ff4d4f;
    font-size: 0.875rem;
    margin-top: 4px;
    display: block;
  }

  &__submit {
    width: 100%;
    padding: 10px;
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #40a9ff;
    }
  }
}
</style>
