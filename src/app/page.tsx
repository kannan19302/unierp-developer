"use client";

import React from "react";
import Link from "next/link";
import {
  GitBranch,
  FileCode2,
  Layout,
  BarChart3,
  Terminal,
  Layers,
  Cpu,
  Sparkles,
  ArrowRight,
  Shield,
  Code2,
  Blocks,
  Zap,
} from "lucide-react";
import { Card, Button, Badge } from "@kannan19302/ui";

const BUILDERS = [
  {
    title: "Visual Workflow Designer",
    description:
      "Design multi-step human approvals, webhook orchestrations, automated business logic & branching flows visually.",
    icon: GitBranch,
    href: "/workflow",
    badge: "Automation Core",
    color: "#3b82f6",
  },
  {
    title: "Dynamic Form Builder",
    description:
      "Build complex drag-and-drop forms with conditional validation rules, field dependencies, and ERP module binds.",
    icon: FileCode2,
    href: "/form-builder",
    badge: "Schema Engine",
    color: "#10b981",
  },
  {
    title: "Custom Page Builder",
    description:
      "Compose custom tenant application pages, multi-column responsive grids, and embed rich ERP components.",
    icon: Layout,
    href: "/page-builder",
    badge: "UI Composability",
    color: "#8b5cf6",
  },
  {
    title: "Dashboard Studio",
    description:
      "Create executive telemetry dashboards, real-time metrics cards, and configurable operational chart views.",
    icon: BarChart3,
    href: "/dashboard-editor",
    badge: "BI & Telemetry",
    color: "#f59e0b",
  },
  {
    title: "Extension SDK & APIs",
    description:
      "Inspect the public extension API manifests, hook signatures, sandbox contracts, and developer documentation.",
    icon: Terminal,
    href: "/sdk",
    badge: "Plugin Runtime",
    color: "#ec4899",
  },
];

export default function DeveloperStudioHome() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--background, #090d16)", color: "var(--foreground, #ffffff)", padding: "3rem 2rem", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ padding: "0.5rem", background: "rgba(59, 130, 246, 0.15)", borderRadius: "8px", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
                <Cpu size={24} color="#3b82f6" />
              </div>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
                UniERP Developer Studio
              </h1>
              <span style={{ padding: "2px 10px", fontSize: "12px", borderRadius: "12px", background: "rgba(59, 130, 246, 0.2)", color: "#60a5fa", border: "1px solid rgba(59, 130, 246, 0.4)", fontWeight: 600 }}>
                Plane 6 Platform
              </span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "1.05rem", margin: 0, maxWidth: "680px", lineHeight: 1.5 }}>
              Enterprise low-code studio & extensible developer ecosystem. Design visual workflows, custom forms, reactive pages, BI dashboards, and extension plugins.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", background: "rgba(255, 255, 255, 0.08)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
                <Shield size={16} /> Dev Login
              </button>
            </Link>
            <Link href="/sdk" style={{ textDecoration: "none" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", background: "#3b82f6", color: "#ffffff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
                <Code2 size={16} /> SDK Reference <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>

        {/* Builder Workspaces Grid */}
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Blocks size={20} color="#3b82f6" /> Studio Builder Workspaces
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {BUILDERS.map((builder) => {
            const Icon = builder.icon;
            return (
              <Link key={builder.href} href={builder.href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "1.75rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease-in-out",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = builder.color;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px rgba(0, 0, 0, 0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "10px",
                          background: `${builder.color}15`,
                          border: `1px solid ${builder.color}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={22} color={builder.color} />
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.05)", color: "#cbd5e1", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                        {builder.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#ffffff", margin: "0 0 0.5rem 0" }}>
                      {builder.title}
                    </h3>
                    <p style={{ fontSize: "0.92rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                      {builder.description}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.5rem", color: builder.color, fontWeight: 600, fontSize: "0.9rem" }}>
                    Launch Workspace <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Developer Ecosystem Stats / Badges */}
        <div style={{ background: "rgba(15, 23, 42, 0.4)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "12px", padding: "1.5rem 2rem", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Zap size={20} color="#10b981" />
            <div>
              <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Execution Layer</div>
              <div style={{ fontWeight: 600, color: "#e2e8f0" }}>Node 22 Slim + Next.js 15</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Layers size={20} color="#60a5fa" />
            <div>
              <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>Design System</div>
              <div style={{ fontWeight: 600, color: "#e2e8f0" }}>@kannan19302/ui v1.0.15</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Sparkles size={20} color="#a855f7" />
            <div>
              <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>AI Integration</div>
              <div style={{ fontWeight: 600, color: "#e2e8f0" }}>Studio Copilot Engine</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
