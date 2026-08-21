"use client";

/**
 * One file serving all app-scoped builder list pages. `[builder]` is a URL
 * segment, not a folder per builder — the whole reason fourteen builders cost
 * three route files instead of forty-two.
 */

import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import { PageLoadingState } from "@kannan19302/ui";
import { getBuilderBySegment } from "@/platform/builders";

export default function AppBuilderListPage() {
  const { appId, builder } = useParams<{ appId: string; builder: string }>();
  const def = getBuilderBySegment(builder);

  if (!def || !def.scopes.includes("app")) notFound();

  const ListView = def.listView;
  return (
    <Suspense fallback={<PageLoadingState />}>
      <ListView scope={{ kind: "app", projectId: appId }} />
    </Suspense>
  );
}
