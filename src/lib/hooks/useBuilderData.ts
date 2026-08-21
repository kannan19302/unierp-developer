import { useState, useEffect, useCallback } from "react";
import { useSession } from "@kannan19302/shared/auth-client/react";

/**
 * `localStorage.getItem("token")` never held anything — nothing in this app
 * ever wrote a "token" key there. Every request this hook made went out with
 * `Authorization: Bearer ` (empty), which the API would 401. It also
 * contradicted this stack's security posture directly: the access token
 * lives in memory only, deliberately never in localStorage, precisely so an
 * XSS payload can't read it back out — see the auth-client's own header
 * comment. `useSession().getAccessToken()` is the one correct source.
 */
export function useBuilderData<T>(endpoint: string, initialData: T[] = []) {
  const { getAccessToken } = useSession();
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);

  const authHeaders = useCallback((): HeadersInit => {
    const token = getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [getAccessToken]);

  const fetchIt = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/builder/${endpoint}`, {
        headers: authHeaders(),
      });

      if (res.ok) {
        const fetched = await res.json();
        if (fetched && Array.isArray(fetched)) {
          // No more Frankenstein merging of local mocked data!
          // We return exactly what the database gives us.
          setData(fetched);
        } else {
          setData([]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, authHeaders]);

  useEffect(() => {
    fetchIt();
  }, [fetchIt]);

  const createItem = async (payload: any) => {
    try {
      const res = await fetch(`/api/v1/builder/${endpoint}`, {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchIt();
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const updateItem = async (id: string | number, payload: any) => {
    try {
      const res = await fetch(`/api/v1/builder/${endpoint}/${id}`, {
        method: "PATCH",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchIt();
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const deleteItem = async (id: string | number) => {
    try {
      const res = await fetch(`/api/v1/builder/${endpoint}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        await fetchIt();
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  return {
    data,
    loading,
    refetch: fetchIt,
    createItem,
    updateItem,
    deleteItem,
  };
}
