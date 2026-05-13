import React from "react";
import ReactTypingEffect from "react-typing-effect";
import Tilt from "react-parallax-tilt";
import profileImage from "../../assets/Profile.webp";

const About = () => {
  return (
    <section
      id="about"
      className="py-10 px-[5vw] md:px-[6vw] lg:px-[10vw] font-sans mt-16 md:mt-24 lg:mt-32"
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
            I’m a MERN Stack Developer focused on building real-world web applications.
            I specialize in React, Node.js, and MongoDB, and enjoy creating clean UI with
            strong backend logic. Currently, I’m working on projects like a full-stack
            Food Delivery App and an Airbnb-style booking platform, where I focus on
            authentication, API design, and user experience.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
            <span className="bg-[#1e1b2e] text-purple-400 text-sm px-4 py-1 rounded-full">
              MERN Stack
            </span>
            <span className="bg-[#1e1b2e] text-purple-400 text-sm px-4 py-1 rounded-full">
              REST APIs
            </span>
            <span className="bg-[#1e1b2e] text-purple-400 text-sm px-4 py-1 rounded-full">
              Authentication
            </span>
            <span className="bg-[#1e1b2e] text-purple-400 text-sm px-4 py-1 rounded-full">
              Responsive UI
            </span>
          </div>

          {/* Button */}
          <a
            href="https://drive.google.com/file/d/1OneK9BQJDjSqPQ5dNeWBETebC5EgHlYf/view?usp=sharing"
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