"use client";

import { useParams } from "next/navigation";
import { useApiClient } from "@kannan19302/framework";
import { StatusBadge } from "@kannan19302/ui";
import { WorkspaceShellClient } from "@/platform/shell/WorkspaceShellClient";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { getSite } from "@/platform/data/projects";

export default function SiteWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { siteId } = useParams<{ siteId: string }>();
  const client = useApiClient();
  const { data, error } = useAsyncData(() => getSite(client, siteId), [siteId]);

  return (
    <WorkspaceShellClient
      scope={{ kind: "site", projectId: siteId }}
      backHref="/sites"
      backLabel="All Sites"
      identity={
        data
          ? {
              name: data.name,
              kindLabel: "Site",
              status: <StatusBadge status={data.status} />,
            }
          : null
      }
      identityError={error}
    >
      {children}
    </WorkspaceShellClient>
  );
}
