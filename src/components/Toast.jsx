import { useEffect } from "react";
import { S } from "../utils/styles";

export function Toast({ message, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, [onDone]);
  return <div style={S.toast}>✅ {message}</div>;
}
