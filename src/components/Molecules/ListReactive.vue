<template>
  <div>
    heyReactiveList
    <p v-for="element in elements" :key="element.id">
      text: {{ element.text }} id: {{ element.id }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  elements: Array<{ id: string; text: string }>,
});
</script>

<style scoped lang="scss"></style>
