export type PlayerStatValue = number | null;

export type Player = {
  id: string;
  name: string;
  number: number | null;
  role: "Portiere" | "Difensore" | "Centrocampista" | "Attaccante";
  birthLabel: string;
  photo: {
    src: string;
    alt: string;
  };
  bio: string;
  sourceUrl: string;
  stats: {
    appearances: number;
    goals: number;
    assists: PlayerStatValue;
    yellowCards: number;
    redCards: number;
    ownGoals: number;
    bestPlayerAwards: PlayerStatValue;
    bestGoalkeeperAwards: PlayerStatValue;
  };
};

export type Match = {
  id: string;
  season: string;
  competition: string;
  phase: "Girone C" | "Poule Scudetto";
  round: string;
  date: string;
  kickoff: string;
  home: string;
  away: string;
  venue: string;
  score?: string;
  status: "played" | "scheduled";
  sourceUrl?: string;
};

export type Standing = {
  position: number;
  season: string;
  competition: string;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  difference: number;
};

export type Article = {
  id: string;
  slug: string;
  category: "News" | "Comunicato" | "Match report";
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage: {
    src: string;
    alt: string;
  };
  content: ArticleContentBlock[];
};

export type ArticleContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    };

export type CmsArticleRecord = {
  sys: {
    id: string;
    slug: string;
    publishedAt: string;
  };
  fields: {
    category: Article["category"];
    title: string;
    excerpt: string;
    author: string;
    coverImage: {
      src: string;
      alt: string;
    };
    content: ArticleContentBlock[];
  };
};

export type MediaItem = {
  id: string;
  type: "Foto" | "Video";
  title: string;
  image: string;
  alt: string;
};

export type StaffMember = {
  name: string;
  role: string;
  bio: string;
};

export type Sponsor = {
  name: string;
  tier: string;
  description: string;
  href: string | null;
};
