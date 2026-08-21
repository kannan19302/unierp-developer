/**
 * The single side-effect import that populates the registry.
 *
 * Anything that needs to know what builders exist imports from here, never
 * from `./registry` directly — importing the registry without these two
 * modules having run yields an empty map, which fails as "the nav is blank"
 * rather than as an error. Re-exporting the query functions from this module
 * makes that mistake impossible to make by accident.
 */

import "./definitions/app";
import "./definitions/site";
import "./definitions/manage";

export {
  resolveBuilders,
  getBuilder,
  getBuilderBySegment,
  allBuilders,
  isFullCanvasPath,
} from "./registry";

export { isBuilderSurface, ARTIFACT_TYPES } from "./types";

export type {
  BuilderDefinition,
  BuilderScope,
  BuilderSurface,
  BuilderStatus,
  BuilderListProps,
  BuilderEditorProps,
  ResolvedScope,
  ArtifactType,
  SurfaceKind,
} from "./types";
