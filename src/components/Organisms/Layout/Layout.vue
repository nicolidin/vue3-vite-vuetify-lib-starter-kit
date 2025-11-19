<template>
  <v-app>
    <Header />
    <SidebarTags
      v-if="tags"
      :tags="tags"
      :title="sidebarTitle"
      :model-value="sidebarModelValue"
      :permanent="sidebarPermanent"
      :temporary="sidebarTemporary"
      :width="sidebarWidth"
      @tag-click="handleTagClick"
      @update:model-value="handleSidebarUpdate"
    />
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
import { ref, watch } from "vue";
import Header from "../Header/Header.vue";
import SidebarTags from "../../Molecules/SidebarTags/SidebarTags.vue";

const props = withDefaults(
  defineProps<{
    tags?: {
      libelleName: string;
      isSelected: boolean;
    }[];
    sidebarTitle?: string;
    sidebarModelValue?: boolean;
    sidebarPermanent?: boolean;
    sidebarTemporary?: boolean;
    sidebarWidth?: number | string;
  }>(),
  {
    sidebarTitle: "Labels",
    sidebarModelValue: true,
    sidebarPermanent: true,
    sidebarTemporary: false,
    sidebarWidth: 256,
  }
);

const emit = defineEmits<{
  (e: "tag-click", tag: { libelleName: string; isSelected: boolean }): void;
  (e: "sidebar-update", value: boolean): void;
}>();

const sidebarModelValue = ref(props.sidebarModelValue);

// Synchroniser avec les props si elles changent
watch(() => props.sidebarModelValue, (newValue) => {
  sidebarModelValue.value = newValue;
});

function handleTagClick(tag: { libelleName: string; isSelected: boolean }) {
  emit("tag-click", tag);
}

function handleSidebarUpdate(value: boolean) {
  sidebarModelValue.value = value;
  emit("sidebar-update", value);
}
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
