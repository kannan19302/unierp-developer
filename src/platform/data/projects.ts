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
