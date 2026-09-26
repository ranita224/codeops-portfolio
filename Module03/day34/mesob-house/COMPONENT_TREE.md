# Component Tree — Mesob House

App
└── BrowserRouter
    └── Layout                          (owns: nothing — pure shell)
        ├── Header                      (reads: cart item count, auth user — via store selectors)
        ├── <Outlet> renders one of:
        │   ├── Home                    (owns: nothing local; reads specials via useFetch)
        │   │   └── DishCard            (presentational — props only)
        │   ├── Menu                    (owns: search query, selected category, toast message)
        │   │   └── DishCard            (presentational — props only)
        │   ├── DishDetail               (owns: toast message; reads dish from fetched menu list)
        │   ├── Cart                    (owns: nothing local; reads/writes cart store)
        │   ├── Checkout                (owns: orderPlaced, serverError; form state owned by React Hook Form)
        │   │   └── Field               (presentational — label/input/error wiring)
        │   ├── Login                   (owns: form fields, error message)
        │   ├── Register                (owns: form fields, error message)
        │   └── NotFound                (owns: nothing — static)
        └── Footer                      (owns: nothing — static)

RequireAuth wraps the /checkout route — reads auth state to allow/redirect.

Global stores (outside the tree, not owned by any component):
- useCartStore   (Zustand + persist) — items, addItem, removeItem, updateQuantity, clearCart
- useAuthStore   (Zustand + persist) — user, users, register, login, logout