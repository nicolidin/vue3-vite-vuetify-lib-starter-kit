import { reactive } from "vue";
import ArticlePreview from "@/components/Molecules/ArticlePreview/ArticlePreview.vue";

export default {
  title: "Molecules/ArticlePreview",
  component: ArticlePreview,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["small", "medium", "large", "xlarge", "auto"],
    },
    isDragging: { control: "boolean" },
  },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Article Preview can be used in a mosaic but also everywhere",
      },
    },
  },
};

const Template = (args) => ({
  components: { ArticlePreview },
  setup() {
    const state = reactive({ ...args });
    return { args: state };
  },
  template: '<ArticlePreview v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  id: "1",
  content:
    "This is a sample article preview content. It supports **Markdown**\n # Title \n ## subtitle \n ### subsubtitle",
  size: "small",
  isDragging: false,
};
