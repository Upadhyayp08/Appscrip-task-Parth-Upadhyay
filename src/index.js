"use client";
import { useState, useCallback } from "react";
import Head from "next/head";

const SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Discover Our Products",
  description:
    "Shop mettä muse curated collection of sustainable fashion and accessories",
  url: "https://metta-muse.netlify.app/shop",
  publisher: { "@type": "Organization", name: "mettä muse" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://metta-muse.netlify.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: "https://metta-muse.netlify.app/shop",
      },
    ],
  },
});

const FALLBACK_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: i === 0 ? "PFKOC MILKYWAY DRESS IN…" : "PRODUCT NAME",
  category: "ACCESSORIES",
  price: [120, 85, 95, 60, 75, 110, 55, 89, 99, 130, 45, 78][i],
  originalPrice: i === 1 ? 120 : null,
  image: `https://via.placeholder.com/300x400?text=Product+${i + 1}`,
  badge: i === 0 ? "NEW PRODUCT" : null,
  outOfStock: i === 1,
  slug: `product-name-${i + 1}`,
}));

const FILTER_GROUPS = [
  {
    id: "idealFor",
    label: "IDEAL FOR",
    options: ["Men", "Women", "Baby & Kids"],
    defaultOpen: true,
  },
  { id: "occasion", label: "OCCASION", options: [], defaultOpen: true },
  { id: "work", label: "WORK", options: [], defaultOpen: true },
  { id: "fabric", label: "FABRIC", options: [] },
  { id: "segment", label: "SEGMENT", options: [] },
  { id: "suitableFor", label: "SUITABLE FOR", options: [] },
  { id: "rawMaterials", label: "RAW MATERIALS", options: [] },
  { id: "pattern", label: "PATTERN", options: [] },
];

export async function getServerSideProps() {
  let initialProducts = [];
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=12");
    const data = await res.json();
    initialProducts = data.map((p, i) => ({
      id: p.id,
      title: p.title.toUpperCase().slice(0, 22) + "…",
      category: p.category.toUpperCase(),
      price: Math.round(p.price),
      originalPrice: i % 4 === 1 ? Math.round(p.price * 1.35) : null,
      image: p.image,
      badge: i === 0 ? "NEW PRODUCT" : null,
      outOfStock: i === 1,
      slug: p.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 40),
    }));
  } catch {
    initialProducts = FALLBACK_PRODUCTS;
  }
  return { props: { initialProducts } };
}

export default function ShopPage({ initialProducts }) {
  const [sortBy, setSortBy] = useState("recommended");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState(
    Object.fromEntries(FILTER_GROUPS.map((g) => [g.id, g.defaultOpen || false]))
  );
  const [selectedFilters, setSelectedFilters] = useState({});
  const [wishlist, setWishlist] = useState(new Set([3]));
  const [customizable, setCustomizable] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const toggleGroup = useCallback((id) => {
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleFilterChange = useCallback((groupId, value, checked) => {
    setSelectedFilters((prev) => {
      const curr = prev[groupId] || [];
      return {
        ...prev,
        [groupId]: checked ? [...curr, value] : curr.filter((v) => v !== value),
      };
    });
  }, []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "newest") return b.id - a.id;
    return 0;
  });

  const filterSidebarJSX = (
    <div className="filter-sidebar-inner">
      <label className="customizable-row">
        <input
          type="checkbox"
          checked={customizable}
          onChange={(e) => setCustomizable(e.target.checked)}
        />
        <span>CUSTOMIZABLE</span>
      </label>

      {FILTER_GROUPS.map((group) => (
        <div key={group.id} className="filter-group">
          <div
            className={`filter-group-header${
              openGroups[group.id] ? " open" : ""
            }`}
            onClick={() => toggleGroup(group.id)}
            role="button"
            aria-expanded={openGroups[group.id]}
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && toggleGroup(group.id)
            }
          >
            <span>{group.label}</span>
            <span className="chevron">▼</span>
          </div>
          {openGroups[group.id] && (
            <div className="filter-group-body">
              <p className="filter-current-val">All</p>
              {group.options.map((opt) => (
                <label key={opt} className="filter-option">
                  <input
                    type="checkbox"
                    name={group.id}
                    value={opt}
                    checked={selectedFilters[group.id]?.includes(opt) || false}
                    onChange={(e) =>
                      handleFilterChange(group.id, opt, e.target.checked)
                    }
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>
          Discover Our Products | mettä muse – Sustainable Fashion & Accessories
        </title>
        <meta
          name="description"
          content="Explore mettä muse curated collection of sustainable bags, accessories, and fashion items. Filter by occasion, fabric, segment, and more."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Discover Our Products | mettä muse"
        />
        <meta
          property="og:description"
          content="Shop our curated sustainable fashion collection."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://metta-muse.netlify.app/shop" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SCHEMA }}
        />
      </Head>

      {/* ── HEADER ── */}
      <header className="site-header">
        <div className="header-topbar">
          <span>+44 221 133 5360</span>
          <div className="header-topbar-right">
            <span>customercare@mettamuse.com</span>
            <span>ENG ▾</span>
          </div>
        </div>
        <div className="header-main">
          <button className="icon-btn" aria-label="Open menu">
            ☰
          </button>
          <a href="/" className="site-logo" aria-label="mettä muse home">
            LOGO
          </a>
          <nav aria-label="Primary navigation">
            <ul className="header-nav">
              {["Shop", "Skills", "Stories", "About", "Contact Us"].map(
                (item) => (
                  <li key={item}>
                    <a href={`/${item.toLowerCase().replace(" ", "-")}`}>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </nav>
          <div className="header-icons">
            <button className="icon-btn" aria-label="Search">
              🔍
            </button>
            <button className="icon-btn" aria-label="Wishlist">
              ♡
            </button>
            <button className="icon-btn" aria-label="Shopping cart">
              🛍
            </button>
            <button className="icon-btn" aria-label="Account">
              👤
            </button>
          </div>
        </div>
      </header>

      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <h1>DISCOVER OUR PRODUCTS</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
          scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
          dolor.
        </p>
      </section>

      {/* ── TOOLBAR ── */}
      <div
        className="toolbar"
        role="toolbar"
        aria-label="Filter and sort products"
      >
        <div className="toolbar-left">
          <span className="item-count" aria-live="polite">
            {initialProducts.length} ITEMS
          </span>
          <span className="toolbar-divider">|</span>
          <button
            className="filter-toggle-btn desktop-only"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-expanded={sidebarOpen}
            aria-controls="filter-sidebar"
          >
            {sidebarOpen ? "⇤ HIDE FILTER" : "⇥ SHOW FILTER"}
          </button>
          <button
            className="filter-toggle-btn mobile-only"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open filters"
          >
            ▤ FILTER
          </button>
        </div>
        <div className="toolbar-right">
          <span className="sort-label">RECOMMENDED</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
          >
            <option value="recommended">▾</option>
            <option value="newest">Newest First</option>
            <option value="popular">Popular</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
        </div>
      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      <div
        className={`mobile-overlay${mobileSidebarOpen ? " active" : ""}`}
        onClick={() => setMobileSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* ── MOBILE FILTER DRAWER ── */}
      <aside
        className={`mobile-drawer${mobileSidebarOpen ? " open" : ""}`}
        aria-label="Mobile product filters"
      >
        <div className="mobile-drawer-close">
          <button
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>
        {filterSidebarJSX}
      </aside>

      {/* ── MAIN LAYOUT ── */}
      <main className="plp-layout" id="main-content">
        {/* DESKTOP FILTER SIDEBAR */}
        {sidebarOpen && (
          <aside
            id="filter-sidebar"
            className="filter-sidebar desktop-only"
            aria-label="Product filters"
          >
            {filterSidebarJSX}
          </aside>
        )}

        {/* PRODUCT GRID */}
        <section className="product-grid-wrap" aria-label="Product listing">
          <div className="product-grid" role="list">
            {sortedProducts.map((product) => (
              <article
                key={product.id}
                className="product-card"
                role="listitem"
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="product-image-wrap">
                  <img
                    src={product.image}
                    alt={`${product.slug} sustainable fashion metta muse`}
                    loading="lazy"
                    width={300}
                    height={400}
                    className={hoveredCard === product.id ? "img-zoomed" : ""}
                  />
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                  {product.outOfStock && (
                    <div
                      className="out-of-stock-overlay"
                      aria-label="Out of stock"
                    >
                      <span>OUT OF STOCK</span>
                    </div>
                  )}
                  <button
                    className={`wishlist-btn${
                      wishlist.has(product.id) ? " active" : ""
                    }`}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      wishlist.has(product.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {wishlist.has(product.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="product-info">
                  <h2 className="product-title">{product.title}</h2>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">
                    {product.originalPrice && (
                      <span className="price-original">
                        ${product.originalPrice}
                      </span>
                    )}
                    <span
                      className={
                        product.originalPrice ? "price-sale" : "price-regular"
                      }
                    >
                      ${product.price}
                    </span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-newsletter">
          <div>
            <h3>BE THE FIRST TO KNOW</h3>
            <p>Sign up for updates from mettä muse.</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="newsletter-form"
            aria-label="Newsletter signup"
          >
            <input
              type="email"
              aria-label="Your email address"
              placeholder=""
            />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>

        <div className="footer-main">
          <div className="footer-col">
            <p>+44 221 133 5360</p>
            <a href="mailto:customercare@mettamuse.com">
              customercare@mettamuse.com
            </a>
            <p className="footer-col-label">CURRENCY</p>
            <p>$ USD</p>
          </div>

          <div className="footer-col">
            <h4>mettä muse</h4>
            <ul>
              {[
                "About Us",
                "Stories",
                "Artisans",
                "Boutiques",
                "Contact Us",
                "EU Compliance Docs",
              ].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>QUICK LINKS</h4>
            <ul>
              {[
                "Orders & Shipping",
                "Join/Login as a Seller",
                "Payment & Pricing",
                "Return & Refunds",
                "FAQs",
                "Privacy Policy",
                "Terms & Conditions",
              ].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>FOLLOW US</h4>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                📸
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                style={{ fontStyle: "italic", fontWeight: "bold" }}
              >
                in
              </a>
            </div>
            <h4 className="footer-accepts-title">mettä muse ACCEPTS</h4>
            <div className="footer-payment">
              {["VISA", "MC", "AMEX", "PP", "APay", "GPay"].map((p) => (
                <span key={p} className="payment-icon">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright © 2023 mettämuse. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
