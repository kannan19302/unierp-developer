"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PageBuilderWorkspace } from "@/components/builder/PageBuilderWorkspace";

export default function PageBuilderStudioPage() {
  const router = useRouter();

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <PageBuilderWorkspace
        appId="app_custom_portal_001"
        pageId="page_vendor_directory_001"
        pageName="Vendor Directory & Management"
        initialLayout={[
          {
            id: "widget_header_1",
            type: "header",
            title: "Vendor Management Portal",
            gridSpan: 12,
            config: { subtitle: "Manage active supplier contracts and vendor SLAs" },
          },
          {
            id: "widget_stats_1",
            type: "stats",
            title: "Supplier KPIs",
            gridSpan: 12,
            config: { activeVendors: 42, pendingApprovals: 3 },
          },
        ]}
        forms={[]}
        dataModels={[]}
        dashboards={[]}
        onBack={() => router.push("/")}
        onSaved={(layout) => {
          console.log("Saved page layout:", layout);
        }}
      />
    </div>
  );
}
