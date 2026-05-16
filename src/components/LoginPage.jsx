import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { S } from "../utils/styles";

export function LoginPage({ setPage }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    try { login(email, pass); setPage("home"); }
    catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={S.page}>
      <div style={S.authWrap}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>👋</div>
        <div style={S.authTitle}>Welcome back</div>
        <div style={S.authSub}>Login to your ShopZen account</div>
        {err && <div style={S.errBox}>{err}</div>}
        <form onSubmit={handleSubmit}>
          <input style={S.input} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
          <input style={S.input} type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} required />
          <button style={S.authBtn} type="submit" disabled={loading}>{loading ? "Logging in…" : "Login →"}</button>
        </form>
        <div style={S.authToggle}>Don't have an account? <span style={S.authLink} onClick={() => setPage("register")}>Register</span></div>
        <div style={{ marginTop: "1rem", background: "#f8faff", borderRadius: "8px", padding: "0.75rem", fontSize: "0.78rem", color: "#8892a4" }}>
          <b>Demo:</b> Register a new account to try the full flow.
        </div>
      </div>
    </div>
  );
}
