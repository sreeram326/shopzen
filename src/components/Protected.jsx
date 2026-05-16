import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function Protected({ children, setPage }) {
  const { user } = useAuth();
  useEffect(() => { if (!user) setPage("login"); }, [user, setPage]);
  if (!user) return null;
  return children;
}
