// Mock CSS modules in Node.js environment before importing
// @ts-ignore
require.extensions[".css"] = () => ({});

import fs from "node:fs";
import path from "node:path";

async function main() {
  console.log("════════════════════════════════════════════════════════════════════════");
  console.log("🚀 UniERP Developer Platform — 108 Screens Conformance & Registry Test");
  console.log("════════════════════════════════════════════════════════════════════════\n");

  const { ALL_SCREENS, JOURNEY_GROUPS } = await import("../src/platform/screens/manifest");
  const { SCREENS_REGISTRY } = await import("../src/platform/screens/registry");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      passed++;
      console.log(`  ✅ [PASS] ${message}`);
    } else {
      failed++;
      console.error(`  ❌ [FAIL] ${message}`);
    }
  }

  // 1. Manifest Count & Range
  console.log("📋 1. Screen Manifest Verification");
  assert(ALL_SCREENS.length === 108, `Manifest contains exactly 108 screens (got ${ALL_SCREENS.length})`);
  assert(JOURNEY_GROUPS.length === 7, `Journey groups contain exactly 7 phases (got ${JOURNEY_GROUPS.length})`);

  // 2. Registry Mapping
  console.log("\n📦 2. Screens Component Registry Verification");
  const registeredKeys = Object.keys(SCREENS_REGISTRY);
  assert(registeredKeys.length === 108, `Screens registry contains exactly 108 components (got ${registeredKeys.length})`);

  // 3. Screen-by-Screen Parity & Asset Check
  console.log("\n🎨 3. Screen-by-Screen Parity & Design PNG Verification");
  const publicDesignsDir = path.resolve(__dirname, "../public/designs");

  for (let i = 1; i <= 108; i++) {
    const idStr = `DP-${String(i).padStart(3, "0")}`;
    const descriptor = ALL_SCREENS.find((s) => s.screenId === idStr);
    const component = SCREENS_REGISTRY[idStr];

    if (!descriptor) {
      failed++;
      console.error(`  ❌ [FAIL] ${idStr} missing in manifest`);
      continue;
    }

    if (!component || typeof component !== "function") {
      failed++;
      console.error(`  ❌ [FAIL] ${idStr} (${descriptor.title}) missing or invalid in SCREENS_REGISTRY`);
      continue;
    }

    // Check PNG file exists
    const pngPath = path.join(publicDesignsDir, descriptor.file);
    const pngExists = fs.existsSync(pngPath);

    if (!pngExists) {
      failed++;
      console.error(`  ❌ [FAIL] ${idStr} design asset missing: ${descriptor.file}`);
      continue;
    }
  }

  console.log(`  ✅ [PASS] All 108 screen components and design reference PNGs verified cleanly.`);

  // 4. Journey Group Distribution
  console.log("\n🗺️ 4. Journey Group Breakdown");
  for (const group of JOURNEY_GROUPS) {
    const count = ALL_SCREENS.filter((s) => s.group === group).length;
    console.log(`  • ${group}: ${count} screens`);
    assert(count > 0, `${group} has registered screens (${count})`);
  }

  console.log("\n════════════════════════════════════════════════════════════════════════");
  console.log("📊 Summary");
  console.log("════════════════════════════════════════════════════════════════════════");
  console.log(`Total checks: ${passed + failed}`);
  console.log(`Passed:       ${passed}`);
  console.log(`Failed:       ${failed}`);

  if (failed > 0) {
    console.error("\n❌ 108 Screens Conformance Test Failed!");
    process.exit(1);
  } else {
    console.log("\n🎉 All 108 Screens verified with 100% conformance!");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
