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
} from "lucide-react";
import { ScreenContainer } from "../ScreenContainer";
import styles from "./Journey01.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// DP-061: Data and integrations (061_data_integrations.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP061() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-061" activeTabId="data-integrations">
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Data & Integrations Hub</h1>
            <p className={styles.subtitle}>Manage enterprise connectors, ETL pipelines, custom APIs, and external synchronization.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-068")}><BookOpen size={14} /> SDK Docs</button>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-062")}><Plus size={14} /> New Integration</button>
          </div>
        </div>

        {/* Top Integration Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>Active Connectors</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>12 Active</div>
            <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>All healthy</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>24h Sync Volume</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>1.8M Records</div>
            <div style={{ fontSize: 11, color: "#2563eb", marginTop: 4 }}>Avg latency 42ms</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>Webhooks Delivered</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>99.98%</div>
            <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>Zero DLQ spikes</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>Contract State</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>L0 Synced</div>
            <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>Schema v2.4.0</div>
          </div>
        </div>

        {/* Integration Quicklinks */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Zap size={20} color="#2563eb" />
              <span style={{ fontWeight: 700, fontSize: 15 }}>Connectors Catalog</span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: "8px 0 16px" }}>Pre-built adapters for SAP, Salesforce, Stripe, Kafka, and Snowflake.</p>
            <Link href="/screens/DP-062" style={{ color: "#2563eb", fontSize: 12, fontWeight: 600 }}>Configure Connectors →</Link>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Workflow size={20} color="#16a34a" />
              <span style={{ fontWeight: 700, fontSize: 15 }}>ETL Pipelines</span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: "8px 0 16px" }}>Extract, transform, and schedule continuous data sync runs.</p>
            <Link href="/screens/DP-065" style={{ color: "#2563eb", fontSize: 12, fontWeight: 600 }}>Design Pipelines →</Link>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Code2 size={20} color="#9333ea" />
              <span style={{ fontWeight: 700, fontSize: 15 }}>Custom API Designer</span>
            </div>
            <p style={{ fontSize: 12, color: "#64748b", margin: "8px 0 16px" }}>Publish tenant-scoped REST and RPC endpoints with contract enforcement.</p>
            <Link href="/screens/DP-066" style={{ color: "#2563eb", fontSize: 12, fontWeight: 600 }}>Build APIs →</Link>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-062: Connectors catalog and configuration (062_connectors.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP062() {
  return (
    <ScreenContainer currentScreenId="DP-062" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Connectors Catalog & Configuration</h1>
          <p className={styles.subtitle}>Verified enterprise adapters with OAuth2, mTLS, and automated credential rotation.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700 }}>SAP S/4HANA Cloud</span>
              <span style={{ padding: "2px 6px", background: "#dcfce7", color: "#166534", fontSize: 11, borderRadius: 4 }}>Connected</span>
            </div>
            <div style={{ fontSize: 12, color: "#64748b", margin: "6px 0 12px" }}>OData v4 bi-directional sync for GL entries and vendor masters.</div>
            <button className={styles.btnSecondary} style={{ width: "100%", fontSize: 12 }}>Manage Settings</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700 }}>Salesforce CRM</span>
              <span style={{ padding: "2px 6px", background: "#dcfce7", color: "#166534", fontSize: 11, borderRadius: 4 }}>Connected</span>
            </div>
            <div style={{ fontSize: 12, color: "#64748b", margin: "6px 0 12px" }}>Real-time event streaming via Salesforce Pub/Sub API.</div>
            <button className={styles.btnSecondary} style={{ width: "100%", fontSize: 12 }}>Manage Settings</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700 }}>Apache Kafka Cluster</span>
              <span style={{ padding: "2px 6px", background: "#eff6ff", color: "#1d4ed8", fontSize: 11, borderRadius: 4 }}>Available</span>
            </div>
            <div style={{ fontSize: 12, color: "#64748b", margin: "6px 0 12px" }}>Transactional outbox consumer for low-latency message streaming.</div>
            <button className={styles.btnPrimary} style={{ width: "100%", fontSize: 12 }}>Connect Cluster</button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-063: Visual query builder (063_query_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP063() {
  return (
    <ScreenContainer currentScreenId="DP-063" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Visual Query Builder</h1>
            <p className={styles.subtitle}>Compose secure, multi-entity queries with automated tenant isolation and index optimization.</p>
          </div>
          <button className={styles.btnPrimary}><Play size={14} /> Execute Query</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Active Query: SupplierSpendAnalysis</div>
          <div style={{ background: "#f8fafc", padding: 12, borderRadius: 6, fontFamily: "monospace", fontSize: 12, border: "1px solid #e2e8f0" }}>
            SELECT s.legal_name, COUNT(po.id) as po_count, SUM(po.total_amount) as total_spend<br />
            FROM erp_suppliers s<br />
            JOIN erp_purchase_orders po ON po.supplier_id = s.id<br />
            WHERE s.tenant_id = current_setting(&apos;app.current_tenant_id&apos;)::uuid<br />
            GROUP BY s.legal_name ORDER BY total_spend DESC LIMIT 50;
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-064: Reusable widget builder (064_widgets.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP064() {
  return (
    <ScreenContainer currentScreenId="DP-064" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Reusable Widget Builder</h1>
          <p className={styles.subtitle}>Build cross-application UI widgets, micro-frontends, and embeddable analytics cards.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Registered Widgets</div>
          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={{ padding: 14, border: "1px solid #e2e8f0", borderRadius: 6 }}>
              <div style={{ fontWeight: 600 }}>SupplierCreditScoreCard</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Embeds real-time Dun &amp; Bradstreet rating.</div>
            </div>
            <div style={{ padding: 14, border: "1px solid #e2e8f0", borderRadius: 6 }}>
              <div style={{ fontWeight: 600 }}>FXCurrencyConverter</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Real-time ECB exchange rates with spread fee.</div>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-065: ETL pipeline designer (065_etl.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP065() {
  return (
    <ScreenContainer currentScreenId="DP-065" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>ETL Pipeline Designer</h1>
            <p className={styles.subtitle}>Batch and streaming pipelines with transformation stages, deduplication, and schema validation.</p>
          </div>
          <button className={styles.btnPrimary}><Play size={14} /> Run Test Sync</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 700, margin: "0 auto" }}>
            <div style={{ padding: 14, border: "2px solid #2563eb", borderRadius: 8, background: "#eff6ff", textAlign: "center" }}>
              <div style={{ fontWeight: 700 }}>1. Source: SAP OData</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Polls every 15 mins</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ padding: 14, border: "1px solid #d7dfeb", borderRadius: 8, background: "#f8fafc", textAlign: "center" }}>
              <div style={{ fontWeight: 700 }}>2. Transform: Currency Normalizer</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Converts to USD base</div>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ padding: 14, border: "2px solid #16a34a", borderRadius: 8, background: "#f0fdf4", textAlign: "center" }}>
              <div style={{ fontWeight: 700 }}>3. Destination: UniERP DB</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Idempotent upsert</div>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-066: Custom API designer (066_api_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP066() {
  return (
    <ScreenContainer currentScreenId="DP-066" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Custom API Designer</h1>
            <p className={styles.subtitle}>Define typed REST &amp; GraphQL endpoints with input validation, auth guards, and OpenAPI generation.</p>
          </div>
          <button className={styles.btnPrimary}><Plus size={14} /> New Endpoint</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #d7dfeb" }}>
              <tr>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Method &amp; Path</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Operation ID</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Auth Policy</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Rate Limit</th>
                <th style={{ padding: "10px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontFamily: "monospace" }}><span style={{ color: "#16a34a", fontWeight: 700 }}>GET</span> /api/v1/suppliers/:id/risk-profile</td>
                <td style={{ padding: "12px 16px" }}>getSupplierRiskProfile</td>
                <td style={{ padding: "12px 16px" }}><span style={{ padding: "2px 8px", background: "#eff6ff", color: "#1d4ed8", borderRadius: 4, fontSize: 11 }}>Bearer + RLS</span></td>
                <td style={{ padding: "12px 16px" }}>1,000 req/min</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}><button className={styles.btnSecondary} style={{ padding: "4px 8px", fontSize: 11 }}>Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-067: API and extensions (067_api_extensions.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP067() {
  return (
    <ScreenContainer currentScreenId="DP-067" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>API Hooks &amp; Interceptors</h1>
          <p className={styles.subtitle}>Register pre-execution and post-execution hooks on core platform transactions.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Configured Interceptors</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12, fontSize: 13 }}>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <span>Hook: before_po_commit (Validates budget allocation in GL)</span>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>Active</span>
            </div>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <span>Hook: after_invoice_paid (Publishes event to Outbox table)</span>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>Active</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-068: SDK documentation and quickstart (068_sdk.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP068() {
  return (
    <ScreenContainer currentScreenId="DP-068" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Developer SDK &amp; Quickstart</h1>
          <p className={styles.subtitle}>Client libraries for TypeScript, Python, Go, and Java with full typing and automatic retries.</p>
        </div>
        <div style={{ background: "#0f172a", color: "#f8fafc", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#93c5fd" }}>Install UniERP SDK (npm)</div>
          <div style={{ background: "#1e293b", padding: 12, borderRadius: 6, marginTop: 8, fontFamily: "monospace", fontSize: 13 }}>
            pnpm add @unierp/sdk
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#93c5fd", marginTop: 20 }}>Sample Initialization</div>
          <div style={{ background: "#1e293b", padding: 12, borderRadius: 6, marginTop: 8, fontFamily: "monospace", fontSize: 13 }}>
            import {"{"} UniERPClient {"}"} from &apos;@unierp/sdk&apos;;<br /><br />
            const client = new UniERPClient({"{"}<br />
            &nbsp;&nbsp;apiKey: process.env.UNIERP_API_KEY,<br />
            &nbsp;&nbsp;tenantId: &apos;00000000-0000-0000-0000-000000000001&apos;,<br />
            {"}"});<br /><br />
            const suppliers = await client.suppliers.list({"{"} limit: 10 {"}"});
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-069: API contract publication and consumers (069_contract_publication_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP069() {
  return (
    <ScreenContainer currentScreenId="DP-069" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>API Contract Publication &amp; Governance</h1>
            <p className={styles.subtitle}>Publish immutable contract versions, detect breaking changes, and track consumer dependencies.</p>
          </div>
          <button className={styles.btnPrimary}><Upload size={14} /> Publish New Minor</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Published Contract Packages (L0)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: 14, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 14 }}>@unierp/contracts-finance</span>
                <span style={{ marginLeft: 8, padding: "2px 8px", background: "#dcfce7", color: "#166534", borderRadius: 10, fontSize: 11 }}>v2.4.0 (Latest)</span>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>14 Consumers across 6 services • 0 Breaking Changes</div>
              </div>
              <button className={styles.btnSecondary} style={{ fontSize: 12 }}>View OpenAPI Diff</button>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-070: Extensions catalog (070_extensions.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP070() {
  return (
    <ScreenContainer currentScreenId="DP-070" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Extensions Catalog</h1>
          <p className={styles.subtitle}>Discover, install, and audit modular extensions for UniERP platform.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>Avalara AvaTax Engine</div>
            <div style={{ fontSize: 12, color: "#64748b", margin: "6px 0 12px" }}>Real-time sales tax calculation and remittance reporting.</div>
            <button className={styles.btnSecondary} style={{ width: "100%", fontSize: 12 }}>Installed (v3.1.2)</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>DocuSign Enterprise eSignature</div>
            <div style={{ fontSize: 12, color: "#64748b", margin: "6px 0 12px" }}>Enables legal e-signatures on purchase orders and supplier contracts.</div>
            <button className={styles.btnPrimary} style={{ width: "100%", fontSize: 12 }}>Install Extension</button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-071: Extension bundle validation (071_extension_package.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP071() {
  return (
    <ScreenContainer currentScreenId="DP-071" backTo={{ label: "Extensions catalog", href: "/screens/DP-070" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Extension Bundle Validation</h1>
          <p className={styles.subtitle}>Automated static analysis, CSP policy audit, and permission boundary verification.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Audit Results: avatax-extension-bundle.tgz</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#16a34a" }}><CheckCircle2 size={16} /> CSP Header Strict Evaluation: PASS</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#16a34a" }}><CheckCircle2 size={16} /> PostgreSQL RLS Scope Enforcement: PASS</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#16a34a" }}><CheckCircle2 size={16} /> Secret &amp; Credential Leaks Scan: ZERO FINDINGS</div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-072: Sandbox execution console (072_sandbox.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP072() {
  return (
    <ScreenContainer currentScreenId="DP-072" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Sandbox Execution Console</h1>
            <p className={styles.subtitle}>Test logic, extensions, and webhooks in an isolated mock tenant with synthetic data.</p>
          </div>
          <button className={styles.btnSecondary}><RefreshCw size={14} /> Reset Sandbox State</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 13, color: "#64748b" }}>Sandbox Tenant: <strong>tenant-sandbox-acme-dev</strong> (Isolation Level: Full Ephemeral)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-073: API diagnostics quotas and deprecations (073_diagnostics.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP073() {
  return (
    <ScreenContainer currentScreenId="DP-073" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>API Diagnostics, Quotas &amp; Deprecations</h1>
          <p className={styles.subtitle}>Monitor rate limits, latency p99 distributions, and upcoming sunset versions.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Rate Quota Usage</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>Current window: 4,210 / 100,000 reqs (4.2% consumed)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-074: Events webhooks and redelivery (074_webhook_events.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP074() {
  return (
    <ScreenContainer currentScreenId="DP-074" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Events &amp; Webhooks Dispatcher</h1>
            <p className={styles.subtitle}>Deliver reliable webhooks with HMAC-SHA256 signatures and automated backoff redelivery.</p>
          </div>
          <button className={styles.btnPrimary}><Plus size={14} /> Register Webhook Endpoint</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #d7dfeb" }}>
              <tr>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Endpoint URL</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Subscribed Topics</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Success Rate</th>
                <th style={{ padding: "10px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>https://api.acme.com/webhooks/unierp</td>
                <td style={{ padding: "12px 16px" }}>po.approved, invoice.paid</td>
                <td style={{ padding: "12px 16px" }}><span style={{ color: "#16a34a", fontWeight: 600 }}>100% (24,102 sent)</span></td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}><button className={styles.btnSecondary} style={{ padding: "4px 8px", fontSize: 11 }}>Test Ping</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-075: Schedules jobs and compensation (075_jobs_schedules.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP075() {
  return (
    <ScreenContainer currentScreenId="DP-075" backTo={{ label: "Integrations hub", href: "/screens/DP-061" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Scheduled Jobs &amp; Background Queues</h1>
            <p className={styles.subtitle}>Monitor recurring cron executions, distributed BullMQ workers, and compensation handlers.</p>
          </div>
          <button className={styles.btnPrimary}><Plus size={14} /> New Scheduled Job</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Active Background Queues</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <span>Queue: invoice-matching-engine (Concurrency: 10 workers)</span>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>0 Delayed • 14 Active</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}
