import { defineField, defineType } from "sanity";

export const mediaItemType = defineType({
  name: "mediaItem",
  title: "Gallery / Media",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Foto", value: "Foto" },
          { title: "Video", value: "Video" }
        ],
        layout: "radio"
      },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "title", title: "Titolo", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "image",
      title: "Immagine",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Testo alternativo", type: "string" })]
    }),
    defineField({ name: "externalImageUrl", title: "URL immagine esterna", type: "url" }),
    defineField({ name: "videoUrl", title: "URL video", type: "url" }),
    defineField({ name: "publishedAt", title: "Data", type: "date" }),
    defineField({ name: "featured", title: "In evidenza", type: "boolean", initialValue: false })
  ],
  preview: {
    select: { title: "title", subtitle: "type", media: "image" }
  }
});
