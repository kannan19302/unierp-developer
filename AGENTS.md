    <!-- UniERP-Agent-Protocol: 1.1.0 -->
    # developer-platform agent rules

    This is the only repository agent instruction file. Read [the workspace entrypoint](../AGENTS.md),
    the [canonical protocol](../platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md),
    the enterprise brain, applicable accepted ADRs and the owning platform requirements before
    material work. Follow authority precedence; this file narrows implementation behavior only.
    If a required authority is missing, stop before mutation.

    **Layer:** L4 portal/marketplace; L6 extensions. **Accountable platform:** PLT-DEV with PLT-MKT and PLT-SITE. **Scope:** Developer portal, SDK experience and extension lifecycle.
    Resolve actual dependencies, packages and scripts from current manifests and the platform catalog.
    Preserve unrelated changes. Define numbered acceptance criteria and a knowledge delta before editing.
    For coordinated changes, publish the change contract, validate upstream first, and hand off
    to downstream consumers with exact evidence.

    ## Repository rules

    - Start from owned versioned API and SDK contracts; expose scoped credentials, quotas, diagnostics and deprecation honestly.
- Sandbox untrusted code with declared capabilities, tenant scope, egress, budgets, signing and revocation. Marketplace lifecycle needs separate owner proof.
- Prove one complete external developer journey before expanding builder or catalog breadth; never make private app imports the integration contract.

    ## Verification

    Run applicable commands from this repository, plus risk-specific contract, security, data,
    accessibility, integration, migration or release gates required by the canonical protocol:
    pnpm typecheck; pnpm lint; pnpm check:tokens; pnpm check:nav; pnpm build; focused pnpm test:e2e; node ../platform/workspace/scripts/check-layer.mjs

    A command's presence here is not proof that it ran. Report exact results, failures and NOT RUN
    reasons; review the diff; then follow the canonical status and source-control procedure.
