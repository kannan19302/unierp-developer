"use client";

import React from "react";
import { X, Plus, Trash2, Layers, GitBranch } from "lucide-react";
import {
  useBuilderStore,
  type ConditionAction,
  type ConditionOperator,
} from "@/stores/builderStore";

interface FormLogicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OPERATORS: { value: ConditionOperator; label: string }[] = [
  { value: "equals", label: "equals" },
  { value: "notEquals", label: "does not equal" },
  { value: "contains", label: "contains" },
  { value: "greaterThan", label: "is greater than" },
  { value: "lessThan", label: "is less than" },
  { value: "isEmpty", label: "is empty" },
];

const ACTIONS: { value: ConditionAction; label: string }[] = [
  { value: "show", label: "Show" },
  { value: "hide", label: "Hide" },
  { value: "enable", label: "Enable" },
  { value: "disable", label: "Disable" },
  { value: "require", label: "Require" },
];

/**
 * G10 — the multi-step / conditional-logic editor for the Form Builder.
 * A modal rather than a persistent third panel: the canvas/properties
 * two-panel layout is the common case (most forms are single-page, no
 * logic), so this stays out of the way until opened, matching
 * DeployFormModal's own pattern in this workspace.
 */
export function FormLogicModal({ isOpen, onClose }: FormLogicModalProps) {
  const {
    fields,
    pages,
    conditions,
    addPage,
    updatePage,
    removePage,
    assignFieldToPage,
    addCondition,
    updateCondition,
    removeCondition,
  } = useBuilderStore();

  if (!isOpen) return null;

  const fieldOptions = fields.filter(
    (f) => f.type !== "Section Break" && f.type !== "Column Break",
  );

  const unassignedCount = fieldOptions.filter(
    (f) => !pages.some((p) => p.fieldIds.includes(f.name)),
  ).length;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--color-bg-overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-4)",
      }}
    >
      <div
        className="modal-card ui-card"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", maxWidth: "760px", marginBottom: 0 }}
      >
        <div
          className="ui-card-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}
          >
            <GitBranch size={18} style={{ color: "var(--color-primary)" }} />
            <span
              style={{
                fontWeight: "var(--weight-semibold)",
                fontSize: "var(--text-base)",
              }}
            >
              Steps &amp; Conditional Logic
            </span>
          </div>
          <button onClick={onClose} className="ui-btn ui-btn-icon" style={{ border: "none" }}>
            <X size={16} />
          </button>
        </div>

        <div className="ui-card-body ui-stack-5" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {/* ── Pages / steps ── */}
          <section>
            <div className="ui-flex-between" style={{ marginBottom: "var(--space-2)" }}>
              <h3
                className="ui-flex ui-gap-2"
                style={{ alignItems: "center", fontSize: "var(--text-sm)", margin: 0 }}
              >
                <Layers size={14} /> Steps
              </h3>
              <button
                type="button"
                className="ui-btn ui-btn-secondary ui-btn-sm"
                onClick={() => addPage(`Step ${pages.length + 1}`)}
              >
                <Plus size={13} /> Add step
              </button>
            </div>
            {pages.length === 0 ? (
              <p className="ui-text-xs-muted">
                No steps defined — this form renders as a single page. Add a
                step to split it into a multi-step wizard.
              </p>
            ) : (
              <div className="ui-stack-3">
                {unassignedCount > 0 && (
                  <p className="ui-text-xs-muted">
                    {unassignedCount} field(s) not assigned to any step won&apos;t
                    render once steps are in use.
                  </p>
                )}
                {[...pages]
                  .sort((a, b) => a.order - b.order)
                  .map((page) => (
                    <div key={page.id} className="ui-card p-3" style={{ marginBottom: 0 }}>
                      <div className="ui-flex-between" style={{ marginBottom: "var(--space-2)" }}>
                        <input
                          className="ui-input"
                          style={{ maxWidth: "260px" }}
                          value={page.title}
                          onChange={(e) => updatePage(page.id, { title: e.target.value })}
                          aria-label={`Step ${page.order + 1} title`}
                        />
                        <button
                          type="button"
                          className="ui-btn ui-btn-ghost ui-btn-sm"
                          aria-label={`Remove step "${page.title}"`}
                          onClick={() => removePage(page.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                        {fieldOptions.map((f) => {
                          const onThisPage = page.fieldIds.includes(f.name);
                          return (
                            <label
                              key={f.id}
                              className="ui-text-xs"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "4px 8px",
                                borderRadius: "var(--radius-sm)",
                                border: "1px solid var(--color-border)",
                                background: onThisPage
                                  ? "var(--color-primary-light)"
                                  : "transparent",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={onThisPage}
                                onChange={(e) =>
                                  assignFieldToPage(f.name, e.target.checked ? page.id : null)
                                }
                              />
                              {f.label || f.name}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>

          {/* ── Conditional logic ── */}
          <section>
            <div className="ui-flex-between" style={{ marginBottom: "var(--space-2)" }}>
              <h3
                className="ui-flex ui-gap-2"
                style={{ alignItems: "center", fontSize: "var(--text-sm)", margin: 0 }}
              >
                <GitBranch size={14} /> Conditions
              </h3>
              <button
                type="button"
                className="ui-btn ui-btn-secondary ui-btn-sm"
                disabled={fieldOptions.length < 1}
                onClick={() =>
                  addCondition({
                    fieldId: fieldOptions[0]?.name || "",
                    operator: "equals",
                    value: "",
                    action: "show",
                    targetFieldId: fieldOptions[0]?.name || "",
                  })
                }
              >
                <Plus size={13} /> Add condition
              </button>
            </div>
            {conditions.length === 0 ? (
              <p className="ui-text-xs-muted">
                No conditions — every field always renders, enabled and
                required exactly as its own settings say.
              </p>
            ) : (
              <div className="ui-stack-2">
                {conditions.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr auto",
                      gap: "var(--space-2)",
                      alignItems: "center",
                    }}
                  >
                    <select
                      className="ui-input"
                      aria-label={`Condition ${i + 1} source field`}
                      value={c.fieldId}
                      onChange={(e) => updateCondition(i, { fieldId: e.target.value })}
                    >
                      {fieldOptions.map((f) => (
                        <option key={f.id} value={f.name}>
                          {f.label || f.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="ui-input"
                      aria-label={`Condition ${i + 1} operator`}
                      value={c.operator}
                      onChange={(e) =>
                        updateCondition(i, {
                          operator: e.target.value as ConditionOperator,
                        })
                      }
                    >
                      {OPERATORS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <input
                      className="ui-input"
                      aria-label={`Condition ${i + 1} value`}
                      placeholder="value"
                      value={c.value ?? ""}
                      disabled={c.operator === "isEmpty"}
                      onChange={(e) => updateCondition(i, { value: e.target.value })}
                    />
                    <select
                      className="ui-input"
                      aria-label={`Condition ${i + 1} action`}
                      value={c.action}
                      onChange={(e) =>
                        updateCondition(i, { action: e.target.value as ConditionAction })
                      }
                    >
                      {ACTIONS.map((a) => (
                        <option key={a.value} value={a.value}>
                          {a.label}
                        </option>
                      ))}
                    </select>
                    <select
                      className="ui-input"
                      aria-label={`Condition ${i + 1} target field`}
                      value={c.targetFieldId}
                      onChange={(e) => updateCondition(i, { targetFieldId: e.target.value })}
                    >
                      {fieldOptions.map((f) => (
                        <option key={f.id} value={f.name}>
                          {f.label || f.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="ui-btn ui-btn-ghost ui-btn-sm"
                      aria-label={`Remove condition ${i + 1}`}
                      onClick={() => removeCondition(i)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="ui-card-footer ui-flex-end">
          <button className="ui-btn ui-btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
