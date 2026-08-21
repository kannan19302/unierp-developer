"use client";

/**
 * `<PlatformShell>` wants a `ShellUser { name, email }`. The access token
 * this app holds carries no such claims — `UniErpAccessTokenClaims` is
 * `sid, tenantId, realm, roles, permissions, scope, plat, mfaVerified, amr,
 * typ, act?` plus the JWT standard registered claims (`sub`, `iss`, `exp`…).
 * There is no profile endpoint this app can call without borrowing one from
 * another domain — the only `GET .../me` routes in the API belong to CRM
 * gamification, the marketplace developer console, and HR's employee
 * directory (`people.controller.ts`, gated on `hr.create`), and a developer
 * platform user has no reason to hold an HR record.
 *
 * Rather than fabricate a name or silently render `user: null` (which hides
 * the account menu entirely), this surfaces exactly what the token actually
 * proves: the subject id. `sub` is honest, not pretty, and swapping it for a
 * real display name later is a one-function change confined to this file.
 */

import { useSession, useTenant } from "@kannan19302/shared/auth-client/react";
import type { ShellUser, ShellTenant } from "@kannan19302/ui/shell";

export function useShellIdentity(): {
  user: ShellUser | null;
  tenant: ShellTenant | null;
} {
  const { status, claims } = useSession();
  const { tenantId } = useTenant();

  if (status !== "authenticated" || !claims) {
    return { user: null, tenant: null };
  }

  const sub = typeof claims.sub === "string" ? claims.sub : "unknown";
  return {
    user: { name: sub, email: sub },
    tenant: tenantId ? { id: tenantId, name: tenantId } : null,
  };
}
