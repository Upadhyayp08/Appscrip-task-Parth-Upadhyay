"use client";
import { useState } from "react";

const FILTERS = [
  {
    id: "idealFor",
    label: "IDEAL FOR",
    options: ["Men (65)", "Women (63)", "Baby & Kids (59)"],
  },
  {
    id: "occasion",
    label: "OCCASION",
    options: [
      "Rainy Season (1)",
      "Casual (3)",
      "Wedding (1)",
      "Party (10)",
      "Regular (2)",
    ],
  },
  {
    id: "work",
    label: "WORK",
    options: ["French Knot (2)", "Zardosi (2)", "Fancy (1)", "Embroidery (1)"],
  },
  {
    id: "fabric",
    label: "FABRIC",
    options: [
      "Muslin (1)",
      "Satin Blend (1)",
      "Satin (1)",
      "Tericoat (1)",
      "Linen (5)",
      "Raw Silk (2)",
      "Cotton (13)",
      "Silk (2)",
      "Cotton Silk (3)",
    ],
  },
  {
    id: "segment",
    label: "SEGMENT",
    options: ["Silver (4)", "Ethnic (2)", "Contemporary (11)"],
  },
  {
    id: "suitableFor",
    label: "SUITABLE FOR",
    options: ["Formal Wear (1)", "Western Wear (1)", "Casual Wear (7)"],
  },
  {
    id: "rawMaterials",
    label: "RAW MATERIALS",
    options: [
      "Wool (2)",
      "Silk (2)",
      "Leather (2)",
      "Cotton (5)",
      "Cellulosic Fibers (4)",
    ],
  },
  {
    id: "pattern",
    label: "PATTERN",
    options: [
      "Windowpane (2)",
      "Pinstripes (1)",
      "Solid (2)",
      "Chalk Stripes (2)",
      "Slim Fit (1)",
      "Tartan (1)",
    ],
  },
];

export default function Sidebar({ isOpen, onFilterChange }) {
  const [openFilters, setOpenFilters] = useState(["idealFor"]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [customizable, setCustomizable] = useState(false);

  const toggleFilter = (id) => {
    setOpenFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleOption = (filterId, option) => {
    setSelectedFilters((prev) => {
      const current = prev[filterId] || [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      const next = { ...prev, [filterId]: updated };
      if (onFilterChange) onFilterChange(next);
      return next;
    });
  };

  const unselectAll = (filterId) => {
    setSelectedFilters((prev) => {
      const next = { ...prev, [filterId]: [] };
      if (onFilterChange) onFilterChange(next);
      return next;
    });
  };

  return (
    <div
      className={`sidebar${!isOpen ? " collapsed" : ""}`}
      aria-label="Product filters"
    >
      <div className="sidebar-inner">
        <div className="customizable-row">
          <div
            className={`checkbox-custom${customizable ? " checked" : ""}`}
            role="checkbox"
            aria-checked={customizable}
            tabIndex={0}
            onClick={() => setCustomizable(!customizable)}
            onKeyDown={(e) =>
              e.key === "Enter" && setCustomizable(!customizable)
            }
          />
          <span
            className="checkbox-label"
            onClick={() => setCustomizable(!customizable)}
            style={{ cursor: "pointer" }}
          >
            Customizable
          </span>
        </div>

        {FILTERS.map((filter) => {
          const isFilterOpen = openFilters.includes(filter.id);
          const selected = selectedFilters[filter.id] || [];
          return (
            <div key={filter.id} className="filter-group">
              <div
                className="filter-header"
                role="button"
                aria-expanded={isFilterOpen}
                tabIndex={0}
                onClick={() => toggleFilter(filter.id)}
                onKeyDown={(e) => e.key === "Enter" && toggleFilter(filter.id)}
              >
                <div>
                  <div className="filter-name">{filter.label}</div>
                  <div className="filter-selected">
                    {selected.length > 0
                      ? selected.map((s) => s.split(" (")[0]).join(", ")
                      : "All"}
                  </div>
                </div>
                <svg
                  className={`filter-arrow${isFilterOpen ? " open" : ""}`}
                  viewBox="0 0 16 16"
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
              </div>

              <div
                className={`filter-values${isFilterOpen ? " open" : ""}`}
                aria-hidden={!isFilterOpen}
              >
                <div className="filter-values-inner">
                  <button
                    className="unselect-all"
                    onClick={() => unselectAll(filter.id)}
                    aria-label={`Unselect all ${filter.label}`}
                  >
                    Unselect all
                  </button>
                  {filter.options.map((option) => (
                    <div
                      key={option}
                      className="filter-option"
                      role="checkbox"
                      aria-checked={selected.includes(option)}
                      tabIndex={0}
                      onClick={() => toggleOption(filter.id, option)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && toggleOption(filter.id, option)
                      }
                    >
                      <div
                        className={`checkbox-custom${
                          selected.includes(option) ? " checked" : ""
                        }`}
                        style={{ width: 18, height: 18, flexShrink: 0 }}
                        aria-hidden="true"
                      />
                      <span className="filter-option-label">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
