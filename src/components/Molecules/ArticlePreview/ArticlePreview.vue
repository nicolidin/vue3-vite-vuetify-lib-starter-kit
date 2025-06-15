<template>
  <div
    :class="[
      'articlePreview',
      `articlePreview--${size}`,
      { 'articlePreview--dragging': isDragging },
    ]"
  >
    <div class="articlePreview__content">
      <MarkdownText :content-md="content" size="xsmall" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import MarkdownText from "@/components/Molecules/MarkdownText/MarkdownText.vue";
import { ArticlePreviewSizeType } from "@/types/sizes.ts";

const props = defineProps<{
  id: string;
  content: string;
  size: ArticlePreviewSizeType;
  isDragging: boolean;
}>();
</script>

<style lang="scss" scoped>
/*! sass-lint:disable */
@use "@/styles/app-kit/global-item-size" as size;
// you can override those variables with --articles-height--${size}

$article-heights: map-merge(
  size.$item-height,
  (
    auto: 100%,
  )
);

// you can override those variables with --articles-width--${size}

.articlePreview {
  --border-color: #e0e0e0;
  --article-width: 250px;
  --article-height: 300px;

  background-color: transparent;
  width: var(--article-width);
  height: var(--article-height);
  border: 1px solid var(--border-color);
  border-color: var(--border-color);
  border-radius: $spacing-8;
  padding: $spacing-16;

  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  transition: transform 0.3s ease;

  &--auto {
    --article-width: 100%;
  }

  &--dragging {
    background: blue;
  }

  &:hover {
    transform: scale(1.05);
  }

  &__content {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100%;
    width: 100%;
  }

  // ✅ Correction du problème de déclaration après une règle imbriquée
  @each $name, $height in $article-heights {
    & {
      --article-height-#{$name}: #{$height};
    }

    &--#{$name} {
      --article-height: var(--article-height-#{$name});
    }
  }
}
</style>
