"use client";

/**
 * The Library workspace has no project to fetch — "Library" is a fixed
 * identity, not a record. That is also why this layout lives one segment
 * deeper than `apps/[appId]` and `sites/[siteId]`: `/library` itself (the
 * faceted browse across every artifact type) stays under `PlatformShell`,
 * and only `/library/[builder]` — where cross-builder nav actually matters —
 * switches to `WorkspaceShell`.
 */

import { WorkspaceShellClient } from "@/platform/shell/WorkspaceShellClient";

export default function LibraryWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceShellClient
      scope={{ kind: "library" }}
      backHref="/library"
      backLabel="Library"
      identity={{ name: "Library", kindLabel: "Standalone artifacts" }}
      identityError={null}
    >
      {children}
    </WorkspaceShellClient>
  );
}
