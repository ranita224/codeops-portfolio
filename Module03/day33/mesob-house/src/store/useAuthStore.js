import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function loadUsers(get) {
  return get().users || [];
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: [],

      register: (fullName, email, password) => {
        const users = get().users;
        const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          return { ok: false, error: 'An account with that email already exists.' };
        }
        const newUser = { fullName, email, password };
        set({ users: [...users, newUser], user: { fullName, email } });
        return { ok: true };
      },

      login: (email, password) => {
        const users = get().users;
        const found = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!found) {
          return { ok: false, error: 'Incorrect email or password.' };
        }
        set({ user: { fullName: found.fullName, email: found.email } });
        return { ok: true };
      },

      logout: () => set({ user: null }),
    }),
    { name: 'mesob-auth' }
  )
);