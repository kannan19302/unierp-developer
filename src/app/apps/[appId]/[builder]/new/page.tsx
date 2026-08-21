"use client";

/**
 * `/apps/[appId]/[builder]/new` — and it has to serve TWO different meanings,
 * because Next.js resolves the static `new` segment before the sibling
 * `[artifactId]` one. Whichever meaning this file does not handle, 404s.
 *
 *   * `createFlow: "wizard"` (workflows, dashboards) — "new" is an ACTION.
 *     POST a default payload, then redirect to the created artifact. This
 *     generalises the two legacy pages it replaces
 *     (`builder/erp/workflows/new`, `.../dashboards/new`), each a 46-line
 *     POST-then-redirect hardcoded to one tenant-wide endpoint and one
 *     tenant-wide redirect target; neither could be reused app-scoped
 *     without a fork.
 *
 *   * `createFlow: "inline"` (forms, and every other full-canvas builder) —
 *     "new" is an ARTIFACT ID meaning "open the editor on a blank document".
 *     `FormBuilderWorkspace` has always taken `formId: 'new'` for exactly
 *     this, and the deleted `full-canvas-routes.ts` encoded the same rule by
 *     hand in its `KEEP_CHROME` exception set. Falling through to the editor
 *     here is what preserves that behaviour now that a static route sits in
 *     front of `[artifactId]`.
 *
 * Getting this wrong is not subtle in effect but is invisible in a
 * typecheck: `/apps/x/forms/new` simply 404'd, which is how it was found —
 * by clicking through the running app, not by compiling it.
 *
 * TODO(P4): the wizard `endpoint` is still `/builder/<segment>`, which
 * creates tenant-wide — there is no `/apps/:appId/<segment>` to POST to
 * until the controller split lands. The artifact is created correctly; it is
 * not yet scoped to this app on the server, only presented as if it were.
 */

import { Suspense, useEffect } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useApiClient } from "@kannan19302/framework";
import { PageLoadingState } from "@kannan19302/ui";
import {
  getBuilderBySegment,
  isBuilderSurface,
  type BuilderSurface,
} from "@/platform/builders";

function WizardCreate({
  def,
  appId,
  builder,
}: {
  def: BuilderSurface & { wizardCreate: NonNullable<BuilderSurface["wizardCreate"]> };
  appId: string;
  builder: string;
}) {
  const router = useRouter();
  const client = useApiClient();
  const { endpoint, defaultPayload } = def.wizardCreate;

  useEffect(() => {
    let cancelled = false;
    client
      .post<{ id: string }>(`/builder/${endpoint}`, defaultPayload())
      .then((created) => {
        if (!cancelled) router.replace(`/apps/${appId}/${builder}/${created.id}`);
      })
      .catch(() => {
        if (!cancelled) router.replace(`/apps/${appId}/${builder}`);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, appId, builder]);

  return (
    <PageLoadingState message={`Creating ${def.label.toLowerCase().replace(/s$/, "")}...`} />
  );
}

export default function AppBuilderNewPage() {
  const { appId, builder } = useParams<{ appId: string; builder: string }>();
  const def = getBuilderBySegment(builder);

  if (!def || !isBuilderSurface(def) || !def.scopes.includes("app")) notFound();

  if (def.createFlow === "wizard" && def.wizardCreate) {
    return (
      <WizardCreate
        def={def as BuilderSurface & { wizardCreate: NonNullable<BuilderSurface["wizardCreate"]> }}
        appId={appId}
        builder={builder}
      />
    );
  }

  // Inline create: "new" is the artifact id. Same component the
  // `[artifactId]` route renders, so the two paths cannot diverge.
  if (!def.editor) notFound();
  const Editor = def.editor;
  return (
    <Suspense fallback={<PageLoadingState />}>
      <Editor scope={{ kind: "app", projectId: appId }} artifactId="new" />
    </Suspense>
  );
}
