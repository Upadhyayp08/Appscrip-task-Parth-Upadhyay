"use client";
import { useState, useMemo } from "react";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = [
  { value: "recommended", label: "RECOMMENDED" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Popular" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "price_low", label: "Price: Low to High" },
];

export default function ProductGrid({ products }) {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("recommended");
  const [activeFilters, setActiveFilters] = useState({});

  const sortedProducts = useMemo(() => {
    const items = [...products];
    switch (sortValue) {
      case "price_high":
        return items.sort((a, b) => b.price - a.price);
      case "price_low":
        return items.sort((a, b) => a.price - b.price);
      case "popular":
        return items.sort((a, b) => b.rating.count - a.rating.count);
      case "newest":
        return items.sort((a, b) => b.id - a.id);
      default:
        return items;
    }
  }, [products, sortValue]);

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortValue)?.label;

  if (!products || products.length === 0) {
    return <p>Unable to load products. Please try again later.</p>;
  }
  return (
    <>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-inner">
          <span className="item-count" aria-live="polite">
            {sortedProducts.length} Items
          </span>

          <button
            className={`filter-toggle-btn${
              filtersVisible ? " filters-open" : ""
            }`}
            onClick={() => setFiltersVisible(!filtersVisible)}
            aria-expanded={filtersVisible}
            aria-controls="sidebar-filters"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                d="M4 6l4 4 4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {filtersVisible ? "HIDE FILTER" : "SHOW FILTER"}
          </button>

          <div className="toolbar-spacer" />

          <div className="sort-wrapper">
            <button
              className="sort-btn"
              onClick={() => setSortOpen(!sortOpen)}
              aria-expanded={sortOpen}
              aria-haspopup="listbox"
              aria-label={`Sort by: ${sortLabel}`}
            >
              <span>{sortLabel}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {sortOpen && (
              <div
                className="sort-dropdown"
                role="listbox"
                aria-label="Sort options"
              >
                {SORT_OPTIONS.map((opt) => (
                  <div
                    key={opt.value}
                    className={`sort-option${
                      sortValue === opt.value ? " active" : ""
                    }`}
                    role="option"
                    aria-selected={sortValue === opt.value}
                    onClick={() => {
                      setSortValue(opt.value);
                      setSortOpen(false);
                    }}
                  >
                    <svg
                      className="check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="plp-layout">
        <div id="sidebar-filters">
          <Sidebar isOpen={filtersVisible} onFilterChange={setActiveFilters} />
        </div>

        <main className="product-grid-wrapper" role="main">
          <div
            className={`product-grid${!filtersVisible ? " full-width" : ""}`}
            aria-label="Products listing"
          >
            {sortedProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </main>
      </div>

      {/* Click outside to close sort dropdown */}
      {sortOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 40 }}
          onClick={() => setSortOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
