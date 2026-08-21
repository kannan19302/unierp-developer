/**
 * The builder registry — the only list of builders in this application.
 *
 * Registration is side-effecting and happens once, from `./index.ts`. That
 * mirrors `@kannan19302/shared/module-registry`, which this repo already uses
 * for the same shape of problem, rather than inventing a second pattern.
 *
 * The validation in `registerBuilder` is deliberate and runs at import time,
 * not at render time. A duplicate segment or a planned builder with no stated
 * reason is a mistake that would otherwise surface as a subtly wrong route or
 * a mute disabled nav item, discovered by a user rather than by the developer
 * who made it. Failing on import turns both into a dev-server crash with a
 * message naming the offending builder.
 */

import type {
  BuilderDefinition,
  BuilderScope,
  BuilderSurface,
} from "./types";
import { isBuilderSurface } from "./types";

/** Insertion-ordered: nav order is declaration order in `./index.ts`. */
const registry = new Map<string, BuilderDefinition>();
const segments = new Set<string>();

export function registerBuilder(def: BuilderDefinition): void {
  if (registry.has(def.id)) {
    throw new Error(
      `Builder "${def.id}" is already registered. Ids must be unique.`,
    );
  }
  if (segments.has(def.segment)) {
    throw new Error(
      `Builder "${def.id}" claims segment "${def.segment}", which is already ` +
        `taken. Segments must be unique across every scope, because the ` +
        `dynamic [builder] route resolves them without knowing the scope.`,
    );
  }
  if (def.scopes.length === 0) {
    throw new Error(
      `Builder "${def.id}" declares no scopes, so it can never be reached.`,
    );
  }
  if (def.status === "planned" && !def.plannedReason) {
    throw new Error(
      `Builder "${def.id}" is planned but states no reason. A disabled nav ` +
        `item without an explanation is a dead end (UI_UX_BRIEF §12 rule 3).`,
    );
  }
  // Not every builder has a separate editor route: BPMN, the rules engine and
  // the API builder are single-surface tools where the list page IS the tool.
  // But a full-canvas builder by definition opens something at
  // `[artifactId]`, so declaring `fullCanvas` without an editor is
  // incoherent — the route would resolve to a blank viewport.
  if (def.status !== "planned" && isBuilderSurface(def) && def.fullCanvas && !def.editor) {
    throw new Error(
      `Builder "${def.id}" declares fullCanvas but ships no editor, so ` +
        `[artifactId] would render an empty viewport.`,
    );
  }
  if (isBuilderSurface(def) && def.createFlow === "wizard" && !def.wizardCreate) {
    throw new Error(
      `Builder "${def.id}" declares createFlow "wizard" but ships no ` +
        `wizardCreate, so its "New" action has nothing to POST to.`,
    );
  }

  registry.set(def.id, def);
  segments.add(def.segment);
}

/**
 * Every surface visible in `scope` to a caller holding `permissions`.
 *
 * This is the workspace nav, the command palette's Navigate group, and the
 * "New…" menu — all three read this, so they cannot disagree.
 *
 * Planned builders are returned rather than filtered: the caller renders them
 * disabled. Permission-denied builders ARE filtered, because showing a user a
 * surface they cannot enter is a different thing from showing them one that
 * does not exist yet.
 */
export function resolveBuilders(
  scope: BuilderScope,
  heldPermissions: string[],
  /** Wildcard-aware by default would mean importing `@kannan19302/shared`
   * here, which would make this module (and therefore
   * `scripts/check-nav-registry.ts`) depend on zod/jose at import time. The
   * app passes `permits` from `platform/permissions`; the default stays
   * exact so the invariant script can build the registry with no deps. */
  matches: (held: string[], required: string) => boolean = (held, required) =>
    held.includes(required),
): BuilderDefinition[] {
  return [...registry.values()].filter(
    (def) =>
      def.scopes.includes(scope) &&
      def.permissions.read.every((p) => matches(heldPermissions, p)),
  );
}

/**
 * Resolve the `[builder]` URL segment.
 *
 * Returns undefined for an unknown segment — the route renders a 404 rather
 * than throwing, since the segment comes from the URL bar and a user typing a
 * wrong path is not an exceptional condition.
 */
export function getBuilderBySegment(
  segment: string,
): BuilderDefinition | undefined {
  return [...registry.values()].find((def) => def.segment === segment);
}

export function getBuilder(id: string): BuilderDefinition | undefined {
  return registry.get(id);
}

/** Unfiltered, for tests and for the nav-source assertion. */
export function allBuilders(): BuilderDefinition[] {
  return [...registry.values()];
}

/**
 * Does this path render a `StudioShell` that owns the whole viewport?
 *
 * Replaces `full-canvas-routes.ts`. That file held five regexes and a
 * `KEEP_CHROME` exception set, both maintained by hand; this reads the answer
 * off the builder that owns the segment.
 *
 * The `/new` exception survives, but as a rule rather than a list: a create
 * wizard is chrome-ful by definition, so `createFlow === "wizard"` on the
 * `/new` path means keep the chrome. `/forms/new` has no wizard, so "new" is
 * treated as an id and the full-canvas editor opens on a blank document —
 * which is what `KEEP_CHROME` was encoding by hand.
 */
export function isFullCanvasPath(pathname: string | null): boolean {
  if (!pathname) return false;

  // /apps/[appId]/[builder]/[artifactId] or /library/[builder]/[artifactId]
  const parts = pathname.split("/").filter(Boolean);
  let builderIndex: number;
  if (parts[0] === "apps" || parts[0] === "sites") {
    builderIndex = 2; // apps / <id> / <builder> / <artifactId>
  } else if (parts[0] === "library") {
    builderIndex = 1; // library / <builder> / <artifactId>
  } else {
    return false;
  }

  const builderSegment = parts[builderIndex];
  const artifactSegment = parts[builderIndex + 1];
  if (!builderSegment) return false; // /apps/<id> — the workspace landing
  if (!artifactSegment) return false; // a list page, never full-canvas
  if (parts.length > builderIndex + 2) return false; // deeper than an editor

  const def = getBuilderBySegment(builderSegment);
  if (!def || !isBuilderSurface(def) || !def.fullCanvas) return false;

  if (artifactSegment === "new" && def.createFlow === "wizard") return false;
  return true;
}

/** Test-only. Registration is import-time and global; tests that register
 * fixtures need a way back to a clean slate. */
export function __resetRegistry(): void {
  registry.clear();
  segments.clear();
}

export type { BuilderDefinition, BuilderScope, BuilderSurface };
