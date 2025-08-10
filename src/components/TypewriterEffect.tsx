'use client';

import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
}

export default function TypewriterEffect({ 
  words, 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  delaySpeed = 2000 
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleType = () => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, prev.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex(prev => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(prev => currentWord.slice(0, prev.length + 1));
        
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), delaySpeed);
          return;
        }
      }
    };

    const timeout = setTimeout(
      handleType,
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delaySpeed]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse text-orange-500">|</span>
    </span>
  );
}