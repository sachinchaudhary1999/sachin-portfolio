import React from "react";
import ReactTypingEffect from "react-typing-effect";
import Tilt from "react-parallax-tilt";
import profileImage from "../../assets/Profile.webp";

const About = () => {


    const highlights = [
    "MERN Stack",
    "REST APIs",
    "Authentication",
    "Responsive UI",
  ];



  return (
    <section
      id="about"
      className=" scroll-mt-24 py-10 px-[5vw] md:px-[6vw] lg:px-[10vw] font-sans mt-16 md:mt-24 lg:mt-32"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">

        {/* LEFT */}
        <div className="md:w-1/2 text-center md:text-left">

          {/* Greeting */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            Hi, I am
          </h1>

          {/* Name */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Sachin Chaudhary
          </h2>

          {/* Typing */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-[#8245ec]">
            <span className="text-white">I build </span>
            <ReactTypingEffect
              text={[
                "Full-Stack Web Applications",
                "Modern React Interfaces",
                "Scalable Backend APIs",
                "Clean & Responsive UI",
              ]}
              speed={80}
              eraseSpeed={40}
              typingDelay={400}
              eraseDelay={2000}
            />
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
          I’m a MERN Stack Developer skilled in building modern full-stack web applications using React.js, Node.js, Express.js, and MongoDB. I have experience creating responsive UIs, developing REST APIs, handling authentication, and managing databases efficiently.

My skills include JavaScript, React, Redux, Tailwind CSS, Node.js, Express.js, MongoDB, Git, GitHub, Cloudinary, Vercel, Render, and AWS. I enjoy building scalable and user-friendly applications with clean design and strong backend logic.


          </p>
{/* Highlights */}
<div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
  {highlights.map((item, index) => (
    <span
      key={index}
      className="bg-[#1e1b2e]/80 backdrop-blur-sm text-purple-400 text-sm px-4 py-2 rounded-full border border-purple-500/20 hover:scale-105 hover:border-purple-500/50 transition duration-300"
    >
      {item}
    </span>
  ))}
</div>
          {/* Button */}
          <a
            href="https://drive.google.com/file/d/16gNyK4Q6_viF3iOquEuwbyy2cMwv1v4w/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #8245ec, #a855f7)",
              boxShadow: "0 0 20px rgba(130,69,236,0.5)",
            }}
          >
            Download Resume
          </a>
        </div>

        {/* RIGHT */}
        <div className="md:w-1/2 flex justify-center">
          <Tilt
            className="w-56 h-56 sm:w-72 sm:h-72 md:w-[26rem] md:h-[26rem] rounded-full border border-purple-500/30"
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            scale={1.05}
          >
            <img
              src={profileImage}
              alt="Sachin"
              className="w-full h-full object-cover rounded-full shadow-[0_10px_40px_rgba(130,69,236,0.5)]"
            />
          </Tilt>
        </div>

      </div>
    </section>
  );
};

export default About;