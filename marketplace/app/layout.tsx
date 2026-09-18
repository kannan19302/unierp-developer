import type { Metadata } from "next";
import { Inter } from "next/font/google";

// BOTH stylesheets, not one. `./styles` is tokens and layers only; the
// CSS-MODULE classes (Card, Button, Modal, the shells) live in `./styles.css`,
// and globals.css never imports its sibling.
//
// This app previously imported NEITHER, which meant no token in it resolved to
// anything: `data-theme` selected a ruleset that had never been loaded, and the
// only reason the app looked dark was a literal `#0f1117` inline on <body>.
// Every `var(--color-*)` in every page fell through to its fallback or to
// nothing. tenant-apps/app/layout.tsx has imported both since it was written.
import "@kannan19302/ui/styles";
import "@kannan19302/ui/styles.css";
import "./globals.css";

import { ThemeProvider } from "@kannan19302/ui/theme";
import { AuthShell } from "@/components/AuthShell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "UniERP Marketplace",
  description: "App, connector and extension marketplace — browse, install, manage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // `meridian-dark` rather than `meridian`: this app read as dark before, and
    // its landing page still carries its own dark literals until it is rebuilt
    // on CatalogShell (M7). Picking the light variant now would leave dark page
    // chrome sitting on a light ground. ThemeProvider persists the user's own
    // choice over the top.
    <html
      lang="en"
      className={inter.variable}
      data-theme="strata-dark"
      data-platform="marketplace"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider defaultSetting="strata-dark" defaultPlatform="marketplace">
          <AuthShell>{children}</AuthShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
