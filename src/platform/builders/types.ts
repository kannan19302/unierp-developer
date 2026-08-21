/**
 * The one contract a builder declares about itself.
 *
 * Before this file, the same fourteen builders were described by five parallel
 * lists that nothing kept in agreement: `BUILDER_TABS` (exported, never
 * imported), four `*-sub-tabs.ts` arrays (rendered), `descriptors/builder.ts`
 * (registered, unconsumed), `STATIC_COMMANDS` in the command palette, and the
 * inline `PILLARS`/`QUICK_ACTIONS` in `builder/page.tsx`. Adding one builder
 * meant editing four or five files, and forgetting one of them produced a
 * builder that existed but could not be navigated to — or worse, a full-canvas
 * editor that forgot to register in `full-canvas-routes.ts` and rendered with
 * the hub chrome stacked on top of it.
 *
 * A `BuilderDefinition` is the single place a builder is described. From one
 * entry the skeleton derives the workspace nav item, the route, the
 * full-canvas decision, the command-palette entries, the "New…" menu, the
 * permission gate, and the API scope path. Nothing else may hold a list of
 * builders; `registry.test.ts` asserts it.
 */

import type { ComponentType, LazyExoticComponent } from "react";

/**
 * Where an artifact can live. Mirrors `DevProject.kind` plus the Library
 * plane, which is `BuilderArtifact.ownerProjectId IS NULL` server-side.
 *
 * The Library is a scope, not a place: `/library/forms/[id]` renders the same
 * editor component as `/apps/[appId]/forms/[id]`, differing only in the scope
 * handed to the API client and the presence of a "Publish to app…" action.
 *
 * `manage` is the tenant-wide plane (`/manage/*`) — environments, connectors,
 * releases, access control. It is a scope rather than a hardcoded nav list
 * for one reason: the registry is meant to be the ONLY list of surfaces in
 * this app (`scripts/check-nav-registry.ts` enforces it), and carving out an
 * exception for "the tenant-wide ones" would recreate exactly the
 * five-parallel-lists problem the registry replaced. It has no project id,
 * so `ResolvedScope` gives it no `projectId` field.
 */
export type BuilderScope = "app" | "site" | "library" | "manage";

/**
 * The artifact kinds the registry can own. Mirrors
 * `BuilderArtifact.artifactType` in the Prisma schema exactly — a value here
 * with no counterpart there is a bug in one of the two.
 *
 * TODO(P5): this moves to `@kannan19302/shared/blocks` once that subpath
 * exists, so the API can validate against the same union rather than a copy.
 * It is declared locally today because inventing the import before the package
 * exists would be a lie the compiler cannot catch.
 */
export const ARTIFACT_TYPES = [
  "FORM",
  "ADVANCED_FORM",
  "WORKFLOW",
  "BPMN_PROCESS",
  "DASHBOARD",
  "DATA_OBJECT",
  "RULE_SET",
  "API_ENDPOINT",
  "SCRIPT",
  "MOBILE_APP",
  "ETL_PIPELINE",
  "THEME",
  "PAGE",
  "COLLECTION",
  "BLOG_POST",
  "MENU",
  "ASSET",
  "SEO_PROFILE",
  "AB_TEST",
] as const;

export type ArtifactType = (typeof ARTIFACT_TYPES)[number];

/**
 * Not every surface in a workspace authors something.
 *
 * `builder` — authors an artifact; has a list, an editor, and a create flow.
 * `data`    — reads runtime records the builders produced (orders, form
 *             submissions, workflow runs). No editor, no create flow.
 * `settings`— configures the project itself. Exactly one per project kind.
 *
 * Modelling these three in one registry rather than one registry plus a
 * hardcoded tail is the whole point: the workspace nav is
 * `resolveBuilders(scope, permissions)` and nothing else. A `data` surface
 * that declared an editor would be a contradiction, so `editor` is only
 * reachable on the `builder` variant of the union below.
 */
export type SurfaceKind = "builder" | "data" | "settings";

/**
 * Ship state, surfaced rather than hidden.
 *
 * UI_UX_BRIEF §12 Rule 3 says a verb a builder cannot perform renders
 * "disabled with a stated reason, not hidden". The same reasoning applies one
 * level up to the builder itself: a `planned` builder appears in the nav,
 * disabled, with `plannedReason` shown on hover. That is what lets a future
 * builder be added as a nav entry before its editor exists, without a design
 * change and without a user discovering it as a dead link.
 */
export type BuilderStatus = "ga" | "beta" | "planned";

export interface BuilderListProps {
  scope: ResolvedScope;
}

export interface BuilderEditorProps {
  scope: ResolvedScope;
  artifactId: string;
}

/**
 * The scope resolved from the URL, handed to every list and editor.
 *
 * `projectId` is present exactly for the two project-bearing kinds. The union
 * is discriminated so an editor cannot read `projectId` in the library or
 * manage case without narrowing first — which matters because those are the
 * cases where a stray project id would silently scope a query to the wrong
 * owner.
 */
export type ResolvedScope =
  | { kind: "app"; projectId: string }
  | { kind: "site"; projectId: string }
  | { kind: "library" }
  | { kind: "manage" };

interface BuilderDefinitionBase {
  /** Stable id. Never rendered; used for registry lookup and telemetry. */
  id: string;
  label: string;
  /** Lucide icon name, resolved by the shell. Kept as a string so this module
   * has no dependency on an icon set — the same reasoning as
   * `PlatformNavItem.icon` in `@kannan19302/ui/shell`. */
  icon: string;
  /**
   * The URL segment: `/apps/[appId]/<segment>`. Must be unique across the
   * whole registry, not merely within a scope, because the dynamic route
   * `[builder]` resolves it without knowing which scope it came from.
   */
  segment: string;
  /** Which planes this surface appears in. Empty is meaningless and rejected. */
  scopes: BuilderScope[];
  permissions: { read: string[]; write: string[] };
  status: BuilderStatus;
  /** Required when `status === "planned"` — the reason shown on the disabled
   * nav item. Enforced at registration, not by the type, so the message can be
   * written where the builder is defined rather than at every call site. */
  plannedReason?: string;
  /** One line under the title on the list page's empty state, and the
   * subtitle in the command palette. */
  description: string;
}

export interface BuilderSurface extends BuilderDefinitionBase {
  kind: "builder";
  artifactType: ArtifactType;
  /**
   * Does `[artifactId]` own the whole viewport?
   *
   * This replaces `full-canvas-routes.ts`, which was a list of regexes because
   * Next.js gives a child route no way to opt out of a parent layout. The
   * layout still has to ask — but it now asks the registry, so a new
   * full-canvas editor cannot be added without answering the question.
   */
  fullCanvas: boolean;
  /** `wizard` routes "New" to `<segment>/new` instead of creating inline.
   * Workflows and dashboards already have real wizard pages. */
  createFlow: "inline" | "wizard";
  /**
   * Required when `createFlow === "wizard"`. The legacy wizard pages
   * (`/builder/erp/workflows/new`, `.../dashboards/new`) are POST-then-redirect,
   * not a multi-step form — this is the same shape, generalised so one route
   * file (`[builder]/new/page.tsx`) can drive any wizard builder instead of
   * each one needing its own scope-aware copy of a 46-line page.
   */
  wizardCreate?: {
    /** Relative to `/api/v1/builder` until the P4 controller split lands. */
    endpoint: string;
    defaultPayload: () => Record<string, unknown>;
  };
  listView: LazyExoticComponent<ComponentType<BuilderListProps>>;
  /** Absent only while `status === "planned"`. */
  editor?: LazyExoticComponent<ComponentType<BuilderEditorProps>>;
}

export interface DataSurface extends BuilderDefinitionBase {
  kind: "data";
  listView: LazyExoticComponent<ComponentType<BuilderListProps>>;
}

export interface SettingsSurface extends BuilderDefinitionBase {
  kind: "settings";
  listView: LazyExoticComponent<ComponentType<BuilderListProps>>;
}

export type BuilderDefinition = BuilderSurface | DataSurface | SettingsSurface;

/** Narrowing helper — `def.editor` is only reachable through this. */
export function isBuilderSurface(def: BuilderDefinition): def is BuilderSurface {
  return def.kind === "builder";
}
