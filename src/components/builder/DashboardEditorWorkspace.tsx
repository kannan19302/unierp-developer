"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import GridLayout from "react-grid-layout";
import type { Layout } from "react-grid-layout";

// react-grid-layout's JSX prop types are awkward with the current React types setup.
const GridLayoutAny = GridLayout as unknown as React.ComponentType<any>;
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  BarChart2,
  Hash,
  LayoutDashboard,
  PieChart,
  Table as TableIcon,
  Trash2,
  TrendingUp,
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
import { EmptyState } from "@kannan19302/ui";

import { useToast } from "@/components/builder/ToastProvider";
import { StudioRouteFrame } from "@/components/builder/StudioRouteFrame";

interface Widget {
  id: string;
  type: string;
  title: string;
  dataSource: string;
  config: Record<string, unknown>;
}

interface WidgetType {
  type: string;
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  defaultW: number;
  defaultH: number;
}

/**
 * Exported for the same reason `FIELD_GROUPS` is exported from
 * `BuilderSidebar`: the palette is derived from this list, not restated, so it
 * can never offer a widget type the canvas cannot render.
 */
export const WIDGET_TYPES: WidgetType[] = [
  {
    type: "kpi",
    label: "KPI Metric",
    icon: Hash,
    color: "var(--studio-success)",
    defaultW: 3,
    defaultH: 2,
  },
  {
    type: "bar",
    label: "Bar Chart",
    icon: BarChart2,
    color: "var(--studio-accent-bright)",
    defaultW: 6,
    defaultH: 4,
  },
  {
    type: "line",
    label: "Line Chart",
    icon: TrendingUp,
    color: "var(--studio-warning)",
    defaultW: 6,
    defaultH: 4,
  },
  {
    type: "pie",
    label: "Pie Chart",
    icon: PieChart,
    color: "var(--studio-violet)",
    defaultW: 4,
    defaultH: 4,
  },
  {
    type: "table",
    label: "Data Table",
    icon: TableIcon,
    color: "var(--studio-accent)",
    defaultW: 8,
    defaultH: 5,
  },
];

export interface DashboardEditorWorkspaceProps {
  /** 'new' to start a blank dashboard, or an existing dashboard id. */
  dashboardId: string;
  onBack?: () => void;
  /** Called after a successful save with the saved dashboard's id+name. */
  onSaved?: (dashboard: { id: string; name: string }) => void;
  /** When embedded inside the app studio, "Close" replaces routing away. */
  embedded?: boolean;
  /** Optional default name for a freshly-created dashboard. */
  defaultName?: string;
}

/**
 * The Dashboard Editor, moved onto `<StudioShell>` — the third of the four
 * editors retrofitted, after the Form Builder. Same trade as that one: the
 * chrome is rebuilt, the domain logic (load, save, the widget/layout state)
 * is not.
 *
 * `react-grid-layout` stays exactly where it was — inside `StudioCanvas`'s
 * `spatial` variant, which is what that variant exists for: an artefact that
 * owns its own placement and keeps its own drag/resize behaviour. Dragging a
 * tile to reposition it is a spatial act with no sensible keyboard
 * equivalent, unlike the form builder's field list, so this is the one editor
 * where the previous version's mouse-only placement is kept rather than
 * replaced — inserting a NEW widget, however, is a `<StudioPalette>` button
 * like every other builder, not drag-only.
 */
export function DashboardEditorWorkspace({
  dashboardId,
  onBack,
  onSaved,
  embedded = false,
  defaultName,
}: DashboardEditorWorkspaceProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [currentId, setCurrentId] = useState(dashboardId);
  const [dashboard, setDashboard] = useState<{ name?: string; status?: string } | null>(
    null,
  );
  const [layout, setLayout] = useState<Layout[]>([]);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [validated, setValidated] = useState(false);
  const [width, setWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);

  // What was last loaded/saved — the publish diff is computed against this.
  const [lastSaved, setLastSaved] = useState<{
    layout: Layout[];
    widgets: Widget[];
  }>({ layout: [], widgets: [] });

  useEffect(() => {
    setCurrentId(dashboardId);
  }, [dashboardId]);

  useEffect(() => {
    let isMounted = true;
    async function loadDashboard() {
      if (currentId === "new") {
        setDashboard({ name: defaultName || "New Dashboard", status: "DRAFT" });
        setLayout([]);
        setWidgets([]);
        setLastSaved({ layout: [], widgets: [] });
        setLoading(false);
        return;
      }
      try {        const res = await fetch(`/api/v1/builder/dashboards/${currentId}`, {
          credentials: "include",
        });
        if (!isMounted) return;
        if (res.ok) {
          const data = await res.json();
          setDashboard(data);
          const loadedLayout = data.layout
            ? typeof data.layout === "string"
              ? JSON.parse(data.layout)
              : data.layout
            : [];
          const loadedWidgets = data.widgets
            ? typeof data.widgets === "string"
              ? JSON.parse(data.widgets)
              : data.widgets
            : [];
          setLayout(loadedLayout);
          setWidgets(loadedWidgets);
          setLastSaved({ layout: loadedLayout, widgets: loadedWidgets });
        } else {
          showToast("Failed to load dashboard", "error");
        }
      } catch {
        if (isMounted) showToast("Network error loading dashboard", "error");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadDashboard();
    return () => {
      isMounted = false;
    };
  }, [currentId, showToast, defaultName]);

  useEffect(() => {
    if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    const handleResize = () => {
      if (containerRef.current) setWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loading]);

  const handleClose = () => {
    if (onBack) onBack();
    else router.push("/builder/erp/dashboards");
  };

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {      const isNew = currentId === "new";
      const name = dashboard?.name || defaultName || "New Dashboard";
      const payload = { name, layout, widgets };
      const res = await fetch(
        `/api/v1/builder/dashboards${isNew ? "" : `/${currentId}`}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",          },
          body: JSON.stringify(payload),
        },
      );
      if (res.ok) {
        showToast("Dashboard saved successfully", "success");
        setLastSaved({ layout, widgets });
        const data = await res.json().catch(() => null);
        const savedId = isNew ? data?.id : currentId;
        if (isNew && savedId) setCurrentId(savedId);
        if (onSaved && savedId) onSaved({ id: savedId, name });
        else if (isNew && savedId)
          router.push(`/builder/erp/dashboards/${savedId}`);
      } else {
        showToast("Failed to save dashboard", "error");
      }
    } catch {
      showToast("Network error saving dashboard", "error");
    } finally {
      setIsSaving(false);
    }
  }, [currentId, dashboard, defaultName, layout, widgets, onSaved, router, showToast]);

  const addWidget = useCallback(
    (type: string) => {
      const wt = WIDGET_TYPES.find((t) => t.type === type);
      if (!wt) return;
      const id = "w_" + Math.random().toString(36).slice(2, 11);
      setWidgets((prev) => [
        ...prev,
        { id, type, title: `New ${wt.label}`, dataSource: "", config: {} },
      ]);
      setLayout((prev) => [
        ...prev,
        {
          i: id,
          x: (prev.length * 3) % 12,
          y: Infinity,
          w: wt.defaultW,
          h: wt.defaultH,
        } as Layout,
      ]);
      setSelectedWidgetId(id);
    },
    [],
  );

  const removeWidget = useCallback(
    (id: string) => {
      setWidgets((prev) => prev.filter((w) => w.id !== id));
      setLayout((prev) => prev.filter((l) => l.i !== id));
      if (selectedWidgetId === id) setSelectedWidgetId(null);
    },
    [selectedWidgetId],
  );

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);
  const updateWidgetConfig = useCallback(
    (key: keyof Widget, value: unknown) => {
      if (!selectedWidget) return;
      setWidgets((prev) =>
        prev.map((w) =>
          w.id === selectedWidget.id ? { ...w, [key]: value } : w,
        ),
      );
    },
    [selectedWidget],
  );

  // ── Palette ────────────────────────────────────────────────────────────────
  const paletteGroups = useMemo<PaletteGroup[]>(
    () => [
      {
        id: "widgets",
        label: "Widgets",
        items: WIDGET_TYPES.map((wt) => ({
          id: wt.type,
          label: wt.label,
          icon: wt.icon,
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
      if (!w.dataSource) {
        found.push({
          id: `${w.id}-nosource`,
          severity: "error",
          message: "Widget has no data source, so it has nothing to show.",
          where: w.title,
          targetId: w.id,
        });
      }
      if (!w.title || !w.title.trim()) {
        found.push({
          id: `${w.id}-notitle`,
          severity: "warning",
          message: "Widget has no title.",
          where: w.type,
          targetId: w.id,
        });
      }
    }
    if (widgets.length === 0) {
      found.push({
        id: "empty-dashboard",
        severity: "warning",
        message: "This dashboard has no widgets yet.",
      });
    }
    return found;
  }, [widgets, validated]);

  const errorCount = problems.filter((p) => p.severity === "error").length;

  // ── Publish diff ───────────────────────────────────────────────────────────
  const changes = useMemo<PublishChange[]>(() => {
    const beforeW = new Map(lastSaved.widgets.map((w) => [w.id, w]));
    const afterW = new Map(widgets.map((w) => [w.id, w]));
    const out: PublishChange[] = [];

    for (const [id, w] of afterW) {
      const prev = beforeW.get(id);
      if (!prev) {
        out.push({ id: `add-${id}`, kind: "added", what: `${w.title} (${w.type})` });
      } else if (JSON.stringify(prev) !== JSON.stringify(w)) {
        out.push({
          id: `chg-${id}`,
          kind: "changed",
          what: w.title,
          detail: prev.title !== w.title ? `${prev.title} → ${w.title}` : undefined,
        });
      }
    }
    for (const [id, w] of beforeW) {
      if (!afterW.has(id)) {
        out.push({ id: `del-${id}`, kind: "removed", what: `${w.title} (${w.type})` });
      }
    }

    const beforePositions = new Map(lastSaved.layout.map((l) => [l.i, `${l.x},${l.y},${l.w},${l.h}`]));
    const afterPositions = new Map(layout.map((l) => [l.i, `${l.x},${l.y},${l.w},${l.h}`]));
    let moved = 0;
    for (const [id, pos] of afterPositions) {
      if (beforePositions.has(id) && beforePositions.get(id) !== pos) moved += 1;
    }
    if (moved > 0) {
      out.push({
        id: "layout-moved",
        kind: "changed",
        what: `Layout — ${moved} widget${moved === 1 ? "" : "s"} repositioned or resized`,
      });
    }

    return out;
  }, [widgets, layout, lastSaved]);

  const dirty = changes.length > 0;
  const artefactName = dashboard?.name || defaultName || `Dashboard ${currentId}`;

  if (loading) {
    return (
      <StudioRouteFrame embedded={embedded}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            blockSize: "100%",
            color: "var(--color-text-secondary)",
          }}
        >
          Loading dashboard editor…
        </div>
      </StudioRouteFrame>
    );
  }

  return (
    <>
      <StudioRouteFrame embedded={embedded}>
        <StudioShell
          label={`${artefactName} — dashboard editor`}
          defaultInspectorOpen={Boolean(selectedWidgetId)}
          toolbar={
            <StudioToolbar
              name={artefactName}
              kind="Dashboard"
              dirty={dirty}
              version={currentId === "new" ? "draft" : `#${currentId}`}
              problemCount={problems.length}
              environment={
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    fontSize: "var(--font-sm)",
                    color: "var(--studio-chrome-text-muted)",
                    padding: "var(--space-1) var(--space-2)",
                  }}
                >
                  ← {embedded ? "Close" : "Dashboards"}
                </button>
              }
              validate={{ onAction: () => setValidated(true) }}
              preview={{
                disabledReason:
                  "Preview renders live data once a data source is connected — not part of this pass.",
              }}
              testRun={{
                disabledReason:
                  "A dashboard has no separate run step; preview each widget's data source instead.",
              }}
              version_={{
                disabledReason: "Version history is not wired up for dashboards yet.",
              }}
              publish={{
                onAction: () => {
                  setValidated(true);
                  setShowPublish(true);
                },
                busy: isSaving,
              }}
            />
          }
          palette={
            <StudioPalette
              groups={paletteGroups}
              onInsert={(item) => addWidget(item.id)}
              searchPlaceholder="Search widget types…"
              label="Widget types"
            />
          }
          canvas={
            <StudioCanvas
              label={`${artefactName} layout`}
              variant="spatial"
              isEmpty={layout.length === 0}
              empty={
                <EmptyState
                  title="Dashboard is empty"
                  description="Pick a widget type from the palette on the left to add it to the canvas."
                />
              }
            >
              <div ref={containerRef} style={{ padding: "var(--space-4)" }}>
                <GridLayoutAny
                  className="layout"
                  layout={layout}
                  cols={12}
                  rowHeight={40}
                  width={Math.max(width - 32, 200)}
                  onLayoutChange={(l: Layout[]) => setLayout(l)}
                  isDraggable
                  isResizable
                  margin={[16, 16]}
                >
                  {layout.map((l) => {
                    const widget = widgets.find((w) => w.id === l.i);
                    if (!widget) return <div key={l.i} />;
                    const isSelected = selectedWidgetId === widget.id;
                    const wt = WIDGET_TYPES.find((t) => t.type === widget.type);
                    const Icon = wt?.icon || LayoutDashboard;
                    return (
                      <div
                        key={l.i}
                        role="option"
                        aria-selected={isSelected}
                        id={widget.id}
                        onClick={() => setSelectedWidgetId(widget.id)}
                        style={{
                          background: "var(--color-surface)",
                          border: `1px solid ${isSelected ? "var(--studio-accent-bright)" : "var(--color-border)"}`,
                          borderRadius: "var(--radius-md)",
                          overflow: "hidden",
                          cursor: "grab",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: isSelected
                            ? "0 0 0 2px var(--studio-accent-subtle)"
                            : "none",
                        }}
                      >
                        <div
                          style={{
                            padding: "var(--space-2) var(--space-3)",
                            borderBlockEnd: "1px solid var(--color-border)",
                            display: "flex",
                            alignItems: "center",
                            gap: "var(--space-2)",
                            background: "var(--color-surface-raised, var(--color-surface))",
                          }}
                        >
                          <Icon size={14} color={wt?.color || "var(--studio-500)"} />
                          <span
                            style={{
                              fontSize: "var(--font-xs)",
                              fontWeight: 600,
                              color: "var(--color-text)",
                              flex: 1,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {widget.title}
                          </span>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--color-text-muted)",
                          }}
                        >
                          <BarChart2 size={32} opacity={0.5} aria-hidden="true" />
                        </div>
                      </div>
                    );
                  })}
                </GridLayoutAny>
              </div>
            </StudioCanvas>
          }
          inspector={
            <StudioInspector
              subject={selectedWidget?.title}
              properties={
                selectedWidget ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-4)",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                      <label
                        htmlFor="widget-title"
                        style={{ fontSize: "var(--font-xs)", fontWeight: 500, color: "var(--color-text-secondary)" }}
                      >
                        Widget Title
                      </label>
                      <input
                        id="widget-title"
                        type="text"
                        value={selectedWidget.title}
                        onChange={(e) => updateWidgetConfig("title", e.target.value)}
                        style={{
                          padding: "var(--space-2) var(--space-3)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "var(--font-sm)",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
                      <label
                        htmlFor="widget-source"
                        style={{ fontSize: "var(--font-xs)", fontWeight: 500, color: "var(--color-text-secondary)" }}
                      >
                        Data Source
                      </label>
                      <select
                        id="widget-source"
                        value={selectedWidget.dataSource}
                        onChange={(e) => updateWidgetConfig("dataSource", e.target.value)}
                        style={{
                          padding: "var(--space-2) var(--space-3)",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "var(--font-sm)",
                          background: "var(--color-surface)",
                        }}
                      >
                        <option value="">Select a module…</option>
                        <option value="sales_orders">Sales Orders</option>
                        <option value="purchase_orders">Purchase Orders</option>
                        <option value="invoices">Invoices</option>
                        <option value="custom">Custom Query</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeWidget(selectedWidget.id)}
                      style={{
                        padding: "var(--space-2)",
                        inlineSize: "100%",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--studio-danger-muted)",
                        background: "var(--studio-danger-surface-rose)",
                        color: "var(--studio-danger-rose)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "var(--space-2)",
                        fontSize: "var(--font-sm)",
                        fontWeight: 500,
                      }}
                    >
                      <Trash2 size={14} aria-hidden="true" /> Remove widget
                    </button>
                  </div>
                ) : undefined
              }
            />
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
        name={artefactName}
        environment="production"
        rollbackTo={currentId === "new" ? undefined : `the live #${currentId}`}
        changes={changes}
        publishing={isSaving}
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
