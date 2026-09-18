import { OidcClient, type OidcClientConfig } from "@kannan19302/shared/auth-client";

/**
 * This platform's own OIDC client registration — client id
 * "unierp-marketplace", seeded by data/prisma/seed-oidc-clients.ts as a PUBLIC
 * client (no secret; PKCE-only, same as every browser client in this system).
 * Registered in W1; wired up as this app's actual auth mechanism in W6.
 */
export const oidcConfig: OidcClientConfig = {
  issuer: process.env.NEXT_PUBLIC_OIDC_ISSUER || "http://localhost:3005",
  clientId: "unierp-marketplace",
  redirectUri:
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:4007") +
    "/auth/callback",
  // marketplace.install, NOT erp.read/erp.write — that is exactly the pair
  // seed-oidc-clients.ts registers for P7. Installing an app is this
  // platform's privileged action; reading the tenant ledger is not.
  scope: ["openid", "profile", "email", "tenant", "offline_access", "marketplace.install"],
};

export function createOidcClient(): OidcClient {
  return new OidcClient(oidcConfig);
}
