"use client";

/**
 * Wires the design system's `<WorkspaceShell>` to this app's registry and
 * live project data. One component, reused by the app layout, the site
 * layout and the library layout — the same "one frame, varying only its
 * input" contract `<StudioShell>` already proved one level down.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { WorkspaceShell, type WorkspaceIdentity } from "@kannan19302/ui/shell";
import { ArtifactAddress } from "@kannan19302/ui";
import { usePermissions } from "@kannan19302/shared/auth-client/react";
import { useApiClient } from "@kannan19302/framework";
import { resolveBuilders, isFullCanvasPath, getBuilderBySegment } from "@/platform/builders";
import type { BuilderScope } from "@/platform/builders";
import { resolveIcon } from "@/platform/icons";
import { permits } from "@/platform/permissions";
import { scopeBasePath } from "@/platform/scope";
import type { ResolvedScope } from "@/platform/builders";
import { PageLoadingState, PageErrorState } from "@kannan19302/ui/shell";
import { PlatformCommandPalette } from "@/platform/commands/PlatformCommandPalette";

export interface WorkspaceShellClientProps {
  scope: ResolvedScope;
  backHref: string;
  backLabel: string;
  identity: WorkspaceIdentity | null;
  identityError: Error | null;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

export function WorkspaceShellClient({
  scope,
  backHref,
  backLabel,
  identity,
  identityError,
  headerActions,
  children,
}: WorkspaceShellClientProps) {
  const pathname = usePathname();
  const { permissions } = usePermissions();
  const client = useApiClient();

  // Records that this project was opened, once per mount of its workspace —
  // not once per builder navigated to within it, which is why this lives
  // here (mounted once per project) rather than in the per-route pages.
  // Only the two project-bearing scopes have anything to record: `library`
  // and `manage` are tenant-wide planes with no project id. Narrowing on
  // those two positively (rather than excluding `library` alone) is what
  // keeps this correct when a fourth scope is added — the discriminated
  // union turns the omission into a compile error rather than a runtime
  // `/dev/recents/undefined`.
  const recentProjectId =
    scope.kind === "app" || scope.kind === "site" ? scope.projectId : null;
  useEffect(() => {
    if (!recentProjectId) return;
    client.post(`/dev/recents/${recentProjectId}`).catch(() => {
      // Best-effort — a failed recents write should never block the
      // workspace from rendering.
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentProjectId]);

  // Rule 1 (UI_UX_BRIEF §12): the canvas is the page. A full-canvas editor
  // owns the whole viewport — no rail, no header — so this shell steps aside
  // entirely rather than stacking chrome on top of it.
  //
  // The command palette is the one exception, kept here for the reason the
  // old `builder/layout.tsx` gave and which still holds: it is keyboard-only,
  // costs no layout, and is the fastest way out of a full-screen editor.
  // Dropping it would leave the surface with the least visible navigation
  // also the hardest to leave.
  if (isFullCanvasPath(pathname)) {
    return (
      <>
        {children}
        <PlatformCommandPalette />
      </>
    );
  }

  if (identityError) {
    return <PageErrorState description={identityError.message} />;
  }
  if (!identity) {
    return <PageLoadingState />;
  }

  const base = scopeBasePath(scope);
  const scopeKind: BuilderScope = scope.kind;
  const resolved = resolveBuilders(scopeKind, permissions, permits);

  // The rail's section headings come from the registry's `kind`, not from a
  // hand-written grouping — "authors something" / "reads what was authored" /
  // "configures the project" is a real distinction already declared on every
  // definition, and reading it here is what keeps the headings from becoming
  // a sixth parallel list. `resolveBuilders` returns registration order, and
  // the shell only emits a heading when the group CHANGES, so definitions of
  // one kind must stay contiguous in the definition files — which they are.
  const nav = resolved.map((def) => ({
    key: def.id,
    label: def.label,
    href: `${base}/${def.segment}`,
    icon: (() => {
      const Icon = resolveIcon(def.icon);
      return <Icon size={16} />;
    })(),
    active: pathname === `${base}/${def.segment}` || pathname.startsWith(`${base}/${def.segment}/`),
    disabledReason: def.status === "planned" ? def.plannedReason : undefined,
    group: SURFACE_GROUP[def.kind],
    tag: def.status === "beta" ? "beta" : def.status === "planned" ? "soon" : undefined,
    tagTone: def.status === "beta" ? ("beta" as const) : ("neutral" as const),
  }));

  // The builder segment the user is currently inside, if any. Derived from the
  // path against the registry rather than from `pathname.split()` alone,
  // because a segment that is not a registered builder is not a builder — a
  // stray `/apps/x/settings-ish` should leave the address at the project
  // level rather than inventing a segment that does not exist.
  const currentSegment = pathname.startsWith(`${base}/`)
    ? pathname.slice(base.length + 1).split("/")[0]
    : undefined;
  const currentBuilder =
    currentSegment && getBuilderBySegment(currentSegment) ? currentSegment : undefined;

  const projectId =
    scope.kind === "app" || scope.kind === "site" ? scope.projectId : null;

  return (
    <WorkspaceShell
      backHref={backHref}
      backLabel={backLabel}
      identity={identity}
      scope={scope.kind}
      address={
        <ArtifactAddress
          scope={scope.kind}
          project={projectId}
          builder={currentBuilder}
          copyable
          size="md"
        />
      }
      nav={nav}
      headerActions={headerActions}
    >
      {children}
      <PlatformCommandPalette />
    </WorkspaceShell>
  );
}

/** Registry `kind` → the rail heading it sits under. */
const SURFACE_GROUP: Record<string, string> = {
  builder: "Build",
  data: "Data",
  settings: "Configure",
};
