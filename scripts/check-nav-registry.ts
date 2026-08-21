/**
 * The mechanism that stops the five-parallel-lists problem growing back.
 *
 * This application used to describe its fourteen builders in five places that
 * nothing kept in agreement. The registry collapsed them to one — but "one"
 * is only true for as long as nobody adds a second. This script is what makes
 * that a build failure instead of a slow drift, and it is the reason the
 * registry is worth having at all: without an enforcement step, a single
 * source of truth is a convention, and conventions in this codebase have
 * already lost once.
 *
 * Run: npx tsx scripts/check-nav-registry.ts
 *
 * It deliberately does NOT import any React component. `lazy()` defers its
 * import callback, so building the registry loads no page module, no CSS and
 * no JSX — which is what lets this run under plain tsx with no test
 * framework, no jsdom and no new dependency.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import {
  allBuilders,
  isBuilderSurface,
  resolveBuilders,
  getBuilderBySegment,
  isFullCanvasPath,
} from "../src/platform/builders/index";
import type { BuilderScope } from "../src/platform/builders/index";

const failures: string[] = [];
const fail = (msg: string) => failures.push(msg);

const SRC = join(import.meta.dirname, "..", "src");
const ALL_PERMISSIONS = ["builder.read", "builder.write"];

/**
 * Every scope the registry can serve. Declared `satisfies BuilderScope[]`
 * rather than inline at each loop so adding a scope to `BuilderScope` and
 * forgetting to check it here is a one-line fix in one place — the first
 * version of this script hardcoded three scopes at two call sites and
 * silently skipped `manage` entirely when it was added.
 */
const ALL_SCOPES = ["app", "site", "library", "manage"] satisfies BuilderScope[];

// ---------------------------------------------------------------------------
// 1. The registry is internally coherent.
// ---------------------------------------------------------------------------

const builders = allBuilders();
if (builders.length === 0) {
  fail("The registry is empty. definitions/*.ts did not run.");
}

for (const def of builders) {
  if (getBuilderBySegment(def.segment)?.id !== def.id) {
    fail(`"${def.id}" is not resolvable by its own segment "${def.segment}".`);
  }
  if (!/^[a-z0-9-]+$/.test(def.segment)) {
    fail(`"${def.id}" has segment "${def.segment}", which is not URL-safe.`);
  }
  if (isBuilderSurface(def) && def.fullCanvas) {
    // A full-canvas builder must actually be detected as full-canvas by the
    // layouts, on every scope it claims. This is the assertion that
    // `full-canvas-routes.ts` never had, and its absence is exactly how an
    // editor could ship with the hub chrome stacked on top of it.
    for (const scope of def.scopes) {
      const path =
        scope === "library"
          ? `/library/${def.segment}/abc123`
          : `/${scope}s/proj_1/${def.segment}/abc123`;
      if (!isFullCanvasPath(path)) {
        fail(`"${def.id}" declares fullCanvas but ${path} is not detected as one.`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Every scope resolves a non-empty nav, and permission filtering bites.
// ---------------------------------------------------------------------------

for (const scope of ALL_SCOPES) {
  if (resolveBuilders(scope, ALL_PERMISSIONS).length === 0) {
    fail(`Scope "${scope}" resolves no surfaces, so its workspace nav is blank.`);
  }
  if (resolveBuilders(scope, []).length !== 0) {
    fail(`Scope "${scope}" returns surfaces to a caller holding no permissions.`);
  }
}

// ---------------------------------------------------------------------------
// 3. No second list of builders exists.
//
// The four `*-sub-tabs.ts` arrays, `BUILDER_TABS` and `STATIC_COMMANDS` are
// the known offenders. They are still present while routes are migrated; this
// check names them so the migration cannot be declared finished while they
// survive, and fails outright on any NEW one.
// ---------------------------------------------------------------------------

const KNOWN_LEGACY_LISTS = [
  "components/builder/erp-sub-tabs.ts",
  "components/builder/web-sub-tabs.ts",
  "components/builder/manage-sub-tabs.ts",
  "components/builder/sites-sub-tabs.ts",
  "components/builder/BuilderTabLayout.tsx",
  "components/builder/StudioCommandPalette.tsx",
  "components/builder/full-canvas-routes.ts",
  // The old `/builder` landing page's `PILLARS`. Superseded by the home page
  // at `/`, which reads the registry; this file is deleted with the route.
  "app/builder/page.tsx",
];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const NAV_LIST_PATTERN = /(SUB_TABS|BUILDER_TABS|STATIC_COMMANDS|PILLARS)\s*[:=]/;
const offenders: string[] = [];

/**
 * A nav list is only a *builder* list if it navigates between different
 * destinations. Several pages declare a `*_SUB_TABS` array whose entries all
 * point at the same path and differ only by `?subtab=` — Logic, Menus, SEO and
 * Settings each do this. Those are intra-page section tabs; they are the
 * page's own business and the registry has no claim on them. Comparing paths
 * with the query string stripped is what separates the two cases.
 */
function navigatesAcrossPages(source: string): boolean {
  const paths = new Set(
    [...source.matchAll(/href:\s*["'`]([^"'`]+)["'`]/g)].map((m) =>
      m[1]!.split("?")[0],
    ),
  );
  return paths.size > 1;
}

for (const file of walk(SRC)) {
  if (!/\.tsx?$/.test(file)) continue;
  const rel = relative(SRC, file).replace(/\\/g, "/");
  if (rel.startsWith("platform/")) continue; // the registry itself
  const source = readFileSync(file, "utf8");
  if (NAV_LIST_PATTERN.test(source) && navigatesAcrossPages(source)) {
    offenders.push(rel);
  }
}

for (const rel of offenders) {
  if (!KNOWN_LEGACY_LISTS.includes(rel)) {
    fail(
      `${rel} declares a second list of builders. The registry at ` +
        `src/platform/builders is the only permitted one.`,
    );
  }
}

const remaining = offenders.filter((o) => KNOWN_LEGACY_LISTS.includes(o));

// ---------------------------------------------------------------------------

if (failures.length > 0) {
  console.error("\nnav-registry check FAILED:\n");
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("");
  process.exit(1);
}

console.log(`nav-registry check passed — ${builders.length} surfaces registered.`);
for (const scope of ALL_SCOPES) {
  const names = resolveBuilders(scope, ALL_PERMISSIONS).map((d) => d.segment);
  console.log(`  ${scope.padEnd(8)} ${names.join(", ")}`);
}
if (remaining.length > 0) {
  console.log(
    `\n  ${remaining.length} legacy nav list(s) still present, pending route ` +
      `migration:\n${remaining.map((r) => `    - ${r}`).join("\n")}`,
  );
}
