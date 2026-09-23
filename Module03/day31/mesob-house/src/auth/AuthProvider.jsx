import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';

const USERS_KEY = 'mesob_users';
const SESSION_KEY = 'mesob_session';

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem(SESSION_KEY);
    if (email) {
      const users = loadUsers();
      const found = users.find((u) => u.email === email);
      if (found) setUser({ fullName: found.fullName, email: found.email });
    }
    setLoading(false);
  }, []);

  const register = useCallback((fullName, email, password) => {
    const users = loadUsers();
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { ok: false, error: 'An account with that email already exists.' };
    }
    const newUser = { fullName, email, password };
    saveUsers([...users, newUser]);
    localStorage.setItem(SESSION_KEY, email);
    setUser({ fullName, email });
    return { ok: true };
  }, []);

  const login = useCallback((email, password) => {
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { ok: false, error: 'Incorrect email or password.' };
    }
    localStorage.setItem(SESSION_KEY, found.email);
    setUser({ fullName: found.fullName, email: found.email });
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}