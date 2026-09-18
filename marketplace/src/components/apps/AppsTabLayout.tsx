"use client";

/**
 * `APPS_TABS` / `AppsTabLayout` — was missing entirely.
 *
 * `app/(dashboard)/apps/layout.tsx` wraps its whole subtree, so a missing
 * import here failed it entirely rather than one page — the same
 * layout-blocking gap fixed the same way elsewhere during W5's router
 * unshadowing (see tenant-admin's SettingsTabLayout.tsx). Generated from the
 * real directory structure rather than hand-curated.
 */
import { ModuleTabLayout, type ModuleTab } from "@kannan19302/ui";

export const APPS_TABS: ModuleTab[] = [
  { id: "apps", label: "Overview", href: "/apps" },
  { id: "developer", label: "Developer", href: "/apps/developer" },
  { id: "store", label: "Store", href: "/apps/store" },
];

export { ModuleTabLayout as AppsTabLayout };
