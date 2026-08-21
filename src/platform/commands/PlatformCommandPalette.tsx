"use client";

/**
 * ⌘K, derived from the builder registry.
 *
 * Replaces `StudioCommandPalette`'s `STATIC_COMMANDS` array — the fourth of
 * the five parallel nav lists the registry exists to collapse. That array had
 * to be edited by hand for every new builder, had no permission filtering,
 * and had drifted: it linked to `/apps/store`, which lives on the marketplace
 * app's origin (:4007) and resolved to nothing on this one.
 *
 * Commands here are always in agreement with the nav and the routes, because
 * all three call `resolveBuilders`. Scope-aware: inside an app or site
 * workspace, the builder entries jump to that project's copy of each builder
 * rather than the tenant-wide one.
 */

import { useRouter, usePathname } from "next/navigation";
import {
  CommandPalette,
  useCommandPalette,
  type CommandItem,
} from "@kannan19302/ui";
import { usePermissions } from "@kannan19302/shared/auth-client/react";
import { Home, LayoutGrid, Globe, Package, Settings, Plus } from "lucide-react";
import { resolveBuilders, isBuilderSurface } from "@/platform/builders";
import { resolveIcon } from "@/platform/icons";
import { permits } from "@/platform/permissions";
import { scopeFromPath, scopeBasePath } from "@/platform/scope";

const GLOBAL_DESTINATIONS = [
  { id: "home", title: "Home", href: "/", icon: <Home size={16} /> },
  { id: "apps", title: "Apps", href: "/apps", icon: <LayoutGrid size={16} /> },
  { id: "sites", title: "Sites", href: "/sites", icon: <Globe size={16} /> },
  { id: "library", title: "Library", href: "/library", icon: <Package size={16} /> },
  { id: "manage", title: "Manage", href: "/manage", icon: <Settings size={16} /> },
];

export function PlatformCommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();
  const pathname = usePathname();
  const { permissions } = usePermissions();

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const items: CommandItem[] = [
    ...GLOBAL_DESTINATIONS.map((d) => ({
      id: d.id,
      category: "Go to",
      title: d.title,
      icon: d.icon,
      onSelect: () => go(d.href),
    })),
    {
      id: "new-app",
      category: "Create",
      title: "New App",
      icon: <Plus size={16} />,
      onSelect: () => go("/apps/new"),
    },
    {
      id: "new-site",
      category: "Create",
      title: "New Site",
      icon: <Plus size={16} />,
      onSelect: () => go("/sites/new"),
    },
  ];

  // Inside a workspace, offer that workspace's builders. Outside one, offer
  // the Library's — the only scope reachable without first picking a project.
  const scope = scopeFromPath(pathname) ?? { kind: "library" as const };
  const base = scopeBasePath(scope);
  const scopeLabel =
    scope.kind === "app"
      ? "This app"
      : scope.kind === "site"
        ? "This site"
        : scope.kind === "manage"
          ? "Manage"
          : "Library";

  for (const def of resolveBuilders(scope.kind, permissions, permits)) {
    const Icon = resolveIcon(def.icon);
    items.push({
      id: `${scope.kind}-${def.id}`,
      category: scopeLabel,
      title: def.label,
      subtitle: def.description,
      icon: <Icon size={16} />,
      onSelect: () => go(`${base}/${def.segment}`),
    });

    // A wizard builder can be created straight from the palette; an inline
    // one has no dedicated create URL to jump to, so offering "New …" for it
    // would be a link to nowhere.
    if (isBuilderSurface(def) && def.createFlow === "wizard" && scope.kind !== "library") {
      items.push({
        id: `${scope.kind}-${def.id}-new`,
        category: "Create",
        title: `New ${def.label.replace(/s$/, "")}`,
        icon: <Plus size={16} />,
        onSelect: () => go(`${base}/${def.segment}/new`),
      });
    }
  }

  return <CommandPalette open={open} onClose={() => setOpen(false)} items={items} />;
}
