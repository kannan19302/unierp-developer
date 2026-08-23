"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  FileCode2,
  Heading,
  Layout,
  List,
  Monitor,
  Settings,
  Smartphone,
  Tablet,
  Trash2,
  Type,
  X,
} from "lucide-react";
import {
  StudioShell,
  StudioToolbar,
  StudioPalette,
  StudioCanvas,
  StudioInspector,
  StudioConsole,
  PublishDiffDialog,
  type PaletteGroup,
  type PublishChange,
  type StudioProblem,
} from "@kannan19302/ui/studio";
import { Button } from "@kannan19302/ui";
import { useToast } from "@/components/builder/ToastProvider";
import { StudioRouteFrame } from "@/components/builder/StudioRouteFrame";

export interface PageBuilderWorkspaceProps {
  appId: string;
  pageId: string;
  pageName: string;
  initialLayout: any[];
  forms: any[];
  dataModels: any[];
  dashboards: any[];
  onBack: () => void;
  onSaved: (layout: any[]) => void;
}

export interface PageWidget {
  id: string;
  type: "header" | "stats" | "form" | "table" | "chart" | "alert";
  title: string;
  gridSpan: number; // 1-12
  config: Record<string, any>;
}

/**
 * The Page Layout Builder, moved onto `<StudioShell>` — the last of the four
 * editors retrofitted. It always ran embedded (inside the App Studio's app
 * detail page, never a standalone route), so it stays embedded here too;
 * `<StudioRouteFrame embedded>` gives it its parent's box rather than the
 * whole viewport.
 *
 * As with the other three retrofits, the canvas content (the 12-column widget
 * grid, with its device-frame preview at each viewport width) and the
 * property inspector (per-widget-type config forms) are reused verbatim from
 * before the retrofit — the chrome around them changed, not the field-by-field
 * logic inside them. The widget palette was already a real button list
 * (`handleAddWidget`), so unlike the other three editors this one needed no
 * drag-only-insertion fix — `<StudioPalette>` just wraps what was already
 * keyboard-reachable.
 */
export function PageBuilderWorkspace({
  appId,
  pageId,
  pageName,
  initialLayout = [],
  forms = [],
  dataModels = [],
  dashboards = [],
  onBack,
  onSaved,
}: PageBuilderWorkspaceProps) {
  const { showToast } = useToast();
  const [widgets, setWidgets] = useState<PageWidget[]>([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );
  const [saving, setSaving] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [validated, setValidated] = useState(false);

  // What was last loaded/saved — the publish diff is computed against this,
  // the same pattern as the other three retrofits.
  const [lastSaved, setLastSaved] = useState<PageWidget[]>([]);

  useEffect(() => {
    const loaded = Array.isArray(initialLayout) ? initialLayout : [];
    setWidgets(loaded);
    setLastSaved(loaded);
  }, [initialLayout]);

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

  const handleAddWidget = (type: PageWidget["type"]) => {
    const id = `${type}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    let newWidget: PageWidget = {
      id,
      type,
      title: `New ${type.toUpperCase()}`,
      gridSpan: 12,
      config: {},
    };

    if (type === "header") {
      newWidget.title = "Page Header";
      newWidget.config = {
        subtitle: "Manage your operations from here",
        badge: "Draft",
      };
    } else if (type === "stats") {
      newWidget.title = "Counters";
      newWidget.config = {
        items: [
          {
            label: "Total Invoices",
            value: "42",
            color: "var(--studio-accent-bright)",
          },
          {
            label: "Pending Approvals",
            value: "7",
            color: "var(--studio-warning)",
          },
          { label: "Settled", value: "35", color: "var(--studio-success)" },
        ],
      };
    } else if (type === "alert") {
      newWidget.title = "Alert Banner";
      newWidget.config = {
        text: "This application is currently in draft mode. Submissions are captured locally.",
        type: "warning", // info, warning, danger, success
      };
    } else if (type === "form") {
      newWidget.title = "Linked Form";
      newWidget.config = { formId: forms[0]?.id || "" };
    } else if (type === "table") {
      newWidget.title = "Data List";
      newWidget.config = { dataModelId: dataModels[0]?.id || "", maxRows: 5 };
    } else if (type === "chart") {
      newWidget.title = "Analytics Chart";
      newWidget.config = {
        dashboardId: dashboards[0]?.id || "",
        chartType: "bar",
      };
    }

    setWidgets((prev) => [...prev, newWidget]);
    setSelectedWidgetId(id);
    showToast(`Added ${type} widget.`, "success");
  };

  const handleRemoveWidget = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWidgets((prev) => prev.filter((w) => w.id !== id));
    if (selectedWidgetId === id) setSelectedWidgetId(null);
    showToast("Widget removed.", "success");
  };

  const handleMoveWidget = (
    index: number,
    direction: "up" | "down",
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === widgets.length - 1) return;

    const nextIndex = direction === "up" ? index - 1 : index + 1;
    const nextWidgets = [...widgets];
    const temp = nextWidgets[index]!;
    nextWidgets[index] = nextWidgets[nextIndex]!;
    nextWidgets[nextIndex] = temp;
    setWidgets(nextWidgets);
  };

  const handleUpdateWidget = (id: string, updates: Partial<PageWidget>) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...updates } : w)),
    );
  };

  const handleUpdateConfig = (id: string, key: string, value: any) => {
    setWidgets((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, config: { ...w.config, [key]: value } } : w,
      ),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `/api/v1/builder/modules/${appId}/pages/${pageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",          },
          body: JSON.stringify({ layout: widgets }),
        },
      );

      if (res.ok) {
        showToast("Page layout successfully saved!", "success");
        setLastSaved(widgets);
        onSaved(widgets);
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(`Save failed: ${err.message || "Server error"}`, "error");
      }
    } catch {
      showToast("Error connecting to the server.", "error");
    } finally {
      setSaving(false);
    }
  };

  const widgetPalette = [
    {
      type: "header" as const,
      label: "Header Block",
      desc: "App title, subtitle, and statuses",
      icon: Heading,
      color: "var(--studio-pink)",
    },
    {
      type: "stats" as const,
      label: "Stats Counters",
      desc: "Visual numeric indicators",
      icon: Layout,
      color: "var(--studio-accent-bright)",
    },
    {
      type: "form" as const,
      label: "Form Widget",
      desc: "Link and embed a developer form",
      icon: FileCode2,
      color: "var(--studio-success)",
    },
    {
      type: "table" as const,
      label: "Data Table",
      desc: "Dynamic listing for a data model",
      icon: List,
      color: "var(--studio-violet)",
    },
    {
      type: "chart" as const,
      label: "Dashboard Chart",
      desc: "Interactive Recharts card",
      icon: BarChart3,
      color: "var(--studio-warning)",
    },
    {
      type: "alert" as const,
      label: "Alert/Info Banner",
      desc: "Informational rich text banners",
      icon: Type,
      color: "var(--studio-500)",
    },
  ];

  // ── Palette ────────────────────────────────────────────────────────────────
  const paletteGroups = useMemo<PaletteGroup[]>(
    () => [
      {
        id: "widgets",
        label: "Add Component",
        items: widgetPalette.map((p) => ({
          id: p.type,
          label: p.label,
          icon: p.icon,
        })),
      },
    ],
    [],
  );

  // ── Validation ─────────────────────────────────────────────────────────────
  const problems = useMemo<StudioProblem[]>(() => {
    if (!validated) return [];
    const found: StudioProblem[] = [];
    for (const w of widgets) {
      if (w.type === "form" && !w.config.formId) {
        found.push({
          id: `${w.id}-noform`,
          severity: "error",
          message: "Form widget has no form linked.",
          where: w.title,
          targetId: w.id,
        });
      }
      if (w.type === "table" && !w.config.dataModelId) {
        found.push({
          id: `${w.id}-nomodel`,
          severity: "error",
          message: "Data table widget has no data model linked.",
          where: w.title,
          targetId: w.id,
        });
      }
      if (w.type === "chart" && !w.config.dashboardId) {
        found.push({
          id: `${w.id}-nodash`,
          severity: "error",
          message: "Chart widget has no dashboard linked.",
          where: w.title,
          targetId: w.id,
        });
      }
    }
    if (widgets.length === 0) {
      found.push({
        id: "empty-page",
        severity: "warning",
        message: "This page has no widgets yet.",
      });
    }
    return found;
  }, [widgets, validated]);

  const errorCount = problems.filter((p) => p.severity === "error").length;

  // ── Publish diff ───────────────────────────────────────────────────────────
  const changes = useMemo<PublishChange[]>(() => {
    const before = new Map(lastSaved.map((w) => [w.id, w]));
    const after = new Map(widgets.map((w) => [w.id, w]));
    const out: PublishChange[] = [];

    for (const [wid, w] of after) {
      const prev = before.get(wid);
      if (!prev) {
        out.push({ id: `add-${wid}`, kind: "added", what: `${w.title} (${w.type})` });
      } else if (JSON.stringify(prev) !== JSON.stringify(w)) {
        out.push({
          id: `chg-${wid}`,
          kind: "changed",
          what: w.title,
          detail: prev.title !== w.title ? `${prev.title} → ${w.title}` : undefined,
        });
      }
    }
    for (const [wid, w] of before) {
      if (!after.has(wid)) {
        out.push({ id: `del-${wid}`, kind: "removed", what: `${w.title} (${w.type})` });
      }
    }

    const beforeOrder = lastSaved.map((w) => w.id).join(",");
    const afterOrder = widgets.map((w) => w.id).join(",");
    if (beforeOrder !== afterOrder && before.size === after.size) {
      out.push({ id: "reordered", kind: "changed", what: "Widget order" });
    }

    return out;
  }, [widgets, lastSaved]);

  const dirty = changes.length > 0;

  return (
    <>
      <StudioRouteFrame embedded>
        <StudioShell
          label={`${pageName} — page builder`}
          defaultInspectorOpen={Boolean(selectedWidgetId)}
          toolbar={
            <StudioToolbar
              name={pageName}
              kind="Page"
              dirty={dirty}
              problemCount={problems.length}
              environment={
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBack}
                    aria-label="Back"
                  >
                    ← Back
                  </Button>
                  <div
                    role="group"
                    aria-label="Preview viewport"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-1)",
                      background: "var(--studio-chrome-bg)",
                      borderRadius: "var(--radius-md)",
                      padding: "2px",
                    }}
                  >
                    {(
                      [
                        ["desktop", Monitor, "Desktop"],
                        ["tablet", Tablet, "Tablet"],
                        ["mobile", Smartphone, "Mobile"],
                      ] as const
                    ).map(([v, Icon, label]) => (
                      <Button
                        key={v}
                        variant={viewport === v ? "secondary" : "ghost"}
                        size="sm"
                        aria-pressed={viewport === v}
                        onClick={() => setViewport(v)}
                        leftIcon={<Icon size={14} aria-hidden="true" />}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </>
              }
              validate={{ onAction: () => setValidated(true) }}
              preview={{
                onAction: () => {
                  setPreviewMode(!previewMode);
                  setSelectedWidgetId(null);
                },
              }}
              testRun={{
                disabledReason:
                  "A page is tested by previewing it — there is no separate run step.",
              }}
              version_={{
                disabledReason: "Version history is not wired up for pages yet.",
              }}
              publish={{
                onAction: () => {
                  setValidated(true);
                  setShowPublish(true);
                },
                busy: saving,
              }}
            />
          }
          palette={
            previewMode ? undefined : (
              <StudioPalette
                groups={paletteGroups}
                onInsert={(item) => handleAddWidget(item.id as PageWidget["type"])}
                searchPlaceholder="Search components…"
                label="Add component"
              />
            )
          }
          canvas={
            <StudioCanvas
              label={`${pageName} layout`}
              variant="spatial"
              isEmpty={false}
            >
              <div
                style={{
                  maxWidth:
                    viewport === "desktop"
                      ? "100%"
                      : viewport === "tablet"
                        ? "768px"
                        : "375px",
                  margin: "0 auto",
                  padding: "var(--space-6)",
                  minHeight: viewport === "desktop" ? "640px" : "820px",
                  transition: "max-width 0.3s ease",
                }}
              >
                {viewport !== "desktop" && (
                  <div
                    style={{
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "var(--space-4)",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "6px",
                        background: "var(--studio-300)",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}

            {widgets.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "320px",
                  border: "2px dashed var(--studio-300)",
                  borderRadius: "var(--radius-lg)",
                  color: "var(--studio-500)",
                  textAlign: "center",
                  padding: "var(--space-6)",
                }}
              >
                <Layout size={32} style={{ marginBottom: "var(--space-3)" }} />
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "var(--text-sm)",
                    color: "var(--studio-800)",
                  }}
                >
                  Empty Page Canvas
                </div>
                <div style={{ fontSize: "var(--text-xs)", marginTop: 4 }}>
                  Add widgets from the left panel to build the layout.
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gap: "var(--space-4)",
                }}
              >
                {widgets.map((w, index) => {
                  const isSelected = selectedWidgetId === w.id;
                  return (
                    <div
                      key={w.id}
                      onClick={() => !previewMode && setSelectedWidgetId(w.id)}
                      style={{
                        gridColumn: `span ${w.gridSpan}`,
                        position: "relative",
                        border:
                          isSelected && !previewMode
                            ? "2px solid var(--studio-accent)"
                            : "1px solid var(--studio-300)",
                        borderRadius: "var(--radius-lg)",
                        background: "var(--studio-50)",
                        padding: "var(--space-4)",
                        cursor: previewMode ? "default" : "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {/* Widget Controls (Edit Mode only) */}
                      {!previewMode && (
                        <div
                          style={{
                            position: "absolute",
                            top: -14,
                            right: 10,
                            display: "flex",
                            gap: 4,
                            background: "white",
                            border: "1px solid var(--studio-300)",
                            borderRadius: "var(--radius-md)",
                            padding: 2,
                            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            zIndex: 10,
                          }}
                        >
                          <button
                            onClick={(e) => handleMoveWidget(index, "up", e)}
                            disabled={index === 0}
                            style={{
                              padding: 2,
                              border: "none",
                              background: "none",
                              cursor: index === 0 ? "not-allowed" : "pointer",
                              color:
                                index === 0
                                  ? "var(--studio-300)"
                                  : "var(--studio-500)",
                            }}
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            onClick={(e) => handleMoveWidget(index, "down", e)}
                            disabled={index === widgets.length - 1}
                            style={{
                              padding: 2,
                              border: "none",
                              background: "none",
                              cursor:
                                index === widgets.length - 1
                                  ? "not-allowed"
                                  : "pointer",
                              color:
                                index === widgets.length - 1
                                  ? "var(--studio-300)"
                                  : "var(--studio-500)",
                            }}
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            onClick={(e) => handleRemoveWidget(w.id, e)}
                            style={{
                              padding: 2,
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              color: "var(--studio-danger)",
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}

                      {/* Mock Widget Visual Renders */}
                      {w.type === "header" && (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                            }}
                          >
                            <div>
                              <h2
                                style={{
                                  fontSize: "20px",
                                  fontWeight: 700,
                                  margin: 0,
                                  color: "var(--studio-900)",
                                }}
                              >
                                {w.title}
                              </h2>
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: "var(--studio-500)",
                                  margin: "4px 0 0 0",
                                }}
                              >
                                {w.config.subtitle || "Add subtitle"}
                              </p>
                            </div>
                            {w.config.badge && (
                              <span
                                style={{
                                  fontSize: "11px",
                                  fontWeight: 600,
                                  padding: "2px 8px",
                                  borderRadius: "var(--radius-full)",
                                  background: "var(--studio-accent-subtle)",
                                  color: "var(--studio-accent)",
                                }}
                              >
                                {w.config.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {w.type === "stats" && (
                        <div>
                          <div
                            style={{
                              fontSize: "var(--text-xs)",
                              fontWeight: 600,
                              color: "var(--studio-500)",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              marginBottom: "var(--space-3)",
                            }}
                          >
                            {w.title}
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "var(--space-3)",
                            }}
                          >
                            {(w.config.items || []).map(
                              (item: any, i: number) => (
                                <div
                                  key={i}
                                  style={{
                                    padding: "var(--space-3)",
                                    background: "white",
                                    border: "1px solid var(--studio-200)",
                                    borderRadius: "var(--radius-md)",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: "var(--text-xl)",
                                      fontWeight: 800,
                                      color: item.color || "var(--studio-900)",
                                    }}
                                  >
                                    {item.value || "0"}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: "11px",
                                      color: "var(--studio-500)",
                                      marginTop: 2,
                                    }}
                                  >
                                    {item.label || "Indicator"}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {w.type === "alert" && (
                        <div
                          style={{
                            padding: "var(--space-3) var(--space-4)",
                            borderRadius: "var(--radius-md)",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background:
                              w.config.type === "danger"
                                ? "var(--studio-danger-surface)"
                                : w.config.type === "warning"
                                  ? "var(--studio-warning-surface)"
                                  : w.config.type === "success"
                                    ? "var(--studio-success-surface)"
                                    : "var(--studio-accent-subtle)",
                            color:
                              w.config.type === "danger"
                                ? "var(--studio-danger)"
                                : w.config.type === "warning"
                                  ? "var(--studio-warning-strong)"
                                  : w.config.type === "success"
                                    ? "var(--studio-success-bright)"
                                    : "var(--studio-accent)",
                            border: `1px solid ${w.config.type === "danger" ? "var(--studio-danger-subtle)" : w.config.type === "warning" ? "var(--studio-warning-subtle)" : w.config.type === "success" ? "var(--studio-success-muted)" : "var(--studio-accent-muted)"}`,
                          }}
                        >
                          <div style={{ fontSize: "13px", fontWeight: 500 }}>
                            {w.config.text || "Alert/Notification Banner"}
                          </div>
                        </div>
                      )}

                      {w.type === "form" && (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderBottom: "1px solid var(--studio-200)",
                              paddingBottom: 6,
                              marginBottom: "var(--space-3)",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "13px",
                                color: "var(--studio-800)",
                              }}
                            >
                              {w.title}
                            </div>
                            <span
                              style={{
                                fontSize: "10px",
                                color: "var(--studio-400)",
                                textTransform: "uppercase",
                                fontWeight: 600,
                              }}
                            >
                              Form Widget
                            </span>
                          </div>
                          {w.config.formId ? (
                            <div
                              style={{
                                padding: "var(--space-4) 0",
                                pointerEvents: "none",
                              }}
                            >
                              <label
                                style={{
                                  display: "block",
                                  fontSize: "11px",
                                  color: "var(--studio-500)",
                                  fontWeight: 600,
                                  marginBottom: 4,
                                }}
                              >
                                Example Field
                              </label>
                              <input
                                placeholder="Form placeholder..."
                                style={{
                                  width: "100%",
                                  padding: "var(--space-2)",
                                  borderRadius: "var(--radius-sm)",
                                  border: "1px solid var(--studio-200)",
                                  background: "var(--studio-50)",
                                  fontSize: "var(--text-xs)",
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                fontSize: "var(--text-xs)",
                                color: "var(--studio-danger)",
                                textAlign: "center",
                                padding: "var(--space-4) 0",
                              }}
                            >
                              No Form Linked. Select a form in properties.
                            </div>
                          )}
                        </div>
                      )}

                      {w.type === "table" && (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderBottom: "1px solid var(--studio-200)",
                              paddingBottom: 6,
                              marginBottom: "var(--space-3)",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "13px",
                                color: "var(--studio-800)",
                              }}
                            >
                              {w.title}
                            </div>
                            <span
                              style={{
                                fontSize: "10px",
                                color: "var(--studio-400)",
                                textTransform: "uppercase",
                                fontWeight: 600,
                              }}
                            >
                              Data Table
                            </span>
                          </div>
                          {w.config.dataModelId ? (
                            <div
                              style={{
                                fontSize: "11px",
                                pointerEvents: "none",
                              }}
                            >
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  padding: 6,
                                  fontWeight: 600,
                                  borderBottom: "1px solid var(--studio-100)",
                                  background: "var(--studio-100)",
                                }}
                              >
                                <span>Record / Identifier</span>
                                <span style={{ textAlign: "right" }}>
                                  Status
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  padding: 6,
                                  borderBottom: "1px solid var(--studio-100)",
                                }}
                              >
                                <span>Item 1002</span>
                                <span
                                  style={{
                                    textAlign: "right",
                                    color: "var(--studio-success)",
                                  }}
                                >
                                  Active
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr 1fr",
                                  padding: 6,
                                }}
                              >
                                <span>Item 1001</span>
                                <span
                                  style={{
                                    textAlign: "right",
                                    color: "var(--studio-warning)",
                                  }}
                                >
                                  Pending
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                fontSize: "var(--text-xs)",
                                color: "var(--studio-danger)",
                                textAlign: "center",
                                padding: "var(--space-4) 0",
                              }}
                            >
                              No Data Model Linked. Configure properties.
                            </div>
                          )}
                        </div>
                      )}

                      {w.type === "chart" && (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderBottom: "1px solid var(--studio-200)",
                              paddingBottom: 6,
                              marginBottom: "var(--space-3)",
                            }}
                          >
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: "13px",
                                color: "var(--studio-800)",
                              }}
                            >
                              {w.title}
                            </div>
                            <span
                              style={{
                                fontSize: "10px",
                                color: "var(--studio-400)",
                                textTransform: "uppercase",
                                fontWeight: 600,
                              }}
                            >
                              Chart
                            </span>
                          </div>
                          <div
                            style={{
                              height: "80px",
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "space-between",
                              padding:
                                "var(--space-2) var(--space-4) 0 var(--space-4)",
                            }}
                          >
                            <div
                              style={{
                                width: "15%",
                                height: "40%",
                                background: "var(--studio-accent-bright)",
                                borderRadius: "2px",
                              }}
                            />
                            <div
                              style={{
                                width: "15%",
                                height: "80%",
                                background: "var(--studio-accent-bright)",
                                borderRadius: "2px",
                              }}
                            />
                            <div
                              style={{
                                width: "15%",
                                height: "60%",
                                background: "var(--studio-accent-bright)",
                                borderRadius: "2px",
                              }}
                            />
                            <div
                              style={{
                                width: "15%",
                                height: "95%",
                                background: "var(--studio-accent-bright)",
                                borderRadius: "2px",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
              </div>
            </StudioCanvas>
          }
          inspector={
            previewMode ? undefined : (
              <StudioInspector
                subject={selectedWidget?.title}
                properties={
            selectedWidget ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    paddingBottom: "var(--space-2)",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "var(--text-sm)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Settings size={15} /> Widget Settings
                  </h3>
                  <button
                    onClick={() => setSelectedWidgetId(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--studio-400)",
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Common property: Title */}
                <div style={{ marginBottom: "var(--space-4)" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "var(--text-xs)",
                      color: "var(--studio-400)",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    Widget Title
                  </label>
                  <input
                    value={selectedWidget.title}
                    onChange={(e) =>
                      handleUpdateWidget(selectedWidget.id, {
                        title: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "var(--space-2)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(0,0,0,0.2)",
                      color: "white",
                      fontSize: "13px",
                    }}
                  />
                </div>

                {/* Common property: Column Span */}
                <div style={{ marginBottom: "var(--space-4)" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "var(--text-xs)",
                      color: "var(--studio-400)",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    Width (Grid Columns)
                  </label>
                  <select
                    value={selectedWidget.gridSpan}
                    onChange={(e) =>
                      handleUpdateWidget(selectedWidget.id, {
                        gridSpan: Number(e.target.value),
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "var(--space-2)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(0,0,0,0.2)",
                      color: "white",
                      fontSize: "13px",
                    }}
                  >
                    <option value={12}>Full Width (12 Columns)</option>
                    <option value={8}>2/3 Width (8 Columns)</option>
                    <option value={6}>Half Width (6 Columns)</option>
                    <option value={4}>1/3 Width (4 Columns)</option>
                  </select>
                </div>

                {/* Widget-specific settings */}
                {selectedWidget.type === "header" && (
                  <>
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "var(--text-xs)",
                          color: "var(--studio-400)",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Subtitle
                      </label>
                      <input
                        value={selectedWidget.config.subtitle || ""}
                        onChange={(e) =>
                          handleUpdateConfig(
                            selectedWidget.id,
                            "subtitle",
                            e.target.value,
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "var(--space-2)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(0,0,0,0.2)",
                          color: "white",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "var(--text-xs)",
                          color: "var(--studio-400)",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Badge Text
                      </label>
                      <input
                        value={selectedWidget.config.badge || ""}
                        onChange={(e) =>
                          handleUpdateConfig(
                            selectedWidget.id,
                            "badge",
                            e.target.value,
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "var(--space-2)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(0,0,0,0.2)",
                          color: "white",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </>
                )}

                {selectedWidget.type === "alert" && (
                  <>
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "var(--text-xs)",
                          color: "var(--studio-400)",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Banner Alert Text
                      </label>
                      <textarea
                        value={selectedWidget.config.text || ""}
                        onChange={(e) =>
                          handleUpdateConfig(
                            selectedWidget.id,
                            "text",
                            e.target.value,
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "var(--space-2)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(0,0,0,0.2)",
                          color: "white",
                          fontSize: "13px",
                          minHeight: 60,
                          resize: "vertical",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "var(--text-xs)",
                          color: "var(--studio-400)",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Alert Severity Type
                      </label>
                      <select
                        value={selectedWidget.config.type || "info"}
                        onChange={(e) =>
                          handleUpdateConfig(
                            selectedWidget.id,
                            "type",
                            e.target.value,
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "var(--space-2)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(0,0,0,0.2)",
                          color: "white",
                          fontSize: "13px",
                        }}
                      >
                        <option value="info">Info (Blue)</option>
                        <option value="warning">Warning (Amber)</option>
                        <option value="success">Success (Green)</option>
                        <option value="danger">Danger (Red)</option>
                      </select>
                    </div>
                  </>
                )}

                {selectedWidget.type === "form" && (
                  <div style={{ marginBottom: "var(--space-4)" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "var(--text-xs)",
                        color: "var(--studio-400)",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      Select Workspace Form
                    </label>
                    <select
                      value={selectedWidget.config.formId || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        const selectedForm = forms.find((f) => f.id === val);
                        setWidgets((prev) =>
                          prev.map((w) =>
                            w.id === selectedWidget.id
                              ? {
                                  ...w,
                                  config: {
                                    ...w.config,
                                    formId: val,
                                    formSlug: selectedForm?.slug || "",
                                    formName: selectedForm?.name || "",
                                  },
                                }
                              : w,
                          ),
                        );
                      }}
                      style={{
                        width: "100%",
                        padding: "var(--space-2)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(0,0,0,0.2)",
                        color: "white",
                        fontSize: "13px",
                      }}
                    >
                      <option value="">Select a Form...</option>
                      {forms.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedWidget.type === "table" && (
                  <>
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "var(--text-xs)",
                          color: "var(--studio-400)",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Select Backing Data Model
                      </label>
                      <select
                        value={selectedWidget.config.dataModelId || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          const selectedDm = dataModels.find(
                            (dm) => dm.id === val,
                          );
                          const dmSlug = selectedDm
                            ? String(selectedDm.name || "model")
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)/g, "")
                            : "";
                          setWidgets((prev) =>
                            prev.map((w) =>
                              w.id === selectedWidget.id
                                ? {
                                    ...w,
                                    config: {
                                      ...w.config,
                                      dataModelId: val,
                                      dataModelSlug: dmSlug,
                                      dataModelName: selectedDm?.name || "",
                                    },
                                  }
                                : w,
                            ),
                          );
                        }}
                        style={{
                          width: "100%",
                          padding: "var(--space-2)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(0,0,0,0.2)",
                          color: "white",
                          fontSize: "13px",
                        }}
                      >
                        <option value="">Select a Data Model...</option>
                        {dataModels.map((dm) => (
                          <option key={dm.id} value={dm.id}>
                            {dm.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "var(--text-xs)",
                          color: "var(--studio-400)",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Max Rows Displayed
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={selectedWidget.config.maxRows || 5}
                        onChange={(e) =>
                          handleUpdateConfig(
                            selectedWidget.id,
                            "maxRows",
                            Number(e.target.value),
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "var(--space-2)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(0,0,0,0.2)",
                          color: "white",
                          fontSize: "13px",
                        }}
                      />
                    </div>
                  </>
                )}

                {selectedWidget.type === "chart" && (
                  <>
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "var(--text-xs)",
                          color: "var(--studio-400)",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Select Dashboard Source
                      </label>
                      <select
                        value={selectedWidget.config.dashboardId || ""}
                        onChange={(e) =>
                          handleUpdateConfig(
                            selectedWidget.id,
                            "dashboardId",
                            e.target.value,
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "var(--space-2)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(0,0,0,0.2)",
                          color: "white",
                          fontSize: "13px",
                        }}
                      >
                        <option value="">Select a Dashboard...</option>
                        {dashboards.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={{ marginBottom: "var(--space-4)" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "var(--text-xs)",
                          color: "var(--studio-400)",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Chart Render Type
                      </label>
                      <select
                        value={selectedWidget.config.chartType || "bar"}
                        onChange={(e) =>
                          handleUpdateConfig(
                            selectedWidget.id,
                            "chartType",
                            e.target.value,
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "var(--space-2)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(0,0,0,0.2)",
                          color: "white",
                          fontSize: "13px",
                        }}
                      >
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                        <option value="donut">Donut Chart</option>
                      </select>
                    </div>
                  </>
                )}

                {selectedWidget.type === "stats" && (
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "var(--text-xs)",
                        color: "var(--studio-400)",
                        fontWeight: 600,
                        marginBottom: "var(--space-2)",
                      }}
                    >
                      Stats Items
                    </label>
                    {(selectedWidget.config.items || []).map(
                      (item: any, i: number) => (
                        <div
                          key={i}
                          style={{
                            border: "1px solid rgba(255,255,255,0.05)",
                            background: "rgba(0,0,0,0.15)",
                            padding: "var(--space-2)",
                            borderRadius: "var(--radius-sm)",
                            marginBottom: "var(--space-2)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "var(--space-2)",
                              marginBottom: 4,
                            }}
                          >
                            <input
                              placeholder="Label"
                              value={item.label}
                              onChange={(e) => {
                                const nextItems = [
                                  ...selectedWidget.config.items,
                                ];
                                nextItems[i].label = e.target.value;
                                handleUpdateConfig(
                                  selectedWidget.id,
                                  "items",
                                  nextItems,
                                );
                              }}
                              style={{
                                flex: 1,
                                padding: 4,
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                color: "white",
                                fontSize: "11px",
                                borderRadius: 2,
                              }}
                            />
                            <input
                              placeholder="Value"
                              value={item.value}
                              onChange={(e) => {
                                const nextItems = [
                                  ...selectedWidget.config.items,
                                ];
                                nextItems[i].value = e.target.value;
                                handleUpdateConfig(
                                  selectedWidget.id,
                                  "items",
                                  nextItems,
                                );
                              }}
                              style={{
                                width: "60px",
                                padding: 4,
                                background: "rgba(0,0,0,0.2)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                color: "white",
                                fontSize: "11px",
                                borderRadius: 2,
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="color"
                              value={
                                item.color || "var(--studio-accent-bright)"
                              }
                              onChange={(e) => {
                                const nextItems = [
                                  ...selectedWidget.config.items,
                                ];
                                nextItems[i].color = e.target.value;
                                handleUpdateConfig(
                                  selectedWidget.id,
                                  "items",
                                  nextItems,
                                );
                              }}
                              style={{
                                width: 40,
                                height: 18,
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                              }}
                            />
                            <button
                              onClick={() => {
                                const nextItems = (
                                  selectedWidget.config.items || []
                                ).filter((_: any, idx: number) => idx !== i);
                                handleUpdateConfig(
                                  selectedWidget.id,
                                  "items",
                                  nextItems,
                                );
                              }}
                              style={{
                                border: "none",
                                background: "none",
                                color: "var(--studio-danger)",
                                cursor: "pointer",
                                fontSize: "10px",
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ),
                    )}
                    <button
                      onClick={() => {
                        const nextItems = [
                          ...(selectedWidget.config.items || []),
                          {
                            label: "New Stat",
                            value: "10",
                            color: "var(--studio-accent-bright)",
                          },
                        ];
                        handleUpdateConfig(
                          selectedWidget.id,
                          "items",
                          nextItems,
                        );
                      }}
                      style={{
                        width: "100%",
                        padding: "4px",
                        border: "1px dashed rgba(255,255,255,0.2)",
                        borderRadius: "var(--radius-sm)",
                        background: "none",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: 600,
                      }}
                    >
                      + Add Stat Card
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  color: "var(--studio-500)",
                  textAlign: "center",
                }}
              >
                <Settings size={20} style={{ marginBottom: 6 }} />
                <span style={{ fontSize: "12px" }}>
                  Select a widget on the canvas to configure properties.
                </span>
              </div>
            )}
              />
            )
          }
          console={
            <StudioConsole
              problems={problems}
              onLocate={setSelectedWidgetId}
              defaultOpen={errorCount > 0}
            />
          }
        />
      </StudioRouteFrame>

      <PublishDiffDialog
        open={showPublish}
        onClose={() => setShowPublish(false)}
        name={pageName}
        environment="production"
        changes={changes}
        publishing={saving}
        onPublish={() => {
          void handleSave().then(() => setShowPublish(false));
        }}
      >
        {errorCount > 0 ? (
          <p role="alert" style={{ color: "var(--studio-danger-text)" }}>
            {errorCount} error{errorCount === 1 ? "" : "s"} must be fixed first —
            see the console.
          </p>
        ) : null}
      </PublishDiffDialog>
    </>
  );
}
