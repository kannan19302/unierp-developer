"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles, TrendingUp, Award, Zap, Star } from "lucide-react";
import { APPS_CATALOG } from "../data/apps-catalog";

export default function DiscoverPage() {
  const featured = APPS_CATALOG.filter((a) => a.badge === "Featured");
  const popular = APPS_CATALOG.filter((a) => a.badge === "Popular");
  const industryNew = APPS_CATALOG.filter((a) => a.category === "Industry Vertical");

  return (
    <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", padding: "3rem 2rem", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#94a3b8", textDecoration: "none", marginBottom: "2rem", fontSize: "0.95rem" }}>
          <ArrowLeft size={16} /> Back to Marketplace Storefront
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ padding: "0.5rem", background: "rgba(168, 85, 247, 0.15)", borderRadius: "8px", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
            <Compass size={24} color="#a855f7" />
          </div>
          <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: 0 }}>Discover Trending & Vertical Solutions</h1>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "1.05rem", maxWidth: "700px", lineHeight: 1.5, marginBottom: "3rem" }}>
          Curated collections of the highest-rated Core modules, high-demand industry verticals, and emerging integrations.
        </p>

        {/* Featured Spotlight */}
        <section style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <Award size={22} color="#fbbf24" />
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>Featured Spotlights</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
            {featured.map((app) => (
              <div key={app.id} style={{ background: "rgba(15, 23, 42, 0.8)", border: `1px solid ${app.color}40`, borderRadius: "14px", padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, padding: "2px 8px", borderRadius: "8px", background: `${app.color}20`, color: app.color }}>
                      {app.category}
                    </span>
                    <span style={{ color: "#fbbf24", fontSize: "12px", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                      <Star size={13} fill="#fbbf24" /> {app.rating} ({app.reviewsCount})
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.4rem 0", color: "#ffffff" }}>{app.name}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{app.tagline}</p>
                </div>
                <Link href="/" style={{ marginTop: "1.25rem", color: app.color, fontWeight: 600, fontSize: "0.88rem", textDecoration: "none" }}>
                  Explore in Catalog →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Verticals Collection */}
        <section style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <TrendingUp size={22} color="#10b981" />
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0 }}>Industry Vertical Packages</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {industryNew.map((app) => (
              <div key={app.id} style={{ background: "rgba(15, 23, 42, 0.5)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.25rem" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: app.color, textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  {app.industry} Vertical
                </div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.3rem 0", color: "#ffffff" }}>{app.name}</h4>
                <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>{app.tagline}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
