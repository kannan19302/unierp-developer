"use client";

import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import { PageLoadingState } from "@kannan19302/ui";
import { getBuilderBySegment, isBuilderSurface } from "@/platform/builders";

export default function LibraryBuilderEditorPage() {
  const { builder, artifactId } = useParams<{ builder: string; artifactId: string }>();
  const def = getBuilderBySegment(builder);

  if (!def || !isBuilderSurface(def) || !def.editor || !def.scopes.includes("library")) {
    notFound();
  }

  const Editor = def.editor;
  return (
    <Suspense fallback={<PageLoadingState />}>
      <Editor scope={{ kind: "library" }} artifactId={artifactId} />
    </Suspense>
  );
}
