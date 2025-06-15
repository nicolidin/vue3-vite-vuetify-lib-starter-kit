import MozaicArticles from "./MozaicArticles.vue";

export default {
  title: "Molecules/MozaicArticles",
  component: MozaicArticles,
  tags: ["autodocs"],
  argTypes: {
    articles: {
      control: "object",
    },
  },

  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MozaicArticles utilise Mozaic Layout en injectant ArticlePreview",
      },
    },
  },
};

const Template = (args) => ({
  components: { MozaicArticles },
  setup() {
    return { args };
  },
  template: '<MozaicArticles v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  articles: [
    {
      documentId: 1,
      slug: "article-1",
      contentMd: "This is a short text.",
    },
    {
      documentId: 2,
      slug: "article-2",
      contentMd: "This is a bit longer text that might take up two lines.",
    },
    {
      documentId: 3,
      slug: "article-3",
      contentMd:
        "Here is a medium-length text that could occupy around two to three lines.",
    },
    {
      documentId: 4,
      slug: "article-4",
      contentMd:
        "A relatively longer text that will likely span three or more lines.",
    },
    {
      documentId: 5,
      slug: "article-5",
      contentMd: "A short item.",
    },
    {
      documentId: 6,
      slug: "article-6",
      contentMd:
        "This item text is long enough to take up about four lines and provdocumentIde some visual diversity.",
    },
    {
      documentId: 7,
      slug: "article-7",
      contentMd: "Another short text.",
    },
    {
      documentId: 8,
      slug: "article-8",
      contentMd:
        "This is an example of text that is a bit longer and will look good as part of the grdocumentId.",
    },
    {
      documentId: 9,
      slug: "article-9",
      contentMd: "Short text.",
    },
    {
      documentId: 10,
      slug: "article-10",
      contentMd: "An item with a medium-length text string.",
    },
    {
      documentId: 11,
      slug: "article-11",
      contentMd:
        "A long text item that could take up multiple lines. It adds variety to the grdocumentId layout.",
    },
    {
      documentId: 12,
      slug: "article-12",
      contentMd: "A very short line.",
    },
    {
      documentId: 13,
      slug: "article-13",
      contentMd: "Medium-length item with text.",
    },
    {
      documentId: 14,
      slug: "article-14",
      contentMd:
        "This text is a bit more extended and will add variation in height.",
    },
    {
      documentId: 15,
      slug: "article-15",
      contentMd:
        "This is a much longer item. It contains several sentences that span across multiple lines. The goal is to create enough visual diversity in the layout so that we can see the effects of different sizes in the grdocumentId.",
    },
    {
      documentId: 17,
      slug: "article-17",
      contentMd:
        "Incorporating a long paragraph like this will help demonstrate how larger pieces of text affect the overall layout. The longer the contentMd, the more space it requires, impacting the design and making it a unique part of the grdocumentId arrangement.",
    },
    {
      documentId: 18,
      slug: "article-18",
      contentMd:
        "Another very long item that showcases a block of text with more descriptive contentMd. When included in the grdocumentId, this type of lengthy text helps balance shorter elements by adding contrast and breaking the rhythm of similarly sized components. It's essential to see how well these longer items integrate into the design without disrupting the flow.",
    },
    {
      documentId: 19,
      slug: "article-19",
      contentMd:
        "An additional medium-sized item. Medium-sized items are typically longer than short items but shorter than the very long entries, provdocumentIding a nice balance. This one has a descriptive sentence structure to add more context.",
    },
    {
      documentId: 20,
      slug: "article-20",
      contentMd:
        "Finally, an extended entry that includes several points and examples. This type of item is designed to fill more vertical space and create a compelling visual experience. These larger blocks of text simulate contentMd-rich items that might contain essential information, helping the grdocumentId look dynamic and engaging.",
    },
    {
      documentId: 21,
      slug: "article-21",
      contentMd:
        "Here’s one more item with extra contentMd and several documentIdeas that make it span multiple lines, blending well into a masonry layout without being too dominant. Long texts, when interspersed with shorter elements, help balance the design.",
    },
  ],
};
