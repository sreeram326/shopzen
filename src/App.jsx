import { useState } from "react";

// Import contexts
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Import components
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { ProductPage } from "./components/ProductPage";
import { CartPage } from "./components/CartPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { OrdersPage } from "./components/OrdersPage";
import { DashboardPage } from "./components/DashboardPage";
import { Protected } from "./components/Protected";

// Import styles
import { S } from "./utils/styles";


// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <AuthProvider>
      <CartProvider>
        <div style={S.root}>
          {/* Floating background text */}
          <div style={S.floatingBg}>🙌ShopZen🙌</div>

          {/* Main content */}
          <div style={S.contentWrapper}>
            <Navbar page={page} setPage={setPage} search={search} setSearch={setSearch} />

            {page === "home" && <HomePage setPage={setPage} setSelectedProduct={setSelectedProduct} search={search} />}
            {page === "product" && <ProductPage product={selectedProduct} setPage={setPage} />}
            {page === "cart" && <CartPage setPage={setPage} />}
            {page === "checkout" && (
              <Protected setPage={setPage}><CheckoutPage setPage={setPage} /></Protected>
            )}
            {page === "login" && <LoginPage setPage={setPage} />}
            {page === "register" && <RegisterPage setPage={setPage} />}
            {page === "orders" && (
              <Protected setPage={setPage}><OrdersPage setPage={setPage} /></Protected>
            )}
            {page === "dashboard" && (
              <Protected setPage={setPage}><DashboardPage setPage={setPage} /></Protected>
            )}
          </div>

          {/* CSS animations */}
          <style>{`
            @keyframes bounce {
              0% { transform: translateX(-50%) translateY(0px); }
              50% { transform: translateX(-50%) translateY(600px); }
              100% { transform: translateX(-50%) translateY(0px); }
            }
          `}</style>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
