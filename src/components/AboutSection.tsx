'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Target, Heart } from 'lucide-react';

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section id="about" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Get to know the engineer behind the passion
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <div className="w-full h-96 bg-gradient-to-br from-orange-600/20 to-orange-900/20 rounded-lg flex items-center justify-center border border-orange-500/20">
            <div className="text-center">
              <GraduationCap size={64} className="text-orange-500 mx-auto mb-4" />
              <p className="text-gray-400">Professional Photo</p>
              <p className="text-sm text-gray-500">Coming Soon</p>
            </div>
          </div>
          
          {/* Floating elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 w-12 h-12 border border-orange-500/30 rounded-lg"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-4 -left-4 w-8 h-8 border border-white/20 rounded-full"
          />
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 text-orange-500">
              Mechanical Engineering Student
            </h3>
            <p className="text-gray-300 leading-relaxed">
              I'm currently pursuing a Bachelor of Science in Mechanical Engineering at Virginia Tech, 
              where I'm developing a strong foundation in engineering principles and problem-solving methodologies. 
              My passion lies in applying theoretical knowledge to real-world challenges and creating innovative solutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <Target className="text-orange-500 mb-2" size={24} />
              <h4 className="font-semibold mb-2">Mission</h4>
              <p className="text-sm text-gray-400">
                To leverage engineering principles to solve complex problems and contribute to technological advancement.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <Heart className="text-orange-500 mb-2" size={24} />
              <h4 className="font-semibold mb-2">Passion</h4>
              <p className="text-sm text-gray-400">
                Mechanical design, thermal systems, and innovative manufacturing processes that shape our future.
              </p>
            </motion.div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Virginia Tech Experience</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Active member of the Hokie Nation community
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Engaged in collaborative engineering projects
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                Pursuing excellence in academic and practical applications
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <p className="text-gray-400 italic">
              "Engineering is not just about building things; it's about building the future."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}