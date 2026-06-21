import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_AUTH_TOKEN;
const apiVersion = "2025-06-21";
const rootDir = process.cwd();

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_AUTH_TOKEN.");
  process.exit(1);
}

const apiBase = `https://${projectId}.api.sanity.io/v${apiVersion}`;

async function sanityRequest(endpoint, options = {}) {
  const response = await fetch(`${apiBase}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body}`);
  }

  return response.json();
}

async function loadClubData() {
  const source = await fs.readFile(path.join(rootDir, "data/club.ts"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true
    }
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    exports: module.exports,
    module,
    require: () => ({})
  });
  return module.exports;
}

function docId(prefix, id) {
  return `${prefix}.${String(id).replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase()}`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uploadLocalImage(src, label) {
  if (!src.startsWith("/")) {
    return null;
  }

  const filePath = path.join(rootDir, "public", src);
  const buffer = await fs.readFile(filePath);
  const ext = path.extname(src).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : "image/jpeg";
  const response = await fetch(`${apiBase}/assets/images/${dataset}?filename=${encodeURIComponent(path.basename(src))}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType
    },
    body: buffer
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Image upload failed for ${label}: ${response.status} ${body}`);
  }

  const payload = await response.json();
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: payload.document._id
    }
  };
}

function ref(_ref) {
  return { _type: "reference", _ref };
}

function contentBlocks(blocks) {
  return blocks.map((block, index) => ({
    _key: `block-${index}`,
    _type: block.type === "heading" ? "headingBlock" : "paragraphBlock",
    type: block.type,
    text: block.text
  }));
}

async function main() {
  const data = await loadClubData();
  const seasonId = docId("season", "2025-26");
  const groupCompetitionId = docId("competition", "coppa-cobram-girone-c-2025-26");
  const pouleCompetitionId = docId("competition", "coppa-cobram-poule-scudetto-2025-26");

  const teams = new Set(["ATLETICO XENEIZES 149"]);
  data.matches.forEach((match) => {
    teams.add(match.home);
    teams.add(match.away);
  });
  data.standings.forEach((row) => teams.add(row.team));

  const teamDocs = [...teams].map((team) => ({
    _id: docId("team", slugify(team)),
    _type: "team",
    name: team,
    slug: { _type: "slug", current: slugify(team) },
    isClub: team === "ATLETICO XENEIZES 149"
  }));

  const mutations = [
    {
      createOrReplace: {
        _id: seasonId,
        _type: "season",
        name: "2025/26",
        slug: { _type: "slug", current: "2025-26" },
        startYear: 2025,
        endYear: 2026,
        status: "archived",
        sourceType: "official"
      }
    },
    {
      createOrReplace: {
        _id: groupCompetitionId,
        _type: "competition",
        name: "Coppa Cobram - Girone C",
        slug: { _type: "slug", current: "coppa-cobram-girone-c" },
        season: ref(seasonId),
        phase: "Girone C",
        sourceUrl: data.clubSources.info,
        sourceType: "official"
      }
    },
    {
      createOrReplace: {
        _id: pouleCompetitionId,
        _type: "competition",
        name: "Coppa Cobram - Poule Scudetto",
        slug: { _type: "slug", current: "coppa-cobram-poule-scudetto" },
        season: ref(seasonId),
        phase: "Poule Scudetto",
        sourceUrl: data.clubSources.poule,
        sourceType: "official"
      }
    },
    ...teamDocs.map((doc) => ({ createOrReplace: doc }))
  ];

  for (const player of data.players) {
    mutations.push({
      createOrReplace: {
        _id: docId("player", player.id),
        _type: "player",
        name: player.name,
        slug: { _type: "slug", current: player.id },
        number: player.number,
        role: player.role,
        birthLabel: player.birthLabel,
        externalPhotoUrl: player.photo.src,
        bio: player.bio,
        sourceUrl: player.sourceUrl,
        season: ref(seasonId),
        appearances: player.stats.appearances,
        goals: player.stats.goals,
        assists: player.stats.assists,
        yellowCards: player.stats.yellowCards,
        redCards: player.stats.redCards,
        ownGoals: player.stats.ownGoals,
        bestPlayerAwards: player.stats.bestPlayerAwards,
        bestGoalkeeperAwards: player.stats.bestGoalkeeperAwards,
        sourceType: "official"
      }
    });
  }

  for (const match of data.matches) {
    mutations.push({
      createOrReplace: {
        _id: docId("match", match.id),
        _type: "match",
        season: ref(seasonId),
        competition: ref(match.phase === "Poule Scudetto" ? pouleCompetitionId : groupCompetitionId),
        phase: match.phase,
        round: match.round,
        matchDate: match.date,
        kickoff: match.kickoff,
        home: match.home,
        away: match.away,
        venue: match.venue,
        score: match.score,
        status: match.status,
        sourceUrl: match.phase === "Poule Scudetto" ? data.clubSources.poule : data.clubSources.calendar,
        sourceType: "official"
      }
    });
  }

  for (const row of data.standings) {
    mutations.push({
      createOrReplace: {
        _id: docId("standing", `${row.season}-${row.competition}-${row.position}`),
        _type: "standing",
        season: ref(seasonId),
        competition: ref(groupCompetitionId),
        position: row.position,
        team: row.team,
        played: row.played,
        wins: row.wins,
        draws: row.draws,
        losses: row.losses,
        goalsFor: row.goalsFor,
        goalsAgainst: row.goalsAgainst,
        points: row.points,
        difference: row.difference,
        sourceType: "official"
      }
    });
  }

  for (const sponsor of data.sponsors) {
    mutations.push({
      createOrReplace: {
        _id: docId("sponsor", slugify(sponsor.name)),
        _type: "sponsor",
        name: sponsor.name,
        tier: sponsor.tier,
        description: sponsor.description,
        href: sponsor.href,
        active: true
      }
    });
  }

  for (const item of data.mediaItems) {
    const image = await uploadLocalImage(item.image, item.title);
    mutations.push({
      createOrReplace: {
        _id: docId("media", item.id),
        _type: "mediaItem",
        type: item.type,
        title: item.title,
        image,
        externalImageUrl: image ? undefined : item.image,
        alt: item.alt,
        publishedAt: "2026-05-01",
        featured: item.id === "media-team-2026"
      }
    });
  }

  for (const record of data.cmsArticles) {
    const image = await uploadLocalImage(record.fields.coverImage.src, record.fields.title);
    mutations.push({
      createOrReplace: {
        _id: docId("article", record.sys.slug),
        _type: "article",
        title: record.fields.title,
        slug: { _type: "slug", current: record.sys.slug },
        category: record.fields.category,
        status: "published",
        excerpt: record.fields.excerpt,
        publishedAt: `${record.sys.publishedAt}T12:00:00.000Z`,
        author: record.fields.author,
        coverImage: {
          ...image,
          alt: record.fields.coverImage.alt
        },
        contentBlocks: contentBlocks(record.fields.content),
        sourceType: record.fields.category === "Comunicato" ? "manual" : "official"
      }
    });
  }

  for (let index = 0; index < mutations.length; index += 25) {
    await sanityRequest(`/data/mutate/${dataset}`, {
      method: "POST",
      body: JSON.stringify({ mutations: mutations.slice(index, index + 25) })
    });
  }

  console.log(`Synced ${mutations.length} documents/assets into Sanity.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
