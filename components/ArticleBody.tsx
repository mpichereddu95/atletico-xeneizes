import type { ArticleContentBlock } from "@/lib/types";

type ArticleBodyProps = {
  content: ArticleContentBlock[];
};

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="grid gap-6">
      {content.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={`${block.type}-${index}`} className="font-display text-3xl font-black uppercase leading-none text-white sm:text-4xl">
              {block.text}
            </h2>
          );
        }

        return (
          <p key={`${block.type}-${index}`} className="max-w-3xl text-lg leading-8 text-white/78">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
