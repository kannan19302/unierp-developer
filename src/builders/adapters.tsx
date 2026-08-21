"use client";

/**
 * Adapters from the registry's uniform `BuilderEditorProps` to each editor's
 * own props.
 *
 * Three of the four retrofitted editors already share a shape —
 * `{ <thing>Id, onBack?, onSaved?, embedded? }` — they simply spell the id
 * field differently (`formId`, `workflowId`, `dashboardId`). That difference
 * is not worth changing inside 200KB of working editor code, and changing it
 * would touch every call site in the same commit as the routing reshape. An
 * adapter is four lines and keeps the two changes separable.
 *
 * The adapters are also where `scope` lands. The editors are scope-blind
 * today — they read and write tenant-wide, which is exactly the behaviour the
 * project-first reshape replaces. Threading `scope` into their API calls is
 * P3 work (it needs `BuilderArtifact` to exist server-side); until then the
 * adapter accepts the scope and does not yet use it, which is a visible TODO
 * rather than a silent omission.
 */

import { useRouter } from "next/navigation";
import { FormBuilderWorkspace } from "@/components/builder/FormBuilderWorkspace";
import { WorkflowEditorWorkspace } from "@/components/builder/WorkflowEditorWorkspace";
import { DashboardEditorWorkspace } from "@/components/builder/DashboardEditorWorkspace";
import type { BuilderEditorProps } from "@/platform/builders/types";
import { scopeBasePath } from "@/platform/scope";

/**
 * Where "Close" goes: back to this builder's list within the current scope,
 * never the hardcoded `/builder/erp/*` the editors default to. Passing an
 * explicit `onBack` is what stops an editor opened from `/library/forms`
 * from dumping the user into an app they were not in.
 */
function useBackToList(scope: BuilderEditorProps["scope"], segment: string) {
  const router = useRouter();
  return () => router.push(`${scopeBasePath(scope)}/${segment}`);
}

export function FormEditorAdapter({ scope, artifactId }: BuilderEditorProps) {
  return (
    <FormBuilderWorkspace
      formId={artifactId}
      onBack={useBackToList(scope, "forms")}
    />
  );
}

export function WorkflowEditorAdapter({ scope, artifactId }: BuilderEditorProps) {
  return (
    <WorkflowEditorWorkspace
      workflowId={artifactId}
      onBack={useBackToList(scope, "workflows")}
    />
  );
}

export function DashboardEditorAdapter({ scope, artifactId }: BuilderEditorProps) {
  return (
    <DashboardEditorWorkspace
      dashboardId={artifactId}
      onBack={useBackToList(scope, "dashboards")}
    />
  );
}
