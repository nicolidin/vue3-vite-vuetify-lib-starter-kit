<template>
  <v-select
    :model-value="modelValue"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :label="label"
    :multiple="multiple"
    :chips="chips"
    :closable-chips="closableChips"
    :density="density"
    :disabled="disabled"
    :placeholder="placeholder"
    @update:model-value="handleUpdate"
    v-bind="$attrs"
  >
    <slot></slot>
  </v-select>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    // Valeur sélectionnée (peut être un string, number, array, etc.)
    modelValue: any;
    // Liste des items à afficher
    items: any[];
    // Propriété à utiliser comme titre pour chaque item
    itemTitle?: string | ((item: any) => string);
    // Propriété à utiliser comme valeur pour chaque item
    itemValue?: string | ((item: any) => any);
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
    // Placeholder text
    placeholder?: string;
  }>(),
  {
    itemTitle: "title",
    itemValue: "value",
    multiple: false,
    chips: false,
    closableChips: false,
    density: "default",
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

function handleUpdate(value: any) {
  emit("update:modelValue", value);
}
</script>

<style scoped lang="scss">
// Styles spécifiques si nécessaire
</style>

