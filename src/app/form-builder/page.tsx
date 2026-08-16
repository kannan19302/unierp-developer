"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FormBuilderWorkspace } from "@/components/builder/FormBuilderWorkspace";

export default function FormBuilderStudioPage() {
  const router = useRouter();

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <FormBuilderWorkspace
        formId="form_sample_onboarding_001"
        defaultModule="crm"
        onBack={() => router.push("/")}
        onSaved={(data) => {
          console.log("Saved form:", data);
        }}
      />
    </div>
  );
}
