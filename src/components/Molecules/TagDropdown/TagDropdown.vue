<template>
  <Dropdown
    v-if="tags && tags.length > 0"
    :model-value="normalizedModelValue"
    :items="tags"
    item-title="title"
    item-value="id"
    :label="label"
    multiple
    chips
    :closable-chips="false"
    density="compact"
    :disabled="disabled"
    @update:model-value="handleUpdate"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props">
        <template v-slot:title>
          <Tag :name="item.raw.title" :color="item.raw.color" />
        </template>
      </v-list-item>
    </template>
    <template v-slot:chip="{ item }">
      <Tag
        v-if="item.raw"
        :name="item.raw.title"
        :color="item.raw.color"
        :chip-style="true"
        class="tag-dropdown__selected-tag"
      />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Dropdown from "../../Atoms/Dropdown/Dropdown.vue";
import Tag from "../../Atoms/Tag/Tag.vue";

// Type pour les tags
type TagType = {
  id: string;
  title: string;
  color: string;
};

const props = withDefaults(
  defineProps<{
    // Liste des tags disponibles
    tags?: TagType[];
    // Valeur sélectionnée (array d'IDs)
    modelValue?: string[];
    // Label du dropdown
    label?: string;
    // Si true, le dropdown est désactivé
    disabled?: boolean;
  }>(),
  {
    modelValue: () => [],
    label: "Tags",
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const normalizedModelValue = computed(() => {
  return props.modelValue || [];
});

function handleUpdate(value: any) {
  // Empêcher la suppression des tags via les chips (readonly)
  const newIds = Array.isArray(value) ? value : [];
  const currentIds = normalizedModelValue.value;

  // Si on essaie de réduire le nombre de sélections, ignorer la modification
  if (newIds.length < currentIds.length) {
    return;
  }

  emit("update:modelValue", newIds);
}
</script>

<style scoped lang="scss">
.tag-dropdown {
  &__selected-tag {
    flex-shrink: 0;
    margin-right: 4px;
  }
}

// Masquer le v-chip par défaut pour afficher uniquement notre Tag personnalisé
:deep(.v-select__selection .v-chip) {
  padding: 0;
  background: transparent;
  border: none;
  min-width: auto;
  height: auto;

  .v-chip__content {
    padding: 0;
  }
}
</style>

