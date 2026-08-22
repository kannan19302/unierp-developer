import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";

export interface FormField {
  id: string;
  type: string;
  label: string;
  name: string;
  required: boolean;
  readOnly: boolean;
  options?: string;
  description?: string;

  // Phase 2 Metadata
  placeholder?: string;
  defaultValue?: string;
  cssClass?: string;

  // Layout
  columnSpan?: number; // 1 to 12
  height?: number; // pixels
  weight?: number; // for Column Break / Section Break columns

  // Advanced Constraints & Logic
  minLength?: number;
  maxLength?: number;
  regexPattern?: string;
  formula?: string;
  visibilityRule?: string;
  inListView?: boolean;
  readRoles?: string;
  writeRoles?: string;

  // Integrations & Automation
  dataSource?: string;
  dataFilter?: string;
}

/** G10 — one step of a multi-step form. Empty `pages` = single page. */
export interface FormPage {
  id: string;
  title: string;
  order: number;
  fieldIds: string[];
}

export type ConditionOperator =
  | "equals"
  | "notEquals"
  | "contains"
  | "greaterThan"
  | "lessThan"
  | "isEmpty";
export type ConditionAction = "show" | "hide" | "enable" | "disable" | "require";

/** G10 — conditional visibility/requirement, evaluated against a live field value. */
export interface FormCondition {
  fieldId: string;
  operator: ConditionOperator;
  value?: string;
  action: ConditionAction;
  targetFieldId: string;
}

interface BuilderState {
  fields: FormField[];
  pages: FormPage[];
  conditions: FormCondition[];
  selectedFieldId: string | null;
  previewMode: boolean;
  formSettings: {
    webhooks: { url: string; event: string; method: string }[];
    scripts: { code: string; event: string }[];
    submitTargetArtifactId?: string;
    submitFieldMap?: Record<string, string>;
  };

  // Undo / Redo
  history: FormField[][];
  historyIndex: number;

  // Internal (used by store actions)
  pushHistory: (fields: FormField[]) => void;

  // Actions
  setFields: (fields: FormField[]) => void;
  addField: (field: FormField, index?: number) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  duplicateField: (id: string) => void;
  setSelectedFieldId: (id: string | null) => void;
  setPreviewMode: (mode: boolean) => void;
  updateFormSettings: (settings: Partial<BuilderState["formSettings"]>) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // G10 — pages (steps)
  setPages: (pages: FormPage[]) => void;
  addPage: (title: string) => void;
  updatePage: (id: string, updates: Partial<FormPage>) => void;
  removePage: (id: string) => void;
  reorderPages: (fromIndex: number, toIndex: number) => void;
  assignFieldToPage: (fieldId: string, pageId: string | null) => void;

  // G10 — conditional logic
  setConditions: (conditions: FormCondition[]) => void;
  addCondition: (condition: FormCondition) => void;
  updateCondition: (index: number, updates: Partial<FormCondition>) => void;
  removeCondition: (index: number) => void;
}

const MAX_HISTORY = 20;

export const useBuilderStore = create<BuilderState>((set, get) => ({
  fields: [],
  pages: [],
  conditions: [],
  selectedFieldId: null,
  previewMode: false,
  formSettings: { webhooks: [], scripts: [], submitFieldMap: {} },
  history: [],
  historyIndex: -1,

  pushHistory: (fields: FormField[]) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(fields)));
    if (newHistory.length > MAX_HISTORY) newHistory.shift();
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  setFields: (fields) => {
    set({
      fields,
      history: [JSON.parse(JSON.stringify(fields))],
      historyIndex: 0,
    });
  },

  addField: (field, index) =>
    set((state) => {
      const newFields = [...state.fields];
      if (index !== undefined) {
        newFields.splice(index, 0, field);
      } else {
        newFields.push(field);
      }
      get().pushHistory(newFields);
      return { fields: newFields, selectedFieldId: field.id };
    }),

  updateField: (id, updates) =>
    set((state) => {
      const newFields = state.fields.map((f) =>
        f.id === id ? { ...f, ...updates } : f,
      );
      get().pushHistory(newFields);
      return { fields: newFields };
    }),

  removeField: (id) =>
    set((state) => {
      const newFields = state.fields.filter((f) => f.id !== id);
      get().pushHistory(newFields);
      return {
        fields: newFields,
        selectedFieldId:
          state.selectedFieldId === id ? null : state.selectedFieldId,
      };
    }),

  moveField: (fromIndex, toIndex) =>
    set((state) => {
      const newFields = arrayMove(state.fields, fromIndex, toIndex);
      get().pushHistory(newFields);
      return { fields: newFields };
    }),

  duplicateField: (id) =>
    set((state) => {
      const source = state.fields.find((f) => f.id === id);
      if (!source) return state;
      const dup: FormField = {
        ...source,
        id: "f_" + Math.random().toString(36).substr(2, 9),
        name: source.name + "_copy",
        label: source.label + " (Copy)",
      };
      const idx = state.fields.findIndex((f) => f.id === id);
      const newFields = [...state.fields];
      newFields.splice(idx + 1, 0, dup);
      get().pushHistory(newFields);
      return { fields: newFields, selectedFieldId: dup.id };
    }),

  setSelectedFieldId: (id) => set({ selectedFieldId: id }),

  setPreviewMode: (mode) => set({ previewMode: mode }),

  updateFormSettings: (settings) =>
    set((state) => ({
      formSettings: { ...state.formSettings, ...settings },
    })),

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({
        fields: JSON.parse(JSON.stringify(history[newIndex])),
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({
        fields: JSON.parse(JSON.stringify(history[newIndex])),
        historyIndex: newIndex,
      });
    }
  },

  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  // ── G10 — pages (steps) ──
  setPages: (pages) => set({ pages }),

  addPage: (title) =>
    set((state) => ({
      pages: [
        ...state.pages,
        {
          id: "p_" + Math.random().toString(36).substr(2, 9),
          title,
          order: state.pages.length,
          fieldIds: [],
        },
      ],
    })),

  updatePage: (id, updates) =>
    set((state) => ({
      pages: state.pages.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  removePage: (id) =>
    set((state) => ({
      pages: state.pages
        .filter((p) => p.id !== id)
        .map((p, i) => ({ ...p, order: i })),
    })),

  reorderPages: (fromIndex, toIndex) =>
    set((state) => {
      const reordered = arrayMove(state.pages, fromIndex, toIndex);
      return { pages: reordered.map((p, i) => ({ ...p, order: i })) };
    }),

  assignFieldToPage: (fieldId, pageId) =>
    set((state) => ({
      pages: state.pages.map((p) => {
        const withoutField = p.fieldIds.filter((id) => id !== fieldId);
        return {
          ...p,
          fieldIds: p.id === pageId ? [...withoutField, fieldId] : withoutField,
        };
      }),
    })),

  // ── G10 — conditional logic ──
  setConditions: (conditions) => set({ conditions }),

  addCondition: (condition) =>
    set((state) => ({ conditions: [...state.conditions, condition] })),

  updateCondition: (index, updates) =>
    set((state) => ({
      conditions: state.conditions.map((c, i) =>
        i === index ? { ...c, ...updates } : c,
      ),
    })),

  removeCondition: (index) =>
    set((state) => ({
      conditions: state.conditions.filter((_, i) => i !== index),
    })),
}));
