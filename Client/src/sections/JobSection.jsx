import { useNavigate } from "react-router-dom";
import { jobs } from "../data/jobs";

const JobsSection = () => {
  const navigate = useNavigate();

  return (
    <>
      {jobs.length > 0 && (
        <section id="jobs" className="py-20 relative">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4 no-autoscroll flex justify-center items-center">
                <img
                  src="/images/icons/jobs/jobs.png"
                  alt="JOBS"
                  width={32}
                  height={32}
                  className="mr-2 text-cyan-400"
                />
                JOBS
              </h2>
              <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.slice(0, 4).map((j) => (
                <div
                  key={j.id}
                  className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl p-6 flex flex-col justify-between hover:shadow-cyan-400/40 hover:scale-[1.02] transition"
                >
                  <div className="flex items-start justify-between space-x-4">
                    {j.logo && (
                      <img
                        src={j.logo}
                        alt={j.company}
                        className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white">{j.company}</h4>
                      <p className="text-sm text-gray-400">{j.role}</p>
                      <p className="text-gray-300 mt-2">{j.brief}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/jobs/${j.id}`)}
                    className="mt-6 self-start bg-cyan-400 text-black px-4 py-2 rounded text-sm font-bold hover:bg-cyan-300"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {jobs.length > 4 && (
              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => navigate("/jobs")}
                  className="bg-cyan-400 text-black px-4 py-2 rounded text-sm font-bold hover:bg-cyan-300"
                >
                  View All Jobs
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default JobsSection;