"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@kannan19302/ui";
import { useApiClient } from "@kannan19302/framework";
import { getDeveloperEntitlements, getDeveloperWorkloadUsage, saveDeveloperEntitlements, type DeveloperGovernorDimension, type DeveloperGovernorLimits, type DeveloperWorkloadUsage } from "@/platform/data/projects";

const dimensions: Array<{ key: DeveloperGovernorDimension; label: string; description: string }> = [
  { key: "artifacts", label: "Artifacts", description: "Canonical assets permitted across projects and the library." },
  { key: "packages", label: "Packages", description: "Published or installed developer packages." },
  { key: "bindings", label: "Environment bindings", description: "Runtime dependency bindings across projects." },
  { key: "sourceBytes", label: "Source bytes", description: "Imported and authored source retained by the platform." },
  { key: "previewSessions", label: "Concurrent previews", description: "Queued or active isolated preview sessions." },
];

export default function DeveloperGovernancePage() {
  const client = useApiClient();
  const [limits, setLimits] = useState<DeveloperGovernorLimits>({});
  const [usage, setUsage] = useState<DeveloperWorkloadUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setMessage(null);
    try {
      const [nextLimits, nextUsage] = await Promise.all([getDeveloperEntitlements(client), getDeveloperWorkloadUsage(client)]);
      setLimits(nextLimits); setUsage(nextUsage);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not load developer governance"); }
    finally { setLoading(false); }
  }, [client]);
  useEffect(() => { void load(); }, [load]);

  const update = (key: DeveloperGovernorDimension, field: "soft" | "hard", raw: string) => {
    const value = Math.max(0, Number.parseInt(raw, 10) || 0);
    setLimits((current) => ({ ...current, [key]: { soft: current[key]?.soft ?? 0, hard: current[key]?.hard ?? 0, [field]: value } }));
  };
  const save = async () => {
    setSaving(true); setMessage(null);
    try { await saveDeveloperEntitlements(client, limits); setMessage("Developer governor limits saved."); await load(); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Could not save developer governor limits"); }
    finally { setSaving(false); }
  };

  return <div className="p-6 ui-stack-5">
    <PageHeader title="Developer Governance" description="Capacity guardrails and durable workload evidence for every project, library and builder." actions={<button className="ui-btn ui-btn-primary" onClick={save} disabled={loading || saving}>{saving ? "Saving…" : "Save limits"}</button>} />
    {message && <div className="ui-card" role="status" style={{ padding: "var(--space-3)" }}>{message}</div>}
    <section className="ui-card" style={{ padding: "var(--space-4)" }}>
      <h2 style={{ marginTop: 0 }}>Governor limits</h2>
      <p style={{ color: "var(--color-text-muted)" }}>Soft limits create an operational warning. Hard limits reject new work before capacity or cost becomes unsafe.</p>
      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        {dimensions.map(({ key, label, description }) => <div key={key} style={{ display: "grid", gridTemplateColumns: "minmax(var(--size-control-min, 180px), 1fr) 7.5rem 7.5rem", gap: "var(--space-3)", alignItems: "center" }}>
          <div><strong>{label}</strong><div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{description}</div></div>
          <label className="ui-form-group">Soft<input aria-label={`${label} soft limit`} className="ui-input" type="number" min="0" value={limits[key]?.soft ?? 0} onChange={(event) => update(key, "soft", event.target.value)} /></label>
          <label className="ui-form-group">Hard<input aria-label={`${label} hard limit`} className="ui-input" type="number" min="0" value={limits[key]?.hard ?? 0} onChange={(event) => update(key, "hard", event.target.value)} /></label>
        </div>)}
      </div>
    </section>
    <section className="ui-card" style={{ padding: "var(--space-4)" }}>
      <h2 style={{ marginTop: 0 }}>Workload evidence</h2>
      <p style={{ color: "var(--color-text-muted)" }}>Idempotent ledger totals; a worker retry never adds a second billable or capacity event.</p>
      {loading ? <div>Loading workload evidence…</div> : usage.length === 0 ? <div>No developer workload has been recorded yet.</div> : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(var(--size-card-min, 220px), 1fr))", gap: "var(--space-3)" }}>{usage.map((item) => <div key={item.metric} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "var(--space-3)" }}><strong>{item.metric === "DEVELOPER_PREVIEW_SESSION" ? "Preview sessions" : "Validation builds"}</strong><div style={{ fontSize: "var(--text-lg)", marginTop: "var(--space-1)" }}>{item.currentValue.toLocaleString()}</div><div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>Ledger events{item.updatedAt ? ` · updated ${new Date(item.updatedAt).toLocaleString()}` : ""}</div></div>)}</div>}
    </section>
  </div>;
}
