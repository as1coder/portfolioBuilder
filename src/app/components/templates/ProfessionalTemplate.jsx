"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Twitter, Linkedin, Mail, Menu, X , Instagram } from "lucide-react";

export default function ProfessionalTemplate({ userData, projects }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

 useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      setDarkMode(stored === "true");
    } else {
      // Default system preference
      setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  // Apply dark mode to html root
  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "darkMode");
    }
  }, [darkMode]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      className={`transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-50" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav className="fixed w-full  border-b border-white backdrop-blur-md z-50 py-4 px-6 flex justify-between items-center shadow-sm">
        <h1
          className="font-bold text-xl sm:text-2xl cursor-pointer hover:text-blue-500 transition"
          onClick={() => scrollToSection("hero")}
        >
          {userData.name}
        </h1>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 items-center font-medium">
          {["about", "projects", "contact"].map((id) => (
            <li
              key={id}
              className="cursor-pointer hover:text-blue-500"
              onClick={() => scrollToSection(id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </li>
          ))}
          <li onClick={() => setDarkMode(!darkMode)} className="cursor-pointer">
            {darkMode ? <Sun /> : <Moon />}
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full shadow-md md:hidden">
            <ul className="flex flex-col items-center gap-6 py-6 font-semibold">
              {["about", "projects", "contact"].map((id) => (
                <li
                  key={id}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => scrollToSection(id)}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </li>
              ))}
              <li
                onClick={() => setDarkMode(!darkMode)}
                className="cursor-pointer"
              >
                {darkMode ? <Sun /> : <Moon />}
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6"
      >
        {userData?.photoURL && (
          <motion.img
            src={userData.photoURL}
            alt={userData.name}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mb-6 border-4 border-gray-300 dark:border-gray-700 object-cover shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          />
        )}

        <motion.h1
          className="text-3xl sm:text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {userData.name}
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg max-w-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {userData.tagline || "Frontend Developer | Building modern web apps"}
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => scrollToSection("projects")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition w-full sm:w-auto"
          >
            View Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="border border-gray-400 dark:border-gray-600 hover:border-blue-500 px-6 py-3 rounded-lg transition w-full sm:w-auto"
          >
            Contact Me
          </button>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="mb-16 border-t min-h-screen flex flex-col items-center justify-center px-6 py-12"
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl max-w-2xl text-center leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {userData.bio}
        </motion.p>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-15"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >

          {userData.skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 px-7 py-3 rounded-xl text-center font-bold text-xl shadow hover:shadow-md transition"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="py-20 px-6 min-h-screen border-t"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              className=" border-white border rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {project.title}
                </h3>
                <p className=" mb-4 text-sm sm:text-base">
                  {project.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-center"
                    >
                      Live
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-300 hover:border-blue-500 px-4 py-2 rounded-lg transition text-center"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 px-6 text-center border-t flex flex-col items-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Contact Me</h2>
        <p className="mb-6 max-w-lg  text-sm sm:text-base">
          Feel free to reach out via email or connect on social platforms.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href={`mailto:${userData.email}`}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition w-full sm:w-auto"
          >
            <Mail size={20} /> Email
          </a>
          {userData.linkedin && (
            <a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gray-400 dark:border-gray-600 px-5 py-3 rounded-lg transition hover:border-blue-500 w-full sm:w-auto"
            >
              <Linkedin size={20} /> LinkedIn
            </a>
          )}
          {userData.twitter && (
            <a
              href={userData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gray-400 dark:border-gray-600 px-5 py-3 rounded-lg transition hover:border-blue-500 w-full sm:w-auto"
            >
              <Twitter size={20} /> Twitter
            </a>
          )}
          {userData.instagram && (
            <a
              href={userData.instagram} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gray-400 dark:border-gray-600 px-5 py-3 rounded-lg transition hover:border-blue-500 w-full sm:w-auto"
            >
              <Instagram size={20} /> Instagram
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-300 dark:border-gray-700 text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} {userData.name}. All rights reserved.
      </footer>
    </div>
  );
}

