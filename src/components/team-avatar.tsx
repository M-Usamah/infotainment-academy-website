import Image from "next/image";
import type { TeamMember } from "@/lib/data";

// Shows the member's photo when one is set, otherwise a neutral profile silhouette.
export function TeamAvatar({ member }: { member: TeamMember }) {
  if (member.image) {
    return (
      <div className="relative size-24 overflow-hidden rounded-2xl">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className="size-24 shrink-0 rounded-2xl"
      role="img"
      aria-label={`${member.name} (photo coming soon)`}
    >
      <rect width="100" height="100" rx="16" fill="#eef3fa" />
      <circle cx="50" cy="38" r="18" fill="#0b4a8f" />
      <path d="M12 100c0-24 17-38 38-38s38 14 38 38z" fill="#0b4a8f" />
    </svg>
  );
}
