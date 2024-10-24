import { defineConfig } from "tinacms";

const branch = "main";  // Ustaw na branch, którego używasz

export default defineConfig({
  branch,
  build: {
    outputFolder: "admin",  // Folder, gdzie będzie generowany panel TinaCMS
    publicFolder: "public",  // Folder publiczny Eleventy
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",
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
