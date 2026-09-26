# Addis Eats — Mesob House

## What it is

A full-stack-style React frontend for an Ethiopian restaurant ordering platform.
Customers browse a live menu, view dish details, build a cart, create an
account, and check out — all backed by a real external API
(`addis-eats-backend.onrender.com`) rather than mock data.

## Core features

- **Live menu data** — `/menu` and `/menu/specials` fetched from the real
  backend via a custom `useFetch` hook, with loading, empty, and error states
  handled on every page that depends on it.
- **Dish detail pages** — each dish resolves by slug from the fetched menu
  list, with ingredients, spice level, and fasting/special tags.
- **Cart** — built on Zustand with the `persist` middleware, so an order
  survives a page refresh. State is read via narrow selectors, so components
  only re-render when the specific data they use actually changes.
- **Authentication** — also on Zustand (`useAuthStore`), handling
  register/login/logout with persisted sessions. `/checkout` is gated behind
  a `RequireAuth` route guard.
- **Checkout** — built with React Hook Form and a Zod schema
  (`checkoutSchema.js`), validating name, a TeleBirr-format phone number,
  delivery area, and optional notes. Errors appear after a field is blurred
  or the form is submitted, and focus jumps to the first invalid field on a
  failed submit.
- **Resilience** — every route is wrapped in an `ErrorBoundary` so a crash
  in one screen doesn't take down the whole app, and every page is
  code-split with `React.lazy` + `Suspense` so nothing loads until it's
  actually needed.

## Key architectural decisions

- **Cart & Auth in Zustand, not Context** — both change often enough
  (adding items, logging in/out) that Context's "every consumer re-renders
  on any change" behavior would be wasteful. Zustand's selectors let each
  component subscribe to only the exact slice of state it needs.
- **Zod schema over hand-written validation** — the same shape declared
  once, readable by both the form and (eventually) a server, instead of an
  imperative if-statement chain.
- **No global store for the menu itself** — fetched data stays local to the
  hook/component that needs it, since it's server state, not application
  state.

## Known limitations

- `placeOrder` is a mocked async call (no real order-placement endpoint was
  provided in the brief) — it simulates a network delay and returns a fake
  order ID.
- Auth is fully client-side (localStorage-backed via Zustand's `persist`),
  since no auth endpoint exists on the provided backend.
