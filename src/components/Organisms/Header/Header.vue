<template>
  <v-app-bar app class="header">
    <v-spacer></v-spacer>
    <v-btn-toggle
      v-model="colorRef"
      mandatory
      size="small"
      class="toggle themeToggle"
    >
      <v-btn value="dark" size="small"> dark </v-btn>
      <v-btn value="light" size="small"> light </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useTheme } from "../../../modules/globalAppData/composables/useTheme.ts";

const { colorRef } = useTheme();
</script>

<style scoped lang="scss">
.header {
  // Styles spécifiques au header si nécessaire
}
</style>

