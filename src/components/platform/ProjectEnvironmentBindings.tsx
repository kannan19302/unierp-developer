"use client";

import { FormEvent, useState } from "react";
import { useApiClient } from "@kannan19302/framework";
import { Button } from "@kannan19302/ui";
import { CheckCircle2, Link2, Plus } from "lucide-react";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { listProjectEnvironmentBindings, listProjectEnvironmentOptions, saveProjectEnvironmentBinding, verifyProjectEnvironmentBinding } from "@/platform/data/projects";
import styles from "./project-overview.module.css";

export function ProjectEnvironmentBindings({ projectId }: { projectId: string }) {
  const client = useApiClient();
  const bindings = useAsyncData(() => listProjectEnvironmentBindings(client, projectId), [projectId]);
  const environments = useAsyncData(() => listProjectEnvironmentOptions(client, projectId), [projectId]);
  const [open, setOpen] = useState(false); const [saving, setSaving] = useState(false); const [error, setError] = useState<string | null>(null);
  const [environmentId, setEnvironmentId] = useState(""); const [key, setKey] = useState(""); const [kind, setKind] = useState("SECRET"); const [reference, setReference] = useState("");
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setSaving(true); setError(null);
    try { await saveProjectEnvironmentBinding(client, projectId, { environmentId, key, kind, reference, requiredCapabilities: [`binding:${key}`] }); setOpen(false); setKey(""); setReference(""); await bindings.refetch(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Could not save binding"); }
    finally { setSaving(false); }
  };
  const verify = async (item: { environmentId: string; key: string }) => { setError(null); try { await verifyProjectEnvironmentBinding(client, projectId, item.environmentId, item.key); await bindings.refetch(); } catch (reason) { setError(reason instanceof Error ? reason.message : "Could not verify binding"); } };
  const envName = (id: string) => environments.data?.find((environment) => environment.id === id)?.name ?? id;
  return <section className={styles.section}>
    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: "var(--space-4)" }}>
      <div><h2 className={styles.section_title}>Environment bindings</h2><p className={styles.section_hint}>Reference secrets and services by vault or connector locator. Values are never stored here.</p></div>
      <Button variant="secondary" size="sm" leftIcon={<Plus size={14} />} onClick={() => { setOpen(true); if (!environmentId && environments.data?.[0]) setEnvironmentId(environments.data[0].id); }}>Add binding</Button>
    </div>
    {open && <form onSubmit={submit} className={styles.changes} style={{ padding: "var(--space-3)", marginTop: "var(--space-3)" }}>
      <select aria-label="Environment" value={environmentId} onChange={(event) => setEnvironmentId(event.target.value)} required><option value="">Choose environment</option>{(environments.data ?? []).map((environment) => <option key={environment.id} value={environment.id}>{environment.name} · {environment.type}</option>)}</select>
      <input aria-label="Binding key" value={key} onChange={(event) => setKey(event.target.value)} placeholder="crm" required />
      <select aria-label="Binding kind" value={kind} onChange={(event) => setKind(event.target.value)}><option>SECRET</option><option>SERVICE</option><option>CONNECTOR</option><option>CERTIFICATE</option></select>
      <input aria-label="Vault or service reference" value={reference} onChange={(event) => setReference(event.target.value)} placeholder="vault://tenant/prod/crm" required />
      <div style={{ display: "flex", gap: "var(--space-2)" }}><Button type="submit" size="sm" disabled={saving}>{saving ? "Saving…" : "Save reference"}</Button><Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button></div>
    </form>}
    {error && <div className={styles.empty}>{error}</div>}
    {bindings.loading ? <div className={styles.empty}>Loading bindings…</div> : (bindings.data ?? []).length === 0 ? <div className={styles.empty}>No bindings. Releases with connector or secret requirements cannot deploy until their environment references are verified.</div> : <div className={styles.changes}>
      {(bindings.data ?? []).map((item) => <div key={item.id} className={styles.change}>
        <div className={styles.change_main}><Link2 size={15} /><span className={styles.change_name}>{item.key}</span><span className={styles.change_when}>{envName(item.environmentId)} · {item.reference}</span></div>
        {item.status === "VERIFIED" ? <span className={styles.origin}><CheckCircle2 size={13} /> Verified</span> : <Button variant="ghost" size="sm" onClick={() => verify(item)}>Verify</Button>}
      </div>)}
    </div>}
  </section>;
}
