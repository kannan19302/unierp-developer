"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Globe,
  LayoutGrid,
  Layers,
  FileCode2,
  Workflow,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  Search,
  ExternalLink,
  MoreVertical,
  Pin,
  Folder,
  ChevronRight,
  ChevronDown,
  Sparkles,
  BookOpen,
  Database,
  Tag,
  Puzzle,
  ShoppingBag,
  UserCheck,
  Check,
  Code2,
  Laptop,
  Smartphone,
  Eye,
  Settings,
  HelpCircle,
  Download,
  Upload,
  RefreshCw,
  Archive,
  Lock,
  Play,
  Filter,
  Save,
  Trash2,
  Copy,
  Table,
  Columns,
  Grid,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  GitBranch,
  FileText,
  Mail,
  Send,
  Users,
  Sliders,
  Maximize2,
  Key,
  Radio,
  Share2,
  Zap,
  GitPullRequest,
  CheckCheck,
  XCircle,
  AlertCircle,
  Terminal,
} from "lucide-react";
import { ScreenContainer } from "../ScreenContainer";
import styles from "./Journey01.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// DP-092: Manage workspace (092_manage.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP092() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-092" activeTabId="manage-workspace">
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Workspace Management &amp; Operations</h1>
            <p className={styles.subtitle}>Configure organization-wide security, tenant boundaries, governance, and audit trails.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-101")}><FileText size={14} /> Audit Trail</button>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-094")}><Shield size={14} /> Access Control</button>
          </div>
        </div>

        {/* Workspace Operations Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Shield size={20} color="#2563eb" />
              <span style={{ fontWeight: 700, fontSize: 15 }}>Governance &amp; Capacity</span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: "8px 0 16px" }}>Manage resource quotas, build minutes, and concurrency limits.</p>
            <Link href="/screens/DP-093" style={{ color: "#2563eb", fontSize: 12, fontWeight: 600 }}>Configure Governance →</Link>
          </div>

          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Key size={20} color="#16a34a" />
              <span style={{ fontWeight: 700, fontSize: 15 }}>Credentials &amp; Secrets</span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: "8px 0 16px" }}>Manage API keys, OAuth clients, and encrypted environment secrets.</p>
            <Link href="/screens/DP-095" style={{ color: "#2563eb", fontSize: 12, fontWeight: 600 }}>Manage Credentials →</Link>
          </div>

          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Activity size={20} color="#dc2626" />
              <span style={{ fontWeight: 700, fontSize: 15 }}>System Health &amp; Incidents</span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: "8px 0 16px" }}>Real-time telemetry, service status, and automated recovery.</p>
            <Link href="/screens/DP-103" style={{ color: "#2563eb", fontSize: 12, fontWeight: 600 }}>Check Health →</Link>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-093: Developer governance and capacity (093_governance.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP093() {
  return (
    <ScreenContainer currentScreenId="DP-093" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Developer Governance &amp; Capacity</h1>
          <p className={styles.subtitle}>Enforce platform concurrency limits, compute caps, and automated compliance thresholds.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Active Entitlements: Enterprise Tier</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>Build Runners: 8 / 10 active • Concurrency: Normal</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-094: Developer access control (094_access_control.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP094() {
  return (
    <ScreenContainer currentScreenId="DP-094" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Developer Access Control &amp; RBAC</h1>
            <p className={styles.subtitle}>Granular permission policies, platform roles, and service account scopes.</p>
          </div>
          <button className={styles.btnPrimary}><Plus size={14} /> Invite Developer</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #d7dfeb" }}>
              <tr>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>User</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Role</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Tenant Scope</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>MFA</th>
                <th style={{ padding: "10px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>test.agent@unierp.com</td>
                <td style={{ padding: "12px 16px" }}><span style={{ padding: "2px 8px", background: "#fef3c7", color: "#92400e", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>SUPER_ADMIN</span></td>
                <td style={{ padding: "12px 16px" }}>Universal (*)</td>
                <td style={{ padding: "12px 16px", color: "#16a34a" }}>Enabled</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}><button className={styles.btnSecondary} style={{ padding: "4px 8px", fontSize: 11 }}>Manage</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-095: Application credentials inventory (095_credentials.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP095() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-095" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Application Credentials Inventory</h1>
            <p className={styles.subtitle}>Active API tokens, OAuth client IDs, and mTLS certificates with expiry tracking.</p>
          </div>
          <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-096")}>
            <Plus size={14} /> Generate Credential
          </button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Active Key: unierp_live_sec_9941a8...</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Created Sep 19, 2026 • Scope: Full API Read/Write • Expires in 90 days</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-096: Create and rotate credentials (096_credential_lifecycle.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP096() {
  return (
    <ScreenContainer currentScreenId="DP-096" backTo={{ label: "Credentials", href: "/screens/DP-095" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Credential Rotation &amp; Lifecycle</h1>
          <p className={styles.subtitle}>Rotate API keys without downtime using dual-active grace period windows.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Rotate Live Key</div>
          <button className={styles.btnPrimary}><RefreshCw size={14} /> Start 24h Rotation Window</button>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-097: Record and field policy simulator (097_record_field_policy.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP097() {
  return (
    <ScreenContainer currentScreenId="DP-097" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Record &amp; Field Policy Simulator</h1>
            <p className={styles.subtitle}>Validate PostgreSQL RLS policies against simulated user roles and test for leakage.</p>
          </div>
          <button className={styles.btnPrimary}><Play size={14} /> Run Simulation</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, color: "#16a34a" }}>✓ Positive &amp; Negative Isolation Tests PASSED (NOBYPASSRLS Role)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-098: Environment secret bindings (098_secret_bindings.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP098() {
  return (
    <ScreenContainer currentScreenId="DP-098" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Environment Secret Bindings</h1>
          <p className={styles.subtitle}>KMS-encrypted secret parameters securely injected into runtime workloads.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Active Secrets: 8 Configured</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-099: Supply chain and security review (099_supply_chain_review_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP099() {
  return (
    <ScreenContainer currentScreenId="DP-099" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Supply Chain &amp; Security Review</h1>
          <p className={styles.subtitle}>SBOM software bill of materials, package integrity hashes, and vulnerability scans.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, color: "#16a34a" }}>Zero Critical or High Vulnerabilities Found in Dependencies</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-100: Extension quarantine and revocation (100_extension_quarantine.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP100() {
  return (
    <ScreenContainer currentScreenId="DP-100" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Extension Quarantine &amp; Emergency Revocation</h1>
          <p className={styles.subtitle}>Isolate anomalous extension packages and revoke runtime access globally in real time.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Quarantine Status: Clean (0 Suspended Packages)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-101: Audit trail and evidence export (101_audit_evidence.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP101() {
  return (
    <ScreenContainer currentScreenId="DP-101" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Audit Trail &amp; Compliance Evidence</h1>
            <p className={styles.subtitle}>Immutable tamper-evident event log for SOC 2 Type II and ISO 27001 compliance.</p>
          </div>
          <button className={styles.btnSecondary}><Download size={14} /> Export Audit CSV</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Latest Events: 1,842 Logged Today</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-102: Restore rehearsal and recovery (102_backup_restore_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP102() {
  return (
    <ScreenContainer currentScreenId="DP-102" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Restore Rehearsal &amp; Disaster Recovery</h1>
          <p className={styles.subtitle}>Automated point-in-time recovery rehearsals verifying RPO &lt; 5 mins and RTO &lt; 15 mins.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, color: "#16a34a" }}>Last Recovery Rehearsal: SUCCESSFUL (RTO: 4m 12s)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-103: Application health and incidents (103_service_health_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP103() {
  return (
    <ScreenContainer currentScreenId="DP-103" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Application Health &amp; Incidents</h1>
          <p className={styles.subtitle}>Live service availability, API latency percentiles, and automated alerting.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, color: "#16a34a", fontSize: 16 }}>All Systems Operational (99.99% Uptime)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-104: Usage budgets and entitlement limits (104_usage_budgets.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP104() {
  return (
    <ScreenContainer currentScreenId="DP-104" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Usage Budgets &amp; Entitlement Limits</h1>
          <p className={styles.subtitle}>Monitor storage, egress, and compute budgets with threshold soft alerts.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Current Billing Cycle Usage: 32% of Plan</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-105: Application identity and session policies (105_app_identity.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP105() {
  return (
    <ScreenContainer currentScreenId="DP-105" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Application Identity &amp; Session Policies</h1>
          <p className={styles.subtitle}>Configure SAML 2.0 / OIDC SSO federation, idle session timeouts, and IP allowlists.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>SSO Provider: Okta / Azure AD Enterprise Connected</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-106: AI-assisted change review (106_ai_assisted_changes.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP106() {
  return (
    <ScreenContainer currentScreenId="DP-106" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>AI-Assisted Change Review</h1>
          <p className={styles.subtitle}>Audit automated agent mutations, inspect confidence scores, and verify test assertions.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, color: "#16a34a" }}>All AI agent proposals verified with 100% test pass evidence.</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-107: Run logs and trace detail (107_run_logs.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP107() {
  return (
    <ScreenContainer currentScreenId="DP-107" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div style={{ display: "flex", height: "calc(100vh - 120px)", background: "#0f172a", color: "#f8fafc", flexDirection: "column" }}>
        <div style={{ height: 44, borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px" }}>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>Real-time Platform Logs (Pino + OpenTelemetry)</span>
          <button style={{ background: "#334155", border: "none", color: "#fff", padding: "4px 10px", borderRadius: 4, fontSize: 12 }}>Auto-Scroll: ON</button>
        </div>
        <div style={{ flex: 1, padding: 16, fontFamily: "monospace", fontSize: 12, overflowY: "auto", lineHeight: 1.6 }}>
          <div style={{ color: "#94a3b8" }}>[2026-09-19 17:50:01] INFO [TenantContext]: Current tenant initialized: 00000000-0000-0000-0000-000000000001 (Acme Corp)</div>
          <div style={{ color: "#4ade80" }}>[2026-09-19 17:50:02] INFO [RLS]: PostgreSQL RLS context set successfully: app.current_tenant_id</div>
          <div style={{ color: "#94a3b8" }}>[2026-09-19 17:50:04] INFO [API]: GET /api/v1/suppliers 200 OK (24ms)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-108: Marketplace packages and installation review (108_marketplace_packages.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP108() {
  return (
    <ScreenContainer currentScreenId="DP-108" backTo={{ label: "Manage workspace", href: "/screens/DP-092" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Marketplace Packages &amp; Installation Review</h1>
            <p className={styles.subtitle}>Install verified enterprise templates, vertical industry packs, and third-party solutions.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnSecondary}>Installed (4)</button>
            <button className={styles.btnPrimary}>Browse Store</button>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>Manufacturing Operations Cloud</div>
            <div style={{ fontSize: 12, color: "#64748b", margin: "6px 0 12px" }}>Complete BOM management, shop floor dispatch, and machine telematics.</div>
            <button className={styles.btnSecondary} style={{ width: "100%", fontSize: 12 }}>Installed</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>Automotive Supplier EDI Suite</div>
            <div style={{ fontSize: 12, color: "#64748b", margin: "6px 0 12px" }}>ANSI X12 &amp; EDIFACT protocol adapters with automated ASN generation.</div>
            <button className={styles.btnPrimary} style={{ width: "100%", fontSize: 12 }}>Install Pack</button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}
