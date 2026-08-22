"use client";

/**
 * Apps and Sites, read from `/dev/*` — plan phase P1's `DevProject` surface.
 *
 * This file used to read `/builder/modules` and `/builder/web-studio/sites`
 * directly and normalise their shapes by hand; that was the deliberate seam
 * this file's own header comment called out ("every function here has a
 * single call site that changes once P1 ships"). P1 shipped
 * (`api/src/developer/platform/`, `data/prisma/schema/developer-platform.prisma`)
 * — `DevProject` rows already carry the shape this file used to build, so
 * the normalisation is gone, not just relocated.
 */

import type { ApiClient } from "@kannan19302/framework";

export interface ProjectSummary {
  id: string;
  kind: "app" | "site";
  name: string;
  description?: string;
  status: string;
  updatedAt?: string;
}

function normalize(p: any): ProjectSummary {
  return {
    id: p.id,
    kind: p.kind === "SITE" ? "site" : "app",
    name: p.name,
    description: p.description ?? undefined,
    status: p.status,
    updatedAt: p.updatedAt,
  };
}

export interface HomeResult {
  apps: ProjectSummary[];
  sites: ProjectSummary[];
}

export async function getHome(client: ApiClient): Promise<HomeResult> {
  const result = await client.get<{ apps: any[]; sites: any[] }>("/dev/home");
  return {
    apps: (result.apps ?? []).map(normalize),
    sites: (result.sites ?? []).map(normalize),
  };
}

export async function listApps(client: ApiClient): Promise<ProjectSummary[]> {
  return (await getHome(client)).apps;
}

export async function listSites(client: ApiClient): Promise<ProjectSummary[]> {
  return (await getHome(client)).sites;
}

export async function getProject(client: ApiClient, id: string): Promise<ProjectSummary> {
  return normalize(await client.get<any>(`/dev/projects/${id}`));
}

export interface RecentProject extends ProjectSummary {
  lastOpenedAt: string;
}

export async function listRecents(client: ApiClient): Promise<RecentProject[]> {
  const rows = await client.get<any[]>("/dev/recents");
  return (rows ?? []).map((r) => ({ ...normalize(r), lastOpenedAt: r.lastOpenedAt }));
}

export const getApp = getProject;
export const getSite = getProject;

export async function createApp(
  client: ApiClient,
  input: { name: string; description?: string },
): Promise<ProjectSummary> {
  return normalize(await client.post<any>("/dev/apps", input));
}

export async function createSite(
  client: ApiClient,
  input: { name: string; slug?: string },
): Promise<ProjectSummary> {
  return normalize(await client.post<any>("/dev/sites", input));
}

// ── Artifact registry (plan phase P3) ──

export interface ArtifactSummary {
  id: string;
  artifactType: string;
  artifactId: string;
  ownerProjectId: string | null;
  name: string;
  slug?: string | null;
  status: string;
  updatedAt: string;
}

export interface ArtifactAttachment {
  id: string;
  projectId: string;
  isOwner: boolean;
  project: { id: string; name: string; kind: string };
}

/** Unowned artifacts — the Library's actual contents, as opposed to the
 * tenant-wide "everything" the legacy `/builder/*` routes return. */
export async function listLibraryArtifacts(
  client: ApiClient,
  artifactType?: string,
): Promise<ArtifactSummary[]> {
  const q = artifactType ? `?type=${encodeURIComponent(artifactType)}` : "";
  return (await client.get<ArtifactSummary[]>(`/library${q}`)) ?? [];
}

/** Everything visible inside a project: owned plus published-in. */
export async function listProjectArtifacts(
  client: ApiClient,
  projectId: string,
  artifactType?: string,
): Promise<ArtifactSummary[]> {
  const q = artifactType ? `?type=${encodeURIComponent(artifactType)}` : "";
  return (
    (await client.get<ArtifactSummary[]>(`/dev/projects/${projectId}/artifacts${q}`)) ?? []
  );
}

export async function listArtifactAttachments(
  client: ApiClient,
  artifactId: string,
): Promise<ArtifactAttachment[]> {
  return (
    (await client.get<ArtifactAttachment[]>(`/library/${artifactId}/attachments`)) ?? []
  );
}

/** "Publish to app…" — attaches without transferring ownership, which is what
 * lets one Library artifact serve several apps at once. */
export async function publishArtifactTo(
  client: ApiClient,
  artifactId: string,
  projectIds: string[],
): Promise<unknown> {
  return client.post(`/library/${artifactId}/publish-to`, { projectIds });
}

export async function unpublishArtifactFrom(
  client: ApiClient,
  artifactId: string,
  projectId: string,
): Promise<unknown> {
  return client.delete(`/library/${artifactId}/publish-to/${projectId}`);
}

// ── Versioned Library packages and project installations ──

export interface PackageArtifactItem {
  id: string;
  exportName: string;
  artifact: ArtifactSummary;
  revision: { id: string; revision: number; contentHash: string };
}

export interface PackageCertificationSummary {
  id: string;
  status: "PASSED" | "FAILED" | "RUNNING";
  certifiedAt?: string | null;
  report?: Array<{ id: string; status: "PASS" | "FAIL"; message: string }>;
}

export interface PackageVersionSummary {
  id: string;
  version: string;
  contentHash: string;
  signature: string;
  status: string;
  licenseExpression?: string | null;
  sbomDigest?: string | null;
  vulnerabilityStatus?: "UNKNOWN" | "CLEAN" | "ADVISORY" | "BLOCKED";
  vulnerabilityReport?: Array<{ id: string; severity: string; summary: string }>;
  manifest: {
    dependencies?: Array<{
      alias: string;
      kind: string;
      target: string;
      versionRange: string;
      optional?: boolean;
    }>;
    capabilities?: unknown[];
  };
  requiredCapabilities: unknown[];
  items: PackageArtifactItem[];
  publishedAt?: string;
  certifications?: PackageCertificationSummary[];
}

export interface DeveloperPackageSummary {
  id: string;
  namespace: string;
  name: string;
  description?: string | null;
  editability: "MANAGED" | "UNLOCKED" | "INTERNAL";
  visibility?: "PRIVATE" | "MARKETPLACE";
  status?: "ACTIVE" | "SUSPENDED" | "DELETED";
  versions: PackageVersionSummary[];
}

export interface ProjectInstallationSummary {
  id: string;
  mode: "LINKED" | "PINNED" | "FORKED" | "EMBEDDED";
  status: string;
  lock: Record<string, unknown>;
  resourceMappings: Record<string, unknown>;
  capabilityGrants: unknown[];
  package: DeveloperPackageSummary;
  packageVersion: PackageVersionSummary;
  installedAt: string;
}

export interface BuilderManifestSummary {
  id: string;
  artifactKind: string;
  portability: {
    consumerProjectKinds: Array<"APP" | "SITE">;
    installationModes: Array<"LINKED" | "PINNED" | "FORKED" | "EMBEDDED">;
  };
}

export async function listDeveloperPackages(client: ApiClient): Promise<DeveloperPackageSummary[]> {
  return (await client.get<DeveloperPackageSummary[]>("/dev/packages")) ?? [];
}

export async function certifyDeveloperPackageVersion(
  client: ApiClient,
  packageId: string,
  packageVersionId: string,
): Promise<PackageCertificationSummary> {
  return client.post(`/dev/packages/${packageId}/versions/${packageVersionId}/certify`, {});
}

export async function promoteDeveloperPackageToMarketplace(
  client: ApiClient,
  packageId: string,
  packageVersionId: string,
): Promise<DeveloperPackageSummary> {
  return client.post(`/dev/packages/${packageId}/versions/${packageVersionId}/promote-marketplace`, {});
}

export async function suspendDeveloperPackage(client: ApiClient, packageId: string): Promise<DeveloperPackageSummary> {
  return client.post(`/dev/packages/${packageId}/suspend`, {});
}

export async function reinstateDeveloperPackage(client: ApiClient, packageId: string): Promise<DeveloperPackageSummary> {
  return client.post(`/dev/packages/${packageId}/reinstate`, {});
}

export async function listBuilderManifests(client: ApiClient): Promise<BuilderManifestSummary[]> {
  return (await client.get<BuilderManifestSummary[]>("/dev/builders")) ?? [];
}

export async function installPackage(
  client: ApiClient,
  projectId: string,
  input: {
    packageVersionId: string;
    mode: "LINKED" | "PINNED" | "FORKED" | "EMBEDDED";
    resourceMappings: Record<string, string>;
    capabilityGrants: unknown[];
  },
): Promise<ProjectInstallationSummary> {
  return client.post(`/dev/projects/${projectId}/installations`, input);
}

export async function listProjectInstallations(
  client: ApiClient,
  projectId: string,
): Promise<ProjectInstallationSummary[]> {
  return (await client.get<ProjectInstallationSummary[]>(`/dev/projects/${projectId}/installations`)) ?? [];
}

// ── Validation and immutable release pipeline ──

export interface ProjectValidationSummary {
  id: string;
  sourceFingerprint: string;
  status: "RUNNING" | "PASSED" | "FAILED";
  score?: number | null;
  checks: Array<{ id: string; status: "PASS" | "FAIL"; message: string }>;
  completedAt?: string | null;
}

export interface ProjectReleaseSummary {
  id: string;
  version: string;
  status: string;
  manifestHash?: string | null;
  sourceFingerprint?: string | null;
  testScore?: number | null;
  publishedAt?: string | null;
  publishedBy?: string | null;
}

export async function listProjectValidations(client: ApiClient, projectId: string): Promise<ProjectValidationSummary[]> {
  return (await client.get<ProjectValidationSummary[]>(`/dev/projects/${projectId}/validations`)) ?? [];
}

export async function validateProject(client: ApiClient, projectId: string): Promise<ProjectValidationSummary> {
  return client.post<ProjectValidationSummary>(`/dev/projects/${projectId}/validations`, {});
}

export interface DeveloperBuildJobSummary {
  id: string;
  bullJobId?: string | null;
  jobType: string;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "FAILED";
  result?: { validationId?: string; status?: string; score?: number; sourceFingerprint?: string } | null;
  error?: string | null;
  attempts: number;
  createdAt: string;
  startedAt?: string | null;
  completedAt?: string | null;
}

export async function enqueueProjectBuild(client: ApiClient, projectId: string): Promise<{ bullJobId: string; backgroundJobId: string }> {
  return client.post(`/dev/projects/${projectId}/build-jobs`, {});
}

export async function listProjectBuildJobs(client: ApiClient, projectId: string): Promise<DeveloperBuildJobSummary[]> {
  return (await client.get<DeveloperBuildJobSummary[]>(`/dev/projects/${projectId}/build-jobs`)) ?? [];
}

export async function listProjectReleases(client: ApiClient, projectId: string): Promise<ProjectReleaseSummary[]> {
  return (await client.get<ProjectReleaseSummary[]>(`/dev/projects/${projectId}/releases`)) ?? [];
}

export interface EnvironmentOption { id: string; name: string; slug: string; type: string }
export interface ProjectEnvironmentBinding {
  id: string; environmentId: string; key: string; kind: string; reference: string;
  status: "UNVERIFIED" | "VERIFIED"; requiredCapabilities: string[]; verifiedAt?: string | null;
}
export async function listProjectEnvironmentBindings(client: ApiClient, projectId: string): Promise<ProjectEnvironmentBinding[]> {
  return (await client.get<ProjectEnvironmentBinding[]>(`/dev/projects/${projectId}/environment-bindings`)) ?? [];
}
export async function listProjectEnvironmentOptions(client: ApiClient, projectId: string): Promise<EnvironmentOption[]> {
  return (await client.get<EnvironmentOption[]>(`/dev/projects/${projectId}/environment-bindings/environment-options`)) ?? [];
}
export async function saveProjectEnvironmentBinding(client: ApiClient, projectId: string, input: Omit<ProjectEnvironmentBinding, "id" | "status" | "verifiedAt">): Promise<ProjectEnvironmentBinding> {
  return client.post<ProjectEnvironmentBinding>(`/dev/projects/${projectId}/environment-bindings`, input);
}
export async function verifyProjectEnvironmentBinding(client: ApiClient, projectId: string, environmentId: string, key: string): Promise<ProjectEnvironmentBinding> {
  return client.post<ProjectEnvironmentBinding>(`/dev/projects/${projectId}/environment-bindings/${environmentId}/${encodeURIComponent(key)}/verify`, {});
}

export interface ProjectTestRunSummary {
  id: string; sourceFingerprint: string; status: "RUNNING" | "PASSED" | "FAILED";
  summary: { suites?: number; cases?: number; passed?: number; failed?: number; results?: Array<{ id: string; status: "PASS" | "FAIL"; type: string; value: string }> };
  completedAt?: string | null;
}
export async function listProjectTestRuns(client: ApiClient, projectId: string): Promise<ProjectTestRunSummary[]> {
  return (await client.get<ProjectTestRunSummary[]>(`/dev/projects/${projectId}/test-runs`)) ?? [];
}
export async function runProjectTests(client: ApiClient, projectId: string): Promise<ProjectTestRunSummary> {
  return client.post<ProjectTestRunSummary>(`/dev/projects/${projectId}/test-runs`, {});
}

export interface ProjectSourceExport { apiVersion: string; projectId: string; sourceFingerprint: string; bundleHash: string; packages: unknown[]; artifacts: Array<{ id: string; kind: string; revision: number; contentHash: string; source: unknown }>; requiredBindings: unknown[] }
export async function exportProjectSource(client: ApiClient, projectId: string): Promise<ProjectSourceExport> {
  return client.get<ProjectSourceExport>(`/dev/projects/${projectId}/source-export`);
}
export interface ProjectSourceImportConflict { id: string; domain: "PACKAGE_LOCK" | "REQUIRED_BINDING"; key: string; change: "ADD" | "CHANGE" | "REMOVE"; current: unknown | null; incoming: unknown | null; supportedResolutions: Array<"KEEP_CURRENT" | "APPLY_INCOMING">; applyIncomingReady: boolean }
export type ProjectSourceImportResolution = "KEEP_CURRENT" | "APPLY_INCOMING" | { action: "KEEP_CURRENT" | "APPLY_INCOMING"; approvedBreaking?: boolean; resourceMappings?: Record<string, unknown>; capabilityGrants?: unknown[] };
export interface ProjectSourceImportPlan { baseFingerprint: string; bundleHash: string; requiresConfirmation: boolean; changes: { added: string[]; removed: string[]; changed: Array<{ id: string; expectedRevision: number; incomingRevision: number }> }; conflicts: ProjectSourceImportConflict[] }
export async function planProjectSourceImport(client: ApiClient, projectId: string, bundle: unknown): Promise<ProjectSourceImportPlan> { return client.post(`/dev/projects/${projectId}/source-import/plan`, { bundle }); }
export async function applyProjectSourceImport(client: ApiClient, projectId: string, bundle: unknown, resolutions: Record<string, ProjectSourceImportResolution> = {}): Promise<unknown> { return client.post(`/dev/projects/${projectId}/source-import/apply`, { bundle, confirmed: true, resolutions }); }
export interface ProjectChangeSet { id: string; branch: string; title: string; description?: string | null; bundleHash: string; baseFingerprint: string; status: "DRAFT" | "IN_REVIEW" | "APPROVED" | "MERGING" | "REJECTED" | "MERGED"; createdAt: string; submittedAt?: string | null; mergedAt?: string | null; reviews?: Array<{ id: string; reviewerId: string; decision: "APPROVED" | "REJECTED"; comment?: string | null; createdAt: string }> }
export async function listProjectChangeSets(client: ApiClient, projectId: string): Promise<ProjectChangeSet[]> { return (await client.get<ProjectChangeSet[]>(`/dev/projects/${projectId}/change-sets`)) ?? []; }
export async function createProjectChangeSet(client: ApiClient, projectId: string, input: { branch: string; title: string; description?: string; bundle: unknown }): Promise<ProjectChangeSet> { return client.post(`/dev/projects/${projectId}/change-sets`, input); }
export async function submitProjectChangeSet(client: ApiClient, projectId: string, id: string): Promise<ProjectChangeSet> { return client.post(`/dev/projects/${projectId}/change-sets/${id}/submit`, {}); }
export async function reviewProjectChangeSet(client: ApiClient, projectId: string, id: string, decision: "APPROVED" | "REJECTED"): Promise<ProjectChangeSet> { return client.post(`/dev/projects/${projectId}/change-sets/${id}/reviews`, { decision }); }
export async function mergeProjectChangeSet(client: ApiClient, projectId: string, id: string): Promise<unknown> { return client.post(`/dev/projects/${projectId}/change-sets/${id}/merge`, {}); }
export interface ProjectPreviewSession { id: string; token?: string; sourceFingerprint: string; context: { role?: string; locale?: string; device?: "desktop" | "tablet" | "mobile"; fixture?: string }; status?: "PENDING" | "ACTIVE" | "FAILED" | "REVOKED" | string; expiresAt: string; createdAt?: string; job?: { backgroundJobId: string; bullJobId: string } }
export async function createProjectPreview(client: ApiClient, projectId: string, context: ProjectPreviewSession["context"]): Promise<ProjectPreviewSession> { return client.post(`/dev/projects/${projectId}/previews`, context); }
export async function listProjectPreviews(client: ApiClient, projectId: string): Promise<ProjectPreviewSession[]> { return (await client.get<ProjectPreviewSession[]>(`/dev/projects/${projectId}/previews`)) ?? []; }
export async function revokeProjectPreview(client: ApiClient, projectId: string, previewId: string): Promise<unknown> { return client.delete(`/dev/projects/${projectId}/previews/${previewId}`); }
export type DeveloperGovernorDimension = "artifacts" | "packages" | "bindings" | "sourceBytes" | "previewSessions";
export type DeveloperGovernorLimits = Partial<Record<DeveloperGovernorDimension, { soft: number; hard: number }>>;
export interface DeveloperWorkloadUsage { metric: "DEVELOPER_PREVIEW_SESSION" | "DEVELOPER_VALIDATION_BUILD"; currentValue: number; limitValue: number; updatedAt?: string }
export async function getDeveloperEntitlements(client: ApiClient): Promise<DeveloperGovernorLimits> { return (await client.get<DeveloperGovernorLimits>("/dev/governance/entitlements")) ?? {}; }
export async function saveDeveloperEntitlements(client: ApiClient, limits: DeveloperGovernorLimits): Promise<DeveloperGovernorLimits> { return client.post<DeveloperGovernorLimits>("/dev/governance/entitlements", limits); }
export async function getDeveloperWorkloadUsage(client: ApiClient): Promise<DeveloperWorkloadUsage[]> { return (await client.get<DeveloperWorkloadUsage[]>("/dev/governance/workload-usage")) ?? []; }
export interface DeveloperAuditEvent { id: string; action: string; actorId?: string | null; metadata: Record<string, unknown>; createdAt: string }
export async function listDeveloperAuditEvents(client: ApiClient, projectId: string): Promise<DeveloperAuditEvent[]> { return (await client.get<DeveloperAuditEvent[]>(`/dev/projects/${projectId}/audit-events`)) ?? []; }

export async function deployProjectRelease(client: ApiClient, projectId: string, input: { releaseId: string; environmentId: string; strategy: "ROLLING" | "BLUE_GREEN" | "CANARY" | "RECREATE" }): Promise<unknown> {
  return client.post(`/dev/projects/${projectId}/deployments`, input);
}
export async function approveProjectRelease(client: ApiClient, projectId: string, releaseId: string): Promise<unknown> {
  return client.post(`/dev/projects/${projectId}/releases/${releaseId}/approvals`, {});
}
