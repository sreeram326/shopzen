import { useState, useEffect, useContext, createContext } from "react";
import { uuid } from "../utils/api";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("shopzen_cart") || "[]"));
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("shopzen_orders") || "[]"));

  useEffect(() => { localStorage.setItem("shopzen_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("shopzen_orders", JSON.stringify(orders)); }, [orders]);

  const addToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      if (existing) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1, cartItemId: uuid() }];
    });
  };

  const removeFromCart = (id) => setCart(c => c.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(c => c.map(i => i.id === id ? { ...i, qty } : i));
  };
  const clearCart = () => setCart([]);

  const placeOrder = () => {
    const order = {
      id: uuid(),
      items: [...cart],
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Confirmed",
    };
    setOrders(o => [order, ...o]);
    clearCart();
    return order;
  };

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, updateQty, clearCart, placeOrder, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
