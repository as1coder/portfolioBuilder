"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Twitter, Linkedin, Mail, Menu, X, Instagram } from "lucide-react";

export default function MinimalPortfolio({ userData, projects }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      className={`transition-colors duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Navbar */}
      <nav className="fixed w-full top-0 left-0 px-6 py-4 flex justify-between items-center backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-800">
        <h1
          className="font-bold text-lg cursor-pointer"
          onClick={() => scrollToSection("hero")}
        >
          {userData.name}
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-sm">
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
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </li>
        </ul>

        {/* Mobile Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {menuOpen && (
          <div className="absolute top-14 left-0 w-full border-t border-gray-200  md:hidden">
            <ul className="flex flex-col items-center gap-6 py-6 text-sm">
              {["about", "projects", "contact"].map((id) => (
                <li
                  key={id}
                  className="cursor-pointer hover:text-blue-500"
                  onClick={() => scrollToSection(id)}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </li>
              ))}
              <li onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
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
          <img
            src={userData.photoURL}
            alt={userData.name}
            className="w-28 h-28 rounded-full mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
        <p className="text-sm mb-6">{userData.tagline}</p>

        <div className="flex gap-4">
          <button
            onClick={() => scrollToSection("projects")}
            className="px-4 py-2 text-sm border rounded hover:bg-blue-500 hover:text-white transition"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-4 py-2 text-sm border rounded hover:bg-blue-500 hover:text-white transition"
          >
            Contact
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">About Me</h2>
        <p className="max-w-2xl mx-auto text-sm mb-8">{userData.bio}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {userData.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-4 py-2 border rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Projects</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg overflow-hidden hover:shadow transition"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-xs mb-3">{project.description}</p>
              <div className="flex gap-2">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      className="text-xs border px-3 py-1 rounded hover:bg-blue-500 hover:text-white"
                    >
                      Live
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      className="text-xs border px-3 py-1 rounded hover:bg-blue-500 hover:text-white"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 text-center">
        <h2 className="text-2xl font-bold mb-6">Contact Me</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${userData.email}`}
            className="flex items-center gap-2 text-sm border px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
          >
            <Mail size={16} /> Email
          </a>
          {userData.linkedin && (
            <a
              href={userData.linkedin}
              target="_blank"
              className="flex items-center gap-2 text-sm border px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
          {userData.twitter && (
            <a
              href={userData.twitter}
              target="_blank"
              className="flex items-center gap-2 text-sm border px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
            >
              <Twitter size={16} /> Twitter
            </a>
          )}
          {userData.instagram && (
            <a
              href={userData.instagram}
              target="_blank"
              className="flex items-center gap-2 text-sm border px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
            >
              <Instagram size={16} /> Instagram
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-xs border-t border-gray-200 dark:border-gray-800">
        &copy; {new Date().getFullYear()} {userData.name}
      </footer>
    </div>
  );
}
