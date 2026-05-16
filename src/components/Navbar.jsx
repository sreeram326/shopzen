import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { S } from "../utils/styles";

export function Navbar({ page, setPage, search, setSearch }) {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [localSearch, setLocalSearch] = useState(search);

  const handleSearch = (e) => { e.preventDefault(); setSearch(localSearch); setPage("home"); };

  return (
    <nav style={S.nav}>
      <div onClick={() => setPage("home")} style={S.logo}>
        ShopZen
        <span style={S.logoSub}>INDIA'S FINEST STORE</span>
      </div>

      <form onSubmit={handleSearch} style={S.navSearch}>
        <input
          style={S.navSearchInput}
          placeholder="Search products, brands and more…"
          value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
        />
        <button type="submit" style={S.navSearchBtn}>🔍</button>
      </form>

      <div style={S.navActions}>
        {user ? (
          <>
            <span style={{ color: "#aab4be", fontSize: "0.82rem" }}>Hi, {user.name.split(" ")[0]}</span>
            <button style={S.navBtn} onClick={() => setPage("dashboard")}>Dashboard</button>
            <button style={S.navBtn} onClick={() => setPage("orders")}>Orders</button>
            <button style={S.navBtn} onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button style={S.navBtn} onClick={() => setPage("login")}>Login</button>
            <button style={S.navBtnPrimary} onClick={() => setPage("register")}>Register</button>
          </>
        )}
        <button style={S.cartBtn} onClick={() => setPage("cart")}>
          🛒 Cart
          {count > 0 && <span style={S.cartBadge}>{count}</span>}
        </button>
      </div>
    </nav>
  );
}
