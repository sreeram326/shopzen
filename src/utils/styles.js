export const S = {
  root: { 
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif", 
    background: "#f0f4ff", 
    minHeight: "100vh", 
    color: "#1a1a2e",
    position: "relative",
    overflow: "hidden",
  },
  // Floating background text
  floatingBg: {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "200px",
    fontWeight: 900,
    color: "rgb(248, 112, 191)",
    whiteSpace: "nowrap",
    zIndex: 0,
    pointerEvents: "none",
    animation: "bounce 4s ease-in-out infinite",
    textShadow: "0 0 60px rgba(233, 69, 96, 0.15)",
    letterSpacing: "-5px",
  },
  // Content wrapper with blur effect
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    backdropFilter: "blur(0.5px)",
    filter: "drop-shadow(0 0 1px rgba(0, 0, 0, 0.1))",
  },
  // Navbar
  nav: { background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,.4)" },
  logo: { fontSize: "1.6rem", fontWeight: 800, color: "#e94560", letterSpacing: "-0.5px", cursor: "pointer", userSelect: "none" },
  logoSub: { color: "#f5a623", fontSize: "0.7rem", fontWeight: 600, display: "block", letterSpacing: "2px", marginTop: "-6px" },
  navSearch: { flex: 1, maxWidth: 480, margin: "0 2rem", display: "flex", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 0 0 2px #e9456060" },
  navSearchInput: { flex: 1, border: "none", padding: "0.55rem 1rem", fontSize: "0.9rem", outline: "none", color: "#1a1a2e" },
  navSearchBtn: { background: "#e94560", border: "none", color: "#fff", padding: "0 1.2rem", cursor: "pointer", fontSize: "1rem" },
  navActions: { display: "flex", alignItems: "center", gap: "0.75rem" },
  navBtn: { background: "transparent", border: "1.5px solid rgba(255,255,255,.3)", color: "#fff", padding: "0.4rem 1rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, transition: "all .2s" },
  navBtnPrimary: { background: "#e94560", border: "1.5px solid #e94560", color: "#fff", padding: "0.4rem 1rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700 },
  cartBtn: { position: "relative", background: "#f5a623", border: "none", color: "#1a1a2e", padding: "0.45rem 1.1rem", borderRadius: "6px", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem" },
  cartBadge: { position: "absolute", top: -7, right: -7, background: "#e94560", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: "0.65rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 },
  // Page
  page: { maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" },
  // Hero
  hero: { background: "linear-gradient(135deg,#1a1a2e,#0f3460)", borderRadius: "16px", padding: "3rem 2.5rem", marginBottom: "2rem", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", overflow: "hidden", position: "relative" },
  heroTitle: { fontSize: "2.4rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "0.75rem" },
  heroSub: { color: "#aab4be", fontSize: "1.05rem", marginBottom: "1.5rem" },
  heroBadge: { display: "inline-block", background: "#e94560", color: "#fff", padding: "0.35rem 1rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem" },
  heroBtn: { background: "#f5a623", color: "#1a1a2e", border: "none", padding: "0.75rem 2rem", borderRadius: "8px", fontWeight: 800, fontSize: "1rem", cursor: "pointer" },
  heroEmoji: { fontSize: "7rem", opacity: 0.25, position: "absolute", right: "3rem", top: "50%", transform: "translateY(-50%)" },
  // Filters
  filterBar: { display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" },
  filterChip: (active) => ({ padding: "0.4rem 1.1rem", borderRadius: "20px", border: `1.5px solid ${active ? "#e94560" : "#c8d0e7"}`, background: active ? "#e94560" : "#fff", color: active ? "#fff" : "#1a1a2e", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, transition: "all .15s" }),
  sortSelect: { marginLeft: "auto", padding: "0.4rem 0.9rem", borderRadius: "8px", border: "1.5px solid #c8d0e7", fontSize: "0.82rem", background: "#fff", cursor: "pointer" },
  // Product grid
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.25rem" },
  card: { background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 12px rgba(15,52,96,.07)", transition: "transform .2s, box-shadow .2s", cursor: "pointer" },
  cardImg: { background: "linear-gradient(135deg,#f0f4ff,#e8edff)", fontSize: "4.5rem", height: 140, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" },
  cardBadge: { position: "absolute", top: 10, left: 10, background: "#e94560", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.5px" },
  cardBody: { padding: "1rem" },
  cardName: { fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.3rem", color: "#1a1a2e" },
  cardCat: { color: "#8892a4", fontSize: "0.75rem", marginBottom: "0.5rem" },
  cardRating: { display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", marginBottom: "0.75rem" },
  cardPrice: { fontWeight: 800, fontSize: "1.15rem", color: "#e94560" },
  cardAddBtn: { width: "100%", background: "#1a1a2e", color: "#fff", border: "none", padding: "0.55rem", borderRadius: "6px", fontWeight: 700, fontSize: "0.83rem", cursor: "pointer", marginTop: "0.6rem", transition: "background .2s" },
  // Cart
  cartContainer: { display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.5rem", alignItems: "start" },
  cartCard: { background: "#fff", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(15,52,96,.07)" },
  cartItem: { display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid #f0f0f0", alignItems: "center" },
  cartItemEmoji: { fontSize: "2.8rem", background: "#f0f4ff", borderRadius: "10px", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  qtyCtrl: { display: "flex", alignItems: "center", gap: "0.5rem", background: "#f0f4ff", borderRadius: "6px", padding: "0.2rem 0.5rem" },
  qtyBtn: { background: "none", border: "none", cursor: "pointer", fontWeight: 800, fontSize: "1rem", color: "#1a1a2e", padding: "0 0.3rem" },
  summaryCard: { background: "#fff", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(15,52,96,.07)", position: "sticky", top: 80 },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "0.6rem", fontSize: "0.88rem" },
  checkoutBtn: { width: "100%", background: "linear-gradient(135deg,#e94560,#c23152)", color: "#fff", border: "none", padding: "0.85rem", borderRadius: "8px", fontWeight: 800, fontSize: "1rem", cursor: "pointer", marginTop: "1rem" },
  // Auth
  authWrap: { maxWidth: 440, margin: "3rem auto", background: "#fff", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 8px 40px rgba(15,52,96,.12)" },
  authTitle: { fontSize: "1.7rem", fontWeight: 800, marginBottom: "0.4rem", color: "#1a1a2e" },
  authSub: { color: "#8892a4", fontSize: "0.9rem", marginBottom: "1.8rem" },
  input: { width: "100%", padding: "0.75rem 1rem", border: "1.5px solid #dde2ee", borderRadius: "8px", fontSize: "0.9rem", marginBottom: "1rem", outline: "none", boxSizing: "border-box", transition: "border .2s" },
  authBtn: { width: "100%", background: "linear-gradient(135deg,#e94560,#c23152)", color: "#fff", border: "none", padding: "0.85rem", borderRadius: "8px", fontWeight: 800, fontSize: "1rem", cursor: "pointer" },
  authToggle: { textAlign: "center", marginTop: "1rem", fontSize: "0.85rem", color: "#8892a4" },
  authLink: { color: "#e94560", cursor: "pointer", fontWeight: 600 },
  // Dashboard
  dashGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem", marginBottom: "2rem" },
  statCard: (color) => ({ background: "#fff", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(15,52,96,.07)", borderLeft: `4px solid ${color}` }),
  statNum: { fontSize: "2rem", fontWeight: 800, marginBottom: "0.2rem" },
  statLabel: { color: "#8892a4", fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
  // Orders
  orderCard: { background: "#fff", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem", boxShadow: "0 2px 12px rgba(15,52,96,.07)" },
  orderHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
  orderBadge: { background: "#e8f8f0", color: "#27ae60", padding: "0.3rem 0.9rem", borderRadius: "20px", fontSize: "0.78rem", fontWeight: 700 },
  // Toast
  toast: { position: "fixed", bottom: "1.5rem", right: "1.5rem", background: "#1a1a2e", color: "#fff", padding: "0.8rem 1.4rem", borderRadius: "10px", fontWeight: 600, fontSize: "0.88rem", zIndex: 9999, boxShadow: "0 8px 30px rgba(0,0,0,.3)", animation: "slideUp .3s ease", borderLeft: "4px solid #27ae60" },
  // Section heading
  sectionTitle: { fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.2rem", color: "#1a1a2e" },
  // Loading
  loading: { display: "flex", justifyContent: "center", alignItems: "center", height: 200, fontSize: "1.4rem", color: "#8892a4", gap: "0.75rem" },
  // Success screen
  successWrap: { textAlign: "center", padding: "4rem 2rem", background: "#fff", borderRadius: "16px", maxWidth: 480, margin: "3rem auto", boxShadow: "0 8px 40px rgba(15,52,96,.12)" },
  // Empty
  empty: { textAlign: "center", padding: "4rem 1rem", color: "#8892a4" },
  emptyIcon: { fontSize: "4rem", marginBottom: "1rem" },
  tag: { display: "inline-block", background: "#f0f4ff", color: "#0f3460", padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 600, marginRight: "0.3rem" },
  errBox: { background: "#fff0f3", color: "#e94560", border: "1px solid #fbc4cc", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.85rem", marginBottom: "1rem" },
};
