"use client";

import Link from "next/link";
import { useApiClient } from "@kannan19302/framework";
import {
  PageHeader,
  PageLoadingState,
  PageErrorState,
  PageEmptyState,
  DataTable,
  StatusBadge,
  Button,
} from "@kannan19302/ui";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAsyncData } from "@/platform/data/useAsyncData";
import { listApps } from "@/platform/data/projects";

export default function AllAppsPage() {
  const client = useApiClient();
  const router = useRouter();
  const { data, loading, error, refetch } = useAsyncData(() => listApps(client), []);

  return (
    <div style={{ padding: "var(--space-6)" }}>
      <PageHeader
        title="Apps"
        description="Every app this tenant is building."
        actions={
          <Link href="/apps/new">
            <Button variant="primary" size="sm">
              <Plus size={14} /> New App
            </Button>
          </Link>
        }
      />

      {loading && <PageLoadingState />}
      {error && <PageErrorState description={error.message} onRetry={refetch} />}
      {!loading && !error && (data?.length ?? 0) === 0 && (
        <PageEmptyState title="No apps yet" description="Create your first app to start building." />
      )}
      {!loading && !error && (data?.length ?? 0) > 0 && (
        <DataTable
          data={data!}
          onRowClick={(row: any) => router.push(`/apps/${row.id}`)}
          columns={[
            { key: "name", header: "Name" },
            {
              key: "status",
              header: "Status",
              render: (row: any) => <StatusBadge status={row.status} />,
            },
            { key: "description", header: "Description" },
          ]}
        />
      )}
    </div>
  );
}
