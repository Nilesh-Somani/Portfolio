import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { skills } from "../data/skills";
import DetailModal from "../components/DetailModal";
import SearchBar from "../components/SearchBar";

export default function SkillsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [filterCategory, setFilterCategory] = useState(null);
  const [openItem, setOpenItem] = useState(null);

  // Extract categories for filter buttons
  const categoryOptions = useMemo(() => {
    const set = new Set();
    skills.forEach((s) => {
      if (s.category) set.add(s.category);
    });
    return Array.from(set);
  }, []);

  // Filter & sort skills
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = skills.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.details && s.details.toLowerCase().includes(q));

      const matchesCategory = !filterCategory
        ? true
        : s.category?.toLowerCase() === filterCategory.toLowerCase();

      return matchesQuery && matchesCategory;
    });

    switch (sortBy) {
      case "alpha":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "zalpha":
        list.sort((a, b) => b.name.localeCompare(a.name));
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
            SKILL INVENTORY
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm bg-black bg-opacity-80 border-2 border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-colors absolute right-0 top-0"
          >
            Back
          </button>
        </div>

        {/* SearchBar with sort & filter */}
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterTech={filterCategory}
          onFilterChange={setFilterCategory}
          techOptions={categoryOptions}
          placeholder="Search skills or description..."
          usedBy="skills"
        />

        {/* Skills grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 mt-20 text-lg">
            No skills found.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filtered.map((s) => (
              <button
                key={s.id}
                className="relative bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl p-4 text-left cursor-pointer shadow hover:shadow-cyan-400/30 transition-all group flex flex-col items-start"
                onClick={() => setOpenItem(s)}
              >
                {s.icon && (
                  <img
                    src={s.icon}
                    alt={s.name}
                    className="w-12 h-12 mb-2 object-contain rounded-lg bg-gray-900 border border-gray-800"
                  />
                )}
                <div className="text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors text-lg">
                  {s.name}
                </div>
                {s.level && (
                  <div className="text-xs text-gray-400 mt-1">{s.level}</div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        <DetailModal
          open={!!openItem}
          onClose={() => setOpenItem(null)}
          title={openItem?.name}
          image={openItem?.icon}
          meta={openItem?.category ? `Category: ${openItem.category}` : ""}
        >
          <p className="text-gray-300 leading-relaxed mb-4 whitespace-pre-line">
            {openItem?.details}
          </p>
          {openItem?.level && (
            <p className="text-sm text-cyan-400">
              Level: {openItem.level}
            </p>
          )}
        </DetailModal>
      </div>
    </div>
  );
}
