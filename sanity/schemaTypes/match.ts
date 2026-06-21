import { defineField, defineType } from "sanity";

export const matchType = defineType({
  name: "match",
  title: "Partite e risultati",
  type: "document",
  fields: [
    defineField({ name: "round", title: "Giornata / Turno", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "matchDate", title: "Data partita", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "kickoff", title: "Orario", type: "string" }),
    defineField({ name: "season", title: "Stagione", type: "reference", to: [{ type: "season" }], validation: (rule) => rule.required() }),
    defineField({ name: "competition", title: "Competizione", type: "reference", to: [{ type: "competition" }], validation: (rule) => rule.required() }),
    defineField({
      name: "phase",
      title: "Fase",
      type: "string",
      options: {
        list: [
          { title: "Girone C", value: "Girone C" },
          { title: "Poule Scudetto", value: "Poule Scudetto" }
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({ name: "home", title: "Squadra casa", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "away", title: "Squadra trasferta", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "venue", title: "Campo", type: "string" }),
    defineField({ name: "score", title: "Risultato", type: "string" }),
    defineField({
      name: "status",
      title: "Stato gara",
      type: "string",
      options: {
        list: [
          { title: "Giocata", value: "played" },
          { title: "Programmata", value: "scheduled" }
        ],
        layout: "radio"
      },
      initialValue: "played",
      validation: (rule) => rule.required()
    }),
    defineField({ name: "sourceUrl", title: "Fonte ufficiale", type: "url" }),
    defineField({ name: "matchReport", title: "Match report collegato", type: "reference", to: [{ type: "article" }] }),
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
    select: { home: "home", away: "away", date: "matchDate", score: "score" },
    prepare: ({ home, away, date, score }) => ({ title: `${home ?? ""} - ${away ?? ""}`, subtitle: `${date ?? ""}${score ? ` · ${score}` : ""}` })
  }
});
