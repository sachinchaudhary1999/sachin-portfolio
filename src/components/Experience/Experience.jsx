import React from "react";
import { experiences } from "../../constants";

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-2"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EXPERIENCE</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          My professional experience including freelance work and MERN development
        </p>
      </div>

      {/* ✅ YOUR FIXED TIMELINE */}
      <div className="relative">

        <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 w-1 bg-white h-full z-0"></div>

        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className={`relative flex flex-col sm:flex-row items-center mb-16 ${
              index % 2 === 0 ? "sm:justify-end" : "sm:justify-start"
            }`}
          >

            <div className="absolute sm:left-1/2 left-0 transform -translate-x-1/2 bg-gray-400 border-4 border-[#8245ec] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center z-0">
              {typeof experience.img === "string" ? (
                <span className="text-xl">{experience.img}</span>
              ) : (
                <img
                  src={experience.img}
                  alt={experience.company}
                  className="w-full h-full object-cover rounded-full"
                />
              )}
            </div>

            <div
              className={`relative z-10 w-full sm:max-w-md p-4 sm:p-8 rounded-2xl shadow-2xl border border-white bg-gray-900 backdrop-blur-md ${
                index % 2 === 0 ? "sm:ml-0" : "sm:mr-0"
              } sm:ml-52 sm:mr-52 ml-8`}
            >

              <div className="flex items-start gap-4">
                <div className="min-w-[48px] h-[48px] flex items-center justify-center bg-white rounded-full text-xl">
                  {typeof experience.img === "string" ? (
                    <span>{experience.img}</span>
                  ) : (
                    <img
                      src={experience.img}
                      alt={experience.company}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {experience.role}
                  </h3>
                  <h4 className="text-sm text-gray-300">
                    {experience.company}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {experience.date}
                  </p>
                </div>
              </div>

              <ul className="mt-4 text-gray-400 list-disc pl-5 space-y-1">
                {Array.isArray(experience.desc)
                  ? experience.desc.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))
                  : <li>{experience.desc}</li>}
              </ul>

              <div className="mt-4">
                <h5 className="font-medium text-white">Skills:</h5>
                <div className="flex flex-wrap mt-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#8245ec] text-gray-300 px-3 py-1 text-xs rounded-lg mr-2 mb-2 border border-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;