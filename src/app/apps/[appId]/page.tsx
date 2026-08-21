"use client";

/**
 * App landing — what you see immediately after entering an app.
 *
 * The overview itself lives in `<ProjectOverview>` and is shared with the
 * site landing: an App and a Site differ in which builders the registry
 * resolves for them, never in how the landing is laid out. That is the same
 * "one frame, varying only its input" contract `<WorkspaceShell>` holds one
 * level up, applied to the page rather than the chrome.
 */

import { useParams } from "next/navigation";
import { useApiClient } from "@kannan19302/framework";
import { PageLoadingState, PageErrorState } from "@kannan19302/ui";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { getApp } from "@/platform/data/projects";
import { ProjectOverview } from "@/components/platform/ProjectOverview";

export default function AppLandingPage() {
  const { appId } = useParams<{ appId: string }>();
  const client = useApiClient();
  const { data, loading, error } = useAsyncData(() => getApp(client, appId), [appId]);

  if (loading) return <PageLoadingState />;
  if (error) return <PageErrorState description={error.message} />;
  if (!data) return null;

  return <ProjectOverview project={data} scope="app" />;
}
