import { useState } from 'react';
import { skills } from '../data/skills';
import { certificates } from '../data/certificates';
import { interests } from '../data/interests';
import { jobs } from '../data/jobs';
import DetailModal from '../components/DetailModal';

const AboutSection = ({ navigate }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'skill' or 'certificate'
  const currentJob = jobs.find(job => job.isCurrent);
  const currentRole = currentJob ? currentJob.role : "Open to Opportunities";

  const parseDate = (dateStr) => {
    try {
      return new Date(dateStr);
    } catch {
      return new Date(9999, 11, 31);
    }
  };

  const sortedCertificates = [...certificates].sort(
    (a, b) => parseDate(b.issueDate) - parseDate(a.issueDate)
  );
  const topCertificates = sortedCertificates.filter(c => c.isTop);
  const otherCertificates = sortedCertificates.filter(c => !c.isTop);
  const displayedCertificates = [...topCertificates, ...otherCertificates].slice(0, 5);

  return (
    <section id="about" className="min-h-screen py-20 relative">
      <div className="max-w-screen-xl lg:max-w-screen-2xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <h2 className="text-4xl font-bold text-cyan-400 mb-4 no-autoscroll flex justify-center items-center">
              <img
                src="/images/icons/about/user.png"
                alt="Character Stats"
                width={32}
                height={32}
                className="mr-2 text-cyan-400"
              />
              CHARACTER STATS
            </h2>
          </div>
          <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Player Profile */}
          <div className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-lg p-8">
            <div className="text-cyan-400 text-xl font-bold mb-6">PLAYER PROFILE</div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Role:</span>
                <span className="text-cyan-400 font-bold">{currentRole}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Specialization:</span>
                <span className="text-cyan-400 font-bold">Web Development</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Location:</span>
                <span className="text-cyan-400 font-bold">Udaipur, Rajasthan, India</span>
              </div>
            </div>

            {/* Top Skills */}
            {skills.length > 0 && (
              <div className="mt-6">
                <div className="text-cyan-400 text-lg font-bold mb-4">TOP Skills</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    ...skills.filter(s => s.isTop).sort((a, b) => a.topId - b.topId),
                    ...skills.filter(s => !s.isTop)
                  ].slice(0, 10).map((skill) => (
                    <div
                      key={skill.id}
                      className="bg-gray-900 border border-gray-700 rounded p-3 flex items-center space-x-3 cursor-pointer hover:bg-gray-800 transition-colors"
                      onClick={() => {
                        setSelectedItem(skill);
                        setModalType('skill');
                      }}
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                        <img src={skill.icon} alt={skill.name} />
                      </div>
                      <div className="text-sm text-gray-300 font-bold">{skill.name}</div>
                    </div>
                  ))}
                </div>
                {skills.length > 10 && (
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/skills')}
                      className="text-xs bg-cyan-400 text-black px-3 py-2 rounded"
                    >
                      View All Skills
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Backstory and Certificates */}
          <div className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-lg p-8">
            <div className="text-cyan-400 text-xl font-bold mb-6">BACKSTORY</div>
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-700 rounded p-4">
                <div className="text-cyan-400 text-sm mb-2">DIALOGUE</div>
                <p className="text-gray-300 leading-relaxed">
                  "Once a curious student, I levelled up by building tiny games and solving bugs in the dark. Press Start to watch how the portfolio presents my quests."
                </p>
              </div>

              {/* Education / First Code */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 border border-gray-700 rounded p-4 text-center">
                  <img src="./images/icons/about/education.png" length={64} width={64} alt="education" className="mx-auto mb-2" />
                  <div className="text-sm text-gray-300">Computer Science</div>
                  <div className="text-xs text-cyan-400">Sir Padampat Singhania University</div>
                </div>
                <div className="bg-gray-900 border border-gray-700 rounded p-4 text-center">
                  <img src="./images/icons/about/code-start.png" length={64} width={64} alt="code" className="mx-auto mb-2" />
                  <div className="text-sm text-gray-300">First Code</div>
                  <div className="text-xs text-cyan-400">Age 15</div>
                </div>
              </div>

              {/* Certificates */}
              {certificates.length > 0 && (
                <div className="mt-8">
                  <div className="text-cyan-400 text-lg font-bold mb-4">Certificates</div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                    {displayedCertificates.map((c) => (
                      <div key={c.id} className="relative group flex justify-center">
                        <div
                          className="bg-gray-900 p-3 rounded-full certificate-glint hover:scale-110 transform transition cursor-pointer"
                          onClick={() => {
                            setSelectedItem(c);
                            setModalType('certificate');
                          }}
                        >
                          <img src={c.image || c.img} alt={c.title} className="w-10 h-10 object-contain" />
                        </div>
                        <div className="tooltip">{c.title}</div>
                      </div>
                    ))}
                  </div>
                  {certificates.length > 5 && (
                    <div className="mt-4">
                      <button
                        onClick={() => navigate("/certificates")}
                        className="text-xs bg-cyan-400 text-black px-3 py-2 rounded"
                      >
                        View All Certificates
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Interests */}
              {interests.length > 0 && (
                <div>
                  <div className="text-cyan-400 text-lg font-bold mb-4">Interests</div>
                  <div className="flex space-x-3">
                    {interests.map((interest, idx) => (
                      <div key={idx} className="relative group">
                        <div className="bg-gray-900 p-3 rounded-full hover:scale-110 transform transition certificate-glint">
                          <img src={interest.icon} alt={interest.title} className="w-8 h-8 object-contain" />
                        </div>
                        <div className="tooltip">{interest.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal
          open={!!selectedItem}
          onClose={() => {
            setSelectedItem(null);
            setModalType(null);
          }}
          title={selectedItem.name || selectedItem.title}
          image={selectedItem.icon || selectedItem.image || selectedItem.img}
          meta=
          {modalType === 'skill' ? (
            selectedItem.category || selectedItem.level
          ) : (
            [
              selectedItem.issuer ? `Issued By: ${selectedItem.issuer}` : '',
              selectedItem.issueDate ? `Issued On: ${selectedItem.issueDate}` : ''
            ]
              .filter(Boolean)
              .join(' | ')
          )}

        >
          <div className="space-y-3">
            <p className="text-gray-300">{selectedItem.details || selectedItem.description}</p>
            {selectedItem?.skillsGained?.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm uppercase text-gray-500 mb-2">
                  Skills Gained
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.skillsGained.map((skill, idx) => (
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
            {modalType === 'certificate' && (selectedItem.url || selectedItem.image) && (
              <div className='pt-4'>
                <a href={selectedItem.url || selectedItem.image} target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-400 text-black px-4 py-2 rounded font-bold hover:bg-cyan-500 transition-colors inline-block">
                  View Certificate
                </a>
              </div>
            )}
            {modalType === 'skill' && selectedItem.level && (
              <p className="text-sm text-cyan-400">Level: {selectedItem.level}</p>
            )}
          </div>
        </DetailModal>
      )}
    </section>
  );
};

export default AboutSection;
