// Each certificate object may include:
// {
//   id: 1,
//   isTop: boolean,         // Optional: highlight top certificates
//   title: "",              // Certificate or course title
//   issuer: "",             // Organization or institution that issued it
//   issueDate: "",          // Month and year of issue
//   url: "",                // Certificate verification or view link
//   image: "",              // Image or logo representing the certificate
//   brief: "",              // One-line summary to display on cards
//   details: "",            // Full description for modal or details page
//   skillsGained: [""],     // Optional: related skills learned
//   category: "",           // (e.g., "Web Development", "Cybersecurity")
//   validity: "",           // Optional: validity period (if any)
// }

export const certificates = [
  {
    id: 1,
    isTop: true,
    title: "Web Development Internship",
    issuer: "Vault of Codes",
    issueDate: "5 July 2025",
    url: "",
    image: "/images/certificates/vault_of_codes_web.jpg",
    brief: "Completed a web development internship focusing on HTML, CSS, and JavaScript projects.",
    details: "Worked as a Web Development Intern, creating a basic HTML portfolio page, redesigning web pages using HTML & CSS, and developing a code quest game with HTML, CSS, JavaScript, and Sortable.js. Projects included a recipe page with a timer and a game featuring MCQs and sortable puzzles with difficulty modes.",
    skillsGained: [
      "HTML",
      "CSS",
      "JavaScript",
      "Web Design",
      "Game Development",
      "UI/UX",
      "Sortable.js"
    ],
    category: "Web Development",
    validity: ""
  },
  {
    id: 2,
    isTop: true,
    title: "Ethical Hacking Training",
    issuer: "GenZ Educate Wing Pvt Ltd",
    issueDate: "18 May 2025",
    url: "",
    image: "/images/certificates/genz_ethical_hacking_training.jpg",
    brief: "Completed training in Ethical Hacking tools and cybersecurity concepts.",
    details: "Participated in a comprehensive Ethical Hacking training program, learning about tools such as Nmap, Maltego, Recon-ng, Burp Suite, and cybersecurity concepts including Social Engineering, XSS Exploitation, Testing and Assessment, and Cryptographic Techniques.",
    skillsGained: [
      "Ethical Hacking",
      "Cybersecurity",
      "Nmap",
      "Maltego",
      "Recon-ng",
      "Burp Suite",
      "Social Engineering",
      "XSS Exploitation",
      "Cryptography"
    ],
    category: "Cybersecurity",
    validity: ""
  },
  {
    id: 3,
    isTop: true,
    title: "Ethical Hacking Internship",
    issuer: "GenZ Educate Wing Pvt Ltd",
    issueDate: "18 May 2025",
    url: "",
    image: "/images/certificates/genz_ethical_hacking_internship.jpg",
    brief: "Completed internship focused on network and wireless security assessments.",
    details: "Conducted network vulnerability assessment projects using tools like Nmap, Nikto, and Metasploit to detect live hosts, scan web servers, and check for SMB vulnerabilities. Also performed wireless network security assessments using NetSpot, Acrylic Wi-Fi Analyzer, Fing, Angry IP Scanner, Wireshark, Npcap, and Nmap, analyzing vulnerabilities and providing remediation recommendations.",
    skillsGained: [
      "Network Vulnerability Assessment",
      "Wireless Security Assessment",
      "Nmap",
      "Nikto",
      "Metasploit",
      "Wireshark",
      "NetSpot",
      "Acrylic Wi-Fi Analyzer",
      "Fing",
      "Angry IP Scanner"
    ],
    category: "Cybersecurity",
    validity: ""
  },
  {
    id: 4,
    isTop: false,
    title: "Agile Scrum in Practice",
    issuer: "Infosys Ltd",
    issueDate: "11 October 2025",
    url: "",
    image: "/images/certificates/infosys_agile_scrum.jpg",
    brief: "Learned Agile principles and Scrum methodology for project management.",
    details: "This course covers Agile values and principles, Scrum roles, ceremonies, and artifacts. Learners gain practical insights into managing Agile projects, sprint planning, and iterative development.",
    skillsGained: [
      "Agile Methodology",
      "Scrum Framework",
      "Sprint Planning",
      "Project Management",
      "Team Collaboration"
    ],
    category: "Project Management",
    validity: ""
  },
  {
    id: 5,
    isTop: false,
    title: "Angular",
    issuer: "Infosys Ltd",
    issueDate: "11 October 2025",
    url: "",
    image: "/images/certificates/infosys_angular.jpg",
    brief: "Explored Angular framework for building dynamic web applications.",
    details: "The course introduces Angular architecture, components, services, routing, and data binding. Learners build scalable single-page applications using TypeScript and Angular CLI.",
    skillsGained: [
      "Angular",
      "TypeScript",
      "Component-based Architecture",
      "Routing",
      "Web Application Development"
    ],
    category: "Web Development",
    validity: ""
  },
  {
    id: 6,
    isTop: false,
    title: "Creating Responsive Web Pages using Bootstrap 4",
    issuer: "Infosys Ltd",
    issueDate: "19 June 2025",
    url: "",
    image: "/images/certificates/infosys_bootstrap4.jpg",
    brief: "Learned to build responsive websites using Bootstrap 4.",
    details: "This course covers Bootstrap grid system, components, utilities, and responsive design techniques. Learners create mobile-friendly web pages with consistent styling.",
    skillsGained: [
      "Bootstrap 4",
      "Responsive Design",
      "HTML",
      "CSS",
      "Web Layouts"
    ],
    category: "Web Development",
    validity: ""
  },
  {
    id: 7,
    isTop: false,
    title: "CSS3",
    issuer: "Infosys Ltd",
    issueDate: "18 June 2025",
    url: "",
    image: "/images/certificates/infosys_css3.jpg",
    brief: "Mastered styling techniques using CSS3.",
    details: "The course covers advanced CSS3 features including transitions, animations, flexbox, and grid layout. Learners enhance web page aesthetics and responsiveness.",
    skillsGained: [
      "CSS3",
      "Flexbox",
      "Grid Layout",
      "Animations",
      "Responsive Styling"
    ],
    category: "Web Development",
    validity: ""
  },
  {
    id: 8,
    isTop: false,
    title: "Email Writing Skills",
    issuer: "Infosys Ltd",
    issueDate: "18 June 2025",
    url: "",
    image: "/images/certificates/infosys_email_writing_skills.jpg",
    brief: "Improved professional email communication skills.",
    details: "This course teaches email etiquette, structure, tone, and clarity. Learners practice writing effective emails for workplace scenarios.",
    skillsGained: [
      "Email Etiquette",
      "Professional Communication",
      "Written Clarity",
      "Tone Management"
    ],
    category: "Communication",
    validity: ""
  },
  {
    id: 9,
    isTop: false,
    title: "High Impact Presentation",
    issuer: "Infosys Ltd",
    issueDate: "18 June 2025",
    url: "",
    image: "/images/certificates/infosys_high_impact.jpg",
    brief: "Learned techniques for delivering impactful presentations.",
    details: "The course focuses on presentation structure, visual aids, audience engagement, and delivery skills. Learners gain confidence in public speaking and storytelling.",
    skillsGained: [
      "Presentation Skills",
      "Public Speaking",
      "Visual Communication",
      "Audience Engagement"
    ],
    category: "Communication",
    validity: ""
  },
  {
    id: 10,
    isTop: false,
    title: "HTML5 - The Language",
    issuer: "Infosys Ltd",
    issueDate: "18 June 2025",
    url: "",
    image: "/images/certificates/infosys_html5.jpg",
    brief: "Learned the fundamentals of HTML5 for web development.",
    details: "This course covers HTML5 elements, semantic tags, multimedia integration, and form handling. Learners build structured and accessible web pages.",
    skillsGained: [
      "HTML5",
      "Semantic Markup",
      "Web Forms",
      "Multimedia Embedding"
    ],
    category: "Web Development",
    validity: ""
  },
  {
    id: 11,
    isTop: false,
    title: "JavaScript",
    issuer: "Infosys Ltd",
    issueDate: "18 June 2025",
    url: "",
    image: "/images/certificates/infosys_javascript.jpg",
    brief: "Learned JavaScript programming for dynamic web pages.",
    details: "The course introduces JavaScript syntax, DOM manipulation, event handling, and basic programming concepts. Learners create interactive web features.",
    skillsGained: [
      "JavaScript",
      "DOM Manipulation",
      "Event Handling",
      "Programming Logic"
    ],
    category: "Web Development",
    validity: ""
  },
  {
    id: 12,
    isTop: false,
    title: "Time Management",
    issuer: "Infosys Ltd",
    issueDate: "18 June 2025",
    url: "",
    image: "/images/certificates/infosys_time_management.jpg",
    brief: "Developed strategies for effective time management.",
    details: "This course teaches prioritization, scheduling, goal setting, and productivity techniques. Learners improve personal and professional time efficiency.",
    skillsGained: [
      "Time Management",
      "Prioritization",
      "Goal Setting",
      "Productivity"
    ],
    category: "Time Management",
    validity: ""
  },
  {
    id: 13,
    isTop: false,
    title: "Twitter Bootstrap",
    issuer: "Infosys Ltd",
    issueDate: "11 October 2025",
    url: "",
    image: "/images/certificates/infosys_twitter_bootstrap.jpg",
    brief: "Learned to use Bootstrap for responsive web design.",
    details: "The course covers Bootstrap components, grid system, and customization. Learners build responsive and mobile-first websites efficiently.",
    skillsGained: [
      "Bootstrap",
      "Responsive Design",
      "Web Components",
      "Mobile-first Development"
    ],
    category: "Web Development",
    validity: ""
  },
  {
    id: 14,
    isTop: false,
    title: "TypeScript",
    issuer: "Infosys Ltd",
    issueDate: "11 October 2025",
    url: "",
    image: "/images/certificates/infosys_typescript.jpg",
    brief: "Learned TypeScript for scalable web development.",
    details: "This course introduces TypeScript syntax, types, interfaces, and integration with JavaScript frameworks. Learners write robust and maintainable code.",
    skillsGained: [
      "TypeScript",
      "Static Typing",
      "Interfaces",
      "Code Scalability"
    ],
    category: "Web Development",
    validity: ""
  },
  {
    id: 15,
    isTop: false,
    title: "User Experience",
    issuer: "Infosys Ltd",
    issueDate: "19 June 2025",
    url: "",
    image: "/images/certificates/infosys_user_experience.jpg",
    brief: "Explored principles of user-centered design.",
    details: "The course covers UX fundamentals, user research, wireframing, and usability testing. Learners design intuitive and engaging digital experiences.",
    skillsGained: [
      "User Experience Design",
      "Wireframing",
      "Usability Testing",
      "User Research"
    ],
    category: "Web Development",
    validity: ""
  },
  {
    id: 16,
    isTop: false,
    title: "Website Creation",
    issuer: "Infosys Ltd",
    issueDate: "18 June 2025",
    url: "",
    image: "/images/certificates/infosys_website_creation.jpg",
    brief: "Learned to build and publish websites using modern web technologies.",
    details: "This course introduces learners to the process of creating websites from scratch using HTML, CSS, and JavaScript. It covers planning, designing, coding, and deploying websites, with hands-on practice in building responsive and user-friendly web pages.",
    skillsGained: [
      "Website Development",
      "HTML",
      "CSS",
      "JavaScript",
      "Responsive Design",
      "Web Hosting"
    ],
    category: "Web Development",
    validity: ""
  }
];