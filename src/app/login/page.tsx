"use client";

import { useEffect } from "react";
import { useSession } from "@kannan19302/shared/auth-client/react";
import { Globe } from "lucide-react";
import styles from "../auth/states/auth-states.module.css";

/**
 * Sign-in handoff route (State 1 of DP-001).
 * Credentials are entered at the hosted OIDC identity provider.
 * This route initiates the PKCE sign-in and shows the State 1 handoff animation.
 */
export default function LoginPage() {
  const { status, signIn } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn({ returnTo: "/" });
    } else if (status === "authenticated") {
      window.location.assign("/");
    }
  }, [status, signIn]);

  return (
    <div className={styles.standaloneAuthWrapper}>
      <div className={styles.standaloneAuthCard}>
        <div className={styles.previewIcon}>
          <Globe size={24} />
        </div>
        <div className={styles.previewBrand}>UniERP Developer</div>
        <div className={styles.previewStatus}>Continue to secure sign-in</div>
        <div className={styles.dotsStepper} aria-label="Step 1 of 3">
          <span className={`${styles.dot} ${styles.dotActive}`} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.previewText}>
          Redirecting to sign-in...{"\n"}You will be signed in securely.
        </div>
      </div>
    </div>
  );
}
