"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductCard({ product, index = 0 }) {
  const [liked, setLiked] = useState(false);
  const isNew = index === 0;
  const isOutOfStock = index === 1;

  // Create SEO-friendly image name from product title
  const seoImageName = product.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50);

  return (
    <article
      className="product-card"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="product-card-image-wrapper">
        <Image
          src={product.images[0]}
          alt={`${product.title} - ${product.category} product image`}
          fill
          sizes="(max-width: 480px) 50vw, (max-width: 900px) 33vw, (max-width: 1200px) 25vw, 20vw"
          style={{ objectFit: "cover" }}
          loading={index < 6 ? "eager" : "lazy"}
          itemProp="image"
          title={product.title}
        />

        {isNew && (
          <div className="product-badge" aria-label="New product">
            NEW PRODUCT
          </div>
        )}

        {isOutOfStock && (
          <div
            className="badge-out-of-stock"
            role="status"
            aria-label="Out of stock"
          >
            <span>OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className="product-card-info">
        <h2 className="product-card-name" itemProp="name">
          {product.title.length > 40
            ? product.title.substring(0, 40) + "..."
            : product.title}
        </h2>

        <p
          className="product-card-price"
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <span itemProp="priceCurrency" content="USD" className="sr-only">
            USD
          </span>
          <span>Sign in or Create an account to see pricing</span>
        </p>

        <button
          className={`wishlist-btn${liked ? " liked" : ""}`}
          onClick={() => setLiked(!liked)}
          aria-label={
            liked
              ? `Remove ${product.title} from wishlist`
              : `Add ${product.title} to wishlist`
          }
          aria-pressed={liked}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
