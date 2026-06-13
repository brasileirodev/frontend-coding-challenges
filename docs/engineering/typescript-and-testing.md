# TypeScript And Testing

## Type Safety

The project uses strict TypeScript with unused symbol checks and isolated modules. New code must
pass those checks without suppressions.

- Parse external data from `unknown`; never trust `response.json()` through an annotation alone.
- Derive API/domain types from Zod schemas with `z.infer`.
- Derive finite unions from literal tuples when no runtime parser is needed.
- Use `import type` for type-only dependencies.
- Avoid `any`, broad `object`, unchecked `as`, `@ts-ignore`, and non-null assertions.
- Prefer discriminated unions for states with different valid payloads.
- Keep nullability intentional. `undefined`, `null`, empty string, and missing data must not be
  interchangeable without a documented meaning.

When a value has multiple semantic states, model them explicitly:

| Value shape    | Generic meaning                     |
| -------------- | ----------------------------------- |
| `undefined`    | not initialized or not selected yet |
| `null`         | explicitly no specific value        |
| concrete value | a specific valid selection          |

Use a discriminated union when these meanings become complex or when each state carries different
data.

## Component Contracts

- Extend native element attributes for reusable primitives.
- Keep required props required after boundary validation supplies guarantees.
- Prefer intent-specific callbacks over exposing store setters to presentational components.
- Preserve semantic HTML, accessible names, keyboard behavior, and meaningful alternatives.
- Do not use effects to derive values that can be calculated during render.
- Avoid boolean-prop combinations that permit invalid states; use variants or unions instead.

## Test Layers

### Pure functions and schemas

Test parsing, normalization, transformation, formatting, and query-key construction directly.
Include malformed external payloads and boundary values.

### API boundaries

Mock `fetch` at the boundary. Assert URL and options, abort-signal wiring, HTTP failures,
successful parsing, malformed payload rejection, and missing-resource normalization.

### Client stores

Reset stores before every test. Test actions, meaningful state transitions, persistence boundaries,
and the persisted representation. Avoid assertions coupled to middleware internals.

### Components

Use React Testing Library and `userEvent`. Query by role, name, and visible text. Test observable
behavior, including interactions nested inside navigable surfaces.

### Routes and queries

Create an isolated router and a fresh `QueryClient` with retries disabled. Test:

- search defaults and invalid-value normalization;
- typed navigation outcomes;
- loader prefetch and not-found behavior;
- cache separation by every server input and resource identifier;
- loading, error, empty, and successful rendering.

## Test Isolation

- Reset mocks and fake timers after each test.
- Provide explicit browser API implementations when the runtime does not supply reliable ones.
- Use a fresh query client per test and clear it after use.
- Avoid persistence leakage across tests by supplying test storage or clearing storage.
- Keep fixtures typed and representative without coupling them to implementation details.

## Required Verification

Run in this order:

```text
pnpm typecheck
pnpm test
pnpm build
```

For user-facing changes, also run `pnpm dev` and verify the affected route at
`http://localhost:3001`. Generated route-tree changes are expected only when route files change.
