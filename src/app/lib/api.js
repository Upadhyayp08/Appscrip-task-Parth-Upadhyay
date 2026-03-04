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
    const res = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("API error");
    }

    const data = await res.json();
    console.log(data.products); // Good idea to log just the array to verify

    // THE FIX: Return the array, not the parent object
    return data.products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
