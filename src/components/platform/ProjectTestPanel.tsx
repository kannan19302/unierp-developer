"use client";

import { useState } from "react";
import { useApiClient } from "@kannan19302/framework";
import { Button } from "@kannan19302/ui";
import { CircleCheck, CircleX, FlaskConical } from "lucide-react";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { listProjectTestRuns, runProjectTests } from "@/platform/data/projects";
import { relativeTime } from "./relative-time";
import styles from "./project-overview.module.css";

export function ProjectTestPanel({ projectId }: { projectId: string }) {
  const client = useApiClient();
  const runs = useAsyncData(() => listProjectTestRuns(client, projectId), [projectId]);
  const [running, setRunning] = useState(false); const [error, setError] = useState<string | null>(null);
  const run = async () => { setRunning(true); setError(null); try { await runProjectTests(client, projectId); await runs.refetch(); } catch (reason) { setError(reason instanceof Error ? reason.message : "Test run failed"); } finally { setRunning(false); } };
  const latest = runs.data?.[0];
  return <section className={styles.section}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: "var(--space-4)" }}>
      <div><h2 className={styles.section_title}>Tests</h2><p className={styles.section_hint}>Run test-suite artifacts against the exact current revision and package lock.</p></div>
      <Button variant="secondary" size="sm" leftIcon={<FlaskConical size={14} />} disabled={running} onClick={run}>{running ? "Running…" : "Run tests"}</Button>
    </div>
    {error && <div className={styles.empty}>{error}</div>}
    {runs.loading ? <div className={styles.empty}>Loading test evidence…</div> : !latest ? <div className={styles.empty}>No project test runs yet. Add a Test Suite artifact, then run it here before publishing.</div> : <div className={styles.changes}>
      <div className={styles.change}>
        <div className={styles.change_main}>{latest.status === "PASSED" ? <CircleCheck size={16} /> : <CircleX size={16} />}<span className={styles.change_name}>Latest run</span><span className={styles.change_when}>{latest.sourceFingerprint.slice(0, 12)}…</span></div>
        <span className={latest.status === "PASSED" ? styles.origin : `${styles.origin} ${styles.origin_attached}`}>{latest.status} · {latest.summary.passed ?? 0}/{latest.summary.cases ?? 0}</span>
        <span className={styles.change_when}>{latest.completedAt ? relativeTime(latest.completedAt) : "Running"}</span>
      </div>
      {(latest.summary.results ?? []).filter((result) => result.status === "FAIL").map((result) => <div key={result.id} className={styles.change}><div className={styles.change_main}><CircleX size={14} /><span className={styles.change_name}>{result.id}</span><span className={styles.change_when}>{result.type}: {result.value}</span></div><span className={`${styles.origin} ${styles.origin_attached}`}>Failed</span></div>)}
    </div>}
  </section>;
}
