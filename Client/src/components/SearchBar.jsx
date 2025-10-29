import React from "react";

export default function SearchBar({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
  filterTech,
  onFilterChange,
  techOptions = [],
  placeholder = "Search...",
  className = "",
  usedBy = ""
}) {
  return (
    <div
      className={`w-full bg-gray-900 bg-opacity-70 rounded-xl p-4 flex flex-col gap-3 ${className}`}
    >
      {/* Search input and sorting */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-[200px] px-3 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="text-sm bg-gray-800 px-3 py-2 rounded text-gray-300"
          >
            Clear
          </button>
        )}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-gray-800 text-cyan-400 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="relevance">Relevance</option>
          <option value="alpha">A → Z</option>
          <option value="zalpha">Z → A</option>
          {usedBy !== "skills" && (
            <>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </>
          )}
        </select>
      </div>

      {/* Tech filter buttons */}
      {techOptions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange(null)}
            className={`px-2 py-1 text-sm rounded ${!filterTech
                ? "bg-cyan-400 text-black"
                : "bg-gray-800 text-cyan-400"
              }`}
          >
            All
          </button>
          {techOptions.map((t) => (
            <button
              key={t}
              onClick={() => onFilterChange(t)}
              className={`px-2 py-1 text-sm rounded ${filterTech === t
                  ? "bg-cyan-400 text-black"
                  : "bg-gray-800 text-cyan-400"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
