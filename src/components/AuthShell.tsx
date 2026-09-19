"use client";

import { usePathname } from "next/navigation";
import { UniErpAuthProvider, RequireSession } from "@kannan19302/shared/auth-client/react";
import { oidcConfig } from "@/lib/oidc-config";
import type { TokenSet } from "@kannan19302/shared/auth-client";

/** Client-side auth boundary — same pattern as every other platform's AuthShell.tsx. */
async function restoreSession(): Promise<TokenSet | null> {
  try {
    const res = await fetch("/api/session", { credentials: "include" });
    if (!res.ok) return null;
    const body = await res.json();
    return {
      accessToken: body.accessToken,
      idToken: body.idToken,
      expiresAt: body.expiresAt,
      scope: body.scope,
    };
  } catch {
    return null;
  }
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicAuthRoute =
    pathname?.startsWith("/auth/") || pathname === "/login";

  return (
    <UniErpAuthProvider
      config={oidcConfig}
      restoreSession={restoreSession}
      defaultPostLogoutRedirectUri={
        typeof window !== "undefined"
          ? `${window.location.origin}/`
          : "http://localhost:4005/"
      }
    >
      {isPublicAuthRoute ? children : <RequireSession>{children}</RequireSession>}
    </UniErpAuthProvider>
  );
}
