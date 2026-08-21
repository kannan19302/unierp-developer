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
import { usePermissions, useSession } from "@kannan19302/shared/auth-client/react";
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
  const { signOut } = useSession();

  return (
    <PlatformShell
      platformName="Developer Platform"
      user={user}
      tenant={tenant}
      onSignOut={() => signOut()}
      sidebar={<PlatformSidebar permissions={permissions} />}
    >
      {children}
      <PlatformCommandPalette />
    </PlatformShell>
  );
}
