import path from 'node:path';

/** @type {import('next').NextConfig} */
const apiBaseUrl = process.env.API_URL || 'http://localhost:3001';

const nextConfig = {
  outputFileTracingRoot: path.resolve(process.cwd(), '..'),
  reactStrictMode: true,

  // The developer platform had no Next config at all, so it inherited the
  // defaults and every page failed on the design system's CSS modules.
  //
  // Transpiled, not externalised: a server-external package resolves its own
  // React, which breaks prerendering with a null dispatcher, and Next cannot
  // process CSS modules it does not own.
  transpilePackages: ['@kannan19302/shared', '@kannan19302/ui', '@kannan19302/framework'],

  experimental: {
    // Meant for large third-party barrel packages. Applying it to a local
    // workspace package alongside transpilePackages produced duplicate module
    // instances and null-hook crashes in web; do not add @kannan19302/* here.
    optimizePackageImports: ['lucide-react'],
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions || {}),
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };

      // `@kannan19302/shared`, `@kannan19302/ui` and `@kannan19302/framework`
      // are `pnpm` workspace packages, so `node_modules/@kannan19302/*` is a
      // symlink (a junction on Windows) into the sibling repo, not a real
      // copy. With webpack's default `resolve.symlinks: true`, every import
      // resolves through the symlink to its REAL path outside this project
      // (e.g. `D:\UniERP\shared\dist\...`) before Next decides how to compile
      // it. Because that real path sits outside `developer-platform`, Next's
      // dev-mode module classification treats it inconsistently: still
      // eligible for Fast Refresh injection (it IS in `transpilePackages`),
      // but no longer recognised as project-owned source — so it gets the
      // ESM-only `import.meta.webpackHot.accept()` Fast Refresh footer
      // appended to a file that is plain compiled CommonJS (`"use strict";
      // exports....`), which webpack's parser cannot parse as a module.
      //
      // `resolve.symlinks: false` keeps the apparent module path as
      // `node_modules/@kannan19302/shared/...` — i.e. inside the project, as
      // it would be with a real (non-monorepo) install — which is what
      // `transpilePackages` is actually documented to support. Verified: this
      // is the standard fix for "Module parse failed: Cannot use 'import.meta'
      // outside a module" in pnpm/Next.js monorepos using transpilePackages
      // on a symlinked workspace dependency.
      config.resolve.symlinks = false;
    }
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiBaseUrl}/api/v1/:path*`,
      },
    ];
  },

  // The project-first reshape moved every builder out of `/builder/*`.
  // These keep old links, bookmarks and the :4005 web-studio forwards
  // working. `permanent: false` (307) throughout, deliberately: a 308 is
  // cached by the browser indefinitely, and these targets are still moving
  // as the remaining phases land.
  //
  // Not every old URL has an exact new equivalent, and the ones that don't
  // are redirected honestly rather than guessed:
  //
  //   * `/builder/erp/<builder>` listed EVERY artifact of that type the
  //     tenant owned, with no app scope. `/library/<builder>` is the surface
  //     with those same semantics today (the library scope is still
  //     tenant-wide until `BuilderArtifact` lands in plan phase P3), so that
  //     is where they go — not to `/apps/...`, which would need an app id
  //     that the old URL never carried.
  //   * `/builder/web/*` operated on the tenant's default site implicitly.
  //     There is no site id in the old URL to carry into
  //     `/sites/<siteId>/*`, so these land on `/sites` and let the user pick.
  //     Losing the deep link is the honest outcome; inventing a site id is not.
  async redirects() {
    return [
      // Hub roots
      { source: '/builder', destination: '/', permanent: false },
      { source: '/builder/erp', destination: '/apps', permanent: false },
      { source: '/builder/app-hub', destination: '/apps', permanent: false },
      { source: '/builder/sites', destination: '/sites', permanent: false },
      { source: '/builder/sites/:path*', destination: '/sites', permanent: false },

      // App Studio — id-bearing route keeps its id.
      { source: '/builder/erp/apps/:id', destination: '/apps/:id', permanent: false },

      // App Studio builders → Library (see the note above on semantics).
      { source: '/builder/erp/forms/:id', destination: '/library/forms/:id', permanent: false },
      { source: '/builder/erp/forms', destination: '/library/forms', permanent: false },
      { source: '/builder/erp/workflows/:id', destination: '/library/workflows/:id', permanent: false },
      { source: '/builder/erp/workflows', destination: '/library/workflows', permanent: false },
      { source: '/builder/erp/dashboards/:id', destination: '/library/dashboards/:id', permanent: false },
      { source: '/builder/erp/dashboards', destination: '/library/dashboards', permanent: false },
      { source: '/builder/erp/advanced-forms', destination: '/library/advanced-forms', permanent: false },
      { source: '/builder/erp/rules-engine', destination: '/library/rules', permanent: false },

      // Web Studio → the site list (no site id to preserve).
      //
      // Enumerated rather than `/builder/web/:path*`, because `/builder/web/canvas`
      // must NOT redirect: it is the iframe target the Pages editor embeds
      // (`builder/web/(hub)/pages/page.tsx` renders
      // `src="/builder/web/canvas?pageId=..."`), not a page a user navigates to.
      // A catch-all here silently breaks the visual editor — the iframe would
      // load the site list instead of the canvas.
      { source: '/builder/web', destination: '/sites', permanent: false },
      { source: '/builder/web/pages', destination: '/sites', permanent: false },
      { source: '/builder/web/collections', destination: '/sites', permanent: false },
      { source: '/builder/web/blog', destination: '/sites', permanent: false },
      { source: '/builder/web/assets', destination: '/sites', permanent: false },
      { source: '/builder/web/menus', destination: '/sites', permanent: false },
      { source: '/builder/web/seo', destination: '/sites', permanent: false },
      { source: '/builder/web/orders', destination: '/sites', permanent: false },
      { source: '/builder/web/submissions', destination: '/sites', permanent: false },
      { source: '/builder/web/settings', destination: '/sites', permanent: false },
      { source: '/builder/web/ab-testing', destination: '/sites', permanent: false },

      // Manage — segment names changed where the registry renamed them.
      { source: '/builder/manage', destination: '/manage', permanent: false },
      { source: '/builder/manage/query-builder', destination: '/manage/queries', permanent: false },
      { source: '/builder/manage/theme-manager', destination: '/manage/themes', permanent: false },
      { source: '/builder/manage/:section', destination: '/manage/:section', permanent: false },
    ];
  },
  env: {
    // Browser-facing issuer URL. Must be reachable from the user's
    // browser (host port mapping in Docker), never the container-internal
    // service name idp:3005 that IDP_URL/OIDC_ISSUER resolve to for
    // server-to-server calls — see infra/platform-wizard/next.config.js
    // for the same distinction made there first (W4).
    NEXT_PUBLIC_OIDC_ISSUER:
      process.env.NEXT_PUBLIC_OIDC_ISSUER || 'http://localhost:3005',
  },

};

export default nextConfig;
