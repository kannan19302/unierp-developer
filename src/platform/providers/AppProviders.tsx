"use client";

/**
 * Mounts `<FrameworkProvider>` — the one thing every `useApiClient()` call in
 * this app has silently depended on since it was written, with nothing ever
 * providing it. Every builder list page imports `useApiClient` from
 * `@kannan19302/framework`; without a provider above them, each one throws
 * `"useFramework must be used inside <FrameworkProvider>"` the moment it
 * renders. That this compiled and nobody hit the crash in review is a sign
 * the pages were never exercised past a mock — see AGENTS.md's rule that a
 * claim needs a mechanism that can fail; here, nothing did.
 *
 * Must render inside `<AuthShell>` (`UniErpAuthProvider` + `RequireSession`):
 * `getToken`/`getTenantId` read `useSession()`/`useTenant()`, both of which
 * throw outside that provider.
 *
 * `baseUrl: "/api/v1"` is relative and browser-resolved, matching the
 * rewrite in `next.config.mjs` (`/api/v1/:path* -> ${API_URL}/api/v1/:path*`)
 * — never point this at the API origin directly, or the CSRF/tenant headers
 * the rewrite's target expects to see same-origin would not apply.
 */

import type { ReactNode } from "react";
import { FrameworkProvider } from "@kannan19302/framework";
import { useSession, useTenant } from "@kannan19302/shared/auth-client/react";

/**
 * The API's `csrfMiddleware` uses the double-submit cookie pattern: it sets a
 * non-httpOnly `csrf_token` cookie on any safe request, then requires the
 * same value echoed back in `x-csrf-token` on every mutating one. The cookie
 * is deliberately readable by JS (`httpOnly: false`) precisely so the client
 * can do this — without it, every POST/PATCH/DELETE from this app gets
 * "Invalid or missing CSRF token", which is exactly what happened before
 * this was wired up.
 */
function readCsrfCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const { getAccessToken } = useSession();
  const { tenantId } = useTenant();

  return (
    <FrameworkProvider
      api={{
        baseUrl: "/api/v1",
        getToken: () => getAccessToken(),
        getTenantId: () => tenantId,
        getCsrfToken: readCsrfCookie,
      }}
      createQueryClient
    >
      {children}
    </FrameworkProvider>
  );
}
