"use client";

import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import { PageLoadingState } from "@kannan19302/ui";
import { getBuilderBySegment, isBuilderSurface } from "@/platform/builders";

export default function SiteBuilderEditorPage() {
  const { siteId, builder, artifactId } = useParams<{
    siteId: string;
    builder: string;
    artifactId: string;
  }>();
  const def = getBuilderBySegment(builder);

  if (!def || !isBuilderSurface(def) || !def.editor || !def.scopes.includes("site")) {
    notFound();
  }

  const Editor = def.editor;
  return (
    <Suspense fallback={<PageLoadingState />}>
      <Editor scope={{ kind: "site", projectId: siteId }} artifactId={artifactId} />
    </Suspense>
  );
}
