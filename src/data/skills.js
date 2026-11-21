import {
  SiHtml5, SiCss3, SiSass, SiJavascript, SiReact, SiRedux, SiTailwindcss, SiMui,
  SiBootstrap, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiFirebase, SiJsonwebtokens,
  SiStripe, SiRazorpay, SiCloudinary, SiGit, SiGithub, SiPostman, SiVercel, SiNetlify,
  SiRender, SiAmazonwebservices, SiFigma,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";

export const skillGroups = [
  {
    title: "Frontend",
    note: "Component-driven, responsive interfaces.",
    skills: [
      { name: "React", icon: SiReact },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Redux", icon: SiRedux },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "Sass", icon: SiSass },
      { name: "Material UI", icon: SiMui },
      { name: "Bootstrap", icon: SiBootstrap },
    ],
  },
  {
    title: "Backend and data",
    note: "REST APIs, auth and persistence.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "Firebase", icon: SiFirebase },
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "Stripe", icon: SiStripe },
      { name: "Razorpay", icon: SiRazorpay },
      { name: "Cloudinary", icon: SiCloudinary },
      { name: "Java", icon: FaJava },
    ],
  },
  {
    title: "Tooling and deployment",
    note: "Shipping and debugging.",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "VS Code", icon: VscCode },
      { name: "Postman", icon: SiPostman },
      { name: "Vercel", icon: SiVercel },
      { name: "Render", icon: SiRender },
      { name: "Netlify", icon: SiNetlify },
      { name: "AWS", icon: SiAmazonwebservices },
      { name: "Figma", icon: SiFigma },
    ],
  },
];
