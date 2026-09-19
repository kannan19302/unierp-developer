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
} from "lucide-react";
import { ScreenContainer } from "../ScreenContainer";
import styles from "./Journey01.module.css";

// ─────────────────────────────────────────────────────────────────────────────
// DP-001: Sign-in handoff and callback recovery (001_auth_states.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP001() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [showSessionExpiredBanner, setShowSessionExpiredBanner] = useState(true);

  const tabs = [
    { id: "flow", title: "Authentication flow", icon: <Globe size={14} /> },
    { id: "spec", title: "State specification", icon: <FileCode2 size={14} />, active: true },
    { id: "diagram", title: "Flow diagram", icon: <Workflow size={14} /> },
    { id: "story", title: "User story", icon: <UserCheck size={14} /> },
  ];

  const sidebarGroups = [
    {
      title: "AUTH FLOW",
      items: [
        { id: "spec", label: "State specification", icon: <FileCode2 size={15} />, active: true },
        { id: "diagram", label: "Flow diagram", icon: <Workflow size={15} /> },
        { id: "screens", label: "Screens", icon: <LayoutGrid size={15} /> },
        { id: "messages", label: "Messages", icon: <Folder size={15} /> },
        { id: "rules", label: "Rules", icon: <Settings size={15} /> },
      ],
    },
    {
      title: "VALIDATION",
      items: [
        { id: "pending", label: "Pending checks", icon: <CheckCircle2 size={15} />, badge: 2 },
        { id: "approvals", label: "Approvals", icon: <Shield size={15} />, badge: 1 },
      ],
    },
    {
      title: "ACTIVITY",
      items: [
        { id: "audit", label: "Audit log", icon: <FileCode2 size={15} /> },
        { id: "comments", label: "Comments", icon: <Folder size={15} /> },
      ],
    },
    {
      title: "CONFIG",
      items: [{ id: "settings", label: "Settings", icon: <Settings size={15} /> }],
    },
  ];

  return (
    <ScreenContainer
      currentScreenId="DP-001"
      tabs={tabs}
      backTo={{ label: "Projects", href: "/projects" }}
      sidebarGroups={sidebarGroups}
      bottomBanner={
        showSessionExpiredBanner
          ? {
              icon: <Clock size={20} color="#d97706" />,
              title: "Your session has expired.",
              subtitle: "Reauthenticate to resume. Unsynced changes remain pending.",
              actions: (
                <>
                  <button className={styles.btnSecondary} onClick={() => alert("Returned home")}>
                    Return home
                  </button>
                  <button className={styles.btnPrimary} onClick={() => setActiveStep(1)}>
                    Reauthenticate
                  </button>
                </>
              ),
              onClose: () => setShowSessionExpiredBanner(false),
            }
          : undefined
      }
    >
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
              <span>Scope:</span>
              <span style={{ fontWeight: 600, color: "#15233d" }}>Developer / Authentication handoff ⌵</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#64748b" }}>Version:</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>1.0 (Draft) ⌵</span>
            <span className={styles.statusPillBlue}>● In progress</span>
            <button className={styles.btnPrimary} style={{ padding: "6px 14px" }}>Share</button>
            <MoreVertical size={16} color="#64748b" />
          </div>
        </div>

        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Authentication flow state specification</h1>
          <p className={styles.subtitle}>
            Hosted Identity handles authentication: Developer displays handoff and return states.
          </p>
        </div>

        {/* 3-Card Interactive Flow */}
        <div className={styles.authStatesGrid}>
          {/* Card 1: Sign-in handoff */}
          <div
            className={styles.stateCard}
            style={activeStep === 1 ? { borderColor: "#174eca", boxShadow: "0 0 0 2px rgba(23,78,202,0.15)" } : {}}
            onClick={() => setActiveStep(1)}
          >
            <div className={styles.stateCardHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className={styles.stateNumberCircle}>1</div>
                <div className={styles.stateCardTitle}>Sign-in handoff</div>
              </div>
              <span className={styles.statusPillBlue}>In progress</span>
            </div>

            <div style={{ fontSize: 13, color: "#53647e" }}>
              <strong>Purpose:</strong> Initiates secure sign-in by redirecting the user to the Hosted Identity provider.
            </div>

            <div style={{ fontSize: 12, fontWeight: 600, color: "#15233d" }}>What the user sees</div>
            <div className={styles.innerPreviewBox}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eff6ff", color: "#174eca", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Globe size={18} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>UniERP Developer</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Continue to secure sign-in</div>
              <div style={{ display: "flex", gap: 6, margin: "6px 0" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#174eca" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1" }} />
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#cbd5e1" }} />
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>Redirecting to sign-in... You will be signed in securely.</div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#15233d", marginBottom: 6 }}>System actions</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#53647e", lineHeight: 1.6 }}>
                <li>Validates request and prepares authentication context</li>
                <li>Redirects to identity provider for authentication</li>
                <li>No credentials are collected on this page</li>
              </ul>
            </div>

            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 10, fontSize: 12, color: "#64748b" }}>
              Transitions: On successful handoff → <span style={{ color: "#174eca", fontWeight: 600, cursor: "pointer" }} onClick={() => setActiveStep(2)}>State 2</span>
            </div>
          </div>

          {/* Card 2: Completing sign-in */}
          <div
            className={styles.stateCard}
            style={activeStep === 2 ? { borderColor: "#174eca", boxShadow: "0 0 0 2px rgba(23,78,202,0.15)" } : {}}
            onClick={() => setActiveStep(2)}
          >
            <div className={styles.stateCardHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className={styles.stateNumberCircle}>2</div>
                <div className={styles.stateCardTitle}>Completing sign-in</div>
              </div>
              <span className={styles.statusPillBlue}>In progress</span>
            </div>

            <div style={{ fontSize: 13, color: "#53647e" }}>
              <strong>Purpose:</strong> Restores the requested Developer project after hosted Identity sign-in.
            </div>

            <div style={{ fontSize: 12, fontWeight: 600, color: "#15233d" }}>What the user sees</div>
            <div className={styles.innerPreviewBox}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: "#eff6ff", color: "#174eca", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Layers size={18} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>UniERP Developer</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Completing sign-in...</div>
              <div style={{ width: 140, height: 4, background: "#e2e8f0", borderRadius: 2, overflow: "hidden", margin: "8px 0" }}>
                <div style={{ width: "65%", height: "100%", background: "#174eca" }} />
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>Restoring your requested project. Please wait.</div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#15233d", marginBottom: 6 }}>System actions</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#53647e", lineHeight: 1.6 }}>
                <li>Validates authentication response</li>
                <li>Establishes user session</li>
                <li>Restores requested project and user context</li>
              </ul>
            </div>

            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 10, fontSize: 12, color: "#64748b" }}>
              Transitions: On success → <span style={{ color: "#174eca", fontWeight: 600 }}>Redirect to requested project</span>
            </div>
          </div>

          {/* Card 3: Session could not be completed */}
          <div
            className={styles.stateCard}
            style={activeStep === 3 ? { borderColor: "#ef4444", boxShadow: "0 0 0 2px rgba(239,68,68,0.15)" } : {}}
            onClick={() => setActiveStep(3)}
          >
            <div className={styles.stateCardHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div className={styles.stateNumberCircle} style={{ background: "#ef4444" }}>3</div>
                <div className={styles.stateCardTitle}>Session could not be completed</div>
              </div>
              <span className={styles.statusPillRed}>Error</span>
            </div>

            <div style={{ fontSize: 13, color: "#53647e" }}>
              <strong>Purpose:</strong> Informs the user that the session could not be established and provides safe recovery options.
            </div>

            <div style={{ fontSize: 12, fontWeight: 600, color: "#15233d" }}>What the user sees</div>
            <div className={styles.innerPreviewBox}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#fef2f2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertTriangle size={18} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>UniERP Developer</div>
              <div style={{ fontSize: 12, color: "#b91c1c" }}>We couldn't complete your session</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Reference: AUTH-DEMO-01</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button className={styles.btnPrimary} style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => setActiveStep(1)}>
                  Try again
                </button>
                <button className={styles.btnSecondary} style={{ padding: "4px 10px", fontSize: 11 }}>
                  Return home
                </button>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#15233d", marginBottom: 6 }}>System actions</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: "#53647e", lineHeight: 1.6 }}>
                <li>Clears partial session artifacts</li>
                <li>Logs telemetry for diagnostics</li>
                <li>Keeps user data secure</li>
              </ul>
            </div>

            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 10, fontSize: 12, color: "#64748b" }}>
              Transitions: Try again → <span style={{ color: "#174eca", fontWeight: 600, cursor: "pointer" }} onClick={() => setActiveStep(1)}>State 1</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-002: Developer getting started (002_developer_getting_started_refined.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP002() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"app" | "site" | "library">("app");

  const tabs = [
    { id: "projects", title: "Projects", icon: <Folder size={14} /> },
    { id: "getting-started", title: "Getting started", icon: <Globe size={14} />, active: true },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} /> },
  ];

  const sidebarGroups = [
    {
      items: [
        { id: "start", label: "Getting started", icon: <Sparkles size={16} />, active: true },
        { id: "projects", label: "Projects", icon: <Folder size={16} /> },
        { id: "library", label: "Library", icon: <BookOpen size={16} /> },
        { id: "environments", label: "Environments", icon: <Database size={16} /> },
        { id: "monitoring", label: "Monitoring", icon: <Clock size={16} /> },
        { id: "collaborators", label: "Collaborators", icon: <UserCheck size={16} /> },
        { id: "deployments", label: "Deployments", icon: <Tag size={16} /> },
        { id: "cicd", label: "CI/CD", icon: <Workflow size={16} /> },
        { id: "settings", label: "Settings", icon: <Settings size={16} /> },
      ],
    },
    {
      title: "RESOURCES",
      items: [
        { id: "docs", label: "Documentation ↗", icon: <FileCode2 size={16} /> },
        { id: "api-ref", label: "API reference ↗", icon: <Code2 size={16} /> },
        { id: "occ", label: "OCC (policy) ↗", icon: <Shield size={16} /> },
      ],
    },
  ];

  const rightRail = (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#15233d", marginBottom: 6 }}>
          Your first build guide
        </div>
        <div style={{ fontSize: 13, color: "#53647e", marginBottom: 16 }}>
          Follow these steps to create and preview your first project.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { num: 1, title: "Choose what to create", desc: "Start an app project, a site project or an independent library resource." },
            { num: 2, title: "Use a template or start from scratch", desc: "Pick a template to get going quickly, or start with a blank project." },
            { num: 3, title: "Explore and customize", desc: "Add screens, forms, data, and workflows using the visual builder." },
            { num: 4, title: "Run a preview", desc: "Test your project in a safe environment before sharing." },
            { num: 5, title: "Invite collaborators", desc: "Bring in teammates to iterate together." },
          ].map((step) => (
            <div key={step.num} style={{ display: "flex", gap: 12 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#174eca",
                  color: "#ffffff",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#15233d" }}>{step.title}</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 18 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#15233d", marginBottom: 12 }}>
          Helpful resources
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", color: "#174eca", fontSize: 13 }}>
            <span>Developer documentation</span>
            <ExternalLink size={13} />
          </a>
          <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", color: "#174eca", fontSize: 13 }}>
            <span>Tutorial: Build your first app</span>
            <ExternalLink size={13} />
          </a>
          <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", color: "#174eca", fontSize: 13 }}>
            <span>Video walkthrough</span>
            <ExternalLink size={13} />
          </a>
          <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", color: "#174eca", fontSize: 13 }}>
            <span>Developer community</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#166534", display: "flex", alignItems: "center", gap: 6 }}>
          <Sparkles size={16} /> Need help?
        </div>
        <div style={{ fontSize: 12, color: "#14532d", marginTop: 4 }}>
          Visit the documentation or reach out to your organization's developer team.
        </div>
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-002"
      tabs={tabs}
      backTo={{ label: "Back to Developer", href: "/projects" }}
      sidebarGroups={sidebarGroups}
      rightRail={rightRail}
    >
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <span className={styles.eyebrow}>DEVELOPER STUDIO</span>
          <h1 className={styles.title}>Welcome to Developer Studio</h1>
          <p className={styles.subtitle}>
            Build applications, sites, and reusable resources for your organization. Get set up and create your first project to start building with UniERP.
          </p>
        </div>

        {/* Get started checklist card */}
        <div className={styles.checklistCard}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Get started</div>
            <a href="#" style={{ color: "#174eca", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
              View documentation →
            </a>
          </div>
          <div style={{ fontSize: 13, color: "#53647e" }}>Complete these steps to start building.</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            <div className={styles.checklistItem}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Connect identity</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Sign in with your corporate identity.</div>
                </div>
              </div>
              <span style={{ fontSize: 11, background: "#dcfce7", color: "#166534", padding: "3px 8px", borderRadius: 12, fontWeight: 600 }}>
                Connected
              </span>
            </div>

            <div className={styles.checklistItem}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Select organization</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Choose the organization you'll build for.</div>
                </div>
              </div>
              <span style={{ fontSize: 11, background: "#eff6ff", color: "#1d4ed8", padding: "3px 8px", borderRadius: 12, fontWeight: 600 }}>
                Acme Corp
              </span>
            </div>

            <div className={styles.checklistItem} onClick={() => router.push("/screens/DP-004")}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #94a3b8" }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Create project</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Create your first project from a template or a blank project.</div>
                </div>
              </div>
              <span style={{ fontSize: 11, background: "#ffedd5", color: "#c2410c", padding: "3px 8px", borderRadius: 12, fontWeight: 600 }}>
                Pending
              </span>
            </div>

            <div className={styles.checklistItem}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #94a3b8" }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Invite collaborator</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Add a teammate to your project.</div>
                </div>
              </div>
              <span style={{ fontSize: 11, background: "#f1f5f9", color: "#64748b", padding: "3px 8px", borderRadius: 12, fontWeight: 600 }}>
                Optional
              </span>
            </div>

            <div className={styles.checklistItem}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #94a3b8" }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Run first preview</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>Launch a preview to see your changes.</div>
                </div>
              </div>
              <span style={{ fontSize: 11, background: "#ffedd5", color: "#c2410c", padding: "3px 8px", borderRadius: 12, fontWeight: 600 }}>
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Starting points */}
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#15233d" }}>Choose a starting point</div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
            Choose the right starting point for what you want to build.
          </div>

          <div className={styles.startingPointsGrid}>
            <div
              className={`${styles.startingPointCard} ${selectedType === "app" ? styles.startingPointCardSelected : ""}`}
              onClick={() => setSelectedType("app")}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className={styles.cardIconBox}><LayoutGrid size={20} /></div>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: selectedType === "app" ? "5px solid #174eca" : "2px solid #cbd5e1" }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>App project</div>
              <div style={{ fontSize: 12, color: "#53647e", lineHeight: 1.5 }}>
                Build a web application with screens, forms, workflows, and integrations.
              </div>
            </div>

            <div
              className={`${styles.startingPointCard} ${selectedType === "site" ? styles.startingPointCardSelected : ""}`}
              onClick={() => setSelectedType("site")}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className={styles.cardIconBox}><Globe size={20} /></div>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: selectedType === "site" ? "5px solid #174eca" : "2px solid #cbd5e1" }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Site project</div>
              <div style={{ fontSize: 12, color: "#53647e", lineHeight: 1.5 }}>
                Create a branded site for internal or external users with pages and content.
              </div>
            </div>

            <div
              className={`${styles.startingPointCard} ${selectedType === "library" ? styles.startingPointCardSelected : ""}`}
              onClick={() => setSelectedType("library")}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className={styles.cardIconBox}><Layers size={20} /></div>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: selectedType === "library" ? "5px solid #174eca" : "2px solid #cbd5e1" }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Library resource</div>
              <div style={{ fontSize: 12, color: "#53647e", lineHeight: 1.5 }}>
                Build a reusable component, template, or data model for other projects.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-004")}>
              Create project
            </button>
            <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-005")}>
              Resume last project
            </button>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-003: Projects workspace (003_projects.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP003() {
  const router = useRouter();

  const tabs = [
    { id: "projects", title: "Projects", icon: <Folder size={14} />, active: true },
    { id: "supplier-exp", title: "Supplier experience", icon: <Layers size={14} /> },
    { id: "corp-website", title: "Corporate website", icon: <Globe size={14} /> },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} /> },
  ];

  const sidebarGroups = [
    {
      items: [
        { id: "projects", label: "Projects", icon: <Folder size={16} />, active: true },
        { id: "standalone", label: "Standalone builders", icon: <Code2 size={16} />, onClick: () => router.push("/screens/DP-011") },
        { id: "library", label: "Library", icon: <BookOpen size={16} />, onClick: () => router.push("/screens/DP-012") },
        { id: "data-integrations", label: "Data & integrations", icon: <Database size={16} /> },
        { id: "releases", label: "Releases", icon: <Tag size={16} /> },
        { id: "api-ext", label: "API & extensions", icon: <Puzzle size={16} /> },
      ],
    },
    {
      title: "PLATFORM",
      items: [
        { id: "mkt", label: "Marketplace", icon: <ShoppingBag size={16} /> },
        { id: "occ", label: "OCC", icon: <Shield size={16} /> },
        { id: "tenant-web", label: "Tenant website", icon: <Globe size={16} /> },
        { id: "account", label: "Account Center", icon: <UserCheck size={16} /> },
      ],
    },
  ];

  const rightRail = (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Project pulse */}
      <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#15233d" }}>Project pulse</div>
          <ChevronDown size={14} color="#64748b" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: "#f8fafc", borderRadius: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontWeight: 700, color: "#174eca", fontSize: 16 }}>2</div>
              <div style={{ fontSize: 12 }}>reviews waiting <span style={{ color: "#64748b" }}>Across 2 projects</span></div>
            </div>
            <ChevronRight size={14} color="#94a3b8" />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: "#f8fafc", borderRadius: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontWeight: 700, color: "#174eca", fontSize: 16 }}>1</div>
              <div style={{ fontSize: 12 }}>library update <span style={{ color: "#64748b" }}>UI Kit 2.4.1 available</span></div>
            </div>
            <ChevronRight size={14} color="#94a3b8" />
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#15233d" }}>Recent activity</div>
          <a href="#" style={{ fontSize: 12, color: "#174eca", textDecoration: "none" }}>View all</a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { icon: <Globe size={16} />, title: "Corporate website", desc: 'Page "About us" updated', time: "1h ago" },
            { icon: <Layers size={16} />, title: "Supplier portal", desc: "Application settings changed", time: "3h ago" },
            { icon: <BookOpen size={16} />, title: "UI Kit", desc: "Version 2.4.1 published", time: "5h ago" },
            { icon: <Layers size={16} />, title: "Operations workspace", desc: 'New app "Field service" added', time: "1d ago" },
            { icon: <Globe size={16} />, title: "Corporate presence", desc: "Navigation updated", time: "1d ago" },
          ].map((act, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ color: "#174eca", marginTop: 2 }}>{act.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#15233d" }}>{act.title}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{act.desc}</div>
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{act.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-003"
      tabs={tabs}
      sidebarGroups={sidebarGroups}
      rightRail={rightRail}
    >
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Build with a shared foundation</h1>
          <p className={styles.subtitle}>
            Websites, applications and reusable resources in one workspace.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-004")}>
              + New project
            </button>
            <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-011")}>
              Create standalone
            </button>
          </div>
        </div>

        {/* Continue working */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#15233d", marginBottom: 8 }}>
            Continue working
          </div>
          <div className={styles.continueWorkingGrid}>
            <div className={styles.continueCard} onClick={() => router.push("/screens/DP-005")}>
              <div className={styles.cardIconBox}><Layers size={22} /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Supplier portal</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>App • Draft</div>
              </div>
            </div>

            <div className={styles.continueCard} onClick={() => router.push("/screens/DP-008")}>
              <div className={styles.cardIconBox}><Globe size={22} /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Corporate website</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Website • Draft</div>
              </div>
            </div>
          </div>
        </div>

        {/* All projects table */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#15233d", marginBottom: 8 }}>
            All projects
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <div>Project ⇅</div>
              <div>Owner ⇅</div>
              <div>Updated ⇅</div>
              <div>Environment</div>
              <div>Status</div>
              <div />
            </div>

            {[
              {
                id: "supplier-experience",
                name: "Supplier experience",
                details: "1 website, 2 apps",
                avatarGrad: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                owner: "Ava Rodriguez",
                updated: "May 13, 2025 10:24 AM",
                env: "Development",
                status: "On track",
                statusColor: "#16a34a",
              },
              {
                id: "corporate-presence",
                name: "Corporate presence",
                details: "2 websites",
                avatarGrad: "linear-gradient(135deg, #10b981, #34d399)",
                owner: "Ava Rodriguez",
                updated: "May 12, 2025 4:18 PM",
                env: "Development",
                status: "On track",
                statusColor: "#16a34a",
              },
              {
                id: "operations-workspace",
                name: "Operations workspace",
                details: "3 apps",
                avatarGrad: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                owner: "Ava Rodriguez",
                updated: "May 9, 2025 9:07 AM",
                env: "Development",
                status: "At risk",
                statusColor: "#d97706",
              },
            ].map((p) => (
              <div
                key={p.id}
                className={styles.tableRow}
                onClick={() => router.push("/screens/DP-005")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      background: p.avatarGrad,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {p.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#15233d" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#64748b" }}>{p.details}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#174eca", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    AR
                  </div>
                  <span>{p.owner}</span>
                </div>

                <div style={{ color: "#64748b" }}>{p.updated}</div>
                <div>{p.env}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: p.statusColor, fontWeight: 500 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.statusColor }} />
                  {p.status}
                </div>
                <div><MoreVertical size={16} color="#94a3b8" /></div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 8 }}>1–3 of 3 projects</div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-004: Create project (004_create_project.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP004() {
  const router = useRouter();
  const [projectType, setProjectType] = useState<"website" | "app" | "combined">("combined");
  const [name, setName] = useState("Supplier experience");
  const [key, setKey] = useState("supplier-experience");
  const [description, setDescription] = useState("Supplier onboarding and collaboration.");
  const [includeWebsite, setIncludeWebsite] = useState(true);
  const [includeApp, setIncludeApp] = useState(true);
  const [startWith, setStartWith] = useState<"blank" | "template">("blank");

  const tabs = [
    { id: "projects", title: "Projects", icon: <Folder size={14} /> },
    { id: "supplier-exp", title: "Supplier experience", icon: <Layers size={14} />, active: true },
    { id: "corp-website", title: "Corporate website", icon: <Globe size={14} /> },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} /> },
  ];

  const rightRail = (
    <div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#15233d", marginBottom: 4 }}>
        Project structure preview
      </div>
      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
        This is how your project will be organized.
      </div>

      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 14 }}>
        {/* Tree root */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 13, color: "#15233d" }}>
          <Layers size={16} color="#174eca" />
          <span>{name || "My Project"} (project)</span>
        </div>

        <div style={{ paddingLeft: 18, marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
          {includeWebsite && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 12 }}>
                <Globe size={14} color="#174eca" /> Website
              </div>
              <div style={{ paddingLeft: 20, fontSize: 11, color: "#64748b", display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
                <div>📄 Pages</div>
                <div>🖼️ Assets</div>
                <div>📑 Content types</div>
              </div>
            </div>
          )}

          {includeApp && (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 12 }}>
                <LayoutGrid size={14} color="#174eca" /> Application
              </div>
              <div style={{ paddingLeft: 20, fontSize: 11, color: "#64748b", display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
                <div>🧩 Modules</div>
                <div>🪟 Views</div>
                <div>🔌 APIs</div>
                <div>💾 Data models</div>
              </div>
            </div>
          )}

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 12 }}>
              <Database size={14} color="#174eca" /> Shared resources
            </div>
            <div style={{ paddingLeft: 20, fontSize: 11, color: "#64748b", display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
              <div>📦 Components</div>
              <div>📑 Content types</div>
              <div>⚡ Workflows</div>
              <div>🖼️ Assets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-004"
      tabs={tabs}
      backTo={{ label: "Projects", href: "/screens/DP-003" }}
      rightRail={rightRail}
    >
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>← New project</h1>
          <p className={styles.subtitle}>Create a new project in your workspace.</p>
        </div>

        {/* Project type cards */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#15233d", marginBottom: 8 }}>
            Project type
          </div>
          <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
            Choose the experience type you want to build.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            <div
              className={`${styles.startingPointCard} ${projectType === "website" ? styles.startingPointCardSelected : ""}`}
              onClick={() => {
                setProjectType("website");
                setIncludeWebsite(true);
                setIncludeApp(false);
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Globe size={20} color="#174eca" />
                <input type="radio" checked={projectType === "website"} readOnly />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Website</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Build public websites and marketing sites.</div>
            </div>

            <div
              className={`${styles.startingPointCard} ${projectType === "app" ? styles.startingPointCardSelected : ""}`}
              onClick={() => {
                setProjectType("app");
                setIncludeWebsite(false);
                setIncludeApp(true);
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <LayoutGrid size={20} color="#174eca" />
                <input type="radio" checked={projectType === "app"} readOnly />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Application</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Build internal applications and tools.</div>
            </div>

            <div
              className={`${styles.startingPointCard} ${projectType === "combined" ? styles.startingPointCardSelected : ""}`}
              onClick={() => {
                setProjectType("combined");
                setIncludeWebsite(true);
                setIncludeApp(true);
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Layers size={20} color="#174eca" />
                <input type="radio" checked={projectType === "combined"} readOnly />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Combined experience</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Build a website, an application, and share resources.</div>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Project name ⓘ</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d7dfeb", fontSize: 13 }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Key ⓘ</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d7dfeb", fontSize: 13 }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Organization ⓘ</label>
          <select style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d7dfeb", fontSize: 13, background: "#fff" }}>
            <option>Acme Corp</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d7dfeb", fontSize: 13 }}
          />
        </div>

        {/* Include checkboxes */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Include</div>
          <div style={{ display: "flex", gap: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <input type="checkbox" checked={includeWebsite} onChange={(e) => setIncludeWebsite(e.target.checked)} />
              <span>Website (Create a website for public content and pages)</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <input type="checkbox" checked={includeApp} onChange={(e) => setIncludeApp(e.target.checked)} />
              <span>Application (Create an application for internal users and processes)</span>
            </label>
          </div>
        </div>

        {/* Start with */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Start with</div>
          <div style={{ display: "flex", gap: 24 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <input type="radio" checked={startWith === "blank"} onChange={() => setStartWith("blank")} />
              <span>Start blank (Create an empty project and add what you need)</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <input type="radio" checked={startWith === "template"} onChange={() => setStartWith("template")} />
              <span>Use template (Choose a template to get started faster)</span>
            </label>
          </div>
        </div>

        {/* Existing resources optional */}
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Existing resources (optional)</div>
            <a href="#" style={{ fontSize: 12, color: "#174eca", textDecoration: "none", fontWeight: 600 }}>
              🔗 Link from library
            </a>
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>
            Link existing resources from your library to include in this project.
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", border: "1px solid #d7dfeb", borderRadius: 8, background: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <FileCode2 size={18} color="#174eca" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Supplier header v1.2</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>Header • Shared resource</div>
              </div>
            </div>
            <button style={{ border: "none", background: "transparent", cursor: "pointer", color: "#64748b" }}>×</button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
          <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-003")}>
            Cancel
          </button>
          <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-005")}>
            Create project
          </button>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-005: Project overview (005_project_overview.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP005() {
  const router = useRouter();

  const tabs = [
    { id: "projects", title: "Projects", icon: <Folder size={14} /> },
    { id: "supplier-exp", title: "Supplier experience", icon: <Layers size={14} />, active: true },
    { id: "corp-website", title: "Corporate website", icon: <Globe size={14} /> },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} /> },
  ];

  const sidebarGroups = [
    {
      items: [
        { id: "overview", label: "Overview", icon: <LayoutGrid size={16} />, active: true },
        { id: "builders", label: "Builders", icon: <Code2 size={16} /> },
        { id: "resources", label: "Resources", icon: <BookOpen size={16} /> },
        { id: "data", label: "Data", icon: <Database size={16} /> },
        { id: "workflows", label: "Workflows", icon: <Workflow size={16} /> },
        { id: "environments", label: "Environments", icon: <Database size={16} /> },
        { id: "releases", label: "Releases", icon: <Tag size={16} /> },
        { id: "settings", label: "Settings", icon: <Settings size={16} /> },
      ],
    },
  ];

  const rightRail = (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Project checklist */}
      <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#15233d", marginBottom: 12 }}>
          Project checklist
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <div><strong>Builders</strong> — 2 drafts created</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#d97706" }} />
            <div><strong>Dependencies</strong> — 1 update available</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#d97706" }} />
            <div><strong>Data connections</strong> — 1 connection pending</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #cbd5e1" }} />
            <div><strong>Workflows</strong> — Review pending</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <CheckCircle2 size={16} color="#16a34a" />
            <div><strong>Environments</strong> — Development configured</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#d97706" }} />
            <div><strong>Releases</strong> — Review required</div>
          </div>
          <a href="#" style={{ fontSize: 12, color: "#174eca", textDecoration: "none", fontWeight: 600, marginTop: 4 }}>
            View full checklist &gt;
          </a>
        </div>
      </div>

      {/* Project map */}
      <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#15233d", marginBottom: 12 }}>
          Project map
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ padding: 8, border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", textAlign: "center" }}>
            <Globe size={18} color="#174eca" style={{ margin: "0 auto 4px" }} />
            <div style={{ fontSize: 11, fontWeight: 600 }}>Supplier website</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>Website</div>
          </div>
          <div style={{ padding: 8, border: "1px solid #e2e8f0", borderRadius: 6, background: "#fff", textAlign: "center" }}>
            <Layers size={18} color="#174eca" style={{ margin: "0 auto 4px" }} />
            <div style={{ fontSize: 11, fontWeight: 600 }}>Supplier portal</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>App</div>
          </div>
        </div>
        <div style={{ marginTop: 8, padding: 8, border: "1px dashed #cbd5e1", borderRadius: 6, background: "#f8fafc", textAlign: "center" }}>
          <Database size={16} color="#64748b" style={{ margin: "0 auto 2px" }} />
          <div style={{ fontSize: 11, fontWeight: 600 }}>Shared resources</div>
          <div style={{ fontSize: 10, color: "#64748b" }}>Components, data, flows</div>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#15233d" }}>Recent activity</div>
          <a href="#" style={{ fontSize: 12, color: "#174eca", textDecoration: "none" }}>View all</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>AR Approval flow</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Version 1.0 submitted for review • 1h ago</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>JS Address form</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Version 2.1 published • 3h ago</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>MK Supplier website</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Page "Profile" updated • 5h ago</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-005"
      tabs={tabs}
      sidebarProjectContext={{
        name: "Supplier experience",
        environment: "Development",
      }}
      sidebarGroups={sidebarGroups}
      rightRail={rightRail}
    >
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 className={styles.title}>Supplier experience</h1>
            <div style={{ fontSize: 13, color: "#16a34a", display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
              <span style={{ fontWeight: 600, color: "#15233d" }}>Development ⌵</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-006")}>
              Open builder ⌵
            </button>
            <button className={styles.btnSecondary}><MoreVertical size={16} /></button>
          </div>
        </div>

        {/* Built experiences */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#15233d", marginBottom: 12 }}>
            Built experiences
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 18, border: "1px solid #d7dfeb", borderRadius: 8, background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className={styles.cardIconBox}><Globe size={22} /></div>
                <div>
                  <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Website</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Supplier website</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>6 pages • Draft</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-008")}>Open</button>
                <button className={styles.btnSecondary}><MoreVertical size={16} /></button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 18, border: "1px solid #d7dfeb", borderRadius: 8, background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className={styles.cardIconBox}><Layers size={22} /></div>
                <div>
                  <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>App</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Supplier portal</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>8 screens • Draft</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className={styles.btnSecondary} onClick={() => router.push("/screens/DP-007")}>Open</button>
                <button className={styles.btnSecondary}><MoreVertical size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Key dependencies */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#15233d", marginBottom: 12 }}>
            Key dependencies
          </div>
          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <div>Resource</div>
              <div>Type</div>
              <div>Version</div>
              <div>Updated</div>
              <div>Status</div>
              <div />
            </div>

            {[
              { name: "Supplier header", sub: "Reusable component", type: "Component", ver: "1.2", date: "May 13, 2025 10:24 AM", status: "Up to date", color: "#16a34a" },
              { name: "Address form", sub: "Reusable component", type: "Component", ver: "2.1", date: "May 12, 2025 4:18 PM", status: "Up to date", color: "#16a34a" },
              { name: "Approval flow", sub: "Workflow", type: "Workflow", ver: "1.0", date: "May 9, 2025 9:07 AM", status: "Update available", color: "#d97706" },
            ].map((dep, i) => (
              <div key={i} className={styles.tableRow}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <FileCode2 size={16} color="#174eca" />
                  <div>
                    <div style={{ fontWeight: 600 }}>{dep.name}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{dep.sub}</div>
                  </div>
                </div>
                <div><span style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>{dep.type}</span></div>
                <div>{dep.ver} 📌</div>
                <div style={{ color: "#64748b" }}>{dep.date}</div>
                <div style={{ color: dep.color, fontWeight: 500 }}>● {dep.status}</div>
                <div><MoreVertical size={16} color="#94a3b8" /></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <a href="#" style={{ fontSize: 13, color: "#174eca", textDecoration: "none", fontWeight: 600 }}>
              View all dependencies
            </a>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-006: Project work items (006_work_items.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP006() {
  const [selectedTask, setSelectedTask] = useState<string>("SP-103");
  const [activeTab, setActiveTab] = useState<"board" | "list" | "roadmap" | "deps">("board");

  const tabs = [
    { id: "work-items", title: "Supplier portal work items", icon: <Layers size={14} />, active: true },
    { id: "form", title: "Form2.1", icon: <FileCode2 size={14} /> },
    { id: "cs", title: "CS-014", icon: <Workflow size={14} /> },
  ];

  const sidebarGroups = [
    {
      items: [
        { id: "projects", label: "Projects", icon: <Folder size={16} /> },
        { id: "work-items", label: "Work items", icon: <CheckCircle2 size={16} />, active: true },
        { id: "source", label: "Source control", icon: <Code2 size={16} /> },
        { id: "build", label: "Build & deploy", icon: <Tag size={16} /> },
        { id: "environments", label: "Environments", icon: <Database size={16} /> },
        { id: "tests", label: "Test management", icon: <Shield size={16} /> },
        { id: "artifacts", label: "Artifacts", icon: <Layers size={16} /> },
        { id: "releases", label: "Releases", icon: <Tag size={16} /> },
        { id: "monitoring", label: "Monitoring", icon: <Clock size={16} /> },
        { id: "settings", label: "Settings", icon: <Settings size={16} /> },
      ],
    },
  ];

  const rightDrawer = (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#174eca", background: "#eff6ff", padding: "2px 6px", borderRadius: 4 }}>
          SP-103
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <MoreVertical size={16} color="#64748b" />
          <button style={{ border: "none", background: "transparent", cursor: "pointer" }}>×</button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#15233d" }}>Supplier intake validation</div>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>Implement validation service for supplier intake.</div>
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid #e2e8f0", paddingBottom: 8, fontSize: 13 }}>
        <span style={{ fontWeight: 600, color: "#174eca", borderBottom: "2px solid #174eca", paddingBottom: 8 }}>Details</span>
        <span style={{ color: "#64748b" }}>Checklist</span>
        <span style={{ color: "#64748b" }}>Links</span>
        <span style={{ color: "#64748b" }}>Activity</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Type</span>
          <span style={{ fontWeight: 600 }}>📄 Feature</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Status</span>
          <span style={{ color: "#1d4ed8", fontWeight: 600 }}>● Building ⌵</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Owner</span>
          <span style={{ fontWeight: 600 }}>AR Alex Rivers ⌵</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Area</span>
          <span>Supplier portal</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Iteration</span>
          <span>Sprint 4 (Sep 1 – Sep 14, 2026) ⌵</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Priority</span>
          <span style={{ color: "#d97706" }}>〓 Medium ⌵</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Tags</span>
          <div style={{ display: "flex", gap: 4 }}>
            <span style={{ fontSize: 11, background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>intake</span>
            <span style={{ fontSize: 11, background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>validation</span>
          </div>
        </div>
      </div>

      {/* Acceptance checklist */}
      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Acceptance checklist</span>
          <span style={{ fontSize: 12, color: "#64748b" }}>3/4</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#166534" }}>
            <CheckCircle2 size={14} color="#16a34a" /> Validate required fields
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#166534" }}>
            <CheckCircle2 size={14} color="#16a34a" /> Verify business registration number
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#166534" }}>
            <CheckCircle2 size={14} color="#16a34a" /> Handle duplicate supplier
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#64748b" }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", border: "1px solid #cbd5e1" }} /> Log validation errors with clear messages
          </div>
        </div>
      </div>

      {/* Related resources */}
      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Related resources</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <FileCode2 size={14} color="#174eca" />
              <div>
                <div style={{ fontWeight: 600 }}>Form2.1</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>Supplier registration</div>
              </div>
            </div>
            <ExternalLink size={13} color="#64748b" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Workflow size={14} color="#174eca" />
              <div>
                <div style={{ fontWeight: 600 }}>CS-014</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>Add intake validation service</div>
              </div>
            </div>
            <ExternalLink size={13} color="#64748b" />
          </div>
        </div>
      </div>

      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: 10, fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
        <Shield size={14} /> Pending approvals. Changes are locked.
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-006"
      tabs={tabs}
      sidebarGroups={sidebarGroups}
      rightRail={rightDrawer}
    >
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Project work items</h1>
            <p className={styles.subtitle}>Plan, build, and track work for Supplier portal.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Search work items"
              style={{ padding: "6px 12px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 13 }}
            />
            <button className={styles.btnPrimary}>+ Create work item ⌵</button>
          </div>
        </div>

        {/* Subtabs */}
        <div style={{ display: "flex", gap: 20, borderBottom: "1px solid #e2e8f0", paddingBottom: 10 }}>
          {["Board", "List", "Roadmap", "Dependencies"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t.toLowerCase() as any)}
              style={{
                border: "none",
                background: "transparent",
                fontWeight: 600,
                fontSize: 13,
                color: activeTab === t.toLowerCase() ? "#174eca" : "#64748b",
                borderBottom: activeTab === t.toLowerCase() ? "2px solid #174eca" : "none",
                paddingBottom: 8,
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 4 Kanban Columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {/* Planned */}
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#15233d" }}>Planned</div>
            <div
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 12, cursor: "pointer" }}
              onClick={() => setSelectedTask("SP-101")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#174eca", fontWeight: 700 }}>
                <span>SP-101</span>
                <span>•••</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>Supplier registration form updates</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Update registration fields and validation rules.</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>JL Jamie Lee</span>
                <span style={{ fontSize: 10, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>Planned</span>
              </div>
            </div>
            <div
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 12, cursor: "pointer" }}
              onClick={() => setSelectedTask("SP-102")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#174eca", fontWeight: 700 }}>
                <span>SP-102</span>
                <span>•••</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>Supplier directory improvements</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Add search and filtering to supplier directory.</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>TM Taylor Moore</span>
                <span style={{ fontSize: 10, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>Planned</span>
              </div>
            </div>
          </div>

          {/* Building */}
          <div style={{ background: "#eff6ff", borderRadius: 8, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1d4ed8" }}>Building</div>
            <div
              style={{ background: "#fff", border: "2px solid #174eca", borderRadius: 6, padding: 12, cursor: "pointer" }}
              onClick={() => setSelectedTask("SP-103")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#174eca", fontWeight: 700 }}>
                <span>SP-103</span>
                <span>•••</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>Supplier intake validation</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Implement validation service for supplier intake.</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span style={{ fontSize: 11, color: "#1d4ed8" }}>AR Alex Rivers</span>
                <span style={{ fontSize: 10, background: "#dbeafe", color: "#1e40af", padding: "2px 6px", borderRadius: 4 }}>Building</span>
              </div>
            </div>
            <div
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 12, cursor: "pointer" }}
              onClick={() => setSelectedTask("SP-104")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#174eca", fontWeight: 700 }}>
                <span>SP-104</span>
                <span>•••</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>Bank details verification</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Integrate bank account verification service.</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>JL Jamie Lee</span>
                <span style={{ fontSize: 10, background: "#dbeafe", color: "#1e40af", padding: "2px 6px", borderRadius: 4 }}>Building</span>
              </div>
            </div>
          </div>

          {/* In review */}
          <div style={{ background: "#fffbeb", borderRadius: 8, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#b45309" }}>In review</div>
            <div
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 12, cursor: "pointer" }}
              onClick={() => setSelectedTask("SP-105")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#b45309", fontWeight: 700 }}>
                <span>SP-105</span>
                <span>•••</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>Document review workflow</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Enable document review and approval steps.</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>TM Taylor Moore</span>
                <span style={{ fontSize: 10, background: "#fef3c7", color: "#92400e", padding: "2px 6px", borderRadius: 4 }}>In review</span>
              </div>
            </div>
            <div
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 12, cursor: "pointer" }}
              onClick={() => setSelectedTask("SP-106")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#b45309", fontWeight: 700 }}>
                <span>SP-106</span>
                <span>•••</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>UAT test cases</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Create and execute UAT test cases for Supplier portal.</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>AR Alex Rivers</span>
                <span style={{ fontSize: 10, background: "#fef3c7", color: "#92400e", padding: "2px 6px", borderRadius: 4 }}>In review</span>
              </div>
            </div>
          </div>

          {/* Ready */}
          <div style={{ background: "#f0fdf4", borderRadius: 8, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#15803d" }}>Ready</div>
            <div
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 12, cursor: "pointer" }}
              onClick={() => setSelectedTask("SP-107")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#15803d", fontWeight: 700 }}>
                <span>SP-107</span>
                <span>•••</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>Supplier profile UI</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Finalize supplier profile page and responsive design.</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>JL Jamie Lee</span>
                <span style={{ fontSize: 10, background: "#dcfce7", color: "#166534", padding: "2px 6px", borderRadius: 4 }}>Ready</span>
              </div>
            </div>
            <div
              style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6, padding: 12, cursor: "pointer" }}
              onClick={() => setSelectedTask("SP-108")}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#15803d", fontWeight: 700 }}>
                <span>SP-108</span>
                <span>•••</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>Launch readiness</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Prepare release notes and operational checklist.</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>TM Taylor Moore</span>
                <span style={{ fontSize: 10, background: "#dcfce7", color: "#166534", padding: "2px 6px", borderRadius: 4 }}>Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-007: Applications catalog (007_applications.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP007() {
  const router = useRouter();
  const [selectedApp, setSelectedApp] = useState("supplier-portal");

  const tabs = [
    { id: "supplier-web", title: "Supplier website", icon: <Globe size={14} /> },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} />, active: true },
  ];

  const sidebarGroups = [
    {
      items: [
        { id: "projects", label: "Projects", icon: <Folder size={16} /> },
        { id: "apps", label: "Applications", icon: <LayoutGrid size={16} />, active: true },
        { id: "websites", label: "Websites", icon: <Globe size={16} />, onClick: () => router.push("/screens/DP-008") },
        { id: "standalone", label: "Standalone", icon: <Laptop size={16} />, onClick: () => router.push("/screens/DP-011") },
        { id: "library", label: "Library", icon: <BookOpen size={16} />, onClick: () => router.push("/screens/DP-012") },
        { id: "manage", label: "Manage", icon: <Settings size={16} /> },
      ],
    },
  ];

  const rightDrawer = (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#eff6ff", color: "#174eca", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Globe size={20} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#15233d" }}>Supplier portal</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Application • v1.4.2</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={{ border: "none", background: "transparent", cursor: "pointer" }}>★</button>
          <MoreVertical size={16} color="#64748b" />
        </div>
      </div>

      <button className={styles.btnPrimary} style={{ width: "100%", justifyContent: "center", padding: "10px 0" }} onClick={() => router.push("/screens/DP-013")}>
        Open app ↗
      </button>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
          <span>Details</span>
          <ChevronDown size={14} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Project</span>
            <span style={{ fontWeight: 600 }}>📁 Supplier experience</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Owner</span>
            <span>JS Jordan Smith</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Environment</span>
            <span style={{ color: "#16a34a", fontWeight: 600 }}>● Production</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Updated</span>
            <span>Sep 14, 2026 by Jordan Smith</span>
          </div>
          <div style={{ marginTop: 4, color: "#53647e", lineHeight: 1.4 }}>
            Self-service portal for suppliers to manage orders, invoices, and documents.
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
          <span>Linked forms (4)</span>
          <ChevronDown size={14} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: "#15233d" }}>
          <div>📄 Supplier profile</div>
          <div>📄 Purchase order</div>
          <div>📄 Invoice</div>
          <div>📄 Shipment notice</div>
          <a href="#" style={{ fontSize: 12, color: "#174eca", textDecoration: "none", marginTop: 4 }}>
            View all forms ↗
          </a>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 700 }}>
          <span>Workflows (3)</span>
          <ChevronDown size={14} />
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 700 }}>
          <span>Data (6)</span>
          <ChevronDown size={14} />
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Pinned</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>Pinned items appear at the top of your list.</div>
        </div>
        <input type="checkbox" defaultChecked style={{ transform: "scale(1.2)" }} />
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-007"
      tabs={tabs}
      sidebarGroups={sidebarGroups}
      rightRail={rightDrawer}
    >
      <div className={styles.pageWrapper}>
        <div style={{ fontSize: 12, color: "#64748b" }}>Acme Corp / Applications catalog</div>
        <div style={{ display: "flex", gap: 16, borderBottom: "1px solid #e2e8f0", paddingBottom: 10 }}>
          <span style={{ fontWeight: 600, color: "#174eca", borderBottom: "2px solid #174eca", paddingBottom: 8 }}>All</span>
          <span style={{ color: "#64748b" }}>Pinned</span>
          <span style={{ color: "#64748b" }}>Archived</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search applications"
            style={{ width: 340, padding: "8px 12px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 13 }}
          />
          <div style={{ display: "flex", gap: 10 }}>
            <button className={styles.btnSecondary}>Filter</button>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-009")}>
              New application
            </button>
          </div>
        </div>

        {/* Grouped Table */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div>Application ⇅</div>
            <div>Project ⇅</div>
            <div>Owner ⇅</div>
            <div>Version ⇅</div>
            <div>Environment ⇅</div>
            <div>Updated ⇅</div>
          </div>

          {/* Group 1: Supplier experience */}
          <div style={{ padding: "10px 16px", background: "#f8fafc", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 8 }}>
            <Folder size={16} color="#174eca" />
            <span>Supplier experience</span>
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 400 }}>(3 applications)</span>
          </div>

          {[
            { id: "sp", name: "Supplier portal 📌", proj: "Supplier experience", owner: "Jordan Smith", ver: "1.4.2", env: "Production", envColor: "#16a34a", date: "Sep 14, 2026", icon: <Globe size={16} /> },
            { id: "sl", name: "Stock lookup", proj: "Supplier experience", owner: "Leslie Martin", ver: "2.1.0", env: "Staging", envColor: "#2563eb", date: "Sep 12, 2026", icon: <Layers size={16} /> },
            { id: "sd", name: "Service desk", proj: "Supplier experience", owner: "Diego Perez", ver: "1.2.3", env: "Production", envColor: "#16a34a", date: "Sep 11, 2026", icon: <LayoutGrid size={16} /> },
          ].map((app) => (
            <div key={app.id} className={styles.tableRow} onClick={() => setSelectedApp(app.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ color: "#174eca" }}>{app.icon}</div>
                <span style={{ fontWeight: 600 }}>{app.name}</span>
              </div>
              <div style={{ color: "#64748b" }}>{app.proj}</div>
              <div>{app.owner}</div>
              <div>{app.ver}</div>
              <div>
                <span style={{ fontSize: 11, background: app.envColor === "#16a34a" ? "#dcfce7" : "#dbeafe", color: app.envColor === "#16a34a" ? "#166534" : "#1e40af", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>
                  {app.env}
                </span>
              </div>
              <div style={{ color: "#64748b" }}>{app.date}</div>
            </div>
          ))}

          {/* Group 2: Operations */}
          <div style={{ padding: "10px 16px", background: "#f8fafc", fontWeight: 700, fontSize: 13, borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 8 }}>
            <Folder size={16} color="#174eca" />
            <span>Operations</span>
            <span style={{ fontSize: 11, color: "#64748b", fontWeight: 400 }}>(2 applications)</span>
          </div>

          {[
            { id: "im", name: "Inventory manager", proj: "Operations", owner: "Harper Miller", ver: "3.0.1", env: "Production", envColor: "#16a34a", date: "Sep 10, 2026", icon: <Layers size={16} /> },
            { id: "ot", name: "Order tracker", proj: "Operations", owner: "Taylor Kim", ver: "2.3.0", env: "Staging", envColor: "#2563eb", date: "Sep 09, 2026", icon: <LayoutGrid size={16} /> },
          ].map((app) => (
            <div key={app.id} className={styles.tableRow} onClick={() => setSelectedApp(app.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ color: "#174eca" }}>{app.icon}</div>
                <span style={{ fontWeight: 600 }}>{app.name}</span>
              </div>
              <div style={{ color: "#64748b" }}>{app.proj}</div>
              <div>{app.owner}</div>
              <div>{app.ver}</div>
              <div>
                <span style={{ fontSize: 11, background: app.envColor === "#16a34a" ? "#dcfce7" : "#dbeafe", color: app.envColor === "#16a34a" ? "#166534" : "#1e40af", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>
                  {app.env}
                </span>
              </div>
              <div style={{ color: "#64748b" }}>{app.date}</div>
            </div>
          ))}
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-008: Websites catalog (008_websites.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP008() {
  const router = useRouter();
  const [selectedSite, setSelectedSite] = useState<string>("partner-microsite");

  const tabs = [
    { id: "supplier-web", title: "Supplier website", icon: <Globe size={14} /> },
    { id: "website-cat", title: "Website catalog", icon: <Globe size={14} />, active: true },
  ];

  const rightDrawer = (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Globe size={18} color="#174eca" />
          <span style={{ fontSize: 16, fontWeight: 700 }}>Partner microsite</span>
        </div>
        <button style={{ border: "none", background: "transparent", cursor: "pointer" }}>×</button>
      </div>

      <div>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Overview</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Website</span>
            <span>Partner microsite</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Domain</span>
            <span style={{ color: "#174eca" }}>partners.example.com ↗</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Status</span>
            <span style={{ color: "#2563eb", fontWeight: 600 }}>● Draft</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Revision</span>
            <span>0.3.1</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Last updated</span>
            <span>Sep 8, 2026 9:02 AM</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Updated by</span>
            <span>Alex Rivera</span>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Organization</div>
        <div style={{ fontSize: 12, color: "#64748b" }}>No project: This website is not linked to any project.</div>
        <button className={styles.btnSecondary} style={{ marginTop: 8, fontSize: 12, padding: "4px 10px" }}>
          Link to project
        </button>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        <button className={styles.btnPrimary} style={{ width: "100%", justifyContent: "center" }} onClick={() => router.push("/screens/DP-014")}>
          Open studio ↗
        </button>
        <button className={styles.btnSecondary} style={{ width: "100%", justifyContent: "center" }}>
          Duplicate website
        </button>
        <button className={styles.btnSecondary} style={{ width: "100%", justifyContent: "center", color: "#b91c1c", borderColor: "#fca5a5" }}>
          Archive website
        </button>
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-008"
      tabs={tabs}
      backTo={{ label: "Back to Projects", href: "/screens/DP-003" }}
      rightRail={rightDrawer}
    >
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Websites catalog</h1>
            <p className={styles.subtitle}>Create and manage websites for supplier experience.</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#16a34a" }}>✓ Saved</span>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-010")}>
              New website ⌵
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <select style={{ padding: "6px 12px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 13, background: "#fff" }}>
            <option>All projects</option>
          </select>
          <select style={{ padding: "6px 12px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 13, background: "#fff" }}>
            <option>All statuses</option>
          </select>
          <a href="#" style={{ fontSize: 13, color: "#174eca", textDecoration: "none" }}>Clear filters</a>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              id: "supplier-site",
              title: "Supplier website",
              desc: "Primary supplier portal for resources, updates, and support.",
              proj: "Supplier experience",
              domain: "supplier.example.com",
              rev: "1.4.2",
              status: "Live",
              statusColor: "#16a34a",
              date: "Sep 7, 2026 10:24 AM",
              bannerBg: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
            },
            {
              id: "corp-presence",
              title: "Corporate presence",
              desc: "Corporate information and company news.",
              proj: "Corporate",
              domain: "company.example.com",
              rev: "2.1.0",
              status: "Live",
              statusColor: "#16a34a",
              date: "Sep 6, 2026 3:18 PM",
              bannerBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
            },
            {
              id: "partner-microsite",
              title: "Partner microsite",
              desc: "Campaign site for strategic partner program.",
              proj: "— No project",
              domain: "partners.example.com",
              rev: "0.3.1",
              status: "Draft",
              statusColor: "#2563eb",
              date: "Sep 8, 2026 9:02 AM",
              bannerBg: "linear-gradient(135deg, #1e1b4b, #4338ca)",
            },
          ].map((site) => (
            <div
              key={site.id}
              onClick={() => setSelectedSite(site.id)}
              style={{
                display: "flex",
                gap: 20,
                padding: 16,
                background: "#ffffff",
                border: selectedSite === site.id ? "2px solid #174eca" : "1px solid #d7dfeb",
                borderRadius: 10,
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 140,
                  height: 90,
                  borderRadius: 6,
                  background: site.bannerBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: 8,
                  textAlign: "center",
                }}
              >
                {site.title}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#15233d" }}>{site.title}</div>
                <div style={{ fontSize: 12, color: "#64748b", margin: "4px 0" }}>{site.desc}</div>
                <div style={{ fontSize: 12, color: "#174eca" }}>{site.domain} ↗</div>
              </div>

              <div style={{ fontSize: 12, color: "#64748b", minWidth: 120 }}>{site.proj}</div>
              <div style={{ fontSize: 12, color: "#64748b", minWidth: 60 }}>{site.rev}</div>
              <div>
                <span
                  style={{
                    fontSize: 11,
                    background: site.statusColor === "#16a34a" ? "#dcfce7" : "#dbeafe",
                    color: site.statusColor === "#16a34a" ? "#166534" : "#1e40af",
                    padding: "3px 8px",
                    borderRadius: 12,
                    fontWeight: 600,
                  }}
                >
                  ● {site.status}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{site.date}</div>
              <MoreVertical size={16} color="#94a3b8" />
            </div>
          ))}
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-009: Create application (009_new_application.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP009() {
  const router = useRouter();
  const [appName, setAppName] = useState("Supplier portal");
  const [appType, setAppType] = useState<"internal" | "customer">("customer");
  const [appKey, setAppKey] = useState("supplier_portal");
  const [starter, setStarter] = useState<"blank" | "template" | "link">("blank");

  const tabs = [
    { id: "supplier-web", title: "Supplier website", icon: <Globe size={14} /> },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} /> },
    { id: "new-app", title: "New application", icon: <Plus size={14} />, active: true },
  ];

  const rightRail = (
    <div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#15233d", marginBottom: 4 }}>
        Proposed structure
      </div>
      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
        This is the initial structure that will be created for your application.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Laptop size={18} color="#174eca" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Screens</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Pages and views that users will navigate.</div>
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, background: "#f1f5f9", padding: "2px 8px", borderRadius: 10 }}>0</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <FileCode2 size={18} color="#174eca" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Forms</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Data entry and edit forms.</div>
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, background: "#f1f5f9", padding: "2px 8px", borderRadius: 10 }}>0</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Database size={18} color="#174eca" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Data</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Data models and collections.</div>
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, background: "#f1f5f9", padding: "2px 8px", borderRadius: 10 }}>0</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, border: "1px solid #e2e8f0", borderRadius: 8, background: "#fff" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Workflow size={18} color="#174eca" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Workflows</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Business processes and automations.</div>
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, background: "#f1f5f9", padding: "2px 8px", borderRadius: 10 }}>0</span>
        </div>
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-009"
      tabs={tabs}
      backTo={{ label: "Back to Projects", href: "/screens/DP-003" }}
      rightRail={rightRail}
    >
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Acme Corp / Supplier experience / Development / Applications / New application
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#16a34a" }}>✓ Saved</span>
            <button className={styles.btnSecondary}>Preview</button>
            <button className={styles.btnPrimary} onClick={() => router.push("/screens/DP-007")}>
              Save draft
            </button>
          </div>
        </div>

        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Create application</h1>
          <p className={styles.subtitle}>Define the basic information and structure for your new application.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Application name</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 13 }}
            />
            <span style={{ fontSize: 11, color: "#64748b", marginTop: 4, display: "block" }}>This is the display name shown in the platform.</span>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Application type ⓘ</label>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                <input type="radio" checked={appType === "internal"} onChange={() => setAppType("internal")} />
                <span>Internal app</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                <input type="radio" checked={appType === "customer"} onChange={() => setAppType("customer")} />
                <span>Customer portal</span>
              </label>
            </div>
            <span style={{ fontSize: 11, color: "#64748b", marginTop: 6, display: "block" }}>Customer portals are designed for external users.</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Project</label>
            <select style={{ width: "100%", padding: "8px 12px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 13, background: "#fff" }}>
              <option>Supplier experience</option>
            </select>
            <span style={{ fontSize: 11, color: "#64748b", marginTop: 4, display: "block" }}>Choose an existing project or create a standalone library.</span>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>App key</label>
            <input
              type="text"
              value={appKey}
              onChange={(e) => setAppKey(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 13 }}
            />
            <span style={{ fontSize: 11, color: "#64748b", marginTop: 4, display: "block" }}>Unique key used in URLs and API. Use lowercase letters, numbers, and underscores.</span>
          </div>
        </div>

        {/* Starter cards */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Starter</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            <div
              className={`${styles.startingPointCard} ${starter === "blank" ? styles.startingPointCardSelected : ""}`}
              onClick={() => setStarter("blank")}
            >
              <FileCode2 size={20} color="#174eca" />
              <div style={{ fontWeight: 700, fontSize: 14 }}>Blank</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Start with an empty application.</div>
            </div>

            <div
              className={`${styles.startingPointCard} ${starter === "template" ? styles.startingPointCardSelected : ""}`}
              onClick={() => setStarter("template")}
            >
              <LayoutGrid size={20} color="#174eca" />
              <div style={{ fontWeight: 700, fontSize: 14 }}>Template</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Use a prebuilt template to get started faster.</div>
            </div>

            <div
              className={`${styles.startingPointCard} ${starter === "link" ? styles.startingPointCardSelected : ""}`}
              onClick={() => setStarter("link")}
            >
              <Workflow size={20} color="#174eca" />
              <div style={{ fontWeight: 700, fontSize: 14 }}>Link resource</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Link to an existing external resource.</div>
            </div>
          </div>
        </div>

        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: 14, display: "flex", gap: 12 }}>
          <Shield size={20} color="#1d4ed8" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e40af" }}>Initial access will be restricted</div>
            <div style={{ fontSize: 12, color: "#1e3a8a", marginTop: 2 }}>This application will not be published automatically. You can review and publish it when ready.</div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-010: Create website and templates (010_new_website.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP010() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("partner-portal");

  const tabs = [
    { id: "supplier-web", title: "Supplier website", icon: <Globe size={14} /> },
    { id: "int-apis", title: "Integration APIs", icon: <Code2 size={14} /> },
    { id: "content-lib", title: "Content library", icon: <BookOpen size={14} /> },
  ];

  const rightRail = (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#15233d" }}>Template setup</div>

      <div>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Template</label>
        <select style={{ width: "100%", padding: "6px 10px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 12, background: "#fff" }}>
          <option>Partner portal</option>
        </select>
      </div>

      <div>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Project (optional) ⓘ</label>
        <select style={{ width: "100%", padding: "6px 10px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 12, background: "#fff" }}>
          <option>Supplier website</option>
        </select>
        <span style={{ fontSize: 11, color: "#64748b", marginTop: 4, display: "block" }}>Linking to a project helps organize and manage your website.</span>
      </div>

      <div>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Site address</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type="text" defaultValue="partner" style={{ flex: 1, padding: "6px 10px", border: "1px solid #d7dfeb", borderRadius: "6px 0 0 6px", fontSize: 12 }} />
          <span style={{ background: "#f1f5f9", border: "1px solid #d7dfeb", borderLeft: "none", padding: "6px 8px", fontSize: 12, color: "#64748b", borderRadius: "0 6px 6px 0" }}>.example.com</span>
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>Language</label>
        <select style={{ width: "100%", padding: "6px 10px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 12, background: "#fff" }}>
          <option>English (United States)</option>
        </select>
      </div>

      <button className={styles.btnPrimary} style={{ width: "100%", justifyContent: "center" }} onClick={() => router.push("/screens/DP-008")}>
        Create website draft →
      </button>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700 }}>Template version</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>v1.0.0 Released September 2026</div>
      </div>

      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>License summary</div>
        <div style={{ fontSize: 11, color: "#64748b", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Includes</span><span>Developer license</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Domains</span><span>1 included</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Environments</span><span>1 included</span></div>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span>Users</span><span>10 included</span></div>
        </div>
        <a href="#" style={{ fontSize: 11, color: "#174eca", textDecoration: "none", display: "block", marginTop: 6 }}>View license details ↗</a>
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-010"
      tabs={tabs}
      backTo={{ label: "Back to Projects", href: "/screens/DP-003" }}
      rightRail={rightRail}
    >
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Choose a template</h1>
          <p className={styles.subtitle}>Choose a starting point for your website. You can customize everything after creating your draft.</p>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #e2e8f0", paddingBottom: 8 }}>
          <span style={{ fontWeight: 600, color: "#174eca", borderBottom: "2px solid #174eca", paddingBottom: 6 }}>💼 Business</span>
          <span style={{ color: "#64748b" }}>👥 Portal</span>
          <span style={{ color: "#64748b" }}>🛒 Commerce</span>
          <span style={{ color: "#64748b" }}>📄 Blank</span>
        </div>

        {/* 3 Template Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          <div
            className={`${styles.stateCard} ${selectedTemplate === "corporate" ? styles.startingPointCardSelected : ""}`}
            onClick={() => setSelectedTemplate("corporate")}
            style={{ padding: 14 }}
          >
            <div style={{ width: "100%", height: 160, background: "linear-gradient(135deg, #f8fafc, #e2e8f0)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#475569" }}>
              Corporate Preview
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 8 }}>Corporate</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>A modern business website for companies and professional services.</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <span style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>Business</span>
              <span style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>Marketing</span>
            </div>
          </div>

          <div
            className={`${styles.stateCard} ${selectedTemplate === "partner-portal" ? styles.startingPointCardSelected : ""}`}
            onClick={() => setSelectedTemplate("partner-portal")}
            style={{ padding: 14 }}
          >
            <div style={{ width: "100%", height: 160, background: "linear-gradient(135deg, #eff6ff, #bfdbfe)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#1d4ed8" }}>
              Partner Portal Preview
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 8 }}>Partner portal</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>A dedicated portal for partners to access resources, training, and program tools.</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <span style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>Portal</span>
              <span style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>Partners</span>
            </div>
          </div>

          <div
            className={`${styles.stateCard} ${selectedTemplate === "commerce" ? styles.startingPointCardSelected : ""}`}
            onClick={() => setSelectedTemplate("commerce")}
            style={{ padding: 14 }}
          >
            <div style={{ width: "100%", height: 160, background: "linear-gradient(135deg, #fdf4ff, #f0abfc)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#86198f" }}>
              Commerce Preview
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 8 }}>Commerce</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>An e-commerce storefront to sell products online with confidence.</div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <span style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>Commerce</span>
              <span style={{ fontSize: 11, background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>Sales</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-011: Standalone builders (011_standalone_builders.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP011() {
  const router = useRouter();
  const [showNewMenu, setShowNewMenu] = useState(false);

  const tabs = [
    { id: "projects", title: "Projects", icon: <Folder size={14} /> },
    { id: "supplier-exp", title: "Supplier experience", icon: <Layers size={14} /> },
    { id: "corp-website", title: "Corporate website", icon: <Globe size={14} /> },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} /> },
  ];

  const rightDrawer = (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Globe size={22} color="#174eca" />
        <div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Partner microsite</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Website • Draft</div>
        </div>
      </div>

      <div style={{ height: 160, background: "linear-gradient(135deg, #1e293b, #0f172a)", borderRadius: 8, padding: 14, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 11, color: "#94a3b8" }}>Acme Partners</div>
        <div style={{ fontSize: 14, fontWeight: 700, margin: "6px 0" }}>Build more together</div>
        <div style={{ fontSize: 10, color: "#cbd5e1" }}>Resources, tools, and support designed for our partners.</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Owner</span>
          <span>👤 Alex Rivera</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Organization</span>
          <span>🏢 Acme Corp</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#64748b" }}>Save location</span>
          <span>📖 Organization library</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button className={styles.btnPrimary} style={{ flex: 1, justifyContent: "center" }}>
          Open builder
        </button>
        <button className={styles.btnSecondary} style={{ flex: 1, justifyContent: "center" }}>
          Link to project
        </button>
      </div>

      <div style={{ fontSize: 11, color: "#64748b", background: "#f8fafc", padding: 8, borderRadius: 6 }}>
        ⓘ Linking does not move ownership.
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-011"
      tabs={tabs}
      rightRail={rightDrawer}
    >
      <div className={styles.pageWrapper}>
        <div className={styles.pageHeader}>
          <h1 className={styles.title}>Build now. Connect when ready.</h1>
          <p className={styles.subtitle}>Resources stay in your organization library until linked to a project.</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <button className={styles.btnPrimary} onClick={() => setShowNewMenu(!showNewMenu)}>
              + New standalone ⌵
            </button>
            {showNewMenu && (
              <div style={{ position: "absolute", top: 40, left: 0, width: 180, background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 30, padding: 6 }}>
                <div style={{ padding: "8px 12px", fontSize: 13, cursor: "pointer", borderRadius: 4, display: "flex", gap: 8, alignItems: "center" }}>
                  <Globe size={15} /> Website
                </div>
                <div style={{ padding: "8px 12px", fontSize: 13, cursor: "pointer", borderRadius: 4, display: "flex", gap: 8, alignItems: "center" }}>
                  <Layers size={15} /> Application
                </div>
                <div style={{ padding: "8px 12px", fontSize: 13, cursor: "pointer", borderRadius: 4, display: "flex", gap: 8, alignItems: "center" }}>
                  <FileCode2 size={15} /> Component
                </div>
                <div style={{ padding: "8px 12px", fontSize: 13, cursor: "pointer", borderRadius: 4, display: "flex", gap: 8, alignItems: "center" }}>
                  <Workflow size={15} /> Workflow
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["All", "Websites", "Applications", "Components", "Workflows"].map((pill, i) => (
                <button
                  key={pill}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 14,
                    border: "1px solid #d7dfeb",
                    background: i === 0 ? "#174eca" : "#fff",
                    color: i === 0 ? "#fff" : "#15233d",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {pill}
                </button>
              ))}
            </div>
            <input type="text" placeholder="Search resources" style={{ padding: "4px 10px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 12 }} />
          </div>
        </div>

        {/* Resources Table */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div>Name ⇅</div>
            <div>Type ⇅</div>
            <div>Status ⇅</div>
            <div>Usage</div>
            <div />
          </div>

          {[
            { name: "Supplier intake form", type: "Component", status: "Draft", usage: "No project", icon: <FileCode2 size={16} /> },
            { name: "Partner microsite", type: "Website", status: "Draft", usage: "No project", icon: <Globe size={16} />, selected: true },
            { name: "Stock lookup", type: "App", status: "Draft", usage: "Used by 2 projects", icon: <Layers size={16} /> },
            { name: "Review routing", type: "Workflow", status: "v1.0", usage: "No project", icon: <Workflow size={16} /> },
          ].map((res, i) => (
            <div
              key={i}
              className={styles.tableRow}
              style={res.selected ? { background: "#eff6ff" } : undefined}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="checkbox" defaultChecked={res.selected} />
                <div style={{ color: "#174eca" }}>{res.icon}</div>
                <span style={{ fontWeight: 600 }}>{res.name}</span>
              </div>
              <div>{res.type}</div>
              <div>● {res.status}</div>
              <div style={{ color: "#64748b" }}>{res.usage}</div>
              <div><MoreVertical size={16} color="#94a3b8" /></div>
            </div>
          ))}
        </div>
      </div>
    </ScreenContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DP-012: Organization library (012_resource_library.png)
// ─────────────────────────────────────────────────────────────────────────────
export function ScreenDP012() {
  const [selectedComp, setSelectedComp] = useState("address-form");

  const tabs = [
    { id: "projects", title: "Projects", icon: <Folder size={14} /> },
    { id: "supplier-exp", title: "Supplier experience", icon: <Layers size={14} /> },
    { id: "corp-website", title: "Corporate website", icon: <Globe size={14} /> },
    { id: "supplier-portal", title: "Supplier portal", icon: <Layers size={14} /> },
    { id: "global-lib", title: "Global library", icon: <BookOpen size={14} />, active: true },
  ];

  const rightDrawer = (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Address form <span style={{ fontSize: 12, color: "#64748b" }}>v2.1</span></div>
        <button style={{ border: "none", background: "transparent", cursor: "pointer" }}>×</button>
      </div>

      {/* Live Form Inspector */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "#f8fafc", padding: 14, borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>Street address</label>
          <input type="text" defaultValue="456 Market Street" style={{ width: "100%", padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: 4, fontSize: 12, background: "#fff" }} />
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>Apt, suite, etc.</label>
          <input type="text" defaultValue="Suite 200" style={{ width: "100%", padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: 4, fontSize: 12, background: "#fff" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>City</label>
            <input type="text" defaultValue="Austin" style={{ width: "100%", padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: 4, fontSize: 12, background: "#fff" }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>State / Province</label>
            <input type="text" defaultValue="TX" style={{ width: "100%", padding: "6px 8px", border: "1px solid #cbd5e1", borderRadius: 4, fontSize: 12, background: "#fff" }} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#64748b" }}>Maintainer</span><span>👤 Design systems</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#64748b" }}>Version</span><span>2.1</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#64748b" }}>Used by</span><span>3 projects</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#64748b" }}>Compatibility</span><span>🌐 Web 📱 App</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#64748b" }}>Published version</span><span>2025.05.10</span></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#64748b" }}>Component updated</span><span>May 6, 2025</span></div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button className={styles.btnPrimary} style={{ width: "100%", justifyContent: "center" }}>
          View component ↗
        </button>
        <button className={styles.btnSecondary} style={{ width: "100%", justifyContent: "center" }}>
          Link to project 🔗
        </button>
      </div>
    </div>
  );

  return (
    <ScreenContainer
      currentScreenId="DP-012"
      tabs={tabs}
      rightRail={rightDrawer}
    >
      <div className={styles.pageWrapper}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 className={styles.title}>Organization library</h1>
            <p className={styles.subtitle}>Reusable components, templates, assets and workflows for your organization.</p>
          </div>
          <button className={styles.btnPrimary}>New resource</button>
        </div>

        {/* Library Subtabs */}
        <div style={{ display: "flex", gap: 24, borderBottom: "1px solid #e2e8f0", paddingBottom: 8 }}>
          <span style={{ fontWeight: 600, color: "#174eca", borderBottom: "2px solid #174eca", paddingBottom: 6 }}>Components</span>
          <span style={{ color: "#64748b" }}>Templates</span>
          <span style={{ color: "#64748b" }}>Assets</span>
          <span style={{ color: "#64748b" }}>Workflows</span>
          <span style={{ color: "#64748b" }}>Connectors</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input type="text" placeholder="Search components" style={{ width: 280, padding: "6px 12px", border: "1px solid #d7dfeb", borderRadius: 6, fontSize: 13 }} />
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Published library version 2025.05.10 • Updated May 10, 2025 • <a href="#" style={{ color: "#174eca" }}>View versions</a>
          </div>
        </div>

        {/* 6 Component Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {/* Card 1: Supplier header */}
          <div className={styles.stateCard} style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Supplier header <span style={{ fontSize: 11, color: "#64748b" }}>v1.2</span></span>
              <span>•••</span>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: 10, height: 100, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 12, color: "#174eca" }}>Acme Supplies</span>
                <span style={{ fontSize: 9, background: "#dcfce7", color: "#166534", padding: "1px 4px", borderRadius: 4 }}>Active</span>
              </div>
              <div style={{ display: "flex", gap: 8, fontSize: 10, color: "#64748b", marginTop: 8 }}>
                <span>Overview</span><span>Orders</span><span>Invoices</span><span>Contacts</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 11, color: "#64748b" }}>
              <span>Used by 4 projects</span>
              <span style={{ background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>Layout</span>
            </div>
          </div>

          {/* Card 2: Address form */}
          <div className={styles.stateCard} style={{ padding: 14, borderColor: "#174eca", boxShadow: "0 0 0 2px rgba(23,78,202,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Address form <span style={{ fontSize: 11, color: "#64748b" }}>v2.1</span></span>
              <CheckCircle2 size={16} color="#174eca" />
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: 10, height: 100, display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 10, color: "#64748b" }}>Street address: 456 Market Street</div>
              <div style={{ fontSize: 10, color: "#64748b" }}>Apt: Suite 200</div>
              <div style={{ fontSize: 10, color: "#64748b" }}>City: Austin, TX 78701</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 11, color: "#64748b" }}>
              <span>Used by 3 projects</span>
              <span style={{ background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>Form</span>
            </div>
          </div>

          {/* Card 3: Approval timeline */}
          <div className={styles.stateCard} style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Approval timeline <span style={{ fontSize: 11, color: "#64748b" }}>v1.0</span></span>
              <span>•••</span>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: 10, height: 100, display: "flex", flexDirection: "column", gap: 4, fontSize: 10 }}>
              <div style={{ color: "#16a34a" }}>● Submitted (May 9)</div>
              <div style={{ color: "#64748b" }}>○ Manager review</div>
              <div style={{ color: "#64748b" }}>○ Finance review</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 11, color: "#64748b" }}>
              <span>Used by 2 projects</span>
              <span style={{ background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>Feedback</span>
            </div>
          </div>

          {/* Card 4: Data table */}
          <div className={styles.stateCard} style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Data table <span style={{ fontSize: 11, color: "#64748b" }}>v3.0</span></span>
              <span>•••</span>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: 10, height: 100, fontSize: 9, color: "#64748b" }}>
              <div>ORD-10482 • Acme Corp • $12,450.00</div>
              <div>ORD-10481 • Northwind • $8,215.40</div>
              <div>ORD-10480 • BluePeak • $3,680.00</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 11, color: "#64748b" }}>
              <span>Used by 6 projects</span>
              <span style={{ background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>Data display</span>
            </div>
          </div>

          {/* Card 5: Metric summary */}
          <div className={styles.stateCard} style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Metric summary <span style={{ fontSize: 11, color: "#64748b" }}>v1.1</span></span>
              <span>•••</span>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: 10, height: 100, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: 14 }}>$1.24M</div><div style={{ fontSize: 9, color: "#16a34a" }}>↑ 12.6%</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: 14 }}>342</div><div style={{ fontSize: 9, color: "#d97706" }}>↑ 8.1%</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontWeight: 700, fontSize: 14 }}>24</div><div style={{ fontSize: 9, color: "#ef4444" }}>↓ 4.3%</div></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 11, color: "#64748b" }}>
              <span>Used by 5 projects</span>
              <span style={{ background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>Visualization</span>
            </div>
          </div>

          {/* Card 6: Empty state */}
          <div className={styles.stateCard} style={{ padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Empty state <span style={{ fontSize: 11, color: "#64748b" }}>v1.0</span></span>
              <span>•••</span>
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, padding: 10, height: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <Folder size={18} color="#94a3b8" />
              <span style={{ fontSize: 10, color: "#64748b" }}>No items found</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 11, color: "#64748b" }}>
              <span>Used by 4 projects</span>
              <span style={{ background: "#f1f5f9", padding: "1px 6px", borderRadius: 4 }}>Feedback</span>
            </div>
          </div>
        </div>
      </div>
    </ScreenContainer>
  );
}
