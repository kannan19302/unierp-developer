"use client";

/**
 * One file serving every app-scoped full-canvas editor. Whether this route
 * actually owns the whole viewport is decided by `isFullCanvasPath` in
 * `WorkspaceShellClient`, not by this file — this file only has to pick the
 * right editor and get out of the way.
 */

import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import { PageLoadingState } from "@kannan19302/ui";
import { getBuilderBySegment, isBuilderSurface } from "@/platform/builders";

export default function AppBuilderEditorPage() {
  const { appId, builder, artifactId } = useParams<{
    appId: string;
    builder: string;
    artifactId: string;
  }>();
  const def = getBuilderBySegment(builder);

  if (!def || !isBuilderSurface(def) || !def.editor || !def.scopes.includes("app")) {
    notFound();
  }

  const Editor = def.editor;
  return (
    <Suspense fallback={<PageLoadingState />}>
      <Editor scope={{ kind: "app", projectId: appId }} artifactId={artifactId} />
    </Suspense>
  );
}
