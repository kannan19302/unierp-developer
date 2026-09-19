"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { SCREENS_REGISTRY } from "@/platform/screens/registry";
import { ALL_SCREENS } from "@/platform/screens/manifest";
import Link from "next/link";
import { ArrowLeft, Search, Layers, Compass } from "lucide-react";

export default function DynamicScreenPage() {
  const params = useParams<{ screenId: string }>();
  const router = useRouter();
  const rawId = params?.screenId || "DP-001";

  // Normalize: allow "1" -> "DP-001", "DP-1" -> "DP-001", or "DP-001"
  let screenId = rawId.toUpperCase();
  if (/^\d+$/.test(screenId)) {
    screenId = `DP-${screenId.padStart(3, "0")}`;
  } else if (/^DP-\d+$/.test(screenId)) {
    const num = screenId.replace("DP-", "");
    screenId = `DP-${num.padStart(3, "0")}`;
  }

  const ScreenComponent = SCREENS_REGISTRY[screenId];
  const screenMeta = ALL_SCREENS.find((s) => s.screenId === screenId);

  if (!ScreenComponent) {
    return (
      <div style={{ padding: 40, fontFamily: "system-ui, sans-serif", maxWidth: 700, margin: "60px auto", background: "#fff", border: "1px solid #d7dfeb", borderRadius: 8 }}>
        <h2 style={{ color: "#b91c1c", margin: "0 0 12px" }}>Screen Not Found: {rawId}</h2>
        <p style={{ color: "#53647e", fontSize: 14 }}>
          The requested screen identifier <code>{rawId}</code> does not match any of the 108 registered screens (DP-001 through DP-108).
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <button
            onClick={() => router.push("/screens/DP-001")}
            style={{ padding: "8px 16px", background: "#174eca", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}
          >
            ← Back to DP-001 (Start)
          </button>
          <button
            onClick={() => router.push("/screens/DP-003")}
            style={{ padding: "8px 16px", background: "#f1f5f9", color: "#15233d", border: "1px solid #cbd5e1", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}
          >
            Go to Projects (DP-003)
          </button>
        </div>
      </div>
    );
  }

  return <ScreenComponent />;
}
