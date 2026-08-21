"use client";

/**
 * One file serving all fourteen manage surfaces, the same way
 * `apps/[appId]/[builder]` serves the app-scoped builders.
 */

import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import { PageLoadingState } from "@kannan19302/ui";
import { getBuilderBySegment } from "@/platform/builders";

export default function ManageSectionPage() {
  const { section } = useParams<{ section: string }>();
  const def = getBuilderBySegment(section);

  if (!def || !def.scopes.includes("manage")) notFound();

  const ListView = def.listView;
  return (
    <Suspense fallback={<PageLoadingState />}>
      <ListView scope={{ kind: "manage" }} />
    </Suspense>
  );
}
