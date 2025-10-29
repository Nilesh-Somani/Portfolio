// Each internship object may include:
// {
//   id: 1,
//   company: "",              // Company name
//   role: "",                 // Internship title or position
//   brief: "",                // Short summary for card display
//   overview: "",             // Concise intro paragraph for detail page
//   responsibilities: [""],   // Key tasks or contributions
//   achievements: [""],       // Key results or learnings
//   tech: ["", "", ""],       // Technologies used
//   logo: "",                 // Logo image
//   duration: "",             // Duration (e.g., "Jan–Mar 2025")
//   location: "",             // "Remote", "On-site", etc.
//   category: "",             // Domain category
//   certificateUrl: "",       // Optional certificate link
//   reportUrl: "",            // Optional report file
//   projectLinks: [""],       // Optional project URLs
//   screenshots: [""],        // Optional image URLs for carousel/gallery
// }

export const internships = [
  {
    id: 1,
    company: "Vault of Codes",
    role: "Web Development Intern",
    brief:
      "Designed and developed interactive web projects using HTML, CSS, and JavaScript.",
    overview:
      "During my internship at Vault of Codes, I focused on enhancing front-end development skills by building multiple interactive projects emphasizing usability, design, and functionality.",
    responsibilities: [
      "Developed a personal portfolio site showcasing About, Skills, and Projects sections.",
      "Redesigned static pages with improved layout using HTML and CSS.",
      "Created an interactive Recipe Page with timer and steps tracker.",
      "Built a mini ‘Code Quest’ game integrating MCQs and drag-and-drop puzzles using Sortable.js.",
    ],
    achievements: [
      "Learned real-world project structuring and reusable code organization.",
      "Improved proficiency in responsive UI and cross-browser compatibility.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Sortable.js"],
    logo: "/images/internships/vaultofcodes.png",
    duration: "Jun 2025",
    location: "Remote",
    category: "Web Development",
    certificateUrl: "",
    reportUrl: "",
    projectLinks: [],//["https://nilesh-somani.github.io/Internship/"],
    screenshots: [],//["/images/internships/vault1.png", "/images/internships/vault2.png"],
  },
  {
    id: 2,
    company: "GenZ Educate Wing Pvt. Ltd.",
    role: "Ethical Hacking Intern",
    brief:
      "Performed penetration testing and vulnerability assessments using cybersecurity tools and techniques.",
    overview:
      "At GenZ Educate Wing, I gained hands-on experience in identifying, analyzing, and mitigating security vulnerabilities across network and web infrastructures.",
    responsibilities: [
      "Conducted vulnerability scans using Nmap, Nikto, and Metasploit.",
      "Performed wireless network security assessments with NetSpot, Fing, and Wireshark.",
      "Analyzed results, documented vulnerabilities, and proposed mitigation strategies.",
      "Practiced ethical hacking concepts including reconnaissance, social engineering, and XSS attacks.",
    ],
    achievements: [
      "Developed strong understanding of cybersecurity workflows.",
      "Successfully detected and reported multiple system vulnerabilities.",
    ],
    tech: ["Nmap", "Wireshark", "Metasploit", "Burp Suite", "Recon-ng"],
    logo: "/images/internships/genzeducate.png",
    duration: "Jan 2025 – Mar 2025",
    location: "Remote",
    category: "Cybersecurity",
    certificateUrl: "",
    reportUrl: "",
    projectLinks: [],
    screenshots: [],//["/images/internships/genz1.png", "/images/internships/genz2.png"],
  },
];
