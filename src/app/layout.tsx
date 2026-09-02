import type { Metadata } from "next";
import { Instrument_Sans, Inter, Martian_Mono } from "next/font/google";

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
 * Meridian's three faces, self-hosted.
 *
 * The theme (`design-system/src/tokens/themes/meridian.css`) names these
 * families as literals so a consumer without next/font still gets something
 * close, but loading them here is what makes them real: next/font subsets and
 * self-hosts, so there is no render-blocking request to fonts.googleapis.com
 * and no layout shift while the display face arrives. The variable names match
 * the theme's tokens exactly, so the theme keeps working if this is ever
 * removed and the CSS literals take over.
 *
 * Three faces, three jobs. Inter is the body and data face and is NOT the one
 * carrying personality — it is here for its tall x-height at 14px and its
 * tabular figures, which is what a ledger column needs. Instrument Sans is
 * semi-condensed and appears only where something announces itself. Martian
 * Mono is deliberately not JetBrains Mono: the mono here does identity work
 * (the Meridian bar's address, ids, versions, counts) and should not look like
 * a code editor leaked into the chrome.
 */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const martianMono = Martian_Mono({
  subsets: ["latin"],
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
 * `data-theme="meridian"` opts this app into the suite design language. Unlike
 * patina, which it replaces, Meridian is intended to become the default for
 * every app — but it is still shipped as a theme rather than as an edit to
 * `light`, so adoption happens app by app under Track B phases M2–M10 instead
 * of as one flag day across seven consumers. `ThemeProvider` reads and
 * persists the user's own choice over the top, so switching to
 * `meridian-dark` (or back to `light`) stays a user setting, not a redeploy.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${inter.variable} ${martianMono.variable}`}
      data-theme="strata"
      data-platform="developer"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider defaultSetting="strata" defaultPlatform="developer">
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
