import { reactive } from "vue";
import ArticleMardownReadonly from "./ArticleMardownReadonly.vue";

export default {
  title: "Molecules/ArticleMarkdownReadonly",
  component: ArticleMardownReadonly,
  argTypes: {
    contentMd: {
      control: "text",
      description: "Markdown content to be rendered",
    },
  },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MarkdownText is used to render Markdown content into HTML inside a Vue component.",
      },
    },
  },
};

const Template = (args) => ({
  components: { ArticleMardownReadonly },
  setup() {
    const state = reactive({ ...args });
    return { args: state };
  },
  template: '<ArticleMardownReadonly v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  contentMd:
    "# Hello World!\n\nThis is a **Markdown** example with a [link](https://example.com).",
};
