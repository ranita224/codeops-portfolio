# Route Map — Mesob House

| Route                    | Component    | Auth required? | Notes                                                       |
| ------------------------ | ------------ | -------------- | ----------------------------------------------------------- |
| `/`                      | `Home`       | No             | Landing page + today's specials (`/menu/specials`)          |
| `/menu`                  | `Menu`       | No             | Full menu, live API data, search + category filter          |
| `/menu/:slug`            | `DishDetail` | No             | Single dish, resolved by slug from the fetched menu list    |
| `/cart`                  | `Cart`       | No             | View/edit cart items and quantities (Zustand store)         |
| `/login`                 | `Login`      | No             | Sign in; redirects back to the page the user came from      |
| `/register`              | `Register`   | No             | Create an account                                           |
| `/checkout`              | `Checkout`   | **Yes**        | Gated by `RequireAuth`; redirects to `/login` if signed out |
| `*` (any unmatched path) | `NotFound`   | No             | Catch-all 404 page                                          |

All routes render inside a shared `Layout` (`Header` + `Outlet` + `Footer`)
and are individually wrapped in an `ErrorBoundary` + `Suspense` fallback for
lazy-loaded chunks.
