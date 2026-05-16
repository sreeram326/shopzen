import { useState, useCallback, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { mockFetchProducts, CATEGORIES } from "../utils/api";
import { S } from "../utils/styles";
import { Toast } from "./Toast";

export function HomePage({ setPage, setSelectedProduct, search }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [toast, setToast] = useState(null);
  const [addedIds, setAddedIds] = useState([]);

  const fetchData = useCallback(() => {
    setLoading(true);
    mockFetchProducts({ category, sort, search }).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, [category, sort, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAdd = (p) => {
    addToCart(p);
    setToast(`${p.name} added to cart!`);
    setAddedIds(ids => [...ids, p.id]);
    setTimeout(() => setAddedIds(ids => ids.filter(id => id !== p.id)), 1500);
  };

  return (
    <div style={S.page}>
      {/* Hero */}
      <div style={S.hero}>
        <div>
          <span style={S.heroBadge}>🔥 Mega Sale — Up to 70% Off</span>
          <div style={S.heroTitle}>Shop Smarter,<br />Live Better.</div>
          <div style={S.heroSub}>Electronics, Fashion, Books & More — Delivered Fast.</div>
          <button style={S.heroBtn} onClick={() => setCategory("Electronics")}>Explore Deals →</button>
        </div>
        <span style={S.heroEmoji}>🛍️</span>
      </div>

      {/* Filters */}
      <div style={S.filterBar}>
        {CATEGORIES.map(cat => (
          <button key={cat} style={S.filterChip(category === cat)} onClick={() => setCategory(cat)}>{cat}</button>
        ))}
        <select style={S.sortSelect} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sort: Relevance</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div style={S.loading}>
          <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⚙️</span> Loading products…
        </div>
      )}

      {/* Grid */}
      {!loading && products.length === 0 && (
        <div style={S.empty}>
          <div style={S.emptyIcon}>🔍</div>
          <p>No products found. Try a different search or category.</p>
        </div>
      )}

      {!loading && (
        <div style={S.grid}>
          {products.map(p => (
            <div key={p.id} style={S.card}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(15,52,96,.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              <div style={S.cardImg} onClick={() => { setSelectedProduct(p); setPage("product"); }}>
                <span>{p.img}</span>
                {p.badge && <span style={S.cardBadge}>{p.badge}</span>}
              </div>
              <div style={S.cardBody}>
                <div style={S.cardCat}>{p.category}</div>
                <div style={S.cardName}>{p.name}</div>
                <div style={S.cardRating}>
                  {"⭐".repeat(Math.round(p.rating))}
                  <span style={{ color: "#1a1a2e", fontWeight: 600 }}>{p.rating}</span>
                  <span style={{ color: "#aab4be" }}>({p.reviews.toLocaleString()})</span>
                </div>
                <div style={S.cardPrice}>₹{p.price.toLocaleString("en-IN")}</div>
                <button
                  style={{ ...S.cardAddBtn, background: addedIds.includes(p.id) ? "#27ae60" : "#1a1a2e" }}
                  onClick={() => handleAdd(p)}>
                  {addedIds.includes(p.id) ? "✓ Added!" : "+ Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
