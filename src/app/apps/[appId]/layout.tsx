"use client";

import { useParams } from "next/navigation";
import { useApiClient } from "@kannan19302/framework";
import { StatusBadge } from "@kannan19302/ui";
import { WorkspaceShellClient } from "@/platform/shell/WorkspaceShellClient";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { getApp } from "@/platform/data/projects";

export default function AppWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { appId } = useParams<{ appId: string }>();
  const client = useApiClient();
  const { data, error } = useAsyncData(() => getApp(client, appId), [appId]);

  return (
    <WorkspaceShellClient
      scope={{ kind: "app", projectId: appId }}
      backHref="/apps"
      backLabel="All Apps"
      identity={
        data
          ? {
              name: data.name,
              kindLabel: "App",
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
