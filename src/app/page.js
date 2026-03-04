export const dynamic = "force-dynamic";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import { getProducts } from "./lib/api";

// This page uses SSR via Next.js App Router Server Component
// Data is fetched on the server before rendering
export default async function ProductListingPage() {
  let products = [];
  let fetchError = false;

  try {
    products = await getProducts();
  } catch (err) {
    console.error("Failed to load products:", err);
    fetchError = true;
  }

  return (
    <>
      <Header />

      {/* Hero section */}
      <section
        aria-labelledby="plp-heading"
        // style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="hero-section">
          <h1 id="plp-heading">DISCOVER OUR PRODUCTS</h1>
          <p className="hero-subtitle">
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
            scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
            dolor.
          </p>
        </div>
      </section>

      {fetchError ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px",
            color: "var(--color-gray-dark)",
          }}
        >
          <p>Unable to load products. Please try again later.</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}

      <Footer />
    </>
  );
}
