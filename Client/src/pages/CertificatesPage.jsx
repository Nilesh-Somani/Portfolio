// src/pages/CertificatesPage.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { certificates } from "../data/certificates";
import DetailModal from "../components/DetailModal";
import SearchBar from "../components/SearchBar";

// Helper to parse certificate issue date for sorting
function parseDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split(" ");
  if (parts.length === 2) {
    const [month, year] = parts;
    return new Date(`${month} 1, ${year}`);
  }
  return new Date(dateStr);
}

export default function CertificatesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [filterCategory, setFilterCategory] = useState(null);
  const [openItem, setOpenItem] = useState(null); // renamed to generic "openItem"

  // Extract categories for filtering
  const categoryOptions = useMemo(() => {
    const set = new Set();
    certificates.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, []);

  // Filter and sort logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = certificates.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        (c.details && c.details.toLowerCase().includes(q)) ||
        (c.skillsGained &&
          c.skillsGained.join(" ").toLowerCase().includes(q));

      const matchesCategory = !filterCategory
        ? true
        : c.category?.toLowerCase() === filterCategory.toLowerCase();

      return matchesQuery && matchesCategory;
    });

    switch (sortBy) {
      case "alpha":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "zalpha":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        list.sort((a, b) => parseDate(b.issueDate) - parseDate(a.issueDate));
        break;
      case "oldest":
        list.sort((a, b) => parseDate(a.issueDate) - parseDate(b.issueDate));
        break;
      default:
        break;
    }

    return list;
  }, [query, sortBy, filterCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white font-mono pt-10 pb-10">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 relative">
          <h1 className="text-4xl font-extrabold text-cyan-400 mb-6 tracking-wide">
            TROPHY ROOM
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm bg-black bg-opacity-80 border-2 border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-colors absolute right-0 top-0"
          >
            Back
          </button>
        </div>

        <SearchBar
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterTech={filterCategory}
          onFilterChange={setFilterCategory}
          techOptions={categoryOptions}
          placeholder="Search certificates or skills..."
        />

        {/* Certificates grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 mt-20 text-lg">
            No certificates found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {filtered.map((c) => (
              <div
                key={c.id}
                className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl overflow-hidden shadow-xl hover:shadow-cyan-400/30 transition-all cursor-pointer group flex flex-col"
                onClick={() => setOpenItem(c)}
              >
                <div className="p-6 flex items-center space-x-4">
                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-14 h-14 object-contain bg-gray-900 border border-gray-800 rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {c.issuer} • {c.issueDate}
                    </p>
                    <p className="text-gray-300 mt-2 text-sm line-clamp-2">
                      {c.brief}
                    </p>
                  </div>
                </div>
                <div className="mt-auto border-t border-gray-800 bg-black/40 text-center py-2 text-cyan-400 text-sm font-semibold group-hover:bg-cyan-400/10 transition-colors">
                  View Details
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        <DetailModal
          open={!!openItem}
          onClose={() => setOpenItem(null)}
          title={openItem?.title}
          image={openItem?.image}
          meta={`${openItem?.issuer || ""} • ${openItem?.issueDate || ""}`}
        >
          <p className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
            {openItem?.details}
          </p>

          {openItem?.skillsGained?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm uppercase text-gray-500 mb-2">
                Skills Gained
              </h4>
              <div className="flex flex-wrap gap-2">
                {openItem.skillsGained.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(openItem?.url || openItem?.image) && (
            <div className="mt-6">
              <a
                href={openItem.url || openItem.image}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-400 text-black px-4 py-2 rounded font-bold hover:bg-cyan-500 transition-colors inline-block"
              >
                View Certificate
              </a>
            </div>
          )}
        </DetailModal>
      </div>
    </div>
  );
}