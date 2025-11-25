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
      // Le composant émet déjà l'état final souhaité, on applique directement
      const tag = tags.value.find((t: { libelleName: string; isSelected: boolean }) => t.libelleName === clickedTag.libelleName);
      if (tag) {
        tag.isSelected = clickedTag.isSelected;
      }
      console.log("Tag clicked:", clickedTag);
    };
    const onTagCreate = (newTag: { title: string; color: string }) => {
      // Ajouter le nouveau tag à la liste
      tags.value.push({
        libelleName: newTag.title,
        isSelected: false,
        color: newTag.color,
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
    { libelleName: "Important", isSelected: false, color: "#FF6B6B" },
    { libelleName: "Work", isSelected: false, color: "#4ECDC4" },
    { libelleName: "Personal", isSelected: false, color: "#45B7D1" },
    { libelleName: "Shopping", isSelected: false, color: "#FFA07A" },
    { libelleName: "Ideas", isSelected: false, color: "#98D8C8" },
    { libelleName: "Recipes", isSelected: false, color: "#F7DC6F" },
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
    { libelleName: "Important", isSelected: false, color: "#FF6B6B" },
    { libelleName: "Work", isSelected: false, color: "#4ECDC4" },
    { libelleName: "Personal", isSelected: false, color: "#45B7D1" },
    { libelleName: "Shopping", isSelected: false, color: "#FFA07A" },
    { libelleName: "Ideas", isSelected: false, color: "#98D8C8" },
    { libelleName: "Recipes", isSelected: false, color: "#F7DC6F" },
    { libelleName: "Travel", isSelected: false, color: "#BB8FCE" },
    { libelleName: "Health", isSelected: false, color: "#85C1E2" },
    { libelleName: "Finance", isSelected: false, color: "#F1948A" },
    { libelleName: "Projects", isSelected: false, color: "#82E0AA" },
  ],
};

