import { defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "News e Match report",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "News", value: "News" },
          { title: "Comunicato", value: "Comunicato" },
          { title: "Match report", value: "Match report" }
        ],
        layout: "radio"
      },
      initialValue: "News",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "status",
      title: "Stato",
      type: "string",
      options: {
        list: [
          { title: "Bozza", value: "draft" },
          { title: "Pubblicato", value: "published" }
        ],
        layout: "radio"
      },
      initialValue: "draft",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Sommario",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "publishedAt",
      title: "Data pubblicazione",
      type: "datetime",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "author",
      title: "Autore",
      type: "string",
      initialValue: "Atletico Xeneizes",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "coverImage",
      title: "Immagine copertina",
      type: "image",
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          type: "string",
          validation: (rule) => rule.required()
        })
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "relatedMatch",
      title: "Partita collegata",
      type: "reference",
      to: [{ type: "match" }],
      hidden: ({ document }) => document?.category !== "Match report"
    }),
    defineField({
      name: "contentBlocks",
      title: "Contenuto articolo",
      type: "array",
      of: [
        {
          name: "headingBlock",
          title: "Titolo sezione",
          type: "object",
          fields: [
            defineField({
              name: "type",
              type: "string",
              initialValue: "heading",
              hidden: true
            }),
            defineField({
              name: "text",
              title: "Testo",
              type: "string",
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({ title, subtitle: "Titolo sezione" })
          }
        },
        {
          name: "paragraphBlock",
          title: "Paragrafo",
          type: "object",
          fields: [
            defineField({
              name: "type",
              type: "string",
              initialValue: "paragraph",
              hidden: true
            }),
            defineField({
              name: "text",
              title: "Testo",
              type: "text",
              rows: 5,
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({ title, subtitle: "Paragrafo" })
          }
        }
      ],
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "sourceType",
      title: "Tipo contenuto",
      type: "string",
      options: {
        list: [
          { title: "Ufficiale", value: "official" },
          { title: "Storico", value: "historical" },
          { title: "Manuale club", value: "manual" }
        ]
      },
      initialValue: "manual",
      validation: (rule) => rule.required()
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage"
    }
  }
});
