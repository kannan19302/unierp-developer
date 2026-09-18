"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, Circle, Loader2, Sparkles } from "lucide-react";
import { useApiClient } from "@kannan19302/framework";

const CHECKLIST_KEYS = [
  "profile",
  "logo",
  "invite",
  "app",
  "plan",
  "dashboard",
] as const;

type ChecklistKey = (typeof CHECKLIST_KEYS)[number];

interface ChecklistState extends Record<ChecklistKey, boolean> {
  checklistOrder?: ChecklistKey[];
}

interface ChecklistItem {
  label: string;
  href: string;
}

const ITEMS: Record<ChecklistKey, ChecklistItem> = {
  profile: { label: "Complete your profile", href: "/profile" },
  logo: { label: "Upload organization logo", href: "/settings/general" },
  invite: { label: "Invite your first team member", href: "/saas/portal#invite-section" },
  app: { label: "Install your first app", href: "/apps/store" },
  plan: { label: "Choose a subscription plan", href: "/saas/portal#plans-section" },
  dashboard: { label: "Explore the dashboard", href: "/apps" },
};

const EMPTY_STATE: ChecklistState = {
  profile: false,
  logo: false,
  invite: false,
  app: false,
  plan: false,
  dashboard: false,
};

export interface OnboardingChecklistProps {
  variant: "compact" | "full";
  show?: boolean;
  autoCompleteDashboard?: boolean;
}

export function OnboardingChecklist({
  variant,
  show = true,
  autoCompleteDashboard = false,
}: OnboardingChecklistProps) {
  const client = useApiClient();
  const [state, setState] = useState<ChecklistState>(EMPTY_STATE);
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const refresh = useCallback(async () => {
    setSyncing(true);
    try {
      const current = await client.get<ChecklistState>("/auth/onboarding");
      if (!current) return;
      setState(current);
      if (autoCompleteDashboard && !current.dashboard) {
        const updated = await client.put<ChecklistState>(
          "/auth/onboarding/complete/dashboard",
          {},
        );
        if (updated) setState(updated);
      }
    } catch {
      // The checklist is progressive guidance and must never block the workspace.
    } finally {
      setLoaded(true);
      setSyncing(false);
    }
  }, [autoCompleteDashboard, client]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const refreshWhenVisible = () => {
      if (document.visibilityState !== "hidden") void refresh();
    };
    window.addEventListener("focus", refreshWhenVisible);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      window.removeEventListener("focus", refreshWhenVisible);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [refresh]);

  const orderedKeys = useMemo(() => {
    const serverOrder = (state.checklistOrder ?? []).filter(
      (key): key is ChecklistKey => CHECKLIST_KEYS.includes(key),
    );
    return [
      ...serverOrder,
      ...CHECKLIST_KEYS.filter((key) => !serverOrder.includes(key)),
    ];
  }, [state.checklistOrder]);

  const completed = CHECKLIST_KEYS.filter((key) => state[key]).length;
  const percent = Math.round((completed / CHECKLIST_KEYS.length) * 100);

  if (!show || !loaded || (variant === "compact" && completed === CHECKLIST_KEYS.length)) {
    return null;
  }

  return (
    <section
      aria-labelledby="marketplace-onboarding-title"
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg, 12px)",
        background: "var(--color-bg-elevated)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="marketplace-onboarding-steps"
        onClick={() => setExpanded((value) => !value)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "var(--space-3) var(--space-4)",
          border: 0,
          background: "transparent",
          color: "var(--color-text)",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <Sparkles size={17} aria-hidden="true" color="var(--color-warning)" />
        <strong id="marketplace-onboarding-title" style={{ flex: 1 }}>
          Get started with UniERP
        </strong>
        <span aria-label={`${completed} of ${CHECKLIST_KEYS.length} completed`}>
          {completed}/{CHECKLIST_KEYS.length}
        </span>
        {syncing ? (
          <Loader2 size={16} aria-label="Synchronizing progress" />
        ) : (
          <ChevronDown
            size={17}
            aria-hidden="true"
            style={{ transform: expanded ? "rotate(180deg)" : undefined }}
          />
        )}
      </button>

      {expanded && (
        <div id="marketplace-onboarding-steps" style={{ padding: "0 var(--space-4) var(--space-4)" }}>
          <div
            role="progressbar"
            aria-label="Workspace setup progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            style={{
              height: 6,
              borderRadius: 999,
              overflow: "hidden",
              background: "var(--color-bg-subtle)",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: `${percent}%`,
                height: "100%",
                background: "var(--color-primary)",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            {orderedKeys.map((key) => (
              <Link
                key={key}
                href={ITEMS[key].href}
                aria-label={`${ITEMS[key].label}${state[key] ? ", completed" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  minHeight: 40,
                  color: state[key] ? "var(--color-text-muted)" : "var(--color-text)",
                  textDecoration: "none",
                }}
              >
                {state[key] ? (
                  <CheckCircle2 size={17} aria-hidden="true" color="var(--color-success)" />
                ) : (
                  <Circle size={17} aria-hidden="true" />
                )}
                <span>{ITEMS[key].label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
