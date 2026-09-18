"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, Settings, ShieldCheck, Trash2 } from "lucide-react";
import { APPS_CATALOG } from "../data/apps-catalog";

export default function InstalledAppsPage() {
  const installedApps = APPS_CATALOG.filter((a) => a.installed);

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", padding: "3rem 2rem", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", textDecoration: "none", marginBottom: "2rem", fontSize: "0.95rem" }}>
          <ArrowLeft size={16} /> Back to Marketplace Storefront
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ padding: "0.5rem", background: "rgba(16, 185, 129, 0.15)", borderRadius: "8px", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
            <CheckCircle2 size={24} color="#10b981" />
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0 }}>Active Installed Apps ({installedApps.length})</h1>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: "700px", lineHeight: 1.5, marginBottom: "3rem" }}>
          Manage your tenant workspace's active packages, permission grants, and quick launch shortcuts.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
          {installedApps.map((app) => (
            <div
              key={app.id}
              style={{
                background: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: `${app.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShieldCheck size={22} color={app.color} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>{app.name}</h3>
                    <span style={{ fontSize: "11px", color: "#10b981", background: "rgba(16, 185, 129, 0.15)", padding: "1px 6px", borderRadius: "6px" }}>Active</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "0.2rem 0 0 0" }}>{app.tagline}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <a href={app.route} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <button style={{ padding: "0.45rem 0.9rem", background: "rgba(255, 255, 255, 0.08)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 600 }}>
                    Launch <ExternalLink size={14} />
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
