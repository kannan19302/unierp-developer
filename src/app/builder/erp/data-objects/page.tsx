"use client";
import styles from "./page.module.css";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  PageHeader,
  ListPageTemplate,
  EmptyState,
  Modal,
  Button,
  type ListColumn,
} from "@kannan19302/ui";
import { useApiClient, ApiRequestError } from "@kannan19302/framework";
import { RouteGuard, Guarded } from "@kannan19302/framework";
import { Plus, Trash2, Lock, Hash } from "lucide-react";

const FIELD_TYPES = [
  "string",
  "text",
  "int",
  "decimal",
  "boolean",
  "datetime",
  "json",
] as const;

const IDENTIFIER = /^[a-z][a-z0-9_]{0,48}$/;

interface CustomObjectField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  indexed: boolean;
}

interface CustomObject {
  id: string;
  apiName: string;
  label: string;
  description?: string | null;
  status: string;
  tableName: string;
  fields: CustomObjectField[];
  createdAt: string;
}

interface DraftField {
  name: string;
  label: string;
  type: (typeof FIELD_TYPES)[number];
  required: boolean;
  indexed: boolean;
}

function emptyDraftField(): DraftField {
  return { name: "", label: "", type: "string", required: false, indexed: false };
}

export default function DataObjectsPage() {
  const client = useApiClient();
  const router = useRouter();

  const [objects, setObjects] = useState<CustomObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [apiName, setApiName] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<DraftField[]>([emptyDraftField()]);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchObjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await client.get<CustomObject[] | { data?: CustomObject[] }>(
        "/builder/data-objects",
      );
      setObjects(Array.isArray(data) ? data : data.data || []);
    } catch (e) {
      if (e instanceof ApiRequestError && e.statusCode === 403) {
        setError("forbidden");
      } else {
        setError("Could not load custom objects. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    fetchObjects();
  }, [fetchObjects]);

  const resetForm = () => {
    setApiName("");
    setLabel("");
    setDescription("");
    setFields([emptyDraftField()]);
    setFormError(null);
  };

  const updateField = (index: number, patch: Partial<DraftField>) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    );
  };

  const validateDraft = (): string | null => {
    if (!IDENTIFIER.test(apiName)) {
      return "API name must be lower_snake_case (e.g. maintenance_ticket).";
    }
    if (!label.trim()) return "Label is required.";
    const activeFields = fields.filter((f) => f.name.trim());
    if (activeFields.length === 0) return "At least one field is required.";
    const seen = new Set<string>();
    for (const f of activeFields) {
      if (!IDENTIFIER.test(f.name)) {
        return `Field name "${f.name}" must be lower_snake_case.`;
      }
      if (["id", "tenant_id", "created_at", "updated_at"].includes(f.name)) {
        return `"${f.name}" is supplied by the platform and can't be reused.`;
      }
      if (seen.has(f.name)) return `Field "${f.name}" is declared twice.`;
      seen.add(f.name);
      if (!f.label.trim()) return `Field "${f.name}" needs a label.`;
    }
    return null;
  };

  const handleCreate = async () => {
    const validationError = validateDraft();
    if (validationError) {
      setFormError(validationError);
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      await client.post("/builder/data-objects", {
        apiName,
        label,
        description: description || undefined,
        fields: fields
          .filter((f) => f.name.trim())
          .map((f) => ({
            name: f.name,
            label: f.label,
            type: f.type,
            required: f.required,
            indexed: f.indexed,
          })),
      });
      setShowCreate(false);
      resetForm();
      fetchObjects();
    } catch (e) {
      setFormError(
        e instanceof ApiRequestError ? e.message : "Could not create the object.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = search
    ? objects.filter(
        (o) =>
          o.label.toLowerCase().includes(search.toLowerCase()) ||
          o.apiName.toLowerCase().includes(search.toLowerCase()),
      )
    : objects;

  const columns: ListColumn[] = [
    { key: "label", header: "Object" },
    {
      key: "apiName",
      header: "API Name",
      render: (v) => <span className={styles.typeBadge}>{String(v)}</span>,
    },
    {
      key: "fields",
      header: "Fields",
      render: (v) => (Array.isArray(v) ? v.length : 0),
    },
    {
      key: "status",
      header: "Status",
      render: (v) => (
        <span
          className="ui-text-xs"
          style={{
            color:
              v === "ACTIVE" ? "var(--color-success)" : "var(--color-text-secondary)",
          }}
        >
          {String(v)}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (v) => (v ? new Date(String(v)).toLocaleDateString() : "—"),
    },
  ];

  return (
    <RouteGuard permission="builder.data-object.read">
      <div className="p-6 ui-stack-5">
        <PageHeader
          title="Data Objects"
          description="Define custom objects — every one gets a real, isolated table with tenant scoping, indexes and row-level security generated automatically."
          actions={
            <div className="ui-flex ui-gap-2">
              <button
                className="ui-btn ui-btn-secondary"
                onClick={() => router.push("/builder/erp")}
              >
                ← App Studio
              </button>
              <Guarded permission="builder.data-object.create">
                <button
                  className="ui-btn ui-btn-primary"
                  onClick={() => setShowCreate(true)}
                >
                  <Plus size={15} /> <span>New Object</span>
                </button>
              </Guarded>
            </div>
          }
        />

        {error === "forbidden" ? (
          <EmptyState
            title="Access denied"
            description="You don't have permission to view custom objects."
          />
        ) : error ? (
          <div className={styles.errorBanner} role="alert">
            {error}{" "}
            <button className="ui-btn ui-btn-secondary" onClick={fetchObjects}>
              Retry
            </button>
          </div>
        ) : (
          <ListPageTemplate
            title=""
            columns={columns}
            data={filtered as unknown as Record<string, unknown>[]}
            loading={loading}
            searchable
            searchPlaceholder="Search custom objects…"
            onRowClick={(row) =>
              router.push(`/builder/erp/data-objects/${(row as unknown as CustomObject).id}`)
            }
            emptyTitle={search ? "No matching objects" : "No custom objects yet"}
            emptyDescription={
              search
                ? "Try a different search term."
                : 'Click "New Object" to define your first custom object — its table, indexes and tenant isolation are generated the moment you create it.'
            }
          />
        )}

        <Modal
          open={showCreate}
          onClose={() => {
            setShowCreate(false);
            resetForm();
          }}
          title="New Custom Object"
          description="Fields become real, typed columns. Every generated table gets tenant scoping and row-level security automatically — this cannot be turned off."
          size="lg"
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowCreate(false);
                  resetForm();
                }}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={submitting}>
                {submitting ? "Creating…" : "Create Object"}
              </Button>
            </>
          }
        >
          <div className="ui-stack-4">
            {formError && (
              <div className={styles.errorBanner} role="alert">
                {formError}
              </div>
            )}
            <div className="ui-form-group">
              <label className="ui-label" htmlFor="co-api-name">
                API Name
              </label>
              <input
                id="co-api-name"
                className="ui-input"
                placeholder="maintenance_ticket"
                value={apiName}
                onChange={(e) => setApiName(e.target.value.trim())}
              />
            </div>
            <div className="ui-form-group">
              <label className="ui-label" htmlFor="co-label">
                Label
              </label>
              <input
                id="co-label"
                className="ui-input"
                placeholder="Maintenance Ticket"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <div className="ui-form-group">
              <label className="ui-label" htmlFor="co-description">
                Description
              </label>
              <input
                id="co-description"
                className="ui-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <div className="ui-flex-between">
                <label className="ui-label">Fields</label>
                <button
                  type="button"
                  className="ui-btn ui-btn-secondary ui-btn-sm"
                  onClick={() => setFields((prev) => [...prev, emptyDraftField()])}
                >
                  <Plus size={13} /> Add field
                </button>
              </div>
              <div className={styles.fieldHeader}>
                <span>Name</span>
                <span>Label</span>
                <span>Type</span>
                <span title="Required">Req.</span>
                <span title="Indexed">
                  <Hash size={12} />
                </span>
                <span />
              </div>
              {fields.map((f, i) => (
                <div key={i} className={styles.fieldRow}>
                  <input
                    className="ui-input"
                    aria-label={`Field ${i + 1} name`}
                    placeholder="due_date"
                    value={f.name}
                    onChange={(e) =>
                      updateField(i, { name: e.target.value.trim() })
                    }
                  />
                  <input
                    className="ui-input"
                    aria-label={`Field ${i + 1} label`}
                    placeholder="Due Date"
                    value={f.label}
                    onChange={(e) => updateField(i, { label: e.target.value })}
                  />
                  <select
                    className="ui-input"
                    aria-label={`Field ${i + 1} type`}
                    value={f.type}
                    onChange={(e) =>
                      updateField(i, {
                        type: e.target.value as DraftField["type"],
                      })
                    }
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <span className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      aria-label={`Field ${i + 1} required`}
                      checked={f.required}
                      onChange={(e) =>
                        updateField(i, { required: e.target.checked })
                      }
                    />
                  </span>
                  <span className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      aria-label={`Field ${i + 1} indexed`}
                      checked={f.indexed}
                      onChange={(e) =>
                        updateField(i, { indexed: e.target.checked })
                      }
                    />
                  </span>
                  <button
                    type="button"
                    className="ui-btn ui-btn-ghost ui-btn-sm"
                    aria-label={`Remove field ${i + 1}`}
                    disabled={fields.length === 1}
                    onClick={() =>
                      setFields((prev) => prev.filter((_, idx) => idx !== i))
                    }
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <p className="ui-text-xs-muted ui-flex ui-gap-1" style={{ alignItems: "center" }}>
              <Lock size={12} /> Tenant isolation and both indexes (tenant, and
              any field marked indexed) are applied automatically — there is
              no separate step.
            </p>
          </div>
        </Modal>
      </div>
    </RouteGuard>
  );
}
