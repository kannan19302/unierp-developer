"use client";

/**
 * Wildcard-aware permission checking for this app's UI.
 *
 * `usePermissions()` from `@kannan19302/shared/auth-client` returns a
 * `hasPermission` that is a plain `permissions.includes(p)` — exact match.
 * The API authorizes with a DIFFERENT `hasPermission`, the one in
 * `@kannan19302/shared`'s utils, which understands `builder.*` and the
 * tenant-wide `*`. Using the exact-match one in the UI means a role granted
 * `builder.*` sees a nav missing every item the backend would serve it.
 *
 * This module is the one place that discrepancy is reconciled: it re-exports
 * the API's own predicate so the nav, the command palette and the workspace
 * rail all gate on exactly what the server will enforce.
 */

import { hasPermission } from "@kannan19302/shared";

/** True when `held` satisfies `required`, honouring `.*` and `*` wildcards. */
export function permits(held: string[], required: string): boolean {
  return hasPermission(held, required);
}

/** Every permission in `required` must be satisfied. */
export function permitsAll(held: string[], required: string[]): boolean {
  return required.every((r) => hasPermission(held, r));
}
