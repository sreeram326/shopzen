import { useCart } from "../context/CartContext";
import { S } from "../utils/styles";

export function OrdersPage({ setPage }) {
  const { orders } = useCart();

  return (
    <div style={S.page}>
      <div style={S.sectionTitle}>📦 My Orders</div>
      {orders.length === 0 ? (
        <div style={S.empty}>
          <div style={S.emptyIcon}>📦</div>
          <h3 style={{ fontWeight: 700 }}>No orders yet</h3>
          <p style={{ marginBottom: "1.5rem" }}>Place your first order to see it here!</p>
          <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.7rem 2rem" }} onClick={() => setPage("home")}>Shop Now</button>
        </div>
      ) : (
        orders.map(o => (
          <div key={o.id} style={S.orderCard}>
            <div style={S.orderHeader}>
              <div>
                <div style={{ fontWeight: 800, marginBottom: "0.2rem" }}>Order #{o.id.slice(0, 8).toUpperCase()}</div>
                <div style={{ color: "#8892a4", fontSize: "0.8rem" }}>Placed on {o.date}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={S.orderBadge}>✓ {o.status}</span>
                <div style={{ fontWeight: 800, color: "#e94560", fontSize: "1.1rem", marginTop: "0.4rem" }}>₹{o.total.toLocaleString("en-IN")}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {o.items.map(i => (
                <div key={i.cartItemId} style={{ background: "#f8faff", borderRadius: "8px", padding: "0.5rem 0.75rem", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  {i.img} <span>{i.name}</span> <b>×{i.qty}</b>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
