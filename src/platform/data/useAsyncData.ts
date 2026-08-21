"use client";

/**
 * A plain fetch-on-mount hook, not a `@tanstack/react-query` wrapper.
 *
 * `@kannan19302/framework` uses react-query internally, but it is not a
 * direct dependency of this app's `package.json` — only a transitive one
 * through `framework`, and pnpm's strict resolution does not guarantee that
 * resolves for code outside `framework` itself. Rather than add a dependency
 * as a side effect of one hook, this matches the pattern the eight existing
 * `useBuilderData` call sites already use. Revisit if `platform/data/` grows
 * enough call sites that request de-duplication and caching are worth the
 * added dependency.
 */

import { useCallback, useEffect, useState } from "react";

export interface AsyncData<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useAsyncData<T>(
  fetcher: () => Promise<T>,
  deps: unknown[],
): AsyncData<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tick, setTick] = useState(0);

  const stableFetcher = useCallback(fetcher, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    stableFetcher()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [stableFetcher, tick]);

  return { data, loading, error, refetch: () => setTick((t) => t + 1) };
}
