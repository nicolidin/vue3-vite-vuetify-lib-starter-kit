import Layout from "./Layout.vue";

export default {
  title: "Organisms/Layout",
  component: Layout,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Layout principal avec barre d'app et slot de contenu. Permet de changer le thème.",
      },
    },
  },
};

const Template = (args) => ({
  components: { Layout },
  setup() {
    return { args };
  },
  template: `
    <Layout v-bind="args">
      <template #default>
        <div style="padding: 2rem; text-align: center;">
          <h2>Contenu dans le slot du layout</h2>
          <p>Vous pouvez insérer ici n'importe quel composant ou texte pour tester le layout.</p>
        </div>
      </template>
    </Layout>
  `,
});

export const Default = Template.bind({});
Default.args = {};
