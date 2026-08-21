"use client";

/**
 * The Library — standalone artifacts and the "publish into an app" action.
 *
 * This page previously listed the *builders* that support the library scope,
 * because there was no way to ask what was actually in the Library: the
 * legacy `/builder/*` routes only knew "everything this tenant owns". Plan
 * phase P3's `BuilderArtifact` makes the real question answerable —
 * `ownerProjectId IS NULL` — so the page now shows artifacts, which is what
 * a library is.
 */

import { useMemo, useState } from "react";
import { useApiClient } from "@kannan19302/framework";
import {
  PageHeader,
  PageLoadingState,
  PageErrorState,
  PageEmptyState,
  Card,
  Button,
  StatusBadge,
  Modal,
} from "@kannan19302/ui";
import { Send } from "lucide-react";
import { useAsyncData } from "@/platform/data/useAsyncData";
import {
  getHome,
  listLibraryArtifacts,
  listArtifactAttachments,
  publishArtifactTo,
  type ArtifactSummary,
  type ProjectSummary,
} from "@/platform/data/projects";
import { resolveIcon } from "@/platform/icons";

const TYPE_ICON: Record<string, string> = {
  FORM: "FileCode2",
  WORKFLOW: "Workflow",
  DASHBOARD: "BarChart3",
  API_ENDPOINT: "Code2",
  THEME: "Palette",
  SCRIPT: "Zap",
  DATA_OBJECT: "Database",
};

function PublishDialog({
  artifact,
  apps,
  onClose,
  onPublished,
}: {
  artifact: ArtifactSummary;
  apps: ProjectSummary[];
  onClose: () => void;
  onPublished: () => void;
}) {
  const client = useApiClient();
  const attachments = useAsyncData(
    () => listArtifactAttachments(client, artifact.id),
    [artifact.id],
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alreadyIn = useMemo(
    () => new Set((attachments.data ?? []).map((a) => a.projectId)),
    [attachments.data],
  );

  async function handlePublish() {
    if (selected.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      await publishArtifactTo(client, artifact.id, selected);
      onPublished();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to publish.");
      setBusy(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={`Publish "${artifact.name}" to…`}>
      {attachments.loading ? (
        <PageLoadingState />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {apps.length === 0 && (
            <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
              No apps yet — create one first.
            </p>
          )}
          {apps.map((app) => {
            const already = alreadyIn.has(app.id);
            return (
              <label
                key={app.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2)",
                  fontSize: "var(--text-sm)",
                  opacity: already ? 0.55 : 1,
                }}
              >
                <input
                  type="checkbox"
                  disabled={already}
                  checked={already || selected.includes(app.id)}
                  onChange={(e) =>
                    setSelected((s) =>
                      e.target.checked ? [...s, app.id] : s.filter((x) => x !== app.id),
                    )
                  }
                />
                {app.name}
                {already && (
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    already published
                  </span>
                )}
              </label>
            );
          })}
          {error && (
            <p style={{ color: "var(--color-danger)", fontSize: "var(--text-sm)" }}>{error}</p>
          )}
          <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
            <Button
              variant="primary"
              onClick={handlePublish}
              isLoading={busy}
              disabled={selected.length === 0}
            >
              Publish
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default function LibraryBrowsePage() {
  const client = useApiClient();
  const artifacts = useAsyncData(() => listLibraryArtifacts(client), []);
  const home = useAsyncData(() => getHome(client), []);
  const [publishing, setPublishing] = useState<ArtifactSummary | null>(null);

  if (artifacts.loading) return <PageLoadingState />;
  if (artifacts.error)
    return <PageErrorState description={artifacts.error.message} onRetry={artifacts.refetch} />;

  const items = artifacts.data ?? [];

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Library"
        description="Artifacts that belong to no app or site. Publish one into an app when it's ready — it stays here and can serve several apps at once."
      />

      {items.length === 0 ? (
        <PageEmptyState
          title="Nothing in the library yet"
          description="Anything you author without an app or site lands here."
        />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--space-3)",
          }}
        >
          {items.map((a) => {
            const Icon = resolveIcon(TYPE_ICON[a.artifactType] ?? "Package");
            return (
              <Card key={a.id} style={{ padding: "var(--space-4)" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      fontWeight: 600,
                      color: "var(--color-text)",
                    }}
                  >
                    <Icon size={16} />
                    {a.name}
                  </span>
                  <StatusBadge status={a.status} />
                </div>
                <div
                  style={{
                    marginTop: "var(--space-1)",
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {a.artifactType.replace(/_/g, " ").toLowerCase()}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPublishing(a)}
                  style={{ marginTop: "var(--space-3)" }}
                >
                  <Send size={14} /> Publish to app…
                </Button>
              </Card>
            );
          })}
        </div>
      )}

      {publishing && (
        <PublishDialog
          artifact={publishing}
          apps={home.data?.apps ?? []}
          onClose={() => setPublishing(null)}
          onPublished={() => artifacts.refetch()}
        />
      )}
    </div>
  );
}
