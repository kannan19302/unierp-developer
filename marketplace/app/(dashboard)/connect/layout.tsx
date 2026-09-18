"use client";

import { MessageSquare } from "lucide-react";
import {
  CommunicationTabLayout,
  COMMUNICATION_TABS,
} from "@/components/communication/CommunicationTabLayout";

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommunicationTabLayout
      tabs={COMMUNICATION_TABS}
      moduleId="connect"
      moduleLabel="Connect"
      moduleIcon={MessageSquare}
      moduleDescription="Connect portal and collaboration tools"
    >
      {children}
    </CommunicationTabLayout>
  );
}
