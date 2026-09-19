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
} from "lucide-react";
import { ScreenContainer } from "../ScreenContainer";
import styles from "./Journey01.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// DP-076: Preview and quality (076_responsive_preview.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP076() {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  return (
    <ScreenContainer currentScreenId="DP-076" backTo={{ label: "Project overview", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Responsive Preview &amp; Quality Audit</h1>
            <p className={styles.subtitle}>Test multi-device rendering, WCAG 2.2 AA accessibility, and Core Web Vitals.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnSecondary} onClick={() => setDevice("desktop")}>Desktop (1440px)</button>
            <button className={styles.btnSecondary} onClick={() => setDevice("tablet")}>Tablet (768px)</button>
            <button className={styles.btnSecondary} onClick={() => setDevice("mobile")}>Mobile (375px)</button>
          </div>
        </div>

        {/* Quality Audit Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>Accessibility (a11y)</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#16a34a", marginTop: 4 }}>100 / 100</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>WCAG 2.2 AA compliant</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>Performance (CWV)</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#16a34a", marginTop: 4 }}>98 / 100</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>LCP 0.8s • CLS 0.00</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>Design Tokens</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#16a34a", marginTop: 4 }}>100% Strata 2.0</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>0 Token violations</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 12, color: "#64748b" }}>Cross-Browser</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#16a34a", marginTop: 4 }}>Verified</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Chromium, WebKit, Gecko</div>
          </div>
        </div>

        {/* Viewport Frame */}
        <div style={{ display: "flex", justifyContent: "center", padding: 20, background: "#e2e8f0", borderRadius: 8 }}>
          <div style={{ width: device === "desktop" ? "100%" : device === "tablet" ? 768 : 375, height: 420, background: "#fff", borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Live Viewport Rendering ({device})</div>
            <div style={{ marginTop: 12, color: "#64748b", fontSize: 13 }}>Responsive layout adapts fluidly according to Strata breakpoint grid.</div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-077: Test suite designer (077_test_suite_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP077() {
  return (
    <ScreenContainer currentScreenId="DP-077" backTo={{ label: "Preview & quality", href: "/screens/DP-076" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Test Suite Designer</h1>
            <p className={styles.subtitle}>Compose automated E2E Playwright tests, contract validation suites, and RLS tenant boundary tests.</p>
          </div>
          <button className={styles.btnPrimary}><Play size={14} /> Run Test Suite</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Suite: Purchase Order End-to-End Lifecycle</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <span>Step 1: Authenticate as test.agent@unierp.com (Tenant: Acme Corp)</span>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>Configured</span>
            </div>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <span>Step 2: Submit PO form with $42,850.00 amount</span>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>Configured</span>
            </div>
            <div style={{ padding: 12, border: "1px solid #e2e8f0", borderRadius: 6, display: "flex", justifyContent: "space-between" }}>
              <span>Step 3: Verify PostgreSQL RLS prevents cross-tenant record leakage</span>
              <span style={{ color: "#16a34a", fontWeight: 600 }}>Configured</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-078: Test run evidence (078_test_evidence_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP078() {
  return (
    <ScreenContainer currentScreenId="DP-078" backTo={{ label: "Test suites", href: "/screens/DP-077" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Test Run Evidence Ledger</h1>
          <p className={styles.subtitle}>Cryptographically sealed execution evidence, JUnit results, and Playwright video traces.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>Run #EVID-2026-0919-4410 (Commit: 8d20fa1)</span>
            <span style={{ padding: "4px 10px", background: "#dcfce7", color: "#166534", borderRadius: 12, fontSize: 12, fontWeight: 700 }}>ALL 48 TESTS PASSED</span>
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
            <button className={styles.btnSecondary}><Download size={13} /> Export JUnit XML</button>
            <button className={styles.btnSecondary}><Download size={13} /> Download Trace ZIP</button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-079: Changeset and dependency impact (079_change_impact.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP079() {
  return (
    <ScreenContainer currentScreenId="DP-079" backTo={{ label: "Project overview", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Changeset &amp; Dependency Impact</h1>
          <p className={styles.subtitle}>Blast radius analysis, downstream API consumers, and breaking change prevention.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Target Artifact: SupplierProfile (Schema Delta)</div>
          <div style={{ padding: 12, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 6, fontSize: 13, color: "#166534" }}>
            ✓ Non-breaking additive change: Added nullable column <code>tax_identification_number</code>.
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-080: Collaborative review and conflicts (080_collaboration_review_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP080() {
  return (
    <ScreenContainer currentScreenId="DP-080" backTo={{ label: "Project overview", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Collaborative Review &amp; Conflicts</h1>
          <p className={styles.subtitle}>Peer review changes, inspect side-by-side JSON diffs, and resolve metadata merge conflicts.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Review Status: 2 Approvals Required</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-081: Source control and merge review (081_git.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP081() {
  return (
    <ScreenContainer currentScreenId="DP-081" backTo={{ label: "Project overview", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Git Source Control &amp; Branches</h1>
            <p className={styles.subtitle}>Manage repository branches, pull requests, and multi-repo atomic commits.</p>
          </div>
          <button className={styles.btnPrimary}><GitPullRequest size={14} /> New Pull Request</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Current Branch: <code>main</code> (Clean working tree)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-082: Metadata migration and reconciliation (082_schema_migration.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP082() {
  return (
    <ScreenContainer currentScreenId="DP-082" backTo={{ label: "Project overview", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Metadata Migration &amp; Schema Reconciliation</h1>
          <p className={styles.subtitle}>Safe zero-downtime expand/contract schema evolution for multi-tenant PostgreSQL.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Migration History: 14 Applied • 0 Pending</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-083: Theme and token editor (083_theme_manager.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP083() {
  return (
    <ScreenContainer currentScreenId="DP-083" backTo={{ label: "Project overview", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Theme &amp; Design Token Manager</h1>
          <p className={styles.subtitle}>Configure Strata 2.0 design tokens, typography scales, brand accents, and high-contrast modes.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Primary Brand Palette</div>
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <div style={{ width: 60, height: 60, background: "#174eca", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>#174eca</div>
            <div style={{ width: 60, height: 60, background: "#2563eb", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>#2563eb</div>
            <div style={{ width: 60, height: 60, background: "#3b82f6", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700 }}>#3b82f6</div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-084: Builder registration and conformance (084_builder_conformance_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP084() {
  return (
    <ScreenContainer currentScreenId="DP-084" backTo={{ label: "Project overview", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Builder Registration &amp; Conformance Suite</h1>
          <p className={styles.subtitle}>Verify builder capability profiles, layer isolation rules, and protocol compliance.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, color: "#16a34a" }}>✓ All 14 Builders Fully Registered and Conforming</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-085: Release review (085_releases.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP085() {
  return (
    <ScreenContainer currentScreenId="DP-085" backTo={{ label: "Project overview", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Release Review &amp; Staging</h1>
            <p className={styles.subtitle}>Review compiled bundle, verified test gates, and automated release notes.</p>
          </div>
          <button className={styles.btnPrimary}><CheckCheck size={14} /> Approve Release</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Candidate: Release v1.4.0 (Build #892)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-086: Cross-project release history (086_release_history.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP086() {
  return (
    <ScreenContainer currentScreenId="DP-086" backTo={{ label: "Releases", href: "/screens/DP-085" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Cross-Project Release History</h1>
          <p className={styles.subtitle}>Historical deployment audit across Development, Staging, and Production tiers.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Release Timeline</div>
          <div style={{ marginTop: 12, fontSize: 13, color: "#64748b" }}>v1.3.9 deployed to Production by test.agent@unierp.com</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-087: Environments and configuration (087_environments.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP087() {
  return (
    <ScreenContainer currentScreenId="DP-087" backTo={{ label: "Project overview", href: "/screens/DP-005" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Environments &amp; Configuration</h1>
          <p className={styles.subtitle}>Manage isolated execution environments, DNS hostnames, and runtime parameters.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>Development (dev-01)</div>
            <div style={{ fontSize: 12, color: "#16a34a", marginTop: 4 }}>Healthy • v1.4.0-alpha</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>Staging (stage-us-east)</div>
            <div style={{ fontSize: 12, color: "#16a34a", marginTop: 4 }}>Healthy • v1.3.9</div>
          </div>
          <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>Production (prod-cluster)</div>
            <div style={{ fontSize: 12, color: "#16a34a", marginTop: 4 }}>Healthy • v1.3.9</div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-088: Environment provisioning and synthetic data (088_environment_bootstrap_final.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP088() {
  return (
    <ScreenContainer currentScreenId="DP-088" backTo={{ label: "Environments", href: "/screens/DP-087" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Environment Provisioning &amp; Synthetic Data</h1>
            <p className={styles.subtitle}>Spin up ephemeral developer sandboxes pre-seeded with synthetic test fixtures.</p>
          </div>
          <button className={styles.btnPrimary}><Play size={14} /> Bootstrap Environment</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Preset: Acme Corp Standard Enterprise Fixture</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-089: Release pipeline and approval (089_release_pipeline_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP089() {
  return (
    <ScreenContainer currentScreenId="DP-089" backTo={{ label: "Releases", href: "/screens/DP-085" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>CI/CD Release Pipeline &amp; Gates</h1>
          <p className={styles.subtitle}>Automated gating pipeline: Typecheck $\rightarrow$ Tests $\rightarrow$ RLS Security $\rightarrow$ Approval $\rightarrow$ Blue/Green Deploy.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ padding: 12, background: "#dcfce7", borderRadius: 6, fontWeight: 600, fontSize: 13, color: "#166534" }}>✓ 1. Typecheck</div>
            <ArrowRight size={16} color="#94a3b8" />
            <div style={{ padding: 12, background: "#dcfce7", borderRadius: 6, fontWeight: 600, fontSize: 13, color: "#166534" }}>✓ 2. Tests (48/48)</div>
            <ArrowRight size={16} color="#94a3b8" />
            <div style={{ padding: 12, background: "#dcfce7", borderRadius: 6, fontWeight: 600, fontSize: 13, color: "#166534" }}>✓ 3. RLS Security</div>
            <ArrowRight size={16} color="#94a3b8" />
            <div style={{ padding: 12, background: "#eff6ff", border: "2px solid #2563eb", borderRadius: 6, fontWeight: 700, fontSize: 13, color: "#1d4ed8" }}>4. Production Gate</div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-090: Deployment failure and recovery (090_deployment_recovery_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP090() {
  return (
    <ScreenContainer currentScreenId="DP-090" backTo={{ label: "Releases", href: "/screens/DP-085" }}>
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Deployment Failure &amp; Automated Recovery</h1>
          <p className={styles.subtitle}>Instant traffic drainage, circuit breaker activation, and 1-click rollback orchestrations.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, color: "#16a34a" }}>System Normal: Zero Active Incidents</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-091: Mobile packaging and export (091_mobile_export.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP091() {
  return (
    <ScreenContainer currentScreenId="DP-091" backTo={{ label: "Mobile builder", href: "/screens/DP-056" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Mobile Packaging &amp; App Store Export</h1>
            <p className={styles.subtitle}>Generate signed iOS IPA and Android APK/AAB packages with OTA update channel configuration.</p>
          </div>
          <button className={styles.btnPrimary}><Download size={14} /> Build Production Bundle</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Package: com.acme.supplierhub (v1.2.0)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}
