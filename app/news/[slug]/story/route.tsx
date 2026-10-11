import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/api";

export const runtime = "nodejs";

type StoryRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: StoryRouteProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return new Response("Articolo non trovato", { status: 404 });
  }

  const coverImage = new URL(article.coverImage.src, "https://www.atleticoxeneizes149.com").toString();
  const articleUrl = `www.atleticoxeneizes149.com/news/${article.slug}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 76,
          color: "white",
          backgroundColor: "#090909",
          position: "relative"
        }}
      >
        <img src={coverImage} width={1080} height={1920} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.3) 0%, rgba(0,0,0,.35) 25%, rgba(0,0,0,.9) 72%, #090909 100%)" }} />
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 2 }}>ATLETICO XENEIZES 149</div>
          <div style={{ color: "#C9A84C", fontSize: 22, fontWeight: 700, textTransform: "uppercase" }}>{article.category}</div>
        </div>
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
          <div style={{ width: 88, height: 5, backgroundColor: "#C9A84C" }} />
          <div style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" }}>{article.title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.3, color: "#E5E5E5", overflowWrap: "anywhere" }}>{article.excerpt}</div>
          <div style={{ marginTop: 16, alignSelf: "flex-start", border: "2px solid #C9A84C", borderRadius: 10, padding: "18px 26px", color: "#F0D477", fontSize: 24, fontWeight: 700 }}>
            Apri l'articolo: {articleUrl}
          </div>
        </div>
        <div style={{ position: "relative", fontSize: 22, color: "#D0D0D0" }}>{new Date(article.date).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}</div>
      </div>
    ),
    { width: 1080, height: 1920 }
  );
}
