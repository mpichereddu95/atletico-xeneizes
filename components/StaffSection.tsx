import { SectionHeading } from "@/components/SectionHeading";
import type { StaffMember } from "@/lib/types";

type StaffSectionProps = {
  staff: StaffMember[];
};

export function StaffSection({ staff }: StaffSectionProps) {
  return (
    <section id="staff" className="bg-axBlack py-20 lg:py-28">
      <div className="section-shell">
        <SectionHeading
          kicker="Staff"
          title="Area tecnica e societaria"
          text="Ruoli aggiornati secondo le indicazioni del club, con struttura pronta per biografie complete, contatti e futuri ampliamenti della dirigenza."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {staff.map((member) => (
            <article key={member.name} className="min-w-0 rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex min-w-0 items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#C9A84C40] bg-[#C9A84C20] text-sm font-semibold uppercase tracking-[0.08em] text-[#C9A84C]">
                  {getInitials(member.name)}
                </div>
                <span className="inline-flex min-w-0 rounded-full bg-[#C9A84C15] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A84C]">
                  {member.role}
                </span>
              </div>
              <h3 className="mt-5 text-base font-bold leading-5 text-white">{member.name}</h3>
              {member.bio ? <p className="mt-3 text-sm leading-6 text-white/50">{member.bio}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}
