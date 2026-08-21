/**
 * This platform's `platform.manifest.ts` — the declaration
 * `design-system/src/shell/manifest.ts` has asked every platform to provide
 * since W6, and that (per that file's own header comment) had "no consumer"
 * anywhere in the ten apps until now.
 *
 * This is the STATIC half of the global nav — the five roots that exist
 * regardless of tenant data. It says nothing about which apps or sites a
 * tenant has; that comes from `/api/v1/dev/home` at render time. The static
 * half is what `resolveManifestNav` filters by permission before
 * `PlatformShell` renders it.
 */

import type { PlatformManifest } from "@kannan19302/ui/shell";

export const platformManifest: PlatformManifest = {
  platformCode: "P8",
  platformName: "Developer Platform",
  nav: [
    { key: "home", label: "Home", href: "/", icon: "Home" },
    { key: "apps", label: "Apps", href: "/apps", icon: "LayoutGrid" },
    { key: "sites", label: "Sites", href: "/sites", icon: "Globe" },
    { key: "library", label: "Library", href: "/library", icon: "Package" },
    {
      key: "manage",
      label: "Manage",
      href: "/manage",
      icon: "Settings",
      requiredPermissions: ["builder.manage"],
    },
  ],
  routePermissions: {
    "/apps": ["builder.read"],
    "/sites": ["builder.read"],
    "/library": ["builder.read"],
    "/manage": ["builder.manage"],
  },
};
