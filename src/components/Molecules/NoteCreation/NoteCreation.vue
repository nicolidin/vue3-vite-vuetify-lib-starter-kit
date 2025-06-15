<template>
  <div class="noteCreation">
    <input
      v-model="title"
      type="text"
      placeholder="Titre"
      class="noteCreation_title"
    />
    <textarea
      v-model="contentMd"
      placeholder="Content..."
      class="noteCreation_content"
    />
    <div class="noteCreation_actions">
      <button
        @click="emitNote"
        :disabled="!title && !contentMd"
        class="noteCreation_actionsBtn noteCreation_actionsBtn--primary"
      >
        Créer
      </button>
      <button
        @click="resetForm"
        type="button"
        class="noteCreation_actionsBtn noteCreation_actionsBtn--secondary"
      >
        Fermer
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export type NoteCreated = {
  title: string;
  contentMd: string;
};
</script>

<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits<{
  (e: "create", val: NoteCreated): void;
}>();

const title = ref("");
const contentMd = ref("");

function emitNote() {
  emit("create", {
    title: title.value,
    contentMd: contentMd.value,
  });
  resetForm();
}

function resetForm() {
  title.value = "";
  contentMd.value = "";
}
</script>

<style scoped lang="scss">
.noteCreation {
  border-radius: $spacing-8;
  box-shadow: 0 1px 4px rgba(60, 64, 67, 0.15);
  padding: $spacing-16;
  max-width: 400px;
  margin: 0 auto;

  &_title {
    width: 100%;
    margin-bottom: $spacing-8;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    padding: $spacing-4 0;
    @include typo-heading-06();
  }

  &_content {
    width: 100%;
    min-height: 60px;
    border: none;
    border-bottom: 1px solid #eee;
    margin-bottom: $spacing-12;
    resize: vertical;
    outline: none;
    padding: $spacing-4 0;
    @include typo-body;
  }

  &_actions {
    display: flex;
    gap: $spacing-8;
    justify-content: flex-end;

    &Btn {
      background: #f1f3f4;
      border: none;
      border-radius: $spacing-4;
      padding: $spacing-4 $spacing-16;
      cursor: pointer;
      font-size: 1em;
      transition: background 0.2s;
      @include typo-body-small;

      &--primary {
        background: #e3f2fd;
        color: #1976d2;
      }
      &--secondary {
        background: #f1f3f4;
        color: #333;
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
