"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApiClient } from "@kannan19302/framework";
import { PageHeader, TextField, Button } from "@kannan19302/ui";
import { createSite } from "@/platform/data/projects";

export default function NewSitePage() {
  const client = useApiClient();
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const site = await createSite(client, { name: name.trim() });
      router.push(`/sites/${site.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create site.");
      setSubmitting(false);
    }
  }

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: 480 }}>
      <PageHeader title="New Site" description="Give your site a name to start." />
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="e.g. Acme Marketing Site"
          required
          autoFocus
        />
        {error && <p style={{ color: "var(--color-danger)", fontSize: "var(--text-sm)" }}>{error}</p>}
        <Button type="submit" variant="primary" isLoading={submitting} disabled={!name.trim()}>
          Create Site
        </Button>
      </form>
    </div>
  );
}
