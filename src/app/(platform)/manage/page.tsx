"use client";

/**
 * Manage overview — the tenant-wide plane's landing page. Cards come from
 * `resolveBuilders("manage", ...)`, so a surface added to
 * `definitions/manage.ts` appears here, in the nav, and in the command
 * palette without this file changing.
 */

import Link from "next/link";
import { PageHeader, Card } from "@kannan19302/ui";
import { usePermissions } from "@kannan19302/shared/auth-client/react";
import { resolveBuilders } from "@/platform/builders";
import { resolveIcon } from "@/platform/icons";
import { permits } from "@/platform/permissions";

export default function ManageOverviewPage() {
  const { permissions } = usePermissions();
  const surfaces = resolveBuilders("manage", permissions, permits);

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Manage"
        description="Environments, releases, connectors and governance — tenant-wide, not scoped to one app."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "var(--space-3)",
        }}
      >
        {surfaces.map((def) => {
          const Icon = resolveIcon(def.icon);
          return (
            <Link key={def.id} href={`/manage/${def.segment}`} style={{ textDecoration: "none" }}>
              <Card style={{ padding: "var(--space-4)", cursor: "pointer" }}>
                <Icon size={20} />
                <div
                  style={{
                    marginTop: "var(--space-2)",
                    fontWeight: 600,
                    color: "var(--color-text)",
                  }}
                >
                  {def.label}
                </div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                  {def.description}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
