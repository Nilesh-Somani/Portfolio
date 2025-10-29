import { useNavigate } from "react-router-dom";
import { internships } from "../data/internships";

const InternshipsSection = () => {
  const navigate = useNavigate();

  return (
    <>
      {internships.length > 0 && (
        <section id="internships" className="py-20 relative">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4 no-autoscroll flex justify-center items-center">
                <img
                  src="/images/icons/internships/internships.png"
                  alt="INTERNSHIPS"
                  width={32}
                  height={32}
                  className="mr-2 text-cyan-400"
                />
                INTERNSHIPS
              </h2>
              <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {internships.slice(0, 4).map((i) => (
                <div
                  key={i.id}
                  className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-xl p-6 flex flex-col justify-between hover:shadow-cyan-400/40 hover:scale-[1.02] transition"
                >
                  <div className="flex items-start justify-between space-x-4">
                    {i.logo && (
                      <img
                        src={i.logo}
                        alt={i.company}
                        className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white">{i.company}</h4>
                      <p className="text-sm text-gray-400">{i.role}</p>
                      <p className="text-gray-300 mt-2">{i.brief}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/internships/${i.id}`)}
                    className="mt-6 self-start bg-cyan-400 text-black px-4 py-2 rounded text-sm font-bold hover:bg-cyan-300"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {internships.length > 4 && (
              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => navigate("/internships")}
                  className="bg-cyan-400 text-black px-4 py-2 rounded text-sm font-bold hover:bg-cyan-300"
                >
                  View All Internships
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default InternshipsSection;
