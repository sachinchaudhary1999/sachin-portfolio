import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "education", label: "Education" },
  ];

  // Scroll detection + active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = menuItems.map((item) =>
        document.getElementById(item.id)
      );

      let current = "about";

      sections.forEach((section) => {
        if (section) {
          const top = section.offsetTop - 100;
          if (window.scrollY >= top) {
            current = section.id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll
  const handleMenuClick = (id) => {
    setIsOpen(false);

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-[5vw] md:px-[6vw] lg:px-[10vw] ${
        isScrolled
          ? "bg-[#050414]/70 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center py-5 text-white">

        {/* LOGO */}
        <div className="text-lg font-semibold cursor-pointer">
          <span className="text-[#8245ec]">&lt;</span>
          Sachin<span className="text-[#8245ec]">/</span>Chaudhary
          <span className="text-[#8245ec]">&gt;</span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex space-x-8 text-gray-300">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleMenuClick(item.id)}
                className={`relative transition ${
                  activeSection === item.id
                    ? "text-[#8245ec]"
                    : "hover:text-[#8245ec]"
                }`}
              >
                {item.label}

                {/* underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#8245ec] transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0"
                  }`}
                ></span>
              </button>
            </li>
          ))}
        </ul>

        {/* SOCIAL */}
        <div className="hidden md:flex space-x-4">
          <a
            href="https://github.com/sachinchaudhary1999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8245ec] transition"
          >
            <FaGithub size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/sachin-chaudhary-ba6a08293"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8245ec] transition"
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX
              size={28}
              className="text-[#8245ec]"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <FiMenu
              size={28}
              className="text-[#8245ec]"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#050414]/95 backdrop-blur-lg shadow-xl rounded-b-xl">
          <ul className="flex flex-col items-center py-6 space-y-5 text-gray-300">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`text-lg ${
                    activeSection === item.id
                      ? "text-[#8245ec]"
                      : "hover:text-[#8245ec]"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}

            {/* SOCIAL MOBILE */}
            <div className="flex space-x-6 pt-4">
              <a
                href="https://github.com/sachinchaudhary1999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/sachin-chaudhary-ba6a08293"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;