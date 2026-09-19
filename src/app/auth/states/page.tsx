"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  FileCode2,
  Workflow,
  UserCheck,
  LayoutGrid,
  Folder,
  Settings,
  CheckCircle2,
  Shield,
  Layers,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Home,
  Check,
  ExternalLink,
} from "lucide-react";
import { StrataWorkbenchLayout } from "@/components/strata/StrataWorkbenchLayout";
import styles from "./auth-states.module.css";

export default function AuthStatesPage() {
  const router = useRouter();

  // Active subheader tab
  const [activeTab, setActiveTab] = useState<"spec" | "flow" | "diagram" | "story">("spec");

  // Selected state card in State Specification view (1 | 2 | 3)
  const [activeCard, setActiveCard] = useState<1 | 2 | 3>(1);

  // Active sidebar navigation item
  const [activeSidebarItem, setActiveSidebarItem] = useState("spec");

  // Session expired banner visibility
  const [showSessionBanner, setShowSessionBanner] = useState(true);

  // Live simulation state for "Authentication flow" tab
  const [simStep, setSimStep] = useState<1 | 2 | 3>(1);
  const [simStatus, setSimStatus] = useState<string>("Idle — Ready to test OIDC callback handoff");
  const [simLoading, setSimLoading] = useState(false);

  const tabs = [
    { id: "flow", label: "Authentication flow", icon: <Globe size={14} /> },
    { id: "spec", label: "State specification", icon: <FileCode2 size={14} /> },
    { id: "diagram", label: "Flow diagram", icon: <Workflow size={14} /> },
    { id: "story", label: "User story", icon: <UserCheck size={14} /> },
  ];

  const sidebarGroups = [
    {
      title: "AUTH FLOW",
      items: [
        { id: "spec", label: "State specification", icon: <FileCode2 size={15} /> },
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

  // Live simulation execution
  const runSimulation = async () => {
    setSimLoading(true);
    setSimStatus("Step 1: Preparing PKCE authorization request context...");
    setSimStep(1);

    await new Promise((r) => setTimeout(r, 900));
    setSimStatus("Step 2: Simulating code exchange with IDP and restoring project session...");
    setSimStep(2);

    await new Promise((r) => setTimeout(r, 1100));
    setSimStatus("Step 3: Verification complete — Session established for test.agent@unierp.com!");
    setSimStep(3);
    setSimLoading(false);
  };

  return (
    <StrataWorkbenchLayout
      currentTabId={activeTab}
      tabs={tabs}
      onTabSelect={(id) => {
        setActiveTab(id as "spec" | "flow" | "diagram" | "story");
        if (id === "diagram") setActiveSidebarItem("diagram");
        if (id === "spec") setActiveSidebarItem("spec");
      }}
      scopeLabel="Scope"
      scopeValue="Developer / Authentication handoff"
      versionLabel="1.0 (Draft)"
      statusText="● In progress"
      statusVariant="in-progress"
      backHref="/"
      backLabel="Projects"
      sidebarGroups={sidebarGroups}
      activeSidebarItemId={activeSidebarItem}
      onSidebarItemSelect={(id) => {
        setActiveSidebarItem(id);
        if (id === "diagram") setActiveTab("diagram");
        if (id === "spec") setActiveTab("spec");
      }}
      showSessionBanner={showSessionBanner}
      onBannerDismiss={() => setShowSessionBanner(false)}
      onBannerReauthenticate={() => {
        router.push("/login");
      }}
      onBannerReturnHome={() => {
        router.push("/");
      }}
    >
      {/* ── Page Header ── */}
      <div className={styles.pageHead}>
        <h1 className={styles.title}>Authentication flow state specification</h1>
        <p className={styles.subtitle}>
          Hosted Identity handles authentication: Developer displays handoff and return states.
        </p>
      </div>

      {/* ── Tab 1: State Specification (Canonical 3-Card Flow) ── */}
      {activeTab === "spec" && (
        <>
          <div className={styles.flowGrid}>
            {/* ── Card 1: Sign-in handoff ── */}
            <div
              className={`${styles.stateCard} ${
                activeCard === 1 ? styles.stateCardActive : ""
              }`}
              onClick={() => setActiveCard(1)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveCard(1)}
              aria-label="State 1: Sign-in handoff"
            >
              <div className={styles.cardHeader}>
                <div className={styles.headerLead}>
                  <div className={styles.numberCircle}>1</div>
                  <span className={styles.cardTitle}>Sign-in handoff</span>
                </div>
                <span className={styles.badgeInProgress}>
                  <ArrowRight size={10} /> In progress
                </span>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>Purpose</span>
                <p className={styles.purposeText}>
                  Initiates secure sign-in by redirecting the user to the Hosted Identity provider.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>What the user sees</span>
                <div className={styles.previewBox}>
                  <div className={styles.previewIcon}>
                    <Globe size={18} />
                  </div>
                  <div className={styles.previewBrand}>UniERP Developer</div>
                  <div className={styles.previewStatus}>Continue to secure sign-in</div>
                  <div className={styles.dotsStepper} aria-label="Step 1 of 3">
                    <span className={`${styles.dot} ${styles.dotActive}`} />
                    <span className={styles.dot} />
                    <span className={styles.dot} />
                  </div>
                  <div className={styles.previewText}>
                    Redirecting to sign-in...{"\n"}You will be signed in securely.
                  </div>
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>System actions</span>
                <ul className={styles.actionsList}>
                  <li>Validates request and prepares authentication context</li>
                  <li>Redirects to identity provider for authentication</li>
                  <li>No credentials are collected on this page</li>
                </ul>
              </div>

              <div className={styles.cardFooter}>
                <span>
                  Transitions: On successful handoff →{" "}
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCard(2);
                    }}
                  >
                    State 2
                  </button>
                </span>
              </div>
            </div>

            {/* Connecting Arrow 1 → 2 */}
            <div className={styles.flowArrow} aria-hidden="true">
              <ArrowRight size={22} />
            </div>

            {/* ── Card 2: Completing sign-in ── */}
            <div
              className={`${styles.stateCard} ${
                activeCard === 2 ? styles.stateCardActive : ""
              }`}
              onClick={() => setActiveCard(2)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveCard(2)}
              aria-label="State 2: Completing sign-in"
            >
              <div className={styles.cardHeader}>
                <div className={styles.headerLead}>
                  <div className={styles.numberCircle}>2</div>
                  <span className={styles.cardTitle}>Completing sign-in</span>
                </div>
                <span className={styles.badgeInProgress}>
                  <ArrowRight size={10} /> In progress
                </span>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>Purpose</span>
                <p className={styles.purposeText}>
                  Restores the requested Developer project after hosted Identity sign-in.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>What the user sees</span>
                <div className={styles.previewBox}>
                  <div className={styles.previewIcon}>
                    <Layers size={18} />
                  </div>
                  <div className={styles.previewBrand}>UniERP Developer</div>
                  <div className={styles.previewStatus}>Completing sign-in...</div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressBar} />
                  </div>
                  <div className={styles.previewText}>
                    Restoring your requested project.{"\n"}Please wait.
                  </div>
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>System actions</span>
                <ul className={styles.actionsList}>
                  <li>Validates authentication response</li>
                  <li>Establishes user session</li>
                  <li>Restores requested project and user context</li>
                </ul>
              </div>

              <div className={styles.cardFooter}>
                <span>
                  Transitions: On success →{" "}
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/");
                    }}
                  >
                    Redirect to requested project
                  </button>
                </span>
              </div>
            </div>

            {/* Connecting Arrow 2 → 3 */}
            <div className={styles.flowArrow} aria-hidden="true">
              <ArrowRight size={22} />
            </div>

            {/* ── Card 3: Session could not be completed ── */}
            <div
              className={`${styles.stateCard} ${
                activeCard === 3 ? styles.stateCardActiveError : ""
              }`}
              onClick={() => setActiveCard(3)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveCard(3)}
              aria-label="State 3: Session could not be completed"
            >
              <div className={styles.cardHeader}>
                <div className={styles.headerLead}>
                  <div className={`${styles.numberCircle} ${styles.numberCircleError}`}>3</div>
                  <span className={styles.cardTitle}>Session could not be completed</span>
                </div>
                <span className={styles.badgeError}>
                  <AlertTriangle size={10} /> Error
                </span>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>Purpose</span>
                <p className={styles.purposeText}>
                  Informs the user that the session could not be established and provides safe
                  recovery options.
                </p>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>What the user sees</span>
                <div className={styles.previewBox}>
                  <div className={`${styles.previewIcon} ${styles.previewIconError}`}>
                    <AlertTriangle size={18} />
                  </div>
                  <div className={styles.previewBrand}>UniERP Developer</div>
                  <div className={`${styles.previewStatus} ${styles.previewStatusError}`}>
                    We couldn't complete your session
                  </div>
                  <span className={styles.referenceCode}>Reference: AUTH-DEMO-01</span>
                  <div className={styles.previewText}>You can try again or return home.</div>
                  <div className={styles.previewActions}>
                    <button
                      type="button"
                      className={styles.previewBtnPrimary}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCard(1);
                      }}
                    >
                      Try again
                    </button>
                    <button
                      type="button"
                      className={styles.previewBtnSecondary}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/");
                      }}
                    >
                      Return home
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>System actions</span>
                <ul className={styles.actionsList}>
                  <li>Clears partial session artifacts</li>
                  <li>Logs telemetry for diagnostics</li>
                  <li>Keeps user data secure</li>
                </ul>
              </div>

              <div className={styles.cardFooter}>
                <span>
                  Try again →{" "}
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCard(1);
                    }}
                  >
                    State 1
                  </button>
                </span>
                <span>
                  Return home →{" "}
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/");
                    }}
                  >
                    Developer home
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* ── Interactive Test Actions ── */}
          <div className={styles.simulationPanel}>
            <h2 className={styles.panelTitle}>Live State Runner & Diagnostics</h2>
            <p className={styles.panelDesc}>
              Test each transition state in real time against the IDP (port 3005) and API session
              endpoints.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                type="button"
                className={styles.previewBtnPrimary}
                onClick={() => router.push("/login")}
              >
                <ExternalLink size={13} style={{ marginRight: 6, display: "inline" }} />
                Execute Real Sign-in Handoff (/login)
              </button>
              <button
                type="button"
                className={styles.previewBtnSecondary}
                onClick={() => setShowSessionBanner(true)}
              >
                Trigger Session Expired Banner
              </button>
              <button
                type="button"
                className={styles.previewBtnSecondary}
                onClick={() => setActiveCard((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)))}
              >
                Cycle Active State Focus (Currently State {activeCard})
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Tab 2: Authentication Flow (Interactive Stepper) ── */}
      {activeTab === "flow" && (
        <div className={styles.simulationPanel}>
          <h2 className={styles.panelTitle}>Live Authentication Flow Walkthrough</h2>
          <p className={styles.panelDesc}>
            Step through the end-to-end authentication lifecycle from unauthenticated visitor to
            fully hydrated project workspace.
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <button
              type="button"
              className={styles.previewBtnPrimary}
              onClick={runSimulation}
              disabled={simLoading}
            >
              <RefreshCw
                size={13}
                style={{
                  marginRight: 6,
                  display: "inline",
                  animation: simLoading ? "spin 1s linear infinite" : undefined,
                }}
              />
              {simLoading ? "Running Verification..." : "Run Live Verification"}
            </button>
          </div>

          <div className={styles.diagramBox}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: "var(--color-primary)" }}>
              {simStatus}
            </div>
            <div>[Phase 1] Client Request: GET /login → OidcClient.buildAuthorizationUrl()</div>
            <div>[Phase 2] Redirect: 302 → http://localhost:3005/oidc/auth (PKCE S256 Challenge)</div>
            <div>[Phase 3] Callback: GET /auth/callback?code=AUTH_CODE&state=...</div>
            <div>[Phase 4] Token Exchange: POST /api/session → IDP /oidc/token (httpOnly Cookie)</div>
            <div>[Phase 5] Workspace Hydration: Scope resolved to Acme Corp (00000000-0000-0000-0000-000000000001)</div>
          </div>
        </div>
      )}

      {/* ── Tab 3: Flow Diagram (Sequence Swimlane) ── */}
      {activeTab === "diagram" && (
        <div className={styles.simulationPanel}>
          <h2 className={styles.panelTitle}>Authentication Sequence Diagram</h2>
          <p className={styles.panelDesc}>
            Protocol interaction between Developer Platform Client, Hosted OIDC Identity Provider, and
            Session Persistence Route.
          </p>
          <pre className={styles.diagramBox}>
{`
┌───────────────────────┐        ┌────────────────────────┐        ┌───────────────────────┐
│ Developer Client      │        │ Hosted Identity (IDP)  │        │ Developer Platform    │
│ (Port 4004)           │        │ (Port 3005)            │        │ Server (/api/session) │
└──────────┬────────────┘        └───────────┬────────────┘        └───────────┬───────────┘
           │                                 │                                 │
           │  1. Initiate Sign-in            │                                 │
           │────────────────────────────────>│                                 │
           │     (PKCE Code Challenge)       │                                 │
           │                                 │                                 │
           │  2. Authenticate User           │                                 │
           │     (Super Admin Credentials)   │                                 │
           │                                 │                                 │
           │  3. Redirect with Auth Code     │                                 │
           │<────────────────────────────────│                                 │
           │     (/auth/callback?code=...)   │                                 │
           │                                 │                                 │
           │  4. Handshake Refresh Token     │                                 │
           │──────────────────────────────────────────────────────────────────>│
           │     POST /api/session           │                                 │
           │                                 │                                 │
           │                                 │  5. Exchange Refresh Token      │
           │                                 │<────────────────────────────────│
           │                                 │     POST /oidc/token            │
           │                                 │                                 │
           │                                 │  6. Return Access + ID Tokens   │
           │                                 │────────────────────────────────>│
           │                                 │                                 │
           │  7. Set httpOnly session_rt     │                                 │
           │<──────────────────────────────────────────────────────────────────│
           │     200 OK + Resume Deep Link   │                                 │
           │                                 │                                 │
           ▼                                 ▼                                 ▼
`}
          </pre>
        </div>
      )}

      {/* ── Tab 4: User Story (DEV-001 / FND-08) ── */}
      {activeTab === "story" && (
        <div className={styles.simulationPanel}>
          <h2 className={styles.panelTitle}>User Story DEV-001: Sign-in Handoff & Session Security</h2>
          <p className={styles.panelDesc}>
            Story Backlog ID: DEV-001 | Canonical Origin: FND-08 Hosted Identity Handoff
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13, color: "var(--color-text-secondary)" }}>
            <div>
              <strong>As a:</strong> Platform developer or tenant administrator
            </div>
            <div>
              <strong>I want to:</strong> Be securely redirected to the hosted Identity provider and smoothly returned with validated project context
            </div>
            <div>
              <strong>So that:</strong> No passwords or credentials ever traverse the developer-platform frontend, and expired sessions safely quarantine unsynced work.
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Acceptance Criteria:</strong>
              <ul style={{ paddingLeft: 20, marginTop: 6, lineHeight: 1.6 }}>
                <li>[AC-01] Validates that no login input fields exist inside the developer platform client.</li>
                <li>[AC-02] OIDC client generates cryptographically random state, nonce, and PKCE S256 code challenge.</li>
                <li>[AC-03] Session refresh token is stored exclusively in server-side httpOnly cookies (session_rt).</li>
                <li>[AC-04] Replayed or forged authorization codes are rejected with reference AUTH-DEMO-01.</li>
                <li>[AC-05] Expired sessions display the interactive amber recovery banner with Reauthenticate / Return home options.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </StrataWorkbenchLayout>
  );
}
