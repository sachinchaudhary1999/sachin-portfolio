import avatar from "../assets/profile.webp";

// Everything you are likely to edit lives in src/data. Components only render it.
export const site = {
  name: "Sachin Chaudhary",
  role: "Full-Stack Developer (MERN)",
  url: "https://sachin-portfolio-black.vercel.app",
  avatar,
  headline: "I build MERN applications from the REST API to the checkout screen.",
  summary:
    "Full-stack developer working with React, Node.js, Express and MongoDB. My projects cover JWT authentication, role-based access, payment integrations and admin dashboards, deployed on Vercel and Render.",
  // Set `open` to false to hide the status pill.
  availability: { open: true, text: "Open to new opportunities" },
  // Add your public email to show a "Copy email" button and palette action.
  email: "",
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
