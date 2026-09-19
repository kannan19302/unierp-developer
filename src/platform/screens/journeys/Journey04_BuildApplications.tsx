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
  Edit3,
} from "lucide-react";
import { ScreenContainer } from "../ScreenContainer";
import styles from "./Journey01.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// DP-043: Application visual builder (043_app_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP043() {
  const router = useRouter();
  const [selectedDevice, setSelectedDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedComponent, setSelectedComponent] = useState<string>("data-table");

  return (
    <ScreenContainer
      currentScreenId="DP-043"
      backTo={{ label: "Application overview", href: "/screens/DP-013" }}
      activeTabId="supplier-portal"
    >
      <div style={{ display: "flex", height: "calc(100vh - 120px)", background: "#f1f5f9" }}>
        {/* Left Palette */}
        <div style={{ width: 260, borderRight: "1px solid #d7dfeb", background: "#fff", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", fontWeight: 700, fontSize: 13 }}>Component Library</div>
          <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Layout & Containers</div>
            <div style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 13, display: "flex", gap: 8, alignItems: "center", background: "#f8fafc", cursor: "grab" }}>
              <Columns size={14} /> 2-Column Split
            </div>
            <div style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 13, display: "flex", gap: 8, alignItems: "center", background: "#f8fafc", cursor: "grab" }}>
              <Grid size={14} /> Metric Card Grid
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginTop: 12 }}>Data Displays</div>
            <div
              onClick={() => setSelectedComponent("data-table")}
              style={{ padding: "8px 12px", border: selectedComponent === "data-table" ? "2px solid #2563eb" : "1px solid #e2e8f0", borderRadius: 6, fontSize: 13, display: "flex", gap: 8, alignItems: "center", background: selectedComponent === "data-table" ? "#eff6ff" : "#f8fafc", cursor: "pointer" }}
            >
              <Table size={14} color="#2563eb" /> Strata Data Grid
            </div>
            <div
              onClick={() => setSelectedComponent("chart")}
              style={{ padding: "8px 12px", border: selectedComponent === "chart" ? "2px solid #2563eb" : "1px solid #e2e8f0", borderRadius: 6, fontSize: 13, display: "flex", gap: 8, alignItems: "center", background: selectedComponent === "chart" ? "#eff6ff" : "#f8fafc", cursor: "pointer" }}
            >
              <BarChart3 size={14} color="#2563eb" /> Analytics Chart
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginTop: 12 }}>Forms & Inputs</div>
            <div style={{ padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 13, display: "flex", gap: 8, alignItems: "center", background: "#f8fafc", cursor: "grab" }}>
              <FileCode2 size={14} /> Dynamic Form Embed
            </div>
          </div>
        </div>

        {/* Center Canvas */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8fafc" }}>
          <div style={{ height: 44, borderBottom: "1px solid #d7dfeb", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontWeight: 600, fontSize: 13 }}>Page: Supplier Invoices (Overview)</span>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 12, background: "#dcfce7", color: "#15803d", fontWeight: 600 }}>Live Sync</span>
            </div>
            <div style={{ display: "flex", gap: 6, background: "#f1f5f9", padding: 3, borderRadius: 6 }}>
              <button onClick={() => setSelectedDevice("desktop")} style={{ border: "none", background: selectedDevice === "desktop" ? "#fff" : "transparent", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}><Laptop size={14} /></button>
              <button onClick={() => setSelectedDevice("mobile")} style={{ border: "none", background: selectedDevice === "mobile" ? "#fff" : "transparent", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}><Smartphone size={14} /></button>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className={styles.btnSecondary} style={{ padding: "4px 10px", fontSize: 12 }}><Eye size={13} /> Preview</button>
              <button className={styles.btnPrimary} style={{ padding: "4px 10px", fontSize: 12 }}><Save size={13} /> Publish Page</button>
            </div>
          </div>

          <div style={{ flex: 1, padding: 24, overflowY: "auto", display: "flex", justifyContent: "center" }}>
            <div style={{ width: selectedDevice === "desktop" ? "100%" : 375, maxWidth: 1080, background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Invoices & Remittances</h3>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#64748b" }}>Manage supplier billing, reconciliation, and automated matching</p>
                </div>
                <button style={{ background: "#2563eb", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>+ Submit Invoice</button>
              </div>

              {/* Data Table Preview */}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: 6, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <tr>
                      <th style={{ padding: "8px 12px", textAlign: "left" }}>Invoice #</th>
                      <th style={{ padding: "8px 12px", textAlign: "left" }}>Supplier</th>
                      <th style={{ padding: "8px 12px", textAlign: "left" }}>Amount</th>
                      <th style={{ padding: "8px 12px", textAlign: "left" }}>Due Date</th>
                      <th style={{ padding: "8px 12px", textAlign: "left" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 600, color: "#2563eb" }}>INV-2026-0941</td>
                      <td style={{ padding: "10px 12px" }}>Apex Global Logistics</td>
                      <td style={{ padding: "10px 12px" }}>$42,850.00 USD</td>
                      <td style={{ padding: "10px 12px" }}>Oct 15, 2026</td>
                      <td style={{ padding: "10px 12px" }}><span style={{ padding: "2px 8px", borderRadius: 10, background: "#dcfce7", color: "#166534", fontSize: 11, fontWeight: 600 }}>Approved</span></td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 12px", fontWeight: 600, color: "#2563eb" }}>INV-2026-0942</td>
                      <td style={{ padding: "10px 12px" }}>Contoso Steelworks</td>
                      <td style={{ padding: "10px 12px" }}>$118,200.00 USD</td>
                      <td style={{ padding: "10px 12px" }}>Oct 22, 2026</td>
                      <td style={{ padding: "10px 12px" }}><span style={{ padding: "2px 8px", borderRadius: 10, background: "#fef3c7", color: "#92400e", fontSize: 11, fontWeight: 600 }}>Under Review</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Inspector */}
        <div style={{ width: 300, borderLeft: "1px solid #d7dfeb", background: "#fff", padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Component Inspector</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>Data Source</label>
              <select style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, fontSize: 12 }}>
                <option>ERP_SupplierInvoices (Postgres RLS)</option>
                <option>Custom Query: ActiveInvoicesByTenant</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>Pagination & Density</label>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <input type="number" defaultValue={25} style={{ width: 60, padding: 4, borderRadius: 4, border: "1px solid #cbd5e1", fontSize: 12 }} />
                <span style={{ fontSize: 12, color: "#64748b", alignSelf: "center" }}>rows per page</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>Row Action Trigger</label>
              <select style={{ width: "100%", padding: "6px 8px", borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4, fontSize: 12 }}>
                <option>Open Detail Drawer (Form DP-045)</option>
                <option>Navigate to Custom Route</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-044: Forms catalog (044_forms.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP044() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-044" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Application Forms</h1>
            <p className={styles.subtitle}>Define, validate, and publish operational forms with automated schema bindings.</p>
          </div>
          <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-045")}>
            <Plus size={14} /> Create New Form
          </button>
        </div>

        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #d7dfeb" }}>
              <tr>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Form Title</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Bound Object</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Type</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Fields</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "10px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>Supplier Onboarding Registration</td>
                <td style={{ padding: "12px 16px" }}>SupplierEntity</td>
                <td style={{ padding: "12px 16px" }}><span style={{ padding: "2px 8px", background: "#eff6ff", color: "#1d4ed8", borderRadius: 4, fontSize: 11 }}>Multi-Step Wizard</span></td>
                <td style={{ padding: "12px 16px" }}>24 fields</td>
                <td style={{ padding: "12px 16px" }}><span style={{ color: "#16a34a", fontWeight: 600 }}>Active</span></td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-045")} style={{ padding: "4px 8px", fontSize: 12 }}>Edit Form</button>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>Purchase Requisition Quick Entry</td>
                <td style={{ padding: "12px 16px" }}>PurchaseRequisition</td>
                <td style={{ padding: "12px 16px" }}><span style={{ padding: "2px 8px", background: "#f1f5f9", color: "#475569", borderRadius: 4, fontSize: 11 }}>Standard Modal</span></td>
                <td style={{ padding: "12px 16px" }}>12 fields</td>
                <td style={{ padding: "12px 16px" }}><span style={{ color: "#16a34a", fontWeight: 600 }}>Active</span></td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-045")} style={{ padding: "4px 8px", fontSize: 12 }}>Edit Form</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-045: Form visual builder (045_form_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP045() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-045" backTo={{ label: "Forms catalog", href: "/screens/DP-044" }}>
      <div style={{ display: "flex", height: "calc(100vh - 120px)", background: "#f8fafc" }}>
        {/* Field Palette */}
        <div style={{ width: 250, borderRight: "1px solid #d7dfeb", background: "#fff", padding: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Available Fields</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12 }}>
            <div style={{ padding: 8, border: "1px dashed #94a3b8", borderRadius: 6, background: "#f8fafc", cursor: "grab" }}>📝 Text Input</div>
            <div style={{ padding: 8, border: "1px dashed #94a3b8", borderRadius: 6, background: "#f8fafc", cursor: "grab" }}>🔢 Currency / Amount</div>
            <div style={{ padding: 8, border: "1px dashed #94a3b8", borderRadius: 6, background: "#f8fafc", cursor: "grab" }}>📅 Date & Time Picker</div>
            <div style={{ padding: 8, border: "1px dashed #94a3b8", borderRadius: 6, background: "#f8fafc", cursor: "grab" }}>📋 Entity Lookup Select</div>
            <div style={{ padding: 8, border: "1px dashed #94a3b8", borderRadius: 6, background: "#f8fafc", cursor: "grab" }}>📎 File & Document Upload</div>
          </div>
        </div>

        {/* Form Canvas */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px" }}>Purchase Requisition Form</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600 }}>Requisition Title *</label>
                <input type="text" defaultValue="Q4 Server Infrastructure Refresh" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4 }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600 }}>Department *</label>
                <select style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4 }}>
                  <option>Engineering & Cloud Ops</option>
                </select>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontSize: 12, fontWeight: 600 }}>Business Justification</label>
                <textarea rows={3} defaultValue="Required for expanding tenant capacity in EU region." style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Validation & Rules Rail */}
        <div style={{ width: 280, borderLeft: "1px solid #d7dfeb", background: "#fff", padding: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13 }}>Field Properties & Rules</div>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10, fontSize: 12 }}>
            <label><input type="checkbox" defaultChecked /> Required Field</label>
            <label><input type="checkbox" defaultChecked /> Server-side RLS Audit</label>
            <label><input type="checkbox" /> Read-only after submission</label>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-046: Advanced forms and field library (046_advanced_forms.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP046() {
  return (
    <ScreenContainer currentScreenId="DP-046" backTo={{ label: "Forms catalog", href: "/screens/DP-044" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Advanced Forms & Field Library</h1>
          <p className={styles.subtitle}>Manage reusable custom input controls, complex masking rules, and conditional logic formulas.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Form Control Registry</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 6 }}>
              <div style={{ fontWeight: 600 }}>Tax ID / VAT Validator</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Validates against EU VIES and US EIN syntax.</div>
            </div>
            <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 6 }}>
              <div style={{ fontWeight: 600 }}>IBAN / SWIFT Auto-Resolver</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Auto-completes bank routing details.</div>
            </div>
            <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 6 }}>
              <div style={{ fontWeight: 600 }}>Digital Signature Pad</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Captures tamper-evident cryptographic signature.</div>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-047: Dashboard catalog and creation (047_dashboard_catalog.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP047() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-047" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Dashboards & BI Views</h1>
            <p className={styles.subtitle}>Executive KPI aggregations, operational dashboards, and real-time telemetry.</p>
          </div>
          <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-048")}>
            <Plus size={14} /> Create Dashboard
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Executive Revenue & Cashflow</span>
              <Activity size={16} color="#2563eb" />
            </div>
            <div style={{ fontSize: 12, color: "#64748b", margin: "6px 0 16px" }}>Monthly recurring revenue, churn, and net working capital.</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
              <span>6 Widgets</span>
              <Link href="/screens/DP-048" style={{ color: "#2563eb", fontWeight: 600 }}>Edit Canvas →</Link>
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>Supply Chain SLA & Fulfilment</span>
              <BarChart3 size={16} color="#16a34a" />
            </div>
            <div style={{ fontSize: 12, color: "#64748b", margin: "6px 0 16px" }}>Vendor lead times, stockout risks, and purchase order status.</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
              <span>8 Widgets</span>
              <Link href="/screens/DP-048" style={{ color: "#2563eb", fontWeight: 600 }}>Edit Canvas →</Link>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-048: Dashboard visual builder (048_dashboard_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP048() {
  return (
    <ScreenContainer currentScreenId="DP-048" backTo={{ label: "Dashboards catalog", href: "/screens/DP-047" }}>
      <div style={{ display: "flex", height: "calc(100vh - 120px)", background: "#f8fafc" }}>
        {/* Canvas */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Executive Revenue & Cashflow (Canvas)</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button className={styles.btnSecondary}><Plus size={14} /> Add Widget</button>
              <button className={styles.btnPrimary}><Save size={14} /> Save Layout</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Total Enterprise ARR</div>
              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>$24,850,000</div>
              <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>↑ 14.2% vs last quarter</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Active Global Tenants</div>
              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>1,420</div>
              <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>↑ 28 new this month</div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, color: "#64748b" }}>Average Deal Size</div>
              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 4 }}>$48,500</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Across 14 vertical clouds</div>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-049: Data objects catalog (049_data_objects.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP049() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-049" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Data Objects & Entities</h1>
            <p className={styles.subtitle}>Define relational models, custom tables, primary keys, and PostgreSQL RLS tenant constraints.</p>
          </div>
          <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-050")}>
            <Plus size={14} /> New Data Object
          </button>
        </div>

        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #d7dfeb" }}>
              <tr>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Entity Name</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Physical Table</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Fields</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>RLS Isolation</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Records</th>
                <th style={{ padding: "10px 16px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>SupplierProfile</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12 }}>erp_suppliers</td>
                <td style={{ padding: "12px 16px" }}>32 fields</td>
                <td style={{ padding: "12px 16px" }}><span style={{ padding: "2px 8px", background: "#dcfce7", color: "#166534", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Tenant Scoped</span></td>
                <td style={{ padding: "12px 16px" }}>1,840</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-050")} style={{ padding: "4px 8px", fontSize: 12 }}>Edit Schema</button>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>PurchaseOrderHeader</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12 }}>erp_purchase_orders</td>
                <td style={{ padding: "12px 16px" }}>48 fields</td>
                <td style={{ padding: "12px 16px" }}><span style={{ padding: "2px 8px", background: "#dcfce7", color: "#166534", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Tenant Scoped</span></td>
                <td style={{ padding: "12px 16px" }}>24,912</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-050")} style={{ padding: "4px 8px", fontSize: 12 }}>Edit Schema</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-050: Object schema and relationships (050_object_designer.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP050() {
  return (
    <ScreenContainer currentScreenId="DP-050" backTo={{ label: "Data objects", href: "/screens/DP-049" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Object Designer: SupplierProfile</h1>
            <p className={styles.subtitle}>Field types, constraints, audit triggers, foreign keys, and RLS policies.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnSecondary}>+ Add Field</button>
            <button className={styles.btnPrimary}><Save size={14} /> Commit Schema</button>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #d7dfeb" }}>
              <tr>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Column</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Data Type</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Nullable</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Key / Index</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Audit & Security</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px", fontFamily: "monospace", fontWeight: 600 }}>id</td>
                <td style={{ padding: "10px 12px" }}>UUID (v7)</td>
                <td style={{ padding: "10px 12px" }}>No</td>
                <td style={{ padding: "10px 12px" }}><span style={{ color: "#2563eb", fontWeight: 700 }}>PRIMARY KEY</span></td>
                <td style={{ padding: "10px 12px" }}>Immutable</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px", fontFamily: "monospace", fontWeight: 600 }}>tenant_id</td>
                <td style={{ padding: "10px 12px" }}>UUID</td>
                <td style={{ padding: "10px 12px" }}>No</td>
                <td style={{ padding: "10px 12px" }}>INDEX (btree)</td>
                <td style={{ padding: "10px 12px" }}><span style={{ color: "#16a34a", fontWeight: 600 }}>RLS Enforcement</span></td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px", fontFamily: "monospace", fontWeight: 600 }}>legal_name</td>
                <td style={{ padding: "10px 12px" }}>VARCHAR(255)</td>
                <td style={{ padding: "10px 12px" }}>No</td>
                <td style={{ padding: "10px 12px" }}>—</td>
                <td style={{ padding: "10px 12px" }}>Logged in Audit Trail</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-051: Decision table and rule designer (051_rules.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP051() {
  return (
    <ScreenContainer currentScreenId="DP-051" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Decision Tables & Rules Engine</h1>
            <p className={styles.subtitle}>DMN-compatible decision matrices, discount tables, and automated policy calculations.</p>
          </div>
          <button className={styles.btnPrimary}><Plus size={14} /> New Decision Table</button>
        </div>

        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>PO Approval Limit Matrix (DMN Rule #08)</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #d7dfeb" }}>
              <tr>
                <th style={{ padding: "8px 12px", background: "#eff6ff", color: "#1d4ed8" }}>Input: Amount (USD)</th>
                <th style={{ padding: "8px 12px", background: "#eff6ff", color: "#1d4ed8" }}>Input: Vendor Tier</th>
                <th style={{ padding: "8px 12px", background: "#f0fdf4", color: "#166534" }}>Output: Required Approver</th>
                <th style={{ padding: "8px 12px", background: "#f0fdf4", color: "#166534" }}>Output: SLA Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px" }}>&lt; 5,000</td>
                <td style={{ padding: "10px 12px" }}>Any</td>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>Auto-Approve</td>
                <td style={{ padding: "10px 12px" }}>0 hrs</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px" }}>5,000 .. 50,000</td>
                <td style={{ padding: "10px 12px" }}>Tier 1 or Tier 2</td>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>Department Manager</td>
                <td style={{ padding: "10px 12px" }}>24 hrs</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px" }}>&gt; 50,000</td>
                <td style={{ padding: "10px 12px" }}>Any</td>
                <td style={{ padding: "10px 12px", fontWeight: 600 }}>VP Finance / CFO</td>
                <td style={{ padding: "10px 12px" }}>48 hrs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-052: BPMN process designer (052_bpmn.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP052() {
  return (
    <ScreenContainer currentScreenId="DP-052" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>BPMN 2.0 Process Designer</h1>
            <p className={styles.subtitle}>Visual enterprise workflow modeling, human-in-the-loop tasks, and automated orchestrations.</p>
          </div>
          <button className={styles.btnPrimary}><Save size={14} /> Deploy Process</button>
        </div>

        <div style={{ height: 480, background: "#f8fafc", border: "2px dashed #cbd5e1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#dcfce7", border: "2px solid #16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11 }}>Start</div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ padding: "14px 20px", background: "#fff", border: "2px solid #2563eb", borderRadius: 8, fontWeight: 600, fontSize: 13, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }}>
              User Task: Manager Review
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ width: 40, height: 40, transform: "rotate(45deg)", background: "#fef3c7", border: "2px solid #d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ transform: "rotate(-45deg)", fontSize: 10, fontWeight: 700 }}>XOR</span>
            </div>
            <ArrowRight size={20} color="#94a3b8" />
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#fee2e2", border: "3px solid #dc2626", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11 }}>End</div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-053: Workflow catalog and creation (053_workflow_catalog.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP053() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-053" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Automated Workflows</h1>
            <p className={styles.subtitle}>Trigger-action event orchestrations, background queues, and compensation handlers.</p>
          </div>
          <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-054")}>
            <Plus size={14} /> New Workflow
          </button>
        </div>

        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #d7dfeb" }}>
              <tr>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Workflow Name</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Trigger Event</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Actions</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Execution SLA</th>
                <th style={{ padding: "10px 16px", textAlign: "left" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600 }}>Supplier Compliance Alert</td>
                <td style={{ padding: "12px 16px" }}>Certificate Expiring (Cron Daily)</td>
                <td style={{ padding: "12px 16px" }}>3 steps (Email + Task + Webhook)</td>
                <td style={{ padding: "12px 16px" }}>99.98%</td>
                <td style={{ padding: "12px 16px" }}><span style={{ color: "#16a34a", fontWeight: 600 }}>Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-054: Workflow and interaction builder (054_workflow_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP054() {
  return (
    <ScreenContainer currentScreenId="DP-054" backTo={{ label: "Workflows", href: "/screens/DP-053" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Workflow Canvas: Supplier Certificate Expiry</h1>
            <p className={styles.subtitle}>Configure trigger conditions, outbound webhooks, and state mutations.</p>
          </div>
          <button className={styles.btnPrimary}><Save size={14} /> Save & Activate</button>
        </div>

        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 500, margin: "0 auto" }}>
            <div style={{ padding: 14, border: "2px solid #2563eb", borderRadius: 8, background: "#eff6ff" }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>1. Trigger: Scheduled Event</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Runs every day at 00:00 UTC (cron: 0 0 * * *)</div>
            </div>
            <div style={{ textAlign: "center" }}><ArrowRight size={18} color="#94a3b8" style={{ transform: "rotate(90deg)" }} /></div>
            <div style={{ padding: 14, border: "1px solid #d7dfeb", borderRadius: 8, background: "#f8fafc" }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>2. Query: Expiring Certificates</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Filter: expiry_date &lt; NOW() + 30 days</div>
            </div>
            <div style={{ textAlign: "center" }}><ArrowRight size={18} color="#94a3b8" style={{ transform: "rotate(90deg)" }} /></div>
            <div style={{ padding: 14, border: "1px solid #d7dfeb", borderRadius: 8, background: "#f8fafc" }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>3. Action: Send Notification</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Dispatches email via Notification Template #059</div>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-055: Logic script workbench (055_logic.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP055() {
  return (
    <ScreenContainer currentScreenId="DP-055" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div style={{ display: "flex", height: "calc(100vh - 120px)", background: "#0f172a", color: "#f8fafc" }}>
        {/* Script Explorer */}
        <div style={{ width: 240, borderRight: "1px solid #334155", padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>Custom Functions</div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
            <div style={{ color: "#60a5fa", fontWeight: 600 }}>calculateDiscount.ts</div>
            <div style={{ color: "#94a3b8" }}>validateTaxExemption.ts</div>
            <div style={{ color: "#94a3b8" }}>syncInventoryLedger.ts</div>
          </div>
        </div>

        {/* Code Editor */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ height: 40, borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px" }}>
            <span style={{ fontSize: 13, fontFamily: "monospace" }}>calculateDiscount.ts (TypeScript 5.4)</span>
            <button style={{ background: "#2563eb", color: "#fff", border: "none", padding: "4px 12px", borderRadius: 4, fontSize: 12, display: "flex", gap: 6, alignItems: "center" }}>
              <Play size={12} /> Test Run
            </button>
          </div>
          <div style={{ flex: 1, padding: 16, fontFamily: "monospace", fontSize: 13, lineHeight: 1.6, overflowY: "auto" }}>
            <div style={{ color: "#93c5fd" }}>import {"{"} TenantContext {"}"} from "@unierp/contracts/runtime";</div>
            <div style={{ color: "#93c5fd" }}>import {"{"} Decimal {"}"} from "decimal.js";</div>
            <br />
            <div>export async function execute(ctx: TenantContext, payload: {"{"} amount: number; tier: string {"}"}) {"{"}</div>
            <div style={{ paddingLeft: 20, color: "#6ee7b7" }}>// Automated tenant-scoped business calculation</div>
            <div style={{ paddingLeft: 20 }}>if (payload.tier === "GOLD") {"{"}</div>
            <div style={{ paddingLeft: 40, color: "#fca5a5" }}>return new Decimal(payload.amount).mul(0.15).toNumber();</div>
            <div style={{ paddingLeft: 20 }}>{"}"}</div>
            <div style={{ paddingLeft: 20 }}>return new Decimal(payload.amount).mul(0.05).toNumber();</div>
            <div>{"}"}</div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-056: Mobile app visual builder (056_mobile_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP056() {
  return (
    <ScreenContainer currentScreenId="DP-056" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Mobile App Visual Builder</h1>
            <p className={styles.subtitle}>Design responsive mobile experiences with offline caching and biometric auth support.</p>
          </div>
          <button className={styles.btnPrimary}><Save size={14} /> Export Mobile Bundle</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
          {/* Phone Frame */}
          <div style={{ width: 360, height: 640, background: "#000", borderRadius: 40, padding: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
            <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: 32, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              {/* Status bar */}
              <div style={{ height: 28, background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", fontSize: 10, fontWeight: 700 }}>
                <span>9:41</span>
                <span>5G 100%</span>
              </div>
              {/* App Content */}
              <div style={{ flex: 1, padding: 16 }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>Supplier Mobile Hub</h3>
                <div style={{ padding: 12, background: "#eff6ff", borderRadius: 8, fontSize: 12, marginBottom: 12 }}>
                  <div style={{ fontWeight: 600 }}>Active Shipments</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#1d4ed8", marginTop: 4 }}>14 In-Transit</div>
                </div>
              </div>
              {/* Mobile Tab Bar */}
              <div style={{ height: 50, borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "space-around", alignItems: "center", fontSize: 11 }}>
                <span style={{ color: "#2563eb", fontWeight: 700 }}>Home</span>
                <span style={{ color: "#64748b" }}>Orders</span>
                <span style={{ color: "#64748b" }}>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-057: Application navigation customization (057_app_customization.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP057() {
  return (
    <ScreenContainer currentScreenId="DP-057" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Application Navigation Customization</h1>
          <p className={styles.subtitle}>Customize sidebar tree, menu ordering, permissions, and responsive bottom rails.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Navigation Menu Hierarchy</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div style={{ padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <span>📊 Dashboard (Role: All Users)</span>
              <button className={styles.btnSecondary} style={{ padding: "2px 8px", fontSize: 11 }}>Configure</button>
            </div>
            <div style={{ padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <span>📦 Suppliers & Vendors (Role: Procurement)</span>
              <button className={styles.btnSecondary} style={{ padding: "2px 8px", fontSize: 11 }}>Configure</button>
            </div>
            <div style={{ padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <span>💳 Invoices & Billing (Role: Finance)</span>
              <button className={styles.btnSecondary} style={{ padding: "2px 8px", fontSize: 11 }}>Configure</button>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-058: Report and metric designer (058_report_semantics.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP058() {
  return (
    <ScreenContainer currentScreenId="DP-058" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Report & Semantic Metrics Designer</h1>
          <p className={styles.subtitle}>Define reusable enterprise metrics, rollup dimensions, and verified SQL semantic models.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Semantic Metrics Registry</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6 }}>
              <div style={{ fontWeight: 600 }}>Metric: supplier_on_time_delivery_rate</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Formula: COUNT(delivered_on_time) / COUNT(total_orders) * 100</div>
            </div>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6 }}>
              <div style={{ fontWeight: 600 }}>Metric: days_payable_outstanding (DPO)</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>Formula: (ending_accounts_payable / cost_of_goods_sold) * 365</div>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-059: Notification and document templates (059_message_templates.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP059() {
  return (
    <ScreenContainer currentScreenId="DP-059" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Notification & Document Templates</h1>
          <p className={styles.subtitle}>Multi-channel email, SMS, push notifications, and PDF invoice generators.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Template Editor: Purchase Order Confirmation</div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, fontWeight: 600 }}>Subject Line Template</label>
              <input type="text" defaultValue="Purchase Order #{{po.number}} Approved by Acme Corp" style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4 }} />
              <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginTop: 12 }}>Body Markdown / HTML</label>
              <textarea rows={6} defaultValue="Dear {{supplier.contact_name}},\n\nYour purchase order #{{po.number}} for ${{po.total}} has been approved.\nDelivery Expected: {{po.due_date}}." style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #cbd5e1", marginTop: 4 }} />
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-060: Approval routing and delegation (060_approval_routing.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP060() {
  return (
    <ScreenContainer currentScreenId="DP-060" backTo={{ label: "Application overview", href: "/screens/DP-013" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Approval Routing & Delegation</h1>
          <p className={styles.subtitle}>Multi-tier signing authorities, threshold limits, and out-of-office delegation rules.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Approval Tier Configuration</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontWeight: 600 }}>Tier 1: Up to $25,000 USD</span>
                <div style={{ fontSize: 12, color: "#64748b" }}>Approver: Cost Center Manager</div>
              </div>
              <span style={{ padding: "2px 8px", background: "#dcfce7", color: "#166534", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Active</span>
            </div>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontWeight: 600 }}>Tier 2: $25,000 to $100,000 USD</span>
                <div style={{ fontSize: 12, color: "#64748b" }}>Approvers: VP Procurement + Financial Controller</div>
              </div>
              <span style={{ padding: "2px 8px", background: "#dcfce7", color: "#166534", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Active</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}
