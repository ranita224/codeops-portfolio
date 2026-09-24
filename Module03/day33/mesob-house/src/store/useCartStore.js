import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === dish.id);
          if (existingIndex > -1) {
            const updatedItems = state.items.map((item, i) =>
              i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { items: updatedItems };
          }
          return { items: [...state.items, { ...dish, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: 'mesob-cart' }
  )
);