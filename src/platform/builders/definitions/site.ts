/**
 * Website Studio surfaces — what you see after entering a Site.
 *
 * Derived from `WEB_SUB_TABS`, with the same shape of correction as the app
 * definitions:
 *
 * - "Overview" is gone. It was a tab because the hub had no landing page of
 *   its own; `/sites/[siteId]` is that landing page now, so a tab pointing at
 *   the thing you are already inside is redundant.
 * - `orders` and `submissions` are `kind: "data"`, not builders. They read
 *   records the site produced at runtime; there is nothing to author and no
 *   editor to open. Modelling them honestly is what lets the workspace nav be
 *   one registry query instead of a registry query plus a hardcoded tail.
 * - `canvas` stays out of the nav, as it always has — it is the iframe target
 *   the Pages editor embeds, not a destination. It is reachable as the `pages`
 *   editor and nowhere else.
 */

import { lazy } from "react";
import { registerBuilder } from "../registry";

const READ = { read: ["builder.read"], write: ["builder.write"] };

registerBuilder({
  kind: "builder",
  id: "site-pages",
  label: "Pages",
  icon: "Monitor",
  segment: "pages",
  artifactType: "PAGE",
  scopes: ["site"],
  permissions: READ,
  status: "ga",
  fullCanvas: true,
  createFlow: "inline",
  description: "The site's page tree and block layouts.",
  listView: lazy(() => import("@/app/builder/web/(hub)/pages/page")),
  // The visual editor is the canvas route the Pages list already embeds. It
  // takes no props today and reads `pageId` from the query string; giving it
  // a real adapter is part of the F10 work that replaces the 103-line
  // wireframe, and is deliberately not bundled into the routing reshape.
  editor: lazy(() => import("@/app/builder/web/canvas/page")),
});

registerBuilder({
  kind: "builder",
  id: "site-collections",
  label: "Collections",
  icon: "Database",
  segment: "collections",
  artifactType: "COLLECTION",
  scopes: ["site"],
  permissions: READ,
  status: "ga",
  fullCanvas: false,
  createFlow: "inline",
  description: "Structured content types and their items.",
  listView: lazy(() => import("@/app/builder/web/(hub)/collections/page")),
});

registerBuilder({
  kind: "builder",
  id: "site-blog",
  label: "Blog",
  icon: "FileText",
  segment: "blog",
  artifactType: "BLOG_POST",
  scopes: ["site"],
  permissions: READ,
  status: "ga",
  fullCanvas: false,
  createFlow: "inline",
  description: "Posts, authors and categories.",
  listView: lazy(() => import("@/app/builder/web/(hub)/blog/page")),
});

registerBuilder({
  kind: "builder",
  id: "site-assets",
  label: "Assets",
  icon: "Image",
  segment: "assets",
  artifactType: "ASSET",
  scopes: ["site"],
  permissions: READ,
  status: "ga",
  fullCanvas: false,
  createFlow: "inline",
  description: "Images, files and media used across the site.",
  listView: lazy(() => import("@/app/builder/web/(hub)/assets/page")),
});

registerBuilder({
  kind: "builder",
  id: "site-menus",
  label: "Menus",
  icon: "Layers",
  segment: "menus",
  artifactType: "MENU",
  scopes: ["site"],
  permissions: READ,
  status: "ga",
  fullCanvas: false,
  createFlow: "inline",
  description: "Navigation structures for header and footer.",
  listView: lazy(() => import("@/app/builder/web/(hub)/menus/page")),
});

registerBuilder({
  kind: "builder",
  id: "site-seo",
  label: "SEO",
  icon: "SearchCheck",
  segment: "seo",
  artifactType: "SEO_PROFILE",
  scopes: ["site"],
  permissions: READ,
  status: "ga",
  fullCanvas: false,
  createFlow: "inline",
  description: "Metadata, sitemaps and redirects.",
  listView: lazy(() => import("@/app/builder/web/(hub)/seo/page")),
});

registerBuilder({
  kind: "builder",
  id: "site-ab-testing",
  label: "A/B Testing",
  icon: "FlaskConical",
  segment: "ab-testing",
  artifactType: "AB_TEST",
  scopes: ["site"],
  permissions: READ,
  status: "beta",
  fullCanvas: false,
  createFlow: "inline",
  description: "Page variants and traffic splits.",
  listView: lazy(() => import("@/app/builder/web/ab-testing/page")),
});

registerBuilder({
  kind: "data",
  id: "site-orders",
  label: "Orders",
  icon: "ShoppingCart",
  segment: "orders",
  scopes: ["site"],
  permissions: READ,
  status: "ga",
  description: "Commerce orders placed through this site.",
  listView: lazy(() => import("@/app/builder/web/(hub)/orders/page")),
});

registerBuilder({
  kind: "data",
  id: "site-submissions",
  label: "Submissions",
  icon: "Inbox",
  segment: "submissions",
  scopes: ["site"],
  permissions: READ,
  status: "ga",
  description: "Records captured by this site's forms.",
  listView: lazy(() => import("@/app/builder/web/(hub)/submissions/page")),
});

registerBuilder({
  kind: "settings",
  id: "site-settings",
  label: "Settings",
  icon: "Settings",
  segment: "settings",
  scopes: ["site"],
  permissions: READ,
  status: "ga",
  description: "Domains, theme and publishing configuration.",
  listView: lazy(() => import("@/app/builder/web/(hub)/settings/page")),
});
