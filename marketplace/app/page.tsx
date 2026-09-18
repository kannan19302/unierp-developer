"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Grid,
  Filter,
  CheckCircle2,
  Download,
  ExternalLink,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Package,
  CreditCard,
  Users,
  ShoppingCart,
  Hammer,
  Briefcase,
  Store,
  ClipboardList,
  Truck,
  Cpu,
  BarChart3,
  Wrench,
  HardDrive,
  ShoppingBag,
  Activity,
  GraduationCap,
  Building2,
  Key,
  Home,
  MessageSquare,
  Bell,
  X,
  Layers,
  Check,
} from "lucide-react";
import { APPS_CATALOG, type MarketplaceApp } from "./data/apps-catalog";
import { BrandMark, ThemeQuickToggle } from "@kannan19302/ui";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>> = {
  CreditCard,
  Users,
  ShoppingCart,
  Package,
  Hammer,
  Briefcase,
  Store,
  ClipboardList,
  Truck,
  Cpu,
  BarChart3,
  Wrench,
  HardDrive,
  ShoppingBag,
  Activity,
  GraduationCap,
  Building2,
  Key,
  Home,
  MessageSquare,
  Bell,
};

export default function MarketplaceHomePage() {
  const [apps, setApps] = useState<MarketplaceApp[]>(APPS_CATALOG);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<MarketplaceApp | null>(null);
  const [installedIds, setInstalledIds] = useState<Set<string>>(
    new Set(APPS_CATALOG.filter((a) => a.installed).map((a) => a.id))
  );
  const [installingId, setInstallingId] = useState<string | null>(null);

  const categories = ["All", "Core ERP", "Industry Vertical", "Cloud Connector", "AI & Tools"];

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesCategory =
        selectedCategory === "All" || app.category === selectedCategory;
      const matchesSearch =
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (app.industry && app.industry.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [apps, selectedCategory, searchQuery]);

  const toggleInstall = (appId: string) => {
    setInstallingId(appId);
    setTimeout(() => {
      setInstalledIds((prev) => {
        const next = new Set(prev);
        if (next.has(appId)) {
          next.delete(appId);
        } else {
          next.add(appId);
        }
        return next;
      });
      setInstallingId(null);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", color: "var(--color-text)", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      
      {/* Global Top Navbar */}
      <header
        style={{
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <BrandMark compact size="md" />
            <div>
              <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
                UniERP <span style={{ color: "#38bdf8" }}>Marketplace</span>
              </span>
            </div>
          </Link>

          <nav style={{ display: "flex", gap: "1.25rem", fontSize: "0.92rem", fontWeight: 500 }}>
            <Link href="/" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 600 }}>Catalog</Link>
            <Link href="/categories" style={{ color: "#94a3b8", textDecoration: "none" }}>Categories</Link>
            <Link href="/discover" style={{ color: "#94a3b8", textDecoration: "none" }}>Discover</Link>
            <Link href="/connectors" style={{ color: "#94a3b8", textDecoration: "none" }}>Connectors</Link>
            <Link href="/installed" style={{ color: "#94a3b8", textDecoration: "none" }}>Installed ({installedIds.size})</Link>
            <Link href="/updates" style={{ color: "#94a3b8", textDecoration: "none" }}>Updates</Link>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <ThemeQuickToggle />
          <a
            href="http://localhost:3005/oidc/account"
            aria-label="Open Account Center"
            title="Account Center"
            style={{ width: 34, height: 34, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.1)", color: "#fff", textDecoration: "none", fontWeight: 700 }}
          >
            U
          </a>
          <Link href="/login" style={{ textDecoration: "none" }}>
            <button style={{ padding: "0.5rem 1rem", background: "rgba(255, 255, 255, 0.08)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600 }}>
              Publisher Login
            </button>
          </Link>
          <a href="http://localhost:4003/home" style={{ textDecoration: "none" }}>
            <button style={{ padding: "0.5rem 1rem", background: "#0284c7", color: "#ffffff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600 }}>
              UniERP Home
            </button>
          </a>
        </div>
      </header>

      {/* Hero Header */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "3.5rem 2rem 2rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "4px 14px", borderRadius: "20px", background: "rgba(14, 165, 233, 0.15)", border: "1px solid rgba(14, 165, 233, 0.3)", color: "#38bdf8", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>
          <Sparkles size={14} /> Enterprise Extension & Vertical App Ecosystem
        </div>
        <h1 style={{ fontSize: "2.75rem", fontWeight: 800, margin: "0 0 1rem 0", letterSpacing: "-0.03em" }}>
          Explore Core Apps & Industry Verticals
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "680px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
          Power your tenant workspace with pre-built Core ERP engines, domain-specific Industry Verticals (Healthcare, Education, Real Estate, Retail, Manufacturing), and cloud connectors.
        </p>

        {/* Search & Category Pills */}
        <div style={{ maxWidth: "720px", margin: "0 auto 2rem", position: "relative" }}>
          <input
            type="text"
            placeholder="Search Core ERP apps, Healthcare, Education, Real Estate, Connectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", padding: "1rem 1rem 1rem 3rem", background: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", color: "#ffffff", fontSize: "1rem", outline: "none", boxSizing: "border-box", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
          />
          <Search size={20} color="#94a3b8" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Category Selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.55rem 1.25rem",
                borderRadius: "24px",
                fontSize: "0.9rem",
                fontWeight: 600,
                border: selectedCategory === cat ? "1px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.1)",
                background: selectedCategory === cat ? "rgba(14, 165, 233, 0.2)" : "rgba(15, 23, 42, 0.6)",
                color: selectedCategory === cat ? "#38bdf8" : "#94a3b8",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {cat} {cat === "All" ? `(${apps.length})` : `(${apps.filter((a) => a.category === cat).length})`}
            </button>
          ))}
        </div>
      </section>

      {/* Main Apps Grid */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Layers size={20} color="#38bdf8" /> {selectedCategory === "All" ? "All Marketplace Applications" : selectedCategory} ({filteredApps.length})
          </h2>
          <span style={{ fontSize: "0.88rem", color: "#64748b" }}>
            Showing {filteredApps.length} of {apps.length} verified packages
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {filteredApps.map((app) => {
            const Icon = ICON_MAP[app.icon] || Package;
            const isInstalled = installedIds.has(app.id);
            const isBusy = installingId === app.id;

            return (
              <div
                key={app.id}
                style={{
                  background: "rgba(15, 23, 42, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease-in-out",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = app.color;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>
                  {/* Card Top Row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: `${app.color}20`,
                        border: `1px solid ${app.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={24} color={app.color} />
                    </div>

                    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                      {app.badge && (
                        <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "10px", background: `${app.color}25`, color: app.color, border: `1px solid ${app.color}50` }}>
                          {app.badge}
                        </span>
                      )}
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.06)", color: "#94a3b8" }}>
                        v{app.version}
                      </span>
                    </div>
                  </div>

                  {/* App Title & Tagline */}
                  <h3
                    onClick={() => setSelectedApp(app)}
                    style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", margin: "0 0 0.4rem 0", cursor: "pointer" }}
                  >
                    {app.name}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: "0 0 1rem 0", lineHeight: 1.5 }}>
                    {app.tagline}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                    {app.tags.slice(0, 3).map((tag) => (
                      <span key={tag} style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.04)", color: "#cbd5e1", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
                        {tag}
                      </span>
                    ))}
                    {app.industry && (
                      <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", background: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.3)", fontWeight: 600 }}>
                        {app.industry}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <button
                    onClick={() => setSelectedApp(app)}
                    style={{ background: "transparent", border: "none", color: "#38bdf8", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem", padding: 0 }}
                  >
                    View Details <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => toggleInstall(app.id)}
                    disabled={isBusy}
                    style={{
                      padding: "0.45rem 0.9rem",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      border: "none",
                      cursor: isBusy ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      background: isInstalled ? "rgba(16, 185, 129, 0.15)" : "#0ea5e9",
                      color: isInstalled ? "#10b981" : "#ffffff",
                      borderWidth: isInstalled ? "1px" : "0",
                      borderColor: isInstalled ? "rgba(16, 185, 129, 0.4)" : "transparent",
                      borderStyle: isInstalled ? "solid" : "none",
                      transition: "all 0.15s",
                    }}
                  >
                    {isBusy ? (
                      "Updating..."
                    ) : isInstalled ? (
                      <>
                        <Check size={14} /> Installed
                      </>
                    ) : (
                      <>
                        <Download size={14} /> Install App
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* App Details Modal */}
      {selectedApp && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 100,
          }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "680px",
              background: "#0f172a",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "16px",
              padding: "2rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: `${selectedApp.color}20`,
                    border: `1px solid ${selectedApp.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {React.createElement(ICON_MAP[selectedApp.icon] || Package, { size: 28, color: selectedApp.color })}
                </div>
                <div>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                    {selectedApp.name}
                  </h2>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8", display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
                    <span>By {selectedApp.author}</span>
                    <span>•</span>
                    <span>v{selectedApp.version}</span>
                    <span>•</span>
                    <span style={{ color: "#fbbf24", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                      <Star size={13} fill="#fbbf24" /> {selectedApp.rating} ({selectedApp.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: "0.98rem", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              {selectedApp.description}
            </p>

            <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.75rem" }}>
              Key Enterprise Features
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.6rem", marginBottom: "1.75rem" }}>
              {selectedApp.features.map((feature, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#94a3b8" }}>
                  <CheckCircle2 size={16} color="#10b981" /> {feature}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.25rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                Category: <strong style={{ color: "#cbd5e1" }}>{selectedApp.category}</strong>
              </span>

              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={() => toggleInstall(selectedApp.id)}
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderRadius: "8px",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    background: installedIds.has(selectedApp.id) ? "rgba(239, 68, 68, 0.15)" : "#0ea5e9",
                    color: installedIds.has(selectedApp.id) ? "#f87171" : "#ffffff",
                    borderWidth: installedIds.has(selectedApp.id) ? "1px" : "0",
                    borderColor: installedIds.has(selectedApp.id) ? "rgba(239, 68, 68, 0.3)" : "transparent",
                    borderStyle: installedIds.has(selectedApp.id) ? "solid" : "none",
                  }}
                >
                  {installedIds.has(selectedApp.id) ? "Uninstall App" : "Install in Tenant"}
                </button>
                <a
                  href={selectedApp.route}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", fontSize: "0.92rem", fontWeight: 600, background: "rgba(255, 255, 255, 0.08)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.15)", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    Launch Module <ExternalLink size={15} />
                  </button>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
