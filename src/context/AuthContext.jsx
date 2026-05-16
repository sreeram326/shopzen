import { useState, useContext, createContext } from "react";
import { uuid, fakeJWT } from "../utils/api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("shopzen_token");
    if (!t) return null;
    const p = fakeJWT.verify(t);
    return p ? { name: p.name, email: p.email } : null;
  });

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("shopzen_users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const token = fakeJWT.sign({ name: found.name, email: found.email });
    localStorage.setItem("shopzen_token", token);
    setUser({ name: found.name, email: found.email });
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("shopzen_users") || "[]");
    if (users.find(u => u.email === email)) throw new Error("Email already registered");
    users.push({ id: uuid(), name, email, password });
    localStorage.setItem("shopzen_users", JSON.stringify(users));
    const token = fakeJWT.sign({ name, email });
    localStorage.setItem("shopzen_token", token);
    setUser({ name, email });
  };

  const logout = () => {
    localStorage.removeItem("shopzen_token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
