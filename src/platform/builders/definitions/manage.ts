/**
 * Manage & Governance surfaces — the tenant-wide plane at `/manage/*`.
 *
 * Derived from `MANAGE_SUB_TABS`, with two differences:
 *
 * 1. "Overview" is gone, for the same reason it is gone from the app and site
 *    definitions: `/manage` itself is the overview, and a tab pointing at the
 *    page you are already on is dead weight.
 * 2. Every entry declares its `kind` honestly. Only five of these author
 *    anything (`query-builder`, `etl`, `theme-manager`, `widgets`,
 *    `mobile-export`); the rest read runtime state (`logs`, `releases`) or
 *    configure the tenant (`environments`, `access`, `connectors`, `git`,
 *    `marketplace`, `components`). Calling them all "builders" would make the
 *    registry's own `kind` field meaningless.
 *
 * None are full-canvas: every one of these is a list/detail page inside the
 * platform chrome, not an editor that takes the viewport.
 */

import { lazy } from "react";
import { registerBuilder } from "../registry";

const READ = { read: ["builder.read"], write: ["builder.write"] };

registerBuilder({
  kind: "data",
  id: "manage-releases",
  label: "Releases",
  icon: "History",
  segment: "releases",
  scopes: ["manage"],
  permissions: READ,
  status: "ga",
  description: "Version history and rollback across every app.",
  listView: lazy(() => import("@/app/builder/manage/releases/page")),
});

registerBuilder({
  kind: "settings",
  id: "manage-environments",
  label: "Environments",
  icon: "GitFork",
  segment: "environments",
  scopes: ["manage"],
  permissions: READ,
  status: "ga",
  description: "Development, staging and production targets.",
  listView: lazy(() => import("@/app/builder/manage/environments/page")),
});

registerBuilder({
  kind: "data",
  id: "manage-logs",
  label: "Run Logs",
  icon: "Activity",
  segment: "logs",
  scopes: ["manage"],
  permissions: READ,
  status: "ga",
  description: "Workflow and automation execution history.",
  listView: lazy(() => import("@/app/builder/manage/logs/page")),
});

registerBuilder({
  kind: "settings",
  id: "manage-access",
  label: "Access Control",
  icon: "Shield",
  segment: "access",
  scopes: ["manage"],
  permissions: READ,
  status: "ga",
  description: "Who can author and publish what.",
  listView: lazy(() => import("@/app/builder/manage/access/page")),
});

registerBuilder({
  kind: "settings",
  id: "manage-components",
  label: "Components",
  icon: "Cpu",
  segment: "components",
  scopes: ["manage"],
  permissions: READ,
  status: "ga",
  description: "Shared component library across apps.",
  listView: lazy(() => import("@/app/builder/manage/components/page")),
});

registerBuilder({
  kind: "settings",
  id: "manage-connectors",
  label: "Connectors",
  icon: "Link",
  segment: "connectors",
  scopes: ["manage"],
  permissions: READ,
  status: "ga",
  description: "External system integrations.",
  listView: lazy(() => import("@/app/builder/manage/connectors/page")),
});

registerBuilder({
  kind: "settings",
  id: "manage-marketplace",
  label: "Marketplace",
  icon: "Store",
  segment: "marketplace",
  scopes: ["manage"],
  permissions: READ,
  status: "ga",
  description: "Installed and available packages.",
  listView: lazy(() => import("@/app/builder/manage/marketplace/page")),
});

registerBuilder({
  kind: "builder",
  id: "manage-query-builder",
  label: "Query Builder",
  icon: "Database",
  segment: "queries",
  artifactType: "API_ENDPOINT",
  scopes: ["manage"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Saved queries across tenant data.",
  listView: lazy(() => import("@/app/builder/manage/query-builder/page")),
});

registerBuilder({
  kind: "builder",
  id: "manage-widgets",
  label: "Widgets",
  icon: "Settings",
  segment: "widgets",
  artifactType: "DASHBOARD",
  scopes: ["manage"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Reusable dashboard widgets.",
  listView: lazy(() => import("@/app/builder/manage/widgets/page")),
});

registerBuilder({
  kind: "builder",
  id: "manage-etl",
  label: "ETL",
  icon: "Repeat",
  segment: "etl",
  artifactType: "ETL_PIPELINE",
  scopes: ["manage"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Scheduled data import and transformation.",
  listView: lazy(() => import("@/app/builder/manage/etl/page")),
});

registerBuilder({
  kind: "builder",
  id: "manage-theme",
  label: "Themes",
  icon: "Palette",
  segment: "themes",
  artifactType: "THEME",
  scopes: ["manage"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Tenant-wide look and feel.",
  listView: lazy(() => import("@/app/builder/manage/theme-manager/page")),
});

registerBuilder({
  kind: "settings",
  id: "manage-git",
  label: "Git Control",
  icon: "GitBranch",
  segment: "git",
  scopes: ["manage"],
  permissions: READ,
  status: "beta",
  description: "Source control for authored artifacts.",
  listView: lazy(() => import("@/app/builder/manage/git/page")),
});

registerBuilder({
  kind: "builder",
  id: "manage-mobile-export",
  label: "Mobile & Export",
  icon: "Smartphone",
  segment: "mobile-export",
  artifactType: "MOBILE_APP",
  scopes: ["manage"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Mobile packaging and data export.",
  listView: lazy(() => import("@/app/builder/manage/mobile-export/page")),
});
