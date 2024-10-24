import { defineConfig } from "tinacms";

const branch = "main";  // Możesz ustawić branch na swój główny branch

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
  // Konfiguracja lokalna dla Git
  local: {
    plugins: [
      {
        type: "git",
        branch: "main",
        gitRemote: "origin",
        baseDir: "",  // Główna ścieżka do repozytorium
      },
    ],
  },
});
