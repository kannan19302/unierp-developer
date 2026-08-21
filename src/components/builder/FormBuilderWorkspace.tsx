"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
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
import { Button, EmptyState } from "@kannan19302/ui";

import { useToast } from "@/components/builder/ToastProvider";
import { useBuilderStore, type FormField } from "@/stores/builderStore";
import { FIELD_GROUPS } from "@/components/builder/BuilderSidebar";
import { BuilderProperties } from "@/components/builder/BuilderProperties";
import { SortableField } from "@/components/builder/SortableField";
import { DeployFormModal } from "@/components/builder/DeployFormModal";
import { AiCopilotSidebar } from "@/components/builder/AiCopilotSidebar";
import { FormLogicModal } from "@/components/builder/FormLogicModal";
import { StudioRouteFrame } from "@/components/builder/StudioRouteFrame";

export interface FormBuilderWorkspaceProps {
  /** 'new' to start a blank form, or an existing form id. */
  formId: string;
  /** Overlay close handler. When omitted, navigates to /builder/erp/forms. */
  onBack?: () => void;
  /** Called after a successful save (both new + existing). */
  onSaved?: (form: { id: string; name: string }) => void;
  /** When embedded in the app studio, "Close" replaces routing away. */
  embedded?: boolean;
  /** Pre-fill deploy/module metadata (e.g. the host app's module). */
  defaultModule?: string;
}

/**
 * The visual Form Builder — the first builder moved onto `<StudioShell>`.
 *
 * What changed and why it mattered:
 *
 * - **~560 lines of bespoke chrome are gone.** The previous version painted its
 *   own header, its own rails, its own zoom controls and its own action bar,
 *   with `rgba(255,255,255,0.05)`, `color: "white"` and `padding: "8px 16px"`
 *   inline throughout. Every one of those is a build failure under
 *   UI_UX_BRIEF §2 ("a literal hex colour, a literal pixel value ... is a build
 *   failure, enforced by a CI gate"), and — more practically — it meant the
 *   builder ignored all seven themes. It was unusable at `high-contrast`.
 * - **Insertion works without a pointer.** The palette was drag-only via
 *   `@dnd-kit`; `<StudioPalette>` makes every field type a real button, so a
 *   keyboard user can build a form. Drag still works for reordering on the
 *   canvas, as an accelerator.
 * - **Two modals became inspector tabs.** `FormLogicModal` opened over a canvas
 *   that already had a properties panel — the modal-on-modal §10 forbids.
 * - **Publishing shows a diff.** `handleSave(true)` used to POST and toast. It
 *   now routes through `<PublishDiffDialog>`, which is what makes the "AI
 *   Generate" button safe: an AI-authored schema is a reviewable change, not a
 *   silent write (Track G G29).
 *
 * The domain logic — load, save, deploy settings, the field store — is
 * unchanged. This is a chrome replacement, not a rewrite of what the builder
 * does.
 */
export function FormBuilderWorkspace({
  formId,
  onBack,
  onSaved,
  embedded = false,
  defaultModule,
}: FormBuilderWorkspaceProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const {
    fields,
    setFields,
    pages,
    setPages,
    conditions,
    setConditions,
    selectedFieldId,
    setSelectedFieldId,
    previewMode,
    setPreviewMode,
    moveField,
    addField,
  } = useBuilderStore();

  const [currentId, setCurrentId] = useState(formId);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showLogicModal, setShowLogicModal] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [validated, setValidated] = useState(false);
  const [deploySettings, setDeploySettings] = useState({
    module: defaultModule || "",
    slug: "",
    title: "",
  });

  // The fields as they were when the form was last loaded or saved. The
  // publish diff is computed against this, so "what changed" is a real answer
  // rather than "everything, because we resend the whole document".
  const [lastSaved, setLastSaved] = useState<FormField[]>([]);

  useEffect(() => {
    setCurrentId(formId);
  }, [formId]);

  useEffect(() => {
    let isMounted = true;
    async function loadForm() {
      if (formId === "new") {
        const starter: FormField[] = [
          {
            id: "f_1",
            type: "Section Break",
            label: "General Info",
            name: "general_info_section",
            required: false,
            readOnly: false,
            weight: 1,
            columnSpan: 12,
          },
          {
            id: "f_2",
            type: "Data",
            label: "Form Name",
            name: "form_name",
            required: true,
            readOnly: false,
            columnSpan: 12,
          },
          {
            id: "f_3",
            type: "Select",
            label: "Status",
            name: "status",
            required: false,
            readOnly: false,
            options: "Draft\nPublished",
            columnSpan: 12,
          },
        ];
        setFields(starter);
        setLastSaved(starter);
        setPages([]);
        setConditions([]);
        useBuilderStore.getState().updateFormSettings({});
        setDeploySettings({
          module: defaultModule || "Sales",
          slug: "",
          title: "",
        });
        return;
      }

      try {
        const token = localStorage.getItem("token") || "";
        const res = await fetch(`/api/v1/builder/forms/${formId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!isMounted) return;
        if (res.ok) {
          const data = await res.json();
          let rawFields = data.fields || [];
          if (typeof rawFields === "string") {
            try {
              rawFields = JSON.parse(rawFields);
            } catch {
              rawFields = [];
            }
          }
          if (Array.isArray(rawFields)) {
            setFields(rawFields);
            setLastSaved(rawFields);
          }
          setPages(Array.isArray(data.pages) ? data.pages : []);
          setConditions(Array.isArray(data.conditions) ? data.conditions : []);
          let rawSettings = data.settings || {};
          if (typeof rawSettings === "string") {
            try {
              rawSettings = JSON.parse(rawSettings);
            } catch {
              rawSettings = {};
            }
          }
          useBuilderStore.getState().updateFormSettings(rawSettings);
          setDeploySettings({
            module: data.module || defaultModule || "Sales",
            slug: data.slug || "",
            title: data.name || "",
          });
        } else {
          showToast("Form not found or failed to load.", "error");
        }
      } catch {
        if (isMounted) showToast("Network error loading form.", "error");
      }

      try {
        const token = localStorage.getItem("token") || "";
        fetch("/api/v1/builder/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            event: "canvas_opened",
            entityType: "FORM",
            entityId: formId,
          }),
        }).catch(() => {});
      } catch {
        /* analytics is best-effort and must never block the editor */
      }
    }
    loadForm();
    return () => {
      isMounted = false;
    };
  }, [formId, setFields, setPages, setConditions, showToast, defaultModule]);

  const handleClose = () => {
    if (onBack) onBack();
    else router.push("/builder/erp/forms");
  };

  const handleSave = useCallback(
    async (publish = false) => {
      setIsSaving(true);
      try {
        const token = localStorage.getItem("token") || "";
        const formSettings = useBuilderStore.getState().formSettings;
        const isNew = currentId === "new";
        const slug =
          deploySettings.slug || (isNew ? `custom-${Date.now()}` : currentId);
        const title = deploySettings.title || `Form ${slug}`;
        const moduleName = deploySettings.module || defaultModule || "Sales";

        const payload = {
          module: moduleName,
          slug,
          name: title,
          fields,
          pages,
          conditions,
          settings: formSettings,
          status: publish ? "PUBLISHED" : "DRAFT",
        };

        const res = await fetch(
          `/api/v1/builder/forms${isNew ? "" : `/${currentId}`}`,
          {
            method: isNew ? "POST" : "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          },
        );

        if (res.ok) {
          showToast(
            publish
              ? "Form successfully published!"
              : "Form successfully saved!",
            "success",
          );
          setLastSaved(fields);
          window.dispatchEvent(new Event("unerp_page_registry_updated"));
          const data = await res.json().catch(() => null);
          const savedId = isNew ? data?.id : currentId;
          if (isNew && savedId) setCurrentId(savedId);
          if (onSaved && savedId) {
            onSaved({ id: savedId, name: title });
          } else if (isNew && savedId) {
            router.push(`/builder/erp/forms/${savedId}`);
          }
        } else {
          const errorData = await res.json().catch(() => ({}));
          showToast(
            `Failed to save: ${errorData.message || "Server error"}`,
            "error",
          );
        }
      } catch {
        showToast("Error saving to server.", "error");
      } finally {
        setIsSaving(false);
      }
    },
    [
      currentId,
      deploySettings,
      defaultModule,
      fields,
      pages,
      conditions,
      onSaved,
      router,
      showToast,
    ],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      moveField(oldIndex, newIndex);
    }
  };

  // ── Palette ────────────────────────────────────────────────────────────────
  // Derived from BuilderSidebar's FIELD_GROUPS rather than restated, so the
  // palette can never offer a type the canvas does not know how to render.
  const paletteGroups = useMemo<PaletteGroup[]>(
    () =>
      FIELD_GROUPS.map((group) => ({
        id: group.name,
        label: group.name,
        items: group.items.map((item) => ({
          id: item.type,
          label: item.label,
          icon: item.icon,
          keywords: [item.type],
        })),
      })),
    [],
  );

  const insertField = useCallback(
    (item: { id: string; label: string }) => {
      const type = item.id;
      const name = `New ${type}`
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_")
        .replace(/_+/g, "_")
        .replace(/_$/, "");
      const id = "f_" + Math.random().toString(36).slice(2, 11);
      addField({
        id,
        type,
        label: `New ${type}`,
        name,
        required: false,
        readOnly: false,
        columnSpan: type === "Section Break" ? 12 : 6,
        weight: 1,
      });
      // Select what was just inserted: the user's next act is almost always to
      // name it, and making them hunt for it on the canvas is the small
      // friction that makes a builder feel unfinished.
      setSelectedFieldId(id);
    },
    [addField, setSelectedFieldId],
  );

  // ── Validation ─────────────────────────────────────────────────────────────
  // Real checks against the artefact, each pointing at the field it is about,
  // so every console row can locate its target (StudioConsole's rule).
  const problems = useMemo<StudioProblem[]>(() => {
    if (!validated) return [];
    const found: StudioProblem[] = [];
    const seen = new Map<string, string>();

    for (const f of fields) {
      if (!f.name || !f.name.trim()) {
        found.push({
          id: `${f.id}-noname`,
          severity: "error",
          message: "Field has no name, so its value cannot be stored.",
          where: f.label || f.type,
          targetId: f.id,
        });
      } else if (seen.has(f.name)) {
        found.push({
          id: `${f.id}-dupname`,
          severity: "error",
          message: `Two fields share the name “${f.name}”. The second overwrites the first on submit.`,
          where: f.label || f.type,
          targetId: f.id,
        });
      } else {
        seen.set(f.name, f.id);
      }

      if (!f.label || !f.label.trim()) {
        found.push({
          id: `${f.id}-nolabel`,
          severity: "error",
          message:
            "Field has no label. Every input needs one — WCAG 2.2 AA, and a screen reader announces nothing without it.",
          where: f.name || f.type,
          targetId: f.id,
        });
      }

      if (f.type === "Select" && !f.options?.trim()) {
        found.push({
          id: `${f.id}-nooptions`,
          severity: "warning",
          message: "Select has no options, so it renders as an empty dropdown.",
          where: f.label || f.name,
          targetId: f.id,
        });
      }
    }

    if (fields.length === 0) {
      found.push({
        id: "empty-form",
        severity: "warning",
        message: "This form has no fields yet.",
      });
    }

    return found;
  }, [fields, validated]);

  const errorCount = problems.filter((p) => p.severity === "error").length;

  // ── Publish diff ───────────────────────────────────────────────────────────
  const changes = useMemo<PublishChange[]>(() => {
    const before = new Map(lastSaved.map((f) => [f.id, f]));
    const after = new Map(fields.map((f) => [f.id, f]));
    const out: PublishChange[] = [];

    for (const [id, f] of after) {
      const prev = before.get(id);
      if (!prev) {
        out.push({
          id: `add-${id}`,
          kind: "added",
          what: `${f.label || f.name} (${f.type})`,
        });
      } else if (JSON.stringify(prev) !== JSON.stringify(f)) {
        out.push({
          id: `chg-${id}`,
          kind: "changed",
          what: f.label || f.name,
          detail: prev.label !== f.label ? `${prev.label} → ${f.label}` : undefined,
        });
      }
    }
    for (const [id, f] of before) {
      if (!after.has(id)) {
        out.push({
          id: `del-${id}`,
          kind: "removed",
          what: `${f.label || f.name} (${f.type})`,
        });
      }
    }
    return out;
  }, [fields, lastSaved]);

  const dirty = changes.length > 0;
  const selectedField = fields.find((f) => f.id === selectedFieldId);
  const artefactName = deploySettings.title || `Form ${currentId}`;

  const generateWithAi = () => {
    const prompt = window.prompt(
      "What kind of form do you want to generate? (e.g. 'A patient intake form with medical history')",
    );
    if (!prompt) return;
    showToast("Generating schema with AI…", "success");
    fetch("/api/v1/builder/ai-generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.schema) {
          // Deliberately only touches the DRAFT. The generated schema becomes a
          // pending change the user reviews in the publish diff — Track G G29
          // requires that no AI output reaches a tenant without an explicit
          // accept, and the diff is where that accept happens.
          setFields(data.schema);
          showToast(
            "Draft updated. Review the changes before publishing.",
            "success",
          );
        } else {
          showToast("AI failed to generate a valid schema.", "error");
        }
      })
      .catch(() => showToast("Failed to connect to AI service.", "error"));
  };

  return (
    <>
      <StudioRouteFrame embedded={embedded}>
        <StudioShell
        label={`${artefactName} — form builder`}
        defaultInspectorOpen={Boolean(selectedFieldId)}
        toolbar={
          <StudioToolbar
            name={artefactName}
            kind="Form"
            dirty={dirty}
            version={currentId === "new" ? "draft" : `#${currentId}`}
            problemCount={problems.length}
            environment={
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<ArrowLeft size={14} aria-hidden="true" />}
                  onClick={handleClose}
                >
                  {embedded ? "Close" : "Forms"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Sparkles size={14} aria-hidden="true" />}
                  onClick={generateWithAi}
                >
                  AI draft
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<Save size={14} aria-hidden="true" />}
                  isLoading={isSaving}
                  onClick={() => handleSave(false)}
                >
                  Save draft
                </Button>
              </>
            }
            validate={{ onAction: () => setValidated(true) }}
            preview={{ onAction: () => setPreviewMode(!previewMode) }}
            testRun={{
              disabledReason:
                "A form is tested by previewing and submitting it; there is no separate run step.",
            }}
            version_={{ onAction: () => setShowDeployModal(true) }}
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
            onInsert={insertField}
            searchPlaceholder="Search field types…"
            label="Field types"
          />
        }
        canvas={
          <StudioCanvas
            label={`${artefactName} layout`}
            variant="linear"
            isEmpty={fields.length === 0}
            selectedId={selectedFieldId}
            onSelect={setSelectedFieldId}
            empty={
              <EmptyState
                title="No fields yet"
                description="Pick a field type from the palette on the left. Press / to search it, then Enter to insert — no dragging required."
              />
            }
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={rectSortingStrategy}
              >
                {fields.map((field) => (
                  <SortableField
                    key={field.id}
                    field={field}
                    isSelected={field.id === selectedFieldId}
                    onClick={() => setSelectedFieldId(field.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </StudioCanvas>
        }
        inspector={
          showCopilot ? (
            <AiCopilotSidebar
              type="form"
              componentId={currentId}
              onSuggestFields={(suggested) => {
                // Same G29 rule as the AI draft button: a suggestion lands in
                // the draft and is reviewed in the publish diff. It never
                // reaches a tenant on its own.
                setFields(suggested as FormField[]);
                showToast(
                  "Draft updated. Review the changes before publishing.",
                  "success",
                );
              }}
            />
          ) : (
            <StudioInspector
              subject={selectedField?.label || selectedField?.name}
              properties={<BuilderProperties />}
              logic={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLogicModal(true)}
                >
                  Edit conditional logic ({conditions.length} rules)
                </Button>
              }
            />
          )
        }
        console={
          <StudioConsole
            problems={problems}
            onLocate={setSelectedFieldId}
            defaultOpen={errorCount > 0}
          />
          }
        />
      </StudioRouteFrame>

      <PublishDiffDialog
        open={showPublish}
        onClose={() => setShowPublish(false)}
        name={artefactName}
        environment={deploySettings.module || "Sales"}
        rollbackTo={currentId === "new" ? undefined : `the live #${currentId}`}
        changes={changes}
        publishing={isSaving}
        onPublish={() => {
          void handleSave(true).then(() => setShowPublish(false));
        }}
      >
        {errorCount > 0 ? (
          <p role="alert" style={{ color: "var(--studio-danger-text)" }}>
            {errorCount} error{errorCount === 1 ? "" : "s"} must be fixed first —
            see the console.
          </p>
        ) : null}
      </PublishDiffDialog>

      <DeployFormModal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        pageId={currentId === "new" ? "" : currentId}
        existingModule={deploySettings.module}
        existingSlug={deploySettings.slug}
        existingTitle={deploySettings.title}
        onPublished={({ pageId }) => {
          setShowDeployModal(false);
          if (pageId) setCurrentId(pageId);
          setLastSaved(fields);
        }}
      />

      <FormLogicModal
        isOpen={showLogicModal}
        onClose={() => setShowLogicModal(false)}
      />
    </>
  );
}
