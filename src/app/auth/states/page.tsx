"use client";

import React from "react";
import { SCREENS_REGISTRY } from "@/platform/screens/registry";

export default function CanonicalScreenPage() {
  const ScreenComponent = SCREENS_REGISTRY["DP-001"];
  if (!ScreenComponent) {
    return (
      <div style={{ padding: 40, color: "var(--color-text-muted)" }}>
        Screen DP-001 not registered.
      </div>
    );
  }
  return <ScreenComponent />;
}
