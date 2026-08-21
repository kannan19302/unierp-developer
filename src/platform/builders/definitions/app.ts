/**
 * App Studio surfaces — what you see after entering an App from the home page.
 *
 * Derived from `ERP_SUB_TABS`, with three deliberate differences:
 *
 * 1. "Apps" and "Custom Apps" (`modules`) are gone. Both were list-of-apps
 *    tabs *inside* the app hub, which only made sense when the hub was the
 *    top of the tree. In a project-first tree the list of apps is `/apps`, one
 *    level up, and an app cannot contain itself.
 * 2. "Customize" is gone from here. It edits *another* module's sidebar
 *    (`getAppSpecificNavigation`), which is tenant-wide configuration, not
 *    authoring inside this app — it belongs under `/manage`.
 * 3. `scopes` now says which of these can also be authored standalone. A form
 *    or a workflow is portable and can live in the Library; a BPMN process
 *    bound to this app's data models is not.
 */

import { lazy } from "react";
import { registerBuilder } from "../registry";

const READ = { read: ["builder.read"], write: ["builder.write"] };

registerBuilder({
  kind: "builder",
  id: "forms",
  label: "Forms",
  icon: "FileCode2",
  segment: "forms",
  artifactType: "FORM",
  scopes: ["app", "library"],
  permissions: READ,
  status: "ga",
  fullCanvas: true,
  createFlow: "inline",
  description: "Multi-step forms with conditional logic.",
  listView: lazy(() => import("@/app/builder/erp/forms/page")),
  editor: lazy(() =>
    import("@/builders/adapters").then((m) => ({ default: m.FormEditorAdapter })),
  ),
});

registerBuilder({
  kind: "builder",
  id: "advanced-forms",
  label: "Advanced Forms",
  icon: "Layers",
  segment: "advanced-forms",
  artifactType: "ADVANCED_FORM",
  scopes: ["app", "library"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Templates, field libraries and reusable sections.",
  listView: lazy(() => import("@/app/builder/erp/advanced-forms/page")),
});

registerBuilder({
  kind: "builder",
  id: "workflows",
  label: "Workflows",
  icon: "Workflow",
  segment: "workflows",
  artifactType: "WORKFLOW",
  scopes: ["app", "library"],
  permissions: READ,
  status: "ga",
  fullCanvas: true,
  // Workflows already have a real wizard at `/new`; it collects a trigger
  // before there is anything to put on a canvas.
  createFlow: "wizard",
  wizardCreate: {
    endpoint: "workflows",
    defaultPayload: () => ({
      name: `New Workflow ${Math.floor(Math.random() * 1000)}`,
      trigger: "MANUAL",
      status: "DRAFT",
      nodes: [],
      edges: [],
    }),
  },
  description: "Triggered automations with approvals and run history.",
  listView: lazy(() => import("@/app/builder/erp/workflows/page")),
  editor: lazy(() =>
    import("@/builders/adapters").then((m) => ({
      default: m.WorkflowEditorAdapter,
    })),
  ),
});

registerBuilder({
  kind: "builder",
  id: "bpmn",
  label: "BPMN",
  icon: "GitBranch",
  segment: "bpmn",
  artifactType: "BPMN_PROCESS",
  scopes: ["app"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Standards-compliant process models.",
  listView: lazy(() => import("@/app/builder/erp/bpmn/page")),
});

registerBuilder({
  kind: "builder",
  id: "dashboards",
  label: "Dashboards",
  icon: "BarChart3",
  segment: "dashboards",
  artifactType: "DASHBOARD",
  scopes: ["app", "library"],
  permissions: READ,
  status: "ga",
  fullCanvas: true,
  createFlow: "wizard",
  wizardCreate: {
    endpoint: "dashboards",
    defaultPayload: () => ({
      name: `New Dashboard ${Math.floor(Math.random() * 1000)}`,
      status: "DRAFT",
      widgets: [],
      layout: [],
    }),
  },
  description: "Widget grids over this app's data.",
  listView: lazy(() => import("@/app/builder/erp/dashboards/page")),
  editor: lazy(() =>
    import("@/builders/adapters").then((m) => ({
      default: m.DashboardEditorAdapter,
    })),
  ),
});

registerBuilder({
  kind: "builder",
  id: "data-objects",
  label: "Data",
  icon: "Database",
  segment: "data-objects",
  artifactType: "DATA_OBJECT",
  scopes: ["app"],
  permissions: READ,
  status: "ga",
  fullCanvas: false,
  createFlow: "inline",
  description: "Custom objects, fields and relationships.",
  listView: lazy(() => import("@/app/builder/erp/data-objects/page")),
});

registerBuilder({
  kind: "builder",
  id: "rules-engine",
  label: "Rules",
  icon: "Table2",
  segment: "rules",
  artifactType: "RULE_SET",
  scopes: ["app", "library"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Decision tables and rule sets.",
  listView: lazy(() => import("@/app/builder/erp/rules-engine/page")),
});

registerBuilder({
  kind: "builder",
  id: "api-builder",
  label: "APIs",
  icon: "Code2",
  segment: "apis",
  artifactType: "API_ENDPOINT",
  scopes: ["app"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Custom endpoints over this app's objects.",
  listView: lazy(() => import("@/app/builder/erp/api-builder/page")),
});

registerBuilder({
  kind: "builder",
  id: "logic",
  label: "Logic",
  icon: "Zap",
  segment: "logic",
  artifactType: "SCRIPT",
  scopes: ["app"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Sandboxed scripts bound to lifecycle hooks.",
  listView: lazy(() => import("@/app/builder/erp/logic/page")),
});

registerBuilder({
  kind: "builder",
  id: "mobile-builder",
  label: "Mobile",
  icon: "Smartphone",
  segment: "mobile",
  artifactType: "MOBILE_APP",
  scopes: ["app"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Mobile layouts and offline rules.",
  listView: lazy(() => import("@/app/builder/erp/mobile-builder/page")),
});
