import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

console.log("============================================================");
console.log("TEST SUITE: DP-001 Sign-in Handoff & Callback Recovery");
console.log("============================================================");

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passed++;
  } catch (err: any) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
    failed++;
  }
}

// 1. Verify Page & Component Exists
test("DP-001 Canonical Page file exists", () => {
  const pagePath = path.resolve(__dirname, "../src/app/auth/states/page.tsx");
  assert.ok(fs.existsSync(pagePath), "auth/states/page.tsx must exist");
  const content = fs.readFileSync(pagePath, "utf-8");
  assert.ok(content.includes("Authentication flow state specification"), "Must contain canonical heading");
});

// 2. Verify Canonical 3 States
test("DP-001 State 1: Sign-in handoff specification", () => {
  const pagePath = path.resolve(__dirname, "../src/app/auth/states/page.tsx");
  const content = fs.readFileSync(pagePath, "utf-8");
  assert.ok(content.includes("Sign-in handoff"), "State 1 title must exist");
  assert.ok(content.includes("Initiates secure sign-in by redirecting the user to the Hosted Identity provider."), "State 1 purpose must match PNG");
  assert.ok(content.includes("Validates request and prepares authentication context"), "State 1 system action 1 must match");
  assert.ok(content.includes("Redirects to identity provider for authentication"), "State 1 system action 2 must match");
  assert.ok(content.includes("No credentials are collected on this page"), "State 1 system action 3 must match");
  assert.ok(content.includes("On successful handoff →"), "State 1 transition must match");
});

test("DP-001 State 2: Completing sign-in specification", () => {
  const pagePath = path.resolve(__dirname, "../src/app/auth/states/page.tsx");
  const content = fs.readFileSync(pagePath, "utf-8");
  assert.ok(content.includes("Completing sign-in"), "State 2 title must exist");
  assert.ok(content.includes("Restores the requested Developer project after hosted Identity sign-in."), "State 2 purpose must match PNG");
  assert.ok(content.includes("Validates authentication response"), "State 2 system action 1 must match");
  assert.ok(content.includes("Establishes user session"), "State 2 system action 2 must match");
  assert.ok(content.includes("Restores requested project and user context"), "State 2 system action 3 must match");
  assert.ok(content.includes("Redirect to requested project"), "State 2 transition must match");
});

test("DP-001 State 3: Session could not be completed specification", () => {
  const pagePath = path.resolve(__dirname, "../src/app/auth/states/page.tsx");
  const content = fs.readFileSync(pagePath, "utf-8").replace(/\s+/g, " ");
  assert.ok(content.includes("Session could not be completed"), "State 3 title must exist");
  assert.ok(content.includes("Informs the user that the session could not be established and provides safe recovery options."), "State 3 purpose must match PNG");
  assert.ok(content.includes("AUTH-DEMO-01"), "State 3 reference code must match PNG");
  assert.ok(content.includes("Clears partial session artifacts"), "State 3 system action 1 must match");
  assert.ok(content.includes("Logs telemetry for diagnostics"), "State 3 system action 2 must match");
  assert.ok(content.includes("Keeps user data secure"), "State 3 system action 3 must match");
  assert.ok(content.includes("Developer home"), "State 3 transition to home must match");
});

// 3. Verify Bottom Session Banner
test("DP-001 Sticky session expired banner & recovery", () => {
  const pagePath = path.resolve(__dirname, "../src/app/auth/states/page.tsx");
  const content = fs.readFileSync(pagePath, "utf-8");
  assert.ok(content.includes("showSessionBanner"), "Must maintain session banner state");
  assert.ok(content.includes("onBannerReauthenticate"), "Must wire reauthenticate action");
  assert.ok(content.includes("onBannerReturnHome"), "Must wire return home action");
  
  const layoutPath = path.resolve(__dirname, "../src/components/strata/StrataWorkbenchLayout.tsx");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");
  assert.ok(layoutContent.includes("Your session has expired."), "Layout must contain expired title");
  assert.ok(layoutContent.includes("Reauthenticate to resume. Unsynced changes remain pending."), "Layout must contain expired subtitle");
});

// 4. Verify Tabs and Navigation Groups
test("DP-001 4-Tab workflow and Sidebar groupings", () => {
  const pagePath = path.resolve(__dirname, "../src/app/auth/states/page.tsx");
  const content = fs.readFileSync(pagePath, "utf-8");
  assert.ok(content.includes("Authentication flow"), "Tab 1 must exist");
  assert.ok(content.includes("State specification"), "Tab 2 must exist");
  assert.ok(content.includes("Flow diagram"), "Tab 3 must exist");
  assert.ok(content.includes("User story"), "Tab 4 must exist");
  assert.ok(content.includes("AUTH FLOW"), "AUTH FLOW sidebar group must exist");
  assert.ok(content.includes("VALIDATION"), "VALIDATION sidebar group must exist");
  assert.ok(content.includes("ACTIVITY"), "ACTIVITY sidebar group must exist");
  assert.ok(content.includes("CONFIG"), "CONFIG sidebar group must exist");
});

// 5. Verify Runtime Auth Alignment
test("DP-001 Runtime /login and /auth/callback visual alignment", () => {
  const loginPath = path.resolve(__dirname, "../src/app/login/page.tsx");
  const loginContent = fs.readFileSync(loginPath, "utf-8");
  assert.ok(!loginContent.includes("<input"), "Zero credential input fields on login page per FND-08");
  assert.ok(loginContent.includes("Continue to secure sign-in"), "Login page matches State 1 UI");

  const callbackPath = path.resolve(__dirname, "../src/app/auth/callback/page.tsx");
  const callbackContent = fs.readFileSync(callbackPath, "utf-8");
  assert.ok(callbackContent.includes("Completing sign-in..."), "Callback page matches State 2 UI");
  assert.ok(callbackContent.includes("We couldn't complete your session"), "Callback page matches State 3 UI");
});

console.log("============================================================");
console.log(`TOTAL: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log("============================================================");

if (failed > 0) {
  process.exit(1);
}
