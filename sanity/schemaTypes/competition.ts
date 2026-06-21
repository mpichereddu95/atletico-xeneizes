import { defineField, defineType } from "sanity";

export const competitionType = defineType({
  name: "competition",
  title: "Competizioni",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome competizione",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "season",
      title: "Stagione",
      type: "reference",
      to: [{ type: "season" }],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "phase",
      title: "Fase principale",
      type: "string",
      options: {
        list: [
          { title: "Girone C", value: "Girone C" },
          { title: "Poule Scudetto", value: "Poule Scudetto" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "sourceUrl",
      title: "Fonte ufficiale",
      type: "url"
    }),
    defineField({
      name: "sourceType",
      title: "Tipo dato",
      type: "string",
      options: {
        list: [
          { title: "Ufficiale", value: "official" },
          { title: "Storico", value: "historical" },
          { title: "Manuale club", value: "manual" }
        ]
      },
      initialValue: "official",
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: { title: "name", subtitle: "phase" }
  }
});
