/**
 * Re-exports the icon resolver every nav surface in this app uses to turn a
 * `BuilderDefinition.icon` / `PlatformNavItem.icon` string into a component.
 *
 * The resolver itself (`src/navigation/iconMap.ts`) predates the registry and
 * is not part of the dead nav-list problem the registry replaces — it is a
 * plain string→component lookup with no builder knowledge, so it survives the
 * `src/navigation/` cleanup untouched. This file exists only so `platform/`
 * code never has to reach back into `navigation/` directly, which keeps the
 * eventual deletion of the rest of that directory a one-import change here.
 */
export { resolveIcon, ICON_MAP } from "@/navigation/iconMap";
