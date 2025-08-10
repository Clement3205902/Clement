'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageSquare, Github, Linkedin } from 'lucide-react';

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section id="contact" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Let's connect and discuss engineering, opportunities, or collaboration
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
          
          <div className="space-y-6">
            <motion.a
              href="mailto:clement@example.com"
              whileHover={{ scale: 1.05, x: 10 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/30 transition-all duration-300"
            >
              <Mail className="text-orange-500" size={24} />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-400">clement@example.com</p>
              </div>
            </motion.a>

            <motion.a
              href="/chat"
              whileHover={{ scale: 1.05, x: 10 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/30 transition-all duration-300"
            >
              <MessageSquare className="text-orange-500" size={24} />
              <div>
                <h4 className="font-semibold">AI Chat</h4>
                <p className="text-gray-400">Chat with me directly</p>
              </div>
            </motion.a>

            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 10 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/30 transition-all duration-300"
            >
              <Github className="text-orange-500" size={24} />
              <div>
                <h4 className="font-semibold">GitHub</h4>
                <p className="text-gray-400">View my code projects</p>
              </div>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 10 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/30 transition-all duration-300"
            >
              <Linkedin className="text-orange-500" size={24} />
              <div>
                <h4 className="font-semibold">LinkedIn</h4>
                <p className="text-gray-400">Professional network</p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold mb-6">Available For</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-orange-600/20 to-orange-900/20 rounded-lg border border-orange-500/20">
              <h4 className="font-semibold text-orange-400 mb-2">Engineering Internships</h4>
              <p className="text-gray-300 text-sm">Seeking hands-on experience in mechanical engineering roles</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-semibold mb-2">Academic Collaboration</h4>
              <p className="text-gray-400 text-sm">Open to research projects and academic partnerships</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-semibold mb-2">Engineering Discussions</h4>
              <p className="text-gray-400 text-sm">Love talking about innovation, design, and problem-solving</p>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-semibold mb-2">Mentorship</h4>
              <p className="text-gray-400 text-sm">Always eager to learn from experienced professionals</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}