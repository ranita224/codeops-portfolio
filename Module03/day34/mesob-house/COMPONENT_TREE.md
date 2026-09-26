# Component Tree — Mesob House

```mermaid
graph TD
    App[App] --> Layout[Layout]
    Layout --> Header[Header]
    Layout --> Outlet[Outlet - active page]
    Layout --> Footer[Footer]

    Outlet --> Home[Home]
    Outlet --> Menu[Menu]
    Outlet --> DishDetail[DishDetail]
    Outlet --> Cart[Cart]
    Outlet --> RequireAuth[RequireAuth guard]
    Outlet --> Login[Login]
    Outlet --> Register[Register]
    Outlet --> NotFound[NotFound]

    RequireAuth --> Checkout[Checkout]

    Home --> DishCard1[DishCard]
    Menu --> DishCard2[DishCard]
    Checkout --> Field[Field]

    CartStore[(useCartStore - Zustand)]
    AuthStore[(useAuthStore - Zustand)]

    Header -.reads.-> CartStore
    Header -.reads.-> AuthStore
    Menu -.reads/writes.-> CartStore
    DishDetail -.reads/writes.-> CartStore
    Cart -.reads/writes.-> CartStore
    Checkout -.reads/writes.-> CartStore
    RequireAuth -.reads.-> AuthStore
    Login -.reads/writes.-> AuthStore
    Register -.reads/writes.-> AuthStore
```

## What owns what

| Component | Owns |
|---|---|
| `Layout` | Nothing — pure shell (Header + page + Footer) |
| `Header` | Nothing local — reads cart count & auth user from stores |
| `Home` | Nothing local — fetches specials via `useFetch` |
| `Menu` | Search text, selected category, toast message |
| `DishDetail` | Toast message |
| `Cart` | Nothing local — all data from `useCartStore` |
| `Checkout` | `orderPlaced`, `serverError` — form fields owned by React Hook Form |
| `Login` / `Register` | Form fields, error message |
| `DishCard` | Nothing — pure presentational, all props |
| `Field` | Nothing — pure presentational, all props |

## Global stores (outside the component tree)

- **`useCartStore`** (Zustand + persist) — `items`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`
- **`useAuthStore`** (Zustand + persist) — `user`, `users`, `register`, `login`, `logout`
- 
