"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, Shield, ArrowRight, CheckCircle2, Lock, Mail, Key } from "lucide-react";

export default function DeveloperLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("dev@unierp.com");
  const [password, setPassword] = useState("Developer@2026!");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 500);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--background, #090d16)", color: "var(--foreground, #ffffff)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <div style={{ width: "100%", maxWidth: "440px", background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
        
        {/* Logo & Title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
            <Terminal size={26} color="#3b82f6" />
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 0.5rem 0" }}>Developer Portal</h1>
          <p style={{ color: "#94a3b8", fontSize: "0.92rem", margin: 0 }}>
            Sign in to access API tokens, studio builders, and SDK sandbox.
          </p>
        </div>

        {/* Demo Credentials Alert */}
        <div style={{ background: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.2)", borderRadius: "8px", padding: "0.85rem 1rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "#93c5fd" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Key size={14} /> Default Autofilled Developer Account
          </div>
          <div>Email: <code>dev@unierp.com</code></div>
          <div>Password: <code>Developer@2026!</code></div>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.5rem" }}>
              Developer Email
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: "0.75rem 1rem 0.75rem 2.5rem", background: "rgba(0, 0, 0, 0.2)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", color: "#ffffff", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
              />
              <Mail size={16} color="#94a3b8" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <div style={{ marginBottom: "1.75rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.5rem" }}>
              API Access Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", padding: "0.75rem 1rem 0.75rem 2.5rem", background: "rgba(0, 0, 0, 0.2)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "8px", color: "#ffffff", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" }}
              />
              <Lock size={16} color="#94a3b8" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            style={{ width: "100%", padding: "0.85rem", background: success ? "#10b981" : "#3b82f6", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "1rem", cursor: loading || success ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "all 0.2s" }}
          >
            {loading ? (
              "Authenticating Developer..."
            ) : success ? (
              <>
                <CheckCircle2 size={18} /> Authenticated! Entering Studio...
              </>
            ) : (
              <>
                Sign In to Developer Studio <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link href="/" style={{ color: "#94a3b8", fontSize: "0.85rem", textDecoration: "none" }}>
            Skip to Developer Studio Workspace
          </Link>
        </div>

      </div>
    </div>
  );
}
