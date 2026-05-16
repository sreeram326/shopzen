import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { S } from "../utils/styles";

export function DashboardPage({ setPage }) {
  const { user } = useAuth();
  const { orders, cart, count } = useCart();
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div style={S.page}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#e94560,#f5a623)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>
          {user?.name[0].toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: "1.4rem" }}>Hello, {user?.name}! 👋</div>
          <div style={{ color: "#8892a4", fontSize: "0.85rem" }}>{user?.email}</div>
        </div>
      </div>

      <div style={S.dashGrid}>
        {[
          { label: "Total Orders", value: orders.length, color: "#e94560", icon: "📦" },
          { label: "Amount Spent", value: `₹${totalSpent.toLocaleString("en-IN")}`, color: "#f5a623", icon: "💰" },
          { label: "Cart Items", value: count, color: "#27ae60", icon: "🛒" },
          { label: "Wishlist", value: "0", color: "#8892a4", icon: "❤️" },
        ].map(s => (
          <div key={s.label} style={S.statCard(s.color)}>
            <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{s.icon}</div>
            <div style={{ ...S.statNum, color: s.color }}>{s.value}</div>
            <div style={S.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div style={S.cartCard}>
          <div style={{ fontWeight: 800, marginBottom: "1rem" }}>Quick Actions</div>
          {[
            { label: "🛍️ Continue Shopping", page: "home" },
            { label: "📦 View My Orders", page: "orders" },
            { label: "🛒 View Cart", page: "cart" },
          ].map(a => (
            <button key={a.label} style={{ display: "block", width: "100%", background: "#f0f4ff", border: "none", padding: "0.75rem 1rem", borderRadius: "8px", cursor: "pointer", textAlign: "left", fontWeight: 600, marginBottom: "0.6rem", color: "#1a1a2e", fontSize: "0.88rem" }}
              onClick={() => setPage(a.page)}>{a.label}</button>
          ))}
        </div>
        <div style={S.cartCard}>
          <div style={{ fontWeight: 800, marginBottom: "1rem" }}>Recent Orders</div>
          {orders.length === 0 ? (
            <div style={{ color: "#aab4be", fontSize: "0.85rem", padding: "1rem 0" }}>No orders yet. Go shop!</div>
          ) : (
            orders.slice(0, 3).map(o => (
              <div key={o.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #f5f5f5", fontSize: "0.85rem" }}>
                <span>#{o.id.slice(0, 6).toUpperCase()} · {o.date}</span>
                <b style={{ color: "#e94560" }}>₹{o.total.toLocaleString("en-IN")}</b>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
