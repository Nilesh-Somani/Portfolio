// src/pages/ProjectDetail.jsx
import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white font-mono pt-10 pb-10">
      <div className="max-w-screen-lg mx-auto px-4 text-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 bg-gray-900 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-sm"
        >
          ← Back
        </button>

        {/* Header section */}
        {project.icon && (
          <img
            src={project.icon}
            alt={project.title}
            className="mx-auto w-28 h-28 object-contain mb-6 rounded-lg border border-gray-800 bg-gray-900"
          />
        )}
        <h2 className="text-4xl text-cyan-400 font-bold mb-2">
          {project.title}
        </h2>
        <p className="text-gray-300 text-lg mb-1">{project.category}</p>
        {project.difficulty && (
          <p className="text-yellow-400 mb-4 font-semibold">
            Difficulty: {project.difficulty}
          </p>
        )}
        {project.duration && (
          <p className="text-gray-400 mb-8 italic">{project.duration}</p>
        )}

        {/* Main content card */}
        <div className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl p-8 text-left">
          {/* Tech stack */}
          {project.tech?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm uppercase text-gray-500 mb-2">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm uppercase text-gray-500 mb-2">
              Project Overview
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {project.details}
            </p>
          </div>

          {/* Screenshot gallery */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm uppercase text-gray-500 mb-3">
                Screenshots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.screenshots.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="rounded-lg border border-gray-700 shadow-lg hover:scale-[1.02] transition-transform"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {(project.github || project.liveDemo) && (
            <div className="mt-8">
              <h3 className="text-sm uppercase text-gray-500 mb-3">
                Resources
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <img src="/images/icons/projects/github.png" className="mr-2" alt="Github Icon" width={20} height={20} /> View Code
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-cyan-400 text-black px-4 py-2 rounded hover:bg-cyan-500 font-bold transition-colors"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Collaborators */}
          {project.collaborators && project.collaborators.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm uppercase text-gray-500 mb-3">
                Collaborators
              </h3>
              <ul className="list-disc list-inside text-gray-300">
                {project.collaborators.map((col, idx) => (
                  <li key={idx}>{col}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
