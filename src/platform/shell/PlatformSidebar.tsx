"use client";

/**
 * Renders `platform.manifest.ts`'s static nav, filtered through
 * `resolveManifestNav` — the first real consumer of that function anywhere in
 * the ten platforms (see the header comment on `platform.manifest.ts`).
 */

import { usePathname } from "next/navigation";
import { resolveManifestNav } from "@kannan19302/ui/shell";
import { resolveIcon } from "@/platform/icons";
import { permits } from "@/platform/permissions";
import { platformManifest } from "@/platform.manifest";

export function PlatformSidebar({ permissions }: { permissions: string[] }) {
  const pathname = usePathname();
  // Wildcard-aware, matching what the API enforces — see platform/permissions.
  const items = resolveManifestNav(platformManifest, permissions, permits);

  return (
    <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "var(--space-2)" }}>
      {items.map((item) => {
        const Icon = resolveIcon(item.icon);
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <a
            key={item.key}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-2) var(--space-3)",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--text-sm)",
              textDecoration: "none",
              color: active ? "var(--color-primary)" : "var(--color-text-secondary)",
              background: active ? "var(--color-bg-sunken)" : "transparent",
              fontWeight: active ? 600 : 400,
            }}
          >
            <Icon size={16} />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
