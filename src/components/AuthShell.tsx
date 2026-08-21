"use client";

import { UniErpAuthProvider, RequireSession } from "@kannan19302/shared/auth-client/react";
import { oidcConfig } from "@/lib/oidc-config";
import type { TokenSet } from "@kannan19302/shared/auth-client";

/** Client-side auth boundary — same pattern as every other platform's AuthShell.tsx. */
async function restoreSession(): Promise<TokenSet | null> {
  const res = await fetch("/api/session", { credentials: "include" });
  if (!res.ok) return null;
  const body = await res.json();
  return {
    accessToken: body.accessToken,
    idToken: body.idToken,
    expiresAt: body.expiresAt,
    scope: body.scope,
  };
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <UniErpAuthProvider
      config={oidcConfig}
      restoreSession={restoreSession}
      defaultPostLogoutRedirectUri="http://localhost:4000/"
    >
      <RequireSession>{children}</RequireSession>
    </UniErpAuthProvider>
  );
}
