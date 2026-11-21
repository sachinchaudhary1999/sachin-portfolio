import avatar from "../assets/profile.webp";

// Everything you are likely to edit lives in src/data. Components only render it.
export const site = {
  name: "Sachin Chaudhary",
  role: "Full-Stack Developer (MERN)",
  url: "https://sachin-portfolio-black.vercel.app",
  avatar,
  headline: "Building scalable applications with full-stack engineering and cloud technologies.",
  summary:
    "Full-Stack Developer specializing in building scalable, secure, and high-performance web applications using React.js, Node.js, Express.js, and MongoDB. Experienced in designing RESTful APIs, JWT-based authentication, role-based access control, payment gateway integrations, real-time systems, and admin dashboards. Skilled in database optimization, Redis caching, Docker containerization, Kubernetes orchestration, and AWS cloud services. Experienced in application testing, load testing using k6, and performance monitoring with Prometheus and Grafana. Experienced in deploying, configuring, and managing production-grade applications on AWS, leveraging cloud infrastructure, scalable deployment architectures, containerization, and application monitoring to ensure reliability, performance, and availability.",
  // Set `open` to false to hide the status pill.
  availability: { open: true, text: "Open to new opportunities" },
  // Add your public email to show a "Copy email" button and palette action.
  email: "sachinchaudhary9794@gmail.com",
  resumeUrl:
    "https://drive.google.com/file/d/16gNyK4Q6_viF3iOquEuwbyy2cMwv1v4w/view?usp=sharing",
  github: { user: "sachinchaudhary1999", url: "https://github.com/sachinchaudhary1999" },
  linkedin: "https://www.linkedin.com/in/sachin-chaudhary-ba6a08293",
};

export const nav = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "github", label: "GitHub" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
