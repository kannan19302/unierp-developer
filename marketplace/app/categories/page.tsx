"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Layers, CreditCard, Activity, Cpu, ShoppingBag, Terminal, Sparkles } from "lucide-react";
import { APPS_CATALOG } from "../data/apps-catalog";

export default function CategoriesPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("All");

  const coreApps = APPS_CATALOG.filter((a) => a.category === "Core ERP");
  const industryApps = APPS_CATALOG.filter((a) => a.category === "Industry Vertical");
  const connectors = APPS_CATALOG.filter((a) => a.category === "Cloud Connector");
  const aiTools = APPS_CATALOG.filter((a) => a.category === "AI & Tools");

  const GROUPS = [
    { title: "Core ERP Engines", count: coreApps.length, apps: coreApps, icon: CreditCard, color: "#3b82f6", desc: "Foundational business operations: Finance, CRM, SCM, Inventory, HR, and Manufacturing." },
    { title: "Industry Vertical Solutions", count: industryApps.length, apps: industryApps, icon: Activity, color: "#059669", desc: "Specialized platforms: Healthcare OS, Campus OS, Real Estate, Retail, PSA, and Logistics." },
    { title: "Cloud Connectors & Gateways", count: connectors.length, apps: connectors, icon: ShoppingBag, color: "#f59e0b", desc: "Payment processors, storefront sync, and omnichannel messaging gateways." },
    { title: "AI & Machine Intelligence", count: aiTools.length, apps: aiTools, icon: Cpu, color: "#a855f7", desc: "Smart document OCR, predictive demand models, and autonomous workflow bots." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", padding: "3rem 2rem", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        
        {/* Navigation */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", textDecoration: "none", marginBottom: "2rem", fontSize: "0.95rem" }}>
          <ArrowLeft size={16} /> Back to Marketplace Storefront
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ padding: "0.5rem", background: "rgba(14, 165, 233, 0.15)", borderRadius: "8px", border: "1px solid rgba(14, 165, 233, 0.3)" }}>
            <Layers size={24} color="#38bdf8" />
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0 }}>Marketplace Categories</h1>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: "700px", lineHeight: 1.5, marginBottom: "3rem" }}>
          Explore all modular capabilities organized by architectural layers: Core ERP foundations, Industry Verticals, Cloud Connectors, and AI engines.
        </p>

        {/* Group Sections */}
        {GROUPS.map((group) => {
          const Icon = group.icon;
          return (
            <section key={group.title} style={{ marginBottom: "3.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Icon size={22} color={group.color} />
                  <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                    {group.title}
                  </h2>
                  <span style={{ fontSize: "12px", fontWeight: 700, padding: "2px 10px", borderRadius: "12px", background: `${group.color}20`, color: group.color, border: `1px solid ${group.color}40` }}>
                    {group.count} Apps
                  </span>
                </div>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{group.desc}</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem" }}>
                {group.apps.map((app) => (
                  <div
                    key={app.id}
                    style={{
                      background: "rgba(15, 23, 42, 0.6)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "12px",
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                        <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff" }}>{app.name}</span>
                        <span style={{ fontSize: "11px", color: "#94a3b8" }}>v{app.version}</span>
                      </div>
                      <p style={{ fontSize: "0.86rem", color: "#94a3b8", margin: "0 0 1rem 0", lineHeight: 1.45 }}>
                        {app.tagline}
                      </p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.04)" }}>
                      <span style={{ fontSize: "11px", color: app.color, fontWeight: 600 }}>
                        {app.industry || app.category}
                      </span>
                      <Link href="/" style={{ fontSize: "0.82rem", color: "#38bdf8", textDecoration: "none", fontWeight: 600 }}>
                        View in Catalog →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

      </div>
    </div>
  );
}
