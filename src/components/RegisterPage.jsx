import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { S } from "../utils/styles";

export function RegisterPage({ setPage }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", pass: "", confirm: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    if (form.pass !== form.confirm) { setErr("Passwords do not match"); return; }
    setLoading(true);
    try { register(form.name, form.email, form.pass); setPage("home"); }
    catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={S.page}>
      <div style={S.authWrap}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🚀</div>
        <div style={S.authTitle}>Create Account</div>
        <div style={S.authSub}>Join ShopZen — it's free!</div>
        {err && <div style={S.errBox}>{err}</div>}
        <form onSubmit={handleSubmit}>
          <input style={S.input} placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          <input style={S.input} type="email" placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          <input style={S.input} type="password" placeholder="Password (min. 6 chars)" value={form.pass} onChange={e => setForm(f => ({ ...f, pass: e.target.value }))} required />
          <input style={S.input} type="password" placeholder="Confirm Password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required />
          <button style={S.authBtn} type="submit" disabled={loading}>{loading ? "Creating…" : "Create Account →"}</button>
        </form>
        <div style={S.authToggle}>Already have an account? <span style={S.authLink} onClick={() => setPage("login")}>Login</span></div>
      </div>
    </div>
  );
}
