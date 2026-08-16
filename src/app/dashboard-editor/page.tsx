"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardEditorWorkspace } from "@/components/builder/DashboardEditorWorkspace";

export default function DashboardEditorStudioPage() {
  const router = useRouter();

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <DashboardEditorWorkspace
        dashboardId="dash_executive_telemetry_001"
        defaultName="Executive Operations & Fleet Health"
        onBack={() => router.push("/")}
        onSaved={(dash) => {
          console.log("Saved dashboard:", dash);
        }}
      />
    </div>
  );
}
