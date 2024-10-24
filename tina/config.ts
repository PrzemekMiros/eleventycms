import { defineConfig } from "tinacms";

// Branch, na którym operujemy, z GitHub
const branch = "main";  // Możesz ręcznie ustawić branch

export default defineConfig({
  branch,

  build: {
    outputFolder: "admin",  // Folder dla panelu administracyjnego TinaCMS
    publicFolder: "public",  // Folder publiczny Eleventy
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",  // Folder, gdzie trzymasz zasoby multimedialne
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",  // Ścieżka do postów
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
