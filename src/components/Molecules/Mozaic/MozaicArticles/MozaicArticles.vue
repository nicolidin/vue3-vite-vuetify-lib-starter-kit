<template>
  <MozaicLayout :items="props.articles">
    <template #default="{ element, index, isDragging }">
      <ArticlePreview
        :id="element.documentId || element.id"
        :content="element.contentMd"
        size="auto"
        :isDragging="isDragging"
        @click="openArticle(element)"
      />
    </template>
  </MozaicLayout>
</template>

<script lang="ts">
export type ArticleType = {
  documentId?: string;
  id?: string;
  slug: string;
  contentMd: string;
  size: string;
};
</script>

<script setup lang="ts">
import ArticlePreview from "@/components/Molecules/ArticlePreview/ArticlePreview.vue";
import MozaicLayout from "@/components/Molecules/Mozaic/MozaicLayout/MozaicLayout.vue";

const props = defineProps<{
  articles: Array<ArticleType>;
}>();

const emits = defineEmits<{
  (e: "clickOnArticle", val: ArticleType): void;
}>();

const openArticle = (article: ArticleType) => {
  console.log("click open article: ", article);
  emits("clickOnArticle", article);
};
</script>

<style scoped lang="scss"></style>
