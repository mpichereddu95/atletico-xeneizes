import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "atletico-xeneizes",
  title: "Atletico Xeneizes",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "pp933t0a",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
