// Each project object may include:
// {
//   id: 1,
//   isTop: boolean,         // Optional: highlight top projects
//   topId: 1,               // Optional: ranking among top projects
//   title: "",              // Project title
//   category: "",           // Type or domain of project (e.g., Full Stack, AI, Cybersecurity)
//   difficulty: "",         // Difficulty level (e.g., Beginner, Intermediate, Advanced)
//   brief: "",              // Short summary for card display
//   details: "",            // Detailed explanation for modal or project page
//   tech: ["", "", ""],     // Technologies used
//   icon: "",               // Thumbnail or icon
//   github: "",             // GitHub repository link
//   liveDemo: "",           // Deployed or hosted project link
//   duration: "",           // e.g. "Jan 2025 – Mar 2025" or "2024"
//   collaborators: [""],    // Optional: contributors
//   screenshots: [""],      // Optional: gallery images
// }

export const projects = [
  {
    id: 1,
    isTop: true,
    topId: 1,
    title: "QR-Based Attendance System",
    category: "Full Stack Development",
    difficulty: "Intermediate",
    brief:
      "A secure, role-based web application for automated student attendance using QR codes and real-time tracking.",
    details: `Developed a Node.js-based attendance management system integrating QR code scanning and authentication.
• Role-based access (Admin, Faculty, Student) with encrypted passwords and JWT authentication.
• Dynamic QR code generation per session and real-time scanning for attendance logging.
• Auto-marking of absentees after scan window closure, and prevention of duplicate entries.
• Dashboards for analytics, reports, and user management.
• Reduced attendance marking time by 80% and improved accuracy through automation.`,
    tech: [
      "Node.js",
      "Express.js",
      "EJS",
      "HTML5",
      "CSS3",
      "JavaScript",
      "MongoDB",
      "JWT",
    ],
    icon: "",//"/images/projects/qr-attendance.png",
    github: "",
    liveDemo: "",
    duration: "Feb 2025 – Apr 2025",
    screenshots: [],
  },
  {
    id: 2,
    isTop: true,
    topId: 2,
    title: "Portfolio Website",
    category: "Frontend Development",
    difficulty: "Intermediate",
    brief:
      "Personal portfolio showcasing skills, certifications, internships, and projects using React and Tailwind.",
    details: `Built a dynamic and responsive portfolio using React and Tailwind CSS.
• Integrated animated transitions, modal popups, and data-driven sections.
• Implemented reusable components for cards, search, and filters.
• Optimized SEO and performance with lazy-loading and responsive design.`,
    tech: ["React", "Tailwind CSS", "JavaScript", "Framer Motion"],
    icon: "",//"/images/projects/portfolio.png",
    github: "",
    liveDemo: "",
    duration: "Jun 2025",
    screenshots: [],
  },
];
