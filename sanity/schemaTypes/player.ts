import { defineField, defineType } from "sanity";

export const playerType = defineType({
  name: "player",
  title: "Giocatori",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome completo", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "number", title: "Numero maglia", type: "number" }),
    defineField({
      name: "role",
      title: "Ruolo",
      type: "string",
      options: {
        list: [
          { title: "Portiere", value: "Portiere" },
          { title: "Difensore", value: "Difensore" },
          { title: "Centrocampista", value: "Centrocampista" },
          { title: "Attaccante", value: "Attaccante" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "birthLabel", title: "Data di nascita", type: "string" }),
    defineField({
      name: "photo",
      title: "Foto giocatore",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Testo alternativo", type: "string" })]
    }),
    defineField({ name: "externalPhotoUrl", title: "URL foto esterna", type: "url" }),
    defineField({ name: "bio", title: "Biografia", type: "text", rows: 5, validation: (rule) => rule.required() }),
    defineField({ name: "sourceUrl", title: "Fonte ufficiale", type: "url" }),
    defineField({ name: "season", title: "Stagione", type: "reference", to: [{ type: "season" }] }),
    defineField({ name: "appearances", title: "Presenze", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "goals", title: "Gol", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "assists", title: "Assist", type: "number", validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "yellowCards", title: "Ammonizioni", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "redCards", title: "Espulsioni", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "ownGoals", title: "Autogol", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "bestPlayerAwards", title: "Migliore in campo", type: "number", validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "bestGoalkeeperAwards", title: "Miglior portiere", type: "number", validation: (rule) => rule.integer().min(0) }),
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
    select: { title: "name", subtitle: "role", media: "photo" }
  }
});
