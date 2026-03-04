// "use client";
// import { useRouter } from "next/navigation";

// export default function SortBar() {
//   const router = useRouter();

//   const handleSort = (e) => {
//     router.push(`/?sort=${e.target.value}`);
//   };

//   return (
//     <div className="sort-bar">
//       <span>3425 ITEMS</span>

//       <select onChange={handleSort}>
//         <option value="recommended">RECOMMENDED</option>
//         <option value="price-low">PRICE: LOW TO HIGH</option>
//         <option value="price-high">PRICE: HIGH TO LOW</option>
//       </select>
//     </div>
//   );
// }

"use client";

export default function PLPToolbar() {
  return (
    <div className="plp-toolbar">
      <div className="toolbar-left">
        <span>3425 ITEMS</span>
        <button>HIDE FILTER</button>
      </div>

      <div className="toolbar-right">
        <select>
          <option>RECOMMENDED</option>
          <option>PRICE: LOW TO HIGH</option>
          <option>PRICE: HIGH TO LOW</option>
        </select>
      </div>
    </div>
  );
}
