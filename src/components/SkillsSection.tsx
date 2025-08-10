'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const skills = [
    { name: 'SolidWorks', level: 85 },
    { name: 'AutoCAD', level: 80 },
    { name: 'MATLAB', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'Thermodynamics', level: 90 },
    { name: 'Fluid Mechanics', level: 85 },
    { name: '3D Printing', level: 80 },
    { name: 'Project Management', level: 75 }
  ];

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Expertise</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Technical proficiencies and engineering competencies
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <div className="flex justify-between mb-2">
              <span className="text-lg font-medium">{skill.name}</span>
              <span className="text-orange-500">{skill.level}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : {}}
                transition={{ delay: (index * 0.1) + 0.5, duration: 1 }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}