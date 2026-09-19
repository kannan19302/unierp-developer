"use client";

import React from "react";
import { SCREENS_REGISTRY } from "@/platform/screens/registry";

export default function CanonicalScreenPage() {
  const ScreenComponent = SCREENS_REGISTRY["DP-046"];
  if (!ScreenComponent) {
    return (
      <div style={{ padding: 40, color: "var(--color-text-muted)" }}>
        Screen DP-046 not registered.
      </div>
    );
  }
  return <ScreenComponent />;
}
