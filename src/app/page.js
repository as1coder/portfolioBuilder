// src/app/page.js
"use client"; // Framer motion ke liye client component banana important hai

import { motion } from "framer-motion";
import Link from "next/link";
import { Playfair_Display, Inter } from 'next/font/google';


const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });
const inter = Inter({ subsets: ['latin'], weight: '300' });

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background (Optional) */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-5xl md:text-7xl font-bold mb-6 ${playfair.className}`}>
          Build Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> Portfolio </span>
          In Minutes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-lg md:text-xl text-gray-300 mb-10 ${inter.className}`}>
          Create a stunning developer portfolio without writing code. Showcase your projects, skills, and get hired.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/signup"
            className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-medium py-4 px-10 rounded-xl text-lg transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40 tracking-widest uppercase font-mono"
          >
            GET STARTED
          </Link>
        </motion.div>
      </div>
    </div>
  );
}