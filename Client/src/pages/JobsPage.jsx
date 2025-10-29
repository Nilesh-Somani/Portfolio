import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jobs } from "../data/jobs.js";
import SearchBar from "../components/SearchBar";

// Helper: parse start month/year from "Jan 2025 – Mar 2025" or "Jun 2025"
function parseStartDate(duration) {
  if (!duration) return null;
  const match = duration.match(/([A-Za-z]{3,9})\s?(\d{4})/);
  if (!match) return null;
  const [_, monthStr, year] = match;
  const month = new Date(`${monthStr} 1, ${year}`).getMonth();
  return new Date(year, month, 1);
}

export default function InternshipsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [filterTech, setFilterTech] = useState(null);

  // Extract tech options
  const techOptions = useMemo(() => {
    const set = new Set();
    jobs.forEach((js) => {
      if (Array.isArray(js.tech)) js.tech.forEach((j) => set.add(j));
    });
    return Array.from(set);
  }, []);

  // Filter + sort logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = jobs.filter((j) => {
      const matchesQuery =
        !q ||
        j.company.toLowerCase().includes(q) ||
        j.role.toLowerCase().includes(q) ||
        (j.tech && j.tech.join(" ").toLowerCase().includes(q)) ||
        j.brief.toLowerCase().includes(q);

      const matchesTech = !filterTech
        ? true
        : j.tech &&
        j.tech
          .map((t) => t.toLowerCase())
          .includes(filterTech.toLowerCase());

      return matchesQuery && matchesTech;
    });

    // Sorting
    switch (sortBy) {
      case "alpha":
        list.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case "zalpha":
        list.sort((a, b) => b.company.localeCompare(a.company));
        break;
      case "newest":
        list.sort((a, b) => (parseStartDate(b.duration) - parseStartDate(a.duration)));
        break;
      case "oldest":
        list.sort((a, b) => (parseStartDate(a.duration) - parseStartDate(b.duration)));
        break;
      default:
        // relevance: no explicit sort
        break;
    }

    return list;
  }, [query, sortBy, filterTech]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white font-mono pt-10 pb-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-extrabold text-cyan-400 mb-6 tracking-wide">
              INTERNSHIPS
            </h1>
            <button onClick={() => navigate(-1)} className="text-sm bg-black bg-opacity-80 border-2 border-cyan-400 text-cyan-400 px-4 py-2 rounded-lg font-bold hover:bg-cyan-400 hover:text-black transition-colors absolute right-10">Back</button>
          </div>

          <SearchBar
            query={query}
            onQueryChange={setQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterTech={filterTech}
            onFilterChange={setFilterTech}
            techOptions={techOptions}
            placeholder="Search, filter, or sort internships..."
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 mt-20 text-lg">
            No jobs found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((j) => (
              <article
                key={j.id}
                className="relative bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl overflow-hidden shadow-2xl hover:shadow-cyan-400/30 transition-all group flex flex-col justify-between"
              >
                <div className="p-6 flex items-start space-x-4">
                  {j.logo && (
                    <img
                      src={j.logo}
                      alt={`${j.company} logo`}
                      className="w-16 h-16 object-contain bg-gray-900 border border-gray-800 rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      {j.company}
                    </h3>
                    <p className="text-sm text-gray-400">{j.role}</p>
                    <p className="text-gray-300 mt-3">{j.brief}</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/jobs/${j.id}`)}
                  className="mt-auto border-t border-gray-800 bg-black/40 text-center py-2 text-cyan-400 text-sm font-semibold group-hover:bg-cyan-400/10 transition-colors"
                >
                  View Details
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}