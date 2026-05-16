import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { S } from "../utils/styles";

export function CartPage({ setPage }) {
  const { cart, removeFromCart, updateQty, total, count } = useCart();
  const { user } = useAuth();

  if (cart.length === 0) return (
    <div style={S.page}>
      <div style={S.empty}>
        <div style={S.emptyIcon}>🛒</div>
        <h2 style={{ fontWeight: 800, marginBottom: "0.5rem" }}>Your cart is empty</h2>
        <p style={{ marginBottom: "1.5rem" }}>Add some products to get started.</p>
        <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.75rem 2rem" }} onClick={() => setPage("home")}>Browse Products</button>
      </div>
    </div>
  );

  return (
    <div style={S.page}>
      <div style={S.sectionTitle}>🛒 Cart ({count} items)</div>
      <div style={S.cartContainer}>
        <div style={S.cartCard}>
          {cart.map(item => (
            <div key={item.cartItemId} style={S.cartItem}>
              <div style={S.cartItemEmoji}>{item.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.2rem" }}>{item.name}</div>
                <div style={{ color: "#8892a4", fontSize: "0.78rem", marginBottom: "0.5rem" }}>{item.category}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={S.qtyCtrl}>
                    <button style={S.qtyBtn} onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span style={{ fontWeight: 700, minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                    <button style={S.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <span style={{ fontWeight: 800, color: "#e94560" }}>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", color: "#aab4be" }}>🗑️</button>
            </div>
          ))}
        </div>

        <div style={S.summaryCard}>
          <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1.2rem" }}>Order Summary</div>
          <div style={S.summaryRow}><span>Subtotal ({count} items)</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          <div style={S.summaryRow}><span>Delivery</span><span style={{ color: "#27ae60", fontWeight: 600 }}>FREE</span></div>
          <div style={S.summaryRow}><span>Discount</span><span style={{ color: "#27ae60", fontWeight: 600 }}>–₹{Math.round(total * 0.05).toLocaleString("en-IN")}</span></div>
          <hr style={{ border: "none", borderTop: "1.5px dashed #eee", margin: "0.75rem 0" }} />
          <div style={{ ...S.summaryRow, fontWeight: 800, fontSize: "1.05rem" }}>
            <span>Total</span><span style={{ color: "#e94560" }}>₹{Math.round(total * 0.95).toLocaleString("en-IN")}</span>
          </div>
          <div style={{ background: "#e8f8f0", color: "#27ae60", borderRadius: "6px", padding: "0.5rem 0.75rem", fontSize: "0.78rem", fontWeight: 600, marginTop: "0.75rem" }}>
            🎉 You save ₹{Math.round(total * 0.05).toLocaleString("en-IN")} on this order!
          </div>
          <button style={S.checkoutBtn} onClick={() => user ? setPage("checkout") : setPage("login")}>
            {user ? "Proceed to Checkout →" : "Login to Checkout →"}
          </button>
        </div>
      </div>
    </div>
  );
}
