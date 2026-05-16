import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { S } from "../utils/styles";

export function CheckoutPage({ setPage }) {
  const { cart, total, placeOrder } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: user?.name || "", phone: "", line1: "", city: "", pin: "", state: "" });
  const [payment, setPayment] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [order, setOrder] = useState(null);
  const [err, setErr] = useState("");

  if (cart.length === 0 && !order) { setPage("home"); return null; }

  const handlePlaceOrder = () => {
    if (!address.phone || !address.line1 || !address.city || !address.pin) { setErr("Please fill in all address fields."); return; }
    setErr("");
    setProcessing(true);
    setTimeout(() => {
      const o = placeOrder();
      setOrder(o);
      setProcessing(false);
    }, 1800);
  };

  if (order) return (
    <div style={S.page}>
      <div style={S.successWrap}>
        <div style={{ fontSize: "4rem", marginBottom: "0.75rem" }}>🎉</div>
        <h2 style={{ fontWeight: 800, fontSize: "1.6rem", marginBottom: "0.5rem", color: "#1a1a2e" }}>Order Confirmed!</h2>
        <p style={{ color: "#8892a4", marginBottom: "1rem" }}>Your order <b style={{ color: "#e94560" }}>#{order.id.slice(0, 8).toUpperCase()}</b> has been placed successfully.</p>
        <p style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "1.5rem" }}>Total: ₹{order.total.toLocaleString("en-IN")}</p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.7rem 1.8rem" }} onClick={() => setPage("orders")}>View Orders</button>
          <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.7rem 1.8rem", background: "#1a1a2e" }} onClick={() => setPage("home")}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={S.page}>
      <div style={S.sectionTitle}>Checkout</div>

      {/* Stepper */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", alignItems: "center" }}>
        {["Address", "Payment", "Review"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step > i ? "#27ae60" : step === i + 1 ? "#e94560" : "#dde2ee", color: step >= i + 1 ? "#fff" : "#aab4be", fontWeight: 800, fontSize: "0.85rem" }}>{i + 1}</div>
            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: step === i + 1 ? "#e94560" : "#aab4be" }}>{s}</span>
            {i < 2 && <span style={{ color: "#dde2ee", margin: "0 0.25rem" }}>›</span>}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem", alignItems: "start" }}>
        <div style={S.cartCard}>
          {step === 1 && (
            <>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1.2rem" }}>📦 Delivery Address</div>
              {err && <div style={S.errBox}>{err}</div>}
              {["name", "phone", "line1", "city", "pin", "state"].map(f => (
                <input key={f} style={S.input} placeholder={{ name: "Full Name", phone: "Phone Number", line1: "Address Line 1", city: "City", pin: "Pincode", state: "State" }[f]}
                  value={address[f]} onChange={e => setAddress(a => ({ ...a, [f]: e.target.value }))} />
              ))}
              <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.7rem 2rem" }} onClick={() => setStep(2)}>Continue to Payment →</button>
            </>
          )}
          {step === 2 && (
            <>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1.2rem" }}>💳 Payment Method</div>
              {[["upi", "📱 UPI / Google Pay / PhonePe"], ["card", "💳 Credit / Debit Card"], ["cod", "💵 Cash on Delivery"], ["netbanking", "🏦 Net Banking"]].map(([val, label]) => (
                <label key={val} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.9rem 1.1rem", border: `1.5px solid ${payment === val ? "#e94560" : "#eee"}`, borderRadius: "8px", marginBottom: "0.75rem", cursor: "pointer", background: payment === val ? "#fff0f3" : "#fff" }}>
                  <input type="radio" name="pay" value={val} checked={payment === val} onChange={() => setPayment(val)} style={{ accentColor: "#e94560" }} />
                  <span style={{ fontWeight: 600 }}>{label}</span>
                </label>
              ))}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.7rem 1.8rem", background: "#1a1a2e" }} onClick={() => setStep(1)}>← Back</button>
                <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.7rem 1.8rem" }} onClick={() => setStep(3)}>Review Order →</button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "1.2rem" }}>✅ Review Your Order</div>
              <div style={{ background: "#f8faff", borderRadius: "8px", padding: "1rem", marginBottom: "1rem", fontSize: "0.85rem" }}>
                <b>Delivering to:</b> {address.name}, {address.line1}, {address.city}, {address.state} – {address.pin}<br />
                <b>Payment:</b> {payment.toUpperCase()}
              </div>
              {cart.map(i => (
                <div key={i.cartItemId} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f5f5f5", fontSize: "0.88rem" }}>
                  <span>{i.img} {i.name} × {i.qty}</span>
                  <b>₹{(i.price * i.qty).toLocaleString("en-IN")}</b>
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.2rem" }}>
                <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.7rem 1.8rem", background: "#1a1a2e" }} onClick={() => setStep(2)}>← Back</button>
                <button style={{ ...S.checkoutBtn, width: "auto", padding: "0.7rem 2rem" }} onClick={handlePlaceOrder} disabled={processing}>
                  {processing ? "⏳ Processing…" : "🎉 Place Order"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mini summary */}
        <div style={S.summaryCard}>
          <div style={{ fontWeight: 800, marginBottom: "1rem" }}>Price Summary</div>
          {cart.map(i => (
            <div key={i.cartItemId} style={{ ...S.summaryRow, fontSize: "0.82rem" }}>
              <span style={{ color: "#555" }}>{i.name.slice(0, 20)}… ×{i.qty}</span>
              <span>₹{(i.price * i.qty).toLocaleString("en-IN")}</span>
            </div>
          ))}
          <hr style={{ border: "none", borderTop: "1px dashed #eee", margin: "0.75rem 0" }} />
          <div style={{ ...S.summaryRow, fontWeight: 800 }}><span>Total</span><span style={{ color: "#e94560" }}>₹{total.toLocaleString("en-IN")}</span></div>
        </div>
      </div>
    </div>
  );
}
