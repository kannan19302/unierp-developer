"use client";
import styles from "../page.module.css";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageHeader, EmptyState, Modal, Button } from "@kannan19302/ui";
import { ChangeHistory } from "@kannan19302/ui/data-grid";
import { useApiClient, ApiRequestError } from "@kannan19302/framework";
import { RouteGuard, Guarded } from "@kannan19302/framework";
import { ArrowLeft, Plus, Lock, Hash, Archive } from "lucide-react";

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
const RESERVED = new Set(["id", "tenant_id", "created_at", "updated_at"]);

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

export default function DataObjectDetailPage() {
  const client = useApiClient();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [object, setObject] = useState<CustomObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"forbidden" | "not-found" | "error" | null>(
    null,
  );

  const [showAddField, setShowAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState<(typeof FIELD_TYPES)[number]>("string");
  const [fieldRequired, setFieldRequired] = useState(false);
  const [fieldIndexed, setFieldIndexed] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchObject = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await client.get<CustomObject>(`/builder/data-objects/${id}`);
      setObject(data);
    } catch (e) {
      if (e instanceof ApiRequestError) {
        if (e.statusCode === 403) setError("forbidden");
        else if (e.statusCode === 404) setError("not-found");
        else setError("error");
      } else {
        setError("error");
      }
    } finally {
      setLoading(false);
    }
  }, [client, id]);

  useEffect(() => {
    fetchObject();
  }, [fetchObject]);

  const resetForm = () => {
    setFieldName("");
    setFieldLabel("");
    setFieldType("string");
    setFieldRequired(false);
    setFieldIndexed(false);
    setFormError(null);
  };

  const handleAddField = async () => {
    if (!IDENTIFIER.test(fieldName)) {
      setFormError("Field name must be lower_snake_case.");
      return;
    }
    if (RESERVED.has(fieldName)) {
      setFormError(`"${fieldName}" is supplied by the platform.`);
      return;
    }
    if (object?.fields.some((f) => f.name === fieldName)) {
      setFormError(`Field "${fieldName}" already exists.`);
      return;
    }
    if (!fieldLabel.trim()) {
      setFormError("Label is required.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      await client.post(`/builder/data-objects/${id}/fields`, {
        name: fieldName,
        label: fieldLabel,
        type: fieldType,
        required: fieldRequired,
        indexed: fieldIndexed,
      });
      setShowAddField(false);
      resetForm();
      fetchObject();
    } catch (e) {
      setFormError(
        e instanceof ApiRequestError ? e.message : "Could not add the field.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleArchive = async () => {
    if (!confirm(`Archive "${object?.label}"? Its data table is kept.`)) return;
    await client.delete(`/builder/data-objects/${id}`);
    fetchObject();
  };

  return (
    <RouteGuard permission="builder.data-object.read">
      <div className="p-6 ui-stack-5">
        <PageHeader
          title={loading ? "Loading…" : object?.label || "Custom Object"}
          description={object?.description || ""}
          actions={
            <div className="ui-flex ui-gap-2">
              <button
                className="ui-btn ui-btn-secondary"
                onClick={() => router.push("/builder/erp/data-objects")}
              >
                <ArrowLeft size={15} /> Data Objects
              </button>
              <Guarded permission="builder.data-object.update">
                <button
                  className="ui-btn ui-btn-secondary"
                  disabled={!object || object.status !== "ACTIVE"}
                  onClick={() => setShowAddField(true)}
                >
                  <Plus size={15} /> Add Field
                </button>
              </Guarded>
              <Guarded permission="builder.data-object.delete">
                <button
                  className="ui-btn ui-btn-secondary"
                  disabled={!object || object.status !== "ACTIVE"}
                  onClick={handleArchive}
                >
                  <Archive size={15} /> Archive
                </button>
              </Guarded>
            </div>
          }
        />

        {error === "forbidden" ? (
          <EmptyState
            title="Access denied"
            description="You don't have permission to view this custom object."
          />
        ) : error === "not-found" ? (
          <EmptyState
            title="Not found"
            description="This custom object doesn't exist or was removed."
          />
        ) : error === "error" ? (
          <div className={styles.errorBanner} role="alert">
            Could not load this object.{" "}
            <button className="ui-btn ui-btn-secondary" onClick={fetchObject}>
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="ui-card p-4">Loading…</div>
        ) : object ? (
          <>
            <div className="ui-card p-4 ui-stack-3">
              <div className="ui-flex-between">
                <span className="ui-text-secondary">API name</span>
                <span className={styles.typeBadge}>{object.apiName}</span>
              </div>
              <div className="ui-flex-between">
                <span className="ui-text-secondary">Table</span>
                <span className={styles.typeBadge}>{object.tableName}</span>
              </div>
              <div className="ui-flex-between">
                <span className="ui-text-secondary">Status</span>
                <span>{object.status}</span>
              </div>
              <p className="ui-text-xs-muted ui-flex ui-gap-1" style={{ alignItems: "center" }}>
                <Lock size={12} /> Tenant-scoped, row-level security enforced —
                this table is indistinguishable from a first-party table where
                it counts.
              </p>
            </div>

            <div className="ui-card p-4">
              <h3 className="ui-heading-sm">Fields ({object.fields.length})</h3>
              {object.fields.length === 0 ? (
                <EmptyState title="No fields" description="This object has no fields." />
              ) : (
                <table className="ui-table" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Label</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Indexed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {object.fields.map((f) => (
                      <tr key={f.id}>
                        <td className={styles.typeBadge}>{f.name}</td>
                        <td>{f.label}</td>
                        <td>{f.type}</td>
                        <td>{f.required ? "Yes" : "No"}</td>
                        <td>
                          {f.indexed ? (
                            <span className="ui-flex ui-gap-1" style={{ alignItems: "center" }}>
                              <Hash size={12} /> Yes
                            </span>
                          ) : (
                            "No"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="ui-card p-4">
              <h3 className="ui-heading-sm">Change history</h3>
              <ChangeHistory entityType="CustomObjectDefinition" entityId={object.id} />
            </div>
          </>
        ) : null}

        <Modal
          open={showAddField}
          onClose={() => {
            setShowAddField(false);
            resetForm();
          }}
          title="Add Field"
          description="New fields are additive — existing rows and columns are never altered."
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowAddField(false);
                  resetForm();
                }}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button onClick={handleAddField} disabled={submitting}>
                {submitting ? "Adding…" : "Add Field"}
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
              <label className="ui-label" htmlFor="new-field-name">
                Name
              </label>
              <input
                id="new-field-name"
                className="ui-input"
                placeholder="assigned_to"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value.trim())}
              />
            </div>
            <div className="ui-form-group">
              <label className="ui-label" htmlFor="new-field-label">
                Label
              </label>
              <input
                id="new-field-label"
                className="ui-input"
                placeholder="Assigned To"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
              />
            </div>
            <div className="ui-form-group">
              <label className="ui-label" htmlFor="new-field-type">
                Type
              </label>
              <select
                id="new-field-type"
                className="ui-input"
                value={fieldType}
                onChange={(e) =>
                  setFieldType(e.target.value as (typeof FIELD_TYPES)[number])
                }
              >
                {FIELD_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <label className="ui-flex ui-gap-2" style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                checked={fieldRequired}
                onChange={(e) => setFieldRequired(e.target.checked)}
              />
              Required
            </label>
            <label className="ui-flex ui-gap-2" style={{ alignItems: "center" }}>
              <input
                type="checkbox"
                checked={fieldIndexed}
                onChange={(e) => setFieldIndexed(e.target.checked)}
              />
              Indexed
            </label>
          </div>
        </Modal>
      </div>
    </RouteGuard>
  );
}
