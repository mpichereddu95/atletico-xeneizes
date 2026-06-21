import { articleType } from "@/sanity/schemaTypes/article";
import { competitionType } from "@/sanity/schemaTypes/competition";
import { matchType } from "@/sanity/schemaTypes/match";
import { mediaItemType } from "@/sanity/schemaTypes/mediaItem";
import { playerType } from "@/sanity/schemaTypes/player";
import { seasonType } from "@/sanity/schemaTypes/season";
import { sponsorType } from "@/sanity/schemaTypes/sponsor";
import { standingType } from "@/sanity/schemaTypes/standing";
import { teamType } from "@/sanity/schemaTypes/team";

export const schemaTypes = [
  articleType,
  seasonType,
  competitionType,
  teamType,
  playerType,
  matchType,
  standingType,
  sponsorType,
  mediaItemType
];
