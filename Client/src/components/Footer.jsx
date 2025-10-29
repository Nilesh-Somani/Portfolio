const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-90 border-t-2 border-cyan-400 py-8">
      <div className="max-w-screen-xl lg:max-w-screen-2xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-cyan-400 font-bold text-xl mb-4 md:mb-0">Nilesh-Somani.Dev © {new Date().getFullYear()}</div>
          <div className="flex space-x-6">
            <a
              href="https://instagram.com/"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://discord.gg/3xbnERJQ"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-discord text-xl"></i>
            </a>
            <a
              href="https://www.youtube.com/@nileshsomani"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube text-xl"></i>
            </a>
            <a
              href="https://wa.link/ywvers"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;