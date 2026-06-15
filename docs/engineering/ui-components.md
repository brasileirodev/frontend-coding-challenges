# UI Components And Atomic Design

## Purpose

This document defines how reusable UI is identified, organized, and consumed. Atomic Design is a
classification tool for visual responsibilities; it must not move route orchestration, business
rules, remote data, navigation state, or client stores into the shared component library.

## Structure

```text
src/lib/components/
  atoms/
    ComponentName/
      ComponentName.tsx
      ComponentName.test.tsx
      index.ts
  molecules/
    ComponentName/
      ComponentName.tsx
      ComponentName.test.tsx
      index.ts
  index.ts
```

Create `organisms/` only when a domain-agnostic composition is reused by multiple routes. Do not
create empty Atomic Design layers for symmetry. Route-specific compositions remain in the nearest
`-components` directory even when they are visually complex.

## Layer Responsibilities

### Atoms

Atoms are small UI primitives with no product or domain meaning. They may own visual variants,
native interaction behavior, accessibility defaults, and class merging.

Examples include buttons, icon buttons, loading indicators, decorative icons, inputs, labels, and
surface primitives.

An atom must:

- extend the relevant native HTML attributes;
- expose finite visual choices through typed variants;
- preserve semantic HTML and keyboard behavior;
- accept `className` for layout-level extension;
- avoid router, query, store, API, or domain imports.

### Molecules

Molecules combine atoms and small pieces of typography or layout into one reusable interaction or
content pattern. They may describe UI intent, but they remain controlled and receive state and
callbacks from their consumer.

Examples include a toggle action with its icon and accessible labels, a feedback message with
actions, or a titled information group.

A molecule must:

- receive data, state, and intent-specific callbacks through props;
- avoid reading Zustand, React Query, route params, or search params directly;
- keep variants tied to observed layout differences;
- delegate primitive behavior to atoms instead of recreating it.

### Organisms And Route Components

An organism is a reusable composition of atoms and molecules that stays independent from one
feature. A component that coordinates domain records, queries, stores, loaders, navigation, or
feature-specific transformations belongs beside its route instead.

Atomic size is not determined by line count. A large presentational composition can be a molecule,
while a small component that reads route state is still a route component.

## Promotion Rules

Keep a component local when it has one feature-specific consumer. Promote it to
`src/lib/components` when at least one condition is true:

- the same visual behavior has two or more real consumers;
- it is an application-wide primitive such as a button or input;
- a second implementation would duplicate interaction, accessibility, or visual-state logic;
- its variants are already demonstrated by existing layouts.

Do not promote speculative components or add generic props for hypothetical use cases. Extract the
stable shared behavior and leave positioning, data access, and feature composition with consumers.

## Component APIs

- Prefer discriminated unions or literal variants over multiple booleans that can conflict.
- Extend native element props and forward them to the semantic root element.
- Use controlled props such as `isSelected` and `onToggle`; shared UI must not own application
  state.
- Name callbacks by intent, not implementation details.
- Provide accessibility labels in the component when they can be derived from its public intent.
- Use the shared `cn` helper to merge defaults, variants, and consumer `className` values.
- Keep layout placement such as absolute coordinates, grid spans, and route spacing in the
  consumer unless it is intrinsic to the component.
- Use compound components only when the parts form one cohesive API and are not meaningful as
  independent shared primitives.

## Imports And Exports

Each component folder owns an `index.ts`. Atomic layers expose their public components through a
layer barrel, and `src/lib/components/index.ts` is the application-facing entry point.

Consumers should use:

```ts
import { Button, FeedbackState } from "@lib/components";
```

Components inside the shared library may import a lower layer directly when that dependency makes
the hierarchy clear:

```ts
import { IconButton } from "@lib/components/atoms";
```

Atoms must not import molecules. Shared components must not import route-local modules.

## Styling

- Keep Tailwind classes with the component that owns the visual behavior.
- Model established differences with typed variants before accepting arbitrary style flags.
- Use `className` to adjust placement or a small contextual difference, not to replace the entire
  component contract.
- Preserve project typography and color tokens; introduce a global token only when it is reused
  across independent components.
- Avoid duplicating the complete class list of an existing atom or molecule.

## Testing

Atoms require tests for native behavior, accessibility defaults, meaningful variants, and class
merging. Molecules require tests for their public states, accessible names, and callback behavior.

Feature tests should continue to verify that route components pass the correct state and intent to
shared UI. Do not retest private Tailwind implementation details at every consumer.

## Review Checklist

- Is this component shared because of real reuse or only anticipated reuse?
- Does its layer match its dependencies and state ownership?
- Is the API controlled, typed, semantic, and accessible?
- Are visual differences represented by observed variants?
- Does the consumer retain domain data, navigation, and store orchestration?
- Is an existing atom or molecule being recreated instead of reused?
- Are exports, focused tests, and documentation updated?
