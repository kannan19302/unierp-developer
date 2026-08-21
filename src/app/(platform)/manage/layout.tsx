"use client";

/**
 * Manage keeps the global `PlatformShell` chrome (it is tenant-wide, not a
 * project you "enter"), so it needs a secondary nav rather than the
 * `WorkspaceShell` rail that apps and sites get.
 *
 * `SubTabBar` is the design system's existing primitive for exactly this, and
 * reusing it is not a regression to the old `MANAGE_SUB_TABS` pattern: the
 * tabs are DERIVED from `resolveBuilders("manage", permissions, permits)` here, so
 * there is still exactly one list of manage surfaces in this app. The old
 * `manage-sub-tabs.ts` hardcoded all fourteen with no permission filtering at
 * all — this filters, and can never drift from the registry.
 */

import { usePathname } from "next/navigation";
import { SubTabBar, type SubTab } from "@kannan19302/ui/layout";
import { usePermissions } from "@kannan19302/shared/auth-client/react";
import { LayoutDashboard } from "lucide-react";
import { resolveBuilders } from "@/platform/builders";
import { resolveIcon } from "@/platform/icons";
import { permits } from "@/platform/permissions";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  const { permissions } = usePermissions();
  const pathname = usePathname();

  const tabs: SubTab[] = [
    { id: "overview", label: "Overview", href: "/manage", icon: LayoutDashboard },
    ...resolveBuilders("manage", permissions, permits).map((def) => ({
      id: def.id,
      label: def.label,
      href: `/manage/${def.segment}`,
      icon: resolveIcon(def.icon),
    })),
  ];

  return (
    <>
      <div style={{ padding: "var(--space-6) var(--space-6) 0" }}>
        <SubTabBar tabs={tabs} />
      </div>
      {children}
    </>
  );
}
