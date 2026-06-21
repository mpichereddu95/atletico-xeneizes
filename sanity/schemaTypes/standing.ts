import { defineField, defineType } from "sanity";

export const standingType = defineType({
  name: "standing",
  title: "Classifiche",
  type: "document",
  fields: [
    defineField({ name: "season", title: "Stagione", type: "reference", to: [{ type: "season" }], validation: (rule) => rule.required() }),
    defineField({ name: "competition", title: "Competizione", type: "reference", to: [{ type: "competition" }], validation: (rule) => rule.required() }),
    defineField({ name: "position", title: "Posizione", type: "number", validation: (rule) => rule.required().integer().min(1) }),
    defineField({ name: "team", title: "Squadra", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "played", title: "Partite", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "wins", title: "Vittorie", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "draws", title: "Pareggi", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "losses", title: "Sconfitte", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "goalsFor", title: "Goal fatti", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "goalsAgainst", title: "Goal subiti", type: "number", initialValue: 0, validation: (rule) => rule.integer().min(0) }),
    defineField({ name: "points", title: "Punti", type: "number", initialValue: 0, validation: (rule) => rule.integer() }),
    defineField({ name: "difference", title: "Differenza reti", type: "number", initialValue: 0, validation: (rule) => rule.integer() }),
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
    select: { title: "team", position: "position", points: "points" },
    prepare: ({ title, position, points }) => ({ title, subtitle: `${position ?? "-"}° · ${points ?? 0} pt` })
  }
});
