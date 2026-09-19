"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Search,
  Grid,
  HelpCircle,
  Bell,
  ChevronDown,
  X,
  Plus,
  ArrowLeft,
  ChevronsLeft,
  ChevronsRight,
  Share2,
  MoreVertical,
  Clock,
} from "lucide-react";
import styles from "./StrataWorkbenchLayout.module.css";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SidebarNavGroup {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ReactNode;
    badge?: number | string;
    href?: string;
  }[];
}

export interface StrataWorkbenchLayoutProps {
  currentTabId: string;
  tabs: TabItem[];
  onTabSelect?: (id: string) => void;
  onTabClose?: (id: string) => void;
  onTabAdd?: () => void;
  scopeLabel?: string;
  scopeValue?: string;
  versionLabel?: string;
  statusText?: string;
  statusVariant?: "in-progress" | "error" | "published";
  onShare?: () => void;
  backHref?: string;
  backLabel?: string;
  sidebarGroups?: SidebarNavGroup[];
  activeSidebarItemId?: string;
  onSidebarItemSelect?: (id: string) => void;
  showSessionBanner?: boolean;
  onBannerDismiss?: () => void;
  onBannerReauthenticate?: () => void;
  onBannerReturnHome?: () => void;
  children: React.ReactNode;
}

export function StrataWorkbenchLayout({
  currentTabId,
  tabs,
  onTabSelect,
  onTabClose,
  onTabAdd,
  scopeLabel = "Scope",
  scopeValue = "Developer / Authentication handoff",
  versionLabel = "1.0 (Draft)",
  statusText = "● In progress",
  statusVariant = "in-progress",
  onShare,
  backHref = "/projects",
  backLabel = "Projects",
  sidebarGroups = [],
  activeSidebarItemId,
  onSidebarItemSelect,
  showSessionBanner = false,
  onBannerDismiss,
  onBannerReauthenticate,
  onBannerReturnHome,
  children,
}: StrataWorkbenchLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else if (typeof window !== "undefined") {
      void navigator.clipboard?.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <div className={styles.container}>
      {/* ── 1. Top Header Bar ── */}
      <header className={styles.topBar}>
        <div className={brandGroupClass()}>
          <Link href="/" className={styles.brandLogo}>
            <div className={styles.brandIcon}>
              <Globe size={16} />
            </div>
            <span>UniERP</span>
            <span className={styles.brandDivider}>/</span>
            <span className={styles.brandApp}>Developer</span>
          </Link>

          <button type="button" className={styles.tenantSelector}>
            <span>🏢</span>
            <span>Acme Corp</span>
            <ChevronDown size={14} />
          </button>
        </div>

        <div className={styles.searchBar}>
          <Search size={15} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search workspace"
            aria-label="Search workspace"
          />
          <kbd className={styles.searchKbd}>Ctrl K</kbd>
        </div>

        <div className={styles.topBarActions}>
          <button type="button" className={styles.iconBtn} aria-label="App Launcher" title="App launcher">
            <Grid size={16} />
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Help & Documentation" title="Help">
            <HelpCircle size={16} />
          </button>
          <button type="button" className={styles.iconBtn} aria-label="Notifications" title="Notifications">
            <Bell size={16} />
            <span className={styles.badge}>3</span>
          </button>
          <div className={styles.userAvatar} title="Agent Runner (SUPER_ADMIN)">
            AR
          </div>
        </div>
      </header>

      {/* ── 2. Subheader Tabs Bar ── */}
      <nav className={styles.tabsBar} aria-label="Workspace tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === currentTabId;
          return (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tabItem} ${isActive ? styles.tabItemActive : ""}`}
              onClick={() => onTabSelect?.(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {onTabClose && (
                <span
                  role="button"
                  tabIndex={0}
                  className={styles.tabCloseBtn}
                  aria-label={`Close ${tab.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      onTabClose(tab.id);
                    }
                  }}
                >
                  <X size={12} />
                </span>
              )}
            </button>
          );
        })}
        {onTabAdd && (
          <button
            type="button"
            className={styles.tabAddBtn}
            onClick={onTabAdd}
            aria-label="Add tab"
            title="Open new tab"
          >
            <Plus size={15} />
          </button>
        )}
      </nav>

      {/* ── 3. Scope & Action Sub-bar ── */}
      <div className={styles.scopeBar}>
        <div className={styles.scopeInfo}>
          <span className={styles.scopeLabel}>{scopeLabel}:</span>
          <span className={styles.scopeValue}>
            {scopeValue} <ChevronDown size={14} />
          </span>
        </div>

        <div className={styles.scopeActions}>
          <button type="button" className={styles.versionSelector}>
            <span>Version {versionLabel}</span>
            <ChevronDown size={14} />
          </button>

          <span
            className={`${styles.statusPill} ${
              statusVariant === "error"
                ? styles.statusPillError
                : styles.statusPillInProgress
            }`}
          >
            {statusText}
          </span>

          <button type="button" className={styles.btnPrimary} onClick={handleShare}>
            <Share2 size={14} />
            <span>{copiedToast ? "Copied!" : "Share"}</span>
          </button>

          <button type="button" className={styles.iconBtn} aria-label="More options">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* ── 4. Main Workbench Body (Sidebar + Canvas) ── */}
      <div className={styles.workbenchBody}>
        <aside
          className={`${styles.sidebar} ${sidebarCollapsed ? styles.sidebarCollapsed : ""}`}
          aria-label="Navigation sidebar"
        >
          <div className={styles.sidebarTop}>
            <Link href={backHref} className={styles.backLink}>
              <ArrowLeft size={16} />
              {!sidebarCollapsed && <span>{backLabel}</span>}
            </Link>
          </div>

          <div className={styles.sidebarContent}>
            {sidebarGroups.map((group) => (
              <div key={group.title} className={styles.sidebarGroup}>
                {!sidebarCollapsed && (
                  <div className={styles.sidebarGroupTitle}>{group.title}</div>
                )}
                {group.items.map((item) => {
                  const isActive = item.id === activeSidebarItemId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.sidebarItem} ${
                        isActive ? styles.sidebarItemActive : ""
                      }`}
                      onClick={() => onSidebarItemSelect?.(item.id)}
                      title={item.label}
                    >
                      <div className={styles.sidebarItemLead}>
                        {item.icon}
                        {!sidebarCollapsed && <span>{item.label}</span>}
                      </div>
                      {!sidebarCollapsed && item.badge !== undefined && (
                        <span className={styles.sidebarItemBadge}>{item.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className={styles.sidebarFooter}>
            <button
              type="button"
              className={styles.collapseBtn}
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
              {!sidebarCollapsed && <span>Collapse</span>}
            </button>
          </div>
        </aside>

        {/* ── Main Work Canvas ── */}
        <main className={styles.mainCanvas}>{children}</main>
      </div>

      {/* ── 5. Sticky Bottom Session Expired Banner ── */}
      {showSessionBanner && (
        <aside className={styles.bottomBanner} role="alert" aria-live="polite">
          <div className={styles.bannerLead}>
            <div className={styles.bannerIcon}>
              <Clock size={20} />
            </div>
            <div>
              <p className={styles.bannerTitle}>Your session has expired.</p>
              <p className={styles.bannerSubtitle}>
                Reauthenticate to resume. Unsynced changes remain pending.
              </p>
            </div>
          </div>

          <div className={styles.bannerActions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onBannerReturnHome}
            >
              Return home
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={onBannerReauthenticate}
            >
              Reauthenticate
            </button>
            {onBannerDismiss && (
              <button
                type="button"
                className={styles.iconBtn}
                onClick={onBannerDismiss}
                aria-label="Dismiss banner"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

function brandGroupClass(): string {
  return styles.brandGroup || "";
}
