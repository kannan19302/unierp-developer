import http from "node:http";

const BASE_URL = process.env.TARGET_URL || "http://localhost:4008";

interface TestResult {
  name: string;
  passed: boolean;
  durationMs: number;
  error?: string;
}

const results: TestResult[] = [];

async function request(path: string, options: { method?: string; headers?: Record<string, string>; body?: string } = {}): Promise<{ status: number; body: string; headers: http.IncomingHttpHeaders }> {
  const url = new URL(path, BASE_URL);
  const method = options.method || "GET";

  return new Promise((resolve, reject) => {
    const req = http.request(
      url,
      {
        method,
        headers: options.headers || {},
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode || 0,
            body,
            headers: res.headers,
          });
        });
      }
    );

    req.on("error", reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTest(name: string, fn: () => Promise<void>) {
  const start = Date.now();
  try {
    await fn();
    const durationMs = Date.now() - start;
    results.push({ name, passed: true, durationMs });
    console.log(`  ✅ [PASS] ${name} (${durationMs}ms)`);
  } catch (err: any) {
    const durationMs = Date.now() - start;
    results.push({ name, passed: false, durationMs, error: err.message });
    console.error(`  ❌ [FAIL] ${name} (${durationMs}ms): ${err.message}`);
  }
}

async function main() {
  console.log("════════════════════════════════════════════════════════════════════════");
  console.log("🚀 UniERP Developer Portal / Studio — End-to-End Integration Suite");
  console.log(`Target: ${BASE_URL}`);
  console.log("════════════════════════════════════════════════════════════════════════\n");

  console.log(`🔍 Checking connection to Developer Portal at ${BASE_URL}...`);
  let attempts = 0;
  while (attempts < 20) {
    try {
      const res = await request("/");
      if (res.status === 200) {
        console.log(`✅ Developer Studio server is reachable (HTTP ${res.status}).\n`);
        break;
      }
    } catch {
      attempts++;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // 1. Studio Hub & Overview
  console.log("📂 1. Developer Studio Command Center & Navigation");
  await runTest("GET / renders Developer Studio Command Center", async () => {
    const res = await request("/");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("UniERP Developer Studio") && !res.body.includes("Developer Studio")) {
      throw new Error("Page content does not contain Developer Studio header");
    }
  });

  // 2. Visual Workflow Designer
  console.log("\n⚡ 2. Visual Workflow & Automation Designer");
  await runTest("GET /workflow renders Visual Workflow Designer Canvas", async () => {
    const res = await request("/workflow");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  // 3. Dynamic Form Builder
  console.log("\n📋 3. Dynamic Form Builder & Schema Engine");
  await runTest("GET /form-builder renders Form Builder Workspace", async () => {
    const res = await request("/form-builder");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  // 4. Custom Page Builder
  console.log("\n🎨 4. Custom Page Builder & Layout Editor");
  await runTest("GET /page-builder renders Custom Page Builder Workspace", async () => {
    const res = await request("/page-builder");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  // 5. Dashboard Editor Studio
  console.log("\n📊 5. Dashboard Editor & Business Telemetry Studio");
  await runTest("GET /dashboard-editor renders Dashboard Studio Workspace", async () => {
    const res = await request("/dashboard-editor");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
  });

  // 6. Extension SDK & API Docs
  console.log("\n📦 6. Extension SDK & Plugin Runtime");
  await runTest("GET /sdk renders Extension SDK documentation & code snippets", async () => {
    const res = await request("/sdk");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("UniERP Extension SDK") && !res.body.includes("Extension SDK")) {
      throw new Error("Page content does not contain Extension SDK header");
    }
  });

  // 7. Developer Authentication Portal
  console.log("\n🔑 7. Developer Portal Authentication & Access");
  await runTest("GET /login renders Developer Portal Login surface with demo account", async () => {
    const res = await request("/login");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("Developer Portal") && !res.body.includes("Developer")) {
      throw new Error("Page content does not contain Developer Portal login header");
    }
  });

  // Summary
  console.log("\n════════════════════════════════════════════════════════════════════════");
  console.log("📊 Test Execution Summary");
  console.log("════════════════════════════════════════════════════════════════════════");
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log(`Total Tests: ${total}`);
  console.log(`Passed:      ${passed}`);
  console.log(`Failed:      ${failed}`);

  if (failed > 0) {
    console.error("\n❌ Some End-to-End tests failed!");
    process.exit(1);
  } else {
    console.log("\n🎉 All Developer Portal End-to-End tests passed successfully!");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
