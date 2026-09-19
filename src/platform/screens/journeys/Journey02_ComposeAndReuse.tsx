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
} from "lucide-react";
import { ScreenContainer } from "../ScreenContainer";
import styles from "./Journey01.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// DP-013: Application workspace (013_app_overview.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP013() {
  const router = useRouter();
  const [activeSubtab, setActiveSubtab] = useState<"all" | "screens" | "forms" | "workflows">("all");

  const tabs = [
    { id: "supplier-web", title: "Supplier website", icon: <Globe size={14} /> },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} />, active: true },
  ];

  const sidebarGroups = [
    {
      items: [
        { id: "overview", label: "Overview", icon: <LayoutGrid size={16} />, active: true },
        { id: "screens", label: "Screens", icon: <Laptop size={16} />, onClick: () => router.push("/screens/DP-043") },
        { id: "forms", label: "Forms", icon: <FileCode2 size={16} />, onClick: () => router.push("/screens/DP-044") },
        { id: "workflows", label: "Workflows", icon: <Workflow size={16} />, onClick: () => router.push("/screens/DP-053") },
        { id: "dashboards", label: "Dashboards", icon: <Layers size={16} />, onClick: () => router.push("/screens/DP-047") },
        { id: "data", label: "Data", icon: <Database size={16} />, onClick: () => router.push("/screens/DP-049") },
        { id: "rules", label: "Rules", icon: <Shield size={16} />, onClick: () => router.push("/screens/DP-051") },
        { id: "apis", label: "APIs", icon: <Code2 size={16} />, onClick: () => router.push("/screens/DP-066") },
        { id: "logic", label: "Logic", icon: <Puzzle size={16} />, onClick: () => router.push("/screens/DP-055") },
        { id: "mobile", label: "Mobile", icon: <Smartphone size={16} />, onClick: () => router.push("/screens/DP-056") },
        { id: "settings", label: "Settings", icon: <Settings size={16} />, onClick: () => router.push("/screens/DP-022") },
      ],
    },
  ];

  const rightRail = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#15233d" }}>Review checklist</div>
        <div style={{ fontSize: 12, color: "#1d4ed8", fontWeight: 600, marginTop: 2 }}>Review required</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12, fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><CheckCircle2 size={14} color="#16a34a" /> Requirements linked</span>
            <span style={{ color: "#16a34a" }}>Completed</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><CheckCircle2 size={14} color="#16a34a" /> Screens reviewed</span>
            <span style={{ color: "#16a34a" }}>Completed</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><CheckCircle2 size={14} color="#16a34a" /> Forms reviewed</span>
            <span style={{ color: "#16a34a" }}>Completed</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: "50%", background: "#d97706" }} /> Workflows reviewed</span>
            <span style={{ color: "#d97706" }}>In progress</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid #94a3b8" }} /> Data model validated</span>
            <span style={{ color: "#64748b" }}>Not started</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid #94a3b8" }} /> Security reviewed</span>
            <span style={{ color: "#64748b" }}>Not started</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><CheckCircle2 size={14} color="#16a34a" /> Performance reviewed</span>
            <span style={{ color: "#16a34a" }}>Completed</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: "50%", background: "#d97706" }} /> UAT prepared</span>
            <span style={{ color: "#d97706" }}>In progress</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid #94a3b8" }} /> Documentation updated</span>
            <span style={{ color: "#64748b" }}>Not started</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ width: 12, height: 12, borderRadius: "50%", border: "1px solid #94a3b8" }} /> Ready for release</span>
            <span style={{ color: "#64748b" }}>Not started</span>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#15233d", marginBottom: 10 }}>Recent work</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 12 }}>
          <div>
            <div style={{ fontWeight: 600 }}>AR Updated screen Dashboard</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Sep 10, 2026 10:21 AM</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>JL Created form Supplier registration</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Sep 10, 2026 9:05 AM</div>
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>TM Updated workflow Supplier onboarding</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Sep 9, 2026 4:17 PM</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-013"
      tabs={tabs}
      backTo={{ label: "Back to Projects", href: "/screens/DP-003" }}
      sidebarGroups={sidebarGroups}
      sidebarProjectContext={{ name: "Supplier portal", environment: "Web application" }}
      rightRail={rightRail}
    >
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Acme Corp / Supplier experience / Supplier portal / Development / Draft
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-043")}>
              <Layers size={16} /> Open visual builder
            </button>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-045")}>
              New artifact ⌵
            </button>
            <button className={styles.btnSecondary}><MoreVertical size={16} /></button>
          </div>
        </div>

        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Overview</h1>
          <p className={styles.subtitle}>Summary of artifacts, dependencies, and review status.</p>
        </div>

        {/* Subtabs */}
        <div style={{ display: "flex", gap: 20, borderBottom: "1px solid #e2e8f0", paddingBottom: 8 }}>
          {["All artifacts", "Screens", "Forms", "Workflows"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveSubtab(t.toLowerCase() as any)}
              style={{
                border: "none",
                background: "transparent",
                fontWeight: 600,
                fontSize: 13,
                color: activeSubtab === t.toLowerCase() ? "#174eca" : "#64748b",
                borderBottom: activeSubtab === t.toLowerCase() ? "2px solid #174eca" : "none",
                paddingBottom: 6,
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grouped Table */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div>Name</div>
            <div>Type</div>
            <div>Status</div>
            <div>Last updated</div>
            <div>Updated by</div>
            <div />
          </div>

          {/* Screens group */}
          <div style={{ padding: "8px 16px", background: "#f8fafc", fontWeight: 700, fontSize: 12, color: "#15233d", borderBottom: "1px solid #e2e8f0" }}>
            ▾ Screens
          </div>
          {[
            { name: "Dashboard", type: "Screen", status: "Ready", date: "Sep 10, 2026", by: "alex.r@example.com", icon: <Laptop size={15} /> },
            { name: "Supplier directory", type: "Screen", status: "Ready", date: "Sep 09, 2026", by: "jamie.l@example.com", icon: <Laptop size={15} /> },
            { name: "Supplier profile", type: "Screen", status: "Ready", date: "Sep 08, 2026", by: "taylor.m@example.com", icon: <Laptop size={15} /> },
          ].map((item, i) => (
            <div key={i} className={styles.tableRow} onClick={() => router.push("/screens/DP-043")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#174eca" }}>{item.icon}</span>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
              </div>
              <div style={{ color: "#64748b" }}>{item.type}</div>
              <div style={{ color: "#16a34a", fontWeight: 500 }}>● {item.status}</div>
              <div style={{ color: "#64748b" }}>{item.date}</div>
              <div style={{ color: "#64748b" }}>{item.by}</div>
              <div><MoreVertical size={16} color="#94a3b8" /></div>
            </div>
          ))}

          {/* Forms group */}
          <div style={{ padding: "8px 16px", background: "#f8fafc", fontWeight: 700, fontSize: 12, color: "#15233d", borderBottom: "1px solid #e2e8f0" }}>
            ▾ Forms
          </div>
          {[
            { name: "Supplier registration", type: "Form", status: "Ready", date: "Sep 10, 2026", by: "jamie.l@example.com", icon: <FileCode2 size={15} /> },
            { name: "Bank details", type: "Form", status: "Draft", date: "Sep 08, 2026", by: "taylor.m@example.com", icon: <FileCode2 size={15} />, draft: true },
            { name: "Contact details", type: "Form", status: "Ready", date: "Sep 07, 2026", by: "alex.r@example.com", icon: <FileCode2 size={15} /> },
          ].map((item, i) => (
            <div key={i} className={styles.tableRow} onClick={() => router.push("/screens/DP-045")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#174eca" }}>{item.icon}</span>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
              </div>
              <div style={{ color: "#64748b" }}>{item.type}</div>
              <div style={{ color: item.draft ? "#d97706" : "#16a34a", fontWeight: 500 }}>● {item.status}</div>
              <div style={{ color: "#64748b" }}>{item.date}</div>
              <div style={{ color: "#64748b" }}>{item.by}</div>
              <div><MoreVertical size={16} color="#94a3b8" /></div>
            </div>
          ))}

          {/* Workflows group */}
          <div style={{ padding: "8px 16px", background: "#f8fafc", fontWeight: 700, fontSize: 12, color: "#15233d", borderBottom: "1px solid #e2e8f0" }}>
            ▾ Workflows
          </div>
          {[
            { name: "Supplier onboarding", type: "Workflow", status: "Ready", date: "Sep 09, 2026", by: "jamie.l@example.com", icon: <Workflow size={15} /> },
            { name: "Document review", type: "Workflow", status: "Ready", date: "Sep 08, 2026", by: "taylor.m@example.com", icon: <Workflow size={15} /> },
            { name: "Change request", type: "Workflow", status: "Draft", date: "Sep 07, 2026", by: "alex.r@example.com", icon: <Workflow size={15} />, draft: true },
          ].map((item, i) => (
            <div key={i} className={styles.tableRow} onClick={() => router.push("/screens/DP-054")}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#174eca" }}>{item.icon}</span>
                <span style={{ fontWeight: 600 }}>{item.name}</span>
              </div>
              <div style={{ color: "#64748b" }}>{item.type}</div>
              <div style={{ color: item.draft ? "#d97706" : "#16a34a", fontWeight: 500 }}>● {item.status}</div>
              <div style={{ color: "#64748b" }}>{item.date}</div>
              <div style={{ color: "#64748b" }}>{item.by}</div>
              <div><MoreVertical size={16} color="#94a3b8" /></div>
            </div>
          ))}
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-014: Website workspace (014_site_overview.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP014() {
  const router = useRouter();

  const tabs = [
    { id: "supplier-web", title: "Supplier website", icon: <Globe size={14} />, active: true },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} /> },
  ];

  const sidebarGroups = [
    {
      items: [
        { id: "overview", label: "Overview", icon: <LayoutGrid size={16} />, active: true },
        { id: "collections", label: "Collections", icon: <Database size={16} />, onClick: () => router.push("/screens/DP-029") },
        { id: "blog", label: "Blog", icon: <BookOpen size={16} />, onClick: () => router.push("/screens/DP-031") },
        { id: "assets", label: "Assets", icon: <Folder size={16} />, onClick: () => router.push("/screens/DP-033") },
        { id: "menus", label: "Menus", icon: <Layers size={16} />, onClick: () => router.push("/screens/DP-034") },
        { id: "seo", label: "SEO", icon: <Search size={16} />, onClick: () => router.push("/screens/DP-035") },
        { id: "experiments", label: "Experiments", icon: <Puzzle size={16} />, onClick: () => router.push("/screens/DP-038") },
        { id: "orders", label: "Orders", icon: <ShoppingBag size={16} />, onClick: () => router.push("/screens/DP-039") },
        { id: "submissions", label: "Submissions", icon: <FileCode2 size={16} />, onClick: () => router.push("/screens/DP-040") },
        { id: "settings", label: "Settings", icon: <Settings size={16} />, onClick: () => router.push("/screens/DP-041") },
      ],
    },
  ];

  const rightRail = (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#15233d", marginBottom: 6 }}>Preview domain</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", padding: 10, borderRadius: 6, border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>preview.example.com</span>
          <span style={{ fontSize: 10, background: "#dcfce7", color: "#166534", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>Preview only</span>
        </div>
        <a href="#" style={{ fontSize: 12, color: "#174eca", textDecoration: "none", display: "block", marginTop: 6 }}>Manage domains ↗</a>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Publishing checks</span>
          <span style={{ fontSize: 12, color: "#d97706", fontWeight: 600 }}>⚠️ 2 pending</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 8, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6 }}>
            <div>
              <div style={{ fontWeight: 600 }}>Meta description missing</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>/partners</div>
            </div>
            <ChevronRight size={14} color="#94a3b8" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 8, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6 }}>
            <div>
              <div style={{ fontWeight: 600 }}>Image alt text missing</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>/solutions/integration</div>
            </div>
            <ChevronRight size={14} color="#94a3b8" />
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14, fontSize: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Last published</div>
        <div style={{ color: "#64748b" }}>Sep 2, 2026 02:18 PM</div>
        <div style={{ color: "#64748b" }}>by Jamie Smith (jsmith@example.com)</div>
      </div>

      <button className={styles.btnPrimary} style={{ width: "100%", justifyContent: "center", padding: "10px 0" }} onClick={() => router.push("/screens/DP-028")}>
        Open studio ↗
      </button>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-014"
      tabs={tabs}
      backTo={{ label: "Projects", href: "/screens/DP-003" }}
      sidebarGroups={sidebarGroups}
      rightRail={rightRail}
    >
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Acme Corp / Supplier experience / Supplier website / Development ⌵
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#16a34a" }}>✓ Saved</span>
            <button className={styles.btnSecondary}>Open preview ↗</button>
          </div>
        </div>

        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Website overview</h1>
          <p className={styles.subtitle}>Compare draft and live revisions, manage pages, and publish updates.</p>
        </div>

        {/* Side-by-Side Revisions Comparison */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Website revisions ⓘ</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {/* Draft */}
            <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 11, background: "#dbeafe", color: "#1e40af", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>Draft</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>Updated Sep 10, 2026 10:42 AM</span>
              </div>
              <div style={{ height: 160, background: "linear-gradient(135deg, #1e3a8a, #3b82f6)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                Stronger partnerships. Better supply. (Draft r24)
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, fontSize: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#174eca", color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>AR</div>
                  <span>Alex Rivera (Developer)</span>
                </div>
                <span style={{ color: "#64748b" }}>📄 12 changed pages</span>
              </div>
            </div>

            {/* Live */}
            <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 11, background: "#dcfce7", color: "#166534", padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>Live</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>Published Sep 2, 2026 02:18 PM</span>
              </div>
              <div style={{ height: 160, background: "linear-gradient(135deg, #0f766e, #0d9488)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                Stronger partnerships. Better supply. (Live r22)
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, fontSize: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0d9488", color: "#fff", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>JS</div>
                  <span>Jamie Smith (Publisher)</span>
                </div>
                <span style={{ color: "#64748b" }}>📄 34 published pages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent pages table */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Recent pages</div>
          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <div>Page</div>
              <div>Status</div>
              <div>Revision</div>
              <div>Updated</div>
              <div>Updated by</div>
              <div />
            </div>

            {[
              { path: "/", status: "Changed", rev: "r24", date: "Sep 10, 2026 10:42 AM", by: "Alex Rivera" },
              { path: "/solutions", status: "Changed", rev: "r18", date: "Sep 10, 2026 09:31 AM", by: "Alex Rivera" },
              { path: "/partners", status: "Unchanged", rev: "r22", date: "Sep 2, 2026 02:18 PM", by: "Jamie Smith" },
              { path: "/resources", status: "Changed", rev: "r11", date: "Sep 9, 2026 05:22 PM", by: "Taylor Morgan" },
              { path: "/contact", status: "Changed", rev: "r7", date: "Sep 9, 2026 11:03 AM", by: "Alex Rivera" },
            ].map((p, i) => (
              <div key={i} className={styles.tableRow} onClick={() => router.push("/screens/DP-028")}>
                <div style={{ fontWeight: 600 }}>📄 {p.path}</div>
                <div>
                  <span style={{ fontSize: 11, background: p.status === "Changed" ? "#eff6ff" : "#f1f5f9", color: p.status === "Changed" ? "#1d4ed8" : "#64748b", padding: "2px 6px", borderRadius: 4 }}>
                    {p.status}
                  </span>
                </div>
                <div style={{ color: "#64748b" }}>{p.rev}</div>
                <div style={{ color: "#64748b" }}>{p.date}</div>
                <div>{p.by}</div>
                <div><MoreVertical size={16} color="#94a3b8" /></div>
              </div>
            ))}
          </div>
          <a href="#" style={{ fontSize: 12, color: "#174eca", textDecoration: "none", display: "block", marginTop: 8 }}>
            View all pages (38)
          </a>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-015: Link library resource to project (015_link_to_project.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP015() {
  const router = useRouter();
  const [selectedResource, setSelectedResource] = useState("supplier-header");

  return (
    <ScreenContainer currentScreenId="DP-015" backTo={{ label: "Back to Project", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Link library resource to project</h1>
          <p className={styles.subtitle}>Select shared resources from organization library to link into Supplier experience.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { id: "supplier-header", title: "Supplier header v1.2", type: "Layout component", used: "4 projects" },
            { id: "address-form", title: "Address form v2.1", type: "Form component", used: "3 projects" },
            { id: "approval-timeline", title: "Approval timeline v1.0", type: "Workflow feedback", used: "2 projects" },
            { id: "data-table", title: "Data table v3.0", type: "Data display", used: "6 projects" },
          ].map((res) => (
            <div
              key={res.id}
              onClick={() => setSelectedResource(res.id)}
              style={{
                padding: 16,
                background: "#fff",
                border: selectedResource === res.id ? "2px solid #174eca" : "1px solid #d7dfeb",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{res.title}</div>
                <input type="radio" checked={selectedResource === res.id} readOnly />
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{res.type} • Used by {res.used}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 16 }}>
          <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-005")}>Cancel</button>
          <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-016")}>Confirm and link →</button>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-016: Link confirmation and dependency updates (016_resource_updates.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP016() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-016" backTo={{ label: "Back", href: "/screens/DP-015" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Link confirmation and dependency updates</h1>
          <p className={styles.subtitle}>Review dependency changes, SemVer compatibility, and lockfile updates before linking.</p>
        </div>

        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CheckCircle2 size={24} color="#16a34a" />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Ready to link: Supplier header v1.2</div>
              <div style={{ fontSize: 13, color: "#64748b" }}>Target project: Supplier experience (App + Site)</div>
            </div>
          </div>

          <div style={{ background: "#f8fafc", padding: 14, borderRadius: 6, fontSize: 12, color: "#334155" }}>
            <div>Dependency graph resolved: 0 conflicts detected.</div>
            <div style={{ color: "#16a34a", marginTop: 4 }}>✓ SemVer compatible: ^1.2.0 matches lock requirements.</div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-005")}>Cancel</button>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-005")}>Apply link</button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-017: Project export and import dry run (017_portable_import_export.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP017() {
  const [dryRunComplete, setDryRunComplete] = useState(false);

  return (
    <ScreenContainer currentScreenId="DP-017" backTo={{ label: "Projects", href: "/screens/DP-003" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Project export and import dry run</h1>
          <p className={styles.subtitle}>Export portable project packages or simulate clean-tenant dry-run imports.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Export */}
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 700 }}>
              <Download size={20} color="#174eca" /> Export project package
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>Creates an immutable, canonical export bundle including schemas, envelopes, and manifest. Secrets and tenant IDs are redacted.</div>
            <button className={styles.btnPrimary}>Export .unierp bundle</button>
          </div>

          {/* Import Dry Run */}
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 700 }}>
              <Upload size={20} color="#174eca" /> Import simulation & dry run
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>Validate compatibility, verify Ed25519 signature, and simulate table mappings without modifying production data.</div>
            <button className={styles.btnSecondary} onClick={() => setDryRunComplete(true)}>
              Run dry-run simulation
            </button>
            {dryRunComplete && (
              <div style={{ fontSize: 12, color: "#166534", background: "#dcfce7", padding: 8, borderRadius: 6 }}>
                ✓ Dry run succeeded: 14 artifacts validated, 0 schema conflicts, 0 permission violations.
              </div>
            )}
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-018: Library package release and overlays (018_package_publish_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP018() {
  return (
    <ScreenContainer currentScreenId="DP-018">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Library package release and overlays</h1>
          <p className={styles.subtitle}>Publish versioned library packages, configure overlay extension slots, and sign releases.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Package Details</div>
          <div style={{ display: "flex", gap: 16 }}>
            <input type="text" defaultValue="@acme/supplier-components" style={{ flex: 1, padding: "8px 12px", border: "1px solid #d7dfeb", borderRadius: 6 }} />
            <input type="text" defaultValue="v1.3.0" style={{ width: 120, padding: "8px 12px", border: "1px solid #d7dfeb", borderRadius: 6 }} />
            <button className={styles.btnPrimary}>Publish package</button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-019: Package retirement and uninstall review (019_package_retirement_final.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP019() {
  return (
    <ScreenContainer currentScreenId="DP-019">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Package retirement and uninstall review</h1>
          <p className={styles.subtitle}>Inspect dependent consumers, deprecate or quarantine package versions safely.</p>
        </div>
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 18, color: "#991b1b" }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>⚠️ Retirement impact review</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Package @acme/legacy-forms is currently used by 2 active projects. Retiring will prevent new installations.</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-020: Reusable component builder (020_component_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP020() {
  return (
    <ScreenContainer currentScreenId="DP-020">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Reusable component builder</h1>
          <p className={styles.subtitle}>Visual authoring of shared layout, form, and feedback components.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, height: 400, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b" }}>
          Component Visual Canvas & Property Inspector
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-021: Component lifecycle management (021_component_governance.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP021() {
  return (
    <ScreenContainer currentScreenId="DP-021">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Component lifecycle management</h1>
          <p className={styles.subtitle}>Manage component deprecations, versions, and cross-project usage analytics.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Registered Governance Matrix</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>12 active components • 2 deprecated • 0 quarantined</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-022: Project lifecycle and general settings (022_project_settings.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP022() {
  return (
    <ScreenContainer currentScreenId="DP-022">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Project lifecycle and general settings</h1>
          <p className={styles.subtitle}>Manage project branding, slug, environment targets, and archival policies.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Project Name</label>
            <input type="text" defaultValue="Supplier experience" style={{ width: "100%", padding: 8, border: "1px solid #d7dfeb", borderRadius: 6 }} />
          </div>
          <button className={styles.btnPrimary} style={{ width: 140 }}>Save changes</button>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-023: Project settings and access (023_project_settings.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP023() {
  return (
    <ScreenContainer currentScreenId="DP-023">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Project settings and access</h1>
          <p className={styles.subtitle}>Configure collaborator permissions, builder access limits, and role assignments.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Project Members (3)</div>
          <div style={{ fontSize: 13, color: "#64748b" }}>Ava Rodriguez (Owner), Alex Rivers (Developer), Jamie Smith (Publisher)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-024: Developer command center and utilities (024_workspace_utilities.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP024() {
  return (
    <ScreenContainer currentScreenId="DP-024">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Developer command center and utilities</h1>
          <p className={styles.subtitle}>Global shortcuts, cache management, CLI tooling tokens, and diagnostics.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>CLI Token Generator</div>
            <button className={styles.btnSecondary} style={{ marginTop: 8 }}>Generate token</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>Cache Purge</div>
            <button className={styles.btnSecondary} style={{ marginTop: 8 }}>Purge preview cache</button>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>Diagnostics</div>
            <button className={styles.btnSecondary} style={{ marginTop: 8 }}>Run system health check</button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-025: Navigation and recovery states (025_navigation_states.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP025() {
  return (
    <ScreenContainer currentScreenId="DP-025">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Navigation and recovery states</h1>
          <p className={styles.subtitle}>Fallback routers, project breadcrumbs, cross-tenant guards, and crash recovery.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, color: "#16a34a" }}>✓ Safe Navigation Active</div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>Deep links resolve with tenant verification and error boundary fallbacks.</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-026: Loading, empty, error, and access states (026_system_states.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP026() {
  return (
    <ScreenContainer currentScreenId="DP-026">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Loading, empty, error, and access states</h1>
          <p className={styles.subtitle}>Standardized Strata feedback components for zero-data, network error, and 403 Forbidden states.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20, textAlign: "center" }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Empty State</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>No records found. Click create to begin.</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20, textAlign: "center" }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Error State</div>
            <div style={{ fontSize: 12, color: "#b91c1c" }}>Network connection lost. Retry request.</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20, textAlign: "center" }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Forbidden State</div>
            <div style={{ fontSize: 12, color: "#b45309" }}>403: Missing builder.write permission.</div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}
