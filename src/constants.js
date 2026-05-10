// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import sassLogo from './assets/tech_logo/sass.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import angularLogo from './assets/tech_logo/angular.png';
import reduxLogo from './assets/tech_logo/redux.png';
import nextjsLogo from './assets/tech_logo/nextjs.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import gsapLogo from './assets/tech_logo/gsap.png';
import materialuiLogo from './assets/tech_logo/materialui.png';
import bootstrapLogo from './assets/tech_logo/bootstrap.png';
import springbootLogo from './assets/tech_logo/springboot.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';
import expressjsLogo from './assets/tech_logo/express.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import firebaseLogo from './assets/tech_logo/firebase.png';
import cLogo from './assets/tech_logo/c.png';
import cppLogo from './assets/tech_logo/cpp.png';
import javaLogo from './assets/tech_logo/java.png';
import pythonLogo from './assets/tech_logo/python.png';
import typescriptLogo from './assets/tech_logo/typescript.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import postmanLogo from './assets/tech_logo/postman.png';
import mcLogo from './assets/tech_logo/mc.png';
import figmaLogo from './assets/tech_logo/figma.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import postgreLogo from './assets/tech_logo/postgre.png';
import csharpLogo from './assets/tech_logo/csharp.png';

// Experience Section Logo's
import Brostartup from './assets/company_logo/bro.png';


// Education Section Logo's
import glaLogo from './assets/education_logo/knit logo.jpg';
import bsaLogo from './assets/education_logo/LU.jpg';
import vpsLogo from './assets/education_logo/xavier.png';

// // Project Section Logo's

import BiteRush from './assets/work_logo/BiteRush.png';
import TravelNest from './assets/work_logo/TravelNest.png';


export const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'SASS', logo: sassLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      // { name: 'Angular', logo: angularLogo },
      // { name: 'Redux', logo: reduxLogo },
      // { name: 'Next JS', logo: nextjsLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },
      // { name: 'GSAP', logo: gsapLogo },
      { name: 'Material UI', logo: materialuiLogo },
      { name: 'Bootstrap', logo: bootstrapLogo },
    ],
  },
  {
    title: 'Backend',
    skills: [
      // { name: 'Springboot', logo: springbootLogo },
      { name: 'Node JS', logo: nodejsLogo },
      { name: 'Express JS', logo: expressjsLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'Firebase', logo: firebaseLogo },
      // { name: 'PostgreSQL', logo: postgreLogo },
    ],
  },
  {
    title: 'Languages',
    skills: [
      // { name: 'C', logo: cLogo },
      // { name: 'C++', logo: cppLogo },
      { name: 'Java', logo: javaLogo },
      // { name: 'Python', logo: pythonLogo },
      // { name: 'C-Sharp', logo: csharpLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'TypeScript', logo: typescriptLogo },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Postman', logo: postmanLogo },
      { name: 'Compass', logo: mcLogo },
      { name: 'Vercel', logo: vercelLogo },
      { name: 'Netlify', logo: netlifyLogo },
      { name: 'Figma', logo: figmaLogo },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    img: "💼",
    role: "Frontend Developer (Freelance / Project-Based)",
    company: "Self / Startup Collaboration",
    date: "Jan 2026 – Present",
    desc: [
      "Developing responsive frontend applications using React and Tailwind CSS",
      "Building full-stack MERN projects including authentication and REST APIs",
      "Improving UI/UX and optimizing performance of web applications",
    ],
    skills: ["React JS", "JavaScript", "Tailwind CSS", "Node JS", "MongoDB"],
  },
  {
    id: 1,
    img: "🏢",
    role: "Junior MERN Stack Developer (Frontend-focused)",
    company: "Praveg’s Grand Eulogia",
    date: "Jun 2025 – Dec 2025",
    desc: [
      "Built reusable UI components using React.js",
      "Integrated REST APIs and handled async data flow",
      "Improved application responsiveness and UX",
    ],
    skills: ["React JS", "JavaScript", "Tailwind CSS", "API Integration"],
  },
  {
    id: 2,
    img: "🎓",
    role: "Full Stack Developer Intern",
    company: "Brostartup Ventures Pvt. Ltd.",
    date: "Nov 2024 – Apr 2025",
    desc: [
      "Worked on frontend and backend using MERN stack",
      "Built responsive UI and integrated APIs",
      "Debugged and tested applications",
    ],
    skills: ["React JS", "Node JS", "MongoDB", "JavaScript"],
  },
];


  export const education = [
  {
    id: 0,
    img: glaLogo,
    school: "Kamla Nehru Institute Of Technology, Sultanpur",
    date: "October 2023 - June 2025",
    grade: "7.77 CGPA",
    degree: "Master Of Computer Application - MCA",
    desc: [
      "Focused on full-stack development using MERN stack",
      "Built responsive web applications and REST APIs",
      "Studied core subjects: Data Structures, DBMS, OOP, Software Engineering",
      "Participated in technical workshops and hands-on projects"
    ],
  },
  {
    id: 1,
    img: bsaLogo,
    school: "University of Lucknow, Lucknow",
    date: "July 2019 - June 2022",
    grade: "67%",
    degree: "Bachelor of Computer Application - BCA",
    desc: [
      "Developed strong foundation in programming and computer fundamentals",
      "Worked on academic projects applying real-world problem solving",
      "Studied core subjects: Data Structures, DBMS, Web Development, OOP"
    ],
  },
  {
    id: 2,
    img: vpsLogo,
    school: "St. Xavier’s High School, Balrampur",
    date: "Apr 2017 - June 2018",
    degree: "CBSE (XII) - PCM with Computer Science",
    desc: [
      "Studied Physics, Chemistry, Mathematics, and Computer Science",
      "Built foundational analytical and problem-solving skills"
    ],
  },
  {
    id: 3,
    img: vpsLogo,
    school: "St. Xavier’s High School, Balrampur",
    date: "Apr 2015 - June 2016",
    degree: "CBSE (X), Science with Computer Application",
    desc: [
      "Studied Science with Computer Application",
      "Developed early interest in computers and programming"
    ],
  },
];
 
   
  
export const projects = [

    {
    id: 1,
    title: "BiteRush – Full-Stack Food Delivery Platform",
    description:
      "A production-ready food delivery platform built using the MERN stack. Features include JWT-based authentication with protected routes, real-time cart and order tracking, and secure payment integration using Stripe/Razorpay. Developed a comprehensive admin dashboard with analytics for managing users, orders, and inventory, along with dynamic product listings and a responsive UI. Currently enhancing features and optimizing payment workflows.",
    image: BiteRush,
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Stripe",
      "Razorpay",
      "JWT"
    ],
    github: "https://github.com/sachinchaudhary1999/BiteRush.git",
    webapp: "https://your-food-app.vercel.app",
    status: "Feature Enhancement Ongoing",
  },
  
{
  id: 2,
  title: "TravelNest – Vacation Rental Platform",
  description:
    "Developing a full-stack vacation rental platform with secure authentication, property listings, bookings, reviews, wishlist, and messaging. Designed RESTful APIs, implemented protected routes, and built a responsive UI using Tailwind. Currently enhancing booking validation, availability logic, and user dashboard.",
  image: TravelNest,
  tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "JWT", "Cloudinary"],
  github: "https://github.com/sachinchaudhary1999/TravelNest.git",
  webapp: "https://travel-nest-jade.vercel.app/",
  status: "Feature Enhancement Ongoing"
},
];


  