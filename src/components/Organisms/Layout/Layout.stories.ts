import { ref } from "vue";
import Layout from "./Layout.vue";

export default {
  title: "Organisms/Layout",
  component: Layout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Layout principal avec barre d'app, sidebar de tags et slot de contenu. Permet de changer le thème.",
      },
    },
  },
};

const Template = (args: any) => ({
  components: { Layout },
  setup() {
    const tags = ref(args.tags || []);
    const onTagClick = (clickedTag: { libelleName: string; isSelected: boolean }) => {
      const tag = tags.value.find((t: { libelleName: string; isSelected: boolean }) => t.libelleName === clickedTag.libelleName);
      if (tag) {
        tag.isSelected = !tag.isSelected;
      }
      console.log("Tag clicked:", clickedTag);
    };
    return { args, tags, onTagClick };
  },
  template: `
    <Layout 
      v-bind="args"
      :tags="tags"
      @tag-click="onTagClick"
    >
      <template #default>
        <div style="padding: 2rem; text-align: center;">
          <h2>Contenu dans le slot du layout</h2>
          <p>Vous pouvez insérer ici n'importe quel composant ou texte pour tester le layout.</p>
          <div v-if="tags && tags.length > 0" style="margin-top: 2rem;">
            <h3>Tags sélectionnés:</h3>
            <ul style="list-style: none; padding: 0;">
              <li v-for="tag in tags.filter((t: any) => t.isSelected)" :key="tag.libelleName" style="margin: 0.5rem 0;">
                {{ tag.libelleName }}
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Layout>
  `,
});

export const Default: any = Template.bind({});
Default.args = {
  tags: [
    { libelleName: "Important", isSelected: false },
    { libelleName: "Work", isSelected: false },
    { libelleName: "Personal", isSelected: false },
    { libelleName: "Shopping", isSelected: false },
  ],
};

export const WithoutSidebar: any = Template.bind({});
WithoutSidebar.args = {
  tags: undefined,
};

export const WithManyTags: any = Template.bind({});
WithManyTags.args = {
  tags: [
    { libelleName: "Important", isSelected: false },
    { libelleName: "Work", isSelected: false },
    { libelleName: "Personal", isSelected: false },
    { libelleName: "Shopping", isSelected: false },
    { libelleName: "Ideas", isSelected: false },
    { libelleName: "Recipes", isSelected: false },
    { libelleName: "Travel", isSelected: false },
    { libelleName: "Health", isSelected: false },
  ],
};
