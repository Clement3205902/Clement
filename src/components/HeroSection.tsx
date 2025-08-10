'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import TypewriterEffect from './TypewriterEffect';

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-lg"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-16 w-16 h-16 border border-orange-500/20 rounded-full"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -80, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-12 h-12 border border-white/5 rounded-lg"
        />
      </div>

      <div className="text-center z-10 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Clement Ahorsu
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-4 h-16">
            <TypewriterEffect 
              words={[
                "Mechanical Engineering Student",
                "Virginia Tech Hokie",
                "Innovation Enthusiast",
                "Problem Solver",
                "Future Engineer"
              ]}
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Engineering Tomorrow's Solutions Today. Passionate about mechanical design, 
            innovation, and solving real-world problems through engineering excellence.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex justify-center space-x-6 mb-12"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-white/20 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all duration-300 hover:scale-110"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-white/20 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all duration-300 hover:scale-110"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:clement@example.com"
            className="p-3 border border-white/20 rounded-full hover:border-orange-500 hover:text-orange-500 transition-all duration-300 hover:scale-110"
          >
            <Mail size={24} />
          </a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          onClick={scrollToAbout}
          className="animate-bounce"
        >
          <ArrowDown size={32} className="text-orange-500" />
        </motion.button>
      </div>
    </section>
  );
}