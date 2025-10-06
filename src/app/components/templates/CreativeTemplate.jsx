"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Twitter,
  Linkedin,
  Mail,
  Menu,
  X,
  Instagram,
  Github,
  ExternalLink,
  Code2,
  Sparkles,
  ChevronDown,
  MapPin,
  Calendar,
  Download
} from "lucide-react";

export default function ProfessionalTemplate({ userData, projects }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);


  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroInView = useInView(heroRef, { threshold: 0.3 });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const rawTaglines = userData?.tagline || "";

  const dynamicTitles = useMemo(() => {
    if (typeof rawTaglines === "string") {
      return rawTaglines
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);
    }
    if (Array.isArray(rawTaglines)) {
      return rawTaglines.filter(Boolean);
    }
    return ["Frontend Developer"];
  }, [rawTaglines]);

  useEffect(() => {
    const currentTitle = dynamicTitles[currentWordIndex];
    if (!currentTitle) return;

    const typewriterTimeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < currentTitle.length) {
          setTypedText(currentTitle.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentCharIndex > 0) {
          setTypedText(currentTitle.slice(0, currentCharIndex - 1));
          setCurrentCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex(prev => (prev + 1) % dynamicTitles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(typewriterTimeout);
  }, [currentCharIndex, currentWordIndex, isDeleting, dynamicTitles]);
  // Dark mode persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Smooth scrolling with offset for fixed navbar
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setMenuOpen(false);
  };

  // Enhanced floating particles component
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${darkMode ? "bg-white/20" : "bg-purple-600/30"
            }`}
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  // Navbar scroll effect
  const [navbarBg, setNavbarBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavbarBg(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Primary Gradient Background */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${darkMode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
            }`}
        />

        {/* Enhanced Animated Blobs */}
        <motion.div
          className={`absolute top-20 left-10 w-96 h-96 rounded-full filter blur-3xl ${darkMode ? "bg-blue-500/30" : "bg-purple-400/40"
            }`}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.3, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute bottom-20 right-10 w-80 h-80 rounded-full filter blur-3xl ${darkMode ? "bg-purple-600/30" : "bg-blue-400/40"
            }`}
          animate={{
            x: [0, -120, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 1.4, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute top-1/2 left-1/2 w-72 h-72 rounded-full filter blur-3xl ${darkMode ? "bg-pink-600/20" : "bg-green-400/30"
            }`}
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -60, 60, 0],
            scale: [1, 1.2, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Enhanced Grid Pattern */}
        <motion.div
          className={`absolute inset-0 ${darkMode ? "opacity-5" : "opacity-10"}`}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${darkMode ? '#ffffff' : '#000000'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </motion.div>
      </div>

      {/* Enhanced Glassmorphism Navbar */}
      <motion.nav
        className={`fixed w-full backdrop-blur-lg z-50 border-b transition-all duration-500 ${navbarBg
          ? darkMode
            ? "bg-gray-900/90 border-gray-700/50 shadow-2xl"
            : "bg-white/90 border-gray-200/50 shadow-2xl"
          : darkMode
            ? "bg-gray-900/40 border-gray-700/30"
            : "bg-white/40 border-gray-200/30"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <motion.h1
            className="font-bold text-xl sm:text-2xl cursor-pointer bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {userData?.name || "Portfolio"}
          </motion.h1>

          {/* Desktop menu */}
          <ul className="hidden md:flex gap-8 items-center font-medium">
            {["about", "projects", "contact"].map((id, index) => (
              <motion.li
                key={id}
                className={`cursor-pointer relative group ${darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                onClick={() => scrollToSection(id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.li>
            ))}
            <motion.li
              onClick={() => setDarkMode(!darkMode)}
              className="cursor-pointer p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              whileHover={{
                scale: 1.1,
                rotate: 180,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          </ul>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors "
              }`}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Enhanced Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className={`md:hidden backdrop-blur-lg border-t ${darkMode ? "bg-gray-900/95 border-gray-700/50" : "bg-white/95 border-gray-200/50"
                }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col items-center gap-6 py-6 font-semibold">
                {["about", "projects", "contact"].map((id, index) => (
                  <motion.li
                    key={id}
                    className={`cursor-pointer transition-colors ${darkMode ? "text-gray-200 hover:text-blue-400" : "text-gray-700 hover:text-blue-600"
                      }`}
                    onClick={() => scrollToSection(id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </motion.li>
                ))}   <motion.li
                  onClick={() => setDarkMode(!darkMode)}
                  className={`cursor-pointer p-2 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"} shadow-lg`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <AnimatePresence mode="wait">
                    {darkMode ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Sun size={20} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Moon size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>

              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20"
      >
        <motion.div style={{ opacity, scale, y }}>
          {/* Profile Image with Enhanced Animation */}
          {userData?.photoURL && (
            <motion.div
              className="mb-8 justify-center items-center flex"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              {/* Rotating Gradient Ring */}
              <motion.div
                className=" justify-center items-center p-1"
              >
                <div className="rounded-full p-1">
                  <motion.img
                    src={userData.photoURL}
                    alt={userData.name}
                    className="w-36 h-36 sm:w-44 sm:h-44  rounded-full object-cover  shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Name Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1
              className={`text-5xl sm:text-7xl font-black mb-4 ${darkMode ? "text-white" : "text-gray-900"
                }`}
              style={{
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              {userData?.name || "Your Name"}
            </motion.h1>
          </motion.div>

          {/* Dynamic Typewriter Title */}
          <motion.div
            className="h-16 mb-6 flex text-wrap  justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.h2
              className={`text-2xl sm:text-3xl self-center-safe font-bold ${darkMode ? "text-blue-400" : "text-purple-600"
                }`}
            >
              {typedText}
              <motion.span
                className={`ml-1 ${darkMode ? "text-blue-400" : "text-purple-600"}`}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.h2>
          </motion.div>

          {/* Status Indicators */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >

            <motion.div
              className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-lg border ${darkMode
                ? "bg-white/10 border-gray-600 text-gray-300"
                : "bg-white/60 border-gray-300 text-gray-700"
                }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Available for work
            </motion.div>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center  gap-4 w-full sm:w-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <motion.button
              onClick={() => scrollToSection("projects")}
              className="group  px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold overflow-hidden shadow-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className=" inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className=" z-10 flex items-center justify-center gap-2">
                <Sparkles size={20} />
                View My Work
              </span>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("contact")}
              className={`px-8 py-4 rounded-full border-2 font-semibold backdrop-blur-lg transition-all duration-300 ${darkMode
                ? "border-gray-500 text-white hover:bg-white/10 hover:border-white"
                : "border-gray-300 text-gray-900 hover:bg-black/5 hover:border-gray-600"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.button>
          </motion.div>


        </motion.div>
      </section>

      {/* Enhanced About Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
      >
        <motion.div
          className="max-w-6xl w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={`text-4xl sm:text-6xl font-black mb-6 text-center ${darkMode ? "text-white" : "text-gray-900"
              }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>

          <motion.div
            className={`backdrop-blur-lg rounded-3xl p-8 sm:p-12 mb-12 border shadow-2xl relative overflow-hidden ${darkMode
              ? "bg-white/5 border-gray-700/50"
              : "bg-white/60 border-gray-200/50"
              }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <p
                  className={`text-lg sm:text-xl leading-relaxed mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                >
                  {userData?.bio || "I'm a passionate developer with expertise in modern web technologies. I love creating digital experiences that are both beautiful and functional."}
                </p>


              </div>


            </div>
          </motion.div>

          {/* Enhanced Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-8 text-center ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              Skills & Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {(userData?.skills || ["React", "JavaScript", "TypeScript", "Node.js", "CSS"]).map((skill, idx) => (
                <motion.div
                  key={idx}
                  className={`backdrop-blur-lg rounded-2xl p-6 border text-center font-bold shadow-lg relative overflow-hidden group cursor-pointer ${darkMode
                    ? "bg-white/5 border-gray-700/50 hover:bg-white/10"
                    : "bg-white/60 border-gray-200/50 hover:bg-white/80"
                    }`}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    rotate: Math.random() * 6 - 3
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <span className={`relative z-10 ${darkMode ? "text-white" : "text-gray-900"
                    }`}>
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Projects Section */}
      <section
        id="projects"
        className="py-20 px-6 min-h-screen"
      >
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={`text-4xl sm:text-6xl font-black text-center mb-16 ${darkMode ? "text-white" : "text-gray-900"
              }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                className={`backdrop-blur-lg rounded-3xl overflow-hidden border shadow-2xl group relative ${darkMode
                  ? "bg-white/5 border-gray-700/50"
                  : "bg-white/60 border-gray-200/50"
                  }`}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -10,
                  rotateX: 5,
                  scale: 1.02
                }}
                style={{ perspective: 1000 }}
              >
                {/* Enhanced gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                />


                <div className="p-6 relative z-20">
                  <motion.h3
                    className={`text-2xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"
                      }`}
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>

                  <p
                    className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex gap-3">
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 border-2 px-4 py-3 rounded-xl font-semibold transition-all ${darkMode
                          ? "border-gray-600 text-white hover:bg-white/10 hover:border-white"
                          : "border-gray-300 text-gray-900 hover:bg-black/5 hover:border-gray-600"
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={18} />
                        Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Projects Button */}
          {projects && projects.length > 6 && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.button
                className={`px-8 py-4 rounded-full border-2 font-semibold backdrop-blur-lg ${darkMode
                  ? "border-gray-500 text-white hover:bg-white/10"
                  : "border-gray-300 text-gray-900 hover:bg-black/5"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Enhanced Contact Section */}
      <section
        id="contact"
        className="py-20 px-6 min-h-screen flex flex-col items-center justify-center"
      >
        <motion.div
          className="max-w-4xl w-full text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className={`text-4xl sm:text-6xl font-black mb-6 ${darkMode ? "text-white" : "text-gray-900"
              }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Connect
            </span>
          </motion.h2>

          <motion.p
            className={`text-lg mb-12 max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together. I'm always excited to work on new challenges and collaborate with passionate people.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href={`mailto:${userData?.email || 'hello@example.com'}`}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Mail size={20} />
              </motion.div>
              Send Email
            </motion.a>

            {userData?.linkedin && (
              <motion.a
                href={userData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 backdrop-blur-lg border-2 px-8 py-4 rounded-full font-semibold transition-all ${darkMode
                  ? "bg-white/5 border-gray-600 text-white hover:bg-white/10 hover:border-white"
                  : "bg-white/60 border-gray-300 text-gray-900 hover:bg-black/5 hover:border-gray-600"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
                LinkedIn
              </motion.a>
            )}

            {userData?.twitter && (
              <motion.a
                href={userData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 backdrop-blur-lg border-2 px-8 py-4 rounded-full font-semibold transition-all ${darkMode
                  ? "bg-white/5 border-gray-600 text-white hover:bg-white/10"
                  : "bg-white/60 border-gray-300 text-gray-900 hover:bg-black/5"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={20} />
                Twitter
              </motion.a>
            )}

            {userData?.github && (
              <motion.a
                href={userData.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 backdrop-blur-lg border-2 px-8 py-4 rounded-full font-semibold transition-all ${darkMode
                  ? "bg-white/5 border-gray-600 text-white hover:bg-white/10"
                  : "bg-white/60 border-gray-300 text-gray-900 hover:bg-black/5"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                GitHub
              </motion.a>
            )}

            {userData?.instagram && (
              <motion.a
                href={userData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 backdrop-blur-lg border-2 px-8 py-4 rounded-full font-semibold transition-all ${darkMode
                  ? "bg-white/5 border-gray-600 text-white hover:bg-white/10"
                  : "bg-white/60 border-gray-300 text-gray-900 hover:bg-black/5"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} />
                Instagram
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer
        className={`py-8 text-center backdrop-blur-lg border-t ${darkMode
          ? "bg-gray-900/70 border-gray-700/50"
          : "bg-white/70 border-gray-200/50"
          }`}
      >
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.p
              className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
              whileHover={{ scale: 1.05 }}
            >
              &copy; {new Date().getFullYear()} {userData?.name || "Portfolio"}. Crafted with{" "}
              <motion.span
                className="text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💜
              </motion.span>{" "}
              and modern web technologies.
            </motion.p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}