"use client";
import { useApiClient } from "@kannan19302/framework";
import { ScrollText } from "lucide-react";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { listDeveloperAuditEvents } from "@/platform/data/projects";
import { relativeTime } from "./relative-time";
import styles from "./project-overview.module.css";
export function ProjectAuditPanel({ projectId }: { projectId: string }) {
  const client = useApiClient(); const events = useAsyncData(() => listDeveloperAuditEvents(client, projectId), [projectId]);
  return <section className={styles.section}><div style={{ display: "flex", alignItems: "start", gap: "var(--space-2)" }}><ScrollText size={17} /><div><h2 className={styles.section_title}>Lifecycle audit</h2><p className={styles.section_hint}>Recent validation, release, deployment, and approval evidence. Secret values and source payloads are excluded.</p></div></div>{events.loading ? <div className={styles.empty}>Loading audit events…</div> : (events.data ?? []).length === 0 ? <div className={styles.empty}>No lifecycle audit events yet.</div> : <div className={styles.changes}>{(events.data ?? []).slice(0, 10).map((event) => <div key={event.id} className={styles.change}><div className={styles.change_main}><span className={styles.change_name}>{event.action.replaceAll("_", " ")}</span><span className={styles.change_when}>{event.actorId ?? "System"}</span></div><span className={styles.change_when}>{relativeTime(event.createdAt)}</span></div>)}</div>}</section>;
}
