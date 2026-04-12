"use client";

import { usePathname } from "next/navigation";

function toLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="breadcrumbs" aria-label="breadcrumbs">
      <span>Home</span>
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`}>
          <span className="crumb-separator">&gt;</span> {toLabel(segment)}
        </span>
      ))}
    </div>
  );
}
