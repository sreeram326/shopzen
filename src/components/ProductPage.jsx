import { useState } from "react";
import { useCart } from "../context/CartContext";
import { S } from "../utils/styles";
import { Toast } from "./Toast";

export function ProductPage({ product, setPage }) {
  const { addToCart } = useCart();
  const [toast, setToast] = useState(null);
  const [qty, setQty] = useState(1);

  if (!product) { setPage("home"); return null; }

  return (
    <div style={S.page}>
      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#e94560", fontWeight: 700, marginBottom: "1.5rem", fontSize: "0.9rem" }} onClick={() => setPage("home")}>← Back to Products</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "2rem", background: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 20px rgba(15,52,96,.08)" }}>
        <div style={{ ...S.cardImg, borderRadius: "12px", fontSize: "8rem", height: 300 }}>{product.img}</div>
        <div>
          <span style={S.tag}>{product.category}</span>
          {product.badge && <span style={{ ...S.tag, background: "#fff0f3", color: "#e94560" }}>{product.badge}</span>}
          <h1 style={{ fontSize: "1.7rem", fontWeight: 800, margin: "0.75rem 0 0.4rem", color: "#1a1a2e" }}>{product.name}</h1>
          <div style={S.cardRating}>
            {"⭐".repeat(Math.round(product.rating))}
            <b>{product.rating}</b> <span style={{ color: "#aab4be" }}>· {product.reviews.toLocaleString()} ratings</span>
          </div>
          <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", margin: "1rem 0" }} />
          <p style={{ color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>{product.desc}</p>
          <div style={{ fontSize: "2rem", fontWeight: 800, color: "#e94560", marginBottom: "1.5rem" }}>₹{product.price.toLocaleString("en-IN")}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <label style={{ fontWeight: 600, fontSize: "0.9rem" }}>Qty:</label>
            <div style={S.qtyCtrl}>
              <button style={S.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>{qty}</span>
              <button style={S.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>
          <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.75rem 2.5rem" }}
            onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); setToast(`${qty}× ${product.name} added!`); }}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
