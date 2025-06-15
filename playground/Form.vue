<template>
  <form class="form">
    <div class="form_group">
      <label for="email" class="form_label">Email</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        class="form_input"
        :class="{ 'form_input--error': showErrorByElements.email }"
      />
      <span v-if="showErrorByElements.email" class="form_error">
        Veuillez entrer un email valide
      </span>
    </div>

    <div class="form_group">
      <label for="password" class="form_label">Mot de passe</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        class="form_input"
        :class="{ 'form_input--error': showErrorByElements.password }"
      />
      <span v-if="showErrorByElements.password" class="form_error">
        Le mot de passe doit contenir au moins 8 caractères
      </span>
    </div>

    <button type="button" class="form_submit" @click="handleSubmit">
      Soumettre
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import useFormValidator from "@/composables/useFormValidation/useFormValidation";

const formData = ref({
  email: "",
  password: "",
});

const hasErrorByElements = {
  email: computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(formData.value.email);
  }),
  password: computed(() => formData.value.password.length < 8),
};

const { showErrorByElements, validateForm } =
  useFormValidator(hasErrorByElements);

const handleSubmit = () => {
  if (validateForm()) {
    console.log("Formulaire soumis :", formData.value);
  }
};
</script>

<style lang="scss" scoped>
.form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

  &_group {
    margin-bottom: 1.5rem;
  }

  &_label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
  }

  &_input {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
    font-size: 1rem;

    &--error {
      border-color: #e74c3c;
      background-color: #fff5f5;
    }
  }

  &_error {
    display: block;
    margin-top: 0.3rem;
    color: #e74c3c;
    font-size: 0.875rem;
  }

  &_submit {
    width: 100%;
    padding: 0.75rem;
    background-color: #3498db;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2980b9;
    }
  }
}
</style>
