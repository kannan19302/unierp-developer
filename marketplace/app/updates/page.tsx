"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Check, ArrowUpCircle, Sparkles } from "lucide-react";

export default function UpdatesPage() {
  const [updating, setUpdating] = useState<boolean>(false);
  const [updated, setUpdated] = useState<boolean>(false);

  const handleUpdateAll = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setUpdated(true);
    }, 1200);
  };

  const UPDATES = [
    { name: "AI Core & Smart Workflows", current: "v3.3.0", target: "v3.4.0", changes: "Added multi-lingual OCR extraction, faster streaming responses, and automated PO anomaly detection." },
    { name: "Financial Management & GL", current: "v3.1.2", target: "v3.2.0", changes: "Added multi-region VAT returns, SEPA instant settlement reconciliation, and ledger lock freeze." },
    { name: "Stripe Payment Gateway", current: "v4.0.0", target: "v4.1.0", changes: "Support for Apple Pay tokenization and automated fee reconciliation journal postings." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", padding: "3rem 2rem", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", textDecoration: "none", marginBottom: "2rem", fontSize: "0.95rem" }}>
          <ArrowLeft size={16} /> Back to Marketplace Storefront
        </Link>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div style={{ padding: "0.5rem", background: "rgba(59, 130, 246, 0.15)", borderRadius: "8px", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                <ArrowUpCircle size={24} color="#3b82f6" />
              </div>
              <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0 }}>Application Updates</h1>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "1.05rem", margin: 0 }}>
              {updated ? "All installed packages are up-to-date with latest security patches." : "3 package updates available with enhanced features & security patches."}
            </p>
          </div>

          <button
            onClick={handleUpdateAll}
            disabled={updating || updated}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.65rem 1.25rem",
              background: updated ? "rgba(16, 185, 129, 0.15)" : "#3b82f6",
              color: updated ? "#10b981" : "#ffffff",
              border: updated ? "1px solid rgba(16, 185, 129, 0.4)" : "none",
              borderRadius: "8px",
              cursor: updating || updated ? "default" : "pointer",
              fontWeight: 600,
              fontSize: "0.92rem",
            }}
          >
            {updating ? (
              <>
                <RefreshCw size={16} className="animate-spin" /> Updating Packages...
              </>
            ) : updated ? (
              <>
                <Check size={16} /> All Apps Up-To-Date
              </>
            ) : (
              <>
                <RefreshCw size={16} /> Update All (3)
              </>
            )}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
          {UPDATES.map((item, idx) => (
            <div key={idx} style={{ background: "rgba(15, 23, 42, 0.7)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>{item.name}</h3>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", fontSize: "0.85rem" }}>
                  <span style={{ color: "#94a3b8" }}>{item.current}</span>
                  <span>→</span>
                  <span style={{ color: "#38bdf8", fontWeight: 600 }}>{updated ? item.target : item.target}</span>
                </div>
              </div>
              <p style={{ fontSize: "0.9rem", color: "#cbd5e1", margin: 0, lineHeight: 1.5 }}>
                {item.changes}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
