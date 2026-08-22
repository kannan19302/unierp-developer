"use client";
import { ChangeEvent, useState } from "react";
import { useApiClient } from "@kannan19302/framework";
import { Button } from "@kannan19302/ui";
import { GitPullRequest } from "lucide-react";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { createProjectChangeSet, listProjectChangeSets, mergeProjectChangeSet, reviewProjectChangeSet, submitProjectChangeSet } from "@/platform/data/projects";
import styles from "./project-overview.module.css";

export function ProjectChangeSetsPanel({ projectId }: { projectId: string }) {
  const client = useApiClient(); const changes = useAsyncData(() => listProjectChangeSets(client, projectId), [projectId]);
  const [bundle, setBundle] = useState<unknown>(null); const [branch, setBranch] = useState("feature/source-change"); const [title, setTitle] = useState(""); const [busy, setBusy] = useState<string | null>(null); const [error, setError] = useState<string | null>(null);
  const choose = async (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; try { setBundle(JSON.parse(await file.text())); setError(null); } catch { setBundle(null); setError("Changesets require a valid canonical source JSON file."); } };
  const act = async (key: string, action: () => Promise<unknown>) => { setBusy(key); setError(null); try { await action(); await changes.refetch(); } catch (reason) { setError(reason instanceof Error ? reason.message : "Changeset action failed."); } finally { setBusy(null); } };
  return <section className={styles.section}>
    <div><h2 className={styles.section_title}>Source changesets</h2><p className={styles.section_hint}>Review hash-pinned source changes before they alter this project. Merges fail safely if the base composition changed.</p></div>
    {error && <div className={styles.empty}>{error}</div>}
    <div className={styles.changes} style={{ padding: "var(--space-3)", marginTop: "var(--space-3)" }}><input aria-label="Changeset source bundle" type="file" accept="application/json,.json" onChange={choose} /><input aria-label="Changeset branch" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="feature/…" /><input aria-label="Changeset title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Describe the change" /><Button variant="secondary" size="sm" disabled={!bundle || title.trim().length < 3 || Boolean(busy)} onClick={() => act("create", () => createProjectChangeSet(client, projectId, { branch, title, bundle }))}>{busy === "create" ? "Creating…" : "Create changeset"}</Button></div>
    {changes.loading ? <div className={styles.empty}>Loading changesets…</div> : (changes.data ?? []).length === 0 ? <div className={styles.empty}>No source changesets yet.</div> : <div className={styles.changes}>{(changes.data ?? []).slice(0, 10).map((change) => <div className={styles.change} key={change.id}><div className={styles.change_main}><GitPullRequest size={15} /><span className={styles.change_name}>{change.title}</span><span className={styles.change_when}>{change.branch} · {change.bundleHash.slice(0, 10)}…</span></div><span className={styles.origin}>{change.status}</span>{change.status === "DRAFT" && <Button variant="ghost" size="sm" disabled={Boolean(busy)} onClick={() => act(`submit:${change.id}`, () => submitProjectChangeSet(client, projectId, change.id))}>Submit</Button>}{change.status === "IN_REVIEW" && <><Button variant="ghost" size="sm" disabled={Boolean(busy)} onClick={() => act(`approve:${change.id}`, () => reviewProjectChangeSet(client, projectId, change.id, "APPROVED"))}>Approve</Button><Button variant="ghost" size="sm" disabled={Boolean(busy)} onClick={() => act(`reject:${change.id}`, () => reviewProjectChangeSet(client, projectId, change.id, "REJECTED"))}>Reject</Button></>}{change.status === "APPROVED" && <Button variant="primary" size="sm" disabled={Boolean(busy)} onClick={() => act(`merge:${change.id}`, () => mergeProjectChangeSet(client, projectId, change.id))}>Merge</Button>}</div>)}</div>}
  </section>;
}
