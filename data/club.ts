import type {
  Article,
  CmsArticleRecord,
  Match,
  MediaItem,
  Player,
  SeasonSummary,
  Sponsor,
  StaffMember,
  Standing
} from "@/lib/types";

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Rosa", href: "/rosa" },
  { label: "Partite", href: "/partite" },
  { label: "News", href: "/news" },
  { label: "Media", href: "/media" },
  { label: "Staff", href: "/staff" },
  { label: "Sponsor", href: "/sponsor" }
];

export const clubSources = {
  info: "https://www.calcioliguria.com/campionati/Info/2025-Coppa-Cobram-Girone-C/ATLETICO-XENEIZES-149.html",
  squad: "https://www.calcioliguria.com/campionati/Squadre/2025-Coppa-Cobram-Girone-C/atletico-xeneizes-149.html",
  calendar: "https://www.calcioliguria.com/campionati/Calendario/2025-Coppa-Cobram-Girone-C/ATLETICO-XENEIZES-149.html",
  progression: "https://www.calcioliguria.com/campionati/Andamento/2025-Coppa-Cobram-Girone-C/ATLETICO-XENEIZES-149.html",
  standings: "https://www.calcioliguria.com/campionati.html?p=1153&func=showResultsRank",
  poule: "https://www.calcioliguria.com/campionati.html?p=1187&func=showResults"
};

const season = "2025/26";
export const currentSeasonLabel = "2026/27";
export const archiveSeasonLabel = season;
const groupCompetition = "Coppa Cobram - Girone C";
const pouleCompetition = "Coppa Cobram - Poule Scudetto";
const fallbackAssists = null;

export const seasonSummaries: SeasonSummary[] = [
  {
    id: "current-season",
    label: "Stagione attuale",
    title: currentSeasonLabel,
    status: "current",
    description: "Calendario ufficiale in aggiornamento. La nuova stagione verra pubblicata appena saranno disponibili i dati ufficiali.",
    href: "/partite",
    hasOfficialData: false
  },
  {
    id: "archive-2025-26",
    label: "Archivio storico",
    title: archiveSeasonLabel,
    status: "archive",
    description: "Risultati, classifica, rosa e statistiche della stagione 2025/26 restano consultabili come memoria sportiva del club.",
    href: "/stagioni",
    hasOfficialData: true
  },
  {
    id: "world-cup-estate-2026",
    label: "Archivio estivo",
    title: "World Cup / Estate 2026",
    status: "archive",
    description: "Archivio estivo concluso. Risultati, contenuti e materiali ufficiali saranno pubblicati quando confermati dal club.",
    href: "/stagioni",
    hasOfficialData: false
  }
];

export const matches: Match[] = [
  {
    id: "gc-01",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "1",
    date: "2025-10-22",
    kickoff: "21:00",
    home: "ATLETICO XENEIZES 149",
    away: "DE WAVE GROUP",
    venue: "Via dell Acciaio",
    score: "2-2",
    status: "played"
  },
  {
    id: "gc-02",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "2",
    date: "2025-10-29",
    kickoff: "20:00",
    home: "ATLETICO C.S.N.I. 2025",
    away: "ATLETICO XENEIZES 149",
    venue: "Pegli Via Ungaretti",
    score: "2-8",
    status: "played"
  },
  {
    id: "gc-03",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "3",
    date: "2025-11-12",
    kickoff: "21:00",
    home: "ATLETICO XENEIZES 149",
    away: "ERZE TEAM",
    venue: "Via dell Acciaio",
    score: "2-1",
    status: "played"
  },
  {
    id: "gc-05",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "5",
    date: "2025-11-26",
    kickoff: "21:00",
    home: "ATLETICO XENEIZES 149",
    away: "MAPIGE FC",
    venue: "Via dell Acciaio",
    score: "2-5",
    status: "played"
  },
  {
    id: "gc-06",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "6",
    date: "2025-12-03",
    kickoff: "20:00",
    home: "LA MASIA",
    away: "ATLETICO XENEIZES 149",
    venue: "Pegli Rio San Michele",
    score: "4-2",
    status: "played"
  },
  {
    id: "gc-07",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "7",
    date: "2025-12-17",
    kickoff: "21:00",
    home: "ATLETICO XENEIZES 149",
    away: "REAL SIRACUSA",
    venue: "Via dell Acciaio",
    score: "6-3",
    status: "played"
  },
  {
    id: "gc-08",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "8",
    date: "2026-01-07",
    kickoff: "21:00",
    home: "PRO SECCO FC",
    away: "ATLETICO XENEIZES 149",
    venue: "Pegli Via Ungaretti",
    score: "3-5",
    status: "played"
  },
  {
    id: "gc-04",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "4",
    date: "2026-01-14",
    kickoff: "20:00",
    home: "BAXAICO",
    away: "ATLETICO XENEIZES 149",
    venue: "Pegli Via Ungaretti",
    score: "3-6",
    status: "played"
  },
  {
    id: "gc-09",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "9",
    date: "2026-01-21",
    kickoff: "21:00",
    home: "ATLETICO XENEIZES 149",
    away: "LA PINTA DINAMO ALFI AMATEUR",
    venue: "Via dell Acciaio",
    score: "3-3",
    status: "played"
  },
  {
    id: "gc-10",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "10",
    date: "2026-01-28",
    kickoff: "20:00",
    home: "DE WAVE GROUP",
    away: "ATLETICO XENEIZES 149",
    venue: "Coronata Blu",
    score: "1-1",
    status: "played"
  },
  {
    id: "gc-11",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "11",
    date: "2026-02-04",
    kickoff: "21:00",
    home: "ATLETICO XENEIZES 149",
    away: "ATLETICO C.S.N.I. 2025",
    venue: "Via dell Acciaio",
    score: "1-3",
    status: "played"
  },
  {
    id: "gc-12",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "12",
    date: "2026-02-18",
    kickoff: "21:00",
    home: "ERZE TEAM",
    away: "ATLETICO XENEIZES 149",
    venue: "Via dell Acciaio",
    score: "2-2",
    status: "played"
  },
  {
    id: "gc-13",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "13",
    date: "2026-02-25",
    kickoff: "21:00",
    home: "ATLETICO XENEIZES 149",
    away: "BAXAICO",
    venue: "Via dell Acciaio",
    score: "7-1",
    status: "played"
  },
  {
    id: "gc-14",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "14",
    date: "2026-03-04",
    kickoff: "21:00",
    home: "MAPIGE FC",
    away: "ATLETICO XENEIZES 149",
    venue: "Pegli Via Ungaretti",
    score: "3-6",
    status: "played"
  },
  {
    id: "gc-15",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "15",
    date: "2026-03-18",
    kickoff: "21:00",
    home: "ATLETICO XENEIZES 149",
    away: "LA MASIA",
    venue: "Via dell Acciaio",
    score: "4-3",
    status: "played"
  },
  {
    id: "gc-16",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "16",
    date: "2026-03-25",
    kickoff: "20:00",
    home: "REAL SIRACUSA",
    away: "ATLETICO XENEIZES 149",
    venue: "Coronata Blu",
    score: "2-6",
    status: "played"
  },
  {
    id: "gc-17",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "17",
    date: "2026-04-01",
    kickoff: "21:00",
    home: "ATLETICO XENEIZES 149",
    away: "PRO SECCO FC",
    venue: "Via dell Acciaio",
    score: "3-6",
    status: "played"
  },
  {
    id: "gc-18",
    season,
    competition: groupCompetition,
    phase: "Girone C",
    round: "18",
    date: "2026-04-15",
    kickoff: "22:00",
    home: "LA PINTA DINAMO ALFI AMATEUR",
    away: "ATLETICO XENEIZES 149",
    venue: "Granarolo",
    score: "0-4",
    status: "played"
  },
  {
    id: "ps-01",
    season,
    competition: pouleCompetition,
    phase: "Poule Scudetto",
    round: "1",
    date: "2026-04-21",
    kickoff: "22:00",
    home: "ATLETICO XENEIZES 149",
    away: "UC FELPONI",
    venue: "Coronata Blu",
    score: "4-1",
    status: "played"
  },
  {
    id: "ps-02",
    season,
    competition: pouleCompetition,
    phase: "Poule Scudetto",
    round: "2",
    date: "2026-04-28",
    kickoff: "22:00",
    home: "ESTUDIANTES SC 2011",
    away: "ATLETICO XENEIZES 149",
    venue: "Via dell Acciaio",
    score: "3-2",
    status: "played"
  }
];

export const latestResult = matches[matches.length - 1];
export const nextMatch = null;

const playerPhoto = (path: string) => `https://www.calcioliguria.com${path.startsWith("/") ? path : `/${path}`}`;

export const players: Player[] = [
  {
    id: "federico-cantoro",
    name: "Federico Cantoro",
    number: null,
    role: "Centrocampista",
    birthLabel: "18/07/1995",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/cantoro.JPG"),
      alt: "Federico Cantoro"
    },
    bio: "Centrocampista classe 1995. Nel Girone C 2025/26 ha chiuso con 17 presenze, 16 gol e 4 ammonizioni. Il profilo e riclassificato qui tra i centrocampisti su indicazione del club.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/3007-federico-cantoro.html",
    stats: {
      appearances: 17,
      goals: 16,
      assists: fallbackAssists,
      yellowCards: 4,
      redCards: 0,
      ownGoals: 0,
      bestPlayerAwards: 4,
      bestGoalkeeperAwards: null
    }
  },
  {
    id: "lorenzo-grimaud",
    name: "Lorenzo Grimaud",
    number: null,
    role: "Portiere",
    birthLabel: "19/07/1994",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/GRIMAUD_20191003155633_20230926151245.jpg"),
      alt: "Lorenzo Grimaud"
    },
    bio: "Portiere classe 1994. Nel Girone C 2025/26 ha disputato 9 partite, segnato 1 gol e raccolto un riconoscimento come miglior portiere.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/9084-lorenzo-grimaud.html",
    stats: {
      appearances: 9,
      goals: 1,
      assists: fallbackAssists,
      yellowCards: 0,
      redCards: 0,
      ownGoals: 0,
      bestPlayerAwards: 0,
      bestGoalkeeperAwards: 1
    }
  },
  {
    id: "stefano-montiel-noguera",
    name: "Stefano Montiel Noguera",
    number: null,
    role: "Portiere",
    seasons: [archiveSeasonLabel],
    currentRoster: false,
    birthLabel: "16/06/1993",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/MONTIELSTEFANO.JPG"),
      alt: "Stefano Montiel Noguera"
    },
    bio: "Portiere classe 1993. Ha totalizzato 16 presenze, 1 ammonizione e 1 espulsione. In stagione ha ottenuto 12 riconoscimenti come miglior portiere.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/8382-stefano-montiel-noguera.html",
    stats: {
      appearances: 16,
      goals: 0,
      assists: fallbackAssists,
      yellowCards: 1,
      redCards: 1,
      ownGoals: 0,
      bestPlayerAwards: 0,
      bestGoalkeeperAwards: 12
    }
  },
  {
    id: "daniele-velardo",
    name: "Daniele Velardo",
    number: null,
    role: "Difensore",
    birthLabel: "21/10/1994",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/velard_20230926153442.jpg"),
      alt: "Daniele Velardo"
    },
    bio: "Difensore classe 1994. Nel Girone C ha collezionato 15 presenze, 2 ammonizioni e 1 autorete.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/7595-daniele-velardo.html",
    stats: {
      appearances: 15,
      goals: 0,
      assists: fallbackAssists,
      yellowCards: 2,
      redCards: 0,
      ownGoals: 1,
      bestPlayerAwards: 0,
      bestGoalkeeperAwards: null
    }
  },
  {
    id: "davide-gallone",
    name: "Davide Gallone",
    number: null,
    role: "Difensore",
    birthLabel: "19/09/1995",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/gallone_davide_20230905110152.jpg"),
      alt: "Davide Gallone"
    },
    bio: "Difensore classe 1995. Ha chiuso il Girone C con 15 presenze, 1 gol e 1 ammonizione. Sul sito Calcio Liguria era elencato tra i centrocampisti, ma qui e stato spostato nei difensori su indicazione del club.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/4924-davide-gallone.html",
    stats: {
      appearances: 15,
      goals: 1,
      assists: fallbackAssists,
      yellowCards: 1,
      redCards: 0,
      ownGoals: 0,
      bestPlayerAwards: 0,
      bestGoalkeeperAwards: null
    }
  },
  {
    id: "riccardo-nucera",
    name: "Riccardo Nucera",
    number: null,
    role: "Difensore",
    birthLabel: "15/12/1995",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/NUCERARICC.JPG"),
      alt: "Riccardo Nucera"
    },
    bio: "Difensore classe 1995. Nel Girone C ha totalizzato 14 presenze, 10 gol, 5 ammonizioni e 2 premi come migliore in campo. Sul sito Calcio Liguria compariva tra gli attaccanti, ma qui e riclassificato in difesa su indicazione del club.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/3915-riccardo-nucera.html",
    stats: {
      appearances: 14,
      goals: 10,
      assists: fallbackAssists,
      yellowCards: 5,
      redCards: 0,
      ownGoals: 0,
      bestPlayerAwards: 2,
      bestGoalkeeperAwards: null
    }
  },
  {
    id: "davide-alfano",
    name: "Davide Alfano",
    number: null,
    role: "Centrocampista",
    birthLabel: "18/04/1994",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/ALFANODAVI.JPG"),
      alt: "Davide Alfano"
    },
    bio: "Centrocampista classe 1994. Nel Girone C 2025/26 ha raccolto 9 presenze, 2 gol e 1 ammonizione.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/4444-davide-alfano.html",
    stats: {
      appearances: 9,
      goals: 2,
      assists: fallbackAssists,
      yellowCards: 1,
      redCards: 0,
      ownGoals: 0,
      bestPlayerAwards: 0,
      bestGoalkeeperAwards: null
    }
  },
  {
    id: "andrea-costanzo",
    name: "Andrea Costanzo",
    number: null,
    role: "Centrocampista",
    birthLabel: "06/10/1995",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/ANDREACOSTANZO.JPG"),
      alt: "Andrea Costanzo"
    },
    bio: "Centrocampista classe 1995. Ha giocato 18 partite nel Girone C, firmando 3 gol e 1 ammonizione. Nel sito del club questa anagrafica convive con il ruolo attuale di presidente.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/846-andrea--costanzo.html",
    stats: {
      appearances: 18,
      goals: 3,
      assists: fallbackAssists,
      yellowCards: 1,
      redCards: 0,
      ownGoals: 0,
      bestPlayerAwards: 0,
      bestGoalkeeperAwards: null
    }
  },
  {
    id: "mattia-galasso",
    name: "Mattia Galasso",
    number: null,
    role: "Centrocampista",
    birthLabel: "05/01/1993",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/GALASSOMATTIA.JPG"),
      alt: "Mattia Galasso"
    },
    bio: "Centrocampista classe 1993. Nel Girone C ha giocato 18 partite, segnato 4 gol e registrato 1 autorete.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/6034-mattia-galasso.html",
    stats: {
      appearances: 18,
      goals: 4,
      assists: fallbackAssists,
      yellowCards: 0,
      redCards: 0,
      ownGoals: 1,
      bestPlayerAwards: 0,
      bestGoalkeeperAwards: null
    }
  },
  {
    id: "salvatore-salleo-puntillo",
    name: "Salvatore Salleo Puntillo",
    number: null,
    role: "Centrocampista",
    birthLabel: "12/05/1994",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/salleo_salvatore_20200914190159.jpg"),
      alt: "Salvatore Salleo Puntillo"
    },
    bio: "Centrocampista classe 1994 e capitano del club. Nel Girone C ha chiuso con 16 presenze, 8 gol e 6 ammonizioni.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/7364-salvatore-salleo-puntillo.html",
    stats: {
      appearances: 16,
      goals: 8,
      assists: fallbackAssists,
      yellowCards: 6,
      redCards: 0,
      ownGoals: 0,
      bestPlayerAwards: 0,
      bestGoalkeeperAwards: null
    }
  },
  {
    id: "costantino-salleo-puntillo",
    name: "Costantino Salleo Puntillo",
    number: null,
    role: "Centrocampista",
    birthLabel: "31/01/2006",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/SALLEOCOSTANTINO.jpeg"),
      alt: "Costantino Salleo Puntillo"
    },
    bio: "Centrocampista classe 2006. Nella stagione di Girone C ha messo insieme 8 presenze, 2 gol e 1 ammonizione.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/13336-costantino-salleo-puntillo.html",
    stats: {
      appearances: 8,
      goals: 2,
      assists: fallbackAssists,
      yellowCards: 1,
      redCards: 0,
      ownGoals: 0,
      bestPlayerAwards: 0,
      bestGoalkeeperAwards: null
    }
  },
  {
    id: "senad-hrustic",
    name: "Senad Hrustic",
    number: null,
    role: "Attaccante",
    seasons: [archiveSeasonLabel],
    currentRoster: false,
    birthLabel: "14/04/1995",
    photo: {
      src: playerPhoto("/images/joomleague/giocatori/senad.JPG"),
      alt: "Senad Hrustic"
    },
    bio: "Attaccante classe 1995. E il miglior marcatore della rosa di Girone C con 20 gol in 18 presenze, piu 1 ammonizione e 1 premio come migliore in campo.",
    sourceUrl: "https://www.calcioliguria.com/campionati/Giocatore/2025-Coppa-Cobram-Girone-C/4899-senad-hrustic.html",
    stats: {
      appearances: 18,
      goals: 20,
      assists: fallbackAssists,
      yellowCards: 1,
      redCards: 0,
      ownGoals: 0,
      bestPlayerAwards: 1,
      bestGoalkeeperAwards: null
    }
  }
];

export const standings: Standing[] = [
  { position: 1, season, competition: groupCompetition, team: "LA MASIA", points: 43, played: 18, wins: 14, draws: 1, losses: 3, goalsFor: 119, goalsAgainst: 48, difference: 71 },
  { position: 2, season, competition: groupCompetition, team: "DE WAVE GROUP", points: 38, played: 18, wins: 11, draws: 5, losses: 2, goalsFor: 74, goalsAgainst: 41, difference: 33 },
  { position: 3, season, competition: groupCompetition, team: "ATLETICO XENEIZES 149", points: 34, played: 18, wins: 10, draws: 4, losses: 4, goalsFor: 70, goalsAgainst: 47, difference: 23 },
  { position: 4, season, competition: groupCompetition, team: "LA PINTA DINAMO ALFI AMATEUR", points: 31, played: 18, wins: 9, draws: 4, losses: 5, goalsFor: 83, goalsAgainst: 54, difference: 29 },
  { position: 5, season, competition: groupCompetition, team: "ERZE TEAM", points: 28, played: 18, wins: 9, draws: 1, losses: 8, goalsFor: 85, goalsAgainst: 58, difference: 27 },
  { position: 6, season, competition: groupCompetition, team: "PRO SECCO FC", points: 26, played: 18, wins: 8, draws: 2, losses: 8, goalsFor: 71, goalsAgainst: 64, difference: 7 },
  { position: 7, season, competition: groupCompetition, team: "ATLETICO C.S.N.I. 2025", points: 22, played: 18, wins: 6, draws: 4, losses: 8, goalsFor: 54, goalsAgainst: 86, difference: -32 },
  { position: 8, season, competition: groupCompetition, team: "MAPIGE FC", points: 18, played: 18, wins: 5, draws: 3, losses: 10, goalsFor: 59, goalsAgainst: 93, difference: -34 },
  { position: 9, season, competition: groupCompetition, team: "REAL SIRACUSA", points: 17, played: 18, wins: 5, draws: 2, losses: 11, goalsFor: 56, goalsAgainst: 100, difference: -44 },
  { position: 10, season, competition: groupCompetition, team: "BAXAICO", points: 0, played: 18, wins: 0, draws: 0, losses: 18, goalsFor: 29, goalsAgainst: 109, difference: -80 }
];

export const staff: StaffMember[] = [
  {
    name: "Andrea Costanzo",
    role: "Presidente",
    bio: "Presidente del club. Questo ruolo e stato aggiornato manualmente rispetto alla scheda pubblica di Calcio Liguria."
  },
  {
    name: "Matteo Pichereddu",
    role: "Allenatore",
    bio: "Allenatore della prima squadra. Anche questa voce e stata aggiornata secondo le indicazioni del club."
  },
  {
    name: "Salvatore Salleo Puntillo",
    role: "Capitano",
    bio: "Capitano dell'Atletico Xeneizes per la stagione 2025/26."
  },
  {
    name: "Matteo Margorani",
    role: "Dirigente",
    bio: "Dirigente presente nella rosa ufficiale pubblicata da Calcio Liguria. Andrea Rao e stato rimosso da questa sezione su indicazione del club."
  }
];

export const sponsors: Sponsor[] = [
  {
    name: "Wonderland Hair",
    tier: "Main Sponsor",
    description: "Wonderland Hair sostiene Atletico Xeneizes 149 come main sponsor, accompagnando il progetto sportivo e l'identita del gruppo dentro e fuori dal campo.",
    href: "https://www.wonderlandhair.it",
    instagramHref: "https://www.instagram.com/wonderland_hair_genova",
    services: ["Hair styling", "Cura immagine", "Consulenza look"]
  }
];

export const officialChannels = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/atletico_xeneizes.149",
    value: "@atletico_xeneizes.149"
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@AtleticoXeneizes149",
    value: "@AtleticoXeneizes149"
  }
] as const;

export const projectStatement =
  "Atletico Xeneizes 149 e un progetto sportivo costruito attorno a identita, appartenenza e cultura del gruppo.";

export const mediaItems: MediaItem[] = [
  {
    id: "media-team-2026",
    type: "Foto",
    title: "Foto ufficiale della squadra",
    image: "/images/club/atletico-xeneizes-team.jpg",
    alt: "Atletico Xeneizes in posa sul campo"
  },
  {
    id: "media-logo",
    type: "Foto",
    title: "Logo Atletico Xeneizes",
    image: "/images/club/atletico-xeneizes-logo-transparent.png",
    alt: "Logo Atletico Xeneizes nero e oro"
  },
  {
    id: "media-club-page",
    type: "Foto",
    title: "Immagine club pubblicata su Calcio Liguria",
    image: "https://www.calcioliguria.com/images/joomleague/clubs/XEN149_20251020004722.jpg",
    alt: "Foto club Atletico Xeneizes pubblicata su Calcio Liguria"
  }
];

export const cmsArticles: CmsArticleRecord[] = [
  {
    sys: {
      id: "news-01",
      slug: "girone-c-2025-26-terzo-posto-e-poule-scudetto",
      publishedAt: "2026-04-16"
    },
    fields: {
      category: "Match report",
      title: "Girone C 2025/26: terzo posto e accesso alla Poule Scudetto",
      excerpt: "L'Atletico Xeneizes chiude il Girone C al terzo posto con 34 punti, 70 gol fatti e qualificazione alla fase finale.",
      author: "Redazione Atletico Xeneizes",
      coverImage: {
        src: "/images/club/atletico-xeneizes-match-report-2026-04-16.jpg",
        alt: "Giocatori dell'Atletico Xeneizes in campo davanti al pubblico"
      },
      content: [
        {
          type: "paragraph",
          text: "La stagione regolare di Coppa Cobram Girone C si e chiusa con l'Atletico Xeneizes al terzo posto. La classifica finale ufficiale di Calcio Liguria assegna 34 punti alla squadra, frutto di 10 vittorie, 4 pareggi e 4 sconfitte."
        },
        {
          type: "paragraph",
          text: "Il bilancio offensivo della squadra e stato tra i piu rilevanti del girone: 70 reti segnate e 47 subite, con una differenza reti di +23. Davanti sono finite solo La Masia e De Wave Group."
        },
        {
          type: "heading",
          text: "Il percorso del girone"
        },
        {
          type: "paragraph",
          text: "Tra i risultati piu pesanti della stagione regolare ci sono l'8-2 sul campo dell'Atletico C.S.N.I. 2025, il 7-1 interno contro Baxaico e il 6-4 esterno in casa della La Pinta Dinamo Alfi Amateur nell'ultima giornata. Il piazzamento finale ha aperto le porte alla Poule Scudetto."
        }
      ]
    }
  },
  {
    sys: {
      id: "news-02",
      slug: "poule-scudetto-2026-il-cammino-dell-atletico-xeneizes",
      publishedAt: "2026-04-29"
    },
    fields: {
      category: "Match report",
      title: "Poule Scudetto 2026: il cammino dell'Atletico Xeneizes",
      excerpt: "Dopo l'accesso dalla stagione regolare, l'Atletico Xeneizes affronta UC Felponi ed Estudiantes SC 2011 nella fase finale.",
      author: "Redazione Atletico Xeneizes",
      coverImage: {
        src: "/images/club/atletico-xeneizes-match-report-2026-04-29.jpg",
        alt: "Grafica Poule Scudetto dell'Atletico Xeneizes"
      },
      content: [
        {
          type: "paragraph",
          text: "L'accesso alla Poule Scudetto ha portato l'Atletico Xeneizes nella fase finale della Coppa Cobram 2026. Le gare ufficiali rintracciate nel tabellone di Calcio Liguria sono due."
        },
        {
          type: "paragraph",
          text: "Nel primo turno, martedi 21 aprile 2026, l'Atletico Xeneizes ha superato UC Felponi per 4-1. Una settimana piu tardi, martedi 28 aprile 2026, e arrivata la sconfitta per 3-2 contro Estudiantes SC 2011."
        },
        {
          type: "heading",
          text: "La fase finale"
        },
        {
          type: "paragraph",
          text: "Il percorso nella Poule Scudetto resta uno dei passaggi piu importanti della stagione: una tappa che conferma crescita, competitivita e presenza dell'Atletico Xeneizes nelle gare che contano."
        }
      ]
    }
  },
  {
    sys: {
      id: "news-03",
      slug: "rosa-2025-26-statistiche-e-aggiornamenti-del-club",
      publishedAt: "2026-05-01"
    },
    fields: {
      category: "Comunicato",
      title: "Rosa 2025/26: statistiche ufficiali e aggiornamenti del club",
      excerpt: "La sezione Rosa del sito integra le statistiche di Calcio Liguria e gli aggiornamenti manuali richiesti dal club su ruoli e staff.",
      author: "Segreteria Atletico Xeneizes",
      coverImage: {
        src: "/images/club/atletico-xeneizes-team.jpg",
        alt: "Rosa Atletico Xeneizes"
      },
      content: [
        {
          type: "paragraph",
          text: "La prima versione del database giocatori raccoglie le presenze, i gol, le ammonizioni e le espulsioni pubblicate su Calcio Liguria per la Coppa Cobram Girone C 2025/26."
        },
        {
          type: "paragraph",
          text: "Su indicazione del club, Federico Cantoro e stato spostato nei centrocampisti, Davide Gallone nei difensori e Riccardo Nucera nei difensori. Nella sezione staff, Andrea Rao non compare piu tra i dirigenti."
        },
        {
          type: "paragraph",
          text: "La rosa viene aggiornata seguendo le indicazioni ufficiali del club e le fonti sportive disponibili, mantenendo separati i dati della stagione in corso dallo storico."
        }
      ]
    }
  }
];

export const articles: Article[] = cmsArticles.map((article) => ({
  id: article.sys.id,
  slug: article.sys.slug,
  category: article.fields.category,
  title: article.fields.title,
  excerpt: article.fields.excerpt,
  date: article.sys.publishedAt,
  author: article.fields.author,
  coverImage: article.fields.coverImage,
  content: article.fields.content
}));
