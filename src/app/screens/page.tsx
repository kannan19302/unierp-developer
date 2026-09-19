"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScreensIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/screens/DP-001");
  }, [router]);

  return (
    <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)" }}>
      Redirecting to Screen DP-001...
    </div>
  );
}
