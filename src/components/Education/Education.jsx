import React from "react";
import { education } from "../../constants";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-3"
    >
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EDUCATION</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          My education journey and academic background
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">

        {/* Vertical Line */}
        <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 w-1 bg-white h-full z-0"></div>

        {education.map((edu, index) => (
          <div
            key={edu.id}
            className={`relative flex flex-col sm:flex-row items-center mb-16 ${
              index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
          >

            {/* Timeline Circle */}
            <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 bg-gray-400 border-4 border-[#8245ec] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center z-0">
              <img
                src={edu.img}
                alt={edu.school}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Card */}
            <div
              className={`relative z-10 w-full sm:max-w-md p-4 sm:p-8 rounded-2xl shadow-2xl border border-white bg-gray-900 backdrop-blur-md ${
                index % 2 === 0 ? "sm:ml-0" : "sm:mr-0"
              } sm:ml-52 sm:mr-52 ml-8 transform transition duration-300 hover:scale-105`}
            >

              {/* Header */}
              <div className="flex items-start gap-4">

                {/* Logo */}
                <div className="min-w-[48px] h-[48px] bg-white rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={edu.img}
                    alt={edu.school}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {edu.degree}
                  </h3>

                  <h4 className="text-sm text-gray-300">
                    {edu.school}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1">
                    {edu.date}
                  </p>
                </div>

              </div>

              {/* Grade */}
              {edu.grade &&
                (edu.degree.includes("MCA") || edu.degree.includes("BCA")) && (
                  <p className="mt-4 text-gray-400 font-bold">
                    Grade: {edu.grade}
                  </p>
                )}

              {/* Description (FIXED) */}
              <ul className="mt-4 text-gray-400 list-disc pl-5 space-y-1">
                {Array.isArray(edu.desc)
                  ? edu.desc.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))
                  : <li>{edu.desc}</li>}
              </ul>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;