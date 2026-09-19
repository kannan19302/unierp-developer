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
  Search,
  ExternalLink,
  MoreVertical,
  Laptop,
  Smartphone,
  CheckCircle2,
  Settings,
  ShoppingBag,
  Eye,
  Sliders,
  Sparkles,
  FileText,
  Image,
  Navigation,
  Compass,
} from "lucide-react";
import { ScreenContainer } from "../ScreenContainer";
import styles from "./Journey01.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// DP-027: Page tree and page creation (027_pages.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP027() {
  const router = useRouter();

  return (
    <ScreenContainer currentScreenId="DP-027" backTo={{ label: "Website overview", href: "/screens/DP-014" }}>
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Pages</h1>
            <p className={styles.subtitle}>Organize and manage the site hierarchy, dynamic route slugs, and page layouts.</p>
          </div>
          <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-028")}>
            + New page
          </button>
        </div>

        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#f8fafc", borderRadius: 6, fontWeight: 600 }}>
              <span>🏠 / (Home)</span>
              <span style={{ color: "#16a34a" }}>Published</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#fff", borderRadius: 6 }}>
              <span style={{ paddingLeft: 16 }}>📄 /solutions</span>
              <span style={{ color: "#16a34a" }}>Published</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#fff", borderRadius: 6 }}>
              <span style={{ paddingLeft: 16 }}>📄 /partners</span>
              <span style={{ color: "#2563eb" }}>Draft</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#fff", borderRadius: 6 }}>
              <span style={{ paddingLeft: 16 }}>📄 /contact</span>
              <span style={{ color: "#16a34a" }}>Published</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-028: Website visual builder (028_website_builder.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP028() {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [selectedLayer, setSelectedLayer] = useState("hero");

  const rightInspector = (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Hero</div>
        <MoreVertical size={16} color="#64748b" />
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid #e2e8f0", paddingBottom: 8, fontSize: 13 }}>
        <span style={{ fontWeight: 600, color: "#174eca", borderBottom: "2px solid #174eca", paddingBottom: 8 }}>Settings</span>
        <span style={{ color: "#64748b" }}>Styles</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 12 }}>
        <div>
          <label style={{ fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>Grid Layout</label>
          <select style={{ width: "100%", padding: 6, border: "1px solid #d7dfeb", borderRadius: 6, background: "#fff" }}>
            <option>2 columns</option>
            <option>1 column</option>
            <option>3 columns</option>
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <label style={{ fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>Gap</label>
            <input type="text" defaultValue="32 px" style={{ width: "100%", padding: 6, border: "1px solid #d7dfeb", borderRadius: 6 }} />
          </div>
          <div>
            <label style={{ fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>Padding</label>
            <input type="text" defaultValue="64 px" style={{ width: "100%", padding: 6, border: "1px solid #d7dfeb", borderRadius: 6 }} />
          </div>
        </div>
        <div>
          <label style={{ fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>Align items</label>
          <select style={{ width: "100%", padding: 6, border: "1px solid #d7dfeb", borderRadius: 6, background: "#fff" }}>
            <option>Center</option>
            <option>Start</option>
            <option>End</option>
          </select>
        </div>
        <div>
          <label style={{ fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>Accessibility Landmark</label>
          <select style={{ width: "100%", padding: 6, border: "1px solid #d7dfeb", borderRadius: 6, background: "#fff" }}>
            <option>Banner (role=banner)</option>
          </select>
          <span style={{ fontSize: 11, color: "#64748b", marginTop: 4, display: "block" }}>Identifies the hero as a banner landmark.</span>
        </div>
      </div>
    </div>
  );

  return (
    <ScreenContainer currentScreenId="DP-028" rightRail={rightInspector}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f8fafc" }}>
        {/* Top Builder Toolbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px", background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", gap: 12, fontSize: 12, fontWeight: 600 }}>
            <span style={{ color: "#174eca", borderBottom: "2px solid #174eca", paddingBottom: 4 }}>Pages</span>
            <span style={{ color: "#64748b" }}>Layers</span>
            <span style={{ color: "#64748b" }}>Insert</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => setDevice("desktop")}
              style={{ padding: "4px 8px", border: "1px solid #d7dfeb", borderRadius: 4, background: device === "desktop" ? "#eff6ff" : "#fff" }}
            >
              <Laptop size={14} color={device === "desktop" ? "#174eca" : "#64748b"} />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              style={{ padding: "4px 8px", border: "1px solid #d7dfeb", borderRadius: 4, background: device === "mobile" ? "#eff6ff" : "#fff" }}
            >
              <Smartphone size={14} color={device === "mobile" ? "#174eca" : "#64748b"} />
            </button>
            <span style={{ fontSize: 12, color: "#64748b" }}>100% ⌵</span>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnSecondary} style={{ padding: "4px 10px", fontSize: 12 }}>Preview</button>
            <button className={styles.btnPrimary} style={{ padding: "4px 10px", fontSize: 12 }}>Review release</button>
          </div>
        </div>

        {/* Builder Canvas */}
        <div style={{ flex: 1, padding: 24, display: "flex", justifyContent: "center", overflowY: "auto" }}>
          <div
            style={{
              width: device === "desktop" ? "100%" : 375,
              maxWidth: 1040,
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            {/* Header section */}
            <div style={{ padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ fontWeight: 700, color: "#174eca", fontSize: 16 }}>▲ ACME SUPPLY</div>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#64748b" }}>
                <span>Solutions</span><span>Partners</span><span>Resources</span><span>Contact</span>
              </div>
            </div>

            {/* Hero section (Active bounding box) */}
            <div
              style={{
                padding: "48px 36px",
                border: "2px solid #174eca",
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: 32,
                alignItems: "center",
              }}
            >
              <span style={{ position: "absolute", top: -10, left: 16, background: "#174eca", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 3 }}>
                Hero
              </span>
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", lineHeight: 1.15, margin: 0 }}>
                  Stronger partnerships. <br /><span style={{ color: "#174eca" }}>Better supply.</span>
                </h2>
                <p style={{ fontSize: 13, color: "#475569", margin: "14px 0 20px", lineHeight: 1.5 }}>
                  Acme Supply connects you with the products, insights, and support to move your business forward.
                </p>
                <button className={styles.btnPrimary}>Become a supplier →</button>
              </div>
              <div style={{ height: 180, background: "linear-gradient(135deg, #1e3a8a, #3b82f6)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>
                Architectural Illustration
              </div>
            </div>

            {/* 3 feature boxes */}
            <div style={{ padding: "32px 36px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Trusted solutions</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Curated offerings from quality suppliers you can count on.</div>
              </div>
              <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Data-driven insights</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Actionable analytics to help you plan, source, and grow.</div>
              </div>
              <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Dedicated support</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Expert teams ensuring you get the help you need, fast.</div>
              </div>
            </div>

            {/* Dark footer */}
            <div style={{ padding: "20px 36px", background: "#0f172a", color: "#94a3b8", fontSize: 12, display: "flex", justifyContent: "space-between" }}>
              <span>▲ ACME SUPPLY</span>
              <span>© 2026 Acme Supply. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-029 to DP-042: CMS Collections, Blog, Assets, Menus, SEO, Consent, etc.
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP029() {
  return (
    <ScreenContainer currentScreenId="DP-029">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>CMS collections and records</h1>
          <p className={styles.subtitle}>Manage structured collections, relational items, and content schemas.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Collections: Articles (24), Products (180), FAQs (12)</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP030() {
  return (
    <ScreenContainer currentScreenId="DP-030">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Collection schema and item editor</h1>
          <p className={styles.subtitle}>Define collection fields, validations, and preview localized content items.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Schema Field Designer & Item Editor</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP031() {
  return (
    <ScreenContainer currentScreenId="DP-031">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Blog publishing workspace</h1>
          <p className={styles.subtitle}>Manage draft, scheduled, and published blog posts with author attribution.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Blog Posts Catalog</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP032() {
  return (
    <ScreenContainer currentScreenId="DP-032">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Blog post editor</h1>
          <p className={styles.subtitle}>Rich text and Markdown article composition with live SEO preview.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Article Editor Canvas</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP033() {
  return (
    <ScreenContainer currentScreenId="DP-033">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Asset library and upload</h1>
          <p className={styles.subtitle}>Media storage, safe upload scanning, image transformation, and CDN URLs.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Media Asset Library</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP034() {
  return (
    <ScreenContainer currentScreenId="DP-034">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Navigation menu builder</h1>
          <p className={styles.subtitle}>Drag-and-drop tree navigation, mega-menus, and role-conditioned links.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Menu Hierarchy Designer</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP035() {
  return (
    <ScreenContainer currentScreenId="DP-035">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>SEO metadata and redirects</h1>
          <p className={styles.subtitle}>OpenGraph tags, Twitter card previews, sitemap.xml, and 301 redirect rules.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>SEO Metadata & Redirect Engine</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP036() {
  return (
    <ScreenContainer currentScreenId="DP-036">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Localization and RTL workbench</h1>
          <p className={styles.subtitle}>Multi-language translation keys, RTL direction preview, and locale fallback.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Localization Dictionary & RTL Simulator</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP037() {
  return (
    <ScreenContainer currentScreenId="DP-037">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Public access and consent</h1>
          <p className={styles.subtitle}>Cookie consent banners, GDPR/CCPA privacy toggles, and anonymous data policies.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Consent Banner & Privacy Settings</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP038() {
  return (
    <ScreenContainer currentScreenId="DP-038">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>A/B experiment design</h1>
          <p className={styles.subtitle}>Multi-variant experiments, traffic split sliders, and conversion goals.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>A/B Experiment Manager</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP039() {
  return (
    <ScreenContainer currentScreenId="DP-039">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Website commerce orders</h1>
          <p className={styles.subtitle}>Orders dashboard, payment sync, shipping status, and fulfillment details.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Orders Table & Transaction Log</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP040() {
  return (
    <ScreenContainer currentScreenId="DP-040">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Form submissions inbox</h1>
          <p className={styles.subtitle}>Review submitted form responses, spam filter flags, and CSV export.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Submissions Inbox</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP041() {
  return (
    <ScreenContainer currentScreenId="DP-041">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Site settings and domains</h1>
          <p className={styles.subtitle}>Custom domain DNS verification, SSL status, and CDN cache invalidation.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Site Domains & Configuration</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

export function ScreenDP042() {
  return (
    <ScreenContainer currentScreenId="DP-042">
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Site revisions and rollback</h1>
          <p className={styles.subtitle}>Historical revision timeline with 1-click rollback and version diffing.</p>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700 }}>Revisions Timeline & Instant Rollback</div>
        </div>
      </div>
    </ScreenContainer>
  );
}
