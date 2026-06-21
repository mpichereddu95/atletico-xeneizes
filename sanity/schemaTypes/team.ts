import { defineField, defineType } from "sanity";

export const teamType = defineType({
  name: "team",
  title: "Squadre",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome squadra",
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
      name: "isClub",
      title: "Atletico Xeneizes",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          type: "string"
        })
      ]
    })
  ],
  preview: {
    select: { title: "name", media: "logo" }
  }
});
