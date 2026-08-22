"use client";

import { useState } from "react";
import { useApiClient } from "@kannan19302/framework";
import { Button } from "@kannan19302/ui";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { approveProjectRelease, deployProjectRelease, enqueueProjectBuild, listProjectBuildJobs, listProjectEnvironmentOptions, listProjectReleases, listProjectValidations, validateProject } from "@/platform/data/projects";
import { relativeTime } from "./relative-time";
import styles from "./project-overview.module.css";

export function ProjectReleasePanel({ projectId }: { projectId: string }) {
  const client = useApiClient();
  const validations = useAsyncData(() => listProjectValidations(client, projectId), [projectId]);
  const releases = useAsyncData(() => listProjectReleases(client, projectId), [projectId]);
  const environments = useAsyncData(() => listProjectEnvironmentOptions(client, projectId), [projectId]);
  const buildJobs = useAsyncData(() => listProjectBuildJobs(client, projectId), [projectId]);
  const [validating, setValidating] = useState(false);
  const [queueing, setQueueing] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [approving, setApproving] = useState<string | null>(null);
  const [releaseId, setReleaseId] = useState("");
  const [environmentId, setEnvironmentId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const latest = validations.data?.[0];

  const runValidation = async () => {
    setValidating(true); setError(null);
    try { await validateProject(client, projectId); await validations.refetch(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Validation failed"); }
    finally { setValidating(false); }
  };
  const queueBuild = async () => {
    setQueueing(true); setError(null);
    try { await enqueueProjectBuild(client, projectId); await buildJobs.refetch(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Could not queue validation"); }
    finally { setQueueing(false); }
  };
  const deploy = async () => {
    if (!releaseId || !environmentId) return;
    setDeploying(true); setError(null);
    try { await deployProjectRelease(client, projectId, { releaseId, environmentId, strategy: "ROLLING" }); await releases.refetch(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Deployment failed"); }
    finally { setDeploying(false); }
  };
  const approve = async (id: string) => { setApproving(id); setError(null); try { await approveProjectRelease(client, projectId, id); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not record approval"); } finally { setApproving(null); } };

  return (
    <section className={styles.section}>
      <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: "var(--space-4)" }}>
        <div>
          <h2 className={styles.section_title}>Release readiness</h2>
          <p className={styles.section_hint}>Compile and validate the exact package lock and artifact revisions before signing a release.</p>
        </div>
        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Button variant="secondary" size="sm" leftIcon={<ShieldCheck size={14} />} onClick={queueBuild} disabled={queueing}>
            {queueing ? "Queueing…" : "Queue validation"}
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<ShieldCheck size={14} />} onClick={runValidation} disabled={validating}>
            {validating ? "Validating…" : "Validate now"}
          </Button>
        </div>
      </div>
      {error && <div className={styles.empty}>{error}</div>}
      {latest && (
        <div className={styles.changes} style={{ marginBottom: "var(--space-4)" }}>
          <div className={styles.change}>
            <div className={styles.change_main}>
              <span className={styles.change_name}>Latest validation</span>
              <span className={styles.change_when}>{latest.sourceFingerprint.slice(0, 12)}…</span>
            </div>
            <span className={latest.status === "PASSED" ? styles.origin : `${styles.origin} ${styles.origin_attached}`}>
              {latest.status} · {latest.score ?? 0}%
            </span>
            <span className={styles.change_when}>{latest.completedAt ? relativeTime(latest.completedAt) : "Running"}</span>
          </div>
        </div>
      )}
      {(buildJobs.data ?? []).length > 0 && (
        <div className={styles.changes} style={{ marginBottom: "var(--space-4)" }}>
          {(buildJobs.data ?? []).slice(0, 3).map((job) => (
            <div key={job.id} className={styles.change}>
              <div className={styles.change_main}><span className={styles.change_name}>Durable validation build</span><span className={styles.change_when}>{job.bullJobId ? `job ${job.bullJobId}` : "admitting"}</span></div>
              <span className={job.status === "COMPLETED" ? styles.origin : `${styles.origin} ${styles.origin_attached}`}>{job.status}{job.result?.score !== undefined ? ` · ${job.result.score}%` : ""}</span>
              <span className={styles.change_when}>{job.error ?? relativeTime(job.createdAt)}</span>
            </div>
          ))}
        </div>
      )}
      <h3 className={styles.section_title} style={{ fontSize: "0.875rem" }}>Signed releases</h3>
      {releases.loading ? <div className={styles.empty}>Loading releases…</div> : (releases.data ?? []).length === 0 ? (
        <div className={styles.empty}>No signed releases yet. After validation, sign the generated manifest hash with an active tenant Ed25519 key.</div>
      ) : (
        <div className={styles.changes}>
          {(releases.data ?? []).slice(0, 5).map((release) => (
            <div key={release.id} className={styles.change}>
              <div className={styles.change_main}><CheckCircle2 size={15} /><span className={styles.change_name}>v{release.version}</span><span className={styles.change_when}>{release.manifestHash?.slice(0, 12)}…</span></div>
              <span className={styles.origin}>{release.status}</span>
              {release.status === "PUBLISHED" && <Button variant="ghost" size="sm" onClick={() => approve(release.id)} disabled={approving === release.id}>{approving === release.id ? "Approving…" : "Approve"}</Button>}
              <span className={styles.change_when}>{release.publishedAt ? relativeTime(release.publishedAt) : "Draft"}</span>
            </div>
          ))}
        </div>
      )}
      {(releases.data ?? []).length > 0 && <div className={styles.changes} style={{ padding: "var(--space-3)", marginTop: "var(--space-3)" }}>
        <span className={styles.section_hint}>Deploy a signed release</span>
        <select aria-label="Signed release" value={releaseId} onChange={(event) => setReleaseId(event.target.value)}><option value="">Choose release</option>{(releases.data ?? []).filter((release) => release.status === "PUBLISHED").map((release) => <option key={release.id} value={release.id}>v{release.version}</option>)}</select>
        <select aria-label="Environment" value={environmentId} onChange={(event) => setEnvironmentId(event.target.value)}><option value="">Choose environment</option>{(environments.data ?? []).map((environment) => <option key={environment.id} value={environment.id}>{environment.name} · {environment.type}</option>)}</select>
        <Button variant="primary" size="sm" onClick={deploy} disabled={!releaseId || !environmentId || deploying}>{deploying ? "Deploying…" : "Deploy"}</Button>
      </div>}
    </section>
  );
}
