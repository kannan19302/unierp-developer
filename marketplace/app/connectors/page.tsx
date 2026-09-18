"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Network, Plug, ExternalLink, ShieldCheck, Check } from "lucide-react";
import { APPS_CATALOG } from "../data/apps-catalog";

export default function ConnectorsPage() {
  const connectors = APPS_CATALOG.filter((a) => a.category === "Cloud Connector");

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", padding: "3rem 2rem", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", textDecoration: "none", marginBottom: "2rem", fontSize: "0.95rem" }}>
          <ArrowLeft size={16} /> Back to Marketplace Storefront
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ padding: "0.5rem", background: "rgba(245, 158, 11, 0.15)", borderRadius: "8px", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
            <Network size={24} color="#f59e0b" />
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0 }}>Cloud Connectors & API Gateways</h1>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: "700px", lineHeight: 1.5, marginBottom: "3rem" }}>
          Connect UniERP to global payment rails, storefront eCommerce platforms, notification bots, and enterprise CRMs.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
          {connectors.map((connector) => (
            <div key={connector.id} style={{ background: "rgba(15, 23, 42, 0.7)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px", padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: `${connector.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plug size={22} color={connector.color} />
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.06)", color: "#94a3b8" }}>
                    v{connector.version}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.4rem 0", color: "#ffffff" }}>{connector.name}</h3>
                <p style={{ fontSize: "0.88rem", color: "#94a3b8", margin: "0 0 1rem 0", lineHeight: 1.5 }}>{connector.tagline}</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
                  {connector.features.slice(0, 2).map((f, i) => (
                    <div key={i} style={{ fontSize: "0.82rem", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Check size={14} color="#10b981" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                <span style={{ fontSize: "11px", color: "#10b981", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <ShieldCheck size={14} /> Verified Gateway
                </span>
                <Link href="/" style={{ fontSize: "0.85rem", color: "#38bdf8", textDecoration: "none", fontWeight: 600 }}>
                  Configure →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
