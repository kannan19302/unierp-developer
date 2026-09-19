"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Layers,
  Search,
  Bell,
  HelpCircle,
  Grid,
  ChevronDown,
  X,
  Plus,
  Compass,
  SplitSquareVertical,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ChevronRight,
  Shield,
  Clock,
  CheckCircle2,
} from "lucide-react";
import styles from "./ScreenContainer.module.css";
import {
  ALL_SCREENS,
  JOURNEY_GROUPS,
  getScreenById,
  type ScreenDescriptor,
} from "./manifest";

export interface WorkspaceTab {
  id: string;
  title: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface SidebarNavGroup {
  title?: string;
  items: {
    id: string;
    label: string;
    icon: React.ReactNode;
    href?: string;
    active?: boolean;
    badge?: string | number;
    badgeColor?: string;
    onClick?: () => void;
  }[];
}

export interface ScreenContainerProps {
  currentScreenId: string;
  activeTabId?: string;
  tabs?: WorkspaceTab[];
  onTabSelect?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  breadcrumb?: { label: string; href?: string }[];
  sidebarGroups?: SidebarNavGroup[];
  sidebarProjectContext?: {
    name: string;
    environment: string;
    avatar?: React.ReactNode;
  };
  backTo?: {
    label: string;
    href: string;
  };
  rightRail?: React.ReactNode;
  bottomBanner?: {
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    onClose?: () => void;
  };
  children: React.ReactNode;
}

export function ScreenContainer({
  currentScreenId,
  tabs,
  onTabSelect,
  onTabClose,
  breadcrumb,
  sidebarGroups,
  sidebarProjectContext,
  backTo,
  rightRail,
  bottomBanner,
  children,
}: ScreenContainerProps) {
  const router = useRouter();
  const screen = getScreenById(currentScreenId);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const [viewMode, setViewMode] = useState<"live" | "split" | "reference">("live");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Keyboard shortcut Ctrl+Shift+S to open 108 screens catalog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "S") {
        e.preventDefault();
        setIsNavModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredScreens = ALL_SCREENS.filter((s) => {
    if (!navSearch) return true;
    const query = navSearch.toLowerCase();
    return (
      s.screenId.toLowerCase().includes(query) ||
      s.title.toLowerCase().includes(query) ||
      s.group.toLowerCase().includes(query) ||
      s.file.toLowerCase().includes(query)
    );
  });

  return (
    <div className={styles.container}>
      {/* ── Top Bar ── */}
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <Link href="/projects" className={styles.brandLink}>
            <div className={styles.brandLogo}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  fill="#174eca"
                />
                <path
                  d="M2 17L12 22L22 17M2 12L12 17L22 12"
                  stroke="#174eca"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>UniERP</span>
            <span className={styles.brandSeparator}>/</span>
            <span className={styles.brandPlatform}>Developer</span>
          </Link>

          <button className={styles.tenantSelector}>
            <Shield size={14} color="#174eca" />
            <span>Acme Corp</span>
            <ChevronDown size={14} />
          </button>
        </div>

        <div className={styles.topbarCenter}>
          <div className={styles.searchBox} onClick={() => setIsNavModalOpen(true)}>
            <Search size={15} color="var(--color-text-secondary, #53647e)" />
            <span className={styles.searchPlaceholder}>Search workspace...</span>
            <span className={styles.searchKbd}>Ctrl K</span>
          </div>
        </div>

        <div className={styles.topbarRight}>
          {/* Quick Navigator for 108 screens */}
          <button
            className={styles.navBadgeButton}
            onClick={() => setIsNavModalOpen(true)}
            title="Browse all 108 design screens (Ctrl+Shift+S)"
          >
            <Compass size={14} />
            <span>108 Screens</span>
            <span style={{ fontSize: 10, background: "#1d4ed8", color: "#fff", padding: "1px 5px", borderRadius: 4 }}>
              {currentScreenId}
            </span>
          </button>

          {/* View mode toggle: Live UI vs Split vs PNG Reference */}
          {screen?.imagePath && (
            <div className={styles.viewModeToggle}>
              <button
                className={`${styles.viewModeButton} ${viewMode === "live" ? styles.viewModeButtonActive : ""}`}
                onClick={() => setViewMode("live")}
                title="Interactive Strata DOM view"
              >
                Live UI
              </button>
              <button
                className={`${styles.viewModeButton} ${viewMode === "split" ? styles.viewModeButtonActive : ""}`}
                onClick={() => setViewMode("split")}
                title="Side-by-side design comparison"
              >
                Split
              </button>
              <button
                className={`${styles.viewModeButton} ${viewMode === "reference" ? styles.viewModeButtonActive : ""}`}
                onClick={() => setViewMode("reference")}
                title="Original high-fidelity design PNG"
              >
                Design PNG
              </button>
            </div>
          )}

          <button className={styles.iconButton} title="App launcher">
            <Grid size={16} />
          </button>
          <button className={styles.iconButton} title="Help">
            <HelpCircle size={16} />
          </button>
          <button className={styles.iconButton} title="Notifications">
            <Bell size={16} />
            <span className={styles.notificationBadge}>3</span>
          </button>
          <div className={styles.userAvatar} title="Ava Rodriguez (AR)">
            AR
          </div>
        </div>
      </header>

      {/* ── Tab Strip ── */}
      {tabs && tabs.length > 0 && (
        <div className={styles.tabStrip}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${styles.tabItem} ${tab.active ? styles.tabItemActive : ""}`}
              onClick={() => onTabSelect?.(tab.id)}
            >
              {tab.icon}
              <span>{tab.title}</span>
              {onTabClose && (
                <button
                  className={styles.tabClose}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.id);
                  }}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
          <button className={styles.newTabButton} title="New tab">
            <Plus size={14} />
          </button>
        </div>
      )}

      {/* ── Main Workspace Body ── */}
      <div className={styles.workspaceBody}>
        {/* Left Sidebar */}
        {!sidebarCollapsed && (
          <aside className={styles.sidebar}>
            {backTo && (
              <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--color-border, #d7dfeb)" }}>
                <Link
                  href={backTo.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: "var(--color-text-secondary, #53647e)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  <ArrowLeft size={14} />
                  <span>{backTo.label}</span>
                </Link>
              </div>
            )}

            {sidebarProjectContext && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  borderBottom: "1px solid var(--color-border, #d7dfeb)",
                }}
              >
                {sidebarProjectContext.avatar || (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: "linear-gradient(135deg, #2563eb, #38bdf8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    SE
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {sidebarProjectContext.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--color-text-secondary, #53647e)" }}>
                    {sidebarProjectContext.environment}
                  </div>
                </div>
                <ChevronDown size={14} color="var(--color-text-secondary, #53647e)" />
              </div>
            )}

            <div style={{ flex: 1, overflowY: "auto" }}>
              {sidebarGroups?.map((group, gIdx) => (
                <div key={gIdx} className={styles.sidebarGroup}>
                  {group.title && (
                    <div className={styles.sidebarGroupTitle}>{group.title}</div>
                  )}
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className={`${styles.sidebarItem} ${item.active ? styles.sidebarItemActive : ""}`}
                      onClick={item.onClick}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.badge !== undefined && (
                        <span
                          className={styles.sidebarBadge}
                          style={item.badgeColor ? { backgroundColor: item.badgeColor } : undefined}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.sidebarFooter}>
              <button
                className={styles.collapseButton}
                onClick={() => setSidebarCollapsed(true)}
              >
                <span>« Collapse</span>
              </button>
            </div>
          </aside>
        )}

        {/* Center Main Content (Handles Live, Split, or Reference view) */}
        <main className={styles.mainContent}>
          {viewMode === "live" && children}

          {viewMode === "split" && (
            <div className={styles.comparisonContainer}>
              <div className={styles.comparisonPane}>{children}</div>
              <div className={styles.comparisonDivider} />
              <div className={styles.comparisonPane} style={{ background: "#ffffff", padding: 16 }}>
                <div style={{ marginBottom: 12, fontSize: 12, fontWeight: 600, color: "#174eca" }}>
                  Design Baseline Reference ({screen?.file}):
                </div>
                {screen?.imagePath && (
                  <img
                    src={screen.imagePath}
                    alt={`Reference ${screen.screenId}`}
                    className={styles.pngReferenceImage}
                  />
                )}
              </div>
            </div>
          )}

          {viewMode === "reference" && screen?.imagePath && (
            <div style={{ padding: 24, textAlign: "center", background: "#f1f5f9" }}>
              <div style={{ marginBottom: 16, fontSize: 13, fontWeight: 600, color: "#174eca" }}>
                Pixel-Perfect Baseline: {screen.screenId} — {screen.title} ({screen.file})
              </div>
              <img
                src={screen.imagePath}
                alt={`Reference ${screen.screenId}`}
                style={{ maxWidth: "100%", height: "auto", borderRadius: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
              />
            </div>
          )}

          {/* Bottom Floating Warning/Status Banner */}
          {bottomBanner && (
            <div className={styles.bottomBar}>
              <div className={styles.bottomBarContent}>
                {bottomBanner.icon || <Clock className={styles.bottomBarIcon} size={20} />}
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{bottomBanner.title}</div>
                  {bottomBanner.subtitle && (
                    <div className={styles.bottomBarText}>{bottomBanner.subtitle}</div>
                  )}
                </div>
              </div>
              <div className={styles.bottomBarActions}>
                {bottomBanner.actions}
                {bottomBanner.onClose && (
                  <button
                    onClick={bottomBanner.onClose}
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "#92400e" }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Right Inspector / Rail */}
        {rightRail && <aside className={styles.rightRail}>{rightRail}</aside>}
      </div>

      {/* ── Screen Navigator Modal (Quick Jump to all 108 screens) ── */}
      {isNavModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsNavModalOpen(false)}>
          <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <div className={styles.modalTitle}>Developer Platform — 108 Screen Catalog</div>
                <div style={{ fontSize: 12, color: "var(--color-text-secondary, #53647e)", marginTop: 2 }}>
                  Direct jump to any journey screen (DP-001 through DP-108)
                </div>
              </div>
              <button
                className={styles.iconButton}
                onClick={() => setIsNavModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <input
              type="text"
              className={styles.modalSearchInput}
              placeholder="Search screens by DP number, title, or journey..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              autoFocus
            />

            <div className={styles.modalBody}>
              {filteredScreens.map((s) => (
                <div
                  key={s.screenId}
                  className={styles.screenCard}
                  onClick={() => {
                    setIsNavModalOpen(false);
                    router.push(`/screens/${s.screenId}`);
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className={styles.screenCardId}>{s.screenId}</span>
                    <span style={{ fontSize: 11, color: "var(--color-text-secondary, #8092a8)" }}>
                      Orig {s.originId}
                    </span>
                  </div>
                  <div className={styles.screenCardTitle}>{s.title}</div>
                  <div className={styles.screenCardGroup}>{s.group}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
