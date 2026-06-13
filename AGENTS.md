# Repository Engineering Rules

## Scope

Apply these rules to every change in this repository. Existing implementations are evidence to
inspect, not architectural rules to copy automatically.

Before implementing or reviewing code, read the relevant document in `docs/engineering/` and use
the repo skill at `.agents/skills/frontend-architecture/SKILL.md`.

## Commands

- Use `pnpm`; do not create npm or Yarn lockfiles.
- Run `pnpm typecheck`, `pnpm test`, and `pnpm build` before considering a change complete.
- Run `pnpm dev` and verify the affected route in a browser for user-facing changes.
- Do not edit `src/routeTree.gen.ts`; TanStack Router generates it.

## Architecture

- Keep route-specific components and hooks beside their route in `-components` and `-hooks`.
- Put code in `src/lib` only when shared by multiple routes or when it represents an
  application-wide boundary such as API access, schemas, state, or reusable UI.
- Keep route files focused on URL validation, loaders, route-level states, and composition.
- Keep components presentational when possible; move data orchestration to route loaders, query
  options, or focused hooks.

## State Ownership

- React Query owns remote/server state. Do not copy fetched resources into Zustand or local
  component state.
- TanStack Router search params own shareable navigation state such as filters, sorting, search,
  pagination, and view modes.
- Zustand owns durable client-only preferences and actions. Persist only the durable subset.
- Local React state owns ephemeral UI state that does not need to survive navigation or reload.
- Derive transformed values instead of storing duplicated derived state.

## React Query

- Define reusable `queryOptions` factories for server resources.
- Include every server request input used by a query function in its query key.
- Reuse the same query options in route loaders and components.
- Route loaders prefetch with `context.queryClient.ensureQueryData(...)`; components subscribe
  with `useSuspenseQuery` or `useQuery` using the same options.
- Pass React Query's `AbortSignal` to `fetch`.
- Validate API payloads at the network boundary and derive TypeScript types from schemas.
- Choose `staleTime`, garbage collection, retry, and refetch behavior intentionally.

## TanStack Router

- Use file-based routes and typed `Link`, navigation, route params, and search params.
- Validate search params at the route boundary. Never cast raw URL values.
- Use loaders for route-critical data and `notFound()` for missing route resources.
- Provide route-appropriate pending, error, and not-found behavior.
- Prefer declarative `Link` navigation. Use router history only for explicit history semantics.

## TypeScript

- Keep strict mode passing. Do not add `any`, unchecked casts, or non-null assertions to bypass
  the type system.
- Use `import type` for type-only imports.
- Model finite values with schemas, literal tuples, or discriminated unions.
- Prefer required domain fields after boundary validation; represent real optionality explicitly.
- Keep component props and public function return types intentional and narrow.

## Tests

- Test behavior and public contracts, not implementation details.
- Cover query keys/options, API validation and errors, search-param defaults, loaders, store
  actions/persistence, and user-visible behavior when those areas change.
- Reset global stores, mocks, query clients, and browser APIs between tests.
