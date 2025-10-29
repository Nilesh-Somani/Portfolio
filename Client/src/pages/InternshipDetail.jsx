import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { internships } from "../data/internships.js";

export default function InternshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = internships.find((i) => i.id === parseInt(id));

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Internship not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white font-mono pt-10 pb-10">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-900 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm"
        >
          ← Back
        </button>

        <div className="text-center mb-8">
          {item.logo && (
            <img
              src={item.logo}
              alt={`${item.company} logo`}
              className="mx-auto w-28 h-28 object-contain mb-4"
            />
          )}
          <h2 className="text-4xl text-cyan-400 font-bold mb-2">
            {item.company}
          </h2>
          <p className="text-lg text-gray-300">{item.role}</p>
          <p className="text-gray-400 mt-1">
            {item.duration} • {item.location}
          </p>
        </div>

        <div className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl p-8 space-y-8">
          {item.overview && (
            <section>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2">
                Overview
              </h3>
              <p className="text-gray-300">{item.overview}</p>
            </section>
          )}

          {item.tech?.length > 0 && (
            <section>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          {item.responsibilities?.length > 0 && (
            <section>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2">
                Responsibilities
              </h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                {item.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </section>
          )}

          {item.achievements?.length > 0 && (
            <section>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2">
                Achievements
              </h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                {item.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </section>
          )}

          {item.screenshots?.length > 0 && (
            <section>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2">
                Project Screenshots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {item.screenshots.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    className="rounded-lg border border-gray-700"
                  />
                ))}
              </div>
            </section>
          )}

          {(item.certificateUrl ||
            item.reportUrl ||
            item.projectLinks?.length > 0) && (
            <section>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2">
                Resources
              </h3>
              <ul className="space-y-2 text-cyan-400 underline">
                {item.certificateUrl && (
                  <li>
                    <a href={item.certificateUrl} target="_blank">
                      View Certificate
                    </a>
                  </li>
                )}
                {item.reportUrl && (
                  <li>
                    <a href={item.reportUrl} target="_blank">
                      View Internship Report
                    </a>
                  </li>
                )}
                {item.projectLinks.map((p, i) => (
                  <li key={i}>
                    <a href={p} target="_blank">
                      Project Link {i + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
