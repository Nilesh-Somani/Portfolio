import { useState } from 'react';
import { sendContactForm } from '../services/api';
import CyberPopup from '../components/CyberPopup';

const ContactSection = () => {
  const [pilotName, setPilotName] = useState(localStorage.getItem('pilotName') || '');
  const [commanderEmail, setCommanderEmail] = useState(localStorage.getItem('commanderEmail') || '');
  const [missionSubject, setMissionSubject] = useState(localStorage.getItem('missionSubject') || '');
  const [missionBrief, setMissionBrief] = useState(localStorage.getItem('missionBrief') || '');
  const [formLoading, setFormLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('success');
  const [showPopup, setShowPopup] = useState(false);

  // Save form data to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('pilotName', pilotName);
    localStorage.setItem('commanderEmail', commanderEmail);
    localStorage.setItem('missionSubject', missionSubject);
    localStorage.setItem('missionBrief', missionBrief);
  };

  const submitMission = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setShowPopup(false);

    // Save form data
    saveToLocalStorage();

    try {
      const result = await sendContactForm({
        name: pilotName,
        email: commanderEmail,
        subject: missionSubject || 'New Mission Brief',
        message: missionBrief,
      });

      setFormLoading(false);
      
      if (result.success) {
        setPopupType('success');
        setPopupMessage('Mission brief successfully transmitted! Awaiting response...');
        // Clear form fields after successful submission
        setPilotName('');
        setCommanderEmail('');
        setMissionSubject('');
        setMissionBrief('');
        // Clear localStorage
        localStorage.removeItem('pilotName');
        localStorage.removeItem('commanderEmail');
        localStorage.removeItem('missionSubject');
        localStorage.removeItem('missionBrief');
      } else {
        setPopupType('error');
        setPopupMessage(result.message || 'Transmission failed. Please try again.');
      }
      setShowPopup(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setFormLoading(false);
      setPopupType('error');
      setPopupMessage('Critical system error. Please try again later.');
      setShowPopup(true);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="max-w-screen-xl lg:max-w-screen-2xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-cyan-400 mb-4 no-autoscroll flex justify-center items-center">
              <img
                src="/images/icons/contact/contact.png"
                alt="Send Message"
                width={32}
                height={32}
                className="mr-2 text-cyan-400"
              />
              SEND MESSAGE
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
          <p className="text-gray-300 mt-4">Ready to start a new quest together?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-lg p-8">
            <div className="text-cyan-400 text-xl font-bold mb-6">CONTACT CONSOLE</div>

            <form className="space-y-6" onSubmit={submitMission} aria-label="Game contact console">
              <div>
                <label className="block text-cyan-400 text-sm font-bold mb-2">PILOT NAME</label>
                <input
                  value={pilotName}
                  onChange={(e) => setPilotName(e.target.value)}
                  type="text"
                  name="pilot"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cyan-400 focus:outline-none text-sm"
                  placeholder="Enter your name..."
                  required
                />
              </div>
              <div>
                <label className="block text-cyan-400 text-sm font-bold mb-2">COMMANDER EMAIL</label>
                <input
                  value={commanderEmail}
                  onChange={(e) => setCommanderEmail(e.target.value)}
                  type="email"
                  name="commanderEmail"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cyan-400 focus:outline-none text-sm"
                  placeholder="your.email@domain.com"
                />
              </div>
              <div>
                <label className="block text-cyan-400 text-sm font-bold mb-2">MISSION SUBJECT</label>
                <input
                  value={missionSubject}
                  onChange={(e) => setMissionSubject(e.target.value)}
                  type="text"
                  name="subject"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cyan-400 focus:outline-none text-sm"
                  placeholder="Subject..."
                />
              </div>
              <div>
                <label className="block text-cyan-400 text-sm font-bold mb-2">MISSION BRIEF</label>
                <textarea
                  value={missionBrief}
                  onChange={(e) => setMissionBrief(e.target.value)}
                  rows={6}
                  name="brief"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 text-white focus:border-cyan-400 focus:outline-none text-sm resize-none"
                  placeholder="Describe your project or collaboration idea..."
                  required
                ></textarea>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded font-bold text-black hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 cursor-pointer whitespace-nowrap !rounded-button"
                  disabled={formLoading}
                  aria-busy={formLoading}
                >
                  {formLoading ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                </button>
              </div>
            </form>

            <CyberPopup 
              isOpen={showPopup}
              onClose={() => setShowPopup(false)}
              message={popupMessage}
              type={popupType}
            />
          </div>

          <div className="space-y-8">
            <div className="bg-black bg-opacity-80 border-2 border-cyan-400 rounded-lg p-8">
              <div className="text-cyan-400 text-xl font-bold mb-6">QUICK CONNECT</div>
              <div className="space-y-4">
                <a href="mailto:somanin408@gmail.com" className="flex items-center space-x-4 p-4 bg-gray-900 border border-gray-700 rounded hover:border-cyan-400 transition-all duration-300">
                  <div className="bg-white p-1 rounded">
                    <img src="/images/icons/contact/gmail.png" length={32} width={32} alt="Email Icon"/>
                  </div>
                  <div>
                    <div className="text-white font-bold">Email</div>
                    <div className="text-gray-400 text-sm">somanin408@gmail.com</div>
                  </div>
                </a>

                <div className="grid grid-cols-1 gap-3">
                  <a
                    href="https://linkedin.com/in/nileshsomani"
                    className="flex items-center space-x-4 p-4 bg-gray-900 border border-gray-700 rounded hover:border-cyan-400 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/icons/contact/linkedin.png" length={32} width={32} alt="LinkedIn" />
                    <div className="text-sm text-white">LinkedIn</div>
                  </a>

                  <a
                    href="https://github.com/nilesh-somani"
                    className="flex items-center space-x-4 p-4 bg-gray-900 border border-gray-700 rounded hover:border-cyan-400 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img className="bg-gray-300 rounded-full" src="/images/icons/contact/github.png" length={32} width={32} alt="GitHub" />
                    <div className="text-sm text-white">GitHub</div>
                  </a>

                  <a
                    href="https://discord.gg/3xbnERJQ"
                    className="flex items-center space-x-4 p-4 bg-gray-900 border border-gray-700 rounded hover:border-cyan-400 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/icons/contact/discord.png" length={32} width={32} alt="Discord" />
                    <div className="text-sm text-white">Discord</div>
                  </a>

                  <a
                    href="https://www.youtube.com/@nileshsomani"
                    className="flex items-center space-x-4 p-4 bg-gray-900 border border-gray-700 rounded hover:border-cyan-400 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/icons/contact/youtube.png" length={32} width={32} alt="YouTube" />
                    <div className="text-sm text-white">YouTube</div>
                  </a>

                  <a
                    href="https://wa.link/ywvers"
                    className="flex items-center space-x-4 p-4 bg-gray-900 border border-gray-700 rounded hover:border-cyan-400 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/icons/contact/whatsapp.png" length={32} width={32} alt="WhatsApp" />
                    <div className="text-sm text-white">WhatsApp</div>
                  </a>

                  <a
                    href="https://instagram.com/"
                    className="flex items-center space-x-4 p-4 bg-gray-900 border border-gray-700 rounded hover:border-cyan-400 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/images/icons/contact/instagram.png" length={32} width={32} alt="Instagram" />
                    <div className="text-sm text-white">Instagram</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;