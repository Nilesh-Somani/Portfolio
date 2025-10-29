// src/sections/ProjectsSection.jsx
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

const ProjectsSection = () => {
  const navigate = useNavigate();

  return (
    <>
      {projects.length > 0 && (
        <section id="projects" className="py-20 relative">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4 no-autoscroll flex justify-center items-center">
                <img
                  src="/images/icons/projects/projects.png"
                  alt="PROJECTS"
                  width={32}
                  height={32}
                  className="mr-2 text-cyan-400"
                />
                PROJECTS
              </h2>
              <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl p-6 flex flex-col justify-between min-h-[240px] hover:shadow-cyan-400/40 hover:scale-[1.02] transition"
                >
                  <div className="flex items-start space-x-4">
                    {p.icon && (
                      <img
                        src={p.icon}
                        alt={p.title}
                        className="w-14 h-14 rounded-lg object-cover border-2 border-cyan-400"
                      />
                    )}
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {p.title}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {p.category} •{" "}
                        <span className="text-yellow-400">
                          {p.difficulty}
                        </span>
                      </p>
                      <p className="text-gray-300 mt-2">{p.brief}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/projects/${p.id}`)}
                    className="mt-6 self-start bg-cyan-400 text-black px-4 py-2 rounded text-sm font-bold hover:bg-cyan-300"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {projects.length > 3 && (
              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => navigate("/projects")}
                  className="bg-cyan-400 text-black px-4 py-2 rounded text-sm font-bold hover:bg-cyan-300"
                >
                  View All Projects
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ProjectsSection;
