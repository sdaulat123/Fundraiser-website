import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "replace_me";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "LifeResource4you Studio",
  basePath: "/admin",
  projectId,
  dataset,
  auth: {
    providers: [
      {
        name: "sanity",
        title: "Email / Password",
        url: "https://api.sanity.io/v1/auth/login/sanity",
      },
    ],
  },
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
