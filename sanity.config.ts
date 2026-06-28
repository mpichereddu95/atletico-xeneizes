import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

export default defineConfig({
  name: "atletico-xeneizes",
  title: "Atletico Xeneizes",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "pp933t0a",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes
  }
});
