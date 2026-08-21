"use client";

/** Site landing. See the note in `apps/[appId]/page.tsx` — same page, other scope. */

import { useParams } from "next/navigation";
import { useApiClient } from "@kannan19302/framework";
import { PageLoadingState, PageErrorState } from "@kannan19302/ui";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { getSite } from "@/platform/data/projects";
import { ProjectOverview } from "@/components/platform/ProjectOverview";

export default function SiteLandingPage() {
  const { siteId } = useParams<{ siteId: string }>();
  const client = useApiClient();
  const { data, loading, error } = useAsyncData(() => getSite(client, siteId), [siteId]);

  if (loading) return <PageLoadingState />;
  if (error) return <PageErrorState description={error.message} />;
  if (!data) return null;

  return <ProjectOverview project={data} scope="site" />;
}
