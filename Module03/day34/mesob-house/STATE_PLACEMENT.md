# State Placement Table

| State | Lives in | Why here, not elsewhere |
|---|---|---|
| Cart items | `useCartStore` (Zustand) | Read/written from Header, Menu, DishDetail, Cart, and Checkout — too widely shared for local state, and must survive a page refresh |
| Auth session (current user) | `useAuthStore` (Zustand) | Read by Header, RequireAuth, and needed across the whole app — must persist across refresh |
| Menu / specials data | Local to each page, via `useFetch` | Server data fetched fresh per page; no other component needs it, so a global store would be unnecessary overhead |
| Menu search text & category filter | Local `useState` in `Menu.jsx` | Only `Menu` cares about it; resets naturally when the page unmounts |
| Toast "added to cart" message | Local `useState` in `Menu.jsx` / `DishDetail.jsx` | Purely transient, page-specific UI feedback |
| Checkout form values & validation errors | Owned internally by React Hook Form (`useForm`) | Scoped entirely to the Checkout form; no other component reads or writes it |
| Login / Register form fields | Local `useState` in each page | Only relevant to that one form, discarded after submit |