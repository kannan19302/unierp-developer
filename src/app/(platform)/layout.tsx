"use client";

/**
 * The PlatformShell plane: `/`, `/apps`, `/sites`, `/library`, `/manage`.
 *
 * `PlatformShell` (`design-system/src/shell/platform-shell.tsx`) has existed
 * since W6 with no consumer — this is its first. `platformWizardUrl` is
 * intentionally omitted: this app has no Global Platform Wizard integration
 * yet, and rendering a "Switch platform" link to nowhere would be worse than
 * not rendering it.
 */

import { PlatformShell } from "@kannan19302/ui/shell";
import { usePermissions } from "@kannan19302/shared/auth-client/react";
import { createOidcClient } from "@/lib/oidc-config";
import { useShellIdentity } from "@/platform/providers/useShellIdentity";
import { PlatformSidebar } from "@/platform/shell/PlatformSidebar";
import { PlatformCommandPalette } from "@/platform/commands/PlatformCommandPalette";

export default function PlatformGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { permissions } = usePermissions();
  const { user, tenant } = useShellIdentity();

  return (
    <PlatformShell
      platformName="Developer Platform"
      user={user}
      tenant={tenant}
      platformWizardUrl="http://localhost:4000"
      accountCenterUrl="http://localhost:3005/oidc/account"
      environmentLabel="Local"
      realmLabel="tenant"
      onSignOut={async () => {
        try {
          await fetch("/api/session", {
            method: "DELETE",
            credentials: "include",
            signal: AbortSignal.timeout(5_000),
          });
        } finally {
          window.location.replace(
            createOidcClient().buildLogoutUrl("http://localhost:4000/"),
          );
        }
      }}
      sidebar={<PlatformSidebar permissions={permissions} />}
    >
      {children}
      <PlatformCommandPalette />
    </PlatformShell>
  );
}
