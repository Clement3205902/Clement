'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import EducationSection from '@/components/EducationSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import CommentsSection from '@/components/CommentsSection';
import FirebaseStatusNotice from '@/components/FirebaseStatusNotice';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation />
      <FirebaseStatusNotice />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
        <CommentsSection />
      </motion.main>
    </div>
  );
}
