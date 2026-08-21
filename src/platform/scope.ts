/**
 * Turning a `ResolvedScope` into the two strings everything else needs: the
 * URL prefix and the API prefix.
 *
 * These are separate functions because they are genuinely different mappings,
 * and conflating them is the bug this file exists to prevent. The URL for an
 * app workspace is `/apps/<id>`; the API path is `/apps/<id>` too — but the
 * Library's URL is `/library` while its API is `/library`, and a site's URL is
 * `/sites/<id>` while several of its API surfaces still live under
 * `/builder/web-studio` until the controller split lands (plan P4). Deriving
 * one from the other by string surgery would work today and break at P4.
 */

import type { ResolvedScope } from "./builders/types";

/** URL prefix for a scope: `/apps/abc`, `/sites/xyz`, `/library`, `/manage`. */
export function scopeBasePath(scope: ResolvedScope): string {
  switch (scope.kind) {
    case "app":
      return `/apps/${scope.projectId}`;
    case "site":
      return `/sites/${scope.projectId}`;
    case "library":
      return "/library";
    case "manage":
      return "/manage";
  }
}

/**
 * API prefix for a scope, relative to `/api/v1`.
 *
 * TODO(P4): these become the real project-first controller paths once
 * `api/src/developer/platform/` exists. Until then the caller still hits the
 * legacy `/builder/*` routes, which are tenant-wide — so a scoped list is
 * currently filtered client-side. That is a known, temporary inaccuracy and
 * the reason P3/P4 are not optional.
 */
export function scopeApiPath(scope: ResolvedScope): string {
  switch (scope.kind) {
    case "app":
      return `/apps/${scope.projectId}`;
    case "site":
      return `/sites/${scope.projectId}`;
    case "library":
      return "/library";
    case "manage":
      return "/manage";
  }
}

/**
 * Parse a scope out of a pathname. Returns undefined for paths outside the
 * three workspace planes (`/`, `/manage/*`, `/apps` with no id).
 */
export function scopeFromPath(pathname: string): ResolvedScope | undefined {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "library") return { kind: "library" };
  if (parts[0] === "manage") return { kind: "manage" };
  if (parts[0] === "apps" && parts[1]) {
    return { kind: "app", projectId: parts[1] };
  }
  if (parts[0] === "sites" && parts[1]) {
    return { kind: "site", projectId: parts[1] };
  }
  return undefined;
}
