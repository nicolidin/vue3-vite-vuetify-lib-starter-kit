<template>
  <div class="tag" :style="{ '--tag-color': color }">
    <div class="tag__color"></div>
    <span class="tag__name">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  // Nom du tag à afficher
  name: string;
  // Couleur du tag (format hex, rgb, etc.)
  color: string;
}>();
</script>

<style scoped lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  gap: $spacing-8;

  &__color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--tag-color);
    flex-shrink: 0;
  }

  &__name {
    @include typo-body;
    color: rgba(var(--v-theme-on-surface), 0.87);
    white-space: nowrap;
  }
}
</style>

