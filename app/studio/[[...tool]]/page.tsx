import { SanityStudio } from "@/components/SanityStudio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <SanityStudio />
    </div>
  );
}
