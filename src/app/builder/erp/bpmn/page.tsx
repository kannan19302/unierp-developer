"use client";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader, DataTable, Tabs, Card, Badge, Button, Input, Modal, Alert, FormField } from "@kannan19302/ui";
import { useApiClient } from "@kannan19302/framework";
import {
  Workflow,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  Play,
  Activity,
  Clock,
  AlertTriangle,
  Upload,
  Download,
  FileCode,
  ExternalLink,
} from "lucide-react";

export default function BpmnPage() {
  const client = useApiClient();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("processes");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Import modal state
  const [importOpen, setImportOpen] = useState(false);
  const [importXml, setImportXml] = useState("");
  const [importName, setImportName] = useState("");
  const [importKey, setImportKey] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const [importError, setImportError] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const params = search ? `?search=${search}` : "";
      const d = await client.get<any>(`/builder/bpmn/processes${params}`);
      setData(Array.isArray(d) ? d : d.data || []);
    } catch {
      /* ignore */
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [search]);

  const handleImport = async () => {
    if (!importXml.trim()) {
      setImportError("Please paste BPMN XML content");
      return;
    }
    if (!importKey.trim()) {
      setImportError("Please provide a process key");
      return;
    }
    setImportLoading(true);
    setImportError("");
    try {
      await client.post("/builder/bpmn/processes/import", {
        xml: importXml,
        name: importName || undefined,
        key: importKey,
      });
      setImportOpen(false);
      setImportXml("");
      setImportName("");
      setImportKey("");
      loadData();
    } catch (e: any) {
      setImportError(e.response?.data?.message || "Failed to import BPMN process");
    }
    setImportLoading(false);
  };

  const handleExport = async (processId: string) => {
    try {
      const result = await client.get<{ xml: string }>(`/builder/bpmn/processes/${processId}/export`);
      const blob = new Blob([result.xml], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `process-${processId}.bpmn`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export failed:", e);
    }
  };

  const handleExecute = async (processId: string) => {
    try {
      await client.post(`/builder/bpmn/processes/${processId}/execute-bpmn`, {
        variables: {},
        startedBy: "user",
      });
      // Refresh instances tab
      setActiveTab("instances");
    } catch (e) {
      console.error("Execute failed:", e);
    }
  };

  const TABS = [
    { key: "processes", label: "Processes", icon: <Workflow size={16} /> },
    { key: "instances", label: "Instances", icon: <Play size={16} /> },
    { key: "monitoring", label: "Monitoring", icon: <Activity size={16} /> },
    { key: "sla", label: "SLA", icon: <Clock size={16} /> },
  ];

  return (
    <div className="p-6 ui-stack-5">
      <PageHeader
        title="BPMN Workflow Engine"
        description="BPMN 2.0 compliant process designer with gateways, timer events, escalations, and SLA tracking"
        actions={
          <div className="ui-flex ui-gap-2">
            <Button variant="secondary" onClick={() => setImportOpen(true)}>
              <Upload size={15} className="mr-2" />
              Import BPMN
            </Button>
            <Button variant="primary" onClick={() => router.push("/builder/erp/bpmn/new")}>
              <PlusCircle size={15} className="mr-2" />
              New Process
            </Button>
          </div>
        }
      />
      <Tabs tabs={TABS} value={activeTab} onChange={setActiveTab} />
      {activeTab === "processes" && (
        <>
          <div
            className="ui-flex ui-gap-3"
            style={{ marginBottom: "var(--space-4)" }}
          >
            <div style={{ flex: 1, maxWidth: "28rem", position: "relative" }}>
              <Search size={15} className="ui-input-icon-abs" />
              <input
                className="ui-input"
                style={{ paddingLeft: "var(--space-8)" }}
                type="text"
                placeholder="Search processes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <DataTable
            columns={[
              {
                key: "name",
                header: "Process Name",
                render: (row: any) => (
                  <div className="ui-hstack-2">
                    <Workflow size={16} className="ui-text-primary" />
                    <span className="font-medium">{row.name}</span>
                  </div>
                ),
              },
              { key: "key", header: "Key" },
              { key: "version", header: "Version" },
              {
                key: "status",
                header: "Status",
                render: (row: any) => (
                  <Badge
                    variant={
                      row.status === "ACTIVE"
                        ? "success"
                        : row.status === "DRAFT"
                          ? "warning"
                          : "default"
                    }
                  >
                    {row.status}
                  </Badge>
                ),
              },
              {
                key: "actions",
                header: "Actions",
                width: "180px",
                render: (row: any) => (
                  <div
                    className="ui-flex ui-gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant="ghost" size="sm" title="Edit" onClick={() => router.push(`/builder/erp/bpmn/${row.id}/edit`)}>
                      <Edit3 size={13} />
                    </Button>
                    <Button variant="ghost" size="sm" title="Execute" onClick={() => handleExecute(row.id)}>
                      <Play size={13} />
                    </Button>
                    <Button variant="ghost" size="sm" title="Export BPMN" onClick={() => handleExport(row.id)}>
                      <Download size={13} />
                    </Button>
                    <Button variant="ghost" size="sm" title="Designer" onClick={() => router.push(`/builder/erp/bpmn/${row.id}/design`)}>
  <FileCode size={13} />
</Button>
                    <Button variant="ghost" size="sm" className={styles.s9} title="Delete">
                      <Trash2 size={13} />
                    </Button>
                  </div>
                ),
              },
            ]}
            data={data}
            loading={loading}
            rowKey={(r: any) => r.id}
            emptyTitle="No BPMN processes yet"
            emptyMessage="Design BPMN 2.0 workflows with gateways, timers, and SLA rules. Import BPMN 2.0 XML from tools like Camunda Modeler or bpmn.io."
          />
        </>
      )}
      {activeTab === "instances" && (
        <Card>
          <div className="p-4">
            <p className="ui-text-muted">
              Active and completed process instances. Track execution state,
              variables, and activity history.
            </p>
          </div>
        </Card>
      )}
      {activeTab === "monitoring" && (
        <Card>
          <div className="p-4">
            <p className="ui-text-muted">
              Real-time process monitoring dashboard with throughput, error
              rates, and bottleneck analysis.
            </p>
          </div>
        </Card>
      )}
      {activeTab === "sla" && (
        <Card>
          <div className="p-4">
            <p className="ui-text-muted">
              SLA tracking dashboard showing breached, at-risk, and on-track
              processes with escalation rules.
            </p>
          </div>
        </Card>
      )}

      {/* Import Modal */}
      <Modal open={importOpen} onClose={() => setImportOpen(false)} title="Import BPMN 2.0 Process" size="lg">
        <div className="ui-stack-4">
          {importError && <Alert variant="danger">{importError}</Alert>}
          <FormField label="Process Key" required htmlFor="import-key" hint="Unique identifier for the process (e.g., order-approval)">
            <Input
              id="import-key"
              value={importKey}
              onChange={(e) => setImportKey(e.target.value)}
              placeholder="order-approval"
            />
          </FormField>
          <FormField label="Process Name" htmlFor="import-name" hint="Optional: defaults to process name from XML">
            <Input
              id="import-name"
              value={importName}
              onChange={(e) => setImportName(e.target.value)}
              placeholder="Order Approval Process"
            />
          </FormField>
          <div className="ui-stack-3">
            <label className="ui-label">BPMN XML <span className="text-red-500">*</span></label>
            <textarea
              className="ui-input font-mono text-sm"
              rows={15}
              value={importXml}
              onChange={(e) => setImportXml(e.target.value)}
              placeholder="Paste BPMN 2.0 XML here..."
              spellCheck={false}
            />
            <p className="ui-text-muted text-sm">
              Export BPMN 2.0 XML from tools like <a href="https://camunda.com/products/modeler/" target="_blank" rel="noopener" className="underline">Camunda Modeler</a> or <a href="https://demo.bpmn.io/" target="_blank" rel="noopener" className="underline">bpmn.io Demo</a>. The process must have <code>isExecutable="true"</code>.
            </p>
          </div>
          <div className="ui-flex ui-gap-2 justify-end">
            <Button variant="secondary" onClick={() => setImportOpen(false)} disabled={importLoading}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleImport} disabled={importLoading} isLoading={importLoading}>
              Import
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
