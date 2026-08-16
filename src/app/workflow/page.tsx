"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { WorkflowEditorWorkspace } from "@/components/builder/WorkflowEditorWorkspace";

export default function WorkflowStudioPage() {
  const router = useRouter();

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <WorkflowEditorWorkspace
        workflowId="wf_sample_approval_001"
        defaultName="Purchase Order Multi-Stage Approval"
        onBack={() => router.push("/")}
        onSaved={(wf) => {
          console.log("Saved workflow:", wf);
        }}
      />
    </div>
  );
}
