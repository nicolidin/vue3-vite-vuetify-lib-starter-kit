<template>
  <Dropdown
    v-if="tags && tags.length > 0"
    :model-value="modelValue"
    :items="tags"
    item-title="title"
    item-value="id"
    :label="label"
    :multiple="multiple"
    :chips="chips"
    :closable-chips="closableChips"
    :density="density"
    :disabled="disabled"
    @update:model-value="handleUpdate"
  >
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props">
        <template v-slot:prepend>
          <div
            class="tag-dropdown__color-indicator"
            :style="{
              backgroundColor: item.raw.color,
            }"
          ></div>
        </template>
      </v-list-item>
    </template>
    <template v-slot:chip="{ props, item }">
      <v-chip v-bind="props">
        <div
          class="tag-dropdown__color-chip"
          :style="{
            backgroundColor: item.raw.color,
          }"
        ></div>
        {{ item.raw.title }}
      </v-chip>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from "../../Atoms/Dropdown/Dropdown.vue";

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
    // Valeur sélectionnée (array d'IDs si multiple, string sinon)
    modelValue?: string | string[];
    // Label du dropdown
    label?: string;
    // Si true, permet la sélection multiple
    multiple?: boolean;
    // Si true, affiche les sélections sous forme de chips
    chips?: boolean;
    // Si true, les chips peuvent être fermés
    closableChips?: boolean;
    // Densité du composant
    density?: "default" | "comfortable" | "compact";
    // Si true, le dropdown est désactivé
    disabled?: boolean;
  }>(),
  {
    modelValue: () => [],
    label: "Tags",
    multiple: true,
    chips: true,
    closableChips: true,
    density: "compact",
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | string[]): void;
}>();

function handleUpdate(value: string | string[]) {
  emit("update:modelValue", value);
}
</script>

<style scoped lang="scss">
.tag-dropdown {
  &__color-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
  }

  &__color-chip {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 6px;
  }
}
</style>

