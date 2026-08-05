# unierp-developer

> Part of **[UniERP](https://github.com/kannan19302/UniERP)** — an open-source, self-hostable multi-tenant application platform.
> [Repository map](https://github.com/kannan19302/UniERP#repository-map) · [Architecture](https://github.com/kannan19302/UniERP#how-the-pieces-fit-at-runtime) · [Contributing](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md) · [Security](https://github.com/kannan19302/UniERP/blob/main/SECURITY.md)

**Layer L4 — Presentation** of the UniERP platform. Depends on: the SDK and the design system.

## What this is

The developer platform: App Studio, the workflow/form/report builders, and the surface where a tenant creates or edits business logic and content without touching core source.

## The invariant this repository owns

**Everything it offers must go through the public extension API.** If Studio needs a privileged path that an external developer cannot use, the platform has two APIs and only one of them is honest.

## The rule that applies everywhere

A repository may depend only on published artifacts of a **strictly lower
layer** — never sideways within a layer, never upward. A cycle is not
discouraged; it is unrepresentable, because the lower layer's package cannot
name the higher one.

## Licence

AGPL-3.0.
