"use client";

/**
 * The home page.
 *
 * Lists the tenant's actual apps and sites, fetched live, plus a recents rail
 * and a create action for each. All three come from `/dev/*` (plan phase P1's
 * `DevProject` / `DevProjectRecent` surface) — see
 * `src/platform/data/projects.ts`.
 *
 * The layout is rows, not a card grid. Every project has four facts a user
 * scans across — name, address, state, last touched — and a card wall puts
 * those four in four different corners of each tile, so comparing two
 * projects means reading two whole cards. Rows align them into columns, and
 * the scope edge runs down one vertical line the eye can track. Cards earn
 * their place in the recents rail, where the set is short, horizontal, and
 * compared by recency rather than by attribute.
 */

import Link from "next/link";
import { useApiClient } from "@kannan19302/framework";
import {
  PageLoadingState,
  PageErrorState,
  Button,
  StatusBadge,
  ArtifactAddress,
} from "@kannan19302/ui";
import { LayoutGrid, Globe, Plus, History, Library } from "lucide-react";
import { useAsyncData } from "@/platform/data/useAsyncData";
import {
  getHome,
  listRecents,
  type ProjectSummary,
  type RecentProject,
} from "@/platform/data/projects";
import styles from "@/components/platform/platform-page.module.css";
import { relativeTime } from "@/components/platform/relative-time";

function ProjectRows({
  items,
  kind,
}: {
  items: ProjectSummary[];
  kind: "app" | "site";
}) {
  const base = kind === "app" ? "/apps" : "/sites";
  return (
    <div className={styles.rows}>
      {items.map((item) => (
        <Link
          key={item.id}
          href={`${base}/${item.id}`}
          className={`${styles.row} ${kind === "app" ? styles.row_app : styles.row_site}`}
        >
          <div className={styles.row_main}>
            <span className={styles.row_name}>{item.name}</span>
            {item.description && (
              <span className={styles.row_desc}>{item.description}</span>
            )}
          </div>

          <span className={styles.row_address}>
            <ArtifactAddress scope={kind} project={item.id} size="sm" />
          </span>

          <span className={styles.row_state}>
            <StatusBadge status={item.status} />
          </span>

          <span className={styles.row_meta}>
            {item.updatedAt ? relativeTime(item.updatedAt) : "—"}
          </span>
        </Link>
      ))}
    </div>
  );
}

function Section({
  title,
  icon,
  count,
  action,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <div className={styles.section_head}>
        <h2 className={styles.section_title}>
          {icon}
          {title}
          {count && <span className={styles.section_count}>{count}</span>}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Empty({
  title,
  body,
  actions,
}: {
  title: string;
  body: string;
  actions: React.ReactNode;
}) {
  return (
    <div className={styles.empty}>
      <p className={styles.empty_title}>{title}</p>
      <p className={styles.empty_body}>{body}</p>
      <div className={styles.empty_actions}>{actions}</div>
    </div>
  );
}

function RecentsRail({ items }: { items: RecentProject[] }) {
  if (items.length === 0) return null;
  return (
    <Section title="Recently opened" icon={<History size={17} />}>
      <div className={styles.rail}>
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${item.kind === "site" ? "sites" : "apps"}/${item.id}`}
            className={`${styles.recent} ${
              item.kind === "site" ? styles.row_site : styles.row_app
            }`}
          >
            <span className={styles.recent_name}>{item.name}</span>
            <ArtifactAddress scope={item.kind} project={item.id} size="sm" />
            <span className={styles.recent_when}>
              {relativeTime(item.lastOpenedAt)}
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export default function DeveloperPlatformHome() {
  const client = useApiClient();
  const home = useAsyncData(() => getHome(client), []);
  const recents = useAsyncData(() => listRecents(client), []);

  if (home.loading) return <PageLoadingState />;
  if (home.error)
    return (
      <PageErrorState description={home.error.message} onRetry={home.refetch} />
    );

  const apps = home.data?.apps ?? [];
  const sites = home.data?.sites ?? [];
  const nothingYet = apps.length === 0 && sites.length === 0;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <div className={styles.head_text}>
          <p className={styles.eyebrow}>Developer platform</p>
          <h1 className={styles.title}>
            {nothingYet ? "Start building" : "Your apps and sites"}
          </h1>
          <p className={styles.subtitle}>
            {nothingYet
              ? "An app holds forms, workflows and data models for the people who work here. A site is what everyone else sees."
              : "Everything this tenant builds. Open a project to work on its forms, workflows, pages and releases."}
          </p>
        </div>
        <div className={styles.head_actions}>
          <Link href="/library">
            <Button variant="ghost" size="sm" leftIcon={<Library size={15} />}>
              Library
            </Button>
          </Link>
          <Link href="/apps/new">
            <Button variant="primary" size="sm" leftIcon={<Plus size={15} />}>
              New app
            </Button>
          </Link>
        </div>
      </header>

      {!recents.loading && !recents.error && (
        <RecentsRail items={recents.data ?? []} />
      )}

      <Section
        title="Apps"
        icon={<LayoutGrid size={17} />}
        count={apps.length > 0 ? `${apps.length}` : undefined}
        action={
          apps.length > 0 ? (
            <Link href="/apps/new">
              <Button variant="ghost" size="sm" leftIcon={<Plus size={14} />}>
                New app
              </Button>
            </Link>
          ) : undefined
        }
      >
        {apps.length === 0 ? (
          <Empty
            title="No apps yet"
            body="An app is where forms, workflows and data models live for one team or one process. Build one here, or start from something already in the library."
            actions={
              <>
                <Link href="/apps/new">
                  <Button variant="primary" size="sm">
                    New app
                  </Button>
                </Link>
                <Link href="/library">
                  <Button variant="secondary" size="sm">
                    Browse library
                  </Button>
                </Link>
              </>
            }
          />
        ) : (
          <ProjectRows items={apps} kind="app" />
        )}
      </Section>

      <Section
        title="Sites"
        icon={<Globe size={17} />}
        count={sites.length > 0 ? `${sites.length}` : undefined}
        action={
          sites.length > 0 ? (
            <Link href="/sites/new">
              <Button variant="ghost" size="sm" leftIcon={<Plus size={14} />}>
                New site
              </Button>
            </Link>
          ) : undefined
        }
      >
        {sites.length === 0 ? (
          <Empty
            title="No sites yet"
            body="A site is the public face of this tenant — pages, menus and posts, published to a domain you control."
            actions={
              <Link href="/sites/new">
                <Button variant="primary" size="sm">
                  New site
                </Button>
              </Link>
            }
          />
        ) : (
          <ProjectRows items={sites} kind="site" />
        )}
      </Section>
    </div>
  );
}
