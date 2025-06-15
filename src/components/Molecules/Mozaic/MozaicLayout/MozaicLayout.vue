<template>
  <draggable
    v-model="items"
    tag="div"
    class="masonryGrid"
    item-key="contentMd"
    @start="drag = true"
    @end="drag = false"
    @choose="onChoose"
    @unchoose="onUnchoose"
  >
    <template #item="{ element, index }">
      <div
        :class="[
          'masonryGrid__item',
          `masonryGrid__item--${element.size}`,
          { 'masonryGrid__item--dragging': draggedIndex === index },
        ]"
      >
        <slot
          :element="element"
          :index="index"
          :isDragging="draggedIndex === index"
        />
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import draggable from "vuedraggable/src/vuedraggable";

import { merge } from "lodash-es";
import { SizeType } from "@/types/sizes.ts";
const props = defineProps<{
  items: Array<{ contentMd: string; id: string }>;
}>();

const normalizeItems = (items: Array<{ contentMd: string }>) => {
  return items.map((item) =>
    merge(item, {
      size: determineSizeByText(item.contentMd),
    }),
  );
};

const items = computed(() => normalizeItems(props.items));

// Pure function to determine size based on text length
function determineSizeByText(text: string): SizeType {
  const length = text.length;

  if (length < 150) return "small";
  if (length < 500) return "medium";
  if (length < 800) return "large";
  return "xlarge";
}

// State for tracking if an item is being dragged
const drag = ref(false);
const draggedIndex = ref<number | null>(null); // Index of the currently dragged item

// Event handlers for tracking the dragged item
const onChoose = (event: any) => {
  draggedIndex.value = event.oldIndex;
};

const onUnchoose = () => {
  draggedIndex.value = null;
};
</script>

<style lang="scss" scoped>
@use "@/styles/app-kit/global-item-size" as size;

$grid-auto-rows: 50px; // Define the row height

.masonryGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: $grid-auto-rows;
  $gap: 15px;
  gap: $gap;

  &__item {
    @each $size, $height in size.$item-height {
      &--#{$size} {
        grid-row: span
          #{($height / $grid-auto-rows) -
          1}; // Direct SCSS division
      }
    }

    &--dragging {
    }

    &:hover {
      transform: scale(1.02);
    }
  }
}
</style>
