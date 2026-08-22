"use client";

/**
 * `<ProjectOverview>` — the landing inside one App or one Site.
 *
 * What replaced what: both landings used to be a `<PageHeader>` and the
 * sentence "Pick a builder from the left to start authoring." That was honest
 * when it was written — plan phase P3 had not shipped, so there was nothing
 * to count. P3 shipped (`BuilderArtifact`, `ArtifactRegistryService`,
 * `/dev/projects/:id/artifacts`), and this reads that endpoint.
 *
 * Every number here is derived from artifacts the API actually returns. There
 * is deliberately no "health", no uptime, no sparkline of traffic: this app
 * does not produce that data, and a dashboard whose tiles are plausible but
 * unsourced is worse than a smaller one that is true. When P6's
 * `ProjectRelease` history is queryable per project, a release strip belongs
 * here; it is not stubbed in the meantime.
 *
 * ── The one distinction worth the space ──
 * Owned vs attached. An artifact whose `ownerProjectId` is not this project
 * is a library artifact that has been ATTACHED here — editing it changes it
 * for every other app it is attached to. That is the single most surprising
 * fact about the artifact model, so the strip states it as a number and each
 * row states it as a word, rather than leaving someone to discover it by
 * editing a shared form.
 */

import Link from "next/link";
import { useApiClient } from "@kannan19302/framework";
import { ArtifactAddress, Button } from "@kannan19302/ui";
import { ArrowUpRight, Plus } from "lucide-react";
import { useAsyncData } from "@/platform/data/useAsyncData";
import {
  listProjectArtifacts,
  listProjectInstallations,
  type ArtifactSummary,
  type ProjectSummary,
} from "@/platform/data/projects";
import {
  resolveBuilders,
  isBuilderSurface,
  type BuilderScope,
} from "@/platform/builders";
import { resolveIcon } from "@/platform/icons";
import { permits } from "@/platform/permissions";
import { usePermissions } from "@kannan19302/shared/auth-client/react";
import { relativeTime } from "./relative-time";
import styles from "./project-overview.module.css";
import { ProjectReleasePanel } from "./ProjectReleasePanel";
import { ProjectEnvironmentBindings } from "./ProjectEnvironmentBindings";
import { ProjectTestPanel } from "./ProjectTestPanel";
import { ProjectSourcePanel } from "./ProjectSourcePanel";
import { ProjectPreviewPanel } from "./ProjectPreviewPanel";
import { ProjectAuditPanel } from "./ProjectAuditPanel";
import { ProjectChangeSetsPanel } from "./ProjectChangeSetsPanel";

export interface ProjectOverviewProps {
  project: ProjectSummary;
  scope: BuilderScope & ("app" | "site");
}

export function ProjectOverview({ project, scope }: ProjectOverviewProps) {
  const client = useApiClient();
  const { permissions } = usePermissions();
  const artifacts = useAsyncData(
    () => listProjectArtifacts(client, project.id),
    [project.id],
  );
  const installations = useAsyncData(
    () => listProjectInstallations(client, project.id),
    [project.id],
  );

  const base = scope === "app" ? `/apps/${project.id}` : `/sites/${project.id}`;
  const rows: ArtifactSummary[] = artifacts.data ?? [];

  // `ownerProjectId === project.id` is ownership; anything else — null for a
  // library artifact, another id for one owned elsewhere — is attachment.
  // Comparing against this project rather than against null is what keeps
  // this correct for an artifact owned by a different app.
  const owned = rows.filter((a) => a.ownerProjectId === project.id);
  const attached = rows.filter((a) => a.ownerProjectId !== project.id);

  const lastChange = rows.reduce<string | undefined>((latest, a) => {
    if (!a.updatedAt) return latest;
    return !latest || a.updatedAt > latest ? a.updatedAt : latest;
  }, undefined);

  // Counts per builder come from the registry's own `artifactType`, so the
  // mapping from an artifact row to the surface that edits it is the same
  // one the router and the command palette use. A local
  // TYPE_TO_SEGMENT constant here would be a sixth parallel list —
  // exactly what `check:nav` exists to prevent.
  const surfaces = resolveBuilders(scope, permissions, permits).filter(
    isBuilderSurface,
  );
  const countByType = rows.reduce<Record<string, number>>((acc, a) => {
    acc[a.artifactType] = (acc[a.artifactType] ?? 0) + 1;
    return acc;
  }, {});

  const recent = [...rows]
    .filter((a) => a.updatedAt)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 6);

  const loading = artifacts.loading;

  return (
    <div className={styles.wrap}>
      <header className={styles.head}>
        <h1 className={styles.title}>{project.name}</h1>
        {project.description && (
          <p className={styles.desc}>{project.description}</p>
        )}
      </header>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <p className={styles.stat_label}>Artifacts</p>
          <div className={styles.stat_value}>{loading ? "—" : rows.length}</div>
        </div>
        <div className={styles.stat}>
          <p className={styles.stat_label}>Built here</p>
          <div className={styles.stat_value}>{loading ? "—" : owned.length}</div>
          <p className={styles.stat_note}>Owned by this {scope}</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.stat_label}>Attached</p>
          <div
            className={
              attached.length === 0
                ? `${styles.stat_value} ${styles.stat_value_muted}`
                : styles.stat_value
            }
          >
            {loading ? "—" : attached.length}
          </div>
          <p className={styles.stat_note}>
            {attached.length === 0
              ? "Nothing from the library"
              : "Shared — edits reach every app using them"}
          </p>
        </div>
        <div className={styles.stat}>
          <p className={styles.stat_label}>Last change</p>
          <div className={`${styles.stat_value} ${styles.stat_value_muted}`}>
            <span style={{ fontSize: "1.125rem" }}>
              {loading ? "—" : lastChange ? relativeTime(lastChange) : "Never"}
            </span>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.section_title}>Installed packages</h2>
        <p className={styles.section_hint}>
          Immutable Library versions composed into this {scope}.
        </p>
        {installations.loading ? (
          <div className={styles.empty}>Loading installations…</div>
        ) : installations.error ? (
          <div className={styles.empty}>
            Could not load installations: {installations.error.message}
          </div>
        ) : (installations.data ?? []).length === 0 ? (
          <div className={styles.empty}>
            No packages installed. Browse the Library to add a compatible signed version.
            <div style={{ marginTop: "var(--space-3)" }}>
              <Link href="/library">
                <Button variant="secondary" size="sm" leftIcon={<ArrowUpRight size={14} />}>
                  Add from Library
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.changes}>
            {(installations.data ?? []).map((installation) => (
              <div key={installation.id} className={styles.change}>
                <div className={styles.change_main}>
                  <span className={styles.change_name}>{installation.package.name}</span>
                  <span className={styles.change_when}>{installation.package.namespace}</span>
                </div>
                <span className={`${styles.origin} ${styles.origin_attached}`}>
                  {installation.mode.toLowerCase()}
                </span>
                <span className={styles.change_when}>
                  v{installation.packageVersion.version}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <ProjectReleasePanel projectId={project.id} />

      <ProjectEnvironmentBindings projectId={project.id} />

      <ProjectTestPanel projectId={project.id} />

      <ProjectSourcePanel projectId={project.id} />

      <ProjectChangeSetsPanel projectId={project.id} />

      <ProjectPreviewPanel projectId={project.id} />

      <ProjectAuditPanel projectId={project.id} />

      <section className={styles.section}>
        <h2 className={styles.section_title}>Builders</h2>
        <p className={styles.section_hint}>
          What this {scope} can hold, and how much of it there is.
        </p>
        <div className={styles.tiles}>
          {surfaces.map((def) => {
            const Icon = resolveIcon(def.icon);
            const count = countByType[def.artifactType] ?? 0;
            const planned = def.status === "planned";

            const inner = (
              <>
                <div className={styles.tile_top}>
                  <Icon size={17} aria-hidden="true" />
                  {planned ? (
                    <span className={styles.tile_tag}>Soon</span>
                  ) : (
                    <span
                      className={
                        count === 0
                          ? `${styles.tile_count} ${styles.tile_count_zero}`
                          : styles.tile_count
                      }
                    >
                      {loading ? "·" : count === 0 ? "—" : count}
                    </span>
                  )}
                </div>
                <span className={styles.tile_name}>{def.label}</span>
                <span className={styles.tile_desc}>
                  {planned ? def.plannedReason : def.description}
                </span>
              </>
            );

            return planned ? (
              <div
                key={def.id}
                className={styles.tile_disabled}
                title={def.plannedReason}
                aria-disabled="true"
              >
                {inner}
              </div>
            ) : (
              <Link
                key={def.id}
                href={`${base}/${def.segment}`}
                className={styles.tile}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section_title}>Recent changes</h2>
        <p className={styles.section_hint}>
          The last six artifacts edited in this {scope}.
        </p>

        {loading ? (
          <div className={styles.empty}>Loading artifacts…</div>
        ) : artifacts.error ? (
          <div className={styles.empty}>
            Could not load artifacts: {artifacts.error.message}{" "}
            <Button variant="ghost" size="sm" onClick={artifacts.refetch}>
              Try again
            </Button>
          </div>
        ) : recent.length === 0 ? (
          <div className={styles.empty}>
            Nothing built here yet. Pick a builder above to start, or attach
            something from the library.
            <div style={{ marginTop: "var(--space-3)", display: "flex", gap: "var(--space-2)" }}>
              <Link href="/library">
                <Button variant="secondary" size="sm" leftIcon={<ArrowUpRight size={14} />}>
                  Browse library
                </Button>
              </Link>
              {surfaces[0] && !("plannedReason" in surfaces[0] && surfaces[0].status === "planned") && (
                <Link href={`${base}/${surfaces[0].segment}`}>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
                    New {surfaces[0].label.toLowerCase()}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.changes}>
            {recent.map((a) => {
              const owner = a.ownerProjectId === project.id;
              const surface = surfaces.find(
                (s) => s.artifactType === a.artifactType,
              );
              return (
                <div key={a.id} className={styles.change}>
                  <div className={styles.change_main}>
                    <span className={styles.change_name}>{a.name}</span>
                    <ArtifactAddress
                      scope={owner ? scope : "library"}
                      project={owner ? project.id : null}
                      builder={surface?.segment}
                      artifact={a.slug ?? a.artifactId}
                      size="sm"
                      href={
                        surface ? `${base}/${surface.segment}/${a.artifactId}` : undefined
                      }
                    />
                  </div>
                  <span
                    className={
                      owner
                        ? styles.origin
                        : `${styles.origin} ${styles.origin_attached}`
                    }
                    title={
                      owner
                        ? `Built in this ${scope}.`
                        : "Owned by the library — edits reach every project it is attached to."
                    }
                  >
                    {owner ? "Built here" : "Attached"}
                  </span>
                  <span className={styles.change_when}>
                    {relativeTime(a.updatedAt)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
