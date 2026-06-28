import type { StructureResolver } from "sanity/structure";

const hiddenDocumentTypes = new Set([
  "article",
  "season",
  "competition",
  "team",
  "player",
  "match",
  "standing",
  "sponsor",
  "mediaItem"
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Atletico Xeneizes")
    .items([
      S.listItem()
        .title("Avvio rapido")
        .child(
          S.list()
            .title("Avvio rapido")
            .items([
              S.listItem()
                .title("Articoli da pubblicare")
                .child(
                  S.documentList()
                    .title("Articoli da pubblicare")
                    .filter('_type == "article" && status != "published"')
                    .defaultOrdering([{ field: "_updatedAt", direction: "desc" }])
                ),
              S.listItem()
                .title("Prossima partita")
                .child(
                  S.documentList()
                    .title("Prossima partita")
                    .filter('_type == "match" && status == "scheduled"')
                    .defaultOrdering([{ field: "matchDate", direction: "asc" }])
                ),
              S.listItem()
                .title("Rosa attuale")
                .child(
                  S.documentList()
                    .title("Rosa attuale")
                    .filter('_type == "player" && coalesce(currentRoster, true) == true')
                    .defaultOrdering([
                      { field: "role", direction: "asc" },
                      { field: "name", direction: "asc" }
                    ])
                ),
              S.listItem()
                .title("Sponsor attivi")
                .child(
                  S.documentList()
                    .title("Sponsor attivi")
                    .filter('_type == "sponsor" && active == true')
                    .defaultOrdering([{ field: "name", direction: "asc" }])
                )
            ])
        ),

      S.divider(),

      S.listItem()
        .title("News")
        .child(
          S.documentList()
            .title("News")
            .filter('_type == "article" && category != "Match report"')
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Match report")
        .child(
          S.documentList()
            .title("Match report")
            .filter('_type == "article" && category == "Match report"')
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Rosa attuale")
        .child(
          S.documentList()
            .title("Rosa attuale")
            .filter('_type == "player" && coalesce(currentRoster, true) == true')
            .defaultOrdering([
              { field: "role", direction: "asc" },
              { field: "name", direction: "asc" }
            ])
        ),
      S.listItem()
        .title("Archivio giocatori")
        .child(
          S.documentList()
            .title("Archivio giocatori")
            .filter('_type == "player" && (currentRoster == false || sourceType == "historical")')
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),
      S.listItem()
        .title("Partite programmate")
        .child(
          S.documentList()
            .title("Partite programmate")
            .filter('_type == "match" && status == "scheduled"')
            .defaultOrdering([{ field: "matchDate", direction: "asc" }])
        ),
      S.listItem()
        .title("Risultati")
        .child(
          S.documentList()
            .title("Risultati")
            .filter('_type == "match" && status == "played"')
            .defaultOrdering([{ field: "matchDate", direction: "desc" }])
        ),
      S.documentTypeListItem("standing").title("Classifiche"),
      S.documentTypeListItem("sponsor").title("Sponsor"),
      S.documentTypeListItem("mediaItem").title("Gallery / Media"),

      S.divider(),

      S.listItem()
        .title("Stagioni e competizioni")
        .child(
          S.list()
            .title("Stagioni e competizioni")
            .items([
              S.documentTypeListItem("season").title("Stagioni"),
              S.documentTypeListItem("competition").title("Competizioni"),
              S.documentTypeListItem("team").title("Squadre")
            ])
        ),
      S.listItem()
        .title("Tutti i contenuti")
        .child(
          S.list()
            .title("Tutti i contenuti")
            .items(
              S.documentTypeListItems().filter((item) => {
                const id = item.getId();
                return !id || !hiddenDocumentTypes.has(id);
              })
            )
        )
    ]);
