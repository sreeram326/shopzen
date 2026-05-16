// ─── UUID helper ────────────────────────────────────────────────────────────
export const uuid = () => crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);

// ─── JWT simulation ──────────────────────────────────────────────────────────
export const fakeJWT = {
  sign: (payload) => btoa(JSON.stringify({ ...payload, exp: Date.now() + 3600000 })),
  verify: (token) => {
    try { const p = JSON.parse(atob(token)); return p.exp > Date.now() ? p : null; }
    catch { return null; }
  },
};

// ─── Category mapping ────────────────────────────────────────────────────────
const CATEGORY_MAP = {
  smartphones: "Electronics",
  laptops: "Computers",
  fragrances: "Fashion",
  skincare: "Fashion",
  groceries: "Kitchen",
  "home-decoration": "Furniture",
  furniture: "Furniture",
  tops: "Fashion",
  "womens-dresses": "Fashion",
  "womens-shoes": "Fashion",
  "womens-bags": "Fashion",
  "womens-jewellery": "Fashion",
  "mens-shirts": "Fashion",
  "mens-shoes": "Fashion",
  "mens-watches": "Electronics",
  "womens-watches": "Electronics",
  sunglasses: "Fashion",
  automotive: "Appliances",
  motorcycle: "Appliances",
  lighting: "Appliances",
};

const EMOJI_MAP = {
  Electronics: "📱",
  Fashion: "👕",
  Computers: "💻",
  Books: "📚",
  Kitchen: "🍳",
  Appliances: "⚙️",
  Furniture: "🪑",
};

// ─── Fetch products from API ─────────────────────────────────────────────────
let cachedProducts = [];

export const fetchProductsFromAPI = async () => {
  if (cachedProducts.length > 0) return cachedProducts;
  
  try {
    const response = await fetch("https://dummyjson.com/products?limit=200");
    const data = await response.json();
    
    cachedProducts = data.products.map((product) => ({
      id: uuid(),
      name: product.title,
      category: CATEGORY_MAP[product.category] || "Electronics",
      price: Math.round(product.price * 100),
      rating: Math.round(product.rating * 10) / 10,
      reviews: Math.floor(Math.random() * 10000) + 100,
      img: EMOJI_MAP[CATEGORY_MAP[product.category] || "Electronics"] || "📦",
      badge: product.discountPercentage > 10 ? "Deal" : null,
      desc: product.description.substring(0, 80) + "...",
    }));
    
    return cachedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export let PRODUCTS_DB = [];

// ─── Initialize products on module load ──────────────────────────────────────
fetchProductsFromAPI().then((products) => {
  PRODUCTS_DB = products;
});

export const mockFetchProducts = (filters = {}) =>
  new Promise((res) =>
    setTimeout(() => {
      let p = [...PRODUCTS_DB];
      if (filters.category && filters.category !== "All") p = p.filter(x => x.category === filters.category);
      if (filters.search) p = p.filter(x => x.name.toLowerCase().includes(filters.search.toLowerCase()));
      if (filters.sort === "price_asc") p.sort((a, b) => a.price - b.price);
      if (filters.sort === "price_desc") p.sort((a, b) => b.price - a.price);
      if (filters.sort === "rating") p.sort((a, b) => b.rating - a.rating);
      res(p);
    }, 200)
  );

export const CATEGORIES = ["All", "Electronics", "Fashion", "Computers", "Books", "Kitchen", "Appliances", "Furniture"];
