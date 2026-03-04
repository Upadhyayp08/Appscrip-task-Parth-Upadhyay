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

// export async function getProducts() {
//   try {
//     const res = await fetch("https://fakestoreapi.com/products", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("API error");
//     }

//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//     return [];
//   }
// }

import axios from "axios";

export async function getProducts() {
  try {
    // Axios automatically throws an error if the status is not 2xx,
    // and it automatically parses the JSON data.
    const response = await axios.get("https://fakestoreapi.com/products");

    console.log(response.data);
    return response.data;
  } catch (error) {
    // Axios gives you detailed error objects
    if (error.response) {
      // The server responded with a status outside the 2xx range (e.g., 404, 500)
      console.error(
        `API Error: Status ${error.response.status}`,
        error.response.data
      );
    } else if (error.request) {
      // The request was made but no response was received (e.g., timeout)
      console.error("Network Error: No response received from Fakestore API");
    } else {
      console.error("Failed to fetch products:", error.message);
    }
    return [];
  }
}
