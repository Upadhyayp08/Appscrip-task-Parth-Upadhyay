// export async function getProducts() {
//   const res = await fetch("https://fakestoreapi.com/products", {
//     next: { revalidate: 3600 }, // ISR: revalidate every hour
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   return res.json();
// }

// export async function getProductsByCategory(category) {
//   const res = await fetch(
//     `https://fakestoreapi.com/products/category/${encodeURIComponent(
//       category
//     )}`,
//     { next: { revalidate: 3600 } }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch products by category");
//   }

//   return res.json();
// }

export async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API error:", res.status);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}
