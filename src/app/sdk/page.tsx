"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Code2,
  Package,
  Layers,
  ArrowLeft,
  Copy,
  Check,
  Cpu,
  BookOpen,
  Boxes,
  ShieldCheck,
} from "lucide-react";

export default function ExtensionSdkPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const SNIPPETS = [
    {
      title: "Extension Manifest (manifest.json)",
      language: "json",
      code: `{
  "id": "com.unierp.extension.sales-insights",
  "name": "Advanced Sales Intelligence",
  "version": "1.0.0",
  "entrypoint": "dist/index.js",
  "permissions": ["orders:read", "analytics:write", "webhooks:listen"],
  "hooks": {
    "order.created": "onOrderCreated",
    "invoice.posted": "onInvoicePosted"
  }
}`,
    },
    {
      title: "Extension Implementation (index.ts)",
      language: "typescript",
      code: `import { defineExtension, type UniERPContext } from "@kannan19302/sdk";

export default defineExtension({
  id: "com.unierp.extension.sales-insights",
  async onOrderCreated(event, ctx: UniERPContext) {
    const { orderId, totalAmount, tenantId } = event.payload;
    ctx.logger.info(\`Processing order \${orderId} for tenant \${tenantId}\`);
    
    // Call low-level tenant data API
    await ctx.api.post("/analytics/events", {
      type: "ORDER_VOLUME_SPIKE",
      value: totalAmount,
    });
  },
});`,
    },
    {
      title: "Installation via pnpm",
      language: "bash",
      code: `pnpm add @kannan19302/sdk @kannan19302/shared`,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--background, #090d16)", color: "var(--foreground, #ffffff)", padding: "3rem 2rem", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Navigation Back */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", textDecoration: "none", marginBottom: "2rem", fontSize: "0.95rem" }}>
          <ArrowLeft size={16} /> Back to Developer Studio
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <div style={{ padding: "0.5rem", background: "rgba(236, 72, 153, 0.15)", borderRadius: "8px", border: "1px solid rgba(236, 72, 153, 0.3)" }}>
            <Terminal size={24} color="#ec4899" />
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>UniERP Extension SDK</h1>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.5, marginBottom: "2.5rem" }}>
          Build sandboxed plugin extensions, event listeners, and bespoke ERP customizations using the official TypeScript SDK.
        </p>

        {/* Features Checklist */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "1.25rem", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, color: "#38bdf8", marginBottom: "0.25rem" }}>
              <ShieldCheck size={18} /> Isolated Sandbox Runtime
            </div>
            <div style={{ fontSize: "0.88rem", color: "#94a3b8" }}>
              Extensions execute in secure QuickJS sandboxes with explicit capability grants.
            </div>
          </div>
          <div style={{ background: "rgba(15, 23, 42, 0.6)", padding: "1.25rem", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600, color: "#a855f7", marginBottom: "0.25rem" }}>
              <Boxes size={18} /> Outbox Event Triggers
            </div>
            <div style={{ fontSize: "0.88rem", color: "#94a3b8" }}>
              Subscribe to financial ledger, inventory, customer, and order lifecycle events.
            </div>
          </div>
        </div>

        {/* Code Snippets */}
        {SNIPPETS.map((snippet, idx) => (
          <div key={idx} style={{ marginBottom: "2rem", background: "rgba(15, 23, 42, 0.8)", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.1)", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1.25rem", background: "rgba(0, 0, 0, 0.3)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#e2e8f0" }}>{snippet.title}</span>
              <button
                onClick={() => copyCode(snippet.code, idx)}
                style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "transparent", border: "none", color: copiedIndex === idx ? "#10b981" : "#94a3b8", cursor: "pointer", fontSize: "0.82rem" }}
              >
                {copiedIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                {copiedIndex === idx ? "Copied" : "Copy"}
              </button>
            </div>
            <pre style={{ margin: 0, padding: "1.25rem", fontSize: "0.88rem", fontFamily: "monospace", overflowX: "auto", color: "#f8fafc", lineHeight: 1.6 }}>
              <code>{snippet.code}</code>
            </pre>
          </div>
        ))}

      </div>
    </div>
  );
}
