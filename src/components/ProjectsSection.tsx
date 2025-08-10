'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const projects = [
    {
      title: "Thermal Management System Design",
      description: "Designed an efficient cooling system for electronic components using heat transfer principles and CAD modeling.",
      technologies: ["SolidWorks", "Heat Transfer Analysis", "MATLAB"],
      status: "Academic Project"
    },
    {
      title: "Mechanical Component Analysis",
      description: "Performed stress analysis on mechanical components using finite element analysis methods.",
      technologies: ["FEA", "Materials Science", "Design Optimization"],
      status: "Course Project"
    },
    {
      title: "3D Printed Prototype Development",
      description: "Created functional prototypes using 3D printing technology for mechanical design validation.",
      technologies: ["3D Printing", "Prototyping", "Design Iteration"],
      status: "Personal Project"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Projects</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Engineering solutions through hands-on experience
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                {project.status}
              </span>
            </div>
            
            <p className="text-gray-400 mb-4 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="bg-white/10 text-gray-300 px-3 py-1 rounded-lg text-sm">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors">
                <ExternalLink size={16} />
                <span className="text-sm">View Details</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-gray-400">
          More projects coming soon as I continue my engineering journey!
        </p>
      </motion.div>
    </section>
  );
}