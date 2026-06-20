type SectionHeadingProps = {
  kicker: string;
  title: string;
  text?: string;
  tone?: "dark" | "light";
};

export function SectionHeading({ kicker, title, text, tone = "dark" }: SectionHeadingProps) {
  const titleClass = tone === "light" ? "text-axBlack" : "text-white";
  const textClass = tone === "light" ? "text-axBlack/62" : "text-white/65";

  return (
    <div className="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2 className={`section-title mt-3 ${titleClass}`}>{title}</h2>
      </div>
      {text ? <p className={`max-w-xl text-base leading-7 ${textClass}`}>{text}</p> : null}
    </div>
  );
}
