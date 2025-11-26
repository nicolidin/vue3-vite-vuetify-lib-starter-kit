<template>
  <div class="note-creation">
    <input
      v-model="title"
      type="text"
      placeholder="Titre"
      class="note-creation__title"
    />
    <textarea
      v-model="contentMd"
      placeholder="Content..."
      class="note-creation__content"
    />
    <TagDropdown
      v-model="selectedTagIds"
      :tags="tags"
      class="note-creation__tags"
    />
    <div class="note-creation__actions">
      <button
        @click="emitNote"
        :disabled="!title && !contentMd"
        class="note-creation__actions-btn note-creation__actions-btn--primary"
      >
        Créer
      </button>
      <button
        @click="resetForm"
        type="button"
        class="note-creation__actions-btn note-creation__actions-btn--secondary"
      >
        Fermer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TagDropdown from "../TagDropdown/TagDropdown.vue";

// Type pour les tags
type TagType = {
  frontId: string;
  title: string;
  color: string;
};

const props = defineProps<{
  // Liste des tags disponibles pour sélection
  tags?: TagType[];
}>();

const emit = defineEmits<{
  (e: "create", val: { title: string; contentMd: string; tagIds: string[] }): void;
}>();

const title = ref("");
const contentMd = ref("");
const selectedTagIds = ref<string[]>([]);

function emitNote() {
  emit("create", {
    title: title.value,
    contentMd: contentMd.value,
    tagIds: selectedTagIds.value,
  });
  resetForm();
}

function resetForm() {
  title.value = "";
  contentMd.value = "";
  selectedTagIds.value = [];
}
</script>

<style scoped lang="scss">
.note-creation {
  border-radius: $spacing-8;
  box-shadow: 0 1px 4px rgba(60, 64, 67, 0.15);
  padding: $spacing-16;
  max-width: 400px;
  margin: 0 auto;

  &__title {
    width: 100%;
    margin-bottom: $spacing-8;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    padding: $spacing-4 0;
    @include typo-heading-06();
  }

  &__content {
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

  &__tags {
    margin-bottom: $spacing-12;
  }

  &__actions {
    display: flex;
    gap: $spacing-8;
    justify-content: flex-end;

    &-btn {
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

