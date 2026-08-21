import type { Metadata } from "next";
import { Archivo, Public_Sans, IBM_Plex_Mono } from "next/font/google";

export const dynamic = "force-dynamic";
import "@kannan19302/ui/styles";
// Both stylesheets, not one. `./styles` is tokens and layers only; the
// CSS-MODULE classes (Card, Button, Modal, the Studio shell) live in
// `./styles.css`, and globals.css never imports its sibling. Importing only
// the first is why every module-styled component in this app rendered
// unstyled — Card had no hover, the shell would have had no rails.
// provider-admin-os/app/layout.tsx has imported both since it was written.
import "@kannan19302/ui/styles.css";
import { ThemeProvider, ToastProvider } from "@kannan19302/ui";
import { AuthShell } from "@/components/AuthShell";
import { AppProviders } from "@/platform/providers/AppProviders";

/**
 * Patina's three faces, self-hosted.
 *
 * The theme (`design-system/src/tokens/themes/patina.css`) names these
 * families as literals so a consumer without next/font still gets something
 * close, but loading them here is what makes them real: next/font subsets and
 * self-hosts, so there is no render-blocking request to fonts.googleapis.com
 * and no layout shift while the display face arrives. The variable names match
 * the theme's tokens exactly, so the theme keeps working if this is ever
 * removed and the CSS literals take over.
 *
 * Archivo carries the `wdth` axis on purpose — compression by size is what
 * gives the display face its voice, and a static cut cannot do it. Loading the
 * axis costs one variable font file, not one file per width.
 */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-display",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "UniERP Developer Platform",
    template: "%s | UniERP Developer Platform",
  },
  description:
    "Build apps and sites for this tenant — forms, workflows, data models, pages, releases.",
};

/**
 * Root layout for the Developer Platform.
 *
 * The platform split moved the builder routes into this app but never brought a
 * root layout with them, so `next build` failed outright with "page.tsx doesn't
 * have a root layout" — the app could not be built at all. It mirrors the web
 * app's shell (design-system styles, theme, toasts) minus the tenant-app
 * providers (query client, app framework), which the studio does not use.
 *
 * `data-theme="patina"` is what opts this app — and only this app — into the
 * developer platform's own theme. The design system is consumed by five other
 * apps from the same package; editing the shared `light` theme would have
 * restyled all of them, so patina is an additional theme selected by one
 * attribute here. `ThemeProvider` reads and persists the user's own choice
 * over the top, so switching to `patina-dark` (or back to `light`) stays a
 * user setting rather than a redeploy.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${publicSans.variable} ${plexMono.variable}`}
      data-theme="patina"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider defaultSetting="patina">
          <AuthShell>
            <AppProviders>
              <ToastProvider>{children}</ToastProvider>
            </AppProviders>
          </AuthShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
