"use client";

import React from "react";

/**
 * Gives a `<StudioShell>` a container that actually has a height.
 *
 * The shell is `block-size: 100%`, which only means something if every
 * ancestor up to the viewport is sized — and in a Next.js app they are not:
 * `<body>`, the route group and the page wrapper are all content-height. The
 * first time the shell was rendered into Storybook it collapsed to ~190px for
 * exactly this reason.
 *
 * `position: fixed; inset: 0` sidesteps the whole ancestor chain rather than
 * trying to force `height: 100%` onto four elements this component does not
 * own. It is also honest about what a full-canvas editor is: it takes the
 * screen. The `embedded` variant fills its parent instead, for when the editor
 * is opened as an overlay inside the App Studio and the host already owns the
 * viewport.
 */
export function StudioRouteFrame({
  children,
  embedded = false,
}: {
  children: React.ReactNode;
  embedded?: boolean;
}) {
  return (
    <div
      style={
        embedded
          ? { position: "absolute", inset: 0 }
          : { position: "fixed", inset: 0, zIndex: 1 }
      }
    >
      {children}
    </div>
  );
}
