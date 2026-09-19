"use client";

import { useEffect, useRef, useState } from "react";
import { Layers, AlertTriangle } from "lucide-react";
import { createOidcClient } from "@/lib/oidc-config";
import styles from "../states/auth-states.module.css";

/**
 * The OIDC callback for unierp-developer-platform.
 * Renders State 2 ("Completing sign-in...") during exchange,
 * and State 3 ("Session could not be completed") if exchange fails.
 */
export default function CallbackPage() {
  const [error, setError] = useState<string | null>(null);
  const [refCode, setRefCode] = useState<string>("AUTH-DEMO-01");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      try {
        const client = createOidcClient();
        const { tokens, returnTo } = await client.handleCallback(window.location.href);

        if (tokens.refreshToken) {
          await fetch("/api/session", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ refreshToken: tokens.refreshToken }),
            credentials: "include",
          });
        }

        window.location.assign(returnTo || "/");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Sign-in failed");
        setRefCode(`AUTH-ERR-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    })();
  }, []);

  if (error) {
    return (
      <div className={styles.standaloneAuthWrapper}>
        <div className={styles.standaloneAuthCard}>
          <div className={`${styles.previewIcon} ${styles.previewIconError}`}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.previewBrand}>UniERP Developer</div>
          <div className={`${styles.previewStatus} ${styles.previewStatusError}`}>
            We couldn't complete your session
          </div>
          <span className={styles.referenceCode}>Reference: {refCode}</span>
          <div className={styles.previewText}>
            {error}. You can try again or return home.
          </div>
          <div className={styles.previewActions}>
            <button
              type="button"
              className={styles.previewBtnPrimary}
              onClick={() => window.location.assign("/login")}
            >
              Try again
            </button>
            <button
              type="button"
              className={styles.previewBtnSecondary}
              onClick={() => window.location.assign("/")}
            >
              Return home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.standaloneAuthWrapper}>
      <div className={styles.standaloneAuthCard}>
        <div className={styles.previewIcon}>
          <Layers size={24} />
        </div>
        <div className={styles.previewBrand}>UniERP Developer</div>
        <div className={styles.previewStatus}>Completing sign-in...</div>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} />
        </div>
        <div className={styles.previewText}>
          Restoring your requested project.{"\n"}Please wait.
        </div>
      </div>
    </div>
  );
}
