"use client";

/**
 * Renders `platform.manifest.ts`'s static nav, filtered through
 * `resolveManifestNav` and presented via `@kannan19302/ui/platforms/developer-platform`.
 */

import { usePathname } from "next/navigation";
import { resolveManifestNav } from "@kannan19302/ui/shell";
import { DeveloperNav } from "@kannan19302/ui/platforms/developer-platform";
import { resolveIcon } from "@/platform/icons";
import { permits } from "@/platform/permissions";
import { platformManifest } from "@/platform.manifest";

export function PlatformSidebar({ permissions }: { permissions: string[] }) {
  const pathname = usePathname();
  // Wildcard-aware, matching what the API enforces — see platform/permissions.
  const manifestItems = resolveManifestNav(platformManifest, permissions, permits);

  const navItems = manifestItems.map((item) => {
    const Icon = resolveIcon(item.icon);
    return {
      key: item.key,
      href: item.href,
      label: item.label,
      icon: <Icon size={16} />,
    };
  });

  return <DeveloperNav items={navItems} currentPath={pathname} />;
}
