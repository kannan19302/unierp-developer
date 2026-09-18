"use client";

/**
 * `COMMUNICATION_TABS` / `CommunicationTabLayout` — was missing entirely,
 * same layout-blocking gap as AppsTabLayout.tsx in this directory.
 *
 * `/connect` has no subdirectories of its own — its layout hands a tab list
 * to `ModuleTabLayout` for query-param-driven in-page sections (see that
 * component's `isTabActive`, which checks `?tab=` before falling back to the
 * href match). Which sections page.tsx actually implements is that file's
 * call, not this wrapper's — a single "Overview" tab is the honest minimum
 * rather than inventing channel names with no page behind them.
 */
import { ModuleTabLayout, type ModuleTab } from "@kannan19302/ui";

export const COMMUNICATION_TABS: ModuleTab[] = [
  { id: "connect", label: "Overview", href: "/connect" },
];

export { ModuleTabLayout as CommunicationTabLayout };
