"use client";

import React, { type FC } from "react";
import {
  ShieldCheck,
  Zap,
  Layers,
  Database,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { SiteShell, type SiteNavItem } from "@kannan19302/ui/shell";
import type { FooterSection, FooterLink } from "@kannan19302/ui/layout";
import styles from "./CorporateLandingPage.module.css";

export interface CorporateLandingPageProps {
  /** Organization / Tenant legal brand name */
  companyName?: string;
  /** Primary tagline */
  tagline?: string;
  /** Sub-headline or mission */
  mission?: string;
  /** App login redirect URL */
  loginUrl?: string;
  /** Contact / Demo booking URL */
  contactUrl?: string;
}

const navItems: SiteNavItem[] = [
  { label: "Solutions", href: "#solutions" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Sovereignty & Security", href: "#security" },
  { label: "Contact", href: "#contact" },
];

const footerSections: FooterSection[] = [
  {
    title: "Platform Modules",
    links: [
      { label: "Financial Ledgers", href: "/finance" },
      { label: "Supply Chain & Logistics", href: "/supply-chain" },
      { label: "Manufacturing Execution", href: "/manufacturing" },
      { label: "HR & Statutory Payroll", href: "/hr" },
    ],
  },
  {
    title: "Governance",
    links: [
      { label: "Zero-Trust Architecture", href: "/security" },
      { label: "PostgreSQL RLS", href: "/rls" },
      { label: "Audit & Compliance", href: "/compliance" },
      { label: "SLA Commitments", href: "/sla" },
    ],
  },
  {
    title: "Tenant Operations",
    links: [
      { label: "Workspace Access", href: "/login" },
      { label: "API Documentation", href: "/docs" },
      { label: "System Status", href: "/status" },
      { label: "Support Helpdesk", href: "/support" },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Trust Center", href: "/trust" },
];

/**
 * `<CorporateLandingPage>` — Canonical corporate website for UniERP tenant organizations.
 *
 * Pre-configured with Strata DL 3.0 tokens, SiteShell, accessible sections,
 * and parameterized enterprise value propositions.
 */
export const CorporateLandingPage: FC<CorporateLandingPageProps> = ({
  companyName = "Acme Global Industries",
  tagline = "Enterprise SaaS Business Platform",
  mission = "Engineered for autonomous operational acceleration, strict decimal-precision ledgers, and zero-trust PostgreSQL tenant sovereignty.",
  loginUrl = "/login",
  contactUrl = "#contact",
}) => {
  return (
    <SiteShell
      brandName={companyName}
      navItems={navItems}
      ctaButton={{ label: "Access ERP Console", href: loginUrl }}
      announcement="UniERP Sovereign Cloud 3.0 — Continuous Multi-Tier Ledger Verification Active"
      footerSections={footerSections}
      legalLinks={legalLinks}
      copyright={`© ${new Date().getFullYear()} ${companyName}. Powered by UniERP Enterprise SaaS Business Platform.`}
    >
      {/* ── Hero Section ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <ShieldCheck size={14} />
            <span>ISO 27001 & SOC 2 Type II Sovereign Instance</span>
          </div>

          <h1 className={styles.headline}>
            {companyName}
            <br />
            {tagline}
          </h1>

          <p className={styles.subheadline}>{mission}</p>

          <div className={styles.ctaGroup}>
            <a href={loginUrl} className={styles.primaryCta}>
              <span>Launch Tenant Workspace</span>
              <ArrowRight size={16} />
            </a>
            <a href={contactUrl} className={styles.secondaryCta}>
              <span>Schedule Architecture Review</span>
            </a>
          </div>
        </div>

        {/* ── Stats Strip ── */}
        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>99.99%</span>
            <span className={styles.statLabel}>Uptime SLA Guarantee</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>&lt; 100ms</span>
            <span className={styles.statLabel}>P99 Transaction Latency</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statLabel}>Zero-Trust RLS Isolation</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>19,4</span>
            <span className={styles.statLabel}>Decimal Ledger Precision</span>
          </div>
        </div>
      </section>

      {/* ── Capabilities / Features Section ── */}
      <section id="capabilities" className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Sovereign Capabilities</div>
          <h2 className={styles.sectionTitle}>
            Unified Infrastructure for Modern Enterprise
          </h2>
          <p className={styles.sectionDescription}>
            Every core operational discipline orchestrated through high-density Strata
            workbenches and audited ledgers.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Database size={20} />
            </div>
            <h3 className={styles.featureTitle}>Multi-Tier Financial Ledgers</h3>
            <p className={styles.featureText}>
              Sub-cent accurate double-entry accounting with multi-currency reconciliation,
              automated depreciation schedules, and continuous audit trails.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Layers size={20} />
            </div>
            <h3 className={styles.featureTitle}>Autonomous Supply Chain</h3>
            <p className={styles.featureText}>
              Real-time multi-warehouse dispatching, barcode-verified receiving, and
              predictive vendor replenishment routines.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Zap size={20} />
            </div>
            <h3 className={styles.featureTitle}>High-Density Workbenches</h3>
            <p className={styles.featureText}>
              Compact keyboard-first transaction floorplans designed for maximum throughput
              without modal friction or bloated layouts.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Lock size={20} />
            </div>
            <h3 className={styles.featureTitle}>Cryptographic Tenancy Isolation</h3>
            <p className={styles.featureText}>
              Hardware-enforced PostgreSQL Row-Level Security ensures your data is
              mathematically segregated from any other organization.
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust Banner ── */}
      <section id="security" className={styles.trustBanner}>
        <h2 className={styles.sectionTitle}>Certified Enterprise Governance</h2>
        <p className={styles.sectionDescription}>
          Meeting the strictest institutional requirements of Fortune 500 operations.
        </p>
        <div className={styles.trustBadges}>
          <div className={styles.trustBadgeItem}>
            <CheckCircle2 size={16} />
            <span>SOC 2 Type II Certified</span>
          </div>
          <div className={styles.trustBadgeItem}>
            <CheckCircle2 size={16} />
            <span>ISO/IEC 27001:2022</span>
          </div>
          <div className={styles.trustBadgeItem}>
            <CheckCircle2 size={16} />
            <span>GDPR & CCPA Compliant</span>
          </div>
          <div className={styles.trustBadgeItem}>
            <CheckCircle2 size={16} />
            <span>PostgreSQL NOBYPASSRLS</span>
          </div>
        </div>
      </section>
    </SiteShell>
  );
};
