<template>
  <Dropdown
    v-if="tags && tags.length > 0"
    :model-value="normalizedModelValue"
    :items="tags"
    item-title="title"
    item-value="frontId"
    :label="label"
    multiple
    chips
    :closable-chips="false"
    density="compact"
    :disabled="disabled"
    @update:model-value="handleUpdate"
  >
    <template v-slot:item="{ props: itemProps, item }">
      <v-list-item v-bind="itemProps">
        <template v-slot:title>
          <Tag
            :name="item.raw.title"
            :color="item.raw.color"
          />
        </template>
      </v-list-item>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Dropdown from "../../Atoms/Dropdown/Dropdown.vue";
import Tag from "../../Atoms/Tag/Tag.vue";

// Type pour les tags
type TagType = {
  frontId: string;
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
  (_e: "update:modelValue", _value: string[]): void;
}>();

const normalizedModelValue = computed(() => {
  return props.modelValue || [];
});

function handleUpdate(value: any) {
  // Vuetify peut retourner des objets complets au lieu des valeurs seulement
  // On doit extraire les frontId
  let newIds: string[] = [];
  
  if (Array.isArray(value)) {
    newIds = value.map(v => {
      // Si c'est déjà une string (frontId), on la garde
      if (typeof v === 'string') {
        return v;
      }
      // Si c'est un objet, on extrait le frontId
      if (typeof v === 'object' && v !== null && 'frontId' in v) {
        return String(v.frontId);
      }
      // Sinon, on convertit en string
      return String(v);
    });
  } else if (value !== null && value !== undefined) {
    // Si c'est une seule valeur
    if (typeof value === 'string') {
      newIds = [value];
    } else if (typeof value === 'object' && 'frontId' in value) {
      newIds = [String(value.frontId)];
    } else {
      newIds = [String(value)];
    }
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

