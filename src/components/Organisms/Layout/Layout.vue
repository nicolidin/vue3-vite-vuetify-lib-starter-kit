<template>
  <v-app>
    <v-app-bar app class="header">
      <v-spacer> </v-spacer>
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
    <v-main
      style="
        --v-layout-left: 0px;
        --v-layout-right: 0px;
        --v-layout-top: 64px;
        --v-layout-bottom: 44px;
      "
    >
      <v-container class="v-container">
        <div class="containerInner">
          <slot></slot>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from "@/modules/globalAppData/composables/useTheme.ts";

const { colorRef } = useTheme();
</script>

<style scoped lang="scss">
::v-deep(.v-container) {
  max-width: 100% !important; // it removes vuetify arbitrary rule
  padding: 0 16px;

  @media (min-width: $breakpoint-height-l) {
    padding-left: 15%;
    padding-right: 15%;
  }
}

.containerInner {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
