import { defineField, defineType } from "sanity";

export const sponsorType = defineType({
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tier", title: "Livello", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Descrizione", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "href", title: "Link", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Testo alternativo", type: "string" })]
    }),
    defineField({ name: "active", title: "Attivo", type: "boolean", initialValue: true })
  ],
  preview: {
    select: { title: "name", subtitle: "tier", media: "logo" }
  }
});
