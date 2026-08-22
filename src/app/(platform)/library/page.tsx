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
import { PackagePlus, Send, ShieldCheck } from "lucide-react";
import { useAsyncData } from "@/platform/data/useAsyncData";
import {
  getHome,
  listLibraryArtifacts,
  listArtifactAttachments,
  publishArtifactTo,
  type ArtifactSummary,
  type ProjectSummary,
  installPackage,
  listBuilderManifests,
  listDeveloperPackages,
  certifyDeveloperPackageVersion,
  promoteDeveloperPackageToMarketplace,
  suspendDeveloperPackage,
  reinstateDeveloperPackage,
  type BuilderManifestSummary,
  type DeveloperPackageSummary,
  type PackageVersionSummary,
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

function UsePackageDialog({
  pkg,
  projects,
  manifests,
  onClose,
  onInstalled,
}: {
  pkg: DeveloperPackageSummary;
  projects: ProjectSummary[];
  manifests: BuilderManifestSummary[];
  onClose: () => void;
  onInstalled: () => void;
}) {
  const client = useApiClient();
  const [versionId, setVersionId] = useState(pkg.versions[0]?.id ?? "");
  const [projectId, setProjectId] = useState("");
  const [mode, setMode] = useState<"PINNED" | "LINKED" | "FORKED">("PINNED");
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [capabilitiesApproved, setCapabilitiesApproved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const version = pkg.versions.find((candidate) => candidate.id === versionId) ?? pkg.versions[0];
  const manifestByKind = useMemo(
    () => new Map(manifests.map((manifest) => [manifest.artifactKind, manifest])),
    [manifests],
  );
  const compatible = projects.filter((project) =>
    (version?.items ?? []).every((item) =>
      manifestByKind
        .get(item.artifact.artifactType)
        ?.portability.consumerProjectKinds.includes(project.kind === "app" ? "APP" : "SITE"),
    ),
  );
  const allowedModes = (version?.items ?? []).reduce<Array<"PINNED" | "LINKED" | "FORKED">>(
    (allowed, item) => {
      const itemModes = manifestByKind.get(item.artifact.artifactType)?.portability.installationModes ?? [];
      return allowed.filter((candidate) => itemModes.includes(candidate));
    },
    ["PINNED", "LINKED", "FORKED"],
  );
  const dependencies = version?.manifest.dependencies ?? [];
  const capabilities = version?.requiredCapabilities ?? [];
  const missingMappings = dependencies.filter(
    (dependency) => !dependency.optional && !mappings[dependency.alias]?.trim(),
  );

  async function handleInstall() {
    if (!projectId || !version || missingMappings.length > 0) return;
    if (capabilities.length > 0 && !capabilitiesApproved) return;
    setBusy(true);
    setError(null);
    try {
      await installPackage(client, projectId, {
        packageVersionId: version.id,
        mode,
        resourceMappings: mappings,
        capabilityGrants: capabilitiesApproved ? capabilities : [],
      });
      onInstalled();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Installation failed.");
      setBusy(false);
    }
  }

  return (
    <Modal open onClose={onClose} title={`Use ${pkg.name} in a project`}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <label style={{ display: "grid", gap: "var(--space-1)" }}>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>Version</span>
          <select value={versionId} onChange={(event) => setVersionId(event.target.value)}>
            {pkg.versions.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>{candidate.version}</option>
            ))}
          </select>
        </label>
        <label style={{ display: "grid", gap: "var(--space-1)" }}>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>Compatible project</span>
          <select value={projectId} onChange={(event) => setProjectId(event.target.value)}>
            <option value="">Select a project…</option>
            {compatible.map((project) => (
              <option key={project.id} value={project.id}>{project.name} ({project.kind})</option>
            ))}
          </select>
        </label>
        <label style={{ display: "grid", gap: "var(--space-1)" }}>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>Installation mode</span>
          <select value={mode} onChange={(event) => setMode(event.target.value as typeof mode)}>
            {allowedModes.map((candidate) => <option key={candidate} value={candidate}>{candidate.toLowerCase()}</option>)}
          </select>
        </label>
        {dependencies.length > 0 && (
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <strong style={{ fontSize: "var(--text-sm)" }}>Resource mappings</strong>
            {dependencies.map((dependency) => (
              <label key={dependency.alias} style={{ display: "grid", gap: "var(--space-1)" }}>
                <span style={{ fontSize: "var(--text-xs)" }}>
                  {dependency.alias} → {dependency.kind} ({dependency.target}){dependency.optional ? " — optional" : ""}
                </span>
                <input
                  value={mappings[dependency.alias] ?? ""}
                  placeholder="Project resource identifier"
                  onChange={(event) => setMappings((current) => ({ ...current, [dependency.alias]: event.target.value }))}
                />
              </label>
            ))}
          </div>
        )}
        {capabilities.length > 0 && (
          <label style={{ display: "flex", gap: "var(--space-2)", alignItems: "flex-start" }}>
            <input type="checkbox" checked={capabilitiesApproved} onChange={(event) => setCapabilitiesApproved(event.target.checked)} />
            <span style={{ fontSize: "var(--text-sm)" }}>
              <ShieldCheck size={14} style={{ verticalAlign: "text-bottom" }} /> Approve {capabilities.length} requested runtime capability grant{capabilities.length === 1 ? "" : "s"}.
            </span>
          </label>
        )}
        {compatible.length === 0 && (
          <p style={{ color: "var(--color-warning)", fontSize: "var(--text-sm)" }}>
            No existing project is compatible with every artifact in this package.
          </p>
        )}
        {error && <p role="alert" style={{ color: "var(--color-danger)", fontSize: "var(--text-sm)" }}>{error}</p>}
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Button
            variant="primary"
            onClick={handleInstall}
            isLoading={busy}
            disabled={!projectId || !version || missingMappings.length > 0 || (capabilities.length > 0 && !capabilitiesApproved)}
          >
            Install {mode.toLowerCase()} version
          </Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
}

export default function LibraryBrowsePage() {
  const client = useApiClient();
  const artifacts = useAsyncData(() => listLibraryArtifacts(client), []);
  const home = useAsyncData(() => getHome(client), []);
  const packages = useAsyncData(() => listDeveloperPackages(client), []);
  const manifests = useAsyncData(() => listBuilderManifests(client), []);
  const [publishing, setPublishing] = useState<ArtifactSummary | null>(null);
  const [installing, setInstalling] = useState<DeveloperPackageSummary | null>(null);
  const [marketplaceAction, setMarketplaceAction] = useState<string | null>(null);
  const [marketplaceError, setMarketplaceError] = useState<string | null>(null);

  async function certifyPackage(pkg: DeveloperPackageSummary) {
    const version = pkg.versions[0];
    if (!version) return;
    setMarketplaceAction(`certify:${version.id}`);
    setMarketplaceError(null);
    try {
      await certifyDeveloperPackageVersion(client, pkg.id, version.id);
      await packages.refetch();
    } catch (error) {
      setMarketplaceError(error instanceof Error ? error.message : "Certification failed.");
    } finally {
      setMarketplaceAction(null);
    }
  }

  async function promotePackage(pkg: DeveloperPackageSummary) {
    const version = pkg.versions[0];
    if (!version) return;
    setMarketplaceAction(`promote:${version.id}`);
    setMarketplaceError(null);
    try {
      await promoteDeveloperPackageToMarketplace(client, pkg.id, version.id);
      await packages.refetch();
    } catch (error) {
      setMarketplaceError(error instanceof Error ? error.message : "Marketplace promotion failed.");
    } finally {
      setMarketplaceAction(null);
    }
  }

  async function changePackageAvailability(pkg: DeveloperPackageSummary) {
    setMarketplaceAction(`availability:${pkg.id}`);
    setMarketplaceError(null);
    try {
      if (pkg.status === "SUSPENDED") await reinstateDeveloperPackage(client, pkg.id);
      else await suspendDeveloperPackage(client, pkg.id);
      await packages.refetch();
    } catch (error) {
      setMarketplaceError(error instanceof Error ? error.message : "Package availability could not be changed.");
    } finally {
      setMarketplaceAction(null);
    }
  }

  if (artifacts.loading) return <PageLoadingState />;
  if (artifacts.error)
    return <PageErrorState description={artifacts.error.message} onRetry={artifacts.refetch} />;

  const items = artifacts.data ?? [];

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Library"
        description="Create reusable artifacts independently, publish immutable package versions, and install them safely into compatible apps or sites."
      />

      <section style={{ marginBottom: "var(--space-7)" }}>
        <h2 style={{ marginBottom: "var(--space-1)" }}>Published packages</h2>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", marginTop: 0 }}>
          Signed, immutable units with explicit versions, dependencies and capabilities.
        </p>
        {packages.loading ? (
          <PageLoadingState />
        ) : packages.error ? (
          <PageErrorState description={packages.error.message} onRetry={packages.refetch} />
        ) : (packages.data ?? []).length === 0 ? (
          <PageEmptyState title="No published packages" description="Package validated Library revisions to make them installable." />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-3)" }}>
            {(packages.data ?? []).map((pkg) => (
              <Card key={pkg.id} style={{ padding: "var(--space-4)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-2)" }}>
                  <strong>{pkg.name}</strong>
                  <div style={{ display: "flex", gap: "var(--space-1)" }}>
                    <StatusBadge status={pkg.editability} />
                    <StatusBadge status={pkg.status ?? "ACTIVE"} />
                  </div>
                </div>
                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>{pkg.namespace}</p>
                <p style={{ fontSize: "var(--text-sm)" }}>{pkg.description ?? "Reusable developer package"}</p>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                  {pkg.versions.length} published version{pkg.versions.length === 1 ? "" : "s"}
                  {pkg.versions[0] ? ` · latest ${pkg.versions[0].version}` : ""}
                </div>
                {pkg.versions[0] && (
                  <div style={{ marginTop: "var(--space-2)", fontSize: "var(--text-xs)" }}>
                    <StatusBadge status={pkg.versions[0].certifications?.[0]?.status ?? "UNCERTIFIED"} />
                    <span style={{ marginLeft: "var(--space-1)", color: "var(--color-text-muted)" }}>
                      {pkg.versions[0].certifications?.[0]?.status === "PASSED"
                        ? "Latest version passed marketplace certification"
                        : "Latest version requires marketplace certification"}
                    </span>
                  </div>
                )}
                {pkg.versions[0] && (
                  <div style={{ marginTop: "var(--space-1)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>
                    {pkg.versions[0].licenseExpression ?? "License not declared"} · {pkg.versions[0].sbomDigest ? "SBOM recorded" : "SBOM missing"} · vulnerability status {pkg.versions[0].vulnerabilityStatus ?? "UNKNOWN"}
                  </div>
                )}
                {marketplaceError && <p role="alert" style={{ color: "var(--color-danger)", fontSize: "var(--text-xs)" }}>{marketplaceError}</p>}
                {pkg.versions[0] && (
                  <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                    <Button variant="secondary" size="sm" onClick={() => certifyPackage(pkg)} isLoading={marketplaceAction === `certify:${pkg.versions[0].id}`}>
                      Certify latest
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => promotePackage(pkg)} disabled={pkg.versions[0].certifications?.[0]?.status !== "PASSED"} isLoading={marketplaceAction === `promote:${pkg.versions[0].id}`}>
                      Marketplace
                    </Button>
                  </div>
                )}
                <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                  <Button variant="primary" size="sm" onClick={() => setInstalling(pkg)} disabled={pkg.versions.length === 0 || pkg.status === "SUSPENDED"}>
                    <PackagePlus size={14} /> Use in project…
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => changePackageAvailability(pkg)} isLoading={marketplaceAction === `availability:${pkg.id}`}>
                    {pkg.status === "SUSPENDED" ? "Reinstate" : "Suspend"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <h2>Standalone artifacts</h2>

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
      {installing && (
        <UsePackageDialog
          pkg={installing}
          projects={[...(home.data?.apps ?? []), ...(home.data?.sites ?? [])]}
          manifests={manifests.data ?? []}
          onClose={() => setInstalling(null)}
          onInstalled={() => packages.refetch()}
        />
      )}
    </div>
  );
}
