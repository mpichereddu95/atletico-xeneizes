import { defineField, defineType } from "sanity";

export const seasonType = defineType({
  name: "season",
  title: "Stagioni",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome stagione",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "startYear",
      title: "Anno inizio",
      type: "number",
      validation: (rule) => rule.required().integer()
    }),
    defineField({
      name: "endYear",
      title: "Anno fine",
      type: "number",
      validation: (rule) => rule.required().integer()
    }),
    defineField({
      name: "status",
      title: "Stato",
      type: "string",
      options: {
        list: [
          { title: "Attiva", value: "active" },
          { title: "Storica", value: "archived" }
        ],
        layout: "radio"
      },
      initialValue: "active",
      validation: (rule) => rule.required()
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
    select: { title: "name", subtitle: "status" }
  }
});
