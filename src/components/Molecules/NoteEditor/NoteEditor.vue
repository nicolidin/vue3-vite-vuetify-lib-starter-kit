<template>
  <div class="note-editor">
    <v-text-field
      v-model="formData.title"
      label="Titre"
      placeholder="Titre"
      variant="outlined"
      density="comfortable"
      hide-details="auto"
      :error-messages="errors.title"
      class="note-editor__title"
    />

    <v-textarea
      v-model="formData.contentMd"
      label="Contenu (Markdown)"
      placeholder="Contenu (Markdown)..."
      variant="outlined"
      density="comfortable"
      hide-details="auto"
      :error-messages="errors.contentMd"
      rows="6"
      auto-grow
      class="note-editor__content"
    />

    <TagDropdown
      v-model="formData.tagsId"
      :tags="tags"
      class="note-editor__tags"
    />

    <div class="note-editor__actions">
      <v-btn
        color="primary"
        variant="tonal"
        :disabled="!isValid"
        @click="emitUpdate"
      >
        Enregistrer
      </v-btn>
      <v-btn
        variant="outlined"
        @click="emit('cancel')"
      >
        Annuler
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import TagDropdown from "../TagDropdown/TagDropdown.vue";
import { useValidation } from "../../../composables/useValidation/useValidation";
import { NoteUpdateSchema } from "../../../schemas/note.schema";
import { extractTitleFromMarkdown } from "../../../services/utils/markdownUtils";
import type { TagType } from "../../../types/TagType";

const props = defineProps<{
  /** Note à éditer (id, contentMd, tagsId) */
  note: {
    id: string;
    contentMd: string;
    tagsId?: string[];
  };
  /** Liste des tags disponibles pour sélection */
  tags?: TagType[];
}>();

const emit = defineEmits<{
  (e: "update", val: { id: string; title: string; contentMd: string; tagsId: string[] }): void;
  (e: "cancel"): void;
}>();

const formData = ref({
  title: "",
  contentMd: "",
  tagsId: [] as string[],
});

function getBodyWithoutTitle(contentMd: string): string {
  if (!contentMd) return "";
  const lines = contentMd.split("\n");
  return lines[0]?.trim().startsWith("#")
    ? lines.slice(1).join("\n").trim()
    : contentMd;
}

function resetFormFromNote() {
  const { note } = props;
  const title = extractTitleFromMarkdown(note.contentMd) ?? "";
  const body = getBodyWithoutTitle(note.contentMd);
  formData.value = {
    title,
    contentMd: body,
    tagsId: note.tagsId ?? [],
  };
}

watch(
  () => props.note,
  () => resetFormFromNote(),
  { immediate: true }
);

const { errors, validate, isValid } = useValidation(NoteUpdateSchema);

function emitUpdate() {
  const fullContent =
    formData.value.title.trim() !== ""
      ? `# ${formData.value.title.trim()}\n\n${formData.value.contentMd}`
      : formData.value.contentMd;

  const payload = {
    id: props.note.id,
    contentMd: fullContent,
    tagsId: formData.value.tagsId ?? [],
  };

  if (validate(payload)) {
    emit("update", {
      id: props.note.id,
      title: formData.value.title || "",
      contentMd: fullContent,
      tagsId: formData.value.tagsId ?? [],
    });
  }
}
</script>

<style scoped lang="scss">
.note-editor {
  max-width: 480px;
  margin: 0 auto;
  padding: $spacing-16;

  &__title {
    margin-bottom: $spacing-12;
  }

  &__content {
    margin-bottom: $spacing-12;
  }

  &__tags {
    margin-bottom: $spacing-16;
  }

  &__actions {
    display: flex;
    gap: $spacing-8;
    justify-content: flex-end;
  }
}
</style>
