/* =========================================================
   NOVIX — script.js
   Tout le comportement du site : données, panier, favoris,
   filtres, recherche, modale produit, WhatsApp, animations.
========================================================= */

/* ---------------------------------------------------------
   0. CONFIGURATION — à modifier facilement
--------------------------------------------------------- */
const WHATSAPP_NUMBER = "212600000000"; // <-- Remplacez par le vrai numéro (format international, sans +, sans espaces)
const CURRENCY = "MAD";

/* ---------------------------------------------------------
   1. DONNÉES PRODUITS
   (Remplacez images / prix / descriptions par vos vraies données)
--------------------------------------------------------- */
const PRODUCTS = [
  {
    id: "p01", name: "iPhone 16", brand: "Apple", category: "smartphones",
    price: 11999, oldPrice: 12999, isNew: true, isPromo: true,
    rating: 4.8, reviews: 214, stock: 12,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
    description: "Le dernier iPhone avec puce A18, appareil photo amélioré et écran Super Retina XDR.",
    specs: ["Écran 6.1\" Super Retina XDR", "Puce A18", "128 Go de stockage", "Appareil photo double 48 Mpx", "5G"]
  },
  {
    id: "p02", name: "Galaxy S25", brand: "Samsung", category: "smartphones",
    price: 10499, oldPrice: null, isNew: true, isPromo: false,
    rating: 4.7, reviews: 178, stock: 8,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
    description: "Un smartphone haut de gamme signé Samsung, avec écran Dynamic AMOLED 2X et IA intégrée.",
    specs: ["Écran 6.2\" Dynamic AMOLED 2X", "Snapdragon 8 Gen 4", "256 Go", "Triple capteur photo", "Batterie 4000 mAh"]
  },
  {
    id: "p03", name: "Redmi Note 14", brand: "Xiaomi", category: "smartphones",
    price: 2799, oldPrice: 3299, isNew: false, isPromo: true,
    rating: 4.4, reviews: 342, stock: 25,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
    description: "Excellent rapport qualité-prix avec grand écran AMOLED et charge rapide 67W.",
    specs: ["Écran 6.67\" AMOLED 120Hz", "108 Mpx", "Charge rapide 67W", "8 Go RAM / 256 Go"]
  },
  {
    id: "p04", name: "iPad Air", brand: "Apple", category: "tablettes",
    price: 8499, oldPrice: null, isNew: false, isPromo: false,
    rating: 4.9, reviews: 156, stock: 14,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    description: "Puissante, légère et compatible Apple Pencil, idéale pour le travail et la création.",
    specs: ["Écran 10.9\" Liquid Retina", "Puce M2", "Compatible Apple Pencil", "64 Go"]
  },
  {
    id: "p05", name: "Galaxy Tab S10", brand: "Samsung", category: "tablettes",
    price: 6999, oldPrice: 7999, isNew: false, isPromo: true,
    rating: 4.6, reviews: 98, stock: 10,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80",
    description: "Une tablette premium avec S Pen inclus, parfaite pour la productivité.",
    specs: ["Écran 11\" AMOLED", "S Pen inclus", "128 Go", "Batterie 8400 mAh"]
  },
  {
    id: "p06", name: "MacBook Air M3", brand: "Apple", category: "pc-portables",
    price: 13999, oldPrice: null, isNew: true, isPromo: false,
    rating: 4.9, reviews: 267, stock: 9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    description: "Ultra léger, silencieux et rapide grâce à la puce M3, jusqu'à 18h d'autonomie.",
    specs: ["Écran 13.6\" Liquid Retina", "Puce Apple M3", "8 Go RAM / 256 Go SSD", "Autonomie 18h"]
  },
  {
    id: "p07", name: "IdeaPad Slim 5", brand: "Lenovo", category: "pc-portables",
    price: 7499, oldPrice: 8299, isNew: false, isPromo: true,
    rating: 4.3, reviews: 143, stock: 16,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    description: "Un portable fin et performant pour le travail et les études au quotidien.",
    specs: ["Écran 15.6\" FHD", "Intel Core i5", "8 Go RAM / 512 Go SSD", "Windows 11"]
  },
  {
    id: "p08", name: "Pavilion 15", brand: "HP", category: "pc-portables",
    price: 6899, oldPrice: null, isNew: false, isPromo: false,
    rating: 4.2, reviews: 89, stock: 5,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    description: "Un ordinateur polyvalent, idéal pour la maison et le télétravail.",
    specs: ["Écran 15.6\" FHD IPS", "Intel Core i5-1240P", "8 Go RAM / 512 Go SSD"]
  },
  {
    id: "p09", name: "Inspiron 15", brand: "Dell", category: "pc-portables",
    price: 7199, oldPrice: 7899, isNew: false, isPromo: true,
    rating: 4.4, reviews: 112, stock: 11,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80",
    description: "Fiable et robuste, avec un excellent clavier pour un usage professionnel.",
    specs: ["Écran 15.6\" FHD", "Intel Core i7", "16 Go RAM / 512 Go SSD"]
  },
  {
    id: "p10", name: "ROG Strix G16", brand: "Asus", category: "pc-portables",
    price: 16999, oldPrice: null, isNew: true, isPromo: false,
    rating: 4.8, reviews: 76, stock: 4,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80",
    description: "PC portable gaming puissant avec carte graphique dédiée et écran 165Hz.",
    specs: ["Écran 16\" QHD 165Hz", "RTX 4060", "16 Go RAM / 1 To SSD", "Clavier RGB"]
  },
  {
    id: "p11", name: "Moniteur UltraSharp 27\"", brand: "Dell", category: "ecrans",
    price: 3499, oldPrice: 3999, isNew: false, isPromo: true,
    rating: 4.7, reviews: 65, stock: 13,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80",
    description: "Écran professionnel 4K avec des couleurs précises pour la création et le bureau.",
    specs: ["27\" 4K UHD", "IPS", "USB-C", "Réglable en hauteur"]
  },
  {
    id: "p12", name: "Moniteur Gaming 165Hz", brand: "Asus", category: "ecrans",
    price: 2999, oldPrice: null, isNew: false, isPromo: false,
    rating: 4.6, reviews: 54, stock: 9,
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80",
    description: "Fluidité maximale pour le gaming compétitif, temps de réponse ultra rapide.",
    specs: ["24.5\" Full HD", "165Hz", "1ms", "FreeSync"]
  },
  {
    id: "p13", name: "AirPods Pro 2", brand: "Apple", category: "audio",
    price: 2599, oldPrice: 2899, isNew: false, isPromo: true,
    rating: 4.8, reviews: 421, stock: 30,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    description: "Réduction de bruit active nouvelle génération et son spatial personnalisé.",
    specs: ["Réduction de bruit active", "Son spatial", "Étanche IPX4", "Autonomie 6h"]
  },
  {
    id: "p14", name: "Casque JBL Tune 720BT", brand: "JBL", category: "audio",
    price: 899, oldPrice: null, isNew: false, isPromo: false,
    rating: 4.5, reviews: 198, stock: 22,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
    description: "Son JBL Pure Bass et jusqu'à 76h d'autonomie sans fil.",
    specs: ["Bluetooth 5.3", "76h d'autonomie", "Pliable", "Appels mains libres"]
  },
  {
    id: "p15", name: "Enceinte JBL Flip 6", brand: "JBL", category: "audio",
    price: 1099, oldPrice: 1299, isNew: false, isPromo: true,
    rating: 4.7, reviews: 267, stock: 18,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    description: "Enceinte portable étanche avec son puissant, parfaite en extérieur.",
    specs: ["Étanche IP67", "12h d'autonomie", "Bluetooth", "Résistante aux chocs"]
  },
  {
    id: "p16", name: "Clavier MX Keys", brand: "Logitech", category: "gaming",
    price: 1299, oldPrice: null, isNew: false, isPromo: false,
    rating: 4.8, reviews: 134, stock: 20,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    description: "Clavier rétroéclairé premium, confortable pour de longues sessions.",
    specs: ["Rétroéclairé", "Sans fil", "Multi-appareils", "Autonomie 10 jours"]
  },
  {
    id: "p17", name: "Souris Gaming G502", brand: "Logitech", category: "gaming",
    price: 699, oldPrice: 849, isNew: false, isPromo: true,
    rating: 4.7, reviews: 302, stock: 26,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&q=80",
    description: "Capteur haute précision et poids ajustable, un classique du gaming.",
    specs: ["25 600 DPI", "11 boutons programmables", "Poids ajustable", "Filaire"]
  },
  {
    id: "p18", name: "Power Bank Anker 20000mAh", brand: "Anker", category: "accessoires",
    price: 449, oldPrice: null, isNew: false, isPromo: false,
    rating: 4.6, reviews: 189, stock: 40,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
    description: "Grande capacité et charge rapide, idéal pour les longues journées.",
    specs: ["20 000 mAh", "Charge rapide 22.5W", "2 ports USB", "Compact"]
  },
  {
    id: "p19", name: "Chargeur USB-C 65W", brand: "Anker", category: "accessoires",
    price: 299, oldPrice: 379, isNew: false, isPromo: true,
    rating: 4.5, reviews: 156, stock: 50,
    image: "https://images.unsplash.com/photo-1583863788434-e62bd6a2b6b5?w=600&q=80",
    description: "Chargeur compact compatible smartphones, tablettes et laptops.",
    specs: ["65W", "USB-C PD", "Compatible laptop", "Format compact"]
  },
  {
    id: "p20", name: "Coque iPhone 16 Silicone", brand: "Apple", category: "accessoires",
    price: 249, oldPrice: null, isNew: true, isPromo: false,
    rating: 4.4, reviews: 87, stock: 60,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=600&q=80",
    description: "Protection silicone douce au toucher, coloris variés disponibles.",
    specs: ["Silicone premium", "Intérieur microfibre", "Compatible MagSafe"]
  },
  {
    id: "p21", name: "Câble USB-C vers USB-C 2m", brand: "Anker", category: "accessoires",
    price: 149, oldPrice: 199, isNew: false, isPromo: true,
    rating: 4.6, reviews: 210, stock: 0,
    image: "https://images.unsplash.com/photo-1558402529-d2638a7023af?w=600&q=80",
    description: "Câble tressé résistant, charge rapide jusqu'à 60W.",
    specs: ["Longueur 2m", "Tressé nylon", "60W", "Transfert de données"]
  },
  {
    id: "p22", name: "Casque Gaming HyperX Cloud", brand: "HP", category: "gaming",
    price: 799, oldPrice: null, isNew: false, isPromo: false,
    rating: 4.7, reviews: 145, stock: 15,
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&q=80",
    description: "Confort longue durée et son immersif pour vos sessions de jeu.",
    specs: ["Micro détachable", "Coussinets mémoire de forme", "Compatible PC/console"]
  }
];

const CATEGORIES = [
  { id: "smartphones", icon: "📱", title: "Smartphones", desc: "Les derniers modèles, toutes marques." },
  { id: "pc-portables", icon: "💻", title: "PC portables", desc: "Bureau, études ou gaming." },
  { id: "tablettes", icon: "📲", title: "Tablettes", desc: "Légères, puissantes, polyvalentes." },
  { id: "ecrans", icon: "🖥️", title: "Écrans", desc: "Précision et confort visuel." },
  { id: "audio", icon: "🎧", title: "Audio", desc: "Casques, écouteurs, enceintes." },
  { id: "gaming", icon: "⌨️", title: "Gaming", desc: "Claviers, souris, casques gamer." },
  { id: "accessoires", icon: "🔌", title: "Chargeurs & câbles", desc: "Chargez sans jamais vous soucier." },
  { id: "protection", icon: "🛡️", title: "Protection", desc: "Coques et vitres de protection." },
  { id: "autres", icon: "⚡", title: "Accessoires", desc: "Tout le reste du high-tech utile." }
];

const BRANDS = ["Apple","Samsung","Xiaomi","Huawei","Lenovo","HP","Dell","Asus","Acer","Anker","JBL","Logitech"];

/* ---------------------------------------------------------
   2. ÉTAT DE L'APPLICATION
--------------------------------------------------------- */
const state = {
  cart: JSON.parse(localStorage.getItem("novix_cart") || "[]"),
  favorites: JSON.parse(localStorage.getItem("novix_favorites") || "[]"),
  activeCategory: null,
  filters: { categories: new Set(), brands: new Set(), maxPrice: 30000, stockOnly: false, promoOnly: false },
  sort: "popular",
  catalogSort: "popular"
};

function saveCart() { localStorage.setItem("novix_cart", JSON.stringify(state.cart)); }
function saveFavorites() { localStorage.setItem("novix_favorites", JSON.stringify(state.favorites)); }

function findProduct(id) { return PRODUCTS.find(p => p.id === id); }
function formatPrice(n) { return n.toLocaleString("fr-FR") + " " + CURRENCY; }

/* ---------------------------------------------------------
   3. NAVBAR — scroll, recherche, menu mobile
--------------------------------------------------------- */
const navbar = document.getElementById("navbar");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  navbar.classList.toggle("scrolled", y > 40);
  backToTop.classList.toggle("show", y > 500);

  const h = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";

  // active nav link based on section in view
  const sections = ["top","produits","categories","promotions","apropos","contact"];
  let current = "top";
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 140) current = id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}, { passive: true });

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* Hamburger / mobile menu */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.getElementById("menuOverlay");

function toggleMobileMenu(open) {
  const isOpen = open !== undefined ? open : !mobileMenu.classList.contains("open");
  hamburger.classList.toggle("open", isOpen);
  mobileMenu.classList.toggle("open", isOpen);
  menuOverlay.classList.toggle("open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}
hamburger.addEventListener("click", () => toggleMobileMenu());
menuOverlay.addEventListener("click", () => toggleMobileMenu(false));
document.querySelectorAll(".mobile-link").forEach(l => l.addEventListener("click", () => toggleMobileMenu(false)));

/* Search panel */
const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchClose = document.getElementById("searchClose");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

function toggleSearch(open) {
  const isOpen = open !== undefined ? open : !searchPanel.classList.contains("open");
  searchPanel.classList.toggle("open", isOpen);
  if (isOpen) setTimeout(() => searchInput.focus(), 200);
}
searchToggle.addEventListener("click", () => toggleSearch());
searchClose.addEventListener("click", () => toggleSearch(false));

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.innerHTML = ""; return; }
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  ).slice(0, 8);

  searchResults.innerHTML = results.length
    ? results.map(p => `
      <div class="search-result-item" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <div class="sr-info">
          <strong>${p.name}</strong>
          <span>${p.brand} · ${formatPrice(p.price)}</span>
        </div>
      </div>
    `).join("")
    : `<div class="search-empty">Aucun résultat pour « ${q} ».</div>`;

  searchResults.querySelectorAll(".search-result-item").forEach(el => {
    el.addEventListener("click", () => {
      openProductModal(el.dataset.id);
      toggleSearch(false);
    });
  });
});

/* ---------------------------------------------------------
   4. CATÉGORIES
--------------------------------------------------------- */
const categoryGrid = document.getElementById("categoryGrid");
categoryGrid.innerHTML = CATEGORIES.map(c => `
  <div class="category-card" data-cat="${c.id}">
    <div class="cat-icon">${c.icon}</div>
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
  </div>
`).join("");

categoryGrid.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const cat = card.dataset.cat;
    state.filters.categories = new Set([cat]);
    document.querySelectorAll("#filterCategory input").forEach(i => i.checked = i.value === cat);
    renderCatalog();
    document.getElementById("catalogue").scrollIntoView({ behavior: "smooth" });
  });
});

/* ---------------------------------------------------------
   5. RENDU D'UNE CARTE PRODUIT
--------------------------------------------------------- */
function stockLabel(stock) {
  if (stock <= 0) return `<span class="stock-tag out">Rupture de stock</span>`;
  if (stock <= 5) return `<span class="stock-tag low">Plus que ${stock} en stock</span>`;
  return `<span class="stock-tag in">En stock</span>`;
}

function renderStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function productCardHTML(p) {
  const isFav = state.favorites.includes(p.id);
  const discount = p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : null;
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-media">
      <div class="product-badges">
        ${p.isNew ? `<span class="pbadge new">Nouveau</span>` : ""}
        ${p.isPromo ? `<span class="pbadge promo">Promo</span>` : ""}
      </div>
      <button class="fav-btn ${isFav ? "active" : ""}" data-id="${p.id}" aria-label="Favoris">
        <svg viewBox="0 0 24 24" fill="none"><path d="M12 20.5s-7.5-4.6-9.8-9.4C.6 7.4 2.4 4 6 4c2.1 0 3.6 1.2 4.6 2.7C11.6 5.2 13.1 4 15.2 4c3.6 0 5.4 3.4 3.8 7.1C16.5 15.9 12 20.5 12 20.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
      </button>
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="product-hover-actions">
        <button class="hover-btn details-btn" data-id="${p.id}">Voir détails</button>
        <button class="hover-btn wa-btn" data-id="${p.id}">Demander le prix</button>
      </div>
    </div>
    <div class="product-info">
      <span class="product-brand">${p.brand}</span>
      <h3 class="product-name">${p.name}</h3>
      <div class="product-rating"><span class="stars">${renderStars(p.rating)}</span> (${p.reviews})</div>
      <div class="product-price-row">
        <span class="product-price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ""}
        ${discount ? `<span class="product-discount">-${discount}%</span>` : ""}
      </div>
      ${stockLabel(p.stock)}
      <button class="add-cart-btn" data-id="${p.id}" ${p.stock <= 0 ? "disabled" : ""}>
        ${p.stock <= 0 ? "Indisponible" : "Ajouter au panier"}
      </button>
    </div>
  </div>`;
}

/* Attache tous les événements des cartes produits d'un conteneur */
function bindProductCardEvents(container) {
  container.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); toggleFavorite(btn.dataset.id); });
  });
  container.querySelectorAll(".details-btn").forEach(btn => {
    btn.addEventListener("click", (e) => { e.stopPropagation(); openProductModal(btn.dataset.id); });
  });
  container.querySelectorAll(".wa-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const p = findProduct(btn.dataset.id);
      sendWhatsapp(`Bonjour, je souhaite connaître le prix et la disponibilité de : ${p.name} (${p.brand}).`);
    });
  });
  container.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (btn.disabled) return;
      addToCart(btn.dataset.id, 1);
      btn.classList.add("added");
      btn.textContent = "Ajouté ✓";
      setTimeout(() => { btn.classList.remove("added"); btn.textContent = "Ajouter au panier"; }, 1400);
    });
  });
  container.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => openProductModal(card.dataset.id));
  });
}

/* ---------------------------------------------------------
   6. PRODUITS POPULAIRES + TRI RAPIDE
--------------------------------------------------------- */
function sortProducts(list, mode) {
  const copy = [...list];
  if (mode === "price-asc") copy.sort((a, b) => a.price - b.price);
  else if (mode === "price-desc") copy.sort((a, b) => b.price - a.price);
  else if (mode === "new") copy.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  else copy.sort((a, b) => b.reviews - a.reviews); // popular
  return copy;
}

const popularGrid = document.getElementById("popularGrid");
function renderPopular() {
  const sorted = sortProducts(PRODUCTS, state.sort).slice(0, 8);
  popularGrid.innerHTML = sorted.map(productCardHTML).join("");
  bindProductCardEvents(popularGrid);
}
document.querySelectorAll(".sort-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".sort-chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    state.sort = chip.dataset.sort;
    renderPopular();
  });
});

/* ---------------------------------------------------------
   7. PROMOTIONS + COMPTE À REBOURS
--------------------------------------------------------- */
const promoGrid = document.getElementById("promoGrid");
function renderPromos() {
  const promos = PRODUCTS.filter(p => p.isPromo);
  promoGrid.innerHTML = promos.map(productCardHTML).join("");
  bindProductCardEvents(promoGrid);
}

function startCountdown() {
  let target = localStorage.getItem("novix_promo_end");
  if (!target || new Date(target) < new Date()) {
    target = new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(); // 18h à partir de maintenant
    localStorage.setItem("novix_promo_end", target);
  }
  const targetDate = new Date(target);

  function tick() {
    const diff = targetDate - new Date();
    if (diff <= 0) {
      document.getElementById("cdH").textContent = "00";
      document.getElementById("cdM").textContent = "00";
      document.getElementById("cdS").textContent = "00";
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById("cdH").textContent = String(h).padStart(2, "0");
    document.getElementById("cdM").textContent = String(m).padStart(2, "0");
    document.getElementById("cdS").textContent = String(s).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------------------------------------------------------
   8. MARQUES
--------------------------------------------------------- */
document.getElementById("brandsTrack").innerHTML = BRANDS.map(b => `<div class="brand-chip">${b}</div>`).join("");

/* ---------------------------------------------------------
   9. CATALOGUE COMPLET + FILTRES
--------------------------------------------------------- */
const filterCategoryEl = document.getElementById("filterCategory");
const filterBrandEl = document.getElementById("filterBrand");

filterCategoryEl.innerHTML = CATEGORIES.map(c => `
  <label class="filter-checkbox">
    <input type="checkbox" value="${c.id}">
    <span>${c.title}</span>
  </label>
`).join("");

filterBrandEl.innerHTML = BRANDS.map(b => `
  <label class="filter-checkbox">
    <input type="checkbox" value="${b}">
    <span>${b}</span>
  </label>
`).join("");

filterCategoryEl.querySelectorAll("input").forEach(input => {
  input.addEventListener("change", () => {
    input.checked ? state.filters.categories.add(input.value) : state.filters.categories.delete(input.value);
    renderCatalog();
  });
});
filterBrandEl.querySelectorAll("input").forEach(input => {
  input.addEventListener("change", () => {
    input.checked ? state.filters.brands.add(input.value) : state.filters.brands.delete(input.value);
    renderCatalog();
  });
});

const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
priceRange.addEventListener("input", () => {
  state.filters.maxPrice = Number(priceRange.value);
  priceValue.textContent = Number(priceRange.value).toLocaleString("fr-FR");
  renderCatalog();
});

document.getElementById("filterStock").addEventListener("change", (e) => {
  state.filters.stockOnly = e.target.checked;
  renderCatalog();
});
document.getElementById("filterPromo").addEventListener("change", (e) => {
  state.filters.promoOnly = e.target.checked;
  renderCatalog();
});

document.getElementById("resetFilters").addEventListener("click", () => {
  state.filters = { categories: new Set(), brands: new Set(), maxPrice: 30000, stockOnly: false, promoOnly: false };
  filterCategoryEl.querySelectorAll("input").forEach(i => i.checked = false);
  filterBrandEl.querySelectorAll("input").forEach(i => i.checked = false);
  document.getElementById("filterStock").checked = false;
  document.getElementById("filterPromo").checked = false;
  priceRange.value = 30000;
  priceValue.textContent = "30 000";
  renderCatalog();
});

const catalogSortSelect = document.getElementById("catalogSort");
catalogSortSelect.addEventListener("change", () => { state.catalogSort = catalogSortSelect.value; renderCatalog(); });

const catalogGrid = document.getElementById("catalogGrid");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");

function renderCatalog() {
  let list = [...PRODUCTS];
  if (state.filters.categories.size) list = list.filter(p => state.filters.categories.has(p.category));
  if (state.filters.brands.size) list = list.filter(p => state.filters.brands.has(p.brand));
  list = list.filter(p => p.price <= state.filters.maxPrice);
  if (state.filters.stockOnly) list = list.filter(p => p.stock > 0);
  if (state.filters.promoOnly) list = list.filter(p => p.isPromo);

  list = sortProducts(list, state.catalogSort);

  resultsCount.textContent = `${list.length} produit${list.length !== 1 ? "s" : ""}`;
  noResults.hidden = list.length !== 0;
  catalogGrid.innerHTML = list.map(productCardHTML).join("");
  bindProductCardEvents(catalogGrid);
}

/* Filtres mobile (drawer) */
const filtersPanel = document.getElementById("filtersPanel");
const filterMobileToggle = document.getElementById("filterMobileToggle");
const closeMobileFilters = document.getElementById("closeMobileFilters");
filterMobileToggle.addEventListener("click", () => filtersPanel.classList.add("open"));
closeMobileFilters.addEventListener("click", () => filtersPanel.classList.remove("open"));

/* ---------------------------------------------------------
   10. MODALE PRODUIT
--------------------------------------------------------- */
const modalOverlay = document.getElementById("modalOverlay");
let modalQty = 1;
let modalProductId = null;

function openProductModal(id) {
  const p = findProduct(id);
  if (!p) return;
  modalProductId = id;
  modalQty = 1;

  document.getElementById("modalImg").src = p.image;
  document.getElementById("modalImg").alt = p.name;
  document.getElementById("modalBrand").textContent = p.brand;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalRating").textContent = `${renderStars(p.rating)} (${p.reviews} avis)`;
  document.getElementById("modalPrice").textContent = formatPrice(p.price);
  document.getElementById("modalDesc").textContent = p.description;
  document.getElementById("modalSpecs").innerHTML = p.specs.map(s => `<li>${s}</li>`).join("");
  document.getElementById("modalQtyValue").textContent = "1";

  const oldPriceEl = document.getElementById("modalOldPrice");
  const discountEl = document.getElementById("modalDiscount");
  if (p.oldPrice) {
    oldPriceEl.textContent = formatPrice(p.oldPrice);
    discountEl.textContent = `-${Math.round(100 - (p.price / p.oldPrice) * 100)}%`;
  } else { oldPriceEl.textContent = ""; discountEl.textContent = ""; }

  document.getElementById("modalBadgeNew").hidden = !p.isNew;
  document.getElementById("modalBadgePromo").hidden = !p.isPromo;

  document.getElementById("modalStock").innerHTML = stockLabel(p.stock);
  const addBtn = document.getElementById("modalAddCart");
  addBtn.disabled = p.stock <= 0;
  addBtn.textContent = p.stock <= 0 ? "Indisponible" : "Ajouter au panier";

  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeProductModal);
modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeProductModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProductModal(); });

document.getElementById("modalQtyMinus").addEventListener("click", () => {
  modalQty = Math.max(1, modalQty - 1);
  document.getElementById("modalQtyValue").textContent = modalQty;
});
document.getElementById("modalQtyPlus").addEventListener("click", () => {
  modalQty += 1;
  document.getElementById("modalQtyValue").textContent = modalQty;
});

document.getElementById("modalAddCart").addEventListener("click", () => {
  if (!modalProductId) return;
  addToCart(modalProductId, modalQty);
  showToast(`${findProduct(modalProductId).name} ajouté au panier`);
});

document.getElementById("modalWhatsapp").addEventListener("click", () => {
  const p = findProduct(modalProductId);
  sendWhatsapp(`Bonjour, je suis intéressé(e) par : ${p.name} (${p.brand}) — Quantité : ${modalQty}. Est-il disponible ?`);
});

/* ---------------------------------------------------------
   11. FAVORIS
--------------------------------------------------------- */
function toggleFavorite(id) {
  const idx = state.favorites.indexOf(id);
  if (idx > -1) state.favorites.splice(idx, 1);
  else state.favorites.push(id);
  saveFavorites();
  updateFavCount();
  renderFavDrawer();
  // met à jour visuellement tous les boutons favoris de ce produit
  document.querySelectorAll(`.fav-btn[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle("active", state.favorites.includes(id));
  });
}

function updateFavCount() {
  const el = document.getElementById("favCount");
  el.textContent = state.favorites.length;
  el.classList.toggle("show", state.favorites.length > 0);
}

const favDrawer = document.getElementById("favDrawer");
const favToggle = document.getElementById("favToggle");
const favClose = document.getElementById("favClose");

function renderFavDrawer() {
  const items = document.getElementById("favItems");
  const empty = document.getElementById("favEmpty");
  if (!state.favorites.length) {
    items.innerHTML = "";
    empty.classList.add("show");
    return;
  }
  empty.classList.remove("show");
  items.innerHTML = state.favorites.map(id => {
    const p = findProduct(id);
    if (!p) return "";
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}">
        <div class="cart-item-info">
          <strong>${p.name}</strong>
          <span>${formatPrice(p.price)}</span>
          <div class="cart-item-row">
            <button class="hover-btn details-btn" style="flex:none;padding:6px 12px;background:var(--surface-2);color:var(--text)" data-id="${p.id}">Voir</button>
            <button class="cart-remove" data-id="${p.id}">Retirer</button>
          </div>
        </div>
      </div>`;
  }).join("");
  items.querySelectorAll(".cart-remove").forEach(btn => btn.addEventListener("click", () => toggleFavorite(btn.dataset.id)));
  items.querySelectorAll(".details-btn").forEach(btn => btn.addEventListener("click", () => { openProductModal(btn.dataset.id); toggleFavDrawer(false); }));
}

function toggleFavDrawer(open) {
  const isOpen = open !== undefined ? open : !favDrawer.classList.contains("open");
  favDrawer.classList.toggle("open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}
favToggle.addEventListener("click", () => { renderFavDrawer(); toggleFavDrawer(); });
favClose.addEventListener("click", () => toggleFavDrawer(false));

/* ---------------------------------------------------------
   12. PANIER
--------------------------------------------------------- */
function addToCart(id, qty = 1) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) existing.qty += qty;
  else state.cart.push({ id, qty });
  saveCart();
  updateCartCount();
  renderCartDrawer();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  saveCart();
  updateCartCount();
  renderCartDrawer();
}

function changeQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartCount(); renderCartDrawer(); }
}

function cartTotal() {
  return state.cart.reduce((sum, item) => {
    const p = findProduct(item.id);
    return p ? sum + p.price * item.qty : sum;
  }, 0);
}

function updateCartCount() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById("cartCount");
  el.textContent = count;
  el.classList.toggle("show", count > 0);
}

const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartToggle = document.getElementById("cartToggle");
const cartClose = document.getElementById("cartClose");

function renderCartDrawer() {
  const itemsEl = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");
  const footerEl = document.getElementById("cartFooter");

  if (!state.cart.length) {
    itemsEl.innerHTML = "";
    emptyEl.classList.add("show");
    footerEl.style.display = "none";
    return;
  }
  emptyEl.classList.remove("show");
  footerEl.style.display = "flex";

  itemsEl.innerHTML = state.cart.map(item => {
    const p = findProduct(item.id);
    if (!p) return "";
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}">
        <div class="cart-item-info">
          <strong>${p.name}</strong>
          <span>${formatPrice(p.price)}</span>
          <div class="cart-item-row">
            <div class="cart-qty">
              <button class="qty-minus" data-id="${p.id}">−</button>
              <span>${item.qty}</span>
              <button class="qty-plus" data-id="${p.id}">+</button>
            </div>
            <button class="cart-remove" data-id="${p.id}">Retirer</button>
          </div>
        </div>
      </div>`;
  }).join("");

  itemsEl.querySelectorAll(".qty-minus").forEach(b => b.addEventListener("click", () => changeQty(b.dataset.id, -1)));
  itemsEl.querySelectorAll(".qty-plus").forEach(b => b.addEventListener("click", () => changeQty(b.dataset.id, 1)));
  itemsEl.querySelectorAll(".cart-remove").forEach(b => b.addEventListener("click", () => removeFromCart(b.dataset.id)));

  document.getElementById("cartTotal").textContent = formatPrice(cartTotal());
}

function toggleCartDrawer(open) {
  const isOpen = open !== undefined ? open : !cartDrawer.classList.contains("open");
  cartDrawer.classList.toggle("open", isOpen);
  cartOverlay.classList.toggle("open", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
}
cartToggle.addEventListener("click", () => { renderCartDrawer(); toggleCartDrawer(); });
cartClose.addEventListener("click", () => toggleCartDrawer(false));
cartOverlay.addEventListener("click", () => { toggleCartDrawer(false); toggleFavDrawer(false); });
document.getElementById("cartEmptyLink").addEventListener("click", () => toggleCartDrawer(false));

/* ---------------------------------------------------------
   13. WHATSAPP
--------------------------------------------------------- */
function sendWhatsapp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function buildCartMessage() {
  if (!state.cart.length) return "Bonjour, je souhaite passer une commande.";
  let msg = "Bonjour, je souhaite commander :\n";
  state.cart.forEach(item => {
    const p = findProduct(item.id);
    if (p) msg += `• ${p.name} x${item.qty} — ${formatPrice(p.price * item.qty)}\n`;
  });
  msg += `\nTotal estimé : ${formatPrice(cartTotal())}`;
  return msg;
}

["cartWhatsappBtn", "ctaWhatsappBtn", "mobileWhatsapp", "whatsappFloat"].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("click", (e) => {
    e.preventDefault();
    sendWhatsapp(id === "cartWhatsappBtn" ? buildCartMessage() : "Bonjour, je souhaite avoir plus d'informations sur vos produits.");
  });
});

/* ---------------------------------------------------------
   14. TOASTS
--------------------------------------------------------- */
function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast success";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

/* ---------------------------------------------------------
   15. COMPTEURS ANIMÉS (stats du hero)
--------------------------------------------------------- */
function animateCounters() {
  document.querySelectorAll(".stat-num").forEach(el => {
    const target = Number(el.dataset.count);
    let current = 0;
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current.toLocaleString("fr-FR");
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("fr-FR");
    }
    requestAnimationFrame(step);
  });
}

/* ---------------------------------------------------------
   16. SCROLL REVEAL (léger, pour les sections secondaires)
--------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(".why-card, .category-card, .brand-chip");
  targets.forEach(t => t.classList.add("will-reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => observer.observe(t));
}

/* ---------------------------------------------------------
   17. INITIALISATION
--------------------------------------------------------- */
function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("footerPhone").textContent = "+" + WHATSAPP_NUMBER.replace(/(\d{3})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5 $6");

  renderPopular();
  renderPromos();
  renderCatalog();
  startCountdown();
  updateCartCount();
  updateFavCount();
  animateCounters();
  initScrollReveal();
}

document.addEventListener("DOMContentLoaded", init);
