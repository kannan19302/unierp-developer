"use client";

import { Suspense } from "react";
import { notFound, useParams } from "next/navigation";
import { PageLoadingState } from "@kannan19302/ui";
import { getBuilderBySegment } from "@/platform/builders";

export default function LibraryBuilderListPage() {
  const { builder } = useParams<{ builder: string }>();
  const def = getBuilderBySegment(builder);

  if (!def || !def.scopes.includes("library")) notFound();

  const ListView = def.listView;
  return (
    <Suspense fallback={<PageLoadingState />}>
      <ListView scope={{ kind: "library" }} />
    </Suspense>
  );
}
