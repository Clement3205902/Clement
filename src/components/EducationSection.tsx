'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function EducationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto bg-white/5">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Education</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Academic foundation building tomorrow's innovations
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-br from-orange-600/20 to-orange-900/20 rounded-xl p-8 border border-orange-500/20">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-orange-500/20 rounded-xl">
              <GraduationCap size={48} className="text-orange-500" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-orange-500 mb-2">
                Virginia Tech
              </h3>
              <h4 className="text-xl font-semibold mb-4">
                Bachelor of Science in Mechanical Engineering
              </h4>
              
              <div className="flex flex-wrap gap-4 mb-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Expected Graduation: [Year]</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Blacksburg, Virginia</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2 text-white">Relevant Coursework:</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <span className="bg-white/10 px-3 py-1 rounded-lg text-sm">Statics</span>
                    <span className="bg-white/10 px-3 py-1 rounded-lg text-sm">Dynamics</span>
                    <span className="bg-white/10 px-3 py-1 rounded-lg text-sm">Thermodynamics</span>
                    <span className="bg-white/10 px-3 py-1 rounded-lg text-sm">Fluid Mechanics</span>
                    <span className="bg-white/10 px-3 py-1 rounded-lg text-sm">Materials Science</span>
                    <span className="bg-white/10 px-3 py-1 rounded-lg text-sm">Heat Transfer</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold mb-2 text-white">Technical Skills Developed:</h5>
                  <ul className="text-gray-300 space-y-1">
                    <li>• CAD modeling and design optimization</li>
                    <li>• Engineering analysis and problem-solving</li>
                    <li>• Laboratory experimentation and data analysis</li>
                    <li>• Team collaboration and project management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center px-6 py-3 bg-orange-600/20 rounded-full border border-orange-500/30">
            <span className="text-orange-500 font-semibold">🏈 Go Hokies!</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}