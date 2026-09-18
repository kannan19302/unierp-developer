"use client";

import { Grid } from "lucide-react";
import { AppsTabLayout, APPS_TABS } from "@/components/apps/AppsTabLayout";

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppsTabLayout
      tabs={APPS_TABS}
      moduleId="apps"
      moduleLabel="App Marketplace"
      moduleIcon={Grid}
      moduleDescription="Enterprise applications and integrations marketplace"
    >
      {children}
    </AppsTabLayout>
  );
}
