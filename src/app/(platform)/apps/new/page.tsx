"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApiClient } from "@kannan19302/framework";
import { PageHeader, TextField, Textarea, FormField, Button } from "@kannan19302/ui";
import { createApp } from "@/platform/data/projects";

export default function NewAppPage() {
  const client = useApiClient();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const app = await createApp(client, {
        name: name.trim(),
        description: description.trim() || undefined,
      });
      router.push(`/apps/${app.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create app.");
      setSubmitting(false);
    }
  }

  return (
    <div style={{ padding: "var(--space-6)", maxWidth: 480 }}>
      <PageHeader title="New App" description="Give your app a name to start." />
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="e.g. Field Service"
          required
          autoFocus
        />
        <FormField label="Description">
          <Textarea
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            placeholder="What is this app for? (optional)"
          />
        </FormField>
        {error && <p style={{ color: "var(--color-danger)", fontSize: "var(--text-sm)" }}>{error}</p>}
        <Button type="submit" variant="primary" isLoading={submitting} disabled={!name.trim()}>
          Create App
        </Button>
      </form>
    </div>
  );
}
