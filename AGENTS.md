<!-- UniERP-Agent-Protocol: 1.1.0 -->
# UniERP Repository Agent Entrypoint: Developer Platform (`developer-platform`)

This repository is one delivery unit in the UniERP polyrepo. Before analysis, planning, review, or mutation, every
AI agent from every provider MUST read and follow:

1. the workspace entrypoint at [`../AGENTS.md`](../AGENTS.md);
2. the canonical standard at
   [`../platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md`](../platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md);
3. the owning platform documents selected through
   [`../platform/docs/PLATFORM_CATALOG.md`](../platform/docs/PLATFORM_CATALOG.md).

If the workspace entrypoint or canonical standard is unavailable, the protocol bundle is incomplete. The agent
MUST stop before mutation and report the missing dependency. This bootstrap adds no weaker or conflicting rules.
Repository-specific additions may be appended below only when they narrow implementation behavior without
redefining platform ownership, security, contracts, or cross-platform standards.

---

## 1. Repository Identity & Mission

- **Repository**: `developer-platform`
- **Platform Owner**: `PLT-DEV` (Developer Platform), `PLT-MKT` (Marketplace), `PLT-SITE` (Site Studio)
- **Architectural Layer**: **Layer 4 (Application Presentation) & Layer 6 (Extensions)**
- **Runtime Ports**: `4004` (Developer Studio), `4005` (Marketplace)
- **Mission**: Host the **Developer Ecosystem & Visual Studio Workspace** — providing the visual low-code/no-code application builder, corporate site builder, third-party extension development kit, and solutions marketplace.

---

## 2. Monorepo Workspace Structure

This repository is governed as a unified, disciplined pnpm workspace:
- **`apps/studio` (`.`)**: Visual Application & Page Builder (port `4004`).
- **`marketplace`**: Solutions and Third-Party Extensions Catalog (port `4005`).
- **`extensions/*`**: Industry Vertical Extension Packages (`healthcare`, `education`, `field-service`, `real-estate`).

---

## 3. Zero-Trust Security & Safe Extensibility

1. **Sandboxed Code Execution**:
   - Visual studio preview code and extension scripts MUST execute in isolated sandbox environments; direct DOM injection or unvetted scripts are strictly forbidden.
2. **Tenant Isolation in Extensibility**:
   - Custom forms, workflows, and extensions MUST enforce tenant scoping. An extension published for Tenant A must never access Tenant B's data.
3. **Marketplace Verification**:
   - Solution packages must undergo static manifest analysis and cryptographic signing before publication.

---

## 4. Industrial Software Engineering Standards (Anti-Vibe-Coding)

1. **Strict Static Typing**:
   - Strict TypeScript configuration across root and sub-packages.
   - Extension contracts must strictly implement `@kannan19302/contracts`.
2. **Cohesive Workspace Toolchain**:
   - Zero duplicate `.gitignore`, `.gitleaks.toml`, or nested `.git` directories inside sub-packages.
   - Workspaces must share root dependencies cleanly.
3. **Strata DL 2.0 Compliance**:
   - Visual studio tools must use `WorkspaceStudio` and `CatalogShell` floorplans.
   - Complete token adherence from `@kannan19302/ui`.

---

## 5. Verification Gates & Mandatory Toolchain

Before declaring any cycle `DONE`, run and verify:

```powershell
pnpm typecheck              # Strict TypeScript verification
pnpm lint                   # ESLint standards check
node scripts/check-layer.mjs # Canonical Layer Gate enforcement
```
