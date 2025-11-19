import { ref } from "vue";
import SidebarTags from "./SidebarTags.vue";

export default {
  title: "Molecules/SidebarTags",
  component: SidebarTags,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composant sidebar pour afficher une liste de tags sélectionnables, inspiré de Google Keep.",
      },
    },
  },
};

const Template = (args: any) => ({
  components: { SidebarTags },
  setup() {
    const tags = ref(args.tags || []);
    const onTagClick = (clickedTag: { libelleName: string; isSelected: boolean }) => {
      // Toggle selection state
      const tag = tags.value.find((t: { libelleName: string; isSelected: boolean }) => t.libelleName === clickedTag.libelleName);
      if (tag) {
        tag.isSelected = !tag.isSelected;
      }
      console.log("Tag clicked:", clickedTag);
    };
    const onTagCreate = (newTag: { title: string; color: string }) => {
      // Ajouter le nouveau tag à la liste
      tags.value.push({
        libelleName: newTag.title,
        isSelected: false,
      });
      console.log("Tag created:", newTag);
    };
    return { args, tags, onTagClick, onTagCreate };
  },
  template: `
    <v-app>
      <v-main>
        <div style="display: flex; height: 400px;">
          <SidebarTags 
            :tags="tags" 
            :title="args.title"
            :permanent="args.permanent !== false"
            @tag-click="onTagClick"
            @tag-create="onTagCreate"
          />
          <div style="flex: 1; padding: 2rem; background: #fafafa;">
            <h3>Main Content Area</h3>
            <p>Selected tags:</p>
            <ul>
              <li v-for="tag in tags.filter(t => t.isSelected)" :key="tag.libelleName">
                {{ tag.libelleName }}
              </li>
            </ul>
          </div>
        </div>
      </v-main>
    </v-app>
  `,
});

export const Default: any = Template.bind({});
Default.args = {
  title: "Labels",
  permanent: true,
  tags: [
    { libelleName: "Important", isSelected: false },
    { libelleName: "Work", isSelected: false },
    { libelleName: "Personal", isSelected: false },
    { libelleName: "Shopping", isSelected: false },
    { libelleName: "Ideas", isSelected: false },
    { libelleName: "Recipes", isSelected: false },
  ],
};

export const Empty: any = Template.bind({});
Empty.args = {
  title: "Labels",
  permanent: true,
  tags: [],
};

export const ManyTags: any = Template.bind({});
ManyTags.args = {
  title: "My Labels",
  permanent: true,
  tags: [
    { libelleName: "Important", isSelected: false },
    { libelleName: "Work", isSelected: false },
    { libelleName: "Personal", isSelected: false },
    { libelleName: "Shopping", isSelected: false },
    { libelleName: "Ideas", isSelected: false },
    { libelleName: "Recipes", isSelected: false },
    { libelleName: "Travel", isSelected: false },
    { libelleName: "Health", isSelected: false },
    { libelleName: "Finance", isSelected: false },
    { libelleName: "Projects", isSelected: false },
  ],
};

