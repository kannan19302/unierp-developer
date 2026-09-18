import http from "node:http";

const BASE_URL = process.env.TARGET_URL || "http://localhost:4007";

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
  console.log("🚀 UniERP Marketplace — End-to-End Integration Suite");
  console.log(`Target: ${BASE_URL}`);
  console.log("════════════════════════════════════════════════════════════════════════\n");

  console.log(`🔍 Checking connection to Marketplace at ${BASE_URL}...`);
  let attempts = 0;
  while (attempts < 20) {
    try {
      const res = await request("/");
      if (res.status === 200) {
        console.log(`✅ Marketplace server is reachable (HTTP ${res.status}).\n`);
        break;
      }
    } catch {
      attempts++;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // 1. Marketplace Storefront & Catalog
  console.log("📂 1. Marketplace Storefront & Catalog (Core & Industry Apps)");
  await runTest("GET / renders Marketplace Storefront with Core & Industry Apps", async () => {
    const res = await request("/");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("Marketplace")) {
      throw new Error("Page content does not contain Marketplace header");
    }
    // Check that Core Apps and Industry Verticals are present
    if (!res.body.includes("Financial Management") && !res.body.includes("Finance")) {
      throw new Error("Core Finance app missing from catalog");
    }
    if (!res.body.includes("Healthcare") && !res.body.includes("Hospital")) {
      throw new Error("Industry Healthcare app missing from catalog");
    }
  });

  // 2. Categories Directory
  console.log("\n📋 2. Categories Directory (Core ERP, Industry Verticals, Connectors)");
  await runTest("GET /categories renders grouped architectural categories", async () => {
    const res = await request("/categories");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("Categories") && !res.body.includes("Core ERP")) {
      throw new Error("Categories page does not contain expected section headers");
    }
  });

  // 3. Discover Hub
  console.log("\n🧭 3. Discover Hub (Featured & Trending Solutions)");
  await runTest("GET /discover renders Featured & Industry Vertical spotlights", async () => {
    const res = await request("/discover");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("Discover") && !res.body.includes("Spotlight")) {
      throw new Error("Discover page does not contain expected headers");
    }
  });

  // 4. Cloud Connectors Hub
  console.log("\n🔌 4. Cloud Connectors & API Gateways Hub");
  await runTest("GET /connectors renders verified payment & messaging connectors", async () => {
    const res = await request("/connectors");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("Connectors") && !res.body.includes("Stripe")) {
      throw new Error("Connectors page does not contain expected content");
    }
  });

  // 5. Active Installed Apps Manager
  console.log("\n✅ 5. Active Installed Applications Manager");
  await runTest("GET /installed renders active tenant package registry", async () => {
    const res = await request("/installed");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("Installed Apps") && !res.body.includes("Active")) {
      throw new Error("Installed page does not contain expected header");
    }
  });

  // 6. Application Updates Manager
  console.log("\n🔄 6. Application Lifecycle & Updates Tracker");
  await runTest("GET /updates renders package update manager & changelog diffs", async () => {
    const res = await request("/updates");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("Updates") && !res.body.includes("Package")) {
      throw new Error("Updates page does not contain expected header");
    }
  });

  // 7. Marketplace Login Portal
  console.log("\n🔑 7. Marketplace Authentication Portal");
  await runTest("GET /login renders Publisher / Tenant login with demo account", async () => {
    const res = await request("/login");
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body.includes("Marketplace Portal") && !res.body.includes("Publisher")) {
      throw new Error("Login page does not contain expected publisher header");
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
    console.log("\n🎉 All Marketplace End-to-End tests passed successfully!");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
